import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { Mail, Phone, MessageCircle, Shield } from 'lucide-react'
import { siteConfig } from '@/config/site'

export function Footer() {
  const t = useTranslations()
  const locale = useLocale()
  const currentYear = new Date().getFullYear()

  // Build locale-aware href (NL at root, EN with /en prefix)
  const buildHref = (slug: string) => (locale === 'nl' ? `/${slug}` : `/en/${slug}`)

  const localizedSlugs = {
    about: locale === 'nl' ? 'over-ons' : 'over-ons',
    solutions: 'oplossingen',
    contact: 'contact',
  }

  const footerLinks = {
    company: [
      { href: buildHref(localizedSlugs.about), label: t('nav.about') },
      { href: buildHref(localizedSlugs.contact), label: t('nav.contact') },
    ],
    solutions: [
      { href: buildHref('oplossingen'), label: t('footer.solutions.overview') },
      { href: buildHref('oplossingen/light'), label: t('footer.solutions.light') },
      { href: buildHref('oplossingen/maakindustrie'), label: t('footer.solutions.manufacturing') },
      { href: buildHref('oplossingen/configurators'), label: t('footer.solutions.configurators') },
    ],
    legal: [
      { href: buildHref('privacy'), label: t('footer.privacy') },
      { href: buildHref('voorwaarden'), label: t('footer.terms') },
    ],
  }

  return (
    <footer className="border-t border-[color:color-mix(in_oklab,var(--fg)_10%,transparent)] bg-[color:color-mix(in_oklab,var(--bg)_92%,transparent)]/90 backdrop-blur-xl">
      <div className="container-custom py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <FooterColumn label={t('footer.company')} links={footerLinks.company} />
          <FooterColumn label={t('nav.solutions')} links={footerLinks.solutions} />
          <FooterColumn label={t('footer.legal')} links={footerLinks.legal} />

          {/* Contact Column */}
          <div className="space-y-4">
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

          <div className="space-y-3">
            <div className="text-xs text-[color:var(--fg-muted)] max-w-3xl">
              {locale === 'nl'
                ? 'Caribbean Azure rapporteert resultaten altijd met toestemming en in samenwerking met de klant. Namen worden alleen gebruikt na expliciete goedkeuring.'
                : 'Caribbean Azure reports results with client permission and collaboration. Names are only used after explicit approval.'}
            </div>

            {/* GDPR Compliance Notice */}
            <div className="flex items-start gap-2 text-xs text-[color:var(--fg-muted)] max-w-3xl">
              <Shield className="h-3.5 w-3.5 flex-shrink-0 mt-0.5 text-[color:var(--brand)]" />
              <p>
                {locale === 'nl'
                  ? 'AVG-compliant. Wij verwerken uw gegevens conform de Algemene Verordening Gegevensbescherming. Zie ons '
                  : 'GDPR compliant. We process your data in accordance with the General Data Protection Regulation. See our '}
                <Link
                  href={buildHref('privacy')}
                  className="text-[color:var(--brand)] hover:underline"
                >
                  {locale === 'nl' ? 'privacybeleid' : 'privacy policy'}
                </Link>
                {locale === 'nl' ? ' voor details.' : ' for details.'}
              </p>
            </div>
          </div>

          {/* KvK and BTW - Hidden until real values available */}
          {/* <div className="text-xs text-[color:var(--fg-muted)] flex flex-wrap gap-x-4 gap-y-2">
            <span>KvK: [TBD]</span>
            <span>BTW: [TBD]</span>
            <span>© {currentYear} Caribbean Azure</span>
          </div> */}
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
              className="group inline-flex items-center gap-2 text-sm font-medium text-[color:var(--fg-subtle)] transition-colors duration-200 hover:text-[color:var(--brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand)] focus-visible:ring-offset-2 rounded px-1 py-0.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] transition-all duration-200 group-hover:bg-[color:var(--brand)] group-hover:scale-125" />
              <span className="relative">
                {link.label}
                <span className="absolute -bottom-0.5 left-0 right-0 h-[1px] bg-[color:var(--brand)] scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
