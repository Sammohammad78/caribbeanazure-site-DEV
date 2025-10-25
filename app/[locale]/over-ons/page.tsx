import { getTranslations } from 'next-intl/server'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Target, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { BackgroundEngine } from '@/components/backgrounds/BackgroundEngine'
import { backgroundThemes } from '@/lib/backgroundThemes'

export default async function AboutPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'about' })
  const locale = params.locale

  // Build locale-aware href (NL at root, EN with /en prefix)
  const buildHref = (slug: string) => (locale === 'nl' ? `/${slug}` : `/en/${slug}`)

  return (
    <>
      <div className="relative">
        {/* 3D Background */}
        <div className="fixed inset-0 -z-10">
          <BackgroundEngine theme={backgroundThemes.about} />
        </div>

        <Header />
        <main id="main-content">
          {/* Hero */}
          <section className="section-padding-y">
            <div className="container-custom">
              <div className="mx-auto max-w-3xl">
                <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                  {t('title')}
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-[color:var(--fg-subtle)]">
                  {t('subtitle')}
                </p>
              </div>
            </div>
          </section>

          {/* What We Do */}
          <section className="section-padding-y bg-[color:color-mix(in_oklab,var(--bg)_90%,transparent)]">
            <div className="container-custom">
              <div className="mx-auto max-w-3xl">
                <div className="mb-8 flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                    <Target className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">{t('whatWeDoTitle')}</h2>
                    <p className="mt-2 text-[color:var(--fg-subtle)]">
                      {t('whatWeDoSubtitle')}
                    </p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {t.raw('whatWeDo').map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-[color:var(--brand)]" />
                      <span className="text-[color:var(--fg-subtle)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* How We Work */}
          <section className="section-padding-y">
            <div className="container-custom">
              <div className="mx-auto max-w-3xl">
                <h2 className="mb-8 text-2xl font-bold tracking-tight">{t('howWeWorkTitle')}</h2>

                <div className="grid gap-6 md:grid-cols-2">
                  {t.raw('steps').map((phase: { title: string; description: string }, idx: number) => (
                    <Card key={idx} className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                      <CardHeader>
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[color:var(--brand)] text-lg font-bold text-white">
                          {idx + 1}
                        </div>
                        <CardTitle className="text-lg">{phase.title}</CardTitle>
                        <CardDescription>{phase.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-10 text-center">
                  <Button size="lg" asChild>
                    <Link href={buildHref('contact')}>
                      {t('cta')}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Compliance Note */}
          <section className="section-padding-y bg-[color:color-mix(in_oklab,var(--bg)_90%,transparent)]">
            <div className="container-custom">
              <div className="mx-auto max-w-3xl">
                <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                  <CardHeader>
                    <CardTitle className="text-base">{t('complianceTitle')}</CardTitle>
                    <CardDescription className="text-sm">
                      {t('complianceText')}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
