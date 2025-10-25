# Audit Findings & Action Plan
**Caribbean Azure Website Redesign**

*Date: 2025-10-22*

---

## Executive Summary

This document outlines findings from comprehensive audits across marketing/positioning, UX/IA, visual/brand, copy, accessibility, performance, and SEO. Each finding includes severity, current state, target state, and action items.

**Overall Health:** 🟡 Good foundation, needs strategic refinement

---

## 1. MARKETING & POSITIONING AUDIT

### Finding 1.1: Value Proposition Clarity
**Severity:** 🔴 High
**Current:** "Automatiseer je routine. Groei sneller." (Generic, lacks specificity)
**Target:** "Automatisering die tijd wint en fouten voorkomt." (Outcome-focused, concrete)

**Issues:**
- Hero doesn't communicate the "why" (time savings, error reduction)
- No quantifiable proof point above the fold
- Missing risk reducer (free intake, no obligation)

**Action:**
- ✅ Update hero title to: "Automatisering die tijd wint en fouten voorkomt."
- ✅ Add sub: "AI-gedreven workflows die e-mails, offertes en taken automatisch laten doorstromen—van inbox tot actie."
- ✅ Add social proof badges above fold (e.g., "Vertrouwd door 50+ MKB bedrijven")
- ✅ Emphasize "Gratis 30-min intake" in CTA

---

### Finding 1.2: Proof Points Need Amplification
**Severity:** 🟡 Medium
**Current:** Outcomes strip shows "-60%", "+25-40%", "-30-50%" (good) but lacks context
**Target:** Pair each metric with a 1-sentence "how" explanation

**Action:**
- ✅ Add hover tooltips or small text under each metric explaining the mechanism
- ✅ Add "binnen 6 weken" timeline qualifier for speed metric

---

### Finding 1.3: Use-Case Specificity
**Severity:** 🟡 Medium
**Current:** Services are listed but not framed as problems → solutions
**Target:** 3 concrete use-cases with before/after workflows

**Action:**
- ✅ Create new "Use-Cases" section after "How it Works"
- ✅ Frame as: Problem → Our Solution → Outcome
- ✅ Examples: "Inbox-to-Action", "Offerte-Generator", "Website-Chat → CRM-Lead"

---

## 2. UX & INFORMATION ARCHITECTURE AUDIT

### Finding 2.1: Too Many Routes (Fragmentation)
**Severity:** 🔴 High
**Current:** 15+ routes including `/blueprint`, `/demo`, `/roi`, `/security`, `/insights`, `/industries`, `/integrations`, `/pricing` (separate from `/diensten`)
**Target:** 5 core pages: `/`, `/diensten`, `/cases`, `/over`, `/contact`

**Issues:**
- Users have too many navigation choices (choice paralysis)
- Content is fragmented (pricing vs diensten, industries vs services)
- SEO is diluted across many thin pages

**Action:**
- ✅ Remove routes: `/blueprint`, `/demo`, `/roi`, `/security`, `/insights`, `/industries`, `/integrations`, `/pricing`
- ✅ Consolidate pricing into `/diensten` (packages section)
- ✅ Move industries content to homepage "Use-Cases" section
- ✅ Move integrations to `/diensten` (tools we connect)
- ✅ Move security to `/over` (trust section)
- ✅ Move insights to external blog or archive (hide nav link)

---

### Finding 2.2: Navigation Overload
**Severity:** 🟡 Medium
**Current:** Header nav has 8 links (Home, Diensten, Cases, Prijzen, Sectoren, Integraties, Security, Insights)
**Target:** 4-5 core links + CTA button

**Action:**
- ✅ Reduce nav to: Home, Diensten, Cases, Over, Contact (CTA button)
- ✅ Move secondary links to footer

---

### Finding 2.3: No Clear Conversion Path
**Severity:** 🔴 High
**Current:** Multiple CTAs compete (demo, blueprint, ROI calculator, intake)
**Target:** ONE primary CTA ("Plan een intake") with 1-2 secondary options

**Action:**
- ✅ Primary CTA: "Plan een gratis intake" (hero, nav, final CTA section)
- ✅ Secondary CTA: "Bekijk cases" (hero only)
- ✅ Remove competing CTAs (demo, blueprint download, ROI calculator)

---

### Finding 2.4: Missing "How it Works" Section
**Severity:** 🟡 Medium
**Current:** "Process" section exists but is buried, uses 3 steps
**Target:** Prominent 3-step visual timeline with clear outcomes

**Action:**
- ✅ Rename "Process" to "Hoe we werken"
- ✅ Add visual icons/numbers for each step
- ✅ Simplify copy: Intake (30 min) → Prototype (72 uur) → Livegang & monitoring

---

## 3. VISUAL & BRAND CONSISTENCY AUDIT

