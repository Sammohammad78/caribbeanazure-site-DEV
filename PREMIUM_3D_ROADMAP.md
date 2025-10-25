# Premium 3D Implementation Roadmap

This document outlines the remaining work to transform Caribbean Azure into a world-class, conversion-focused website with tasteful, performant 3D using React Three Fiber.

## Current Status ✅

- [x] Next.js 14+ with App Router + TypeScript
- [x] Tailwind CSS v4 + shadcn/ui
- [x] next-intl configured (Dutch at `/`, English at `/en`)
- [x] Message files with conversion-focused copy
- [x] R3F + drei dependencies installed
- [x] MDX dependencies installed
- [x] Cookie consent dependencies installed
- [x] Basic components (Header, Footer, etc.)

## Phase 1: Core 3D Implementation 🎨

### A) Hero3D - "Automation Orb" Component

**File:** `components/3d/Hero3D.tsx`

```tsx
'use client'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { useMediaQuery } from '@/hooks/use-media-query'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

// Lazy load 3D with no SSR
const AutomationOrb = dynamic(() => import('./AutomationOrb'), {
  ssr: false,
  loading: () => <HeroFallback />
})

export function Hero3D() {
  const prefersReducedMotion = useReducedMotion()
  const isLowEnd = useMediaQuery('(max-width: 768px)')

  if (prefersReducedMotion || isLowEnd) {
    return <HeroFallback />
  }

  return (
    <Suspense fallback={<HeroFallback />}>
      <AutomationOrb />
    </Suspense>
  )
}

function HeroFallback() {
  return (
    <div className="relative h-[60vh] bg-gradient-to-br from-primary/5 to-accent/5">
      {/* Static poster image or WebM loop */}
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src="/3d/hero-fallback.webm" type="video/webm" />
        <source src="/3d/hero-fallback.mp4" type="video/mp4" />
      </video>
    </div>
  )
}
```

**AutomationOrb Specs:**
- Minimal, elegant 3D orb with connected nodes and flowing particles
- GLB model: `public/3d/automation_orb.glb` (draco + KTX2 textures)
- Gentle orbit on mouse with `@react-spring/three`
- Subtle postprocessing (Bloom, ToneMapping) if budget allows
- Cap DPR on mobile: `gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))`
- Instanced particles for performance

### B) ScrollStory3D - "From Inbox to Action"

**File:** `components/3d/ScrollStory3D.tsx`

Scroll-driven 3D diagram showing:
1. Email node → AI agent → task systems → WhatsApp follow-ups
2. Use `<ScrollControls>` from drei
3. Staged sections highlighting ROI levers
4. Low draw calls with instancing

### C) 3D Case Tiles

**File:** `components/sections/CaseTiles3D.tsx`

- Tilting cards that react to cursor
- Reveal KPIs (before/after) on hover
- Disable tilt if reduced-motion
- Use `drei` helpers: `<PresentationControls>`

## Phase 2: Content System 📝

### MDX Setup for Case Studies

**Structure:**
```
/content/
  nl/
    cases/
      inbox-to-action.mdx
      whatsapp-intake.mdx
      support-bot.mdx
  en/
    cases/
      inbox-to-action.mdx
      whatsapp-intake.mdx
      support-bot.mdx
```

**Front-matter Schema (Zod):**
```typescript
import { z } from 'zod'

export const caseSchema = z.object({
  title: z.string(),
  summary: z.string(),
  sector: z.string(),
  stack: z.array(z.string()),
  problem: z.string(),
  solution: z.string(),
  kpis: z.array(z.object({
    name: z.string(),
    before: z.string(),
    after: z.string(),
    unit: z.string()
  })),
  durationWeeks: z.number(),
  services: z.array(z.string()),
  heroImage: z.string(),
})
```

**3 Seed Cases:**
1. **Inbox-to-Action**: E-commerce company, Gmail → ClickUp, 60% faster response
2. **WhatsApp Intake**: Consultancy, WhatsApp → CRM, +40% qualified leads
3. **Support Bot**: SaaS, AI agent, -50% support tickets

## Phase 3: Cookie Consent & Privacy 🍪

### EU-Compliant Cookie Banner

**File:** `components/cookie-consent.tsx`

```tsx
'use client'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useTranslations } from 'next-intl'

export function CookieConsent() {
  const t = useTranslations('cookie')
  const [show, setShow] = useState(false)
  const [mode, setMode] = useState<'banner' | 'settings'>('banner')

  useEffect(() => {
    const consent = Cookies.get('cookie-consent')
    if (!consent) setShow(true)
  }, [])

  const handleAccept = () => {
    Cookies.set('cookie-consent', 'accepted', { expires: 365 })
    setShow(false)
    // Initialize analytics
    initAnalytics()
  }

  const handleReject = () => {
    Cookies.set('cookie-consent', 'rejected', { expires: 365 })
    setShow(false)
  }

  // ... implementation
}
```

