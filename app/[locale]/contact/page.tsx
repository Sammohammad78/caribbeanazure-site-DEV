import type { ReactNode } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ContactForm } from '@/components/sections/contact-form'
import { MessageCircle, Mail, MapPin, Phone, Clock, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { siteConfig } from '@/config/site'
import { BackgroundEngine } from '@/components/backgrounds/BackgroundEngine'
import { backgroundThemes } from '@/lib/backgroundThemes'

export default function ContactPage() {
  return (
    <>
      <div className="relative">
        {/* 3D Background */}
        <div className="fixed inset-0 -z-10">
          <BackgroundEngine theme={backgroundThemes.contact} />
        </div>

        <Header />
        <main id="main-content">
        {/* Hero Section */}
        <section className="hero-glow section-padding-y">
          <div className="container-custom text-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-[color:color-mix(in_oklab,var(--fg)_16%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--fg-subtle)]">
              <Sparkles className="h-4 w-4 text-[color:var(--accent)]" />
              Neem contact op
            </div>
            <h1 className="mt-8 text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Laten we kennismaken
            </h1>
            <p className="mx-auto mt-6 max-w-[600px] text-lg text-[color:var(--fg-subtle)] md:text-xl">
              Mail, bel of app ons. We reageren binnen 24 uur.
            </p>
          </div>
        </section>

        {/* Contact Methods + Form */}
        <section className="section-padding-y">
          <div className="container-custom grid gap-10 lg:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)]">
            {/* Contact Methods */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-body">Hoe je ons bereikt</h2>

              {/* WhatsApp */}
              <ContactChannelCard
                icon={<MessageCircle className="h-5 w-5" />}
                accent="brand"
                title="WhatsApp"
                tagline="Snelste reactietijd"
                body="Stuur ons een bericht via WhatsApp voor directe vragen of een snelle intake."
              >
                <Button asChild className="w-full">
                  <a
                    href={siteConfig.links.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Start WhatsApp chat
                  </a>
                </Button>
              </ContactChannelCard>

              {/* Email */}
              <ContactChannelCard
                icon={<Mail className="h-5 w-5" />}
                accent="accent"
                title="E-mail"
                tagline="Voor uitgebreide vragen"
                body="Stuur ons een e-mail en we reageren binnen 24 uur."
              >
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-lg font-semibold text-[color:var(--brand)] hover:underline"
                >
                  {siteConfig.contact.email}
                </a>
              </ContactChannelCard>

              {/* Phone */}
              <ContactChannelCard
                icon={<Phone className="h-5 w-5" />}
                accent="brand"
                title="Telefoon"
                tagline="Voor directe gesprekken"
                body="Bel ons tijdens kantooruren (09:00-17:00) voor een adviesgesprek."
              >
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="text-lg font-semibold text-[color:var(--brand)] hover:underline"
                >
                  {siteConfig.contact.phone}
                </a>
              </ContactChannelCard>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-body">Stuur ons een bericht</h2>
              <p className="mt-3 text-sm text-[color:var(--fg-subtle)]">
                Deel je vraag en we nemen snel contact op.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* Additional Info */}
        <section className="section-padding-y bg-[color:color-mix(in_oklab,var(--bg)_90%,transparent)]">
          <div className="container-custom">
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                <CardHeader className="space-y-4 pb-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                    <Clock className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-body">
                    Reactietijd
                  </CardTitle>
                  <CardDescription className="text-sm text-[color:var(--fg-subtle)]">
                    We reageren binnen 24 uur op WhatsApp en e-mail. Telefonisch zijn we bereikbaar op werkdagen tussen 09:00-17:00.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                <CardHeader className="space-y-4 pb-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--accent-soft)_65%,transparent)] text-[color:var(--accent)]">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-body">
                    Locatie
                  </CardTitle>
                  <CardDescription className="text-sm text-[color:var(--fg-subtle)]">
                    We werken remote-first, maar komen wekelijks samen in Amsterdam. Voor on-site workshops komen we graag naar jullie toe.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                <CardHeader className="space-y-4 pb-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-body">
                    Geen verplichtingen
                  </CardTitle>
                  <CardDescription className="text-sm text-[color:var(--fg-subtle)]">
                    Het eerste gesprek is altijd vrijblijvend. We bespreken je uitdaging en adviseren of automatisering impact kan maken.
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

function ContactChannelCard({
  icon,
  title,
  tagline,
  body,
  accent,
  children,
}: {
  icon: React.ReactNode
  title: string
  tagline: string
  body: string
  accent: 'brand' | 'accent'
  children: ReactNode
}) {
  const background =
    accent === 'brand'
      ? 'bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]'
      : 'bg-[color:color-mix(in_oklab,var(--accent-soft)_68%,transparent)] text-[color:var(--accent)]'

  return (
    <Card className="card-gradient-stripe rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
      <CardHeader className="space-y-3 pb-4">
        <div className="flex items-start gap-4">
          <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${background}`}>
            {icon}
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-body">{title}</CardTitle>
            <CardDescription className="text-xs font-medium uppercase tracking-wider text-[color:var(--fg-muted)]">
              {tagline}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-[color:var(--fg-subtle)]">{body}</p>
        {children}
      </CardContent>
    </Card>
  )
}
