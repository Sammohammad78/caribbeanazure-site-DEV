# Design System Documentation

## Overview

The Caribbean Azure design system is built on Scandinavian minimalism principles: generous white space, clean typography, subtle animations, and a restrained color palette.

---

## Color Palette

### Brand Colors

```css
Primary (Azure Blue):  #0F5FFF
Primary Dark:          #0A4ACC
Primary Light:         #4080FF
```

**Usage:**
- Primary buttons, links, focus states
- Icon backgrounds (10% opacity)
- Hover states

### Neutral Colors

```css
Background:            #FAFAFA
Foreground (Text):     #1F2937
Muted Background:      #F3F4F6
Muted Foreground:      #6B7280
Border:                #E5E7EB
```

**Usage:**
- Body text: `#1F2937`
- Secondary text: `#6B7280`
- Backgrounds: `#FAFAFA` (main), `#FFFFFF` (cards)
- Borders: `#E5E7EB`

### Accent Colors

```css
Success:               #10B981
Error:                 #EF4444
Warning:               #F59E0B
```

**Usage:**
- Success messages, positive metrics
- Error states, destructive actions
- Warnings, alerts

### Dark Mode (auto-detected)

```css
Background:            #0A0A0A
Foreground:            #EDEDED
Muted Background:      #1F2937
Border:                #374151
```

---

## Typography

### Font Stack

```css
Body: system-ui, -apple-system, sans-serif
Mono: ui-monospace, monospace
```

**Rationale:** System fonts for instant loading and native feel.

### Type Scale

| Size | CSS Class          | Usage                    |
|------|--------------------|--------------------------|
| 72px | `text-7xl`         | Hero titles (desktop)    |
| 64px | `text-6xl`         | Hero titles (tablet)     |
| 56px | `text-5xl`         | Hero titles (mobile)     |
| 48px | `text-4xl`         | Section headings (h2)    |
| 32px | `text-3xl`         | Subsection headings (h3) |
| 28px | `text-2xl`         | Card titles              |
| 20px | `text-xl`          | Lead paragraphs          |
| 16px | `text-base`        | Body text                |
| 14px | `text-sm`          | Small text, captions     |
| 12px | `text-xs`          | Labels, badges           |

### Line Height

```css
Tight:   1.1  (headings)
Snug:    1.3  (subheadings)
Normal:  1.5  (short body text)
Relaxed: 1.7  (long-form content)
```

### Font Weights

```css
Semibold: 600  (all headings)
Medium:   500  (buttons, labels)
Regular:  400  (body text)
```

### Tracking (Letter Spacing)

```css
Tight:  -0.02em  (large headings)
Normal:  0        (body text)
Wide:    0.02em   (all-caps labels)
```

---

## Spacing System

Based on **8px grid**.

| Token  | Value  | Usage                                    |
|--------|--------|------------------------------------------|
| `xs`   | 8px    | Icon padding, tight gaps                 |
| `sm`   | 12px   | Button padding, form spacing             |
| `md`   | 16px   | Default gap, card padding                |
| `lg`   | 24px   | Section spacing (small)                  |
| `xl`   | 32px   | Section spacing (medium)                 |
| `2xl`  | 48px   | Section spacing (large)                  |
| `3xl`  | 64px   | Section spacing (extra large)            |
| `4xl`  | 96px   | Vertical section padding (desktop)       |

**Vertical Section Padding:**
- Mobile: `py-20` (80px)
- Desktop: `py-32` (128px)

**Container Max Width:**
- Default: `1280px` (responsive with padding)
- Narrow content: `768px` (3xl)
- Wide content: `1536px` (2xl)

---

## Border Radius

| Token  | Value  | Usage                       |
|--------|--------|-----------------------------|
| `sm`   | 8px    | Small elements, badges      |
| `md`   | 12px   | Inputs, small buttons       |
| `lg`   | 16px   | Buttons, cards              |
| `xl`   | 24px   | Large cards, modals         |
| `2xl`  | 32px   | Hero sections, large cards  |
| `full` | 9999px | Pills, avatar, icon circles |

**Standard:**
- Buttons: `16px` (rounded-lg)
- Cards: `16px` (rounded-xl)
- Inputs: `12px` (rounded-lg)

---

## Shadows

```css
Soft:    0 2px 12px rgba(0, 0, 0, 0.04)   /* Cards at rest */
Medium:  0 4px 24px rgba(0, 0, 0, 0.08)   /* Cards on hover */
Strong:  0 8px 40px rgba(0, 0, 0, 0.12)   /* Modals, featured cards */
Hover:   0 12px 48px rgba(0, 0, 0, 0.16)  /* Pronounced hover */
```

**Usage:**
- Default cards: `shadow-soft`
- Hover state: `hover:shadow-medium`
- Modals/dialogs: `shadow-strong`
- Featured pricing: `shadow-strong`

---

## Animation & Transitions

### Timing

