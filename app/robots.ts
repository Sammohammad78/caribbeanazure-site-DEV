import { MetadataRoute } from 'next'

/**
 * Robots.txt generation
 * Allows all bots to crawl public pages
 * Blocks API routes, admin, and Next.js internals
 */

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.caribbeanazure.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