**Features:**
- Accept / Reject / Settings (parity, no cookie walls)
- Block analytics until consent
- Easy withdrawal from footer
- Store choices in cookie

## Phase 4: SEO & Structured Data 🔍

### Hreflang Tags

**File:** `app/[locale]/layout.tsx`

```tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    title: t('hero.h1'),
    description: t('hero.sub'),
    alternates: {
      canonical: locale === 'nl' ? '/' : '/en',
      languages: {
        'nl': '/',
        'en': '/en',
        'x-default': '/',
      },
    },
    openGraph: {
      locale: locale === 'nl' ? 'nl_NL' : 'en_US',
      type: 'website',
      // ...
    },
  }
}
```

### JSON-LD Schema

**File:** `components/structured-data.tsx`

```tsx
export function LocalBusinessSchema({ locale }: { locale: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Caribbean Azure",
    "description": locale === 'nl'
      ? "AI-automatisering voor Nederlandse bedrijven"
      : "AI automation for Dutch businesses",
    "inLanguage": locale,
    "areaServed": "NL",
    "sameAs": [
      "https://linkedin.com/company/caribbeanazure"
    ],
    // ...
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

## Phase 5: Performance Optimization ⚡

### Budgets & Targets

**Core Web Vitals (P75):**
- LCP ≤ 2.5s
- INP ≤ 200ms
- CLS ≤ 0.1

**Bundle Size:**
- Home route JS < 150KB (gzipped) excluding Next runtime
- 3D JS lazy-loaded after first paint

### 3D Asset Pipeline

**Add to `package.json`:**
```json
{
  "scripts": {
    "gltf:pack": "gltfpack -i assets/src/*.glb -o public/3d/automation_orb.glb -cc -tc -km -kn",
    "ktx2": "npx @gltf-transform/cli uastc assets/src/*.glb -o public/3d/ --slots"
  }
}
```

**Optimization Checklist:**
- [x] Use `next/image` everywhere with priority for hero
- [ ] Preconnect to fonts
- [ ] Cap DPR on mobile for R3F
- [ ] Instance particles and edges
- [ ] Avoid large shaders
- [ ] Use draco + KTX2 compression

### Device Capability Check

**File:** `lib/device-capability.ts`

```typescript
export function getDeviceCapability() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent)
  const hasWebGL = (() => {
    try {
      const canvas = document.createElement('canvas')
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    } catch(e) {
      return false
    }
  })()

  // Check for low-end mobile
  const isLowEnd = isMobile && (
    navigator.hardwareConcurrency <= 4 ||
    navigator.deviceMemory <= 4
  )

  return {
    isMobile,
    hasWebGL,
    isLowEnd,
    shouldRender3D: hasWebGL && !isLowEnd
  }
}
```

## Phase 6: Testing Infrastructure 🧪

### Playwright E2E Tests

**File:** `e2e/i18n.spec.ts`

```typescript
import { test, expect } from '@playwright/test'

