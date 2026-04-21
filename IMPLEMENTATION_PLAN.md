# Nirmaan Website — Implementation Plan

> Persistent plan for the Nirmaan homepage build. Reference across sessions.
> Source prompt: `Nirmaan_website_Prompt_v3.md`
> Source of styling truth: `nirmaan-design-system/project/Design System.html`

---

## Context

Greenfield build of the Nirmaan marketing homepage. Investor-grade, production-ready Next.js site rendering the full 14-section emotional arc (problem → solution → proof → CTA), **visually governed by the Nirmaan Design System** — a proprietary HTML/CSS prototype authored via Claude Design and exported into this repo at `nirmaan-design-system/`.

**The core rule.** The design system already defines every token, component, and micro-interaction (Flow button choreography, hand-drawn highlighters, scroll-narrative scenes, count-up stats, interactive grids, grain overlays). The job is to **port that CSS verbatim** into `app/globals.css` and compose thin React components around the class names — not to re-invent styling. Tailwind fills only trivial layout gaps.

## Design bundle (already on disk)

- `nirmaan-design-system/project/Design System.html` — **1598-line prototype, source of truth for styling.** Inter-only font, full token set, all component classes, Flow button (Kain0127 pattern), highlighter variants, interactive grid, story scenes, grain overlays, embedded `<script>` for IntersectionObserver + count-up + igrid init.
- `nirmaan-design-system/project/assets/nirmaan-logo-full.png` + `nirmaan-mark.png` — logo assets.
- `nirmaan-design-system/README.md` — generic Claude Design handoff guide ("recreate pixel-perfect in whatever tech fits"). **Overridden by v3 prompt's stricter "port CSS verbatim" rule** — preserves Flow choreography, highlighter draw-on-view, marquee/igrid/story timings without translation loss.
- `nirmaan-design-system/chats/chat1.md` — design history. Locks these decisions:
  - **Inter is the ONLY font.** Geist + Instrument Serif were iterated out — do not reintroduce.
  - **Flow button = Kain0127 21st.dev pattern exactly.** Label slides right on hover, trailing arrow flies out, fresh arrow slides in from left, accent sweep fills L→R.
  - **Highlighter is thin and roughly text-width**, not overshooting.
  - **Secondary accents (sky/violet/mint/rose/sand)** are for tints and chip coloring only. Never dominant.
  - **Interactive grid pattern** baked into hero/buttons sections.
  - `window.scrollTo`, not `scrollIntoView`.

Product screenshots, demo video, and school logos will be aspect-ratio-correct grayscale placeholders + `// TODO: replace with real asset` comments until real assets ship. No stock photography, ever.

## Hard prerequisites

1. Node 20+, npm/pnpm available.
2. Copy `nirmaan-design-system/project/assets/*.png` → `/public/brand/` as part of Phase A step 6.

No other blockers.

---

## Tech stack (locked)

- Next.js 14+ App Router + TypeScript + Turbopack
- **Styling: direct CSS** ported from `Design System.html` into `app/globals.css`. Tailwind allowed only for trivial layout utilities (grid/spacing). Never for overriding system components.
- Framer Motion — only for what the prototype doesn't already cover (hero phone parallax, §3 snowball scale+rotate, SIM neural-graph pulses)
- `next/font/google` Inter (weights 300/400/500/600/700/800 + italic, `display: swap`)
- Lucide React icons
- React Hook Form + Zod for the contact form
- `next/image` throughout

## Project structure

```
/app
  layout.tsx              # Inter font load, metadata, analytics slot
  page.tsx                # composes all 14 sections
  globals.css             # ← ported design-system <style> block, verbatim
/components
  /sections               # Hero, ProblemStory, CompoundGap, WhatIf,
                          # MeetNirmaan, SIMPower, DemoVideo, UseCases,
                          # Testimonials, TrustLogos, Blog, ClosingCTA,
                          # Contact, Footer
  /ui                     # Nav, FlowButton, GhostButton, Highlighter,
                          # Kicker, SectionHead, Card, StatTile, Quote,
                          # Marquee, InteractiveGrid, StoryScene, Chip,
                          # PhoneFrame
  /illustrations          # BellLogo, NeuralGraph, blog thumbnail SVGs
/content
  home.ts                 # ALL copy, typed constants — single edit surface
/lib
  /hooks
    useRevealOnScroll.ts  # IntersectionObserver → .in class
    useCountUp.ts         # ported from prototype <script>, data-count
    useHighlighter.ts     # fires .is-on when .hl enters viewport
  igrid.ts                # generates <rect> children for .igrid
/public
  /brand, /product, /video, /logos, og-image.png
/nirmaan-design-system    # read-only; design handoff bundle
```

