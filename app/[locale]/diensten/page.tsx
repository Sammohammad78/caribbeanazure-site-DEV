import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Sparkles,
  Mail,
  MessageSquare,
  BarChart3,
  Zap,
  Bot,
  GraduationCap,
  Clock,
  Shield,
  CheckCircle2,
} from 'lucide-react'
import Link from 'next/link'
import { BackgroundEngine } from '@/components/backgrounds/BackgroundEngine'
import { backgroundThemes } from '@/lib/backgroundThemes'
import { RoiCalculator } from '@/components/roi/RoiCalculator'

type ServiceBlock = {
  icon: any
  title: string
  description: string
  points: string[]
}

const services: ServiceBlock[] = [
  {
    icon: Mail,
    title: 'Workflow-automatisering',
    description:
      'Terugkerende taken zoals e-mails sorteren, data invoeren of klanten opvolgen lopen vanzelf. Jij krijgt tijd terug voor belangrijk werk.',
    points: [
      'Koppelingen tussen Gmail, Outlook, CRM en projecttools',
      'Automatisch data ophalen uit e-mails en bijlagen',
      'Slimme toewijzing van taken aan teamleden',
    ],
  },
  {
    icon: MessageSquare,
    title: 'AI-assistenten & chatbots',
    description:
      'Een bot die veelgestelde vragen beantwoordt, afspraken plant of offertes voorbereidt. Beschikbaar via je website of WhatsApp.',
    points: [
      'Integratie met WhatsApp Business API',
      'Herkenning van vraag-typen en juiste antwoorden',
      'Koppeling naar je CRM voor opvolging',
    ],
  },
  {
    icon: BarChart3,
    title: 'Dashboards & rapportage',
    description:
      'Overzicht van wat belangrijk is: waar gaat het goed, waar loopt het vast, en wat vraagt aandacht. Geen lange rapporten meer nodig.',
    points: [
      'Dashboards in Power BI of Looker',
      'Live inzicht in cijfers die ertoe doen',
      'Meldingen wanneer iets afwijkt',
    ],
  },
  {
    icon: Zap,
    title: 'Webdesign met impact',
    description:
      'Een website die snel laadt, helder communiceert en prettig werkt op elk apparaat. Gekoppeld aan je automatisering waar nodig.',
    points: [
      'Gebouwd met moderne technieken (Next.js)',
      'Gekoppeld aan je CRM, planning of inschrijfsysteem',
      'Goed vindbaar in Google en toegankelijk voor iedereen',
    ],
  },
  {
    icon: Bot,
    title: 'Procesautomatisering',
    description:
      'Van facturatie tot nieuwe klanten onboarden: processen die je nu handmatig doet, kunnen vaak geautomatiseerd. Met Zapier, Make of maatwerk code.',
    points: [
      'Herbruikbare oplossingen waar het kan',
      'Maatwerk code alleen als het echt nodig is',
      'Waarschuwingen als er iets misgaat',
    ],
  },
  {
    icon: GraduationCap,
    title: 'Training en kennisoverdracht',
    description:
      'Workshops en sessies waarna jouw team zelfstandig kan beheren, aanpassen en uitbreiden. Zodat je niet afhankelijk blijft.',
    points: [
      'Sessies op locatie of online',
      'Handleidingen in het Nederlands',
      'Support-abonnementen vanaf 10 uur per maand',
    ],
  },
]

