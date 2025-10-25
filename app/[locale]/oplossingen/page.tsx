import { getTranslations } from 'next-intl/server'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Zap, Factory, Settings } from 'lucide-react'
import Link from 'next/link'
import { BackgroundEngine } from '@/components/backgrounds/BackgroundEngine'
import { backgroundThemes } from '@/lib/backgroundThemes'
import { TrustStrip } from '@/components/sections/trust-strip'
import { formatCurrency, getPriceOnRequest } from '@/lib/format'

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'solutions' })

  return {
    title: `${t('title')} · Caribbean Azure`,
    description: t('subtitle'),
  }
}

export default async function OplossingenPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'solutions' })
  const locale = params.locale as 'nl' | 'en'

  const solutions = [
    {
      id: 'light',
      icon: Zap,
      name: t('light.title'),
      subtitle: t('light.subtitle'),
      description: t('light.description'),
      price: formatCurrency(999, locale),
      priceLabel: locale === 'nl' ? 'vanaf' : 'from',
      href: `/${locale}/oplossingen/light`,
      color: 'from-amber-500 to-orange-500',
    },
    {
      id: 'manufacturing',
      icon: Factory,
      name: t('manufacturing.title'),
      subtitle: t('manufacturing.subtitle'),
      description: t('manufacturing.description'),
      price: formatCurrency(1999, locale),
      priceLabel: locale === 'nl' ? 'vanaf' : 'from',
      href: `/${locale}/oplossingen/maakindustrie`,
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
      href: `/${locale}/oplossingen/configurators`,
      color: 'from-purple-500 to-pink-500',
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
                            {locale === 'nl' ? 'Populair' : 'Popular'}
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
                            {locale === 'nl' ? 'Meer informatie' : 'Learn more'}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  )
                })}
              </div>

              {/* Not Sure CTA */}
              <div className="mt-12 text-center">
                <p className="text-lg text-[color:var(--fg-subtle)]">{t('cta')}</p>
                <Button asChild size="lg" variant="outline" className="mt-4">
                  <Link href={`/${locale}/contact`}>
                    {locale === 'nl' ? 'Plan een intake' : 'Book an intake'}
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
