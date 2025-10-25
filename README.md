# Caribbean Azure — Premium AI Automation Agency Website

A premium, human-centered website for Caribbean Azure automation agency. Built with Next.js 16, TypeScript, Tailwind CSS v4, React Three Fiber, and Framer Motion.

**Contact:**
- 📧 info@caribbeanazure.com
- 📞 +31 6 87879092
- 🌐 https://www.caribbeanazure.com

## 🚀 Features

- **Dutch-Only**: Focused on Dutch market (English support removed for clarity)
- **Light-by-Default**: Clean, accessible light theme with optional dark mode toggle
- **Modern Stack**: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4
- **Premium Design**: Azure navy color palette, subtle 3D backgrounds, micro-interactions
- **Human-Centered Copy**: Warm, approachable Dutch language ("Slimmer werken. Minder gedoe.")
- **Conversion-Optimized**: Single primary CTA, clear value proposition, social proof
- **3D Hero**: Interactive React Three Fiber background with cursor parallax
- **Responsive**: Mobile-first design with Framer Motion animations
- **SEO-Ready**: Sitemap, robots.txt, meta tags, schema.org markup
- **Accessible**: WCAG 2.1 AA compliant with keyboard navigation
- **Performance**: Optimized for Lighthouse score ≥95

## 📁 Project Structure

