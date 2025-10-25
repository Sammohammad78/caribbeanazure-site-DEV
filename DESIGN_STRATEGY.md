# Design & Strategy Document
**Caribbean Azure – Premium Dutch Automation Agency**

*Document Version: 1.0*
*Date: 2025-10-22*

---

## 1. POSITIONERING (NL)

### Value Proposition
**"Automatisering die tijd wint en fouten voorkomt."**

Caribbean Azure bouwt AI-gedreven workflows die bedrijfsprocessen van inbox tot actie laten doorstromen—zonder handmatig kopiëren, zonder vertraging, zonder fouten.

### 3 Kern Bewijspunten

1. **Snelheid: Prototype in 72 uur**
   - Geen weken plannen: binnen 3 werkdagen een werkend prototype
   - Gemiddeld <24 uur implementatie voor standaard workflows
   - Live dashboards tonen real-time SLA's en doorlooptijd

2. **Meetbare Impact: 30-60% tijdwinst**
   - Klanten besparen gemiddeld 30-60% doorlooptijd op repetitieve processen
   - Foutreductie van 85%+ door geautomatiseerde validatie
   - ROI binnen 4-8 weken door directe efficiency gains

3. **Plug & Play Integraties**
   - Out-of-the-box koppelingen met Gmail, Outlook, Teams, ClickUp, WhatsApp, CRM's
   - Geen maandenlange IT-projecten: bestaande tools blijven gewoon werken
   - API-first architectuur voor custom integraties

### 3 Koper Bezwaren + Counters

| Bezwaar | Counter |
|---------|---------|
| **"Te complex voor ons."** | Gratis intake-scan laat binnen 30 min zien welke quick wins haalbaar zijn. Start met 1 simpel proces (bijv. inbox → taak) om direct waarde te zien. |
| **"Te duur voor MKB."** | Starter-pakket vanaf €1.497/maand—minder dan 1 FTE-dag per week. Gemiddelde klant verdient investering terug in <2 maanden. Geen lock-in: maandelijks opzegbaar. |
| **"Wat als het kapot gaat?"** | 99,5% uptime SLA. Real-time monitoring + alerting. Fallback-scenario's standaard (bijv. handmatige route als API down). Support binnen 4 uur (Pro/Enterprise). |

### 3 Core Use-Cases

1. **Inbox-to-Action Automatisering**
   - Inkomende e-mails (offerteaanvragen, supporttickets) → automatisch naar ClickUp/Teams/WhatsApp
   - NLP-filtering: urgentie, categorie, toewijzing
   - Voorbeeld: "Alle mails met 'offerte' in onderwerp → task met prio high + tag Sales"

2. **Offerte-Generator voor MKB**
   - Template-based offertes met klantgegevens uit CRM
   - Goedkeuringsflow (directeur review) + automatische verzending
   - Voorbeeld: Salesteam vult simpel formulier → PDF offerte binnen 5 min in klant inbox

3. **Website-Chat → CRM-Lead met Validatie**
   - AI-chatbot op website beantwoordt FAQ's + kwalificeert leads
   - Bij "demo aanvragen" → automatisch in CRM + kalenderlink
   - Voorbeeld: Bezoeker vraagt "Werkt dit met Exact?" → Bot antwoordt + maakt hot lead aan als interesse hoog

---

## 2. INFORMATIE-ARCHITECTUUR (IA) & LAYOUT PATTERNS

### Site Structure (Minimalistisch, High-Signal)

```
/                    → Home (Hero, Offer, How it Works, Use-Cases, Cases, Testimonials, CTA)
/diensten            → 3 Pakketten (Starter, Pro, Enterprise) + deliverables + CTA
/cases               → 2-4 Case Studies met KPI's (voor/na)
/over                → Waarom wij, methodiek, klein team
/contact             → Formulier + WhatsApp + kalenderlink
```

**Verwijderd/Geconsolideerd:**
- `/pricing` → samengevoegd in `/diensten`
- `/industries`, `/integrations`, `/blueprint`, `/demo`, `/roi`, `/security`, `/insights` → content samengevoegd in relevante pagina's of verwijderd
- **Alle Engelse routes** (`/en/*`, `/services`, `/about`, etc.) → volledig verwijderd

### Layout Pattern: F-Pattern met Visuele Hiërarchie

