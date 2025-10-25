import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getTranslations } from 'next-intl/server'
import { Check } from 'lucide-react'

export default async function BlueprintPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'blueprint' })
  const bullets = t.raw('bullets') as string[]

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
          <div className="container-custom grid gap-8 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)]">
            <Card className="card rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8 text-sm text-[color:var(--fg-subtle)]">
              <p>{t('description')}</p>
              <ul className="mt-6 space-y-3">
                {bullets.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="mt-1 h-4 w-4 text-[color:var(--brand)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="card flex flex-col justify-center gap-4 rounded-3xl border-[color:color-mix(in_oklab,var(--accent)_28%,transparent)] bg-[linear-gradient(135deg,color-mix(in_oklab,var(--brand)_80%,transparent)0%,color-mix(in_oklab,var(--accent)_78%,transparent)100%)] p-8 text-white">
              <h2 className="text-2xl font-semibold">{t('cta')}</h2>
              <Button asChild size="lg">
                <a href="https://caribbeanazure.nl/blueprint.pdf" target="_blank" rel="noopener noreferrer">
                  {t('cta')}
                </a>
              </Button>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

