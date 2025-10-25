# Brand Tokens Documentation
**Caribbean Azure – Premium Automation Agency Design System**

*Version: 1.0*
*Date: 2025-10-22*

---

## Overview

This document defines the complete design token system for Caribbean Azure's premium Dutch automation agency website. All tokens are defined as CSS custom properties and integrated with Tailwind CSS v4.

---

## Color Palette

### Primary Brand Colors (Azure/Navy Spectrum)

```css
/* Deep Navy - Headers, dark backgrounds, footers */
--brand-900: #0A2A43;
--brand-900-rgb: 10, 42, 67;

/* Primary Brand - Buttons, links, primary accents */
--brand-600: #0F5E9C;
--brand-600-rgb: 15, 94, 156;

/* Light Azure - Hover states, glows, chart accents, focus rings */
--brand-400: #4BA3F7;
--brand-400-rgb: 75, 163, 247;

/* Ultra Light - Subtle backgrounds, badges */
--brand-100: #E3F2FD;
--brand-100-rgb: 227, 242, 253;
```

### Neutral Palette

```css
/* Sand/Warm neutrals - Backgrounds */
--sand-050: #F7F7F5;
--sand-050-rgb: 247, 247, 245;

--sand-100: #EEEDE9;
--sand-100-rgb: 238, 237, 233;

--sand-200: #E0DED7;
--sand-200-rgb: 224, 222, 215;

/* Ink - Text colors */
--ink-900: #0E0F14;
--ink-900-rgb: 14, 15, 20;

--ink-700: #3A3D4A;
--ink-700-rgb: 58, 61, 74;

--ink-500: #6B7280;
--ink-500-rgb: 107, 114, 128;

--ink-400: #9CA3AF;
--ink-400-rgb: 156, 163, 175;
```

### Accent Colors

```css
/* Amber - Highlights, badges, "new" labels (use sparingly) */
--accent-amber: #FFB703;
--accent-amber-rgb: 255, 183, 3;

--accent-amber-light: #FFF8E6;
--accent-amber-light-rgb: 255, 248, 230;

/* Success Green */
--success-green: #10B981;
--success-green-rgb: 16, 185, 129;

/* Error Red */
--error-red: #EF4444;
--error-red-rgb: 239, 68, 68;

/* Warning Orange */
--warning-orange: #F59E0B;
--warning-orange-rgb: 245, 158, 11;
```

### Semantic Color Mapping

```css
:root {
  /* Surfaces */
  --bg: var(--sand-050);
  --bg-elev: #FFFFFF;
  --panel: #FFFFFF;
  --muted: var(--sand-200);
  --border: var(--sand-200);

  /* Text */
  --fg: var(--ink-900);
  --fg-muted: var(--ink-500);
  --fg-subtle: var(--ink-400);

  /* Brand */
  --brand-soft: var(--brand-100);
  --brand: var(--brand-600);
  --brand-strong: var(--brand-900);

  /* Accent */
  --accent-soft: var(--accent-amber-light);
  --accent: var(--accent-amber);
  --accent-strong: #E5A503;

  /* State */
  --ok: var(--success-green);
  --warn: var(--warning-orange);
  --err: var(--error-red);
}

:root.dark {
  /* Dark mode surfaces */
  --bg: #0D1117;
  --bg-elev: #161B22;
  --panel: #1C2128;
  --muted: #3A4451;
  --border: #2D333B;

  /* Dark mode text */
  --fg: #F0F1F3;
  --fg-muted: #9CA3AF;
  --fg-subtle: #6B7280;

  /* Dark mode brand (slightly brighter for contrast) */
  --brand-soft: #1A4D7A;
  --brand: #4BA3F7;
  --brand-strong: #7BBEFF;
}
```

---

## Typography

### Font Families

```css
--font-display: "Geist", "Inter Tight", system-ui, -apple-system, sans-serif;
--font-body: "Inter", system-ui, -apple-system, sans-serif;
--font-mono: "JetBrains Mono", "Fira Code", ui-monospace, monospace;
```

