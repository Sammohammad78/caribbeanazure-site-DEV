/**
 * FAQPage JSON-LD Schema
 * Provides structured data for FAQ sections
 */

import Script from 'next/script'

export interface FaqItem {
  question: string
  answer: string
}

export interface FaqSchemaProps {
  faqs: FaqItem[]
}

export function FaqSchema({ faqs }: FaqSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
