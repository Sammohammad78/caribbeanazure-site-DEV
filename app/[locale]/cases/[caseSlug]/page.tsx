import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

type CaseDetail = {
  title: string
  quote: {
    text: string
    author: string
    role: string
  }
  kpis: Array<{ label: string; before: string; after: string }>
  problem: string
  build: string[]
  result: string[]
  flow: string[]
}

export default async function CaseDetailPage({
  params,
}: {
  params: { locale: string; caseSlug: string }
}) {
  const { locale, caseSlug } = params
  const [casesT, ctaT] = await Promise.all([
    getTranslations({ locale, namespace: 'cases' }),
    getTranslations({ locale, namespace: 'cta' })
  ])

  const structure = casesT.raw('structure') as Record<string, string>

  let data: CaseDetail | undefined
  try {
    data = casesT.raw(`detail.${caseSlug}`) as CaseDetail
  } catch {
    data = undefined
  }

  if (!data) {
    notFound()
  }

  return (
    <>
      <Header />
      <main>
        <section className="section-padding-y hero-glow">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
              <div className="space-y-6">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--fg-muted)]">
                  {structure.problem}
                </p>
                <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">{data.title}</h1>
                <blockquote className="rounded-3xl border border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_65%,transparent)] p-6 text-sm italic text-[color:var(--fg-subtle)] shadow-[0_18px_60px_rgb(15_23_42/10%)]">
                  “{data.quote.text}”
                  <footer className="mt-4 text-xs uppercase tracking-[0.22em] text-[color:var(--fg-muted)]">
                    {data.quote.author} · {data.quote.role}
                  </footer>
                </blockquote>
              </div>
              <div className="grid gap-4 rounded-3xl border border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-6 text-sm shadow-[0_18px_60px_rgb(15_23_42/12%)] md:grid-cols-3">
                {data.kpis.map((kpi) => (
                  <div key={kpi.label} className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--fg-muted)]">{kpi.label}</p>
                    <div className="space-y-1 text-body">
                      <p className="text-lg font-semibold">{kpi.after}</p>
                      <p className="text-xs text-[color:var(--fg-subtle)]">{kpi.before}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding-y">
          <div className="container-custom grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <CaseSection title={structure.problem} items={[data.problem]} numbered={false} />
            <CaseSection title={structure.build} items={data.build} />
            <CaseSection title={structure.result} items={data.result} />
            <CaseSection title={structure.flow} items={data.flow} />
          </div>
        </section>

        <section className="section-padding-y">
          <div className="container-custom flex flex-col items-center gap-6 rounded-3xl border border-[color:color-mix(in_oklab,var(--accent)_32%,transparent)] bg-[linear-gradient(135deg,color-mix(in_oklab,var(--accent)_80%,transparent)0%,color-mix(in_oklab,var(--brand)_75%,transparent)100%)] px-8 py-16 text-center text-white shadow-[0_40px_120px_rgb(45_43_99/28%)] md:px-16">
            <h2 className="text-3xl font-semibold">{structure.next}</h2>
            <p className="max-w-2xl text-base text-white/85">{structure.cta}</p>
            <Button asChild size="lg">
              <a href={`/${locale}/contact`}>{ctaT('button')}</a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function CaseSection({
  title,
  items,
  numbered = true,
}: {
  title: string
  items: string[]
  numbered?: boolean
}) {
  return (
    <Card className="card flex h-full flex-col gap-4 rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_68%,transparent)] p-8">
      <h3 className="text-lg font-semibold text-body">{title}</h3>
      <CardContent className="space-y-3 p-0">
        <ul className="space-y-3 text-sm text-[color:var(--fg-subtle)]">
          {items.map((item, index) => (
            <li key={`${title}-${index}`} className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[color:color-mix(in_oklab,var(--accent-soft)_70%,transparent)] text-[color:var(--accent)] text-xs font-semibold">
                {numbered ? index + 1 : '-'}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