test.describe('Internationalization', () => {
  test('Default load is Dutch at /', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveURL('/')
    await expect(page.locator('html')).toHaveAttribute('lang', 'nl')
    await expect(page.locator('h1')).toContainText('Automatiseer je routine')
  })

  test('English variant at /en', async ({ page }) => {
    await page.goto('/en')
    await expect(page).toHaveURL('/en')
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page.locator('h1')).toContainText('Automate the routine')
  })

  test('Language switcher persists choice', async ({ page, context }) => {
    await page.goto('/')
    await page.click('[data-testid="lang-switcher"]')
    await expect(page).toHaveURL('/en')

    // Check cookie
    const cookies = await context.cookies()
    const localeCookie = cookies.find(c => c.name === 'NEXT_LOCALE')
    expect(localeCookie?.value).toBe('en')
  })

  test('hreflang tags present and correct', async ({ page }) => {
    await page.goto('/')
    const nlLink = page.locator('link[rel="alternate"][hreflang="nl"]')
    const enLink = page.locator('link[rel="alternate"][hreflang="en"]')
    const defaultLink = page.locator('link[rel="alternate"][hreflang="x-default"]')

    await expect(nlLink).toHaveAttribute('href', '/')
    await expect(enLink).toHaveAttribute('href', '/en')
    await expect(defaultLink).toHaveAttribute('href', '/')
  })
})
```

**File:** `e2e/cookie-consent.spec.ts`

```typescript
test.describe('Cookie Consent', () => {
  test('Banner blocks analytics before consent', async ({ page }) => {
    await page.goto('/')

    // Check banner is visible
    await expect(page.locator('[data-testid="cookie-banner"]')).toBeVisible()

    // Check analytics script not loaded
    const analyticsScript = page.locator('script[src*="plausible"]')
    await expect(analyticsScript).toHaveCount(0)
  })

  test('Accept loads analytics', async ({ page }) => {
    await page.goto('/')
    await page.click('[data-testid="cookie-accept"]')

    // Wait for analytics to load
    await page.waitForTimeout(1000)
    const analyticsScript = page.locator('script[src*="plausible"]')
    await expect(analyticsScript).toHaveCount(1)
  })

  test('Reject does not load analytics', async ({ page }) => {
    await page.goto('/')
    await page.click('[data-testid="cookie-reject"]')

    const analyticsScript = page.locator('script[src*="plausible"]')
    await expect(analyticsScript).toHaveCount(0)
  })
})
```

**File:** `e2e/reduced-motion.spec.ts`

```typescript
test.describe('Reduced Motion', () => {
  test('3D components render static fallback', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')

    // Hero should show fallback video, not canvas
    const canvas = page.locator('canvas')
    await expect(canvas).toHaveCount(0)

    const fallback = page.locator('video')
    await expect(fallback).toBeVisible()
  })
})
```

### Lighthouse CI

**File:** `.github/workflows/lighthouse.yml`

```yaml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            http://localhost:3000
            http://localhost:3000/en
          uploadArtifacts: true
          temporaryPublicStorage: true
          runs: 3
```

**Lighthouse Budget:**
```json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "performance": ["warn", { "minScore": 0.9 }],
        "accessibility": ["error", { "minScore": 0.9 }],
        "best-practices": ["warn", { "minScore": 0.9 }],
        "seo": ["error", { "minScore": 0.9 }],
        "first-contentful-paint": ["warn", { "maxNumericValue": 2000 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "max-potential-fid": ["warn", { "maxNumericValue": 200 }]
      }
    }
  }
}
```

## Phase 7: Contact Form with Resend

**File:** `app/api/contact/route.ts`

Update to use Resend:

```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = contactSchema.parse(body)

    await resend.emails.send({
      from: 'Caribbean Azure <noreply@caribbeanazur.nl>',
      to: process.env.CONTACT_TO || 'info@caribbeanazur.nl',
      subject: `New Contact from ${data.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    // ... error handling
  }
}
```

## Phase 8: Environment Variables

**File:** `.env.example`

```env
# Required
BOOKING_URL=https://cal.com/your-link
CONTACT_TO=info@caribbeanazur.nl
RESEND_API_KEY=re_xxxxx

# Optional
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=caribbeanazur.nl
```

## Implementation Priority

1. **Critical (Week 1):**
   - [ ] Fix routing to properly use / for NL, /en for EN
   - [ ] Build Hero3D with fallbacks
   - [ ] Implement cookie consent
   - [ ] Add hreflang tags

2. **High (Week 2):**
   - [ ] Build ScrollStory3D
   - [ ] Set up MDX content system
   - [ ] Create 3 case studies
   - [ ] Optimize 3D assets

3. **Medium (Week 3):**
   - [ ] Write Playwright tests
   - [ ] Configure Lighthouse CI
   - [ ] Performance optimizations
   - [ ] Add JSON-LD schema

4. **Polish (Week 4):**
   - [ ] 3D case tiles
   - [ ] Advanced animations
   - [ ] A/B testing setup
   - [ ] Documentation

## Definition of Done ✓

- [ ] Default Dutch at /, English at /en with correct hreflang
- [ ] 3D is elegant, performant, with fallbacks for reduced-motion
- [ ] Core Web Vitals thresholds met (LCP ≤2.5s, INP ≤200ms, CLS ≤0.1)
- [ ] Lighthouse mobile ≥90 on all categories
- [ ] Cookie consent compliant (no walls)
- [ ] All Playwright tests passing
- [ ] README with content editing guide
- [ ] Vercel preview URL live

## Resources

- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [drei Helpers](https://github.com/pmndrs/drei)
- [next-intl Docs](https://next-intl-docs.vercel.app/)
- [Playwright Docs](https://playwright.dev/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

---

**Note:** This roadmap represents ~80-120 hours of senior full-stack + creative tech work. The current codebase has the foundation; this document guides the premium 3D implementation.
