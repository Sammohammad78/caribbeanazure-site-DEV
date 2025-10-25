import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Section component for consistent vertical spacing across pages.
 * Uses responsive padding tokens: py-12 sm:py-16 lg:py-20
 */

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Vertical spacing size
   * @default "default"
   */
  spacing?: 'sm' | 'default' | 'lg' | 'xl' | 'none'
  /**
   * Render as a different HTML element
   * @default "section"
   */
  as?: 'div' | 'section' | 'article' | 'aside'
}

const spacingVariants = {
  none: '',
  sm: 'py-8 sm:py-12',
  default: 'py-12 sm:py-16 lg:py-20',
  lg: 'py-16 sm:py-20 lg:py-24',
  xl: 'py-20 sm:py-24 lg:py-32',
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing = 'default', as: Component = 'section', ...props }, ref) => {
    return (
      <Component
        ref={ref as any}
        className={cn(
          spacingVariants[spacing],
          className
        )}
        {...props}
      />
    )
  }
)

Section.displayName = 'Section'
