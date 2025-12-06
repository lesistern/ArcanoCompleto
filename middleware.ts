import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { defaultLocale, locales, type Locale } from './src/i18n/config';

const PUBLIC_FILE = /\.(.*)$/;

const localeMatcher = new RegExp(`^/(${locales.join('|')})(/|$)`);

const routeAliases: Record<string, string> = {
  class: 'clases',
  classes: 'clases',
};

function getLocaleFromPath(pathname: string): Locale | null {
  const match = localeMatcher.exec(pathname);
  if (!match) return null;

  const locale = match[1];
  return locales.includes(locale as Locale) ? (locale as Locale) : null;
}

function normalizePathname(pathname: string): string {
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const segments = cleanPath.split('/').filter(Boolean);

  if (segments.length === 0) return '/';

  const alias = routeAliases[segments[0]];
  if (alias) {
    segments[0] = alias;
  }

  return `/${segments.join('/')}`;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const pathLocale = getLocaleFromPath(pathname);
  const preferredLocale = request.cookies.get('NEXT_LOCALE')?.value as Locale | undefined;

  if (!pathLocale) {
    const locale = preferredLocale && locales.includes(preferredLocale) ? preferredLocale : defaultLocale;
    const redirectURL = request.nextUrl.clone();
    redirectURL.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
    return NextResponse.redirect(redirectURL);
  }

  const strippedPath = normalizePathname(pathname.replace(localeMatcher, '/'));
  const rewriteURL = request.nextUrl.clone();
  rewriteURL.pathname = strippedPath;

  const response = NextResponse.rewrite(rewriteURL);
  response.cookies.set('NEXT_LOCALE', pathLocale, { path: '/' });
  response.headers.set('x-path-locale', pathLocale);
  response.headers.set('x-pathname', pathname);

  return response;
}

export const config = {
  matcher: ['/((?!_next|.*\\..*|api).*)'],
};