---

## Build order

### Phase A — Foundation

1. `npx create-next-app@latest` with TS + App Router + Turbopack; clean defaults.
2. Install deps: `framer-motion`, `lucide-react`, `react-hook-form`, `zod`, `@hookform/resolvers`.
3. Configure `next/font/google` Inter in `app/layout.tsx` with weights 300/400/500/600/700/800 + italic, `display: swap`. **Inter is the only font** — no serif/display families.
4. **Port the entire `<style>` block from `nirmaan-design-system/project/Design System.html` into `app/globals.css` verbatim.** Includes:
   - All `:root` tokens — `--orange-50..800`, `--ink-50..950`, `--paper`, `--sky-/violet-/mint-/rose-/sand-` scales, radii, shadows.
   - All component classes — `.flow-btn` (+ `--accent`/`--outline`/`--light`), `.btn-ghost`, `.hl` (+ `--orange`/`--violet`/`--sky`/`--marker`/`--circle`), `.card` (+ `--dark`), `.stat`, `.quote`, `.marquee`, `.igrid` (+ `--colorful`), `.story` (+ `.story__scene`/`.story__bg-curve`/`.story__scroll-hint`), `.chip` (7 variants), `.em`, `.kicker`, `.section-head`, `.field`/`.label`/`.input`/`.select`/`.textarea`, `.footer`, `.nav`, type-scale (`.t-display`..`.t-micro`).
   - All `@keyframes` — `hlDraw`, `marqueeRoll`, `bellDrift`, etc.
   - Grain `::before` overlays on `.section--dark`/`.story`/`.footer`.
   - All `@media (max-width: 860px)` breakpoints.
   - **Drop the Google Fonts `<link>`** — Next.js `next/font` loads Inter instead. Do not refactor into Tailwind.
5. Port the prototype's inline `<script>` into `/lib/hooks/*` — one hook per concern: reveal (`.in`), count-up (`data-count`), highlighter (`.is-on`), igrid (`<rect>` generator keyed off `data-cols`/`data-rows`). Use `window.scrollTo` not `scrollIntoView`.
6. Copy `nirmaan-design-system/project/assets/nirmaan-logo-full.png` + `nirmaan-mark.png` → `/public/brand/`. Use CSS `filter: brightness(0) invert(1)` to render a white logo on dark bands — no separate white asset needed.
7. Scope motion-heavy classes inside `@media (prefers-reduced-motion: reduce)` overrides — hero bell drift, marquees, story reveals, highlighter draws.
8. Put **all copy** in `/content/home.ts` as typed constants — referenced by every section.

### Phase B — UI primitives in `/components/ui/`

Thin React wrappers around design-system class names. Preserve all choreography.

- **FlowButton** — variants `default | accent | outline | light`. Renders the exact DOM the `.flow-btn` hover expects (label span, inline-SVG arrow in + arrow out, accent sweep overlay).
- **GhostButton** — `.btn-ghost`. **Rule: never two Flow buttons side-by-side.** Always Flow + Ghost.
- **Highlighter** — renders `.hl` with variants `orange | violet | sky | marker (sky/orange/yellow/mint) | circle`. Uses `useHighlighter` to flip `.is-on` on scroll-in.
- **Kicker** — `.kicker + .t-micro`, orange dot + uppercase tracked micro text.
- **SectionHead** — `.section-head`: title left, meta right, hairline bottom border.
- **Card** (+ `.card--dark` variant), **StatTile** (`data-count` count-up), **Quote** (oversized italic `"` top-right mark), **Marquee** (edge-fade mask + duplicated track for seamless loop), **InteractiveGrid** (`data-cols`/`data-rows`, optional `.igrid--colorful`), **StoryScene** (`.story__scene`), **Chip** (all 7 variants: default/accent/dark/sky/violet/mint/rose), **PhoneFrame**.
- **Nav** — sticky, `rgba(251,250,247,.72)` + backdrop-blur; logo left (32px), links center (Product · For Schools · Blog · About · Contact), Ghost "Sign in" + Flow "Book a demo" right. Mobile: hamburger → full-screen overlay with stacked `.t-h3` links.

