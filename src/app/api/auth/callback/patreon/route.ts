import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const PATREON_TOKEN_URL = 'https://www.patreon.com/api/oauth2/token';
const PATREON_IDENTITY_URL = 'https://www.patreon.com/api/oauth2/v2/identity';

interface PatreonTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
}

interface PatreonUser {
  id: string;
  attributes: {
    email: string;
    full_name: string;
    image_url?: string;
  };
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const state = searchParams.get('state');

  // URL base para redirecciones
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://compendioarcano.com.ar';

  // Si hay error de Patreon
  if (error) {
    console.error('[Patreon OAuth] Error:', error);
    return NextResponse.redirect(`${baseUrl}/es?error=patreon_auth_denied`);
  }

  // Si no hay código de autorización
  if (!code) {
    console.error('[Patreon OAuth] No code received');
    return NextResponse.redirect(`${baseUrl}/es?error=patreon_no_code`);
  }

  try {
    // 1. Intercambiar código por tokens
    const tokenResponse = await fetch(PATREON_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        grant_type: 'authorization_code',
        client_id: process.env.NEXT_PUBLIC_PATREON_CLIENT_ID!,
        client_secret: process.env.PATREON_CLIENT_SECRET!,
        redirect_uri: `${baseUrl}/api/auth/callback/patreon`,
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('[Patreon OAuth] Token exchange failed:', errorText);
      return NextResponse.redirect(`${baseUrl}/es?error=patreon_token_failed`);
    }

    const tokens: PatreonTokenResponse = await tokenResponse.json();

    // 2. Obtener información del usuario de Patreon
    const identityResponse = await fetch(
      `${PATREON_IDENTITY_URL}?fields[user]=email,full_name,image_url`,
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      }
    );

    if (!identityResponse.ok) {
      console.error('[Patreon OAuth] Identity fetch failed');
      return NextResponse.redirect(`${baseUrl}/es?error=patreon_identity_failed`);
    }

    const identityData = await identityResponse.json();
    const patreonUser: PatreonUser = identityData.data;

    // 3. Buscar o crear usuario en Supabase
    const supabase = await createClient();

    // Verificar si ya existe un usuario con este email
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id, user_id')
      .eq('patreon_user_id', patreonUser.id)
      .single();

    if (existingProfile) {
      // Usuario ya vinculado con Patreon - crear sesión magic link
      const { error: signInError } = await supabase.auth.signInWithOtp({
        email: patreonUser.attributes.email,
        options: {
          shouldCreateUser: false,
        },
      });

      if (signInError) {
        console.error('[Patreon OAuth] Sign in error:', signInError);
        // Redirigir a login normal con mensaje
        return NextResponse.redirect(`${baseUrl}/es?patreon_linked=true&email=${encodeURIComponent(patreonUser.attributes.email)}`);
      }

      return NextResponse.redirect(`${baseUrl}/es?patreon_login=check_email`);
    }

    // 4. Usuario nuevo o no vinculado - buscar por email
    const { data: profileByEmail } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', patreonUser.attributes.email)
      .single();

    if (profileByEmail) {
      // Vincular cuenta existente con Patreon
      await supabase
        .from('profiles')
        .update({
          patreon_user_id: patreonUser.id,
          patreon_status: 'active',
          patreon_last_sync: new Date().toISOString(),
        })
        .eq('id', profileByEmail.id);

      return NextResponse.redirect(`${baseUrl}/es?patreon_linked=success`);
    }

    // 5. Usuario completamente nuevo - redirigir a registro con datos pre-llenados
    const registrationParams = new URLSearchParams({
      patreon_id: patreonUser.id,
      email: patreonUser.attributes.email,
      name: patreonUser.attributes.full_name || '',
      avatar: patreonUser.attributes.image_url || '',
    });

    return NextResponse.redirect(`${baseUrl}/es?register=patreon&${registrationParams.toString()}`);

  } catch (error) {
    console.error('[Patreon OAuth] Unexpected error:', error);
    return NextResponse.redirect(`${baseUrl}/es?error=patreon_unexpected`);
  }
}
