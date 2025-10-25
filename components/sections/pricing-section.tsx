'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, MessageCircle } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { cn } from '@/lib/utils'

export function PricingSection() {
  const t = useTranslations('pricing')
  const locale = useLocale()

  const whatsappNumber = '31612345678'
  const whatsappMessage = encodeURIComponent(
    locale === 'nl'
      ? 'Hoi Caribbean Azure, ik wil graag meer weten over jullie pakketten.'
      : 'Hi Caribbean Azure, I\'d like to learn more about your packages.'
  )
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  const tiers = t.raw('tiers') as Array<{
    name: string
    tagline: string
    price: string
    features: string[]
  }>

  return (
    <section className="section-padding-y">
      <div className="container-custom">
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">{t('title')}</h2>
          <p className="copy-20 text-[color:var(--fg-subtle)]">{t('subtitle')}</p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-8 md:grid-cols-3">
          {tiers.map((tier, index) => (
            <Card
              key={tier.name}
              className={cn(
                'card-gradient-stripe relative flex h-full flex-col overflow-hidden rounded-3xl p-8',
                index === 1
                  ? 'border-[color:color-mix(in_oklab,var(--accent)_38%,transparent)] shadow-[0_24px_80px_rgb(45_43_99/30%)]'
                  : 'border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)]'
              )}
            >
              {index === 1 && (
                <div className="absolute -left-2 top-10 h-24 w-24 rotate-45 bg-[linear-gradient(135deg,var(--brand)_0%,var(--accent)_100%)] opacity-40 blur-xl" />
              )}

              {index === 1 && (
                <div className="absolute right-8 top-8 inline-flex items-center rounded-full bg-[linear-gradient(135deg,var(--brand)_0%,var(--accent)_100%)] px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-[0_10px_28px_color-mix(in_oklab,var(--accent)_45%,transparent)]">
                  Populair
                </div>
              )}

              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-semibold text-body">{tier.name}</CardTitle>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-body">{tier.price}</span>
                  <span className="text-xs uppercase tracking-[0.28em] text-[color:var(--fg-muted)]">
                    ex btw
                  </span>
                </div>
                <CardDescription className="mt-3 text-sm text-[color:var(--fg-subtle)]">
                  {tier.tagline}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 space-y-4">
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-left">
                      <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[color:color-mix(in_oklab,var(--brand-soft)_70%,transparent)] text-[color:var(--brand)]">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-sm text-[color:var(--fg-subtle)]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="mt-6">
                <Button asChild className="w-full" variant={index === 1 ? 'default' : 'outline'}>
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    {t('cta')}
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