```css
Quick:    200ms  /* Micro-interactions (button press) */
Smooth:   300ms  /* Standard transitions (hover, slide) */
Emphasis: 400ms  /* Pronounced animations (modals, drawers) */
```

### Easing

```css
cubic-bezier(0.4, 0, 0.2, 1)  /* Material Design ease */
```

### Common Patterns

**Fade In (on scroll):**
```javascript
opacity: 0 → 1
translateY: 20px → 0
duration: 400ms
```

**Hover Lift:**
```css
transform: translateY(0) → translateY(-4px)
shadow: soft → medium
duration: 300ms
```

**Button Press:**
```css
transform: scale(1) → scale(0.98)
duration: 200ms
```

**Accordion Expand:**
```css
max-height: 0 → max-height: 384px
duration: 300ms
```

### Reduced Motion

Always respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Component Patterns

### Buttons

**Primary:**
```tsx
<Button>Action</Button>
// bg-primary, white text, hover:bg-primary/90
```

**Secondary:**
```tsx
<Button variant="outline">Action</Button>
// border, transparent bg, hover:bg-accent
```

**Sizes:**
- `sm`: h-9, px-4, text-xs
- `default`: h-11, px-6, text-sm
- `lg`: h-12, px-8, text-base
- `xl`: h-14, px-10, text-lg

### Cards

**Structure:**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>...</CardContent>
  <CardFooter>...</CardFooter>
</Card>
```

**Hover State:**
```css
hover:shadow-medium hover:-translate-y-1
transition: all 300ms
```

### Forms

**Input:**
```tsx
<Input placeholder="Placeholder" />
// h-11, rounded-lg, border-input
// focus: ring-2 ring-primary
```

**Textarea:**
```tsx
<Textarea placeholder="Message" rows={6} />
// min-h-[120px], rounded-lg
```

**Validation:**
- Error: red text below input
- Success: green checkmark icon

### Icons

**Size Guide:**
- Small (inline): `h-4 w-4` (16px)
- Default: `h-5 w-5` (20px)
- Medium: `h-6 w-6` (24px)
- Large: `h-8 w-8` (32px)

**Icon Containers:**
```tsx
<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
  <Icon className="h-6 w-6" />
</div>
```

---

## Layout Patterns

### Grid System

**Service Cards (4-column):**
```tsx
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
```

**Pricing Tiers (3-column):**
```tsx
<div className="grid md:grid-cols-3 gap-8">
```

**Content + Sidebar (2-column):**
```tsx
<div className="grid md:grid-cols-2 gap-12">
```

### Container

```tsx
<div className="container mx-auto px-4 sm:px-6 lg:px-8">
```

- Default: 1280px max-width
- Responsive padding: 16px (mobile) → 32px (desktop)

### Section Spacing

```tsx
<section className="py-20 md:py-32">
```

- Mobile: 80px vertical padding
- Desktop: 128px vertical padding

---

## Accessibility

### Focus States

All interactive elements have visible focus:

```css
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-primary
focus-visible:ring-offset-2
```

### Color Contrast

Minimum ratios (WCAG 2.2 AA):
- Body text on background: **4.5:1**
- Large text (18px+): **3:1**
- UI components: **3:1**

### Keyboard Navigation

- All interactive elements: `Tab` navigable
- Modals/dialogs: `Escape` to close
- Accordions: `Enter`/`Space` to toggle

### Screen Readers

- Semantic HTML (`<nav>`, `<main>`, `<section>`)
- ARIA labels on icon-only buttons
- Alt text on all images
- Form labels properly associated

---

## Responsive Breakpoints

```typescript
sm:  640px   // Small tablets
md:  768px   // Tablets
lg:  1024px  // Laptops
xl:  1280px  // Desktops
2xl: 1536px  // Large desktops
```

**Mobile-First Approach:**
- Design for mobile by default
- Add desktop refinements with `md:` and `lg:` prefixes

---

## Usage Examples

### Hero Section

```tsx
<section className="py-20 md:py-32 bg-gradient-to-br from-primary/5 to-accent/5">
  <div className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto text-center space-y-8">
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
        Your Headline
      </h1>
      <p className="text-xl text-muted-foreground">
        Your subtitle
      </p>
    </div>
  </div>
</section>
```

### Card Grid

```tsx
<div className="grid md:grid-cols-3 gap-8">
  <Card className="hover:shadow-medium hover:-translate-y-1 transition-all">
    <CardHeader>
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
        <Icon className="h-6 w-6" />
      </div>
      <CardTitle>Title</CardTitle>
      <CardDescription>Description</CardDescription>
    </CardHeader>
  </Card>
</div>
```

---

## Resources

- **Tokens:** `config/tokens.ts`
- **CSS Variables:** `app/globals.css`
- **Component Library:** `components/ui/*`
- **Section Templates:** `components/sections/*`

---

**Maintained by Caribbean Azure Design Team**
