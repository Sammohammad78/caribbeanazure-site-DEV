# Handover & Deployment Guide

## Project Overview

**Caribbean Azure** is a production-ready, premium AI automation agency website built with modern best practices.

**Key Features:**
- Bilingual (Dutch/English) with next-intl
- Conversion-optimized with WhatsApp-first strategy
- Contact form with validation
- Responsive design (mobile-first)
- SEO-ready (sitemap, robots.txt, meta tags)
- Accessible (WCAG 2.2 AA)
- Performance-optimized

---

## Pre-Launch Checklist

### 1. Configuration

- [ ] **Update WhatsApp Number**
  - Files to update:
    - `components/sections/hero.tsx:18`
    - `components/sections/pricing-section.tsx:15`
    - `app/[locale]/contact/page.tsx:44`
    - `config/site.ts:6-8`
  - Replace `31612345678` with your actual number
  - Format: international without `+` (e.g., `31612345678`)

- [ ] **Configure Email Service**
  - Install Resend: `npm install resend`
  - Get API key from [resend.com](https://resend.com)
  - Add to `.env.local`:
    ```env
    RESEND_API_KEY=re_xxxxx
    ```
  - Uncomment email code in `app/api/contact/route.ts:24-40`
  - Update `from` email to your verified domain

- [ ] **Update Domain**
  - `config/site.ts:4` → Your production domain
  - `app/sitemap.ts:4` → Your production domain
  - `app/robots.ts:4` → Your production domain

- [ ] **Add Real Content**
  - Replace placeholder client logos in `components/sections/hero.tsx:65-71`
  - Add your Cal.com booking link in `config/site.ts:8`
  - Update company email in `config/site.ts:9`

### 2. Assets

- [ ] **Favicon**
  - Replace `app/favicon.ico` with your branded favicon
  - Add additional sizes in `app` directory:
    - `icon.png` (512x512)
    - `apple-icon.png` (180x180)

- [ ] **OG Images**
  - Create `public/og.jpg` (1200x630px)
  - Update reference in `config/site.ts:5`

- [ ] **Logo**
  - Currently using "CA" placeholder in Header
  - Replace in `components/layout/header.tsx:33-38`
  - Replace in `components/layout/footer.tsx:76-80`

### 3. Analytics & Tracking

- [ ] **Analytics Setup**
  - Recommended: [Plausible](https://plausible.io) (privacy-friendly)
  - Alternative: Google Analytics 4
  - Add script to `app/[locale]/layout.tsx` after `<body>` tag

**Plausible Example:**
```tsx
import Script from 'next/script'

// In layout.tsx:
<Script
  defer
  data-domain="your-domain.com"
  src="https://plausible.io/js/script.js"
/>
```

- [ ] **Error Tracking** (Optional but recommended)
  - [Sentry](https://sentry.io): `npx @sentry/wizard@latest -i nextjs`
  - Or [LogRocket](https://logrocket.com)

### 4. SEO

- [ ] **Verify Meta Tags**
  - Check each page has unique title/description
  - Test with [Twitter Card Validator](https://cards-dev.twitter.com/validator)
  - Test with [Facebook Debugger](https://developers.facebook.com/tools/debug/)

- [ ] **Submit Sitemap**
  - Google Search Console: Submit `https://your-domain.com/sitemap.xml`
  - Bing Webmaster Tools: Submit sitemap

- [ ] **Google Business Profile**
  - Claim/update your business listing
  - Add website link

---

## Deployment to Vercel

### Step 1: Push to GitHub

```bash
# Create GitHub repository
gh repo create caribbean-azure-website --private

# Push code
git add .
git commit -m "Ready for production deployment"
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset:** Next.js
   - **Root Directory:** `./`
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)

### Step 3: Environment Variables

Add in Vercel dashboard (Settings → Environment Variables):

```env
# Required if using Resend for contact form
RESEND_API_KEY=re_xxxxx

# Optional: Custom analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=your-domain.com
```

### Step 4: Deploy

Click "Deploy" and wait ~2-3 minutes.

Your site will be live at: `https://caribbean-azure-website.vercel.app`

### Step 5: Custom Domain

1. In Vercel dashboard: Settings → Domains
2. Add your custom domain (e.g., `caribbeanazur.nl`)
3. Update DNS records as instructed:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
4. Wait for DNS propagation (5-60 minutes)
5. Vercel auto-provisions SSL certificate

### Step 6: Verify Deployment

- [ ] Homepage loads at `/nl` and `/en`
- [ ] Contact form submits successfully
- [ ] WhatsApp links open correctly
- [ ] Mobile responsive (test on real device)
- [ ] All navigation links work
- [ ] 404 page shows for invalid routes

---

## Post-Deployment

### Performance Audit

Run Lighthouse audit:

```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Audit your site
lighthouse https://your-domain.com --view
```

**Target Scores:**
- Performance: ≥95
- Accessibility: 100
- Best Practices: ≥90
- SEO: 100

### Common Optimizations

If scores are low:

1. **Performance < 95:**
   - Check image sizes (should be WebP/AVIF, optimized)
   - Verify no render-blocking resources
   - Check Network tab for slow API calls

2. **Accessibility < 100:**
   - Run axe DevTools
   - Fix contrast issues
   - Add missing alt text

3. **SEO < 100:**
   - Add missing meta descriptions
   - Fix broken links
   - Ensure mobile-friendly

### Monitoring

**Weekly:**
- Check Google Search Console for errors
- Review analytics for traffic trends
- Test contact form submission

**Monthly:**
- Re-run Lighthouse audit
- Check for dependency updates: `npm outdated`
- Review and respond to user feedback

---

## Maintenance

### Updating Content

**Change copy:**
```bash
# Edit translations
vim messages/nl.json
vim messages/en.json

# Commit and push
git add messages/
git commit -m "Update homepage copy"
git push
```

Vercel auto-deploys on push to `main`.

### Adding New Pages

1. Create page:
   ```bash
   mkdir -p app/[locale]/new-page
   touch app/[locale]/new-page/page.tsx
   ```

2. Add translations to `messages/*.json`

3. Update navigation in `components/layout/header.tsx`

4. Add to sitemap in `app/sitemap.ts`

5. Commit and push

### Updating Dependencies

```bash
# Check for updates
npm outdated

# Update non-breaking
npm update

# Update Next.js (carefully)
npm install next@latest react@latest react-dom@latest

# Test build
npm run build

# Deploy
git add package*.json
git commit -m "Update dependencies"
git push
```

---

## Troubleshooting

### Build Failures

**Error: "Module not found"**
- Solution: `rm -rf .next node_modules && npm install`

**Error: "Type error" during build**
- Solution: Check TypeScript errors with `npx tsc --noEmit`
- Fix type errors in reported files

### Contact Form Not Working

**Form submits but no email:**
- Check `RESEND_API_KEY` is set in Vercel
- Verify Resend domain is verified
- Check Vercel function logs (Vercel dashboard → Functions → Logs)

**Form returns 500 error:**
- Check API route logs
- Verify Zod validation schema matches form fields

### i18n Issues

**Locale not switching:**
- Check `middleware.ts` is in root directory
- Verify `next-intl` is installed
- Clear `.next` folder and rebuild

**Missing translations:**
- Check translation key exists in both `messages/nl.json` and `messages/en.json`
- Restart dev server after adding new keys

### Performance Issues

**Large bundle size:**
- Check for accidentally imported large libraries
- Use dynamic imports for heavy components:
  ```tsx
  const HeavyComponent = dynamic(() => import('./HeavyComponent'))
  ```

**Slow API routes:**
- Check external API response times
- Add caching where appropriate
- Consider moving to Edge Runtime

---

## Support & Resources

**Documentation:**
- [Next.js Docs](https://nextjs.org/docs)
- [next-intl Docs](https://next-intl-docs.vercel.app/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vercel Docs](https://vercel.com/docs)

**Community:**
- Next.js Discord
- Stack Overflow (tag: next.js)

**Caribbean Azure:**
- Email: info@caribbeanazur.nl
- WhatsApp: [Your number]

---

## Backup & Version Control

**Always:**
- Keep code in Git (GitHub private repo)
- Tag releases: `git tag v1.0.0 && git push --tags`
- Document major changes in `CHANGELOG.md`

**Database Backups:** (If you add a database later)
- Set up automated backups
- Test restore procedure monthly

---

## Future Enhancements

**Consider adding:**
- [ ] Blog with MDX (already structured for this)
- [ ] Case study detail pages
- [ ] Service detail pages
- [ ] Customer testimonials section
- [ ] Newsletter signup (integrate with ConvertKit/Mailchimp)
- [ ] Live chat (Intercom/Crisp)
- [ ] A/B testing (Vercel Edge Config)
- [ ] Advanced analytics (Mixpanel/Amplitude)

---

**Last Updated:** October 2024
**Version:** 1.0.0
**Built by:** Claude Code