**Homepage Flow:**
1. **Hero (Above-the-fold):**
   - Kop (H1): Value prop in <10 woorden
   - Sub: Concreet resultaat (tijd/geld/risico)
   - Primary CTA ("Plan een intake") + Secondary CTA ("Bekijk cases")
   - Social proof badges (klantlogo's of "Trusted by 50+ MKB bedrijven")

2. **Outcomes Strip:**
   - 3 KPI's in grote cijfers (bijv. "60% sneller", "€12K bespaard/jaar", "99,5% uptime")
   - Visuele iconen + 1-zin uitleg

3. **How it Works (3 Stappen):**
   - Visuele tijdlijn of genummerde kaarten
   - Stap 1: Intake & proces-scan (30 min) → Stap 2: Prototype (72 uur) → Stap 3: Livegang & monitoring

4. **Use-Cases (3 Scenario's):**
   - Kaarten met concrete workflow-voorbeeld
   - Icoon + titel + 2-3 bullets + "Lees case" link

5. **Cases (2-4 Succesverhalen):**
   - Klant logo + quote + KPI (bijv. "Van 4 dagen naar 1 dag goedkeuringsproces")
   - Link naar `/cases/[slug]` voor detail

6. **Testimonials:**
   - Carrousel of grid met foto + naam + functie + bedrijf
   - 2-3 zinnen max per testimonial

7. **Final CTA:**
   - Groot, contrastrijk blok
   - "Gratis 30-min intake—ontdek je snelste winst."
   - Button + WhatsApp fallback

**Conversie-psychologie:**
- **Primacy effect:** Sterkste proof bovenaan (Hero social proof + Outcomes cijfers)
- **Risk reversal:** "Gratis intake", "Geen verplichtingen", "Maandelijks opzegbaar"
- **Scarcity (subtiel):** "72-uur prototype" impliceert snelheid/urgentie
- **Social proof:** Klantlogo's, testimonials, case study cijfers
- **Clear path:** Eén primaire actie ("Plan een intake") persistent in nav + CTA secties

---

## 3. BRAND PALETTE & TYPE SYSTEM

### Kleuren (Final Tokens)

| Token | Hex | Gebruik |
|-------|-----|---------|
| **brand-900** | `#0A2A43` | Deep azure/navy – headers, dark backgrounds, footers |
| **brand-600** | `#0F5E9C` | Primary brand – buttons, links, primary accents |
| **brand-400** | `#4BA3F7` | Hover states, glows, chart accents, focus rings |
| **sand-050** | `#F7F7F5` | Page backgrounds, light sections (warm neutral) |
| **ink-900** | `#0E0F14` | Body text, headings (near-black, not pure) |
| **accent-amber** | `#FFB703` | Highlights, badges, "new" labels (sparingly) |

**Extended Palette (for states):**
- **success-green:** `#10B981` (success states, "Live" badges)
- **error-red:** `#EF4444` (error states, form validation)
- **muted-gray:** `#6B7280` (secondary text, disabled states)

**Gradient Mixes:**
- **Primary gradient:** `brand-600` → `brand-400` (45deg linear)
- **Hero glow:** Radial blend of `brand-400` (50% opacity) + `accent-amber` (20% opacity)

### Typografie

**Font Stack:**
- **Headings:** `"Geist", "Inter Tight", system-ui, sans-serif`
- **Body/UI:** `"Inter", system-ui, -apple-system, sans-serif`

**Type Scale:**

| Element | Desktop | Mobile | Line-Height | Weight |
|---------|---------|--------|-------------|--------|
| **H1** | 48px (3rem) | 36px (2.25rem) | 1.1 | 700 (Bold) |
| **H2** | 32px (2rem) | 28px (1.75rem) | 1.2 | 700 |
| **H3** | 24px (1.5rem) | 22px (1.375rem) | 1.3 | 600 (Semibold) |
| **Body** | 16px (1rem) | 16px | 1.625 | 400 (Regular) |
| **Small** | 14px (0.875rem) | 14px | 1.5 | 400 |
| **Caption** | 12px (0.75rem) | 12px | 1.4 | 500 (Medium) |

**Font Loading:**
- Self-hosted via `next/font/google`
- Preload weights: 400, 500, 600, 700
- `font-display: swap` voor snelle rendering

---

## 4. TONE OF VOICE (NL)

**Kenmerken:**
- **Kort & actief:** Vermijd passief ("wordt gedaan") → gebruik actief ("wij bouwen")
- **Resultaat-gericht:** Focus op outcome ("bespaart 60% tijd") ipv feature ("heeft een AI")
- **Jij/je-vorm:** Directe aanspraak, persoonlijk
- **Jargon alleen waar nuttig:** "API", "workflow", "automation" zijn OK; vermijd "synergize", "revolutionize"
- **Concreet > Vaag:** "72 uur" ipv "snel"; "€1.497/maand" ipv "betaalbaar"

**Voorbeelden:**

| ❌ Vermijd | ✅ Gebruik |
|-----------|-----------|
| "Onze oplossing biedt een revolutionaire benadering voor procesoptimalisatie." | "Wij automatiseren je workflows in 72 uur." |
| "Klanten ervaren significante efficiëntieverbeteringen." | "Klanten besparen 30-60% tijd op repetitieve taken." |
| "Neem contact met ons op voor meer informatie." | "Plan een gratis intake—ontdek je snelste winst." |

---

## 5. CONVERSION PSYCHOLOGY

### Primaire Conversie-doel
**"Plan een intake" (Calendly/WhatsApp/formulier)**

### Secundaire Doelen
1. "Bekijk cases" (proof/social proof)
2. "Download ROI-calculator" (lead magnet, optioneel)

### Psychologische Triggers

1. **Authority:**
   - "Trusted by 50+ MKB bedrijven"
   - Klantlogo's van bekende merken (indien beschikbaar)
   - "Specialists in AI-gedreven automatisering"

2. **Social Proof:**
   - Testimonials met foto + naam + bedrijf
   - Case study cijfers ("60% sneller", "€12K bespaard")
   - "★★★★★ 4.9/5 uit 43 reviews" (indien beschikbaar)

3. **Risk Reduction:**
   - "Gratis 30-min intake—geen verplichtingen"
   - "Maandelijks opzegbaar" (Starter pakket)
   - "99,5% uptime SLA" (betrouwbaarheid)

4. **Urgency (subtiel):**
   - "Prototype in 72 uur" (snelheid als USP, niet fake countdown)
   - "Nog 3 plekken deze maand voor intake" (optioneel, alleen als waar)

5. **Clarity:**
   - Eén primaire CTA per sectie (geen keuze-overload)
   - Duidelijke waarde-prop boven de fold
   - Scanbare secties met visuele hiërarchie

### CTA-strategie

**Primaire CTA ("Plan een intake"):**
- **Locaties:** Hero (2x), How it Works sectie, Final CTA, Sticky nav
- **Styling:** Primaire button (brand gradient, shadow, glow on hover)
- **Microcopy variaties:**
  - Hero: "Plan een gratis intake"
  - How it Works: "Start met stap 1: Plan intake"
  - Final CTA: "Gratis 30-min intake—ontdek je snelste winst"

**Secundaire CTA's:**
- "Bekijk cases" (outline button, minder prominent)
- "Lees meer" (text link, inline)
- "WhatsApp ons" (floating button, rechtsonder, mobiel-first)

---

## 6. ACCESSIBILITY & PERFORMANCE TARGETS

### Lighthouse Targets
- **Performance:** ≥ 95
- **Accessibility:** ≥ 95
- **Best Practices:** ≥ 95
- **SEO:** ≥ 95

### Core Web Vitals
- **LCP (Largest Contentful Paint):** < 2.5s (mid-tier laptop)
- **CLS (Cumulative Layout Shift):** < 0.05
- **FID (First Input Delay):** < 100ms

### Accessibility (WCAG 2.1 AA)
- ✅ Color contrast ≥ 4.5:1 (text) / 3:1 (UI components)
- ✅ Focus states visible (2px outline, brand-400)
- ✅ Keyboard navigation (tab order, skip links)
- ✅ Semantic HTML (landmarks, headings hierarchy)
- ✅ Form labels + error messages (ARIA)
- ✅ Alt text for images
- ✅ `prefers-reduced-motion` support (3D → static gradient)

### Performance Tactics
1. **Images:** Next/Image, AVIF/WebP, `sizes` per breakpoint, blur placeholders
2. **Fonts:** Self-hosted, preload critical weights, subset to Latin
3. **3D:** Code-split, lazy-load, pause on tab blur, reduced-motion fallback
4. **CSS:** Critical CSS inline, defer non-critical
5. **JS:** Bundle size < 150KB (main), code-split routes
6. **Analytics:** Lightweight (Plausible or Vercel Analytics)

---

## 7. SEO & METADATA STRATEGY

### Per-Route Metadata (Dutch)

| Route | Title | Description |
|-------|-------|-------------|
| `/` | "Caribbean Azure – Automatisering die tijd wint en fouten voorkomt" | "AI-gedreven workflows voor MKB. Prototype in 72 uur, 30-60% tijdwinst. Gratis intake—ontdek je snelste winst." (max 160 chars) |
| `/diensten` | "Diensten & Pakketten – Caribbean Azure" | "Kies uit Starter, Pro of Enterprise. Vanaf €1.497/maand. Inbox-to-action, offerte-generator, website-chat automatisering." |
| `/cases` | "Cases & Succesverhalen – Caribbean Azure" | "Ontdek hoe MKB-bedrijven 30-60% tijd besparen met onze automatiseringsworkflows. Concrete KPI's en voor/na resultaten." |
| `/over` | "Over Caribbean Azure – Waarom wij" | "Specialists in AI-gedreven automatisering voor het MKB. 72-uur prototypes, plug & play integraties, 99,5% uptime." |
| `/contact` | "Contact & Gratis Intake – Caribbean Azure" | "Plan een gratis 30-min intake. WhatsApp, telefoon of formulier—ontdek binnen 30 min je snelste automatiseringswinst." |

### Structured Data (JSON-LD)

**Organization Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Caribbean Azure",
  "url": "https://caribbeanazure.com",
  "logo": "https://caribbeanazure.com/logo.png",
  "description": "AI-gedreven workflows en automatisering voor het MKB",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "NL"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Sales",
    "availableLanguage": "Dutch"
  }
}
```

**Service Schema (per dienst):**
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Inbox-to-Action Automatisering",
  "provider": { "@type": "Organization", "name": "Caribbean Azure" },
  "description": "Automatische taakverwerking vanuit e-mail naar projectmanagement tools",
  "areaServed": "NL",
  "offers": {
    "@type": "Offer",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "price": "1497",
      "priceCurrency": "EUR"
    }
  }
}
```