export default function ServicesPage() {
  return (
    <>
      <div className="relative">
        {/* 3D Background */}
        <div className="fixed inset-0 -z-10">
          <BackgroundEngine theme={backgroundThemes.services} />
        </div>

        <Header />
        <main id="main-content">
        {/* Hero Section */}
        <section className="hero-glow relative section-padding-y overflow-hidden">
          <div className="container-custom relative z-10">
            <div className="mx-auto max-w-[800px] text-center">
              <div className="inline-flex items-center gap-3 rounded-full border border-[color:color-mix(in_oklab,var(--fg)_16%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--fg-subtle)]">
                <Sparkles className="h-4 w-4 text-[color:var(--accent)]" />
                Onze diensten
              </div>
              <h1 className="mt-8 text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Wat we voor je kunnen doen
              </h1>
              <p className="mt-6 text-lg text-[color:var(--fg-subtle)] md:text-xl">
                We combineren no-code, AI en maatwerk zodat repetitieve processen vanzelf lopen en je tijd terugkrijgt voor werk dat ertoe doet.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section-padding-y">
          <div className="container-custom">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Card
                  key={service.title}
                  className="card-gradient-stripe group h-full rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8 transition-transform duration-300 hover:scale-[1.02]"
                >
                  <CardHeader className="space-y-4 pb-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)] shadow-[0_12px_32px_color-mix(in_oklab,var(--brand)_30%,transparent)] transition-all duration-300 group-hover:scale-110">
                      <service.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-body">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed text-[color:var(--fg-subtle)]">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {service.points.map((point) => (
                      <div
                        key={point}
                        className="flex items-start gap-3 text-sm text-[color:var(--fg-subtle)]"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--accent)]" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ROI Calculator Section */}
        <section className="section-padding-y">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl">
              <RoiCalculator variant="card" showExport enableUrlSync />
            </div>
          </div>
        </section>

        {/* How We Work Section */}
        <section className="section-padding-y bg-[color:color-mix(in_oklab,var(--bg)_90%,transparent)]">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
              <Card className="rounded-3xl p-10">
                <CardHeader className="space-y-4 pb-8">
                  <CardTitle className="text-3xl font-bold text-body">
                    Hoe we samenwerken
                  </CardTitle>
                  <CardDescription className="text-base text-[color:var(--fg-subtle)]">
                    Elke implementatie volgt dezelfde stappen: van analyse tot kennisoverdracht.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    {
                      number: '01',
                      title: 'Analyse',
                      description:
                        'We brengen je huidige processen, data en tools in kaart. Je krijgt inzicht in wat kan en welke impact het heeft.',
                    },
                    {
                      number: '02',
                      title: 'Blueprint',
                      description:
                        'Een visueel plan met flows, systemen en wie wat doet. Je weet precies wat we gaan bouwen en wanneer.',
                    },
                    {
                      number: '03',
                      title: 'Bouwen en testen',
                      description:
                        'We leveren in blokken van twee weken. Elke oplevering wordt getest en je ziet de voortgang in een dashboard.',
                    },
                    {
                      number: '04',
                      title: 'Kennisoverdracht',
                      description:
                        'Training en handleidingen zodat je team het zelf kan beheren en aanpassen. Je blijft niet afhankelijk van ons.',
                    },
                  ].map((step) => (
                    <div
                      key={step.number}
                      className="group rounded-2xl border border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_75%,transparent)] p-6 transition-all duration-300 hover:border-[color:color-mix(in_oklab,var(--brand)_32%,transparent)]"
                    >
                      <div className="flex items-start gap-4">
                        <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:var(--brand)] text-lg font-bold text-white">
                          {step.number}
                        </span>
                        <div>
                          <h3 className="text-lg font-semibold text-body">{step.title}</h3>
                          <p className="mt-2 text-sm text-[color:var(--fg-subtle)]">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* CTA Card */}
              <Card className="flex h-full flex-col justify-between rounded-3xl border-[color:color-mix(in_oklab,var(--accent)_32%,transparent)] bg-[linear-gradient(135deg,color-mix(in_oklab,var(--brand-600)_85%,transparent)0%,color-mix(in_oklab,var(--brand-400)_80%,transparent)100%)] p-10 text-white">
                <CardHeader className="space-y-6">
                  <CardTitle className="text-3xl font-bold">
                    Klaar om te starten?
                  </CardTitle>
                  <CardDescription className="text-base text-white/90">
                    Plan een gesprek van 45 minuten. Je ontvangt een voorstel met aanpak, planning en investering.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4 text-sm text-white/85">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5" />
                      <span>Reactie binnen 24 uur</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5" />
                      <span>NDA standaard beschikbaar</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5" />
                      <span>Vrijblijvend en geen verplichtingen</span>
                    </div>
                  </div>
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-white text-[color:var(--brand-600)] hover:bg-white/90"
                  >
                    <Link href="/nl/contact">
                      Plan een gesprek
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
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
