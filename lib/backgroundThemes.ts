/**
 * Caribbean Azure - Modular 3D Background Theme System
 * Research-driven design tokens for per-page visual identity
 */

export type BackgroundTheme = {
  name: string
  mood: string
  effect: 'fluid-particles' | 'neural-grid' | 'organic-waves' | 'depth-field' | 'minimal-float'
  colors: {
    primary: string
    secondary: string
    accent: string
    gradientStart: string
    gradientEnd: string
  }
  motion: {
    speed: number // 0.3 to 1.5 (base multiplier)
    parallaxIntensity: number // 0 to 1 (cursor influence)
    flowDirection: 'horizontal' | 'vertical' | 'radial'
  }
  particles: {
    count: number
    size: number
    opacity: number
  }
  performance: {
    dpr: [number, number] // [min, max] device pixel ratio
    antialias: boolean
  }
}

export const backgroundThemes: Record<string, BackgroundTheme> = {
  home: {
    name: 'Home - Confident & Approachable',
    mood: 'Tech-forward yet calming',
    effect: 'fluid-particles',
    colors: {
      primary: '#2563EB', // Azure primary
      secondary: '#06B6D4', // Cyan accent
      accent: '#F59E0B', // Warm amber
      gradientStart: '#2563EB',
      gradientEnd: '#06B6D4',
    },
    motion: {
      speed: 0.5,
      parallaxIntensity: 0.1, // Gentle 10% displacement
      flowDirection: 'radial',
    },
    particles: {
      count: 3000,
      size: 2.5,
      opacity: 0.6,
    },
    performance: {
      dpr: [1, 1.5],
      antialias: true,
    },
  },

  services: {
    name: 'Services - Systematic & Intelligent',
    mood: 'Efficient, neural network aesthetic',
    effect: 'neural-grid',
    colors: {
      primary: '#0A2A43', // Navy deep
      secondary: '#2563EB', // Azure
      accent: '#06B6D4', // Cyan
      gradientStart: '#0A2A43',
      gradientEnd: '#2563EB',
    },
    motion: {
      speed: 1.2, // Faster rhythm
      parallaxIntensity: 0.15,
      flowDirection: 'horizontal',
    },
    particles: {
      count: 5000, // More nodes for grid
      size: 1.8,
      opacity: 0.7,
    },
    performance: {
      dpr: [1, 1.5],
      antialias: true,
    },
  },

  about: {
    name: 'About - Human & Trustworthy',
    mood: 'Warm, organic, breathing',
    effect: 'organic-waves',
    colors: {
      primary: '#F59E0B', // Amber warm
      secondary: '#2563EB', // Azure
      accent: '#06B6D4', // Cyan
      gradientStart: '#F59E0B',
      gradientEnd: '#2563EB',
    },
    motion: {
      speed: 0.7, // Slow breathing effect
      parallaxIntensity: 0.08,
      flowDirection: 'vertical',
    },
    particles: {
      count: 2000,
      size: 3.0,
      opacity: 0.5,
    },
    performance: {
      dpr: [1, 1.5],
      antialias: true,
    },
  },

  cases: {
    name: 'Cases - Professional & Results-Driven',
    mood: 'Depth, perspective, clarity',
    effect: 'depth-field',
    colors: {
      primary: '#2563EB', // Azure monochrome
      secondary: '#60A5FA', // Lighter azure
      accent: '#06B6D4', // Cyan
      gradientStart: '#2563EB',
      gradientEnd: '#60A5FA',
    },
    motion: {
      speed: 0.8,
      parallaxIntensity: 0.12, // Scroll-responsive
      flowDirection: 'vertical',
    },
    particles: {
      count: 1500, // Grid lines
      size: 1.5,
      opacity: 0.4,
    },
    performance: {
      dpr: [1, 1.5],
      antialias: false, // Lines don't need AA
    },
  },

  contact: {
    name: 'Contact - Open & Inviting',
    mood: 'Minimal, clear, gentle drift',
    effect: 'minimal-float',
    colors: {
      primary: '#06B6D4', // Cyan
      secondary: '#0A2A43', // Navy (inverted)
      accent: '#2563EB', // Azure
      gradientStart: '#06B6D4',
      gradientEnd: '#0A2A43',
    },
    motion: {
      speed: 0.3, // Very gentle
      parallaxIntensity: 0, // No parallax
      flowDirection: 'vertical',
    },
    particles: {
      count: 800,
      size: 2.0,
      opacity: 0.3,
    },
    performance: {
      dpr: [1, 1.25],
      antialias: true,
    },
  },

  pricing: {
    name: 'Pricing - Clear & Transparent',
    mood: 'Structured, organized, trustworthy',
    effect: 'depth-field',
    colors: {
      primary: '#2563EB', // Azure
      secondary: '#0A2A43', // Navy
      accent: '#06B6D4', // Cyan
      gradientStart: '#2563EB',
      gradientEnd: '#0A2A43',
    },
    motion: {
      speed: 0.6,
      parallaxIntensity: 0.1,
      flowDirection: 'vertical',
    },
    particles: {
      count: 1800,
      size: 1.8,
      opacity: 0.5,
    },
    performance: {
      dpr: [1, 1.5],
      antialias: false,
    },
  },

  roi: {
    name: 'ROI - Data-Driven & Analytical',
    mood: 'Precise, mathematical, trustworthy',
    effect: 'neural-grid',
    colors: {
      primary: '#06B6D4', // Cyan (analytical)
      secondary: '#2563EB', // Azure
      accent: '#F59E0B', // Amber (highlights)
      gradientStart: '#06B6D4',
      gradientEnd: '#2563EB',
    },
    motion: {
      speed: 0.9, // Moderate motion
      parallaxIntensity: 0.12,
      flowDirection: 'horizontal',
    },
    particles: {
      count: 2500, // Grid density
      size: 1.5,
      opacity: 0.6,
    },
    performance: {
      dpr: [1, 1.5],
      antialias: true,
    },
  },

  legal: {
    name: 'Legal - Professional & Trustworthy',
    mood: 'Calm, authoritative, minimal',
    effect: 'minimal-float',
    colors: {
      primary: '#0A2A43', // Navy (professional)
      secondary: '#2563EB', // Azure
      accent: '#06B6D4', // Cyan
      gradientStart: '#0A2A43',
      gradientEnd: '#2563EB',
    },
    motion: {
      speed: 0.4, // Very slow, calm
      parallaxIntensity: 0,
      flowDirection: 'vertical',
    },
    particles: {
      count: 600, // Minimal
      size: 2.2,
      opacity: 0.3,
    },
    performance: {
      dpr: [1, 1.25],
      antialias: true,
    },
  },

  // Fallback default theme
  default: {
    name: 'Default - Minimal Fallback',
    mood: 'Safe fallback for unknown pages',
    effect: 'minimal-float',
    colors: {
      primary: '#2563EB',
      secondary: '#06B6D4',
      accent: '#F59E0B',
      gradientStart: '#2563EB',
      gradientEnd: '#06B6D4',
    },
    motion: {
      speed: 0.5,
      parallaxIntensity: 0.05,
      flowDirection: 'radial',
    },
    particles: {
      count: 1000,
      size: 2.0,
      opacity: 0.4,
    },
    performance: {
      dpr: [1, 1.5],
      antialias: true,
    },
  },
}

