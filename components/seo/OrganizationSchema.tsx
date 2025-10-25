/**
 * Organization JSON-LD Schema
 * Provides structured data for search engines about Caribbean Azure
 */

import Script from 'next/script'
import { siteConfig } from '@/config/site'

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Caribbean Azure',
    url: 'https://www.caribbeanazure.com',
    logo: 'https://www.caribbeanazure.com/logo.png',
    description:
      'Caribbean Azure helpt kleine en middelgrote teams om slimmer te werken met automatisering. We brengen processen in kaart, koppelen de juiste tools en bouwen alleen wat echt nodig is.',
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'NL',
      addressLocality: 'Amsterdam',
    },
    sameAs: [
      siteConfig.links.whatsapp,
      // Add other social profiles here when available
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.contact.phone,
      contactType: 'Customer Service',
      availableLanguage: ['Dutch', 'English'],
      areaServed: 'NL',
    },
    knowsAbout: [
      'Workflow Automation',
      'AI Assistants',
      'Process Automation',
      'Dashboard Development',
      'Web Development',
      'CRM Integration',
    ],
  }

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
