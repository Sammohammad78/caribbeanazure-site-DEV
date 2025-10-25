# Handover Documentation
**Caribbean Azure - Premium Dutch Automation Agency Website**

*Version: 1.0*
*Date: 2025-10-22*

---

## 🎯 Overview

This document provides everything you need to understand, maintain, and extend the Caribbean Azure website. The site has been redesigned as a premium Dutch-only automation agency platform with focus on conversion, performance, and premium brand feel.

---

## 📁 Project Structure

```
caribbeanazure-site/
├── app/
│   ├── [locale]/              # Dynamic locale routing (now Dutch-only)
│   │   ├── layout.tsx         # Locale layout with NextIntlClientProvider
│   │   ├── page.tsx           # Homepage
│   │   ├── diensten/          # Services page
│   │   ├── cases/             # Case studies
│   │   ├── over/              # About page
│   │   └── contact/           # Contact page
│   ├── api/
│   │   └── contact/route.ts   # Contact form API endpoint
│   ├── layout.tsx             # Root layout (fonts, theme provider)
│   ├── globals.css            # Design tokens + brand colors
│   └── tokens.css             # Typography, spacing, animation tokens
├── components/
│   ├── 3d/
│   │   └── Hero3D.tsx         # React Three Fiber 3D hero
│   ├── layout/
│   │   ├── header.tsx         # Navigation (simplified to 4 links + CTA)
│   │   ├── footer.tsx         # Footer
│   │   └── theme-toggle.tsx   # Dark/light mode toggle
│   ├── sections/              # Page sections
│   │   ├── hero.tsx
│   │   ├── outcomes-strip.tsx
│   │   ├── services-grid.tsx
│   │   ├── process-section.tsx
│   │   ├── use-cases-section.tsx    # NEW
│   │   ├── testimonials-section.tsx # NEW
│   │   ├── faq-section.tsx
│   │   ├── cta-section.tsx
│   │   └── contact-form.tsx
│   └── ui/                    # Reusable shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── textarea.tsx
├── messages/
│   └── nl.json                # Dutch translations (all copy here)
├── lib/
│   ├── i18n.ts                # next-intl config (Dutch-only)
│   └── utils.ts               # Utility functions (cn)
├── config/
│   ├── tokens.ts              # Design token exports
│   └── site.ts                # Site metadata
├── middleware.ts              # i18n routing (Dutch-only)
├── DESIGN_STRATEGY.md         # Design & strategy document
├── BRAND_TOKENS.md            # Complete design token system
├── AUDIT_FINDINGS.md          # Audit results & action plan
├── QA.md                      # Quality assurance report
└── HANDOVER.md                # This file
```

---

## 🎨 Design System

### Brand Colors

The site uses a **premium azure navy palette** instead of generic SaaS blues:

```css
/* Primary Brand */
--brand-900: #0A2A43  /* Deep navy - headers, dark backgrounds */
--brand-600: #0F5E9C  /* Primary brand - buttons, links */
--brand-400: #4BA3F7  /* Light azure - hover states, glows */
--brand-100: #E3F2FD  /* Ultra light - subtle backgrounds */

/* Neutrals */
--sand-050: #F7F7F5   /* Page background */
--ink-900: #0E0F14    /* Body text */
--ink-500: #6B7280    /* Muted text */

/* Accent */
--accent-amber: #FFB703  /* Highlights, badges (use sparingly) */
```

**Where to update colors:**
- Edit `/app/globals.css` lines 13-79 (`:root` and `:root.dark`)
- All components use CSS variables, so changing here updates site-wide

### Typography

- **Headings:** Geist (bold, tight tracking)
- **Body:** Inter (regular, comfortable line-height)

**Sizes:**
- H1: 48px desktop, 36px mobile
- H2: 32px desktop, 28px mobile
- Body: 16px, line-height 1.625

**Where to update:**
- Font imports: `/app/layout.tsx` (next/font/google)
- Type scale: `/app/tokens.css`

### Spacing

Uses **4px Polaris grid**:
- `--space-4` = 16px (default card padding)
- `--space-6` = 24px (card gap)
- `--space-10` = 40px (section padding mobile)
- `--space-16` = 64px (section padding desktop)

