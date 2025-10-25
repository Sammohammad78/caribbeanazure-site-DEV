'use client'

import { useTranslations } from 'next-intl'
import { Shield, Server, Wrench } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TrustStripProps {
  className?: string
  variant?: 'default' | 'compact'
}

export function TrustStrip({ className, variant = 'default' }: TrustStripProps) {
  const t = useTranslations('trust')

  const items = [
    {
      icon: Server,
      label: t('items.0'), // EU-hosting
    },
    {
      icon: Shield,
      label: t('items.1'), // DPA beschikbaar
    },
    {
      icon: Wrench,
      label: t('items.2'), // n8n self-host optie
    },
  ]

  if (variant === 'compact') {
    return (
      <div className={cn('flex flex-wrap items-center justify-center gap-4 text-sm', className)}>
        {items.map((item, index) => {
          const Icon = item.icon
          return (
            <div
              key={index}
              className="flex items-center gap-2 text-[color:var(--fg-muted)]"
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              <span>{item.label}</span>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <section className={cn('border-y border-[color:color-mix(in_oklab,var(--fg)_10%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_50%,transparent)] py-8', className)}>
      <div className="container-custom">
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-sm font-medium uppercase tracking-wider text-[color:var(--fg-muted)]">
            {t('title')}
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {items.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 text-[color:var(--fg)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--accent)]/10">
                    <Icon className="h-5 w-5 text-[color:var(--accent)]" aria-hidden="true" />
                  </div>
                  <span className="font-medium">{item.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