### Phase C — Sections 1–14 (emotional-arc order, commit per section)

Each section uses a **different composition** of the primitives (acceptance criterion #3 — no two sections look like re-skins of each other). Copy is **verbatim** from the v3 spec. Full copy lives in `/content/home.ts`.

1. **Hero** — `.hero__grid` radial-masked grid, enlarged drifting bell (`nirmaan-mark.png` top-right, 720px, 0.85 opacity), `.em` + `.hl--orange` in headline, Flow + Ghost CTAs, `PhoneFrame` with `app-hero.png` + Framer Motion parallax + 2–3 floating `.chip--accent` tags.
2. **ProblemStory** — 4 consecutive `.story__scene` on `--ink-950`, orange `.story__bg-curve`, reveal via `useRevealOnScroll`. Scenes: STATUS QUO → THE ASK THAT NEVER LEFT → LATER, AT HOME → THE QUIET SURRENDER.
3. **CompoundGap** — continuous dark band (no break from §2); centered; inline SVG crumpled-paper snowball scaled 32px→280px + rotated −60° via `useScroll`/`useTransform`; orange-tinted shadow grows with size; custom dark chip with orange border: `PERMANENT LEARNING GAP`.
4. **WhatIf** — hard cut to `--paper`. Centered headline with `.hl--marker.hl--yellow` behind "understood exactly how you learn". 4 `.accent-tick` bullets with **alternating accent colors** (orange/sky/violet/mint) — the sanctioned moment for secondary hues.
5. **MeetNirmaan** — `.section-head` + 2×2 `.card` grid, **each card composed differently**: Card 1 voice — chips LISTENS/ADAPTS/EXPLAINS; Card 2 whiteboard — `.hl--violet` on "visually"; Card 3 doubts — plain `.em`; Card 4 SIM — single `.chip--accent`. Closing line with `.hl--marker.hl--orange`.
6. **SIMPower** — `.section--dark` with `.igrid` background at 0.5 opacity; 2-col: `PhoneFrame` left, headline + 3 `.accent-tick` bullets + `flow-btn--light` right; subtle `NeuralGraph` SVG pulses behind phone; closing italic line below.
7. **DemoVideo** — `.section-head`, 16:9 `.card` frame wrapping `<video src="/video/demo.mp4" poster="...">`, centered orange play overlay (scales 1.1× on hover); click plays. Italic caption beneath.
8. **UseCases** — two cards **deliberately non-mirrored**: left `.card` (students) with subject chips cycling all 7 variants + "+23 more"; right `.card--dark` (schools) with embedded mini `.stat` dashboard (3 tiles: `42 students`, `2.1σ avg lift`, `4 concepts flagged`).
9. **Testimonials** — 3 `.quote` cards in `.reveal-stagger`, each with oversized italic `"` mark + avatar initials on alternating tints (`--orange-100`/`--ink-100`/`--orange-100`).
10. **TrustLogos** — full-width `.section--dark` compact bar (80px padding), centered `.t-micro` header, `.marquee` with grayscale logos turning full-color on hover, duplicated track for seamless loop.
11. **Blog** — `.section-head` + 3-col `.card` grid, **distinct template from §5**: thumbnail on top (4:3, orange-to-ink gradient overlay, pinned `.chip` bottom-left), `.t-h3` title with one `.em` word, `.t-small` description, `Read more →` with hover-translating arrow. Thumbnails are generated SVGs from `/components/illustrations/` — no stock.
12. **ClosingCTA** — single full-viewport `.story__scene` on `--ink-950` with orange curve. Manifesto lines in `.reveal-stagger`, `.t-display` headline, `flow-btn--accent` + `flow-btn--light` CTAs side-by-side, `BACK TO TOP ↑` hint.
13. **Contact** — `.section-head` + `.grid-2`: left form using `.field`/`.label`/`.input`/`.select`/`.textarea` with React Hook Form + Zod, success state swap (`.chip--mint` "SENT" + confirmation line); right direct-contact `.card` with Mail/Phone Lucide icons, `BENGALURU · INDIA` chip, compliance chips (`SOC-2`/`COPPA`/`ISO 27001` — **drop if not true; never fake claims**).
14. **Footer** — prototype's `.footer` pattern verbatim: 4-col grid (2fr/1fr/1fr/1fr), brand + tagline + compliance chips, PRODUCT/COMPANY/CONTACT columns, `.footer__bottom` with copyright + Privacy/Terms/Security + Lucide socials (X, LinkedIn, Instagram, YouTube).

### Phase D — Polish pass (single commit)

- Harmonize section-to-section spacing and motion timing end-to-end.
- **Audit orange usage** — if any section has orange 3+ times, swap one to ink. Orange is earned.
- Hover/focus-visible states on every interactive element.
- Mobile nav overlay, breakpoints at 375/768/1024/1440.
- Accessibility: semantic HTML, alt text on all images, keyboard paths, WCAG AA contrast, `prefers-reduced-motion` verified on bell/marquees/story/highlighter.
- SEO: `<title>`, meta description, OG tags (`/public/og-image.png` placeholder), `robots.txt`, `sitemap.xml`.
- Empty analytics `<Script>` slot in `layout.tsx`.
- Lighthouse desktop ≥90 on all 4 pillars; fix CLS/LCP issues.

---

## Critical files

- **`nirmaan-design-system/project/Design System.html`** — read-only source of truth. Every styling decision references this file.
- **`app/globals.css`** — the ported design system at runtime. Never fork tokens into Tailwind config or inline styles.
- **`content/home.ts`** — all copy. Jay's single edit surface.
- **`components/ui/FlowButton.tsx`** — hover choreography must match prototype exactly (arrow fly-out + sweep), or the whole site feels off.
- **`components/ui/Highlighter.tsx`** — the signature mark; `useHighlighter` must fire reliably on scroll.
- **`components/sections/ProblemStory.tsx`** — carries the emotional arc. Reveal timing is load-bearing.
- **`lib/hooks/useRevealOnScroll.ts`** — shared across story/reveal-stagger/highlighter/stat count-up.

Reuse primitives from `/components/ui/` — never duplicate inline in sections.

---

## Rules of restraint (enforced every commit)

- Orange is earned, not sprayed. ≤2 uses per section; if reaching for it a third time, replace one with ink.
- Never introduce a new color, font, or component category. Compose from what the system has.
- **Italic is the only emphasis device. No serif.** (Chat history: Inter-only was a deliberate lock-in.)
- No purple gradients, SaaS blue, pastel decoration, stock photos, emojis in product UI.
- Placeholder assets get `// TODO: replace with real asset` — never stock imagery.
- Real copy is verbatim from spec — zero rewrites.

---

## Verification

- `npm run dev` — click through homepage at 375/768/1024/1440. Confirm the problem → solution → CTA arc reads as one continuous scroll.
- Each of the 14 sections uses a **different composition** (acceptance criterion #3). Spot-check no two cards look alike.
- Every Flow button hover: label slides, arrow flies out, fresh arrow slides in, accent sweeps L→R.
- Every `.hl` draws its SVG underline when scrolled into view.
- Stat tiles count up on entry; marquees loop seamlessly; interactive grid cells light on hover.
- Enable `prefers-reduced-motion` in DevTools — hero bell stops drifting, marquees freeze, story reveals become instant, highlighters pre-drawn.
- Contact form: invalid email → Zod error; valid submit → success swap with `.chip--mint`.
- `npm run build` — zero hydration warnings, zero console errors.
- Lighthouse (desktop, incognito) — Perf/A11y/BP/SEO all ≥90.
- DevTools search rendered page for `Lorem` / `TODO` / `placeholder` — zero hits in UI (TODOs allowed only in source comments).

---

## Out of scope (this build)

- Subpages beyond `/` (About, Blog index, For Schools, etc.) — v3 spec covers only the homepage.
- Real CMS wiring for blog posts.
- Backend for the contact form (client-side validation + success state only; actual email send is a later task).
- i18n, dark-mode toggle (section-level dark bands are intentional narrative, not a theme switch).

---

## Resume notes (for future sessions)

- Start by reading this file + `Nirmaan_website_Prompt_v3.md` + `nirmaan-design-system/project/Design System.html`.
- Check `git log` for how far Phase A/B/C has progressed.
- If any section is partially built, finish it before starting the next — no half-baked sections in working tree.
- Copy is final and lives in `/content/home.ts`; never edit strings inline in components.
