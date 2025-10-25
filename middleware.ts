import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './lib/i18n';

// Bilingual configuration: NL at / (root), EN under /en
export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // NL at /, EN at /en/*
  alternateLinks: true, // Generate hreflang tags
  localeDetection: false, // Don't auto-detect, explicit choice only
});

export const config = {
  matcher: ['/', '/((?!_next|_vercel|api|.*\\..*).*)'],
};
