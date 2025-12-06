import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// IDs de tiers de Patreon → código interno
// Los IDs se configuran en variables de entorno para no exponer configuración en código
function getTierMapping(): Record<string, string> {
  const mapping: Record<string, string> = {};

  if (process.env.PATREON_TIER_ID_HEROE) {
    mapping[process.env.PATREON_TIER_ID_HEROE] = 'heroe_emergente';      // $2/mes
  }
  if (process.env.PATREON_TIER_ID_CAMPEON) {
    mapping[process.env.PATREON_TIER_ID_CAMPEON] = 'campeon_consagrado'; // $5/mes
  }
  if (process.env.PATREON_TIER_ID_LEYENDA) {
    mapping[process.env.PATREON_TIER_ID_LEYENDA] = 'leyenda_viviente';   // $10/mes
  }

  return mapping;
}

function verifyWebhookSignature(signature: string, payload: string, secret: string): boolean {
  const hash = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(hash));
}

function getUserTier(patreonData: any): string {
  const tiers = patreonData?.data?.relationships?.currently_entitled_tiers?.data || [];
  if (!Array.isArray(tiers) || tiers.length === 0) return 'free';

  const tierMapping = getTierMapping();
  const tierHierarchy: Record<string, number> = {
    free: 0,
    heroe_emergente: 1,
    campeon_consagrado: 2,
    leyenda_viviente: 3,
  };

  let highestTier = 'free';
  let highest = 0;
  for (const tierData of tiers) {
    const internal = tierMapping[tierData.id];
    if (!internal) continue;
    const h = tierHierarchy[internal] || 0;
    if (h > highest) {
      highest = h;
      highestTier = internal;
    }
  }
  return highestTier;
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-patreon-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 401 });
    }

    const webhookSecret = process.env.PATREON_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('[Patreon Webhook] PATREON_WEBHOOK_SECRET not configured');
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
    }

    const isValid = verifyWebhookSignature(signature, rawBody, webhookSecret);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);
    const eventType = payload.data?.type;
    const patreonUserId = payload.data?.relationships?.user?.data?.id;
    if (!patreonUserId) {
      return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });
    }

    // Determinar tier y estado
    let tier = 'free';
    let status = 'inactive';
    if (eventType === 'members:pledge:create' || eventType === 'members:pledge:update') {
      tier = getUserTier(payload);
      status = 'active';
    } else if (eventType === 'members:pledge:delete') {
      tier = 'free';
      status = 'inactive';
    } else {
      return NextResponse.json({ ok: true, message: 'Event ignored' });
    }

    const supabase = await createClient();
    const { error } = await supabase.rpc('update_patreon_tier', {
      p_patreon_user_id: patreonUserId,
      p_tier: tier,
      p_status: status,
    });

    if (error) {
      console.error('[Patreon Webhook] RPC error:', error);
      return NextResponse.json({ error: 'DB update failed' }, { status: 500 });
    }

    return NextResponse.json({ ok: true, tier, status });
  } catch (error) {
    console.error('[Patreon Webhook] Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
