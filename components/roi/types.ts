/**
 * ROI Calculator Types
 * Universal calculator for Caribbean Azure website
 */

export interface RoiInputs {
  /** Number of team members */
  teamSize: number
  /** Hourly rate in EUR */
  hourlyRate: number
  /** Hours saved per week per person */
  hoursSavedPerWeek: number
  /** Adoption rate (0-1, e.g. 0.6 = 60%) */
  adoption: number
}

export interface RoiResult {
  /** Weekly savings in EUR */
  weeklySavings: number
  /** Monthly savings in EUR */
  monthlySavings: number
  /** Annual savings in EUR */
  annualSavings: number
  /** Hours saved annually */
  hoursSavedAnnually: number
}

export type RoiVariant = 'inline' | 'card' | 'page'

export type RoiPreset = 'light' | 'manufacturing' | 'c2p' | 'custom'

export interface RoiCalculatorProps {
  /** Initial input values */
  initialInputs?: Partial<RoiInputs>
  /** Display variant */
  variant?: RoiVariant
  /** Preset configuration (light, manufacturing, c2p) */
  preset?: RoiPreset
  /** Show method explanation note */
  showMethodNote?: boolean
  /** Custom CTA label */
  ctaLabel?: string
  /** Callback when user submits */
  onSubmit?: (inputs: RoiInputs, result: RoiResult) => void | Promise<void>
  /** Show CSV export button */
  showExport?: boolean
  /** Enable querystring sync */
  enableUrlSync?: boolean
}

export const DEFAULT_INPUTS: RoiInputs = {
  teamSize: 5,
  hourlyRate: 65,
  hoursSavedPerWeek: 2,
  adoption: 0.7,
}

/**
 * Preset configurations for different solution tiers
 */
export const PRESET_INPUTS: Record<RoiPreset, Partial<RoiInputs>> = {
  light: {
    teamSize: 3,
    hourlyRate: 50,
    hoursSavedPerWeek: 1.5,
    adoption: 0.8,
  },
  manufacturing: {
    teamSize: 8,
    hourlyRate: 75,
    hoursSavedPerWeek: 4,
    adoption: 0.7,
  },
  c2p: {
    teamSize: 12,
    hourlyRate: 85,
    hoursSavedPerWeek: 6,
    adoption: 0.65,
  },
  custom: DEFAULT_INPUTS,
}