### Font Weights

```css
--weight-regular: 400;
--weight-medium: 500;
--weight-semibold: 600;
--weight-bold: 700;
```

### Type Scale (Desktop)

```css
/* Display (H1) */
--size-h1: 48px;      /* 3rem */
--lh-h1: 1.1;         /* 52.8px */
--tracking-h1: -0.02em;

/* Heading 2 */
--size-h2: 32px;      /* 2rem */
--lh-h2: 1.2;         /* 38.4px */
--tracking-h2: -0.01em;

/* Heading 3 */
--size-h3: 24px;      /* 1.5rem */
--lh-h3: 1.3;         /* 31.2px */
--tracking-h3: -0.01em;

/* Heading 4 */
--size-h4: 20px;      /* 1.25rem */
--lh-h4: 1.4;         /* 28px */
--tracking-h4: normal;

/* Body */
--size-body: 16px;    /* 1rem */
--lh-body: 1.625;     /* 26px */
--tracking-body: normal;

/* Small */
--size-small: 14px;   /* 0.875rem */
--lh-small: 1.5;      /* 21px */
--tracking-small: normal;

/* Caption */
--size-caption: 12px; /* 0.75rem */
--lh-caption: 1.4;    /* 16.8px */
--tracking-caption: 0.02em;
```

### Type Scale (Mobile)

```css
@media (max-width: 768px) {
  --size-h1: 36px;    /* 2.25rem */
  --size-h2: 28px;    /* 1.75rem */
  --size-h3: 22px;    /* 1.375rem */
  --size-h4: 18px;    /* 1.125rem */
  /* Body, small, caption remain same */
}
```

### Fluid Typography (Optional, for hero/display)

```css
/* Fluid H1: scales from 36px @ 375px to 48px @ 1440px */
--fluid-h1: clamp(2.25rem, 1.5rem + 2vw, 3rem);

/* Fluid H2: scales from 28px @ 375px to 32px @ 1440px */
--fluid-h2: clamp(1.75rem, 1.5rem + 0.67vw, 2rem);
```

---

## Spacing Scale (4px Polaris Grid)

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
--space-32: 128px;
```

### Semantic Spacing Presets

```css
/* Section padding */
--section-padding-mobile: var(--space-10);    /* 40px */
--section-padding-desktop: var(--space-16);   /* 64px */

/* Card padding */
--card-padding: var(--space-6);               /* 24px */
--card-gap: var(--space-6);                   /* 24px */

/* Container gutters */
--container-gutter: var(--space-4);           /* 16px mobile */
@media (min-width: 768px) {
  --container-gutter: var(--space-6);         /* 24px desktop */
}
```

---

## Container Widths (Bootstrap v5 inspired)

```css
--container-sm: 540px;
--container-md: 720px;
--container-lg: 960px;
--container-xl: 1140px;
--container-2xl: 1320px;

/* Default max-width for .container-custom */
--container-default: var(--container-xl);
```

---

## Border Radius

```css
--radius-xs: 4px;
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 24px;
--radius-full: 9999px;

/* Component-specific */
--radius-badge: var(--radius-full);
--radius-input: var(--radius-sm);
--radius-button: var(--radius-md);
--radius-card: var(--radius-xl);
```

---

## Shadows

```css
/* Elevation levels */
--shadow-xs: 0 1px 2px rgba(10, 42, 67, 0.04);
--shadow-sm: 0 1px 3px rgba(10, 42, 67, 0.06), 0 1px 2px rgba(10, 42, 67, 0.04);
--shadow-md: 0 4px 6px rgba(10, 42, 67, 0.07), 0 2px 4px rgba(10, 42, 67, 0.04);
--shadow-lg: 0 10px 15px rgba(10, 42, 67, 0.1), 0 4px 6px rgba(10, 42, 67, 0.05);
--shadow-xl: 0 20px 25px rgba(10, 42, 67, 0.15), 0 10px 10px rgba(10, 42, 67, 0.04);
--shadow-2xl: 0 25px 50px rgba(10, 42, 67, 0.25);

