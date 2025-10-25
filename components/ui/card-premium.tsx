'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface CardPremiumProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  glow?: boolean
}

const CardPremium = React.forwardRef<HTMLDivElement, CardPremiumProps>(
  ({ className, hover = true, glow = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-3xl border border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_60%,transparent)] p-8 backdrop-blur-xl",
          "shadow-[0_8px_32px_rgba(0,0,0,0.08)]",
          "relative overflow-hidden",
          hover && "transition-all duration-300 hover:border-[color:color-mix(in_oklab,var(--brand)_32%,transparent)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.12)] hover:scale-[1.02] hover:-translate-y-1",
          glow && "before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-[color:color-mix(in_oklab,var(--brand)_8%,transparent)] before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100",
          className
        )}
        {...props}
      >
        {/* Noise texture overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' /%3E%3C/svg%3E")`,
          }}
        />

        {/* Inner glow */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-50" />

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </div>
    )
  }
)
CardPremium.displayName = 'CardPremium'

const CardPremiumHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-3 pb-6', className)}
    {...props}
  />
))
CardPremiumHeader.displayName = 'CardPremiumHeader'

const CardPremiumTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-tight tracking-tight text-body',
      className
    )}
    {...props}
  />
))
CardPremiumTitle.displayName = 'CardPremiumTitle'

const CardPremiumDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm leading-relaxed text-[color:var(--fg-subtle)]', className)}
    {...props}
  />
))
CardPremiumDescription.displayName = 'CardPremiumDescription'

const CardPremiumContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('', className)} {...props} />
))
CardPremiumContent.displayName = 'CardPremiumContent'

export {
  CardPremium,
  CardPremiumHeader,
  CardPremiumTitle,
  CardPremiumDescription,
  CardPremiumContent,
}
