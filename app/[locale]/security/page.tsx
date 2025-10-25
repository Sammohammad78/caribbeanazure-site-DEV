import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BackgroundEngine } from '@/components/backgrounds/BackgroundEngine'
import { backgroundThemes } from '@/lib/backgroundThemes'
import { Shield, Lock, Database, FileText, Server, Key, Clock, AlertCircle } from 'lucide-react'

export default async function SecurityPage({ params }: { params: { locale: string } }) {
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
                  <Shield className="h-4 w-4" />
                  Security & Privacy
                </div>
                <h1 className="mt-8 text-balance text-4xl font-bold tracking-tight md:text-5xl">
                  Security & gegevensbescherming
                </h1>
                <p className="mt-6 text-lg text-[color:var(--fg-subtle)]">
                  Hoe we jouw data beschermen en welke maatregelen we nemen om privacy en veiligheid te garanderen
                </p>
              </div>
            </div>
          </section>

          {/* Data Flow Diagram Section */}
          <section className="section-padding-y">
            <div className="container-custom">
              <div className="mx-auto max-w-4xl mb-12 text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Data flow overzicht
                </h2>
                <p className="mt-4 text-lg text-[color:var(--fg-subtle)]">
                  Een visueel overzicht van hoe je data door onze systemen stroomt
                </p>
              </div>

              <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                <CardContent className="space-y-6">
                  <div className="flex flex-col gap-4">
                    {[
                      {
                        step: '1',
                        title: 'Formulier invullen',
                        description: 'Je vult het contactformulier of ROI calculator in via HTTPS (TLS 1.3)',
                        flow: 'Browser → Vercel Edge Network',
                      },
                      {
                        step: '2',
                        title: 'Validatie & sanitization',
                        description: 'Data wordt gevalideerd, gesanitized en rate-limited via Next.js API route',
                        flow: 'Vercel → API Handler (/api/lead)',
                      },
                      {
                        step: '3',
                        title: 'Taak aanmaken',
                        description: 'Een taak wordt aangemaakt in ClickUp CRM met je gegevens',
                        flow: 'API Handler → ClickUp API (VS, AVG-conform)',
                      },
                      {
                        step: '4',
                        title: 'Bevestigingsmail',
                        description: 'Je ontvangt een bevestiging via Resend (transactionele e-mail)',
                        flow: 'API Handler → Resend API → Jouw inbox',
                      },
                      {
                        step: '5',
                        title: 'Logging (PII-safe)',
                        description: 'Alleen metadata wordt gelogd (timestamp, form ID, success/error) - geen persoonlijke data',
                        flow: 'API Handler → Vercel Logs (max 7 dagen)',
                      },
                    ].map((item) => (
                      <div
                        key={item.step}
                        className="flex items-start gap-4 rounded-2xl border border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_75%,transparent)] p-6"
                      >
                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[color:var(--brand)] text-lg font-bold text-white">
                          {item.step}
                        </span>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-body">{item.title}</h3>
                          <p className="mt-2 text-sm text-[color:var(--fg-subtle)]">{item.description}</p>
                          <p className="mt-2 text-xs text-[color:var(--fg-muted)] font-mono">
                            {item.flow}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Sub-processors Section */}
          <section className="section-padding-y bg-[color:color-mix(in_oklab,var(--bg)_90%,transparent)]">
            <div className="container-custom">
              <div className="mx-auto max-w-4xl mb-12 text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Sub-processors (verwerkers)
                </h2>
                <p className="mt-4 text-lg text-[color:var(--fg-subtle)]">
                  Externe partijen waarmee we samenwerken en welke data ze verwerken
                </p>
              </div>

              <div className="mx-auto max-w-4xl space-y-6">
                {[
                  {
                    icon: Server,
                    name: 'Vercel',
                    purpose: 'Website hosting en edge functions',
                    dataProcessed: 'IP-adres (geanonimiseerd), HTTP requests, form submissions',
                    location: 'EU/VS (met Standard Contractual Clauses)',
                    compliance: 'AVG-conform, SOC 2 Type II, ISO 27001',
                    link: 'https://vercel.com/legal/privacy-policy',
                  },
                  {
                    icon: Database,
                    name: 'Resend',
                    purpose: 'Transactionele e-mails (bevestigingen)',
                    dataProcessed: 'E-mailadres, naam, bericht inhoud',
                    location: 'EU (Frankfurt)',
                    compliance: 'AVG-conform, GDPR ready',
                    link: 'https://resend.com/legal/privacy-policy',
                  },
                  {
                    icon: FileText,
                    name: 'ClickUp',
                    purpose: 'CRM en taakbeheer voor leads',
                    dataProcessed: 'Naam, e-mail, telefoon, bedrijfsnaam, ROI data',
                    location: 'VS (met Standard Contractual Clauses)',
                    compliance: 'AVG-conform, SOC 2 Type II',
                    link: 'https://clickup.com/privacy',
                  },
                  {
                    icon: Database,
                    name: 'Plausible Analytics',
                    purpose: 'Privacy-vriendelijke website analytics',
                    dataProcessed: 'Geen persoonlijke data, geen cookies, IP geanonimiseerd',
                    location: 'EU (Duitsland)',
                    compliance: 'AVG-compliant, geen toestemming vereist',
                    link: 'https://plausible.io/privacy',
                  },
                ].map((processor) => (
                  <Card
                    key={processor.name}
                    className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8"
                  >
                    <CardHeader className="flex flex-row items-start gap-4 pb-6">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                        <processor.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{processor.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-[color:var(--fg-subtle)]">
                      <p><strong className="text-body">Doel:</strong> {processor.purpose}</p>
                      <p><strong className="text-body">Verwerkte data:</strong> {processor.dataProcessed}</p>
                      <p><strong className="text-body">Locatie:</strong> {processor.location}</p>
                      <p><strong className="text-body">Compliance:</strong> {processor.compliance}</p>
                      <p>
                        <a
                          href={processor.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[color:var(--brand)] hover:underline"
                        >
                          Privacy policy →
                        </a>
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Security Measures */}
          <section className="section-padding-y">
            <div className="container-custom">
              <div className="mx-auto max-w-4xl mb-12 text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Technische beveiligingsmaatregelen
                </h2>
                <p className="mt-4 text-lg text-[color:var(--fg-subtle)]">
                  Hoe we jouw data technisch beschermen
                </p>
              </div>

              <div className="mx-auto max-w-4xl grid gap-6 md:grid-cols-2">
                {[
                  {
                    icon: Lock,
                    title: 'Encryptie',
                    measures: [
                      'TLS 1.3 voor alle verbindingen',
                      'HTTPS verplicht (HSTS enabled)',
                      'Data-at-rest encryptie bij sub-processors',
                    ],
                  },
                  {
                    icon: Key,
                    title: 'Toegangscontrole',
                    measures: [
                      'Role-Based Access Control (RBAC)',
                      'Minimale privileges principe',
                      'Multi-factor authenticatie (MFA) verplicht',
                    ],
                  },
                  {
                    icon: Database,
                    title: 'Data minimalisatie',
                    measures: [
                      'Alleen noodzakelijke data verzamelen',
                      'IP-adressen geanonimiseerd',
                      'PII-safe logging (geen persoonlijke data)',
                    ],
                  },
                  {
                    icon: AlertCircle,
                    title: 'Incident response',
                    measures: [
                      'Monitoring en alerting 24/7',
                      'Incident response plan beschikbaar',
                      'Meldplicht datalekken binnen 72 uur',
                    ],
                  },
                ].map((measure) => (
                  <Card
                    key={measure.title}
                    className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-6"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                      <measure.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-body">{measure.title}</h3>
                    <ul className="mt-3 space-y-2 text-sm text-[color:var(--fg-subtle)]">
                      {measure.measures.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-[color:var(--brand)] mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Retention Policy */}
          <section className="section-padding-y bg-[color:color-mix(in_oklab,var(--bg)_90%,transparent)]">
            <div className="container-custom">
              <div className="mx-auto max-w-4xl">
                <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                  <CardHeader className="flex flex-row items-start gap-4 pb-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Bewaarbeleid (retention policy)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-[color:var(--fg-subtle)]">
                    <div>
                      <p className="font-semibold text-body mb-2">Contactformulieren en leads:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li><strong>ClickUp CRM:</strong> 2 jaar na laatste contact (tenzij overeenkomst is gesloten)</li>
                        <li><strong>E-mail inbox:</strong> Handmatig beheerd, meestal 2-3 jaar</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-body mb-2">Klantgegevens (bij actieve overeenkomst):</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>7 jaar na einde overeenkomst (wettelijke bewaarplicht fiscaal)</li>
                        <li>Facturen en administratie: 7 jaar conform Belastingdienst</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-body mb-2">Analytics en logging:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li><strong>Plausible Analytics:</strong> 14 maanden (geen persoonlijke data)</li>
                        <li><strong>Vercel Logs:</strong> 7 dagen (alleen metadata, PII-safe)</li>
                      </ul>
                    </div>
                    <p className="pt-4 border-t border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)]">
                      <strong>Automatische verwijdering:</strong> We hebben processen ingericht om data automatisch te verwijderen na de bewaartermijn. Je kunt ook altijd een verzoek indienen via privacy@caribbeanazure.nl.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* DPA/DPIA Section */}
          <section className="section-padding-y">
            <div className="container-custom">
              <div className="mx-auto max-w-4xl">
                <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                  <CardHeader className="flex flex-row items-start gap-4 pb-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">DPA & DPIA beschikbaarheid</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-[color:var(--fg-subtle)]">
                    <div>
                      <p className="font-semibold text-body mb-2">Data Processing Agreement (DPA):</p>
                      <p>
                        Voor klanten die een verwerkersovereenkomst nodig hebben (bijvoorbeeld bij klantdata-verwerking), bieden we standaard een AVG-conforme DPA aan. Deze bevat:
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                        <li>Beschrijving van de verwerking en doeleinden</li>
                        <li>Lijst van sub-processors met opt-out mogelijkheid</li>
                        <li>Technische en organisatorische maatregelen</li>
                        <li>Procedures voor data subject requests</li>
                        <li>Incident notification proces</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-body mb-2">Data Protection Impact Assessment (DPIA):</p>
                      <p>
                        Voor high-risk verwerkingen (bijvoorbeeld grootschalige verwerking van gevoelige data) kunnen we samen met jou een DPIA uitvoeren. Dit omvat:
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                        <li>Risico-inventarisatie en classificatie</li>
                        <li>Privacy by design maatregelen</li>
                        <li>Risicobeperking en mitigatie-plan</li>
                        <li>Stakeholder consultatie</li>
                      </ul>
                    </div>
                    <p className="pt-4 border-t border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)]">
                      <strong>Aanvraag:</strong> Neem contact op via <a href="mailto:privacy@caribbeanazure.nl" className="text-[color:var(--brand)] hover:underline">privacy@caribbeanazure.nl</a> voor een DPA template of DPIA gesprek.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="section-padding-y">
            <div className="container-custom">
              <div className="mx-auto max-w-4xl flex flex-col items-center gap-6 rounded-3xl border border-[color:color-mix(in_oklab,var(--accent)_30%,transparent)] bg-[linear-gradient(135deg,color-mix(in_oklab,var(--brand)_80%,transparent)0%,color-mix(in_oklab,var(--accent)_82%,transparent)100%)] px-8 py-16 text-center text-white shadow-[0_40px_120px_rgb(45_43_99/28%)]">
                <Shield className="h-16 w-16" />
                <h2 className="text-3xl font-semibold">Vragen over security of privacy?</h2>
                <p className="max-w-2xl text-white/90">
                  Ons security en privacy team staat klaar om je vragen te beantwoorden
                </p>
                <Button asChild size="lg" variant="secondary" className="text-body">
                  <a href="mailto:security@caribbeanazure.nl">
                    security@caribbeanazure.nl
                  </a>
                </Button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}

