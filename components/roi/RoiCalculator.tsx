'use client'

/**
 * Universal ROI Calculator - Internationalized
 * Supports NL/EN with locale-aware formatting and presets
 */

import * as React from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import { ArrowRight, Download, Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { RoiCalculatorProps } from './types'
import { DEFAULT_INPUTS, PRESET_INPUTS } from './types'
import {
  calculateRoi,
  validateInputs,
  formatCurrency,
  formatPercent,
  exportToCsv,
  syncToUrl,
  readFromUrl,
} from './utils'

export function RoiCalculator({
  initialInputs,
  variant = 'card',
  preset = 'custom',
  showMethodNote = false,
  ctaLabel,
  onSubmit,
  showExport = true,
  enableUrlSync = false,
}: RoiCalculatorProps) {
  const locale = useLocale() as 'nl' | 'en'
  const t = useTranslations('roiCalculator')

  // Track open event once on mount
  React.useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).plausible) {
      ;(window as any).plausible('roi_open', {
        props: { variant, preset, locale },
      })
    }
  }, [variant, preset, locale])

  // Initialize state with preset or defaults
  const [inputs, setInputs] = React.useState(() => {
    const presetDefaults = preset !== 'custom' ? PRESET_INPUTS[preset] : {}
    const defaults = { ...DEFAULT_INPUTS, ...presetDefaults, ...initialInputs }
    if (enableUrlSync && typeof window !== 'undefined') {
      return { ...defaults, ...readFromUrl(defaults) }
    }
    return defaults
  })

  const [error, setError] = React.useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  // Calculate result
  const result = React.useMemo(() => calculateRoi(inputs), [inputs])

  // Sync to URL when inputs change (debounced)
  React.useEffect(() => {
    if (!enableUrlSync) return
    const timer = setTimeout(() => syncToUrl(inputs), 500)
    return () => clearTimeout(timer)
  }, [inputs, enableUrlSync])

  // Handle input change
  const handleChange = (field: keyof typeof inputs, value: number) => {
    setInputs((prev) => ({ ...prev, [field]: value }))
    setError(null)

    // Track analytics event
    if (typeof window !== 'undefined' && (window as any).plausible) {
      ;(window as any).plausible('roi_adjust', {
        props: { field, value, locale, preset },
      })
    }
  }

  // Handle submit
  const handleSubmit = async () => {
    const validationError = validateInputs(inputs)
    if (validationError) {
      // Translation key returned from validation
      setError(validationError)
      return
    }

    setError(null)

    // Track analytics
    if (typeof window !== 'undefined' && (window as any).plausible) {
      ;(window as any).plausible('roi_submit', {
        props: {
          annualSavings: result.annualSavings,
          variant,
          preset,
          locale,
        },
      })
    }

    if (onSubmit) {
      setIsSubmitting(true)
      try {
        await onSubmit(inputs, result)
      } catch (err) {
        setError('error.submit')
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  // Handle CSV export
  const handleExport = () => {
    exportToCsv(inputs, result, locale)

    // Track analytics
    if (typeof window !== 'undefined' && (window as any).plausible) {
      ;(window as any).plausible('calc_export', {
        props: { annualSavings: result.annualSavings, locale, preset },
      })
    }
  }

  // Variant-specific wrapper
  const Wrapper = variant === 'inline' ? 'div' : Card
  const wrapperClassName = cn(
    variant === 'inline' && 'bg-[color:color-mix(in_oklab,var(--panel)_50%,transparent)] rounded-2xl p-6 sm:p-8',
    variant === 'page' && 'max-w-4xl mx-auto'
  )

  // Resolve CTA label
  const resolvedCtaLabel = ctaLabel || t('cta.primary')

  return (
    <Wrapper className={wrapperClassName}>
      {/* Header */}
      {variant !== 'inline' && (
        <div className="mb-8">
          <Heading level="h2" className="mb-3">
            {t('title')}
          </Heading>
          <Text variant="subtle" size="lg">
            {t('subtitle')}
          </Text>
        </div>
      )}

      {/* Preset Info (if applicable) */}
      {preset !== 'custom' && (
        <div className="mb-6 rounded-lg bg-[color:color-mix(in_oklab,var(--accent)_10%,transparent)] border border-[color:var(--accent)]/30 p-4">
          <Text size="sm" className="font-medium">
            {t(`presets.${preset}`)}
          </Text>
        </div>
      )}

      {/* Input Grid */}
      <div className="grid gap-6 sm:grid-cols-2 mb-8">
        <InputField
          label={t('inputs.teamSize')}
          hint={t('hints.teamSize')}
          value={inputs.teamSize}
          onChange={(val) => handleChange('teamSize', val)}
          min={1}
          max={1000}
          step={1}
          suffix={locale === 'nl' ? 'personen' : 'people'}
        />
        <InputField
          label={t('inputs.hourlyRate')}
          hint={t('hints.hourlyRate')}
          value={inputs.hourlyRate}
          onChange={(val) => handleChange('hourlyRate', val)}
          min={10}
          max={500}
          step={5}
          prefix="€"
        />
        <InputField
          label={t('inputs.hoursSavedPerWeek')}
          hint={t('hints.hoursSavedPerWeek')}
          value={inputs.hoursSavedPerWeek}
          onChange={(val) => handleChange('hoursSavedPerWeek', val)}
          min={0.5}
          max={40}
          step={0.5}
          suffix={locale === 'nl' ? 'uur' : 'hours'}
        />
        <InputField
          label={t('inputs.adoption')}
          hint={t('hints.adoption')}
          value={inputs.adoption * 100}
          onChange={(val) => handleChange('adoption', val / 100)}
          min={10}
          max={100}
          step={5}
          suffix="%"
        />
      </div>

      {/* Error */}
      {error && (
        <div
          className="mb-6 rounded-xl bg-[color:color-mix(in_oklab,var(--err)_15%,transparent)] border border-[color:var(--err)] p-4"
          role="alert"
        >
          <Text variant="error" size="sm">
            {/* If error is a translation key, try to translate it */}
            {error.startsWith('validation.') || error.startsWith('error.')
              ? t(error as any) || error
              : error}
          </Text>
        </div>
      )}

      {/* Result Card */}
      <div className="rounded-xl bg-gradient-to-br from-[color:var(--brand-600)] to-[color:var(--brand-400)] p-8 text-white mb-6">
        <div className="grid gap-6 sm:grid-cols-3">
          <ResultMetric
            label={t('outputs.monthlySavings')}
            value={formatCurrency(result.monthlySavings, locale)}
          />
          <ResultMetric
            label={t('outputs.annualSavings')}
            value={formatCurrency(result.annualSavings, locale)}
            highlight
          />
          <ResultMetric
            label={t('outputs.hoursSavedAnnually')}
            value={result.hoursSavedAnnually.toLocaleString(locale === 'nl' ? 'nl-NL' : 'en-US')}
            suffix={locale === 'nl' ? 'uur/jaar' : 'hours/year'}
          />
        </div>
      </div>

      {/* Method Note */}
      {showMethodNote && (
        <div className="mb-6 rounded-xl bg-[color:color-mix(in_oklab,var(--fg)_6%,transparent)] p-4 flex items-start gap-3">
          <Info className="h-5 w-5 text-[color:var(--fg-muted)] mt-0.5 flex-shrink-0" />
          <Text variant="subtle" size="sm">
            <strong>{t('methodology.title')}</strong> {t('methodology.description')}
            <br />
            <em>{t('methodology.formula')}</em>
          </Text>
        </div>
      )}

      {/* Privacy Note */}
      <div className="mb-6">
        <Text variant="subtle" size="xs" className="text-center">
          {t('privacy')}
        </Text>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          size="lg"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? (locale === 'nl' ? 'Bezig...' : 'Submitting...') : resolvedCtaLabel}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        {showExport && (
          <Button size="lg" variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            {t('cta.secondary')}
          </Button>
        )}
      </div>
    </Wrapper>
  )
}

/**
 * Input Field Component
 */
interface InputFieldProps {
  label: string
  hint?: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step: number
  prefix?: string
  suffix?: string
}

function InputField({ label, hint, value, onChange, min, max, step, prefix, suffix }: InputFieldProps) {
  const inputId = React.useId()

  return (
    <div>
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-[color:var(--fg)] mb-2"
      >
        {label}
      </label>
      {hint && (
        <Text variant="subtle" size="xs" className="mb-2">
          {hint}
        </Text>
      )}
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--fg-muted)]">
            {prefix}
          </span>
        )}
        <input
          id={inputId}
          type="number"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          min={min}
          max={max}
          step={step}
          aria-describedby={hint ? `${inputId}-hint` : undefined}
          className={cn(
            'w-full h-11 rounded-xl border border-[color:color-mix(in_oklab,var(--fg)_20%,transparent)]',
            'bg-[color:var(--bg)] text-[color:var(--fg)]',
            'px-4 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)]',
            'transition-all duration-200',
            prefix && 'pl-8',
            suffix && 'pr-20'
          )}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--fg-muted)] text-sm">
            {suffix}
          </span>
        )}
      </div>
    </div>
  )
}

/**
 * Result Metric Component
 */
interface ResultMetricProps {
  label: string
  value: string
  suffix?: string
  highlight?: boolean
}

function ResultMetric({ label, value, suffix, highlight }: ResultMetricProps) {
  return (
    <div className={cn('text-center', highlight && 'sm:scale-110')}>
      <div className="text-sm opacity-90 mb-2">{label}</div>
      <div className={cn('font-bold', highlight ? 'text-3xl' : 'text-2xl')}>{value}</div>
      {suffix && <div className="text-xs opacity-75 mt-1">{suffix}</div>}
    </div>
  )
}