/* Semantic shadows */
--shadow-button: var(--shadow-md);
--shadow-card: var(--shadow-lg);
--shadow-card-hover: var(--shadow-xl);

/* Brand glow (for CTAs, focus states) */
--glow-brand: 0 0 0 3px rgba(75, 163, 247, 0.25);
--glow-brand-strong: 0 0 16px rgba(75, 163, 247, 0.4), 0 0 0 3px rgba(75, 163, 247, 0.25);
```

---

## Transitions & Easing

### Durations

```css
--duration-fast: 150ms;
--duration-base: 200ms;
--duration-slow: 300ms;
--duration-slower: 500ms;
```

### Easing Curves

```css
--ease-out: cubic-bezier(0.33, 1, 0.68, 1);
--ease-in: cubic-bezier(0.32, 0, 0.67, 0);
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Semantic Transitions

```css
--transition-fast: var(--duration-fast) var(--ease-out);
--transition-base: var(--duration-base) var(--ease-out);
--transition-slow: var(--duration-slow) var(--ease-out);

/* Component-specific */
--transition-button: transform var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out);
--transition-card: transform var(--duration-base) var(--ease-out), box-shadow var(--duration-base) var(--ease-out);
```

---

## Z-Index Scale

```css
--z-base: 1;
--z-dropdown: 1000;
--z-sticky: 1100;
--z-fixed: 1200;
--z-modal-backdrop: 1300;
--z-modal: 1400;
--z-popover: 1500;
--z-tooltip: 1600;
```

---

## Component Tokens

### Button

```css
/* Primary Button */
--button-primary-bg: linear-gradient(135deg, var(--brand-600), var(--brand-400));
--button-primary-fg: #FFFFFF;
--button-primary-shadow: var(--shadow-button);
--button-primary-hover-shadow: var(--shadow-xl);
--button-primary-hover-scale: 1.02;

/* Outline Button */
--button-outline-border: var(--brand-600);
--button-outline-fg: var(--brand-600);
--button-outline-hover-bg: rgba(75, 163, 247, 0.08);

/* Ghost Button */
--button-ghost-hover-bg: rgba(75, 163, 247, 0.06);

/* Size scale */
--button-height-sm: 32px;
--button-height-md: 40px;
--button-height-lg: 48px;
--button-height-xl: 56px;

--button-padding-sm: 12px 16px;
--button-padding-md: 14px 20px;
--button-padding-lg: 16px 24px;
--button-padding-xl: 18px 32px;
```

### Card

```css
--card-bg: var(--panel);
--card-border: var(--border);
--card-radius: var(--radius-card);
--card-padding: var(--space-6);
--card-shadow: var(--shadow-card);
--card-shadow-hover: var(--shadow-card-hover);
--card-hover-translate: -4px;
```

### Input/Textarea

```css
--input-bg: var(--bg-elev);
--input-border: var(--border);
--input-radius: var(--radius-input);
--input-padding: 12px 16px;
--input-focus-border: var(--brand-400);
--input-focus-ring: var(--glow-brand);
```

### Badge

```css
--badge-bg: var(--brand-soft);
--badge-fg: var(--brand-strong);
--badge-padding: 4px 12px;
--badge-radius: var(--radius-badge);
--badge-font-size: var(--size-caption);
--badge-font-weight: var(--weight-semibold);
```

---

## Gradients

### Brand Gradients

