import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Container component for consistent max-width and horizontal padding.
 * Follows the €100k quality design system with proper responsive breakpoints.
 */

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Maximum width variant
   * @default "default"
   */
  size?: 'default' | 'narrow' | 'wide' | 'full'
}

const containerVariants = {
  default: 'max-w-7xl',      // 1280px - standard content width
  narrow: 'max-w-4xl',       // 896px - for focused content (about, legal)
  wide: 'max-w-[1440px]',    // 1440px - for wider layouts
  full: 'w-full',            // 100% - no max-width
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mx-auto px-4 sm:px-6 lg:px-8',
          containerVariants[size],
          className
        )}
        {...props}
      />
    )
  }
)

Container.displayName = 'Container'
