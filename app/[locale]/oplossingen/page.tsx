import { getTranslations } from 'next-intl/server'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Zap, Factory, Settings, TrendingUp, Clock, Users, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import { BackgroundEngine } from '@/components/backgrounds/BackgroundEngine'
import { backgroundThemes } from '@/lib/backgroundThemes'
import { TrustStrip } from '@/components/sections/trust-strip'
import { formatCurrency, getPriceOnRequest } from '@/lib/format'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'solutions' })
  const locale = params.locale

  return {
    title: `${t('title')} · Caribbean Azure`,
    description: t('subtitle'),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
      },
    },
    alternates: {
      canonical: `https://www.caribbeanazure.com${locale === 'en' ? '/en' : ''}/oplossingen`,
      languages: {
        'nl-NL': 'https://www.caribbeanazure.com/oplossingen',
        'en-US': 'https://www.caribbeanazure.com/en/oplossingen',
      },
    },
    openGraph: {
      title: `${t('title')} · Caribbean Azure`,
      description: t('subtitle'),
      url: `https://www.caribbeanazure.com${locale === 'en' ? '/en' : ''}/oplossingen`,
      siteName: 'Caribbean Azure',
      locale: locale === 'nl' ? 'nl_NL' : 'en_US',
      type: 'website',
    },
  }
}

