import { getTranslations } from 'next-intl/server'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { BarChart3, Clock, TrendingUp, Users, CheckCircle2, Target, Zap } from 'lucide-react'
import { BackgroundEngine } from '@/components/backgrounds/BackgroundEngine'
import { backgroundThemes } from '@/lib/backgroundThemes'

type CaseStudy = {
  id: string
  client: string
  sector: string
  challenge: string
  approach: string[]
  results: string[]
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'casesPage' })

  return {
    title: `${t('title')} · Caribbean Azure`,
    description: t('subtitle'),
  }
}

const getResultIcon = (index: number) => {
  const icons = [Clock, Users, TrendingUp, Zap, Target]
  return icons[index % icons.length]
}

export default async function CasesPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'casesPage' })
  const locale = params.locale as 'nl' | 'en'

  // Build locale-aware href (NL at root, EN with /en prefix)
  const buildHref = (slug: string) => {
    const path = slug ? `/${slug}` : '/'
    return locale === 'nl' ? path : `/en${path}`
  }

  const cases = t.raw('caseStudies') as CaseStudy[]

  return (
    <>
      <div className="relative">
        {/* 3D Background */}
        <div className="fixed inset-0 -z-10">
          <BackgroundEngine theme={backgroundThemes.cases} />
        </div>

        <Header />
        <main id="main-content">
          {/* Hero Section */}
          <section className="section-padding-y hero-glow">
            <div className="container-custom">
              <div className="mx-auto max-w-[720px] text-center">
                <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
                  {t('title')}
                </h1>
                <p className="mt-6 text-lg text-[color:var(--fg-subtle)]">
                  {t('subtitle')}
                </p>
              </div>
            </div>
          </section>

          {/* Case Studies */}
          <section className="section-padding-y">
            <div className="container-custom">
              <div className="space-y-12">
                {cases.map((caseStudy: CaseStudy, index: number) => (
                  <Card
                    key={caseStudy.id}
                    className="card-gradient-stripe rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8 md:p-12"
                  >
                    {/* Header */}
                    <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--fg-muted)]">
                          {t('caseLabel')} {index + 1} · {caseStudy.sector}
                        </span>
                        <h2 className="mt-2 text-2xl font-bold text-body md:text-3xl">
                          {caseStudy.client}
                        </h2>
                      </div>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                      {/* Left: Problem + Approach */}
                      <div className="space-y-8">
                        {/* Problem */}
                        <div>
                          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-body">
                            <Target className="h-5 w-5 text-[color:var(--accent)]" />
                            {t('sectionProblem')}
                          </h3>
                          <p className="text-sm text-[color:var(--fg-subtle)] leading-relaxed">
                            {caseStudy.challenge}
                          </p>
                        </div>

                        {/* Approach */}
                        <div>
                          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-body">
                            <Zap className="h-5 w-5 text-[color:var(--brand)]" />
                            {t('sectionApproach')}
                          </h3>
                          <ul className="space-y-3">
                            {caseStudy.approach.map((step: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-3 text-sm text-[color:var(--fg-subtle)]">
                                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                                  <CheckCircle2 className="h-3 w-3" />
                                </span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Right: Results */}
                      <div>
                        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-body">
                          <BarChart3 className="h-5 w-5 text-[color:var(--accent)]" />
                          {t('sectionResults')}
                        </h3>
                        <div className="space-y-4">
                          {caseStudy.results.map((result: string, idx: number) => {
                            const Icon = getResultIcon(idx)
                            return (
                              <div
                                key={idx}
                                className="rounded-2xl border border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_75%,transparent)] p-6"
                              >
                                <div className="flex items-start gap-4">
                                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--accent-soft)_65%,transparent)] text-[color:var(--accent)]">
                                    <Icon className="h-5 w-5" />
                                  </div>
                                  <p className="text-sm font-semibold text-body leading-relaxed">
                                    {result}
                                  </p>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="section-padding-y bg-[color:color-mix(in_oklab,var(--bg)_90%,transparent)]">
            <div className="container-custom">
              <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--accent)_32%,transparent)] bg-[linear-gradient(135deg,color-mix(in_oklab,var(--brand)_80%,transparent)0%,color-mix(in_oklab,var(--accent)_78%,transparent)100%)] p-12 text-center text-white shadow-[0_40px_120px_rgb(45_43_99/28%)]">
                <CardHeader className="space-y-4">
                  <CardTitle className="text-3xl font-bold md:text-4xl">
                    {t('cta.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="mx-auto max-w-2xl text-lg text-white/90">
                    {t('cta.description')}
                  </p>
                  <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                    <a
                      href={buildHref('contact')}
                      className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-3 text-base font-semibold text-[color:var(--brand-600)] shadow-lg transition-transform hover:scale-105"
                    >
                      {t('cta.buttonIntake')}
                    </a>
                    <a
                      href={`${buildHref('')}#roi-calculator`}
                      className="inline-flex items-center justify-center rounded-xl border-2 border-white/40 bg-white/10 px-8 py-3 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
                    >
                      {t('cta.buttonROI')}
                    </a>
                  </div>
                  <p className="text-sm text-white/75">
                    {t('cta.footer')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
