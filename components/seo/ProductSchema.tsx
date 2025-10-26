/**
 * Product JSON-LD Schema
 * For solution/service offering pages
 */

interface ProductSchemaProps {
  name: string
  description: string
  url: string
  price?: string
  currency?: string
  image?: string
  category?: string
}

export function ProductSchema({
  name,
  description,
  url,
  price,
  currency = 'EUR',
  image = 'https://www.caribbeanazure.com/api/og',
  category = 'Software'
}: ProductSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    url,
    image,
    category,
    brand: {
      '@type': 'Brand',
      name: 'Caribbean Azure',
    },
    ...(price && {
      offers: {
        '@type': 'Offer',
        price,
        priceCurrency: currency,
        availability: 'https://schema.org/InStock',
        url,
        priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        seller: {
          '@type': 'Organization',
          name: 'Caribbean Azure',
        },
      },
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
