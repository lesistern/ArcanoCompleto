import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// ============================================================================
// PATREON WEBHOOK ENDPOINT
// ============================================================================
// Este endpoint recibe webhooks de Patreon cuando los usuarios se suscriben,
// actualizan o cancelan sus membresías.
//
// CONFIGURACIÓN REQUERIDA:
// 1. PATREON_WEBHOOK_SECRET en .env.local
// 2. Webhook URL configurada en Patreon Developer Portal
// 3. Eventos suscritos: members:pledge:create, members:pledge:update, members:pledge:delete
//
// SEGURIDAD:
// - Verifica firma del webhook con HMAC SHA256
// - Solo procesa eventos de Patreon verificados
// ============================================================================

/**
 * Verifica la firma del webhook de Patreon
 */
function verifyWebhookSignature(
  signature: string,
  payload: string,
  secret: string
): boolean {
  const hash = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(hash)
  );
}

/**
 * Mapea el ID del tier de Patreon al código interno
 * IMPORTANTE: Reemplaza estos IDs con los IDs reales de tus tiers en Patreon
 */
const TIER_MAPPING: Record<string, string> = {
  // Reemplaza 'patreon_tier_id_1' con el ID real del tier en Patreon Dashboard
  'patreon_tier_id_1': 'heroe_emergente',      // $2/mes
  'patreon_tier_id_2': 'campeon_consagrado',   // $5/mes
  'patreon_tier_id_3': 'leyenda_viviente',     // $10/mes
};

/**
 * Obtiene el tier más alto al que el usuario tiene derecho
 */
function getUserTier(patreonData: any): string {
  // Obtener los tiers actualmente activos del usuario
  const currentlyEntitledTiers = patreonData?.data?.relationships?.currently_entitled_tiers?.data || [];

  if (currentlyEntitledTiers.length === 0) {
    return 'free';
  }

  // Mapear a jerarquía numérica para encontrar el tier más alto
  const tierHierarchy: Record<string, number> = {
    'free': 0,
    'heroe_emergente': 1,
    'campeon_consagrado': 2,
    'leyenda_viviente': 3,
  };

  let highestTier = 'free';
  let highestHierarchy = 0;

  for (const tierData of currentlyEntitledTiers) {
    const patreonTierId = tierData.id;
    const internalTier = TIER_MAPPING[patreonTierId];

    if (internalTier) {
      const hierarchy = tierHierarchy[internalTier] || 0;
      if (hierarchy > highestHierarchy) {
        highestHierarchy = hierarchy;
        highestTier = internalTier;
      }
    }
  }

  return highestTier;
}

/**
 * Webhook endpoint POST handler
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Obtener el payload y la firma
    const rawBody = await request.text();
    const signature = request.headers.get('x-patreon-signature');

    if (!signature) {
      console.error('[Patreon Webhook] Missing signature header');
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 401 }
      );
    }

    // 2. Verificar la firma del webhook (CRÍTICO para seguridad)
    const webhookSecret = process.env.PATREON_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error('[Patreon Webhook] PATREON_WEBHOOK_SECRET not configured');
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      );
    }

    const isValid = verifyWebhookSignature(signature, rawBody, webhookSecret);

    if (!isValid) {
      console.error('[Patreon Webhook] Invalid signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // 3. Parsear el payload
    const payload = JSON.parse(rawBody);
    const eventType = payload.data?.type;

    console.log('[Patreon Webhook] Received event:', eventType);

    // 4. Extraer información del usuario y tier
    const patreonUserId = payload.data?.relationships?.user?.data?.id;
    const patreonEmail = payload.data?.attributes?.email;

    if (!patreonUserId) {
      console.error('[Patreon Webhook] Missing user ID in payload');
      return NextResponse.json(
        { error: 'Missing user ID' },
        { status: 400 }
      );
    }

    // 5. Determinar el tier y estado basado en el evento
    let tier = 'free';
    let status = 'inactive';

    if (eventType === 'members:pledge:create' || eventType === 'members:pledge:update') {
      // Usuario se suscribió o actualizó su suscripción
      tier = getUserTier(payload);
      status = 'active';
      console.log(`[Patreon Webhook] User ${patreonUserId} subscribed to tier: ${tier}`);
    } else if (eventType === 'members:pledge:delete') {
      // Usuario canceló su suscripción
      tier = 'free';
      status = 'inactive';
      console.log(`[Patreon Webhook] User ${patreonUserId} cancelled subscription`);
    } else {
      // Evento no soportado o no relevante
      console.log(`[Patreon Webhook] Ignoring event type: ${eventType}`);
      return NextResponse.json({ message: 'Event ignored' }, { status: 200 });
    }

    // 6. Actualizar tier en Supabase
    const supabase = await createClient();

    // Primero, vincular el patreon_user_id si no está vinculado
    // Esto requiere que el usuario ya tenga una cuenta en la app
    // y haya usado el mismo email que en Patreon
    if (patreonEmail) {
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id, patreon_user_id')
        .eq('patreon_user_id', patreonUserId)
        .single();

      // Si no encontramos por patreon_user_id, buscamos por email
      if (!existingProfile) {
        // Buscar usuarios por email usando listUsers
        const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
        
        if (listError) {
          console.error(`[Patreon Webhook] Error listing users:`, listError);
        } else {
          const userByEmail = users?.find(u => u.email === patreonEmail);
          
          if (userByEmail) {
            const { data: profileByEmail } = await supabase
              .from('profiles')
              .select('id')
              .eq('id', userByEmail.id)
              .single();

            if (profileByEmail) {
              // Vincular el patreon_user_id al perfil existente
              await supabase
                .from('profiles')
                .update({ patreon_user_id: patreonUserId })
                .eq('id', profileByEmail.id);
            }
          } else {
            console.warn(`[Patreon Webhook] No profile found for email ${patreonEmail}`);
            // Usuario no registrado en la app todavía
            // El tier se aplicará cuando se registre
          }
        }
          return NextResponse.json(
            { message: 'User not registered in app yet' },
            { status: 200 }
          );
        }
      }
    }

    // 7. Llamar a la función RPC para actualizar el tier
    const { data, error } = await supabase.rpc('update_patreon_tier', {
      p_patreon_user_id: patreonUserId,
      p_tier: tier,
      p_status: status,
    });

    if (error) {
      console.error('[Patreon Webhook] Error updating tier:', error);
      return NextResponse.json(
        { error: 'Failed to update tier', details: error.message },
        { status: 500 }
      );
    }

    if (!data) {
      console.warn(`[Patreon Webhook] No profile found with patreon_user_id: ${patreonUserId}`);
      return NextResponse.json(
        { message: 'Profile not found' },
        { status: 404 }
      );
    }

    console.log(`[Patreon Webhook] Successfully updated tier for user ${patreonUserId} to ${tier}`);

    return NextResponse.json({
      success: true,
      user_id: patreonUserId,
      tier: tier,
      status: status,
    });
  } catch (error) {
    console.error('[Patreon Webhook] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET handler - Solo para verificar que el endpoint existe
 * No debe ser usado en producción
 */
export async function GET() {
  return NextResponse.json({
    message: 'Patreon webhook endpoint is active',
    note: 'This endpoint only accepts POST requests from Patreon',
  });
}