export default async function OplossingenPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'solutions' })
  const tCommon = await getTranslations({ locale: params.locale, namespace: 'common' })
  const locale = params.locale as 'nl' | 'en'

  // Build locale-aware href (NL at root, EN with /en prefix)
  const buildHref = (slug: string) => (locale === 'nl' ? `/${slug}` : `/en/${slug}`)

  // Breadcrumb for SEO
  const breadcrumbItems = [
    { name: locale === 'nl' ? 'Home' : 'Home', url: 'https://www.caribbeanazure.com' + (locale === 'en' ? '/en' : '') },
    { name: t('title'), url: 'https://www.caribbeanazure.com' + buildHref('oplossingen') },
  ]

  const solutions = [
    {
      id: 'light',
      icon: Zap,
      name: t('light.title'),
      subtitle: t('light.subtitle'),
      description: t('light.description'),
      price: formatCurrency(999, locale),
      priceLabel: tCommon('from'),
      href: buildHref('oplossingen/light'),
      color: 'from-amber-500 to-orange-500',
    },
    {
      id: 'manufacturing',
      icon: Factory,
      name: t('manufacturing.title'),
      subtitle: t('manufacturing.subtitle'),
      description: t('manufacturing.description'),
      price: formatCurrency(1999, locale),
      priceLabel: tCommon('from'),
      href: buildHref('oplossingen/maakindustrie'),
      color: 'from-blue-500 to-cyan-500',
      featured: true,
    },
    {
      id: 'configurators',
      icon: Settings,
      name: t('configurators.title'),
      subtitle: t('configurators.subtitle'),
      description: t('configurators.description'),
      price: getPriceOnRequest(locale),
      priceLabel: null,
      href: buildHref('oplossingen/configurators'),
      color: 'from-purple-500 to-pink-500',
    },
  ]

  return (
    <>
      {/* Breadcrumb Schema for SEO */}
      <BreadcrumbSchema items={breadcrumbItems} />

      <div className="relative">
        {/* 3D Background */}
        <div className="fixed inset-0 -z-10">
          <BackgroundEngine theme={backgroundThemes.services} />
        </div>

        <Header />

        <main id="main-content">
          {/* Hero Section */}
          <section className="section-padding-y hero-glow">
            <div className="container-custom text-center">
              <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                {t('title')}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-[color:var(--fg-subtle)]">
                {t('subtitle')}
              </p>
            </div>
          </section>

          {/* Trust Strip */}
          <TrustStrip className="mb-16" />

          {/* Solutions Grid */}
          <section className="section-padding-y">
            <div className="container-custom">
              <div className="grid gap-8 lg:grid-cols-3">
                {solutions.map((solution) => {
                  const Icon = solution.icon
                  return (
                    <Card
                      key={solution.id}
                      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border p-8 transition-all duration-300 hover:shadow-2xl ${
                        solution.featured
                          ? 'border-[color:color-mix(in_oklab,var(--accent)_35%,transparent)] ring-2 ring-[color:var(--accent)]/20'
                          : 'border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)]'
                      }`}
                    >
                      {/* Gradient Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${solution.color} opacity-5 transition-opacity duration-300 group-hover:opacity-10`} />

                      <CardHeader className="relative space-y-4 p-0">
                        {/* Icon */}
                        <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${solution.color} text-white shadow-lg`}>
                          <Icon className="h-7 w-7" />
                        </div>

                        {solution.featured && (
                          <span className="inline-flex max-w-max items-center rounded-full bg-[linear-gradient(135deg,var(--brand)_0%,var(--accent)_100%)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                            {tCommon('popular')}
                          </span>
                        )}

                        <CardTitle className="text-2xl font-semibold">
                          {solution.name}
                        </CardTitle>

                        <CardDescription className="text-base leading-relaxed text-[color:var(--fg-subtle)]">
                          {solution.subtitle}
                        </CardDescription>

                        {/* Price */}
                        <div className="pt-2">
                          <div className="text-3xl font-bold text-[color:var(--brand)]">
                            {solution.priceLabel && <span className="text-lg font-medium">{solution.priceLabel} </span>}
                            {solution.price}
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="relative mt-6 flex-1 p-0">
                        <p className="text-sm leading-relaxed text-[color:var(--fg-muted)]">
                          {solution.description}
                        </p>
                      </CardContent>

                      <CardFooter className="relative mt-8 p-0">
                        <Button
                          asChild
                          className="w-full"
                          variant={solution.featured ? 'default' : 'outline'}
                          size="lg"
                        >
                          <Link href={solution.href}>
                            {tCommon('learnMore')}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Case Studies Section */}
          <section className="section-padding-y bg-[color:color-mix(in_oklab,var(--panel)_40%,transparent)]">
            <div className="container-custom">
              <div className="mb-12 text-center">
                <h2 className="h2-fluid mb-4">{t('caseStudies.title')}</h2>
                <p className="copy-18 mx-auto max-w-2xl text-[color:var(--fg-subtle)]">
                  {t('caseStudies.subtitle')}
                </p>
              </div>

              <div className="grid gap-8 lg:grid-cols-3">
                {/* Case 1: Fintech Onboarding → Light */}
                <Card className="group rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--bg)_85%,transparent)] p-8 transition-all duration-300 hover:shadow-lg">
                  <CardHeader className="space-y-3 p-0">
                    <span className="copy-12 font-semibold uppercase tracking-[0.24em] text-[color:var(--fg-muted)]">
                      {t('caseStudies.case1.sector')}
                    </span>
                    <CardTitle className="h-24">
                      {t('caseStudies.case1.client')}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="mt-6 space-y-4 p-0">
                    <p className="copy-14 text-[color:var(--fg-subtle)]">
                      {t('caseStudies.case1.challenge')}
                    </p>

                    {/* Results */}
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[color:color-mix(in_oklab,var(--accent)_15%,transparent)] text-[color:var(--accent)]">
                          <Clock className="h-4 w-4" />
                        </div>
                        <p className="copy-14 font-semibold leading-relaxed">
                          {t('caseStudies.case1.result1')}
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[color:color-mix(in_oklab,var(--brand)_15%,transparent)] text-[color:var(--brand)]">
                          <Users className="h-4 w-4" />
                        </div>
                        <p className="copy-14 font-semibold leading-relaxed">
                          {t('caseStudies.case1.result2')}
                        </p>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="mt-6 p-0">
                    <Button asChild variant="ghost" size="sm" className="group-hover:text-[color:var(--brand)]">
                      <Link href={buildHref('oplossingen/light')}>
                        {t('caseStudies.viewSolution')}
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>

                {/* Case 2: SaaS Support → Manufacturing */}
                <Card className="group rounded-3xl border-[color:color-mix(in_oklab,var(--accent)_25%,transparent)] bg-[color:color-mix(in_oklab,var(--bg)_85%,transparent)] p-8 ring-2 ring-[color:var(--accent)]/20 transition-all duration-300 hover:shadow-xl">
                  <CardHeader className="space-y-3 p-0">
                    <span className="copy-12 font-semibold uppercase tracking-[0.24em] text-[color:var(--fg-muted)]">
                      {t('caseStudies.case2.sector')}
                    </span>
                    <CardTitle className="h-24">
                      {t('caseStudies.case2.client')}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="mt-6 space-y-4 p-0">
                    <p className="copy-14 text-[color:var(--fg-subtle)]">
                      {t('caseStudies.case2.challenge')}
                    </p>

                    {/* Results */}
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[color:color-mix(in_oklab,var(--accent)_15%,transparent)] text-[color:var(--accent)]">
                          <BarChart3 className="h-4 w-4" />
                        </div>
                        <p className="copy-14 font-semibold leading-relaxed">
                          {t('caseStudies.case2.result1')}
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[color:color-mix(in_oklab,var(--brand)_15%,transparent)] text-[color:var(--brand)]">
                          <Clock className="h-4 w-4" />
                        </div>
                        <p className="copy-14 font-semibold leading-relaxed">
                          {t('caseStudies.case2.result2')}
                        </p>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="mt-6 p-0">
                    <Button asChild variant="ghost" size="sm" className="group-hover:text-[color:var(--brand)]">
                      <Link href={buildHref('oplossingen/maakindustrie')}>
                        {t('caseStudies.viewSolution')}
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>

                {/* Case 3: E-commerce Inventory → Configurators */}
                <Card className="group rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--bg)_85%,transparent)] p-8 transition-all duration-300 hover:shadow-lg">
                  <CardHeader className="space-y-3 p-0">
                    <span className="copy-12 font-semibold uppercase tracking-[0.24em] text-[color:var(--fg-muted)]">
                      {t('caseStudies.case3.sector')}
                    </span>
                    <CardTitle className="h-24">
                      {t('caseStudies.case3.client')}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="mt-6 space-y-4 p-0">
                    <p className="copy-14 text-[color:var(--fg-subtle)]">
                      {t('caseStudies.case3.challenge')}
                    </p>

                    {/* Results */}
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[color:color-mix(in_oklab,var(--accent)_15%,transparent)] text-[color:var(--accent)]">
                          <TrendingUp className="h-4 w-4" />
                        </div>
                        <p className="copy-14 font-semibold leading-relaxed">
                          {t('caseStudies.case3.result1')}
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[color:color-mix(in_oklab,var(--brand)_15%,transparent)] text-[color:var(--brand)]">
                          <Clock className="h-4 w-4" />
                        </div>
                        <p className="copy-14 font-semibold leading-relaxed">
                          {t('caseStudies.case3.result2')}
                        </p>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="mt-6 p-0">
                    <Button asChild variant="ghost" size="sm" className="group-hover:text-[color:var(--brand)]">
                      <Link href={buildHref('oplossingen/configurators')}>
                        {t('caseStudies.viewSolution')}
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              {/* Not Sure CTA */}
              <div className="mt-16 text-center">
                <p className="text-lg text-[color:var(--fg-subtle)]">{t('cta')}</p>
                <Button asChild size="lg" variant="outline" className="mt-4">
                  <Link href={buildHref('contact')}>
                    {tCommon('bookIntake')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}
