import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Target, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { BackgroundEngine } from '@/components/backgrounds/BackgroundEngine'
import { backgroundThemes } from '@/lib/backgroundThemes'

const whatWeDo = [
  "Procesanalyse en snelle verbeterplannen",
  "Koppelingen tussen e-mail, CRM, documenten en planning",
  "Dashboards en notificaties voor status & opvolging",
]

const howWeWork = [
  { step: "1", title: "Intake", description: "30 minuten kennismaken en je situatie in kaart brengen" },
  { step: "2", title: "Proof-of-Value", description: "1–2 weken: snel prototype om waarde te bewijzen" },
  { step: "3", title: "Implementatie", description: "Bouwen, testen en live zetten van de oplossing" },
  { step: "4", title: "Kennisoverdracht", description: "Jouw team leert het te begrijpen en te beheren" },
]

export default function AboutPage() {
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
                <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
                  Over ons
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-[color:var(--fg-subtle)]">
                  Caribbean Azure helpt kleine en middelgrote teams om slimmer te werken met automatisering.
                  We brengen processen in kaart, koppelen de juiste tools en bouwen alleen wat echt nodig is.
                  Geen buzzwords—wel meetbaar resultaat en overdraagbare workflows die jouw team begrijpt en beheert.
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
                    <h2 className="text-2xl font-bold tracking-tight">Wat we doen</h2>
                    <p className="mt-2 text-[color:var(--fg-subtle)]">
                      Praktische automatisering voor dagelijks werk
                    </p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {whatWeDo.map((item, index) => (
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
                <h2 className="mb-8 text-2xl font-bold tracking-tight">Hoe we werken</h2>

                <div className="grid gap-6 md:grid-cols-2">
                  {howWeWork.map((phase) => (
                    <Card key={phase.step} className="border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)]">
                      <CardHeader>
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[color:var(--brand)] text-lg font-bold text-white">
                          {phase.step}
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
                    <Link href="/nl/contact">
                      Plan een korte intake
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
                <Card className="border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)]">
                  <CardHeader>
                    <CardTitle className="text-base">Onafhankelijkheid & Compliance</CardTitle>
                    <CardDescription className="text-sm">
                      Caribbean Azure werkt onafhankelijk en noemt geen klant- of werkgeversnamen.
                      We communiceren alleen resultaten die we feitelijk kunnen aantonen.
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