---

## 8. MOTION & INTERACTION PRINCIPLES

### Motion Philosophy
**"Subtle & Purposeful"**
- Motion should **guide attention** (not distract)
- Respect `prefers-reduced-motion` (fallback to static or fade-only)
- 60 fps budget (pause expensive animations off-screen)

### Animation Types

1. **Micro-interactions (Framer Motion):**
   - Button hover: scale 1.02, glow shadow (150ms ease-out)
   - Card hover: translate Y -4px, shadow-strong (200ms ease-out)
   - Focus ring: 2px outline fade-in (100ms)

2. **Section Reveals (Scroll-triggered):**
   - Fade-in + Y-translate (20-30px up)
   - Stagger children (100ms delay each)
   - Threshold: `once: true` (no re-trigger on scroll up)

3. **3D Background (React Three Fiber):**
   - Slow auto-rotation (0.4 speed)
   - Parallax on scroll (max 8-12px Y-shift)
   - Pause on tab blur (performance)
   - Reduced-motion: static CSS gradient fallback

### Easing Curves
- **Default:** `cubic-bezier(0.33, 1, 0.68, 1)` (ease-out)
- **Bounce (sparingly):** `spring(1, 80, 10, 0)` (Framer Motion spring)
- **Transitions:** 150ms (micro), 200ms (standard), 300ms (slow)

