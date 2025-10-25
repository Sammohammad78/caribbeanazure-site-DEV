import { MetadataRoute } from 'next'

/**
 * Sitemap generation for Caribbean Azure
 * Includes all public pages with proper priority and change frequency
 * Dutch-first site structure
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.caribbeanazure.com'
  const lastModified = new Date()

  // Primary Dutch routes
  const nlRoutes = [
    { path: '', priority: 1.0, frequency: 'weekly' as const },
    { path: '/diensten', priority: 0.9, frequency: 'weekly' as const },
    { path: '/prijzen', priority: 0.9, frequency: 'weekly' as const },
    { path: '/roi', priority: 0.9, frequency: 'weekly' as const },
    { path: '/cases', priority: 0.8, frequency: 'monthly' as const },
    { path: '/over-ons', priority: 0.8, frequency: 'monthly' as const },
    { path: '/contact', priority: 0.8, frequency: 'monthly' as const },
    { path: '/security', priority: 0.7, frequency: 'monthly' as const },
    { path: '/privacy', priority: 0.6, frequency: 'yearly' as const },
    { path: '/voorwaarden', priority: 0.6, frequency: 'yearly' as const },
    { path: '/insights', priority: 0.7, frequency: 'weekly' as const },
    { path: '/blueprint', priority: 0.7, frequency: 'monthly' as const },
    { path: '/integraties', priority: 0.7, frequency: 'monthly' as const },
    { path: '/sectoren', priority: 0.7, frequency: 'monthly' as const },
  ]

  // Optional English routes (if enabled)
  const enRoutes = [
    { path: '', priority: 0.8, frequency: 'weekly' as const },
    { path: '/services', priority: 0.8, frequency: 'weekly' as const },
    { path: '/pricing', priority: 0.8, frequency: 'weekly' as const },
    { path: '/roi', priority: 0.8, frequency: 'weekly' as const },
    { path: '/cases', priority: 0.7, frequency: 'monthly' as const },
    { path: '/about', priority: 0.7, frequency: 'monthly' as const },
    { path: '/contact', priority: 0.7, frequency: 'monthly' as const },
    { path: '/security', priority: 0.6, frequency: 'monthly' as const },
    { path: '/privacy', priority: 0.5, frequency: 'yearly' as const },
    { path: '/terms', priority: 0.5, frequency: 'yearly' as const },
  ]

  const urls: MetadataRoute.Sitemap = []

  // Add Dutch routes
  for (const route of nlRoutes) {
    urls.push({
      url: `${baseUrl}/nl${route.path}`,
      lastModified,
      changeFrequency: route.frequency,
      priority: route.priority,
    })
  }

  // Add English routes
  for (const route of enRoutes) {
    urls.push({
      url: `${baseUrl}/en${route.path}`,
      lastModified,
      changeFrequency: route.frequency,
      priority: route.priority,
    })
  }

  return urls
}
