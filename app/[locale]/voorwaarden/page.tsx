import { getTranslations } from 'next-intl/server'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { BackgroundEngine } from '@/components/backgrounds/BackgroundEngine'
import { backgroundThemes } from '@/lib/backgroundThemes'
import { FileText, CheckCircle2, AlertTriangle, Scale, Handshake, Shield } from 'lucide-react'

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'terms' })

  return {
    title: `${t('title')} · Caribbean Azure`,
    description: t('intro'),
  }
}

export default async function TermsPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'terms' })

  // Article icons mapping
  const articleIcons = [
    FileText,      // Article 1
    Handshake,     // Article 2
    CheckCircle2,  // Article 3
    FileText,      // Article 4
    Scale,         // Article 5
    Shield,        // Article 6
    AlertTriangle, // Article 7
    Shield,        // Article 8
    FileText,      // Article 9
    AlertTriangle, // Article 10
    Scale,         // Article 11
  ]

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
                  <FileText className="h-4 w-4" />
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
                {/* Article 1 - Definitions (has items instead of paragraphs) */}
                <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                  <CardHeader className="flex flex-row items-start gap-4 pb-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{t('article1.title')}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-[color:var(--fg-subtle)]">
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      {t.raw('article1.items').map((item: string, idx: number) => (
                        <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Articles 2-11 (all have paragraphs) */}
                {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((articleNum) => {
                  const Icon = articleIcons[articleNum - 1]
                  const articleKey = `article${articleNum}`

                  return (
                    <Card key={articleNum} className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                      <CardHeader className="flex flex-row items-start gap-4 pb-6">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl">{t(`${articleKey}.title`)}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4 text-sm text-[color:var(--fg-subtle)]">
                        {t.raw(`${articleKey}.paragraphs`).map((paragraph: string, idx: number) => (
                          <p key={idx}>{paragraph}</p>
                        ))}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
