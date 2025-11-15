import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Proxy de Next.js para proteger rutas
 *
 * Protege toda la aplicación excepto:
 * - /beta-landing (página pública para no autenticados)
 * - /api/auth/* (endpoints de autenticación)
 * - /_next/* (recursos estáticos de Next.js)
 * - /favicon.ico, /robots.txt, etc.
 *
 * Requisitos para acceder:
 * 1. Usuario autenticado
 * 2. Usuario con rol 'beta_tester' o 'admin'
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ========================================================================
  // RUTAS PÚBLICAS (No requieren autenticación)
  // ========================================================================
  const publicPaths = [
    '/beta-landing',
    '/api/auth',
    '/_next',
    '/favicon.ico',
    '/robots.txt',
    '/sitemap.xml',
  ];

  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  if (isPublicPath) {
    return NextResponse.next();
  }

  // ========================================================================
  // CREAR CLIENTE SUPABASE CON COOKIES
  // ========================================================================
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // ========================================================================
  // VERIFICAR AUTENTICACIÓN
  // ========================================================================
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  // Si no está autenticado, redirigir a beta-landing
  if (userError || !user) {
    const redirectUrl = new URL('/beta-landing', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // ========================================================================
  // VERIFICAR TIER DE BETA TESTER
  // ========================================================================
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('tier')
    .eq('id', user.id)
    .single();

  // Si hay error obteniendo perfil, redirigir a beta-landing
  if (profileError || !profile) {
    console.error('Error fetching profile:', profileError);
    const redirectUrl = new URL('/beta-landing', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // Verificar si tiene tier permitido (beta_tester o admin)
  const allowedTiers = ['beta_tester', 'admin', 'reviewer', 'translator', 'contributor'];
  const hasAccess = allowedTiers.includes(profile.tier);

  // Si no tiene acceso, redirigir a beta-landing
  if (!hasAccess) {
    const redirectUrl = new URL('/beta-landing', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // ========================================================================
  // USUARIO TIENE ACCESO - Continuar
  // ========================================================================
  return response;
}

/**
 * Configuración del matcher
 *
 * Define qué rutas pasan por el proxy
 * - Excluye: api routes, _next/static, _next/image, favicon.ico
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