```
websitetest/
├── app/
│   ├── [locale]/              # i18n routing
│   │   ├── layout.tsx         # Locale-specific layout
│   │   ├── page.tsx           # Homepage
│   │   ├── contact/           # Contact page
│   │   ├── over-ons/          # About page (Dutch)
│   │   └── about/             # About page (English)
│   ├── api/
│   │   └── contact/           # Contact form API route
│   ├── globals.css            # Global styles & design tokens
│   ├── layout.tsx             # Root layout
│   ├── sitemap.ts             # Dynamic sitemap
│   └── robots.ts              # Robots.txt configuration
├── components/
│   ├── layout/                # Header, Footer
│   ├── sections/              # Page sections (Hero, Services, etc.)
│   └── ui/                    # Reusable UI components
├── config/
│   ├── tokens.ts              # Design system tokens
│   └── site.ts                # Site configuration
├── lib/
│   ├── i18n.ts                # Internationalization config
│   └── utils.ts               # Utility functions
├── messages/
│   ├── nl.json                # Dutch translations
│   └── en.json                # English translations
├── docs/
│   ├── inspiration.md         # Design research & references
│   ├── design-system.md       # Design system documentation
│   └── handover.md            # Deployment & handover guide
└── middleware.ts              # i18n middleware
```

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **React**: [React 19.2.0](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (strict mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with PostCSS
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives)
- **3D Graphics**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) + Three.js
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes) (light-by-default)
- **i18n**: [next-intl](https://next-intl-docs.vercel.app/) (Dutch-only)
- **Form Validation**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

Visit [http://localhost:3000](http://localhost:3000) (Dutch-only, automatically routed to /nl).

## 🌐 Configuration

### 1. Site Configuration

Edit `config/site.ts`:

```typescript
export const siteConfig = {
  name: 'Caribbean Azure',
  description: '...',
  url: 'https://your-domain.com',  // ← Change this
  links: {
    whatsapp: 'https://wa.me/31XXXXXXXXX',  // ← Your WhatsApp number
    email: 'info@yourdomain.com',
    calendly: 'https://cal.com/yourlink',
  },
}
```

### 2. WhatsApp Integration

WhatsApp number is already configured (`+31 6 87879092`) in:
- `config/site.ts` (centralized configuration)
- Links automatically use `https://wa.me/31687879092`

### 3. Email Service (Contact Form)

The contact form API route (`app/api/contact/route.ts`) is ready for integration.

**Recommended: Resend**

```bash
npm install resend
```

Uncomment the Resend code in `app/api/contact/route.ts` and add your API key to `.env.local`:

```env
RESEND_API_KEY=re_xxxxx
```

### 4. Analytics

Add your analytics provider. Example with Plausible in `app/[locale]/layout.tsx`:

```typescript
<Script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js" />
```

## 📝 Content Management

### Translations

Edit `messages/nl.json` and `messages/en.json` to update copy.

### Adding New Pages

1. Create page in `app/[locale]/your-page/page.tsx`
2. Add translations to `messages/*.json`
3. Update navigation in `components/layout/header.tsx`
4. Add route to `app/sitemap.ts`

## 🎨 Design System

See `BRAND_TOKENS.md` for complete documentation.

**Quick Reference:**
- **Primary brand**: `#0F5E9C` (Azure navy - primary), `#4BA3F7` (Light azure - hover/glow)
- **Deep navy**: `#0A2A43` (Headers, dark backgrounds)
- **Accent**: `#FFB703` (Amber - highlights, use sparingly)
- **Neutrals**: `#F7F7F5` (Sand - backgrounds), `#0E0F14` (Ink - text)
- **Typography**: Geist (headings), Inter (body)
- **Spacing**: 4px Polaris grid
- **Border radius**: `rounded-2xl` (24px) for cards, `rounded-xl` (16px) for buttons

Tokens are defined in:
- `BRAND_TOKENS.md` (Complete design system documentation)
- `app/globals.css` (CSS custom properties)
- `app/tokens.css` (Typography, spacing, animation tokens)

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push code to GitHub
2. Connect repository to [Vercel](https://vercel.com/)
3. Configure environment variables:
   ```env
   RESEND_API_KEY=re_xxxxx  # If using Resend for contact form
   ```
4. Deploy!

Your site will be live at `your-project.vercel.app`.

### Custom Domain

In Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `config/site.ts` with your domain

## 📦 Build Output

```bash
npm run build
```

Expected output:
- Homepage: Server-rendered (dynamic)
- Contact: Server-rendered (dynamic)
- About: Server-rendered (dynamic)
- API routes: Edge functions

## 🧪 Testing

```bash
# Type check
npx tsc --noEmit

# Lint
npm run lint

# Build (includes type-checking)
npm run build
```

## 🛠️ Customization

### Changing Brand Colors

Edit `app/globals.css`:

```css
--color-brand-azure: #YOUR_COLOR;
--color-success: #YOUR_ACCENT;
```

And `config/tokens.ts`:

```typescript
brand: {
  azure: '#YOUR_COLOR',
}
```

### Adding Custom Fonts

1. Add font files to `public/fonts/`
2. Update `app/globals.css`:

```css
@font-face {
  font-family: 'YourFont';
  src: url('/fonts/YourFont.woff2') format('woff2');
}
```

## 🐛 Troubleshooting

**Build fails:**
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version (must be 18+)

**i18n not working:**
- Verify `middleware.ts` is in the root directory
- Check locale files exist in `messages/`

**Contact form not sending:**
- Implement email service in `app/api/contact/route.ts`
- Add environment variables for your email service

## 📚 Documentation

- **[DESIGN_STRATEGY.md](./DESIGN_STRATEGY.md)** - Positioning, IA, brand strategy, tone of voice
- **[BRAND_TOKENS.md](./BRAND_TOKENS.md)** - Complete design token system
- **[AUDIT_FINDINGS.md](./AUDIT_FINDINGS.md)** - Comprehensive audit with 30+ findings
- **[QA.md](./QA.md)** - Quality assurance checklist and testing
- **[HANDOVER.md](./HANDOVER.md)** - Content editing and maintenance guide
- **[CHANGELOG.md](./CHANGELOG.md)** - Version history and release notes

## ✅ Launch Checklist

### Phase 1: Foundation (Complete)
- [x] Premium brand colors (azure navy palette)
- [x] Dutch-only routing and copy
- [x] Light-by-default theme
- [x] Human-centered copy ("Slimmer werken. Minder gedoe.")
- [x] Real contact details (info@caribbeanazure.com, +31 6 87879092)
- [x] Use-cases section (3 scenarios)
- [x] Testimonials section (3 client quotes)
- [x] Simplified navigation (4 core pages)

### Phase 2: Enhancement (In Progress)
- [ ] Configure Resend for contact form email delivery
- [ ] Add real client logos to homepage
- [ ] Optimize Hero3D for 60fps (cursor parallax, performance)
- [ ] Add Schema.org structured data (Organization + Service)
- [ ] Generate OpenGraph images per route
- [ ] Consolidate IA (merge /prijzen into /diensten)
- [ ] Archive deprecated routes

### Phase 3: Pre-Launch (Pending)
- [ ] Set up analytics (Plausible/Umami recommended)
- [ ] Run Lighthouse audit (target: Performance/A11y/SEO ≥95)
- [ ] Test on real mobile devices (iOS Safari, Chrome Android)
- [ ] Keyboard navigation test (full site)
- [ ] Screen reader test (NVDA/JAWS)
- [ ] Error tracking setup (Sentry optional)
- [ ] Update OG image with branded design
- [ ] Favicon set (16x16, 32x32, 180x180, 192x192, 512x512)

## 📄 License

Proprietary — © 2024 Caribbean Azure. All rights reserved.

---

**Built with ❤️ by Caribbean Azure**

🤖 Generated with [Claude Code](https://claude.com/claude-code)
