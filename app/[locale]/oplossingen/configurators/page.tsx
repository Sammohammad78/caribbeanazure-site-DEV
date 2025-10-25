import { getTranslations } from 'next-intl/server'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, ArrowRight, Settings, Boxes, Cpu, Video } from 'lucide-react'
import Link from 'next/link'
import { BackgroundEngine } from '@/components/backgrounds/BackgroundEngine'
import { backgroundThemes } from '@/lib/backgroundThemes'
import { TrustStrip } from '@/components/sections/trust-strip'
import { RoiCalculator } from '@/components/roi/RoiCalculator'
import { getPriceOnRequest } from '@/lib/format'

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'solutions.configurators' })

  return {
    title: `${t('title')} · Caribbean Azure`,
    description: t('subtitle'),
  }
}

export default async function ConfiguratorsPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'solutions.configurators' })
  const locale = params.locale as 'nl' | 'en'

  const configuratorTypes = [
    {
      icon: Settings,
      name: t('types.0.name'),
      description: t('types.0.description'),
      features: [
        t('types.0.features.0'),
        t('types.0.features.1'),
        t('types.0.features.2'),
        t('types.0.features.3'),
        t('types.0.features.4'),
        t('types.0.features.5'),
      ],
    },
    {
      icon: Boxes,
      name: t('types.1.name'),
      description: t('types.1.description'),
      features: [
        t('types.1.features.0'),
        t('types.1.features.1'),
        t('types.1.features.2'),
        t('types.1.features.3'),
        t('types.1.features.4'),
        t('types.1.features.5'),
      ],
    },
  ]

  const examples = [
    {
      icon: Cpu,
      industry: t('examples.0.industry'),
      challenge: t('examples.0.challenge'),
      solution: t('examples.0.solution'),
    },
    {
      icon: Video,
      industry: t('examples.1.industry'),
      challenge: t('examples.1.challenge'),
      solution: t('examples.1.solution'),
    },
  ]

  return (
    <>
      <div className="relative">
        {/* 3D Background */}
        <div className="fixed inset-0 -z-10">
          <BackgroundEngine theme={backgroundThemes.services} />
        </div>

        <Header />

        <main id="main-content">
          {/* Hero Section */}
          <section className="section-padding-y hero-glow">
            <div className="container-custom">
              <div className="mx-auto max-w-3xl text-center">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-4 py-2 text-sm font-medium text-[color:var(--brand)]">
                  {locale === 'nl' ? 'Tier 3 · Maatwerk' : 'Tier 3 · Custom'}
                </div>
                <h1 className="text-balance text-fluid-h1 font-bold">
                  {t('title')}
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-fluid-body text-[color:var(--fg-subtle)]">
                  {t('subtitle')}
                </p>

                {/* Pricing */}
                <div className="mt-8 inline-flex flex-col items-center gap-4 rounded-2xl border border-[color:color-mix(in_oklab,var(--fg)_20%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-6">
                  <div className="text-3xl font-bold text-[color:var(--brand)]">
                    {getPriceOnRequest(locale)}
                  </div>
                  <p className="text-sm text-[color:var(--fg-muted)]">
                    {t('priceNote')}
                  </p>
                  <div className="flex gap-3">
                    <Button asChild size="lg">
                      <Link href={`/${locale}/contact`}>
                        {t('cta')}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Trust Strip */}
          <TrustStrip variant="compact" className="pb-12" />

          {/* Description */}
          <section className="section-padding-y">
            <div className="container-custom">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-lg leading-relaxed text-[color:var(--fg-subtle)]">
                  {t('description')}
                </p>
              </div>
            </div>
          </section>

          {/* Configurator Types */}
          <section className="section-padding-y bg-[color:color-mix(in_oklab,var(--panel)_30%,transparent)]">
            <div className="container-custom">
              <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  {locale === 'nl' ? 'Twee niveaus van configuratie' : 'Two levels of configuration'}
                </h2>
                <p className="mt-4 text-lg text-[color:var(--fg-subtle)]">
                  {locale === 'nl'
                    ? 'Van standaard CPQ tot volledige productie-integratie'
                    : 'From standard CPQ to full production integration'}
                </p>
              </div>

              <div className="grid gap-8 lg:grid-cols-2">
                {configuratorTypes.map((type, idx) => {
                  const Icon = type.icon
                  return (
                    <Card key={idx} className="rounded-2xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] p-8">
                      <CardHeader className="p-0">
                        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg">
                          <Icon className="h-7 w-7" />
                        </div>
                        <CardTitle className="text-2xl">{type.name}</CardTitle>
                        <CardDescription className="mt-3 text-base leading-relaxed">
                          {type.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="mt-6 space-y-3 p-0">
                        {type.features.map((feature, fidx) => (
                          <div key={fidx} className="flex items-start gap-3">
                            <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[color:color-mix(in_oklab,var(--brand-soft)_68%,transparent)] text-[color:var(--brand)]">
                              <Check className="h-3 w-3" />
                            </span>
                            <span className="text-sm text-[color:var(--fg-subtle)]">{feature}</span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Examples */}
          <section className="section-padding-y">
            <div className="container-custom">
              <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  {locale === 'nl' ? 'Concrete voorbeelden' : 'Concrete examples'}
                </h2>
                <p className="mt-4 text-lg text-[color:var(--fg-subtle)]">
                  {locale === 'nl'
                    ? 'Zo werken configurators in de praktijk'
                    : 'How configurators work in practice'}
                </p>
              </div>

              <div className="grid gap-8 lg:grid-cols-2">
                {examples.map((example, idx) => {
                  const Icon = example.icon
                  return (
                    <Card key={idx} className="rounded-2xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] p-6">
                      <CardHeader className="p-0">
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                          <Icon className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-xl">{example.industry}</CardTitle>
                      </CardHeader>
                      <CardContent className="mt-4 space-y-4 p-0">
                        <div>
                          <p className="text-sm font-semibold text-[color:var(--fg-muted)]">
                            {locale === 'nl' ? 'Uitdaging:' : 'Challenge:'}
                          </p>
                          <p className="mt-1 text-sm text-[color:var(--fg-subtle)]">
                            {example.challenge}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[color:var(--fg-muted)]">
                            {locale === 'nl' ? 'Oplossing:' : 'Solution:'}
                          </p>
                          <p className="mt-1 text-sm text-[color:var(--fg-subtle)]">
                            {example.solution}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </section>

          {/* ROI Calculator */}
          <section className="section-padding-y bg-[color:color-mix(in_oklab,var(--panel)_30%,transparent)]">
            <div className="container-custom">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  {locale === 'nl' ? 'Bereken jouw ROI' : 'Calculate your ROI'}
                </h2>
                <p className="mt-4 text-lg text-[color:var(--fg-subtle)]">
                  {locale === 'nl'
                    ? 'Configurators besparen typisch 60-80% engineering tijd en elimineren productiefouten'
                    : 'Configurators typically save 60-80% engineering time and eliminate production errors'}
                </p>
              </div>
              <div className="mx-auto max-w-4xl">
                <RoiCalculator
                  variant="card"
                  preset="c2p"
                  showExport
                  showMethodNote
                />
              </div>
            </div>
          </section>

          {/* Sticky CTA Section */}
          <section className="section-padding-y">
            <div className="container-custom">
              <div className="rounded-3xl bg-gradient-to-br from-[color:var(--brand-600)] to-[color:var(--brand-400)] p-12 text-center text-white shadow-2xl">
                <h2 className="text-3xl font-bold md:text-4xl">
                  {locale === 'nl' ? 'Klaar voor een configurator?' : 'Ready for a configurator?'}
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-lg opacity-90">
                  {locale === 'nl'
                    ? 'Plan een intake om jouw product, varianten en productieproces door te nemen. We beoordelen samen of een configurator de beste oplossing is.'
                    : 'Book an intake to discuss your product, variants, and production process. We\'ll assess together whether a configurator is the best solution.'}
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