### Finding 3.1: Color Palette Misalignment
**Severity:** 🟡 Medium
**Current:** Uses Radix UI cyan/iris (generic, SaaS-y)
**Target:** Azure navy palette (deep navy, azure blue, amber accent)

**Current Tokens:**
```
--brand: cyan-9 (#00A8E8 area)
--accent: iris-9 (#5B5BD6 area)
```

**Target Tokens:**
```
--brand-900: #0A2A43 (deep azure/navy)
--brand-600: #0F5E9C (primary)
--brand-400: #4BA3F7 (hover/glow)
--accent-amber: #FFB703 (sparingly)
```

**Action:**
- ✅ Update CSS variables in `globals.css`
- ✅ Replace all instances of `--brand` with new palette
- ✅ Ensure 4.5:1 contrast ratio maintained

---

### Finding 3.2: Inconsistent Button Styles
**Severity:** 🟡 Medium
**Current:** Multiple button variants (default, outline, secondary, destructive, ghost, link)
**Target:** ONE primary style (gradient + shadow + glow on hover), ONE outline style

**Action:**
- ✅ Audit Button component (`components/ui/button.tsx`)
- ✅ Simplify to: `primary` (default), `outline`, `ghost` (for nav links only)
- ✅ Remove `secondary`, `destructive` (not needed for marketing site)
- ✅ Add hover effects: scale 1.02, shadow-xl, brand-400 glow

---

### Finding 3.3: Card Style Standardization
**Severity:** 🟡 Medium
**Current:** Cards use different paddings, shadows, radii across sections
**Target:** ONE card style site-wide

**Action:**
- ✅ Standardize: `rounded-2xl` (24px), `shadow-lg`, `p-6` (24px padding)
- ✅ Hover state: `-translate-y-1` (4px lift), `shadow-xl`
- ✅ Optional: 3px gradient stripe at top (brand-600 → brand-400)

---

### Finding 3.4: Typography Hierarchy Needs Refinement
**Severity:** 🟢 Low
**Current:** Mix of Geist Sans (body) and custom headings; generally good
**Target:** Geist/Inter Tight for headings, Inter for body

**Action:**
- ✅ Ensure Geist is loaded and set as `--font-display`
- ✅ Update H1 scale: 48px desktop, 36px mobile (currently 72px, too large)
- ✅ Ensure tracking: H1 -0.02em, H2 -0.01em

---

## 4. COPY & LANGUAGE AUDIT

### Finding 4.1: Bilingual Setup (Must Remove English)
**Severity:** 🔴 High
**Current:** Site supports both Dutch (nl) and English (en) with locale switcher
**Target:** Dutch-only (remove all English routes, strings, and switcher)

**Action:**
- ✅ Remove `/en/*` locale routing
- ✅ Remove language switcher from header
- ✅ Update middleware to redirect any `/en` requests to `/`
- ✅ Delete `messages/en.json` (or archive)
- ✅ Update metadata to Dutch-only (no hreflang tags)

---

### Finding 4.2: Copy Tone Inconsistency
**Severity:** 🟡 Medium
**Current:** Mix of jargon-heavy ("AI-gestuurde workflows") and casual ("Groei sneller")
**Target:** Consistent tone: kort, actief, resultaat-gericht, jij/je-vorm

**Issues:**
- Some sections use passive voice ("wordt gebouwd" → "wij bouwen")
- Some metrics lack context ("60% sneller" → "60% sneller responstijd")
- Some CTAs are vague ("Neem contact op" → "Plan een gratis intake")

**Action:**
- ✅ Audit all copy in `nl.json` for passive voice → active voice
- ✅ Add context to all metrics (tijd/geld/risico)
- ✅ Replace generic CTAs with specific ones ("Plan een intake", "Bekijk cases")

---

### Finding 4.3: Missing Social Proof Copy
**Severity:** 🟡 Medium
**Current:** "Vertrouwd door" section lists company names, but no testimonial quotes on homepage
**Target:** 2-3 testimonial quotes with photo + name + company

**Action:**
- ✅ Add Testimonials section after Cases (or before final CTA)
- ✅ Use existing testimonial data from `cases.detail.*.quote`
- ✅ Format: Quote + Name + Role + Company

---

## 5. ACCESSIBILITY AUDIT

### Finding 5.1: `asChild` Prop Misuse
**Severity:** ✅ RESOLVED (No issues found)
**Current:** Grep search found ZERO instances of `asChild` on native DOM elements
**Target:** N/A

**Verification:**
- ✅ All `asChild` usage is on shadcn Button components (correct usage)
- ✅ No React errors in console related to `asChild`

---

### Finding 5.2: Color Contrast (To Be Verified)
**Severity:** 🟡 Medium
**Current:** Unknown (needs testing with new palette)
**Target:** WCAG 2.1 AA - 4.5:1 for text, 3:1 for UI components

