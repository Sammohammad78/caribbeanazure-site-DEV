import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { RoiCalculator } from '@/components/roi/RoiCalculator'
import { FaqSchema } from '@/components/seo/FaqSchema'
import { BackgroundEngine } from '@/components/backgrounds/BackgroundEngine'
import { backgroundThemes } from '@/lib/backgroundThemes'
import { Calculator, TrendingUp, Clock, Users } from 'lucide-react'

const roiFaqs = [
  {
    question: 'Hoe betrouwbaar is deze ROI berekening?',
    answer: 'De calculator gebruikt een bewezen formule gebaseerd op teamgrootte, tijdsbesparing en adoptiepercentage. De cijfers zijn indicatief en gebaseerd op gemiddelden uit meerdere automatiseringsprojecten. Werkelijke resultaten variëren per organisatie en proces.',
  },
  {
    question: 'Wat bedoelen jullie met "adoptiepercentage"?',
    answer: 'Het adoptiepercentage geeft aan welk deel van je team daadwerkelijk de automatisering gebruikt. Bij 60% adoptie gebruikt 6 van de 10 teamleden de nieuwe workflow consequent. Dit percentage beïnvloedt direct de totale besparing.',
  },
  {
    question: 'Welke kosten zitten er in de investering?',
    answer: 'De investering omvat analyse, blueprint design, implementatie, integraties met bestaande tools, testing, documentatie en kennisoverdracht. Support voor de eerste 30-60 dagen is standaard inbegrepen. Licentiekosten voor externe tools (zoals Zapier of Make) komen daar bovenop.',
  },
  {
    question: 'Hoe snel zie ik resultaat?',
    answer: 'De meeste projecten hebben een terugverdientijd van 2-4 maanden. Na oplevering zie je direct tijdsbesparing. De volledige ROI realiseer je binnen het eerste jaar, afhankelijk van de complexiteit en adoptie.',
  },
  {
    question: 'Wat als de besparing tegenvalt?',
    answer: 'We starten elk project met een grondige analyse en blueprint. Hierin documenteren we de verwachte tijdsbesparing per proces. Na implementatie meten we de werkelijke impact en optimaliseren waar nodig. Je krijgt geen garantie op specifieke ROI, maar wel volledige transparantie over de aannames.',
  },
]

export default async function RoiPage({ params }: { params: { locale: string } }) {
  return (
    <>
      <FaqSchema faqs={roiFaqs} />

      <div className="relative">
        {/* 3D Background */}
        <div className="fixed inset-0 -z-10">
          <BackgroundEngine theme={backgroundThemes.roi} />
        </div>

        <Header />
        <main id="main-content">
          {/* Hero Section */}
          <section className="section-padding-y hero-glow">
            <div className="container-custom text-center">
              <div className="inline-flex items-center gap-3 rounded-full border border-[color:color-mix(in_oklab,var(--brand)_20%,transparent)] bg-[color:color-mix(in_oklab,var(--brand-soft)_40%,transparent)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--brand)]">
                <Calculator className="h-4 w-4" />
                ROI Calculator
              </div>
              <h1 className="mt-8 text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Bereken je ROI op automatisering
              </h1>
              <p className="mt-6 text-lg text-[color:var(--fg-subtle)] md:text-xl">
                Ontdek hoeveel tijd en geld je bespaart door repetitieve processen te automatiseren. Vul je gegevens in en exporteer je resultaat als CSV.
              </p>
            </div>
          </section>

          {/* Calculator Section */}
          <section className="section-padding-y">
            <div className="container-custom">
              <RoiCalculator variant="page" showExport enableUrlSync showMethodNote />
            </div>
          </section>

          {/* Methodology Explainer */}
          <section className="section-padding-y bg-[color:color-mix(in_oklab,var(--bg)_90%,transparent)]">
            <div className="container-custom">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Hoe berekenen we je ROI?
                </h2>
                <p className="mt-4 text-lg text-[color:var(--fg-subtle)]">
                  De calculator gebruikt een transparante formule gebaseerd op tijdsbesparing en adoptie
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    icon: Users,
                    title: 'Teamgrootte',
                    description: 'Aantal mensen dat de geautomatiseerde workflow gebruikt',
                  },
                  {
                    icon: Clock,
                    title: 'Tijdsbesparing',
                    description: 'Uren per week die vrijkomen door automatisering',
                  },
                  {
                    icon: TrendingUp,
                    title: 'Uurtarief',
                    description: 'Gemiddelde kosten per uur voor het team (inclusief overhead)',
                  },
                  {
                    icon: Calculator,
                    title: 'Adoptiepercentage',
                    description: 'Percentage van het team dat de workflow consequent gebruikt',
                  },
                ].map((item) => (
                  <Card
                    key={item.title}
                    className="card-gradient-stripe rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-6"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-body">{item.title}</h3>
                    <p className="mt-2 text-sm text-[color:var(--fg-subtle)]">{item.description}</p>
                  </Card>
                ))}
              </div>

              <Card className="mt-12 rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                <CardHeader>
                  <CardTitle className="text-2xl">De formule</CardTitle>
                  <CardDescription className="text-base">
                    Jaarlijkse besparing = Teamgrootte × Uurtarief × Uren bespaard per week × 52 weken × Adoptiepercentage
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-[color:var(--fg-subtle)]">
                    <strong>Voorbeeld:</strong> Een team van 10 mensen bespaart 2 uur per week aan handmatig werk.
                    Bij een uurtarief van €75 en 60% adoptie: 10 × €75 × 2 × 52 × 0,6 = <strong className="text-[color:var(--brand)]">€46.800 per jaar</strong>
                  </p>
                  <p className="text-sm text-[color:var(--fg-subtle)]">
                    De ROI berekenen we als: (Jaarlijkse besparing - Investering) / Investering × 100%.
                    Bij een investering van €7.500 geeft dit een ROI van <strong className="text-[color:var(--brand)]">524%</strong> in het eerste jaar.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="section-padding-y">
            <div className="container-custom">
              <div className="mx-auto max-w-4xl">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                    Veelgestelde vragen
                  </h2>
                  <p className="mt-4 text-lg text-[color:var(--fg-subtle)]">
                    Alles over de ROI berekening en wat je kunt verwachten
                  </p>
                </div>

                <div className="space-y-4">
                  {roiFaqs.map((faq, index) => (
                    <Card
                      key={index}
                      className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8"
                    >
                      <h3 className="text-lg font-semibold text-body mb-3">{faq.question}</h3>
                      <p className="text-sm text-[color:var(--fg-subtle)] leading-relaxed">{faq.answer}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}

