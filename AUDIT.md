# Audit – {{DATE}}

## 1. Language Consistency Matrix

| Route                              | NL default copy | EN variant | Notes |
|------------------------------------|-----------------|------------|-------|
| `/[locale]`                        | ✅ fully NL      | ⚠️ EN inherits NL content (no translated strings yet for new copy deck sections) | Needs full EN translation pass once copy is final. |
| `/[locale]/diensten`               | ✅               | ⚠️ EN still Dutch-ish phrasing | Restructure with new service blurbs + EN copy. |
| `/[locale]/cases`                  | ✅               | ⚠️ EN shares NL metrics text | Case tiles need locale-aware copy & future detail pages. |
| `/[locale]/prijzen`                | ✅ (new strings present) | ⚠️ EN fallback uses NL price descriptions | Ensure EN pricing copy + CTA lines. |
| `/[locale]/over-ons`               | ✅               | ❌ `/en/about` redirect placeholder only | Build full EN version or reuse translated NL content. |
| `/[locale]/contact`                | ✅               | ❌ hard-coded NL strings | Externalise to i18n + provide EN copy. |
| `/[locale]/cases/[slug]`           | ❌ missing page  | ❌ missing | Needs new template per brief. |
| `/[locale]/sectoren`               | ❌ missing       | ❌ missing | Sector page not yet implemented. |
| `/[locale]/integraties`            | ❌ missing       | ❌ missing | Integrations overview not yet implemented. |
| `/[locale]/security`               | ❌ missing       | ❌ missing | Security overview not yet implemented. |
| `/[locale]/insights`               | ❌ missing       | ❌ missing | Insights index + detail required. |
| `/[locale]/blueprint`              | ❌ missing       | ❌ missing | Lead magnet landing page missing. |
| `/[locale]/roi`                    | ❌ missing       | ❌ missing | ROI calculator route missing. |
| `/[locale]/proxy` (middleware)     | ⚠️ deprecated    | ⚠️         | Replace `middleware.ts` with new `proxy` convention later. |

✅ = copy matches locale; ⚠️ = partial/mixed; ❌ = missing.

## 2. Hover & Focus Audit

| Component / Element                    | Current state                                                                 | Issue(s) observed                                                                 | Required action |
|----------------------------------------|-------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|-----------------|
| Header nav links                       | Uses `lift-hover` for hover, browser default focus outline                    | Focus ring inconsistent with button tokens; hover shadow differs from spec       | Apply shared hover/focus tokens + `focus-visible` ring. |
| Mobile nav list items                  | Border appears on hover only, no focus style                                  | Fails focus-visible requirement                                                   | Add focus styles + minimum touch target padding. |
| Footer links                           | Simple color change                                                           | No hover lift/glow, focus ring absent                                             | Use same hover/focus tokens as nav. |
| Cards (services/cases/pricing/process) | Hover shadow via `card` class; focus not reachable (no `tabindex`)            | Need consistent hover transform + focus state for keyboard accessibility          | Add `tabIndex`, role, and shared hover/focus styling. |
| CTA buttons (`btn-primary/outline`)    | Gradient hover & focus ring mostly consistent                                 | Secondary buttons rely on outline color only; focus ring could be stronger        | Re-align to token definitions (hover transform + ring). |
| Links inside body copy                 | Default underline on hover only                                               | No focus indicator                                                                | Add utility class for consistent focus-visible styling. |
| WhatsApp floating action (future)      | Not implemented yet                                                           | N/A                                                                               | Implement with same tokens once added. |

## 3. Visual & Graphics Observations

- Hero orb still sits within a soft container; need a full-bleed background treatment with radial glows + noise per brief, and remove the framed look entirely.
- Outcome strip (−60% etc.) not present; add trio of stat cards beneath hero with consistent card styling.
- Services grid uses mix of NL/EN copy and icon set; align icons (Lucide ok) and update text per deck.
- Cards across sections share general style but border/hover tokens differ; unify via CSS variables.
- No scroll-story section (Inbox → Agent → WhatsApp) yet—needs new component plus 3D/lightweight visuals.
- Lack of trust anchors near CTAs (logos exist but no headline/quote). Add micro-proof near hero/buttons.
- Favicons/OG images unchanged; need premium versions for NL/EN.
- Footer structure still limited to company/services/resources/legal but not updated with new routes or trust copy.

## 4. Performance & Accessibility Snapshot

- Lighthouse (mobile & desktop): **Pending** – to be run after implementation changes. Baseline scores not captured in this audit.
- CLS/LCP/INP: unknown; ensure final build meets ≤0.1 CLS and ≤2.5s LCP (mobile P75).
- Accessibility: current focus-visible gaps noted above will fail WCAG 2.2 AA until addressed.
- Console/build: no runtime errors post-fixes; note warning about deprecated `middleware` convention (address later).

---

Next steps move into Phase 1 implementation (copy/i18n, nav/footer, new routes, lead magnets) using findings above as reference.