**Action:**
- ✅ Test brand-600 (#0F5E9C) on sand-050 (#F7F7F5) → Expected 6.2:1 ✅
- ✅ Test ink-500 (#6B7280) on sand-050 → Expected 4.7:1 ✅
- ✅ Test brand-400 (#4BA3F7) on sand-050 for hover states → Expected 3.8:1 (use for glow/border only, not text)

---

### Finding 5.3: Focus States
**Severity:** 🟡 Medium
**Current:** Default browser focus (blue outline)
**Target:** Custom focus ring (2px brand-400, visible on all interactive elements)

**Action:**
- ✅ Add global focus styles:
  ```css
  :focus-visible {
    outline: 2px solid var(--brand-400);
    outline-offset: 2px;
    box-shadow: var(--glow-brand);
  }
  ```
- ✅ Test keyboard navigation (tab order, skip links)

---

### Finding 5.4: `prefers-reduced-motion` Support
**Severity:** 🟢 Low
**Current:** Hero3D has reduced-motion fallback (static poster) ✅
**Target:** Extend to ALL Framer Motion animations

**Action:**
- ✅ Wrap all `<motion.*>` with `prefers-reduced-motion` check
- ✅ Use Framer Motion's `useReducedMotion()` hook:
  ```tsx
  const shouldReduceMotion = useReducedMotion()
  const variants = shouldReduceMotion ? { initial: {}, animate: {} } : { ... }
  ```

---

### Finding 5.5: Semantic HTML & Landmarks
**Severity:** 🟢 Low
**Current:** Generally good (`<main>`, `<section>`, `<nav>`, `<footer>`)
**Target:** Ensure all pages have proper landmarks + heading hierarchy

**Action:**
- ✅ Audit all pages for `<main>` wrapper
- ✅ Ensure H1 → H2 → H3 hierarchy (no skips)
- ✅ Add ARIA labels where needed (e.g., mobile menu button)

---

## 6. PERFORMANCE AUDIT

### Finding 6.1: 3D Performance (Needs Optimization)
**Severity:** 🟡 Medium
**Current:** Hero3D uses ~50k vertices, auto-rotate always on
**Target:** 60 fps on mid-tier laptop, pause on tab blur

**Action:**
- ✅ Add `document.visibilityState` listener to pause 3D when tab hidden
- ✅ Cap DPR to 1.25x on mobile (already done ✅)
- ✅ Verify vertex count < 50k (use `console.log(scene.geometry.vertices.length)`)
- ✅ Test on mid-tier device (Intel i5 / Ryzen 5 equivalent)

---

### Finding 6.2: Image Optimization
**Severity:** 🟡 Medium
**Current:** Unknown (need to check if images use next/image, AVIF/WebP)
**Target:** All images via next/image, AVIF primary, WebP fallback, blur placeholders

**Action:**
- ✅ Audit all `<img>` tags → replace with `<Image>` from `next/image`
- ✅ Generate AVIF versions of hero/og images
- ✅ Add `sizes` prop per breakpoint
- ✅ Add blur placeholders (base64 or shimmer)

---

### Finding 6.3: Font Loading
**Severity:** 🟢 Low
**Current:** Fonts loaded via `next/font/google` (good) but unclear if preloaded
**Target:** Preload critical weights (400, 600, 700), self-host

**Action:**
- ✅ Verify fonts are self-hosted (check `next/font/google` config)
- ✅ Preload in layout:
  ```tsx
  <link rel="preload" href="/fonts/geist.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
  ```
- ✅ Use `font-display: swap`

---

### Finding 6.4: Bundle Size (To Be Measured)
**Severity:** 🟡 Medium
**Current:** Unknown
**Target:** Main bundle < 150KB, code-split routes

**Action:**
- ✅ Run `npm run build` and check `.next/static` sizes
- ✅ Use dynamic imports for heavy components (e.g., `Hero3D`)
- ✅ Tree-shake unused Radix UI components

---

## 7. SEO & METADATA AUDIT

### Finding 7.1: Metadata Incomplete
**Severity:** 🟡 Medium
**Current:** Basic metadata exists but not optimized per route
**Target:** Per-route Dutch titles, descriptions (max 160 chars), OG images

**Action:**
- ✅ Update metadata for `/` (homepage):
  - Title: "Caribbean Azure – Automatisering die tijd wint en fouten voorkomt"
  - Description: "AI-gedreven workflows voor MKB. Prototype in 72 uur, 30-60% tijdwinst. Gratis intake—ontdek je snelste winst."
- ✅ Update metadata for `/diensten`, `/cases`, `/over`, `/contact` (see DESIGN_STRATEGY.md)
- ✅ Generate OG images per route (1200x630, brand colors)

---

### Finding 7.2: Structured Data Missing
**Severity:** 🟡 Medium
**Current:** No JSON-LD structured data
**Target:** Organization + Service schemas

**Action:**
- ✅ Add Organization schema to layout (name, logo, url, contact)
- ✅ Add Service schema to `/diensten` page (name, provider, offers)
- ✅ Add FAQPage schema to FAQ section

---

### Finding 7.3: Sitemap & Robots.txt
**Severity:** 🟢 Low
**Current:** `sitemap.ts` and `robots.ts` exist ✅
**Target:** Ensure only Dutch routes included (no `/en/*`)

**Action:**
- ✅ Audit `app/sitemap.ts` to remove English routes
- ✅ Ensure `robots.txt` allows all bots, points to sitemap

---

### Finding 7.4: Canonical URLs & Hreflang
**Severity:** 🔴 High (due to bilingual removal)
**Current:** Hreflang tags point to `/en` and `/nl`
**Target:** Remove hreflang (site is Dutch-only), add canonical to each page

**Action:**
- ✅ Remove `<link rel="alternate" hreflang="en" ...>` from metadata
- ✅ Add `<link rel="canonical" href="https://caribbeanazure.com/" />` to each page

---

## 8. TECHNICAL DEBT & CODE QUALITY

### Finding 8.1: Unused Routes & Components
**Severity:** 🟡 Medium
**Current:** Many routes/components exist that won't be used in minimal IA
**Target:** Clean up unused files

**Action:**
- ✅ Archive (don't delete immediately): `app/[locale]/blueprint/`, `demo/`, `roi/`, `security/`, `insights/`, `industries/`, `integrations/`, `pricing/`
- ✅ Keep structure for potential blog (insights) but hide nav link
- ✅ Document archived routes in README

---

### Finding 8.2: ESLint/Prettier Conformance
**Severity:** 🟢 Low
**Current:** Unknown (assume passing)
**Target:** Zero ESLint errors, Prettier formatted

**Action:**
- ✅ Run `npm run lint` before final commit
- ✅ Run Prettier on all modified files

---

### Finding 8.3: TypeScript Strict Mode
**Severity:** 🟢 Low
**Current:** Unknown
**Target:** `strict: true` in tsconfig.json

**Action:**
- ✅ Verify `tsconfig.json` has `"strict": true"`
- ✅ Fix any type errors introduced by new components

---

## Priority Matrix

| Priority | Severity | Finding | Impact | Effort |
|----------|----------|---------|--------|--------|
| 1 | 🔴 High | Remove English routes/content (4.1) | 🔥 Critical | 🟢 Low |
| 2 | 🔴 High | Consolidate IA to 5 pages (2.1) | 🔥 Critical | 🟡 Medium |
| 3 | 🔴 High | Update value prop (1.1) | 🔥 Critical | 🟢 Low |
| 4 | 🔴 High | Simplify conversion path (2.3) | 🔥 Critical | 🟢 Low |
| 5 | 🔴 High | Remove hreflang, add canonical (7.4) | 🔥 Critical | 🟢 Low |
| 6 | 🟡 Medium | Update color palette (3.1) | High | 🟡 Medium |
| 7 | 🟡 Medium | Add use-cases section (1.3) | High | 🟡 Medium |
| 8 | 🟡 Medium | Standardize button/card styles (3.2, 3.3) | Medium | 🟡 Medium |
| 9 | 🟡 Medium | Add testimonials section (4.3) | Medium | 🟢 Low |
| 10 | 🟡 Medium | Add structured data (7.2) | Medium | 🟢 Low |
| 11 | 🟡 Medium | Optimize 3D performance (6.1) | Medium | 🟡 Medium |
| 12 | 🟢 Low | Update metadata per route (7.1) | Low | 🟢 Low |
| 13 | 🟢 Low | Improve focus states (5.3) | Low | 🟢 Low |
| 14 | 🟢 Low | Extend reduced-motion support (5.4) | Low | 🟢 Low |

---

## Success Metrics (Post-Implementation)

### Qualitative
- [ ] All copy is Dutch-only, no English remnants
- [ ] Clear conversion path with ONE primary CTA
- [ ] Cohesive brand (consistent colors, spacing, shadows)
- [ ] Premium feel (subtle 3D, smooth micro-interactions)

### Quantitative
- [ ] Lighthouse Performance ≥ 95
- [ ] Lighthouse Accessibility ≥ 95
- [ ] Lighthouse SEO ≥ 95
- [ ] LCP < 2.5s on mid-tier laptop
- [ ] CLS < 0.05
- [ ] 3D scene: 60 fps stable (measured with Chrome DevTools)

---

**Next Steps:** Proceed with implementation per priority matrix above.
