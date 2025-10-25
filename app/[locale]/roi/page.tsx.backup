import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card } from '@/components/ui/card'
import { getTranslations } from 'next-intl/server'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default async function RoiPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'roi' })
  const steps = t.raw('steps') as string[]

  return (
    <>
      <Header />
      <main>
        <section className="section-padding-y hero-glow">
          <div className="container-custom text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">{t('title')}</h1>
            <p className="mt-6 text-lg text-[color:var(--fg-subtle)]">{t('subtitle')}</p>
          </div>
        </section>

        <section className="section-padding-y">
          <div className="container-custom grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <Card
                key={index}
                className="card flex flex-col gap-3 rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8 text-sm text-[color:var(--fg-subtle)]"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[color:color-mix(in_oklab,var(--accent-soft)_65%,transparent)] text-[color:var(--accent)] text-sm font-semibold">
                  {index + 1}
                </span>
                <p>{step}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="section-padding-y">
          <div className="container-custom flex flex-col items-center gap-6 rounded-3xl border border-[color:color-mix(in_oklab,var(--accent)_32%,transparent)] bg-[linear-gradient(135deg,color-mix(in_oklab,var(--brand)_80%,transparent)0%,color-mix(in_oklab,var(--accent)_78%,transparent)100%)] px-8 py-16 text-center text-white shadow-[0_40px_120px_rgb(45_43_99/28%)] md:px-16">
            <h2 className="text-3xl font-semibold">{t('cta')}</h2>
            <Button asChild size="lg" variant="secondary" className="text-body">
              <a href={`/${params.locale}/contact`}>
                {t('cta')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

