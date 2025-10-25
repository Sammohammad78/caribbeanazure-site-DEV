import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Semantic Text component for consistent body copy, labels, and captions.
 * Follows €100k quality typography standards.
 */

const textVariants = cva('', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    variant: {
      body: 'text-[color:var(--fg)]',
      subtle: 'text-[color:var(--fg-subtle)]',
      muted: 'text-[color:var(--fg-muted)]',
      brand: 'text-[color:var(--brand)]',
      accent: 'text-[color:var(--accent)]',
      error: 'text-[color:var(--err)]',
    },
  },
  defaultVariants: {
    size: 'base',
    weight: 'normal',
    variant: 'body',
  },
})

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {}

export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, size, weight, variant, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(textVariants({ size, weight, variant }), className)}
        {...props}
      />
    )
  }
)

Text.displayName = 'Text'

// Separate span variant for inline use
export const TextSpan = React.forwardRef<HTMLSpanElement, Omit<TextProps, 'ref'>>(
  ({ className, size, weight, variant, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(textVariants({ size, weight, variant }), className)}
        {...props}
      />
    )
  }
)

TextSpan.displayName = 'TextSpan'
