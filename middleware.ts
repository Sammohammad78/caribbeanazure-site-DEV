import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './lib/i18n';
import { NextRequest, NextResponse } from 'next/server';

// Bilingual configuration: NL at / (root), EN under /en
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // NL at /, EN at /en/*
  alternateLinks: true, // Generate hreflang tags
  localeDetection: false, // Don't auto-detect, explicit choice only
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 301 Redirects for removed /cases route
  // Redirect /cases and /cases/* → /oplossingen (NL)
  if (pathname === '/cases' || pathname.startsWith('/cases/')) {
    const url = request.nextUrl.clone();
    url.pathname = '/oplossingen';
    return NextResponse.redirect(url, { status: 301 });
  }

  // Redirect /en/cases and /en/cases/* → /en/solutions (EN)
  if (pathname === '/en/cases' || pathname.startsWith('/en/cases/')) {
    const url = request.nextUrl.clone();
    url.pathname = '/en/solutions';
    return NextResponse.redirect(url, { status: 301 });
  }

  // Continue with i18n middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/((?!_next|_vercel|api|.*\\..*).*)'],
};
