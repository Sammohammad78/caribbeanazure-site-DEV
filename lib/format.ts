/**
 * Locale-aware formatting utilities for currency, numbers, and dates
 */

/**
 * Format currency in EUR with locale-specific rules
 * NL: €999, €1.999, €99.999
 * EN: €999, €1,999, €99,999
 */
export function formatCurrency(
  amount: number,
  locale: 'nl' | 'en' = 'nl',
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale === 'nl' ? 'nl-NL' : 'en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    ...options,
  }).format(amount)
}

/**
 * Format number with locale-specific thousands separator
 * NL: 1.000, EN: 1,000
 */
export function formatNumber(
  value: number,
  locale: 'nl' | 'en' = 'nl',
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale === 'nl' ? 'nl-NL' : 'en-US', options).format(value)
}

/**
 * Format date with locale-specific rules
 */
export function formatDate(
  date: Date | string,
  locale: 'nl' | 'en' = 'nl',
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat(locale === 'nl' ? 'nl-NL' : 'en-US', {
    dateStyle: 'medium',
    ...options,
  }).format(dateObj)
}

/**
 * Get "from" prefix for pricing display
 */
export function getPricePrefix(locale: 'nl' | 'en' = 'nl'): string {
  return locale === 'nl' ? 'vanaf' : 'from'
}

/**
 * Format price with "from" prefix
 */
export function formatPriceFrom(amount: number, locale: 'nl' | 'en' = 'nl'): string {
  return `${getPricePrefix(locale)} ${formatCurrency(amount, locale)}`
}

/**
 * Get "on request" text for Tier 3 pricing
 */
export function getPriceOnRequest(locale: 'nl' | 'en' = 'nl'): string {
  return locale === 'nl' ? 'Prijs op aanvraag' : 'Price on request'
}
