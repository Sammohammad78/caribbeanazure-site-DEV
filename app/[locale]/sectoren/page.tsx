import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getTranslations } from 'next-intl/server'

type Sector = {
  slug: string
  name: string
  problem: string
  usecases: string[]
  kpi: string
}

export default async function IndustriesPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'industries' })
  const sectors = t.raw('sectors') as Sector[]

  return (
    <>
      <Header />
      <main>
        <section className="section-padding-y hero-glow">
          <div className="container-custom text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">{t('title')}</h1>
            <p className="mt-6 text-lg text-[color:var(--fg-subtle)]">{t('intro')}</p>
          </div>
        </section>

        <section className="section-padding-y">
          <div className="container-custom grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sectors.map((sector) => (
              <Card
                key={sector.slug}
                className="card flex h-full flex-col gap-4 rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8"
              >
                <CardHeader className="space-y-3 pb-0">
                  <span className="text-xs uppercase tracking-[0.24em] text-[color:var(--fg-muted)]">{sector.name}</span>
                  <CardTitle className="text-lg font-semibold text-body">{sector.problem}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-0 text-sm text-[color:var(--fg-subtle)]">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--fg-muted)]">Use-cases</p>
                    <ul className="mt-2 space-y-2">
                      {sector.usecases.map((usecase, index) => (
                        <li key={`${sector.slug}-usecase-${index}`} className="flex items-start gap-2">
                          <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
                          <span>{usecase}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--fg-muted)]">KPI-impact</p>
                    <p className="mt-2 font-semibold text-body">{sector.kpi}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="section-padding-y">
          <div className="container-custom flex flex-col items-center gap-6 rounded-3xl border border-[color:color-mix(in_oklab,var(--accent)_30%,transparent)] bg-[linear-gradient(135deg,color-mix(in_oklab,var(--brand)_80%,transparent)0%,color-mix(in_oklab,var(--accent)_82%,transparent)100%)] px-8 py-16 text-center text-white shadow-[0_40px_120px_rgb(45_43_99/28%)] md:px-16">
            <h2 className="text-3xl font-semibold">{t('cta')}</h2>
            <Button asChild size="lg">
              <a href={`/${params.locale}/contact`}>{t('cta')}</a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