---

## 9. COMPONENT DESIGN SYSTEM

### Core Components (to be built/refined)

| Component | Variants | Usage |
|-----------|----------|-------|
| **Button** | `primary`, `outline`, `ghost`, `link` | CTAs, nav links |
| **Card** | `default`, `hover-lift`, `gradient-stripe` | Services, cases, use-cases |
| **Badge** | `default`, `success`, `warning` | "New", "Beta", "Populair" labels |
| **Section** | N/A | Wrapper with padding, max-width, margin |
| **Container** | `sm`, `md`, `lg`, `xl`, `2xl` | Max-width wrappers |

### Spacing Scale (4px Polaris grid)
- `space-1` = 4px
- `space-2` = 8px
- `space-3` = 12px
- `space-4` = 16px (default card padding)
- `space-6` = 24px (card gap)
- `space-10` = 40px (section padding mobile)
- `space-16` = 64px (section padding desktop)

### Border Radius
- **Small:** `8px` (badges, inputs)
- **Medium:** `12px` (buttons)
- **Large:** `16px` (cards)
- **XL:** `24px` (hero sections, large cards)

### Shadows
- **sm:** `0 1px 2px rgba(10, 42, 67, 0.05)`
- **md:** `0 4px 6px rgba(10, 42, 67, 0.07)`
- **lg:** `0 10px 15px rgba(10, 42, 67, 0.1)`
- **xl:** `0 20px 25px rgba(10, 42, 67, 0.15)` (hover states)

