import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { BackgroundEngine } from '@/components/backgrounds/BackgroundEngine'
import { backgroundThemes } from '@/lib/backgroundThemes'
import { FileText, CheckCircle2, AlertTriangle, Scale, Handshake, Shield } from 'lucide-react'

export default function TermsPage() {
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
                  <FileText className="h-4 w-4" />
                  Algemene Voorwaarden
                </div>
                <h1 className="mt-8 text-balance text-4xl font-bold tracking-tight md:text-5xl">
                  Algemene voorwaarden
                </h1>
                <p className="mt-6 text-lg text-[color:var(--fg-subtle)]">
                  Laatst bijgewerkt: 24 oktober 2025
                </p>
                <p className="mt-4 text-base text-[color:var(--fg-subtle)]">
                  Deze algemene voorwaarden zijn van toepassing op alle overeenkomsten tussen Caribbean Azure en de opdrachtgever.
                </p>
              </div>
            </div>
          </section>

          {/* Content Sections */}
          <section className="section-padding-y">
            <div className="container-custom">
              <div className="mx-auto max-w-4xl space-y-8">
                {/* Article 1 */}
                <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                  <CardHeader className="flex flex-row items-start gap-4 pb-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Artikel 1 – Definities</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-[color:var(--fg-subtle)]">
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>Opdrachtnemer:</strong> Caribbean Azure, KvK 12345678, gevestigd te Nederland</li>
                      <li><strong>Opdrachtgever:</strong> De natuurlijke of rechtspersoon die met opdrachtnemer een overeenkomst aangaat</li>
                      <li><strong>Diensten:</strong> Alle werkzaamheden die opdrachtnemer uitvoert, waaronder automatisering, webontwikkeling, AI-integraties, consultancy en training</li>
                      <li><strong>Deliverable:</strong> Een concreet opgeleverd product of resultaat zoals een workflow, dashboard, website of rapportage</li>
                      <li><strong>Blueprint:</strong> Een visueel plan met flowcharts, datastromen en technische specificaties</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Article 2 */}
                <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                  <CardHeader className="flex flex-row items-start gap-4 pb-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                      <Handshake className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Artikel 2 – Toepasselijkheid</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-[color:var(--fg-subtle)]">
                    <p>
                      2.1. Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen, offertes en overeenkomsten tussen opdrachtnemer en opdrachtgever.
                    </p>
                    <p>
                      2.2. Afwijkingen van deze voorwaarden zijn alleen geldig indien schriftelijk overeengekomen.
                    </p>
                    <p>
                      2.3. De toepasselijkheid van eventuele inkoop- of andere voorwaarden van opdrachtgever wordt uitdrukkelijk van de hand gewezen.
                    </p>
                    <p>
                      2.4. Indien één of meerdere bepalingen in deze algemene voorwaarden nietig zijn, blijven de overige bepalingen volledig van kracht.
                    </p>
                  </CardContent>
                </Card>

                {/* Article 3 */}
                <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                  <CardHeader className="flex flex-row items-start gap-4 pb-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Artikel 3 – Offerte en totstandkoming</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-[color:var(--fg-subtle)]">
                    <p>
                      3.1. Alle offertes zijn vrijblijvend en 30 dagen geldig, tenzij anders vermeld.
                    </p>
                    <p>
                      3.2. Een overeenkomst komt tot stand na schriftelijke bevestiging door opdrachtnemer of bij aanvang van werkzaamheden.
                    </p>
                    <p>
                      3.3. Prijzen in offertes zijn exclusief BTW, tenzij anders vermeld.
                    </p>
                    <p>
                      3.4. Indien de opdrachtgever niet akkoord gaat met een offerte, vervalt deze automatisch na 30 dagen.
                    </p>
                  </CardContent>
                </Card>

                {/* Article 4 */}
                <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                  <CardHeader className="flex flex-row items-start gap-4 pb-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Artikel 4 – Uitvoering van de opdracht</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-[color:var(--fg-subtle)]">
                    <p>
                      4.1. Opdrachtnemer voert de overeenkomst naar beste kunnen uit, conform de state-of-the-art in de branche.
                    </p>
                    <p>
                      4.2. Opgeleverde deliverables worden getest voorafgaand aan oplevering. Opdrachtgever heeft 5 werkdagen om feedback te geven.
                    </p>
                    <p>
                      4.3. Opdrachtgever verstrekt tijdig alle benodigde informatie, toegangen en medewerking. Vertraging door de opdrachtgever kan leiden tot aanpassing van planning en kosten.
                    </p>
                    <p>
                      4.4. Opdrachtnemer heeft het recht om derden in te schakelen bij de uitvoering van de opdracht.
                    </p>
                    <p>
                      4.5. Genoemde doorlooptijden zijn indicatief en geen fatale termijnen, tenzij uitdrukkelijk schriftelijk anders overeengekomen.
                    </p>
                  </CardContent>
                </Card>

                {/* Article 5 */}
                <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                  <CardHeader className="flex flex-row items-start gap-4 pb-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                      <Scale className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Artikel 5 – Prijzen en betaling</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-[color:var(--fg-subtle)]">
                    <p>
                      5.1. Alle prijzen zijn exclusief BTW en exclusief kosten voor externe tools (zoals Zapier, Make, API-licenties).
                    </p>
                    <p>
                      5.2. Betaling dient te geschieden binnen 14 dagen na factuurdatum, tenzij anders overeengekomen.
                    </p>
                    <p>
                      5.3. Bij projecten boven €5.000 kan opdrachtnemer een voorschotfactuur van 30% sturen bij ondertekening.
                    </p>
                    <p>
                      5.4. Bij overschrijding van de betalingstermijn is opdrachtgever in verzuim zonder nadere ingebrekestelling. Opdrachtnemer heeft het recht 1% rente per maand in rekening te brengen.
                    </p>
                    <p>
                      5.5. Alle kosten van incasso, zowel gerechtelijk als buitengerechtelijk, komen voor rekening van de opdrachtgever.
                    </p>
                  </CardContent>
                </Card>

                {/* Article 6 */}
                <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                  <CardHeader className="flex flex-row items-start gap-4 pb-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                      <Shield className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Artikel 6 – Intellectueel eigendom</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-[color:var(--fg-subtle)]">
                    <p>
                      6.1. Alle intellectuele eigendomsrechten op door opdrachtnemer ontwikkelde of geleverde werken berusten bij opdrachtnemer, tenzij schriftelijk anders overeengekomen.
                    </p>
                    <p>
                      6.2. Opdrachtgever verkrijgt een niet-exclusief, niet-overdraagbaar gebruiksrecht op de opgeleverde deliverables voor eigen gebruik binnen de organisatie.
                    </p>
                    <p>
                      6.3. Het is opdrachtgever niet toegestaan de geleverde werken te verveelvoudigen, te verkopen of ter beschikking te stellen aan derden zonder voorafgaande schriftelijke toestemming van opdrachtnemer.
                    </p>
                    <p>
                      6.4. Maatwerk code en scripts blijven eigendom van opdrachtnemer, maar opdrachtgever krijgt volledige toegang en wijzigingsrechten voor intern gebruik.
                    </p>
                    <p>
                      6.5. Herbruikbare componenten, templates en frameworks die opdrachtnemer heeft ontwikkeld blijven eigendom van opdrachtnemer en mogen worden hergebruikt voor andere projecten.
                    </p>
                  </CardContent>
                </Card>

                {/* Article 7 */}
                <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                  <CardHeader className="flex flex-row items-start gap-4 pb-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                      <AlertTriangle className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Artikel 7 – Aansprakelijkheid</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-[color:var(--fg-subtle)]">
                    <p>
                      7.1. Opdrachtnemer is uitsluitend aansprakelijk voor directe schade die het gevolg is van opzet of bewuste roekeloosheid van opdrachtnemer.
                    </p>
                    <p>
                      7.2. Aansprakelijkheid voor indirecte schade, waaronder gevolgschade, gederfde winst, gemiste besparingen en schade door bedrijfsstagnatie, is uitgesloten.
                    </p>
                    <p>
                      7.3. De aansprakelijkheid van opdrachtnemer is beperkt tot maximaal het factuurbedrag van de betreffende opdracht, met een maximum van €25.000.
                    </p>
                    <p>
                      7.4. Opdrachtgever is verantwoordelijk voor het maken van back-ups van eigen data en systemen. Opdrachtnemer is niet aansprakelijk voor dataverlies.
                    </p>
                    <p>
                      7.5. Opdrachtnemer is niet aansprakelijk voor storingen, uitval of wijzigingen in externe systemen en API's van derden (zoals Zapier, Make, ClickUp, Google, Microsoft).
                    </p>
                  </CardContent>
                </Card>

                {/* Article 8 */}
                <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                  <CardHeader className="flex flex-row items-start gap-4 pb-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                      <Shield className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Artikel 8 – Garantie en onderhoud</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-[color:var(--fg-subtle)]">
                    <p>
                      8.1. Opdrachtnemer garandeert dat opgeleverde deliverables voldoen aan de in het blueprint beschreven specificaties.
                    </p>
                    <p>
                      8.2. Gedurende de overeengekomen support-periode (standaard 30 dagen na oplevering) lost opdrachtnemer bugs en functionele problemen kosteloos op.
                    </p>
                    <p>
                      8.3. Na afloop van de support-periode kunnen bugs en aanpassingen worden gefactureerd op basis van uurtarief of via een support-abonnement.
                    </p>
                    <p>
                      8.4. De garantie vervalt indien opdrachtgever of derden zonder toestemming wijzigingen hebben aangebracht in de opgeleverde systemen.
                    </p>
                  </CardContent>
                </Card>

                {/* Article 9 */}
                <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                  <CardHeader className="flex flex-row items-start gap-4 pb-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Artikel 9 – Geheimhouding</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-[color:var(--fg-subtle)]">
                    <p>
                      9.1. Beide partijen verplichten zich tot geheimhouding van alle vertrouwelijke informatie die zij in het kader van de overeenkomst van elkaar hebben verkregen.
                    </p>
                    <p>
                      9.2. Opdrachtnemer mag de naam van opdrachtgever en een algemene beschrijving van het project gebruiken voor referentiedoeleinden, tenzij schriftelijk anders overeengekomen.
                    </p>
                    <p>
                      9.3. Op verzoek van opdrachtgever kan een aparte Non-Disclosure Agreement (NDA) worden afgesloten voorafgaand aan de offerte-fase.
                    </p>
                  </CardContent>
                </Card>

                {/* Article 10 */}
                <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                  <CardHeader className="flex flex-row items-start gap-4 pb-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                      <AlertTriangle className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Artikel 10 – Ontbinding en opzegging</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-[color:var(--fg-subtle)]">
                    <p>
                      10.1. Beide partijen kunnen de overeenkomst schriftelijk opzeggen met een opzegtermijn van 30 dagen, tenzij anders overeengekomen.
                    </p>
                    <p>
                      10.2. Bij voortijdige beëindiging door opdrachtgever blijft deze verplicht tot betaling van reeds verrichte werkzaamheden en gemaakte kosten.
                    </p>
                    <p>
                      10.3. Opdrachtnemer heeft het recht de overeenkomst met onmiddellijke ingang te beëindigen indien opdrachtgever zijn betalingsverplichtingen niet nakomt of failliet wordt verklaard.
                    </p>
                    <p>
                      10.4. Bij retainer-overeenkomsten geldt een opzegtermijn van 60 dagen tegen het einde van een kalendermaand.
                    </p>
                  </CardContent>
                </Card>

                {/* Article 11 */}
                <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                  <CardHeader className="flex flex-row items-start gap-4 pb-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                      <Scale className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Artikel 11 – Toepasselijk recht en geschillen</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-[color:var(--fg-subtle)]">
                    <p>
                      11.1. Op alle overeenkomsten tussen opdrachtnemer en opdrachtgever is uitsluitend Nederlands recht van toepassing.
                    </p>
                    <p>
                      11.2. Geschillen worden voorgelegd aan de bevoegde rechter in het arrondissement waar opdrachtnemer is gevestigd.
                    </p>
                    <p>
                      11.3. Partijen zullen eerst trachten een geschil in onderling overleg op te lossen alvorens een beroep te doen op de rechter.
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
