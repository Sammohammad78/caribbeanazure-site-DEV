/**
 * ROI Calculator Utilities
 * Calculation, validation, export, and URL sync logic
 */

import type { RoiInputs, RoiResult } from './types'
import { formatCurrency as formatCurrencyUtil } from '@/lib/format'

/**
 * Calculate ROI metrics from inputs
 * Formula: teamSize × hourlyRate × hoursSavedPerWeek × 52 × adoption
 */
export function calculateRoi(inputs: RoiInputs): RoiResult {
  const { teamSize, hourlyRate, hoursSavedPerWeek, adoption } = inputs

  const weeklySavings = teamSize * hourlyRate * hoursSavedPerWeek * adoption
  const monthlySavings = weeklySavings * (52 / 12) // ~4.33 weeks per month
  const annualSavings = weeklySavings * 52
  const hoursSavedAnnually = teamSize * hoursSavedPerWeek * 52 * adoption

  return {
    weeklySavings: Math.round(weeklySavings),
    monthlySavings: Math.round(monthlySavings),
    annualSavings: Math.round(annualSavings),
    hoursSavedAnnually: Math.round(hoursSavedAnnually),
  }
}

/**
 * Validate ROI inputs
 * Returns error key for translation instead of hardcoded message
 */
export function validateInputs(inputs: Partial<RoiInputs>): string | null {
  if (!inputs.teamSize || inputs.teamSize < 1 || inputs.teamSize > 1000) {
    return 'validation.teamSize'
  }
  if (!inputs.hourlyRate || inputs.hourlyRate < 10 || inputs.hourlyRate > 500) {
    return 'validation.hourlyRate'
  }
  if (
    inputs.hoursSavedPerWeek === undefined ||
    inputs.hoursSavedPerWeek < 0.5 ||
    inputs.hoursSavedPerWeek > 40
  ) {
    return 'validation.hoursSavedPerWeek'
  }
  if (!inputs.adoption || inputs.adoption < 0.1 || inputs.adoption > 1) {
    return 'validation.adoption'
  }
  return null
}

/**
 * Format EUR currency with locale support
 * @deprecated Use formatCurrencyUtil from @/lib/format instead
 */
export function formatCurrency(value: number, locale: 'nl' | 'en' = 'nl'): string {
  return formatCurrencyUtil(value, locale)
}

/**
 * Format percentage
 */
export function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`
}

/**
 * Export ROI data as CSV with locale support
 */
export function exportToCsv(
  inputs: RoiInputs,
  result: RoiResult,
  locale: 'nl' | 'en' = 'nl',
  translations?: {
    title: string
    date: string
    inputs: Record<string, string>
    outputs: Record<string, string>
  }
): void {
  const defaultLabels = {
    nl: {
      title: 'Caribbean Azure ROI Calculator',
      date: 'Datum',
      inputs: {
        teamSize: 'Teamgrootte',
        hourlyRate: 'Uurtarief (EUR)',
        hoursSavedPerWeek: 'Uren bespaard per week',
        adoption: 'Adoptiepercentage',
      },
      outputs: {
        weeklySavings: 'Besparing per week',
        monthlySavings: 'Besparing per maand',
        annualSavings: 'Besparing per jaar',
        hoursSavedAnnually: 'Uren bespaard per jaar',
      },
    },
    en: {
      title: 'Caribbean Azure ROI Calculator',
      date: 'Date',
      inputs: {
        teamSize: 'Team size',
        hourlyRate: 'Hourly rate (EUR)',
        hoursSavedPerWeek: 'Hours saved per week',
        adoption: 'Adoption rate',
      },
      outputs: {
        weeklySavings: 'Weekly savings',
        monthlySavings: 'Monthly savings',
        annualSavings: 'Annual savings',
        hoursSavedAnnually: 'Hours saved annually',
      },
    },
  }

  const labels = translations || defaultLabels[locale]

  const rows = [
    [labels.title, ''],
    [labels.date, new Date().toLocaleDateString(locale === 'nl' ? 'nl-NL' : 'en-US')],
    ['', ''],
    ['INPUT', ''],
    [labels.inputs.teamSize, inputs.teamSize.toString()],
    [labels.inputs.hourlyRate, inputs.hourlyRate.toString()],
    [labels.inputs.hoursSavedPerWeek, inputs.hoursSavedPerWeek.toString()],
    [labels.inputs.adoption, formatPercent(inputs.adoption)],
    ['', ''],
    ['RESULT', ''],
    [labels.outputs.weeklySavings, formatCurrency(result.weeklySavings, locale)],
    [labels.outputs.monthlySavings, formatCurrency(result.monthlySavings, locale)],
    [labels.outputs.annualSavings, formatCurrency(result.annualSavings, locale)],
    [labels.outputs.hoursSavedAnnually, result.hoursSavedAnnually.toString()],
  ]

  const csv = rows.map((row) => row.join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `roi-calculator-${new Date().toISOString().split('T')[0]}.csv`
  link.click()
  URL.revokeObjectURL(link.href)
}

/**
 * Sync inputs to URL querystring
 */
export function syncToUrl(inputs: RoiInputs): void {
  if (typeof window === 'undefined') return

  const params = new URLSearchParams(window.location.search)
  params.set('team', inputs.teamSize.toString())
  params.set('rate', inputs.hourlyRate.toString())
  params.set('hours', inputs.hoursSavedPerWeek.toString())
  params.set('adoptie', inputs.adoption.toString())

  const newUrl = `${window.location.pathname}?${params.toString()}`
  window.history.replaceState({}, '', newUrl)
}

/**
 * Read inputs from URL querystring
 */
export function readFromUrl(defaults: RoiInputs): Partial<RoiInputs> {
  if (typeof window === 'undefined') return defaults

  const params = new URLSearchParams(window.location.search)

  return {
    teamSize: params.has('team') ? parseInt(params.get('team')!, 10) : defaults.teamSize,
    hourlyRate: params.has('rate') ? parseFloat(params.get('rate')!) : defaults.hourlyRate,
    hoursSavedPerWeek: params.has('hours')
      ? parseFloat(params.get('hours')!)
      : defaults.hoursSavedPerWeek,
    adoption: params.has('adoptie') ? parseFloat(params.get('adoptie')!) : defaults.adoption,
  }
}
