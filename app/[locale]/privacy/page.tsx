import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { BackgroundEngine } from '@/components/backgrounds/BackgroundEngine'
import { backgroundThemes } from '@/lib/backgroundThemes'
import { Shield, Lock, Eye, Database, Mail, FileText } from 'lucide-react'

export default function PrivacyPage() {
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
                  Privacy Policy
                </div>
                <h1 className="mt-8 text-balance text-4xl font-bold tracking-tight md:text-5xl">
                  Privacyverklaring
                </h1>
                <p className="mt-6 text-lg text-[color:var(--fg-subtle)]">
                  Laatst bijgewerkt: 24 oktober 2025
                </p>
                <p className="mt-4 text-base text-[color:var(--fg-subtle)]">
                  Caribbean Azure respecteert je privacy en verwerkt je gegevens conform de AVG. Deze verklaring legt uit welke gegevens we verzamelen, waarom, en hoe je je rechten uitoefent.
                </p>
              </div>
            </div>
          </section>

          {/* Content Sections */}
          <section className="section-padding-y">
            <div className="container-custom">
              <div className="mx-auto max-w-4xl space-y-8">
                {/* Section 1 */}
                <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                  <CardHeader className="flex flex-row items-start gap-4 pb-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">1. Wie is verantwoordelijk?</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-[color:var(--fg-subtle)]">
                    <p>
                      <strong>Verwerkingsverantwoordelijke:</strong><br />
                      Caribbean Azure<br />
                      KvK: 12345678<br />
                      BTW: NL123456789B01<br />
                      E-mail: privacy@caribbeanazure.nl
                    </p>
                    <p>
                      Caribbean Azure is verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven in deze privacyverklaring.
                    </p>
                  </CardContent>
                </Card>

                {/* Section 2 */}
                <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                  <CardHeader className="flex flex-row items-start gap-4 pb-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                      <Database className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">2. Welke gegevens verzamelen we?</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-[color:var(--fg-subtle)]">
                    <div>
                      <p className="font-semibold text-body mb-2">Via contactformulieren:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Naam</li>
                        <li>E-mailadres</li>
                        <li>Telefoonnummer (optioneel)</li>
                        <li>Bedrijfsnaam (optioneel)</li>
                        <li>Bericht of vraag</li>
                        <li>ROI calculator resultaten (indien ingevuld)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-body mb-2">Automatisch verzameld:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>IP-adres (geanonimiseerd)</li>
                        <li>Browser type en versie</li>
                        <li>Bezochte pagina's en tijdstip</li>
                        <li>Referrer URL</li>
                      </ul>
                    </div>
                    <p>
                      We verzamelen <strong>alleen gegevens die je actief invult</strong> of die noodzakelijk zijn voor de werking van de website.
                    </p>
                  </CardContent>
                </Card>

                {/* Section 3 */}
                <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                  <CardHeader className="flex flex-row items-start gap-4 pb-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                      <Eye className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">3. Waarom verwerken we je gegevens?</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-[color:var(--fg-subtle)]">
                    <div>
                      <p className="font-semibold text-body mb-2">Contact en offerte-aanvragen:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Om je vraag te beantwoorden</li>
                        <li>Om een offerte of voorstel op te stellen</li>
                        <li>Om je te informeren over onze diensten (alleen als je hiervoor toestemming geeft)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-body mb-2">Website analytics:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Om te begrijpen hoe bezoekers de website gebruiken</li>
                        <li>Om de gebruikerservaring te verbeteren</li>
                        <li>Om technische problemen te identificeren</li>
                      </ul>
                    </div>
                    <p>
                      <strong>Rechtsgrond:</strong> We verwerken je gegevens op basis van je toestemming, uitvoering van een overeenkomst, of gerechtvaardigd belang (analytics).
                    </p>
                  </CardContent>
                </Card>

                {/* Section 4 */}
                <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                  <CardHeader className="flex flex-row items-start gap-4 pb-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                      <Lock className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">4. Hoe lang bewaren we je gegevens?</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-[color:var(--fg-subtle)]">
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>Contactformulieren:</strong> 2 jaar na laatste contact (tenzij er een overeenkomst is)</li>
                      <li><strong>Klantgegevens:</strong> 7 jaar na einde overeenkomst (wettelijke bewaarplicht)</li>
                      <li><strong>Analytics data:</strong> 14 maanden (geanonimiseerd)</li>
                      <li><strong>Marketing toestemming:</strong> Tot je deze intrekt</li>
                    </ul>
                    <p>
                      Na afloop van de bewaartermijn verwijderen we je gegevens definitief, tenzij een wettelijke bewaarplicht van toepassing is.
                    </p>
                  </CardContent>
                </Card>

                {/* Section 5 */}
                <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                  <CardHeader className="flex flex-row items-start gap-4 pb-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">5. Delen we je gegevens met derden?</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-[color:var(--fg-subtle)]">
                    <p>
                      We verkopen of verhuren je gegevens <strong>nooit</strong> aan derden. We delen alleen gegevens met partijen die ons helpen onze diensten te leveren:
                    </p>
                    <div>
                      <p className="font-semibold text-body mb-2">Verwerkers (sub-processors):</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li><strong>Vercel:</strong> Website hosting (EU/VS, AVG-conform)</li>
                        <li><strong>Resend:</strong> E-mail verzending (EU, AVG-conform)</li>
                        <li><strong>ClickUp:</strong> CRM en projectmanagement (VS, AVG-conform)</li>
                        <li><strong>Plausible Analytics:</strong> Privacy-vriendelijke analytics (EU)</li>
                      </ul>
                    </div>
                    <p>
                      Met alle verwerkers hebben we een verwerkersovereenkomst afgesloten conform de AVG. Meer details vind je op onze <a href="/security" className="text-[color:var(--brand)] hover:underline">/security pagina</a>.
                    </p>
                  </CardContent>
                </Card>

                {/* Section 6 */}
                <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                  <CardHeader className="flex flex-row items-start gap-4 pb-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                      <Shield className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">6. Jouw rechten</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-[color:var(--fg-subtle)]">
                    <p>
                      Je hebt de volgende rechten onder de AVG:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>Recht op inzage:</strong> Je mag vragen welke gegevens we van je hebben</li>
                      <li><strong>Recht op rectificatie:</strong> Je kunt onjuiste gegevens laten corrigeren</li>
                      <li><strong>Recht op verwijdering:</strong> Je kunt vragen om je gegevens te verwijderen</li>
                      <li><strong>Recht op beperking:</strong> Je kunt verzoeken om verwerking te beperken</li>
                      <li><strong>Recht op dataportabiliteit:</strong> Je kunt je gegevens in een gestructureerd formaat opvragen</li>
                      <li><strong>Recht van bezwaar:</strong> Je kunt bezwaar maken tegen verwerking</li>
                      <li><strong>Recht om toestemming in te trekken:</strong> Als we werken op basis van toestemming</li>
                    </ul>
                    <p>
                      Om je rechten uit te oefenen, stuur een e-mail naar <a href="mailto:privacy@caribbeanazure.nl" className="text-[color:var(--brand)] hover:underline">privacy@caribbeanazure.nl</a>. We reageren binnen 30 dagen.
                    </p>
                    <p>
                      Ben je het niet eens met hoe we je gegevens verwerken? Je kunt een klacht indienen bij de <a href="https://autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer" className="text-[color:var(--brand)] hover:underline">Autoriteit Persoonsgegevens</a>.
                    </p>
                  </CardContent>
                </Card>

                {/* Section 7 */}
                <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                  <CardHeader className="flex flex-row items-start gap-4 pb-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                      <Lock className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">7. Beveiliging</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-[color:var(--fg-subtle)]">
                    <p>
                      We nemen beveiliging serieus en implementeren passende technische en organisatorische maatregelen:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>HTTPS/TLS encryptie voor alle data in transit</li>
                      <li>Toegangscontrole en autorisatie (Role-Based Access Control)</li>
                      <li>Gegevens worden versleuteld opgeslagen waar mogelijk</li>
                      <li>Logging en monitoring van systeemactiviteit</li>
                      <li>Regelmatige beveiligingsupdates en patches</li>
                    </ul>
                    <p>
                      Meer details over onze beveiligingsmaatregelen vind je op de <a href="/security" className="text-[color:var(--brand)] hover:underline">/security pagina</a>.
                    </p>
                  </CardContent>
                </Card>

                {/* Section 8 */}
                <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                  <CardHeader className="flex flex-row items-start gap-4 pb-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">8. Cookies en tracking</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-[color:var(--fg-subtle)]">
                    <p>
                      Deze website gebruikt cookies. Je kunt je voorkeuren aanpassen via de cookie-banner die bij je eerste bezoek verschijnt, of via de instellingen onderaan deze pagina.
                    </p>
                    <div>
                      <p className="font-semibold text-body mb-2">Functionele cookies (altijd actief):</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Cookie consent voorkeuren</li>
                        <li>Sessie cookies voor contactformulieren</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-body mb-2">Analytics cookies (optioneel):</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Plausible Analytics (privacy-vriendelijk, geen persoonlijke data)</li>
                      </ul>
                    </div>
                    <p>
                      We gebruiken <strong>geen</strong> Google Analytics, Facebook Pixel of andere invasieve tracking tools.
                    </p>
                  </CardContent>
                </Card>

                {/* Section 9 */}
                <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                  <CardHeader className="flex flex-row items-start gap-4 pb-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">9. Wijzigingen</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-[color:var(--fg-subtle)]">
                    <p>
                      We kunnen deze privacyverklaring aanpassen. De meest recente versie vind je altijd op deze pagina. De datum van de laatste wijziging staat bovenaan dit document.
                    </p>
                    <p>
                      Bij grote wijzigingen informeren we je via e-mail (als we je e-mailadres hebben).
                    </p>
                  </CardContent>
                </Card>

                {/* Section 10 */}
                <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                  <CardHeader className="flex flex-row items-start gap-4 pb-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">10. Contact</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-[color:var(--fg-subtle)]">
                    <p>
                      Heb je vragen over deze privacyverklaring of wil je je rechten uitoefenen?
                    </p>
                    <p>
                      <strong>E-mail:</strong> <a href="mailto:privacy@caribbeanazure.nl" className="text-[color:var(--brand)] hover:underline">privacy@caribbeanazure.nl</a><br />
                      <strong>Postadres:</strong> Caribbean Azure, [Adres invullen], Nederland
                    </p>
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