---

## 10. IMPLEMENTATION PRIORITIES

### Phase 1: Audit & Cleanup (Critical)
1. ✅ Remove all English routes, components, and strings
2. ✅ Consolidate IA to 5 core pages (/, /diensten, /cases, /over, /contact)
3. ✅ Audit and fix `asChild` prop misuse
4. ✅ Update metadata to Dutch-only

### Phase 2: Visual & Brand Refinement
1. ✅ Update color tokens to new brand palette (brand-900, brand-600, brand-400, etc.)
2. ✅ Ensure typography scale consistency (Geist headings, Inter body)
3. ✅ Standardize button/card styles (one primary style site-wide)
4. ✅ Add micro-interactions (hover, focus, transition)

### Phase 3: Content & Copy
1. ✅ Update Hero with new value prop + CTAs
2. ✅ Add "How it Works" 3-step section
3. ✅ Add Use-Cases section (3 scenarios)
4. ✅ Refine Cases with KPI's (voor/na)
5. ✅ Add Testimonials section

### Phase 4: Performance & A11y
1. ✅ Optimize 3D background (60 fps, reduced-motion fallback)
2. ✅ Image optimization (AVIF/WebP, blur placeholders)
3. ✅ Lighthouse audit + fixes (target ≥95)
4. ✅ Accessibility audit (WCAG 2.1 AA)

### Phase 5: SEO & Metadata
1. ✅ Add structured data (Organization + Service)
2. ✅ Update sitemap.xml (Dutch-only routes)
3. ✅ Add robots.txt
4. ✅ Per-route metadata (titles, descriptions, OG images)

---

## 11. SUCCESS METRICS

### Qualitative
- ✅ Cohesive brand (consistent colors, typography, spacing)
- ✅ Clear conversion path (visible CTAs, no dead-ends)
- ✅ Premium feel (subtle 3D, smooth micro-interactions)
- ✅ Dutch-only (no English remnants)

### Quantitative
- ✅ Lighthouse Performance ≥ 95
- ✅ Lighthouse Accessibility ≥ 95
- ✅ Lighthouse SEO ≥ 95
- ✅ LCP < 2.5s on mid-tier laptop
- ✅ CLS < 0.05
- ✅ No console errors (incl. `asChild` warnings)
- ✅ 3D scene: 60 fps stable

### Conversion (Post-Launch)
- Track "Plan een intake" clicks (primary CTA)
- Track "Bekijk cases" clicks (secondary)
- Track form submissions (contact page)
- A/B test CTA microcopy (optional)

---

## 12. HANDOVER NOTES (for client)

### How to Edit Content
1. **Dutch copy:** Edit `/messages/nl.json` (structured JSON)
2. **Add a case:** Add entry in `nl.json` under `cases.items[]` + create `/cases/[slug]` page
3. **Tweak 3D:** Adjust params in `/components/3d/Hero3D.tsx` (orb size, rotation speed, colors)
4. **Change colors:** Update CSS variables in `/app/globals.css` (`:root` block)
5. **Add testimonial:** Add entry in `nl.json` under `testimonials.items[]`

### Technical Stack Summary
- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4, shadcn/ui, CSS variables
- **3D:** React Three Fiber + Drei + Postprocessing
- **Animation:** Framer Motion
- **i18n:** next-intl (Dutch-only after redesign)
- **Deployment:** Vercel (recommended), supports automatic previews + edge functions

---

**End of Strategy Document**

*This document serves as the foundation for all design and development decisions. Any deviations should be documented and approved.*
