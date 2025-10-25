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
  results: {
    metric: string
    icon: any
  }[]
}

const cases: CaseStudy[] = [
  {
    id: 'fintech-onboarding',
    client: 'Top-3 Nederlandse bank',
    sector: 'Financiële dienstverlening',
    challenge:
      'Het onboarden van nieuwe zakelijke klanten kostte 14 dagen door handmatige checks, documentverificatie en goedkeuringsprocessen. Dit leidde tot frustratie bij klanten en verhoogde drop-off rates.',
    approach: [
      'Gebouwd: AI document parser voor KVK-uittreksels en identiteitsbewijzen met 98% nauwkeurigheid',
      'Geïntegreerd: Realtime KVK API check + AML screening via externe providers',
      'Geautomatiseerd: Goedkeuringsworkflow met intelligente routing op basis van risicoscore',
      'Opgezet: Dashboard voor compliance team met real-time inzicht in status',
    ],
    results: [
      { metric: '89% sneller onboarden (van 14 naar 1,5 dag)', icon: Clock },
      { metric: '67% minder handmatige handelingen', icon: Users },
      { metric: '34% hogere conversie door snellere afhandeling', icon: TrendingUp },
    ],
  },
  {
    id: 'saas-customer-support',
    client: 'EU CPaaS scale-up (40M+ API calls/maand)',
    sector: 'SaaS / Communication Platform',
    challenge:
      'Support team kreeg 200+ vragen per dag via e-mail, Slack en tickets. 60% waren veelgestelde vragen over API documentatie, rate limits en billing. Gemiddelde response tijd: 8 uur.',
    approach: [
      'Gebouwd: AI chatbot getraind op 2 jaar support tickets + API docs',
      'Geïntegreerd: Slack, Intercom en ticketing systeem (Zendesk) via unified interface',
      'Geautomatiseerd: Intelligente triage (simpel → bot, complex → mens met context)',
      'Opgezet: Self-service portal voor API key management en usage dashboards',
    ],
    results: [
      { metric: '71% van vragen automatisch opgelost', icon: Zap },
      { metric: '6,2 uur sneller response (van 8u → 1u 48min)', icon: Clock },
      { metric: '3 FTE vrijgespeeld voor proactieve support', icon: Users },
    ],
  },
  {
    id: 'ecommerce-inventory',
    client: 'B2B webshop (15.000+ SKUs)',
    sector: 'E-commerce / Groothandel',
    challenge:
      'Voorraadgegevens in 3 systemen (ERP, webshop, magazijn) waren vaak niet gesynchroniseerd. Dit leidde tot overselling, teleurgestelde klanten en handmatige correcties door het team.',
    approach: [
      'Gebouwd: Real-time sync tussen ERP (Exact), Shopify en WMS met conflict resolution',
      'Geautomatiseerd: Dagelijkse voorraadrapportage + alerts bij afwijkingen >5%',
      'Geïntegreerd: Automatische prijsaanpassingen op basis van voorraadniveaus en seizoen',
      'Opgezet: Predictive reordering dashboard op basis van historische verkoop',
    ],
    results: [
      { metric: '94% minder overselling incidenten', icon: Target },
      { metric: '12 uur per week bespaard op handmatige sync', icon: Clock },
      { metric: '18% hogere voorraadrotatie door slimmere inkoop', icon: TrendingUp },
    ],
  },
]

export default async function CasesPage({ params }: { params: { locale: string } }) {
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
                  Cases: meetbare impact
                </h1>
                <p className="mt-6 text-lg text-[color:var(--fg-subtle)]">
                  Hoe we MKB en scale-ups helpen met procesautomatisering en AI. Alle cases zijn geanonimiseerd om vertrouwelijkheid te waarborgen.
                </p>
              </div>
            </div>
          </section>

          {/* Case Studies */}
          <section className="section-padding-y">
            <div className="container-custom">
              <div className="space-y-12">
                {cases.map((caseStudy, index) => (
                  <Card
                    key={caseStudy.id}
                    className="card-gradient-stripe rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8 md:p-12"
                  >
                    {/* Header */}
                    <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--fg-muted)]">
                          Case {index + 1} · {caseStudy.sector}
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
                            Probleem
                          </h3>
                          <p className="text-sm text-[color:var(--fg-subtle)] leading-relaxed">
                            {caseStudy.challenge}
                          </p>
                        </div>

                        {/* Approach */}
                        <div>
                          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-body">
                            <Zap className="h-5 w-5 text-[color:var(--brand)]" />
                            Aanpak
                          </h3>
                          <ul className="space-y-3">
                            {caseStudy.approach.map((step, idx) => (
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
                          Resultaat
                        </h3>
                        <div className="space-y-4">
                          {caseStudy.results.map((result, idx) => (
                            <div
                              key={idx}
                              className="rounded-2xl border border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_75%,transparent)] p-6"
                            >
                              <div className="flex items-start gap-4">
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--accent-soft)_65%,transparent)] text-[color:var(--accent)]">
                                  <result.icon className="h-5 w-5" />
                                </div>
                                <p className="text-sm font-semibold text-body leading-relaxed">
                                  {result.metric}
                                </p>
                              </div>
                            </div>
                          ))}
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
                    Herken je deze uitdagingen?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="mx-auto max-w-2xl text-lg text-white/90">
                    Plan een vrijblijvend gesprek van 45 minuten. We bespreken je situatie en delen concrete quick wins die je direct kunt toepassen.
                  </p>
                  <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                    <a
                      href={`/${params.locale}/contact`}
                      className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-3 text-base font-semibold text-[color:var(--brand-600)] shadow-lg transition-transform hover:scale-105"
                    >
                      Plan een intake
                    </a>
                    <a
                      href={`/${params.locale}/roi`}
                      className="inline-flex items-center justify-center rounded-xl border-2 border-white/40 bg-white/10 px-8 py-3 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
                    >
                      Bereken je ROI
                    </a>
                  </div>
                  <p className="text-sm text-white/75">
                    Reactie binnen 24 uur · Geen verplichtingen
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
