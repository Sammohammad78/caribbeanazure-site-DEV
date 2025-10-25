# Caribbean Azure Design System

**Version:** 1.0.0
**Based on:** Geist Typography + Bootstrap Containers + Polaris Spacing

This document explains the design system implementation and how to maintain/extend it.

---

## Table of Contents

1. [Design Tokens](#design-tokens)
2. [Typography System](#typography-system)
3. [Layout & Containers](#layout--containers)
4. [Spacing Grid](#spacing-grid)
5. [Usage Examples](#usage-examples)
6. [3D Integration](#3d-integration)
7. [Performance Guidelines](#performance-guidelines)
8. [Accessibility](#accessibility)

---

## Design Tokens

All design tokens are defined in `/app/tokens.css` and integrated into Tailwind via `/app/globals.css`.

### File Structure

```
/app
  ├── tokens.css        # Core design tokens
  └── globals.css       # Tailwind config + token integration
```

### Token Categories

- **Typography:** Geist-based size scale (14px - 72px)
- **Spacing:** Polaris 4px grid (4px - 128px)
- **Containers:** Bootstrap v5 widths (540px - 1320px)
- **Fluid Typography:** CSS clamp() for responsive headings

---

## Typography System

### Geist Typography Scale

```css
/* Heading Sizes */
--size-h-72: 72px  /* Hero headlines */
--size-h-64: 64px  /* Main H1 */
--size-h-56: 56px  /* Section H2 */
--size-h-48: 48px  /* Sub-section H2 */
--size-h-40: 40px  /* H3 */
--size-h-32: 32px  /* H3/H4 */
--size-h-24: 24px  /* H4 */
--size-h-20: 20px  /* H5 */
--size-h-16: 16px  /* H6 */
--size-h-14: 14px  /* Small headings */

/* Body/Copy Sizes */
--size-copy-24: 24px  /* Large intro text */
--size-copy-20: 20px  /* Hero subheads */
--size-copy-18: 18px  /* Lead paragraphs */
--size-copy-16: 16px  /* Body text (default) */
--size-copy-14: 14px  /* Small text */
--size-copy-13: 13px  /* Captions */
--size-copy-12: 12px  /* Fine print */
```

### Fluid Typography (Responsive)

```css
/* Automatically scales between mobile and desktop */
--fluid-h1: clamp(2rem, 7vw, 4.5rem)      /* 32px → 72px */
--fluid-h2: clamp(1.75rem, 5.5vw, 3.5rem) /* 28px → 56px */
--fluid-h3: clamp(1.375rem, 4vw, 2.5rem)  /* 22px → 40px */
```

### Usage in Components

#### Class-based (Recommended)

```tsx
<h1 className="h1-fluid">Your Heading</h1>
<h2 className="h2-fluid">Section Title</h2>
<p className="copy-20">Hero subtitle text</p>
<span className="copy-14">Small label</span>
```

#### Direct CSS Variables

```tsx
<h1 style={{ fontSize: 'var(--fluid-h1)' }}>Heading</h1>
<p style={{ fontSize: 'var(--size-copy-16)' }}>Body text</p>
```

#### Tailwind (through theme extension)

```tsx
<h1 className="text-[var(--fluid-h1)]">Heading</h1>
```

### Line Heights

Each size has an optimized line-height:

- **Headings:** 1.05 - 1.4 (tighter for impact)
- **Body text:** 1.5 - 1.6 (comfortable reading)

```css
/* Automatically applied to utility classes */
.h1-fluid {
  font-size: var(--fluid-h1);
  line-height: var(--lh-h-64); /* 1.06 */
}

.copy-16 {
  font-size: var(--size-copy-16);
  line-height: var(--lh-copy-16); /* 1.6 */
}
```

---

## Layout & Containers

### Bootstrap v5 Container Widths

```css
--container-sm:  540px   /* ≥576px */
--container-md:  720px   /* ≥768px */
--container-lg:  960px   /* ≥992px */
--container-xl:  1140px  /* ≥1200px */
--container-2xl: 1320px  /* ≥1400px */
```

### Using Containers

#### Custom Class

```tsx
<div className="container-custom">
  {/* Content automatically respects breakpoint widths */}
</div>
```

#### Tailwind Native (Alternative)

```tsx
<div className="container mx-auto px-4">
  {/* Works but uses different widths than our system */}
</div>
```

### Readable Line Lengths

```css
--max-text-width: 65ch         /* Optimal */
--max-text-width-narrow: 45ch  /* Short copy */
--max-text-width-wide: 80ch    /* Maximum */
```

#### Usage

```tsx
{/* Automatically applied to <p> tags */}
<p>This paragraph respects 65ch max-width</p>

{/* Manual application */}
<div className="text-measure">
  <p>Long form content...</p>
</div>
```

---

## Spacing Grid

### Polaris 4px Grid

```css
--space-1:  4px    (0.25rem)
--space-2:  8px    (0.5rem)
--space-3:  12px   (0.75rem)
--space-4:  16px   (1rem)
--space-5:  20px   (1.25rem)
--space-6:  24px   (1.5rem)
--space-8:  32px   (2rem)
--space-10: 40px   (2.5rem)
--space-12: 48px   (3rem)
--space-14: 56px   (3.5rem)
--space-16: 64px   (4rem)
--space-20: 80px   (5rem)
--space-24: 96px   (6rem)
--space-32: 128px  (8rem)
```

### Presets

```css
/* Section Spacing */
--section-padding-mobile: 40px
--section-padding-desktop: 64px
--section-gap: 96px

/* Component Spacing */
--card-padding: 24px
--card-padding-lg: 32px
--card-gap: 24px (mobile) / 32px (desktop)
```

### Usage in Components

```tsx
{/* Section padding utility */}
<section className="section-padding-y">
  <div className="container-custom">
    {/* Content */}
  </div>
</section>

{/* Custom spacing with variables */}
<div style={{ gap: 'var(--space-6)' }}>
  {/* 24px gap */}
</div>

{/* Tailwind (integrated) */}
<div className="space-y-6">
  {/* Uses our --space-6 token */}
</div>
```

---

## Usage Examples

### Hero Section

```tsx
<section className="section-padding-y">
  <div className="container-custom">
    <h1 className="h1-fluid">Automatiseer je routine. Groei sneller.</h1>
    <p className="copy-20 text-muted-foreground mx-auto" style={{ maxWidth: 'var(--max-text-width)' }}>
      Your subtitle here
    </p>
  </div>
</section>
```

### Service Cards

```tsx
<div className="container-custom">
  <h2 className="h2-fluid text-center mb-12">Onze Diensten</h2>

  <div className="grid md:grid-cols-3 gap-6">
    {services.map(service => (
      <div className="card-padding">
        <h3 className="h-24">{service.title}</h3>
        <p className="copy-16">{service.description}</p>
      </div>
    ))}
  </div>
</div>
```

### Process Timeline

```tsx
<section className="section-padding-y bg-muted/30">
  <div className="container-custom">
    <h2 className="h2-fluid text-center">Hoe We Werken</h2>
    <p className="copy-18 text-center text-measure mx-auto">
      Van intake tot lancering in 3 stappen
    </p>

    <div style={{ marginTop: 'var(--space-16)' }}>
      {steps.map(step => (
        <div key={step.id}>
          <h3 className="h3-fluid">{step.title}</h3>
          <p className="copy-16 text-measure">{step.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

---

## 3D Integration

### Dynamic Import (Required for SSR)

```tsx
import dynamic from 'next/dynamic'

const Hero3D = dynamic(() => import('@/components/3d/Hero3D'), {
  ssr: false,
  loading: () => <div className="h-96 animate-pulse bg-muted" />
})

// Usage
<Hero3D className="absolute inset-0 -z-10" />
```

### Performance Settings

```tsx
<Canvas
  dpr={[1, 1.5]}  // Cap DPR on mobile
  gl={{
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  }}
>
  <Suspense fallback={null}>
    {/* 3D content */}
  </Suspense>
</Canvas>
```

### Reduced Motion Support

```tsx
const prefersReducedMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

if (prefersReducedMotion) {
  return <StaticPoster />
}

return <Animated3DScene />
```

---

## Performance Guidelines

### Typography Performance

- Fluid typography uses CSS `clamp()` - no JavaScript
- Line-height values optimized to prevent layout shift
- `font-feature-settings` enabled for ligatures and alternates

### Layout Performance

- Containers use max-width (no JavaScript measurements)
- Spacing uses CSS variables (efficient recalculation)
- Section padding responsive via media queries only

### 3D Performance Targets

- **INP:** ≤ 200ms (interaction to next paint)
- **LCP:** ≤ 2.5s (largest contentful paint)
- **CLS:** ≤ 0.1 (cumulative layout shift)
- **3D Bundle:** < 150KB on first paint

### Optimization Checklist

- [x] All 3D models run through `gltfpack`
- [x] DPR capped at 1.5 on mobile
- [x] Dynamic imports for 3D components
- [x] Suspense boundaries with fallbacks
- [x] Reduced motion fallbacks provided
- [ ] Use `next/image` for all raster assets
- [ ] Lazy load below-the-fold content

---

## Accessibility

### Minimum Touch Targets

All interactive elements automatically meet 44x44px minimum:

```css
button, a, input, select, textarea {
  min-height: 44px;
  min-width: 44px;
}
```

### Focus Styles

```css
:focus-visible {
  outline: 2px solid hsl(var(--primary));
  outline-offset: 2px;
  border-radius: 4px;
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Semantic HTML

- Use proper heading hierarchy (H1 → H2 → H3)
- Never skip heading levels
- Use `<section>`, `<article>`, `<nav>` appropriately
- Add ARIA labels where needed

---

## Editing the Design System

### Adding a New Typography Size

1. Open `/app/tokens.css`
2. Add the token:
   ```css
   --size-h-52: 3.25rem; /* 52px */
   --lh-h-52: 1.07;
   ```
3. Add utility class:
   ```css
   .h-52 {
     font-size: var(--size-h-52);
     line-height: var(--lh-h-52);
   }
   ```
4. Use in components: `<h2 className="h-52">`

### Adding a New Spacing Value

1. Open `/app/tokens.css`
2. Add to the 4px grid:
   ```css
   --space-18: 4.5rem; /* 72px */
   ```
3. Optionally add to Tailwind theme in `/app/globals.css`:
   ```css
   @theme inline {
     --spacing-18: 4.5rem;
   }
   ```

### Changing Container Widths

1. Open `/app/tokens.css`
2. Modify container variables:
   ```css
   --container-xl: 1200px;  /* Was 1140px */
   ```
3. The `.container-custom` class will automatically update

### Adding a New Locale

See `/messages/nl.json` and `/messages/en.json` for i18n structure. Dutch is default (routes to `/`), English routes to `/en`.

---

## Maintenance

### Regular Tasks

- **Monthly:** Review token usage across components
- **Quarterly:** Audit for unused CSS variables
- **Per release:** Run Lighthouse performance tests
- **Per 3D asset:** Update `ASSETS_LICENSE.md`

### Testing Checklist

- [ ] Test typography at 360px, 768px, 1440px viewports
- [ ] Verify containers respect breakpoints
- [ ] Test reduced motion fallbacks
- [ ] Run Lighthouse on all locales
- [ ] Validate WCAG 2.2 AA compliance

---

**Questions?** Check `/ASSETS_LICENSE.md` for 3D asset guidelines or review `/app/tokens.css` for the complete token reference.

**Version:** 1.0.0
**Last Updated:** 2025-10-22
