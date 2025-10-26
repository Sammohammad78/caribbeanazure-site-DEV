import { getTranslations } from 'next-intl/server'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { BackgroundEngine } from '@/components/backgrounds/BackgroundEngine'
import { backgroundThemes } from '@/lib/backgroundThemes'
import { Shield, Lock, Eye, Database, Mail, FileText } from 'lucide-react'

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'privacy' })

  return {
    title: `${t('title')} · Caribbean Azure`,
    description: t('intro'),
  }
}

export default async function PrivacyPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'privacy' })

  return (
    <>
      <div className="relative">
        {/* 3D Background */}
        <div className="fixed inset-0 -z-10">
          <BackgroundEngine theme={backgroundThemes.legal} />
        </div>

        <Header />
        <main id="main-content">
          {/* Hero Section */}
          <section className="section-padding-y hero-glow">
            <div className="container-custom">
              <div className="mx-auto max-w-4xl text-center">
                <div className="inline-flex items-center gap-3 rounded-full border border-[color:color-mix(in_oklab,var(--brand)_20%,transparent)] bg-[color:color-mix(in_oklab,var(--brand-soft)_40%,transparent)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--brand)]">
                  <Shield className="h-4 w-4" />
                  {t('badge')}
                </div>
                <h1 className="mt-8 text-balance text-4xl font-bold tracking-tight md:text-5xl">
                  {t('title')}
                </h1>
                <p className="mt-6 text-lg text-[color:var(--fg-subtle)]">
                  {t('updated')}
                </p>
                <p className="mt-4 text-base text-[color:var(--fg-subtle)]">
                  {t('intro')}
                </p>
              </div>
            </div>
          </section>

          {/* Content Sections */}
          <section className="section-padding-y">
            <div className="container-custom">
              <div className="mx-auto max-w-4xl space-y-8">
                {/* Section 1 */}
                <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                  <CardHeader className="flex flex-row items-start gap-4 pb-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{t('section1.title')}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-[color:var(--fg-subtle)]">
                    <p dangerouslySetInnerHTML={{ __html: t('section1.controller') }} />
                    <p>{t('section1.text')}</p>
                  </CardContent>
                </Card>

                {/* Section 2 */}
                <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                  <CardHeader className="flex flex-row items-start gap-4 pb-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                      <Database className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{t('section2.title')}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-[color:var(--fg-subtle)]">
                    <div>
                      <p className="font-semibold text-body mb-2">{t('section2.viaForms')}</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        {t.raw('section2.viaFormsItems').map((item: string, idx: number) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-body mb-2">{t('section2.automatic')}</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        {t.raw('section2.automaticItems').map((item: string, idx: number) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <p dangerouslySetInnerHTML={{ __html: t('section2.summary') }} />
                  </CardContent>
                </Card>

                {/* Section 3 */}
                <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                  <CardHeader className="flex flex-row items-start gap-4 pb-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                      <Eye className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{t('section3.title')}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-[color:var(--fg-subtle)]">
                    <div>
                      <p className="font-semibold text-body mb-2">{t('section3.contact')}</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        {t.raw('section3.contactItems').map((item: string, idx: number) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-body mb-2">{t('section3.analytics')}</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        {t.raw('section3.analyticsItems').map((item: string, idx: number) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <p dangerouslySetInnerHTML={{ __html: t('section3.legal') }} />
                  </CardContent>
                </Card>

                {/* Section 4 */}
                <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                  <CardHeader className="flex flex-row items-start gap-4 pb-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                      <Lock className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{t('section4.title')}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-[color:var(--fg-subtle)]">
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      {t.raw('section4.items').map((item: string, idx: number) => (
                        <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
                      ))}
                    </ul>
                    <p>{t('section4.deletion')}</p>
                  </CardContent>
                </Card>

                {/* Section 5 */}
                <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                  <CardHeader className="flex flex-row items-start gap-4 pb-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{t('section5.title')}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-[color:var(--fg-subtle)]">
                    <p dangerouslySetInnerHTML={{ __html: t('section5.intro') }} />
                    <div>
                      <p className="font-semibold text-body mb-2">{t('section5.processors')}</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        {t.raw('section5.processorsList').map((item: string, idx: number) => (
                          <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
                        ))}
                      </ul>
                    </div>
                    <p dangerouslySetInnerHTML={{ __html: t('section5.dpa') }} />
                  </CardContent>
                </Card>

                {/* Section 6 */}
                <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                  <CardHeader className="flex flex-row items-start gap-4 pb-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                      <Shield className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{t('section6.title')}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-[color:var(--fg-subtle)]">
                    <p>{t('section6.intro')}</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      {t.raw('section6.rights').map((item: string, idx: number) => (
                        <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
                      ))}
                    </ul>
                    <p dangerouslySetInnerHTML={{ __html: t('section6.exercise') }} />
                    <p dangerouslySetInnerHTML={{ __html: t('section6.complaint') }} />
                  </CardContent>
                </Card>

                {/* Section 7 */}
                <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                  <CardHeader className="flex flex-row items-start gap-4 pb-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] text-[color:var(--brand)]">
                      <Lock className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{t('section7.title')}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-[color:var(--fg-subtle)]">
                    <p>{t('section7.intro')}</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      {t.raw('section7.measures').map((item: string, idx: number) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                    <p dangerouslySetInnerHTML={{ __html: t('section7.moreInfo') }} />
                  </CardContent>
                </Card>

                {/* Section 8 */}
                <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                  <CardHeader className="flex flex-row items-start gap-4 pb-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{t('section8.title')}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-[color:var(--fg-subtle)]">
                    <p>{t('section8.intro')}</p>
                    <div>
                      <p className="font-semibold text-body mb-2">{t('section8.functional')}</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        {t.raw('section8.functionalItems').map((item: string, idx: number) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-body mb-2">{t('section8.analyticsLabel')}</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        {t.raw('section8.analyticsItems').map((item: string, idx: number) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <p dangerouslySetInnerHTML={{ __html: t('section8.noTracking') }} />
                  </CardContent>
                </Card>

                {/* Section 9 */}
                <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                  <CardHeader className="flex flex-row items-start gap-4 pb-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{t('section9.title')}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-[color:var(--fg-subtle)]">
                    <p>{t('section9.text1')}</p>
                    <p>{t('section9.text2')}</p>
                  </CardContent>
                </Card>

                {/* Section 10 */}
                <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                  <CardHeader className="flex flex-row items-start gap-4 pb-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{t('section10.title')}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-[color:var(--fg-subtle)]">
                    <p>{t('section10.intro')}</p>
                    <p dangerouslySetInnerHTML={{ __html: t('section10.details') }} />
                  </CardContent>
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
