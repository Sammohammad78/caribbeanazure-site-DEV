import { getTranslations } from 'next-intl/server'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, ArrowRight, GitBranch, FileImage, Database, TrendingUp, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { BackgroundEngine } from '@/components/backgrounds/BackgroundEngine'
import { backgroundThemes } from '@/lib/backgroundThemes'
import { TrustStrip } from '@/components/sections/trust-strip'
import { RoiCalculator } from '@/components/roi/RoiCalculator'
import { formatCurrency } from '@/lib/format'

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'solutions.manufacturing' })

  return {
    title: `${t('title')} · Caribbean Azure`,
    description: t('subtitle'),
  }
}

export default async function ManufacturingPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'solutions.manufacturing' })
  const locale = params.locale as 'nl' | 'en'

  const useCases = [
    {
      icon: GitBranch,
      name: t('useCases.0.name'),
      description: t('useCases.0.description'),
      example: t('useCases.0.example'),
    },
    {
      icon: FileImage,
      name: t('useCases.1.name'),
      description: t('useCases.1.description'),
      example: t('useCases.1.example'),
    },
    {
      icon: Database,
      name: t('useCases.2.name'),
      description: t('useCases.2.description'),
      example: t('useCases.2.example'),
    },
  ]

  const features = [
    t('features.0'),
    t('features.1'),
    t('features.2'),
    t('features.3'),
    t('features.4'),
    t('features.5'),
  ]

  const kpis = [
    t('kpis.items.0'),
    t('kpis.items.1'),
    t('kpis.items.2'),
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
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 px-4 py-2 text-sm font-medium text-[color:var(--brand)]">
                  <Sparkles className="h-4 w-4" />
                  {locale === 'nl' ? 'Tier 2 · Aanbevolen voor maakbedrijven' : 'Tier 2 · Recommended for manufacturing'}
                </div>
                <h1 className="text-balance text-fluid-h1 font-bold">
                  {t('title')}
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-fluid-body text-[color:var(--fg-subtle)]">
                  {t('subtitle')}
                </p>

                {/* Pricing */}
                <div className="mt-8 inline-flex flex-col items-center gap-4 rounded-2xl border-2 border-[color:color-mix(in_oklab,var(--accent)_35%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-6 shadow-[0_28px_90px_rgb(45_43_99/20%)]">
                  <div className="text-4xl font-bold text-[color:var(--brand)]">
                    {locale === 'nl' ? 'vanaf ' : 'from '}
                    {formatCurrency(1999, locale)}
                  </div>
                  <p className="text-sm text-[color:var(--fg-muted)]">
                    {locale === 'nl' ? 'excl. btw · vanaf-prijs, exacte scope bepaald in intake' : 'excl. VAT · from-price, exact scope determined in intake'}
                  </p>
                  <div className="flex gap-3">
                    <Button asChild size="lg">
                      <Link href={`/${locale}/contact`}>
                        {t('cta')}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                      <Link href={`/${locale}/tarieven`}>
                        {locale === 'nl' ? 'Bekijk alle tarieven' : 'View all pricing'}
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

          {/* KPIs */}
          <section className="section-padding-y bg-gradient-to-br from-[color:var(--brand-600)] to-[color:var(--brand-400)] text-white">
            <div className="container-custom">
              <div className="text-center">
                <h2 className="text-3xl font-bold md:text-4xl">{t('kpis.title')}</h2>
                <div className="mt-12 grid gap-8 md:grid-cols-3">
                  {kpis.map((kpi, idx) => (
                    <div key={idx} className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                      <div className="text-4xl font-bold">{kpi.split(' ')[0]}</div>
                      <div className="mt-2 text-lg opacity-90">{kpi.substring(kpi.indexOf(' ') + 1)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Use Cases */}
          <section className="section-padding-y">
            <div className="container-custom">
              <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  {locale === 'nl' ? 'Wat we bouwen voor je' : 'What we build for you'}
                </h2>
                <p className="mt-4 text-lg text-[color:var(--fg-subtle)]">
                  {locale === 'nl'
                    ? 'Productie-klare oplossingen die sales direct koppelen aan manufacturing'
                    : 'Production-ready solutions that directly connect sales to manufacturing'}
                </p>
              </div>

              <div className="grid gap-8 lg:grid-cols-3">
                {useCases.map((useCase, idx) => {
                  const Icon = useCase.icon
                  return (
                    <Card key={idx} className="rounded-2xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] p-6">
                      <CardHeader className="p-0">
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                          <Icon className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-xl">{useCase.name}</CardTitle>
                        <CardDescription className="mt-2 text-base leading-relaxed">
                          {useCase.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="mt-4 p-0">
                        <div className="rounded-lg bg-[color:color-mix(in_oklab,var(--fg)_5%,transparent)] p-4">
                          <p className="text-sm font-medium text-[color:var(--fg-muted)]">
                            {locale === 'nl' ? 'Voorbeeld:' : 'Example:'}
                          </p>
                          <p className="mt-1 text-sm text-[color:var(--fg-subtle)]">
                            {useCase.example}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="section-padding-y bg-[color:color-mix(in_oklab,var(--panel)_30%,transparent)]">
            <div className="container-custom">
              <div className="mx-auto max-w-3xl">
                <Card className="rounded-2xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] p-8">
                  <CardHeader className="p-0">
                    <CardTitle className="text-2xl">
                      {locale === 'nl' ? 'Functionaliteit & mogelijkheden' : 'Features & capabilities'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="mt-6 grid gap-4 p-0 sm:grid-cols-2">
                    {features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[color:color-mix(in_oklab,var(--brand-soft)_68%,transparent)] text-[color:var(--brand)]">
                          <Check className="h-3 w-3" />
                        </span>
                        <span className="text-sm text-[color:var(--fg-subtle)]">{feature}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* ROI Calculator */}
          <section className="section-padding-y">
            <div className="container-custom">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  {locale === 'nl' ? 'Bereken jouw ROI' : 'Calculate your ROI'}
                </h2>
                <p className="mt-4 text-lg text-[color:var(--fg-subtle)]">
                  {locale === 'nl'
                    ? 'Typisch bespaart Manufacturing Automation 60% engineering tijd'
                    : 'Typically Manufacturing Automation saves 60% engineering time'}
                </p>
              </div>
              <div className="mx-auto max-w-4xl">
                <RoiCalculator
                  variant="card"
                  preset="manufacturing"
                  showExport
                  showMethodNote
                />
              </div>
            </div>
          </section>

          {/* Upgrade CTA */}
          <section className="section-padding-y bg-[color:color-mix(in_oklab,var(--panel)_30%,transparent)]">
            <div className="container-custom">
              <div className="rounded-3xl border border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-gradient-to-br from-[color:var(--panel)] to-[color:color-mix(in_oklab,var(--brand)_5%,transparent)] p-12 text-center">
                <h2 className="text-2xl font-bold md:text-3xl">
                  {locale === 'nl' ? 'Volledige product configuratie nodig?' : 'Need full product configuration?'}
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-[color:var(--fg-subtle)]">
                  {locale === 'nl'
                    ? 'Bekijk onze CPQ & Configure-to-Production oplossingen voor complexe producten met duizenden varianten.'
                    : 'Check out our CPQ & Configure-to-Production solutions for complex products with thousands of variants.'}
                </p>
                <div className="mt-8">
                  <Button asChild size="lg">
                    <Link href={`/${locale}/oplossingen/configurators`}>
                      {locale === 'nl' ? 'Configurator oplossingen' : 'Configurator solutions'}
                      <ArrowRight className="ml-2 h-4 w-4" />
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