/**
 * Get theme for current page
 */
export function getThemeForPage(pathname: string): BackgroundTheme {
  if (pathname === '/' || pathname === '/nl') return backgroundThemes.home
  if (pathname.includes('/diensten') || pathname.includes('/services'))
    return backgroundThemes.services
  if (pathname.includes('/over') || pathname.includes('/about')) return backgroundThemes.about
  if (pathname.includes('/cases')) return backgroundThemes.cases
  if (pathname.includes('/contact')) return backgroundThemes.contact

  return backgroundThemes.default
}

/**
 * Performance-aware theme selector
 * Reduces particle count and effects on low-end devices
 */
export function getOptimizedTheme(pathname: string): BackgroundTheme {
  const theme = getThemeForPage(pathname)

  // Detect low-end devices (basic heuristic)
  if (typeof window === 'undefined') return theme

  const isLowEnd =
    navigator.hardwareConcurrency <= 4 ||
    /mobile|android/i.test(navigator.userAgent)

  if (!isLowEnd) return theme

  // Reduce particle count by 50% on mobile
  return {
    ...theme,
    particles: {
      ...theme.particles,
      count: Math.floor(theme.particles.count * 0.5),
    },
    performance: {
      ...theme.performance,
      dpr: [1, 1.25], // Lower max DPR
      antialias: false, // Disable AA for performance
    },
  }
}
