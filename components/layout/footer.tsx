import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { Mail, Phone, MessageCircle } from 'lucide-react'
import { siteConfig } from '@/config/site'

export function Footer() {
  const t = useTranslations()
  const locale = useLocale()
  const currentYear = new Date().getFullYear()

  const localizedSlugs = {
    services: locale === 'nl' ? 'diensten' : 'services',
    industries: locale === 'nl' ? 'sectoren' : 'industries',
    integrations: locale === 'nl' ? 'integraties' : 'integrations',
    security: 'security',
    insights: 'insights',
    blueprint: 'blueprint',
    roi: 'roi',
    cases: 'cases',
    pricing: 'prijzen',
    about: locale === 'nl' ? 'over-ons' : 'about',
    contact: 'contact',
  }

  const footerLinks = {
    company: [
      { href: `/${locale}/${localizedSlugs.about}`, label: t('nav.about') },
      { href: `/${locale}/${localizedSlugs.cases}`, label: t('nav.cases') },
      { href: `/${locale}/${localizedSlugs.contact}`, label: t('nav.contact') },
    ],
    services: [
      { href: `/${locale}/${localizedSlugs.services}`, label: t('nav.services') },
      { href: `/${locale}/${localizedSlugs.industries}`, label: t('nav.industries') },
      { href: `/${locale}/${localizedSlugs.integrations}`, label: t('nav.integrations') },
      { href: `/${locale}/${localizedSlugs.security}`, label: t('nav.security') },
    ],
    resources: [
      { href: `/${locale}/${localizedSlugs.insights}`, label: t('nav.insights') },
      { href: `/${locale}/${localizedSlugs.blueprint}`, label: t('nav.blueprint') },
      { href: `/${locale}/${localizedSlugs.roi}`, label: t('nav.roi') },
    ],
    legal: [
      { href: `/${locale}/privacy`, label: t('footer.privacy') },
      { href: `/${locale}/terms`, label: t('footer.terms') },
    ],
  }

  return (
    <footer className="border-t border-[color:color-mix(in_oklab,var(--fg)_10%,transparent)] bg-[color:color-mix(in_oklab,var(--bg)_92%,transparent)]/90 backdrop-blur-xl">
      <div className="container-custom py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <FooterColumn label={t('footer.company')} links={footerLinks.company} />
          <FooterColumn label={t('footer.services')} links={footerLinks.services} />
          <FooterColumn label={t('footer.resources')} links={footerLinks.resources} />
          <FooterColumn label={t('footer.legal')} links={footerLinks.legal} />

          {/* Contact Column */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--fg-muted)]">
              Contact
            </h3>
            <div className="space-y-3 text-sm">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-2 text-[color:var(--fg-subtle)] hover:text-[color:var(--fg)] transition-colors"
              >
                <Mail className="h-4 w-4" />
                {siteConfig.contact.email}
              </a>
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="flex items-center gap-2 text-[color:var(--fg-subtle)] hover:text-[color:var(--fg)] transition-colors"
              >
                <Phone className="h-4 w-4" />
                {siteConfig.contact.phone}
              </a>
              <a
                href={siteConfig.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[color:var(--fg-subtle)] hover:text-[color:var(--fg)] transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-[color:color-mix(in_oklab,var(--fg)_10%,transparent)] pt-8 space-y-6">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 text-sm text-[color:var(--fg-subtle)]">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[color:var(--brand)] text-white font-semibold shadow-[0_12px_32px_color-mix(in_oklab,var(--brand)_35%,transparent)]">
                CA
              </div>
              <p>
                (c) {currentYear} Caribbean Azure. {t('footer.rights')}.
              </p>
            </div>
            <p className="text-sm text-[color:var(--fg-muted)]">{t('footer.tagline')}</p>
          </div>

          <div className="text-xs text-[color:var(--fg-muted)] max-w-3xl">
            {locale === 'nl'
              ? 'Caribbean Azure werkt onafhankelijk en noemt geen klant- of werkgeversnamen. We communiceren alleen resultaten die we feitelijk kunnen aantonen.'
              : 'Caribbean Azure operates independently and does not mention client or employer names. We only communicate results we can factually demonstrate.'}
          </div>

          {/* KvK and BTW */}
          <div className="text-xs text-[color:var(--fg-muted)] flex flex-wrap gap-x-4 gap-y-2">
            <span>KvK: 12345678</span>
            <span>BTW: NL123456789B01</span>
            <span>© {currentYear} Caribbean Azure</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  label,
  links,
}: {
  label: string
  links: { href: string; label: string }[]
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--fg-muted)]">
        {label}
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="lift-hover inline-flex items-center gap-2 text-sm font-medium text-[color:var(--fg-subtle)] transition-all duration-200 hover:text-[color:var(--fg)]"
            >
              <span className="h-1 w-1 rounded-full bg-[color:var(--accent)]" />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
