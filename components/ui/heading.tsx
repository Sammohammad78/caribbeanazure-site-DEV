import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Semantic Heading component with consistent sizing and styling.
 * Follows Dutch sentence case convention and €100k quality standards.
 */

const headingVariants = cva('font-bold tracking-tight text-balance', {
  variants: {
    level: {
      h1: 'text-4xl md:text-5xl lg:text-6xl',
      h2: 'text-3xl md:text-4xl lg:text-5xl',
      h3: 'text-2xl md:text-3xl lg:text-4xl',
      h4: 'text-xl md:text-2xl',
      h5: 'text-lg md:text-xl',
      h6: 'text-base md:text-lg',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    level: 'h2',
    weight: 'bold',
  },
})

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  /**
   * Semantic heading level (h1-h6)
   */
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  /**
   * Render as a different heading level while maintaining styles
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level, as, weight, ...props }, ref) => {
    const Component = as || level
    return (
      <Component
        ref={ref as any}
        className={cn(headingVariants({ level, weight }), className)}
        {...props}
      />
    )
  }
)

Heading.displayName = 'Heading'