**Usage:** Always use spacing tokens, never arbitrary px values.

### Components

**Button:**
- Primary: Gradient (brand-600 → brand-400) + shadow + glow on hover
- Outline: Border + subtle background on hover
- Location: `/components/ui/button.tsx`

**Card:**
- Rounded 2xl (24px)
- Shadow lg
- Hover: Lift (-4px) + shadow-strong
- Optional: Gradient stripe (3px, brand colors)
- Location: `/components/ui/card.tsx` + `.card` class in `globals.css`

---

## ✍️ Content Editing Guide

### How to Edit Copy

**All Dutch copy is in `/messages/nl.json`.**

#### Edit Hero Section

```json
{
  "hero": {
    "title": "Your new title here",
    "subtitle": "Your new subtitle here",
    "cta": {
      "primary": "New CTA text",
      "secondary": "New secondary CTA"
    }
  }
}
```

Save the file, refresh the page - changes appear instantly in dev mode.

#### Add a New Use-Case

1. Open `/messages/nl.json`
2. Find the `useCases.items` array
3. Add a new object:

```json
{
  "title": "Your Use-Case Title",
  "problem": "What problem does this solve?",
  "solution": "How does our automation solve it?",
  "example": "Concrete workflow example (before → after)",
  "outcome": "Measurable result (e.g., 50% faster)"
}
```

4. Choose an emoji icon for `/components/sections/use-cases-section.tsx` (line 18-27)

#### Add a New Testimonial

1. Open `/messages/nl.json`
2. Find the `testimonials.items` array
3. Add a new object:

```json
{
  "quote": "What the client said (1-2 sentences)",
  "author": "Person's Name",
  "company": "Company Name",
  "result": "Measurable outcome (e.g., 'Van X naar Y')"
}
```

Testimonials display in a 3-column grid. If you add a 4th, it will wrap to a new row.

#### Add a New Case Study

1. Add basic info to `nl.json` under `cases.items`:

```json
{
  "slug": "company-name",
  "client": "Company Name",
  "sector": "Industry",
  "headline": "Short outcome (e.g., '3x faster quotes')",
  "summary": "1-2 sentence overview",
  "kpis": [
    "KPI 1 (e.g., -60% time)",
    "KPI 2 (e.g., +30% revenue)",
    "KPI 3 (e.g., 99% accuracy)"
  ]
}
```

2. Add detailed info under `cases.detail.company-name`:

```json
"company-name": {
  "title": "Full case study title",
  "quote": { "text": "Quote", "author": "Name", "role": "Company" },
  "kpis": [ /* before/after KPIs */ ],
  "problem": "Description of the problem",
  "build": [ /* Array of what you built */ ],
  "result": [ /* Array of outcomes */ ],
  "flow": [ /* Workflow steps */ ]
}
```

3. Create a detail page at `/app/[locale]/cases/[company-name]/page.tsx` (copy an existing one as template)

---

## 🔧 Technical Maintenance

### Running Locally

```bash
# Install dependencies
npm install

# Run dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm start
```

### Common Tasks

#### Update the Header Navigation

**File:** `/components/layout/header.tsx`

```tsx
const navItems = [
  { href: buildHref(''), label: t('nav.home') },
  { href: buildHref('diensten'), label: t('nav.services') },
  { href: buildHref('cases'), label: t('nav.cases') },
  { href: buildHref('over'), label: t('nav.about') },
]
```

To add a link:
1. Add a new object to `navItems` array
2. Add the translation key to `/messages/nl.json` under `nav`

#### Update Footer Links

**File:** `/components/layout/footer.tsx`

Edit the footer content directly in the component (uses `nl.json` keys).

#### Change Contact Form Fields

**File:** `/components/sections/contact-form.tsx`

1. Update Zod schema (line ~15)
2. Update form fields (line ~50-100)
3. Update API handler at `/app/api/contact/route.ts`

#### Add a New Page

1. Create directory: `/app/[locale]/new-page/`
2. Create `page.tsx`:

```tsx
export default function NewPage() {
  return <main>Your content</main>
}
```