```css
--gradient-brand-primary: linear-gradient(135deg, #0F5E9C 0%, #4BA3F7 100%);
--gradient-brand-secondary: linear-gradient(135deg, #0A2A43 0%, #0F5E9C 100%);

/* Hero background glow */
--gradient-hero-glow:
  radial-gradient(
    circle at 30% 20%,
    rgba(75, 163, 247, 0.15) 0%,
    transparent 50%
  ),
  radial-gradient(
    circle at 70% 80%,
    rgba(255, 183, 3, 0.08) 0%,
    transparent 50%
  );
```

### Mesh Gradients (for 3D backgrounds)

```css
--gradient-mesh-1: radial-gradient(at 40% 20%, rgba(75, 163, 247, 0.3) 0, transparent 50%);
--gradient-mesh-2: radial-gradient(at 80% 0%, rgba(15, 94, 156, 0.2) 0, transparent 50%);
--gradient-mesh-3: radial-gradient(at 80% 100%, rgba(255, 183, 3, 0.15) 0, transparent 50%);
--gradient-mesh-4: radial-gradient(at 0% 50%, rgba(10, 42, 67, 0.2) 0, transparent 50%);
```

---

## Accessibility

### Focus Indicators

```css
--focus-ring: 2px solid var(--brand-400);
--focus-ring-offset: 2px;
--focus-ring-shadow: var(--glow-brand);
```

### Minimum Contrast Ratios (WCAG 2.1 AA)

| Element | Foreground | Background | Ratio |
|---------|-----------|------------|-------|
| Body text | `--ink-900` (#0E0F14) | `--sand-050` (#F7F7F5) | 15.2:1 ✅ |
| Muted text | `--ink-500` (#6B7280) | `--sand-050` (#F7F7F5) | 4.7:1 ✅ |
| Primary button | `#FFFFFF` | `--brand-600` (#0F5E9C) | 4.9:1 ✅ |
| Outline button | `--brand-600` (#0F5E9C) | `--sand-050` (#F7F7F5) | 6.2:1 ✅ |
| Links | `--brand-600` (#0F5E9C) | `--sand-050` (#F7F7F5) | 6.2:1 ✅ |

---

## Usage Guidelines

### Do's

✅ **Use semantic tokens** (e.g., `--fg`, `--brand`, `--shadow-card`) instead of raw tokens
✅ **Maintain 4:1 contrast** minimum for all UI components
✅ **Use spacing scale** consistently (no arbitrary px values)
✅ **Prefer transitions** for interactive elements (buttons, links, cards)
✅ **Test with reduced-motion** preference enabled

### Don'ts

❌ **Don't use colors outside the palette** without documenting them here first
❌ **Don't hardcode hex values** in components (use CSS variables)
❌ **Don't skip semantic tokens** (e.g., don't use `--brand-400` directly; use `--accent`)
❌ **Don't create arbitrary spacing** (use the 4px grid)
❌ **Don't overuse accent-amber** (max 5% of screen space)

---

## Implementation in Tailwind CSS v4

### Example @theme configuration (in globals.css)

```css
@theme {
  /* Colors */
  --color-brand-900: var(--brand-900);
  --color-brand-600: var(--brand-600);
  --color-brand-400: var(--brand-400);
  --color-brand-100: var(--brand-100);

  --color-sand-50: var(--sand-050);
  --color-ink-900: var(--ink-900);
  --color-ink-500: var(--ink-500);

  /* ... map all tokens */

  /* Spacing */
  --spacing-1: var(--space-1);
  --spacing-2: var(--space-2);
  /* ... etc */

  /* Border radius */
  --radius-sm: var(--radius-sm);
  --radius-md: var(--radius-md);
  /* ... etc */
}
```

### Usage in components

```tsx
// Tailwind classes
<Button className="bg-brand-600 text-white shadow-button rounded-button px-6 py-3">
  {children}
</Button>

// Or with CSS variables directly
<div style={{ color: 'var(--fg)', backgroundColor: 'var(--bg)' }}>
  {content}
</div>
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-10-22 | Initial token system for premium redesign |

---

**Maintained by:** Caribbean Azure Design Team
**Last updated:** 2025-10-22
