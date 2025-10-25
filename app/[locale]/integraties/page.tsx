import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card } from '@/components/ui/card'
import { getTranslations } from 'next-intl/server'
import { CheckCircle2 } from 'lucide-react'

export default async function IntegrationsPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'integrations' })
  const items = t.raw('items') as string[]

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
          <div className="container-custom grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <Card
                key={item}
                className="card flex items-center gap-3 rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] px-6 py-5 text-sm font-semibold text-body"
              >
                <CheckCircle2 className="h-5 w-5 text-[color:var(--brand)]" />
                <span>{item}</span>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