3. Add translation keys to `/messages/nl.json`
4. Add link to header or footer

---

## 🎬 3D Background Customization

### Adjusting the Hero 3D Orb

**File:** `/components/3d/Hero3D.tsx`

```tsx
// Line ~30: Orb rotation speed
<mesh rotation-y={frame.clock.elapsedTime * 0.4}>
//                                           ^^^^ Lower = slower

// Line ~45: Number of orbital nodes
const nodeCount = 12  // Change to add/remove nodes

// Line ~50: Node orbit radius
const radius = 2.2  // Smaller = closer to center

// Line ~80: Auto-rotate speed
<OrbitControls autoRotate autoRotateSpeed={0.4} />
//                                          ^^^ Lower = slower
```

**Performance Tips:**
- Lower `nodeCount` if frame rate drops
- Reduce `distort` intensity for less GPU load
- Cap DPR to 1.0 on mobile (already done at line ~120)

### Disable 3D on Mobile

**File:** `/components/sections/hero.tsx`

```tsx
// Add condition at line ~130
{!isMobile && <Hero3D className="relative z-10 h-full w-full" />}
```

---

## 📱 Responsive Breakpoints

Tailwind default breakpoints:

```css
sm: 640px   /* Small tablet */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

**Usage:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* 1 col mobile, 2 cols tablet, 3 cols desktop */}
</div>
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. Connect repo to Vercel
2. Set build command: `npm run build`
3. Set output directory: `.next`
4. Deploy

**Environment Variables (if needed):**
- `NEXT_PUBLIC_ANALYTICS_ID` (for Plausible/Vercel Analytics)
- `RESEND_API_KEY` (for contact form emails)

### Manual Deployment

```bash
# Build
npm run build

# Upload .next/ folder to server
# Run: npm start
```

---

## 🐛 Troubleshooting

### Issue: "Module not found: Can't resolve '@/components/...'"

**Fix:** Run `npm install` to ensure all dependencies are installed.

### Issue: "Hydration error" in console

**Cause:** Server HTML doesn't match client HTML (often from theme or locale mismatches).

**Fix:**
1. Check if theme provider is wrapping all client components
2. Verify locale is consistent across server/client
3. Clear `.next` cache: `rm -rf .next && npm run dev`

### Issue: 3D orb not rendering

**Fix:**
1. Check browser console for WebGL errors
2. Verify `Hero3D` is wrapped in `<Suspense>` (already done)
3. Test in different browser (some browsers disable WebGL)

### Issue: Translations not updating

**Fix:**
1. Restart dev server (`Ctrl+C` then `npm run dev`)
2. Clear browser cache
3. Verify JSON syntax in `nl.json` (use JSON validator)

### Issue: Build fails with TypeScript errors

**Fix:**
1. Run `npm run build` to see full error list
2. Fix type errors (common: missing props, wrong types)
3. If stuck, set `"strict": false` in `tsconfig.json` (temporary)

---

## 📚 Key Documentation Files

| File | Purpose |
|------|---------|
| `DESIGN_STRATEGY.md` | Full design strategy, positioning, brand guidelines |
| `BRAND_TOKENS.md` | Complete design token system (colors, typography, spacing) |
| `AUDIT_FINDINGS.md` | Audit results, findings, and action plan |
| `QA.md` | Quality assurance checklist and test results |
| `HANDOVER.md` | This file - how to maintain and extend the site |

---

## 🔗 Useful Links

- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **shadcn/ui:** https://ui.shadcn.com
- **Framer Motion:** https://www.framer.com/motion
- **React Three Fiber:** https://docs.pmnd.rs/react-three-fiber
- **next-intl:** https://next-intl-docs.vercel.app

---

## 👥 Support

For questions or issues:

1. **Code Questions:** Check `DESIGN_STRATEGY.md` and `BRAND_TOKENS.md` first
2. **Content Updates:** See "Content Editing Guide" above
3. **Technical Issues:** See "Troubleshooting" section
4. **Design Questions:** Refer to `BRAND_TOKENS.md` for token system

---

**Maintained by:** Caribbean Azure Team
**Last Updated:** 2025-10-22
**Version:** 1.0
