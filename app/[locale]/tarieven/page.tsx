import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, Info, ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { BackgroundEngine } from '@/components/backgrounds/BackgroundEngine'
import { backgroundThemes } from '@/lib/backgroundThemes'
import { RoiCalculator } from '@/components/roi/RoiCalculator'
import { TrustStrip } from '@/components/sections/trust-strip'
import { PricingSchema } from '@/components/seo/structured-data'
import { formatCurrency, getPriceOnRequest } from '@/lib/format'

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'pricing' })

  return {
    title: `${t('title')} · Caribbean Azure`,
    description: t('subtitle'),
  }
}

export default async function TarievenPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'pricing' })
  const locale = params.locale as 'nl' | 'en'

  // Get pricing tiers from translations
  const tiers = [
    {
      id: 'light',
      name: t('tiers.0.name'),
      tagline: t('tiers.0.tagline'),
      price: 999,
      priceDisplay: formatCurrency(999, locale),
      features: [
        t('tiers.0.features.0'),
        t('tiers.0.features.1'),
        t('tiers.0.features.2'),
        t('tiers.0.features.3'),
        t('tiers.0.features.4'),
        t('tiers.0.features.5'),
      ],
      cta: t('tiers.0.cta'),
      ctaLink: `/${locale}/oplossingen/light`,
      highlight: false,
    },
    {
      id: 'manufacturing',
      name: t('tiers.1.name'),
      tagline: t('tiers.1.tagline'),
      price: 1999,
      priceDisplay: formatCurrency(1999, locale),
      features: [
        t('tiers.1.features.0'),
        t('tiers.1.features.1'),
        t('tiers.1.features.2'),
        t('tiers.1.features.3'),
        t('tiers.1.features.4'),
        t('tiers.1.features.5'),
      ],
      cta: t('tiers.1.cta'),
      ctaLink: `/${locale}/oplossingen/maakindustrie`,
      highlight: true,
    },
    {
      id: 'configurators',
      name: t('tiers.2.name'),
      tagline: t('tiers.2.tagline'),
      price: null,
      priceDisplay: getPriceOnRequest(locale),
      features: [
        t('tiers.2.features.0'),
        t('tiers.2.features.1'),
        t('tiers.2.features.2'),
        t('tiers.2.features.3'),
        t('tiers.2.features.4'),
        t('tiers.2.features.5'),
      ],
      cta: t('tiers.2.cta'),
      ctaLink: `/${locale}/contact`,
      highlight: false,
    },
  ]

  const includedItems = [
    locale === 'nl'
      ? 'Kick-off sessie met stakeholders en scope review'
      : 'Kick-off session with stakeholders and scope review',
    locale === 'nl'
      ? 'Blueprint presentatie inclusief flowcharts en datastromen'
      : 'Blueprint presentation with flowcharts and data flows',
    locale === 'nl'
      ? 'Logging, monitoring en rollback scenario\'s'
      : 'Logging, monitoring and rollback scenarios',
    locale === 'nl'
      ? 'Training en documentatie voor je team in Nederlands en Engels'
      : 'Training and documentation for your team in Dutch and English',
  ]

  return (
    <>
      {/* Schema.org structured data for pricing */}
      <PricingSchema locale={locale} />

      <div className="relative">
        {/* 3D Background */}
        <div className="fixed inset-0 -z-10">
          <BackgroundEngine theme={backgroundThemes.pricing} />
        </div>

        <Header />

        <main id="main-content">
          {/* Hero Section */}
          <section className="section-padding-y hero-glow">
            <div className="container-custom text-center">
              <h1 className="text-balance text-fluid-h1 font-bold">
                {t('title')}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-fluid-body text-[color:var(--fg-subtle)]">
                {t('subtitle')}
              </p>
            </div>
          </section>

          {/* Trust Strip */}
          <TrustStrip variant="compact" className="pb-12" />

          {/* Pricing Tiers */}
          <section className="section-padding-y">
            <div className="container-custom">
              <div className="grid gap-8 lg:grid-cols-3">
                {tiers.map((tier) => (
                  <Card
                    key={tier.id}
                    className={`card-gradient-stripe flex h-full flex-col rounded-3xl p-8 ${
                      tier.highlight
                        ? 'border-[color:color-mix(in_oklab,var(--accent)_35%,transparent)] shadow-[0_28px_90px_rgb(45_43_99/28%)] ring-2 ring-[color:var(--accent)]/20'
                        : 'border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)]'
                    }`}
                  >
                    {tier.highlight && (
                      <span className="mb-4 inline-flex max-w-max items-center gap-1.5 rounded-full bg-[linear-gradient(135deg,var(--brand)_0%,var(--accent)_100%)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-[0_12px_28px_color-mix(in_oklab,var(--accent)_45%,transparent)]">
                        <Sparkles className="h-3 w-3" />
                        {locale === 'nl' ? 'Aanbevolen' : 'Recommended'}
                      </span>
                    )}

                    <CardHeader className="space-y-4 p-0">
                      <CardTitle className="text-2xl font-semibold text-body">
                        {tier.name}
                      </CardTitle>
                      <div>
                        <div className="text-3xl font-bold text-[color:var(--brand)]">
                          {tier.price ? (
                            <>
                              {locale === 'nl' ? 'vanaf ' : 'from '}
                              {tier.priceDisplay}
                            </>
                          ) : (
                            tier.priceDisplay
                          )}
                        </div>
                        {tier.price && (
                          <p className="mt-1 text-xs text-[color:var(--fg-muted)]">
                            {locale === 'nl' ? 'excl. btw' : 'excl. VAT'}
                          </p>
                        )}
                      </div>
                      <p className="text-sm leading-relaxed text-[color:var(--fg-subtle)]">
                        {tier.tagline}
                      </p>
                    </CardHeader>

                    <CardContent className="mt-6 flex-1 space-y-3 p-0">
                      {tier.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-sm text-[color:var(--fg-subtle)]">
                          <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[color:color-mix(in_oklab,var(--brand-soft)_68%,transparent)] text-[color:var(--brand)]">
                            <Check className="h-3 w-3" />
                          </span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </CardContent>

                    <CardFooter className="mt-8 p-0">
                      <Button
                        asChild
                        className="w-full"
                        variant={tier.highlight ? 'default' : 'outline'}
                        size="lg"
                      >
                        <Link href={tier.ctaLink}>
                          {tier.cta}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {/* Pricing Disclaimer */}
              <div className="mt-8 text-center">
                <p className="text-sm text-[color:var(--fg-muted)]">
                  {t('disclaimer')}
                </p>
              </div>
            </div>
          </section>

          {/* ROI Calculator Section */}
          <section className="section-padding-y bg-[color:color-mix(in_oklab,var(--panel)_30%,transparent)]">
            <div className="container-custom">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-fluid-h2 font-bold">
                  {locale === 'nl' ? 'Bereken jouw ROI' : 'Calculate your ROI'}
                </h2>
                <p className="mt-4 text-fluid-body text-[color:var(--fg-subtle)]">
                  {locale === 'nl'
                    ? 'Ontdek hoeveel je kunt besparen met automatisering'
                    : 'Discover how much you can save with automation'}
                </p>
              </div>
              <div className="mx-auto max-w-4xl">
                <RoiCalculator
                  variant="card"
                  showExport
                  showMethodNote
                  enableUrlSync
                />
              </div>
            </div>
          </section>

          {/* What's Included Section */}
          <section className="section-padding-y">
            <div className="container-custom">
              <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-10">
                <CardHeader className="space-y-4 p-0">
                  <CardTitle className="text-2xl font-semibold text-body">
                    {locale === 'nl' ? 'Wat inbegrepen is' : 'What is included'}
                  </CardTitle>
                  <CardDescription className="text-base text-[color:var(--fg-subtle)]">
                    {locale === 'nl'
                      ? 'We leveren meer dan alleen configuratie. Elk traject bevat kennisoverdracht en borging.'
                      : 'You get more than configuration. Every engagement includes knowledge transfer and governance.'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-8 grid gap-6 p-0 md:grid-cols-2">
                  {includedItems.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-[color:var(--fg-subtle)]">
                      <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-[color:var(--accent)]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Final CTA */}
          <section className="section-padding-y">
            <div className="container-custom">
              <div className="rounded-3xl bg-gradient-to-br from-[color:var(--brand-600)] to-[color:var(--brand-400)] p-12 text-center text-white">
                <h2 className="text-fluid-h2 font-bold">
                  {locale === 'nl' ? 'Klaar om te starten?' : 'Ready to get started?'}
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-fluid-body opacity-90">
                  {locale === 'nl'
                    ? 'Plan een gratis intake en ontdek welke oplossing het beste past bij jouw organisatie.'
                    : 'Book a free intake and discover which solution fits your organization best.'}
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button asChild size="lg" variant="secondary">
                    <Link href={`/${locale}/contact`}>
                      {t('cta')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
                    <Link href={`/${locale}/cases`}>
                      {locale === 'nl' ? 'Bekijk cases' : 'View cases'}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}
