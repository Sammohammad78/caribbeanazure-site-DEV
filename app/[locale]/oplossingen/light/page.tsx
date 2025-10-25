import { getTranslations } from 'next-intl/server'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, ArrowRight, Mail, Calendar, MessageSquare, FileText } from 'lucide-react'
import Link from 'next/link'
import { BackgroundEngine } from '@/components/backgrounds/BackgroundEngine'
import { backgroundThemes } from '@/lib/backgroundThemes'
import { TrustStrip } from '@/components/sections/trust-strip'
import { RoiCalculator } from '@/components/roi/RoiCalculator'
import { formatCurrency } from '@/lib/format'

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'solutions.light' })

  return {
    title: `${t('title')} · Caribbean Azure`,
    description: t('subtitle'),
  }
}

export default async function LightAutomationsPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'solutions.light' })
  const locale = params.locale as 'nl' | 'en'

  const useCases = [
    {
      icon: Mail,
      name: t('useCases.0.name'),
      description: t('useCases.0.description'),
      example: t('useCases.0.example'),
    },
    {
      icon: Calendar,
      name: t('useCases.1.name'),
      description: t('useCases.1.description'),
      example: t('useCases.1.example'),
    },
    {
      icon: MessageSquare,
      name: t('useCases.2.name'),
      description: t('useCases.2.description'),
      example: t('useCases.2.example'),
    },
    {
      icon: FileText,
      name: t('useCases.3.name'),
      description: t('useCases.3.description'),
      example: t('useCases.3.example'),
    },
  ]

  const includes = [
    t('includes.0'),
    t('includes.1'),
    t('includes.2'),
    t('includes.3'),
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
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 px-4 py-2 text-sm font-medium text-[color:var(--brand)]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
                  </span>
                  {locale === 'nl' ? 'Tier 1' : 'Tier 1'}
                </div>
                <h1 className="text-balance text-fluid-h1 font-bold">
                  {t('title')}
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-fluid-body text-[color:var(--fg-subtle)]">
                  {t('subtitle')}
                </p>

                {/* Pricing */}
                <div className="mt-8 inline-flex flex-col items-center gap-4 rounded-2xl border border-[color:color-mix(in_oklab,var(--accent)_25%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-6">
                  <div className="text-4xl font-bold text-[color:var(--brand)]">
                    {locale === 'nl' ? 'vanaf ' : 'from '}
                    {formatCurrency(999, locale)}
                  </div>
                  <p className="text-sm text-[color:var(--fg-muted)]">
                    {locale === 'nl' ? 'excl. btw · exacte prijs afhankelijk van scope' : 'excl. VAT · exact price depends on scope'}
                  </p>
                  <div className="flex gap-3">
                    <Button asChild size="lg">
                      <Link href={`/${locale}/contact`}>
                        {locale === 'nl' ? 'Plan een intake' : 'Book an intake'}
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

          {/* Use Cases */}
          <section className="section-padding-y bg-[color:color-mix(in_oklab,var(--panel)_30%,transparent)]">
            <div className="container-custom">
              <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  {locale === 'nl' ? 'Concrete use-cases' : 'Concrete use cases'}
                </h2>
                <p className="mt-4 text-lg text-[color:var(--fg-subtle)]">
                  {locale === 'nl'
                    ? 'Kleine automaties die binnen dagen live gaan en direct resultaat opleveren'
                    : 'Small automations that go live within days and deliver immediate results'}
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                {useCases.map((useCase, idx) => {
                  const Icon = useCase.icon
                  return (
                    <Card key={idx} className="rounded-2xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] p-6">
                      <CardHeader className="p-0">
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white">
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

          {/* What's Included */}
          <section className="section-padding-y">
            <div className="container-custom">
              <div className="mx-auto max-w-3xl">
                <Card className="rounded-2xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] p-8">
                  <CardHeader className="p-0">
                    <CardTitle className="text-2xl">
                      {locale === 'nl' ? 'Inbegrepen bij elke Light Automation' : 'Included with every Light Automation'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="mt-6 space-y-4 p-0">
                    {includes.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[color:color-mix(in_oklab,var(--brand-soft)_68%,transparent)] text-[color:var(--brand)]">
                          <Check className="h-3 w-3" />
                        </span>
                        <span className="text-[color:var(--fg-subtle)]">{item}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
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
                    ? 'Ontdek hoeveel je kunt besparen met Light Automations'
                    : 'Discover how much you can save with Light Automations'}
                </p>
              </div>
              <div className="mx-auto max-w-4xl">
                <RoiCalculator
                  variant="card"
                  preset="light"
                  showExport
                  showMethodNote
                />
              </div>
            </div>
          </section>

          {/* Upgrade Path */}
          <section className="section-padding-y">
            <div className="container-custom">
              <div className="rounded-3xl border border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-gradient-to-br from-[color:var(--panel)] to-[color:color-mix(in_oklab,var(--brand)_5%,transparent)] p-12 text-center">
                <h2 className="text-2xl font-bold md:text-3xl">
                  {locale === 'nl' ? 'Klaar voor meer?' : 'Ready for more?'}
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-[color:var(--fg-subtle)]">
                  {locale === 'nl'
                    ? 'Complexere processen nodig? Bekijk onze Manufacturing en Configurator oplossingen.'
                    : 'Need more complex processes? Check out our Manufacturing and Configurator solutions.'}
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button asChild size="lg" variant="outline">
                    <Link href={`/${locale}/oplossingen/maakindustrie`}>
                      {locale === 'nl' ? 'Manufacturing oplossingen' : 'Manufacturing solutions'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
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
