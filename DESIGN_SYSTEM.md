# DESIGN_SYSTEM

## 0. System Summary
- This codebase does not have a light theme and dark theme pair. It has a single dark-first design system defined in `app/globals.css`.
- There is no `.dark` token block anywhere in the repo.
- There is no `tailwind.config.*` file. Tailwind is being used in v4 CSS-first mode via `@import "tailwindcss";` and a small `@theme` block.
- Most of the design system is implemented with:
  - global CSS custom properties in `:root`
  - global reusable classes in `app/globals.css`
  - page/component-local `styled-jsx` rules
- Important absence notes:
  - `glass-nav`: not defined as a reusable class; equivalent effect is implemented in `.navbar::before` and `.navbar::after`
  - `glass-panel`: not defined as a reusable class; closest equivalent is `.glass-card` or page-local glass wrappers like `.booking-cta`
  - `input-base`: not defined as a reusable class; equivalent pattern is page-local `.form-input, .form-select, .form-textarea`
  - `portal-root`: not defined anywhere

---

## 1. CSS Custom Properties

### 1.1 Global tokens in `:root`
The single global palette is dark-first.

| Token | Value | RGB | Semantic use |
|---|---:|---:|---|
| `--bg-primary` | `#0A0A0A` | `rgb(10,10,10)` | Global canvas/background |
| `--bg-secondary` | `#121212` | `rgb(18,18,18)` | Secondary surface/footer blocks |
| `--bg-card` | `#18181B` | `rgb(24,24,27)` | Solid card/input background |
| `--border-muted` | `#27272A` | `rgb(39,39,42)` | Default borders/dividers |
| `--border-active` | `#7C3AED` | `rgb(124,58,237)` | Interactive/active border intent |
| `--text-primary` | `#F5F5F5` | `rgb(245,245,245)` | Primary foreground/headlines |
| `--text-secondary` | `#A1A1AA` | `rgb(161,161,170)` | Secondary copy/body text |
| `--text-disabled` | `#71717A` | `rgb(113,113,122)` | Muted/helper text |
| `--accent-authority` | `#E6D3A3` | `rgb(230,211,163)` | Gold brand accent, cultural/authority emphasis |
| `--accent-authority-muted` | `#9A8F6A` | `rgb(154,143,106)` | Muted gold labels/kickers |
| `--accent-authority-hover` | `#F0DFB8` | `rgb(240,223,184)` | Hover state for gold-accent links/text |
| `--accent-intelligence` | `#7C3AED` | `rgb(124,58,237)` | Violet primary action/focus/status accent |
| `--accent-intelligence-hover` | `#6D28D9` | `rgb(109,40,217)` | Violet hover state |
| `--accent-intelligence-glow` | `rgba(124, 58, 237, 0.3)` | `rgb(124,58,237)` @ 30% | Violet glow/shadow |

### 1.2 Non-color root tokens
- Spacing: `4, 8, 16, 24, 32, 48, 64, 80, 120px` via `--space-xs` to `--space-5xl`
- Layout: `--max-width: 1200px`, `--nav-height: 64px`
- Motion: `--duration-fast: 150ms`, `--duration-default: 300ms`, `--duration-slow: 600ms`
- Easings:
  - `--ease-state: ease-in-out`
  - `--ease-enter: ease-out`
  - `--ease-3d: cubic-bezier(0.16, 1, 0.3, 1)`
- Fonts:
  - `--font-display: "Clash Display", sans-serif`
  - `--font-body: "Inter", "Helvetica Neue", sans-serif`
  - `--font-mono: ui-monospace, "SF Mono", "JetBrains Mono", "Menlo", monospace`
- Radii:
  - `--radius-sm: 4px`
  - `--radius-md: 8px`
  - `--radius-lg: 16px`
  - `--radius-pill: 100px`

### 1.3 `.dark` variables
- None.
- `html { color-scheme: dark; }` is hardcoded globally.

### 1.4 Component-scoped custom properties
These are local, not global tokens.

| Scope | Token | Value | Notes |
|---|---|---|---|
| Blog page | `--bg-elevated` | `#1e1e22` / `rgb(30,30,34)` | Hover/elevated surface only on blog |
| Blog page | `--text-muted` | `var(--text-disabled)` | Alias only on blog |
| ProjectsExpanded | `--status-active-bg` | `rgba(34,197,94,0.12)` | Active badge bg |
| ProjectsExpanded | `--status-active-color` | `#4ade80` / `rgb(74,222,128)` | Active text/dot |
| ProjectsExpanded | `--status-progress-bg` | `rgba(124,58,237,0.15)` | Progress badge bg |
| ProjectsExpanded | `--status-progress-color` | `#a78bfa` / `rgb(167,139,250)` | Progress text/dot |
| ProjectsExpanded | `--status-planned-bg` | `rgba(230,211,163,0.1)` | Planned badge bg |
| LivePortfolioExpanded | same badge tokens | same values | repeated locally |
| LivePortfolioExpanded | `--booking-bg-start` | `rgba(124,58,237,0.12)` | booking CTA gradient |
| LivePortfolioExpanded | `--booking-bg-end` | `rgba(230,211,163,0.08)` | booking CTA gradient |

### 1.5 Token hygiene note
- `app/contact/page.tsx` references `--bg-elevated` and `--text-muted` but does not define them locally or globally.
- For AI-generated additions, do not assume those exist globally.

Example:

```css
background: var(--bg-primary);
color: var(--text-primary);
border: 1px solid var(--border-muted);
```

---

## 2. Tailwind Config

### 2.1 Actual setup
- No `tailwind.config.ts/js/mjs`
- Tailwind v4 imported with:

```css
@import "tailwindcss";
```

### 2.2 `@theme` definitions
Only animation tokens are defined:

```css
--animate-first: moveVertical 30s ease infinite;
--animate-second: moveInCircle 20s reverse infinite;
--animate-third: moveInCircle 40s linear infinite;
--animate-fourth: moveHorizontal 40s ease infinite;
--animate-fifth: moveInCircle 20s ease infinite;
```

### 2.3 Tailwind custom theme extensions
- Custom colors mapped to CSS vars: none
- Custom font families in Tailwind theme: none
- Custom spacing/sizing extensions: none
- Custom plugins: none

### 2.4 Tailwind usage pattern
- Mostly plain CSS classes, not utility-heavy Tailwind
- Tailwind is used heavily only in `components/ui/BackgroundGradientAnimation.tsx`
- Class merging helper:

```ts
cn(...inputs) => twMerge(clsx(inputs))
```

Example:

```tsx
<div className="h-screen w-screen relative overflow-hidden bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]" />
```

---

## 3. Reusable Component Classes

### 3.1 Global utility classes
There is no `@layer utilities` block. Reusable globals are plain CSS classes.

### 3.2 Exact reusable classes

#### `.glass-card`
- `border: 1px solid rgba(255,255,255,0.09)`
- layered radial + linear gradient background
- `backdrop-filter: blur(18px) saturate(140%)`
- inset highlight + deep shadow
- hover: `translateY(-4px)`, gold border tint, violet glow shadow

Use for:
- featured cards
- event/venue/module cards
- CTA panels
- bento cells

Example:

```html
<article class="glass-card">
  <h3>Card title</h3>
  <p>Secondary body copy.</p>
</article>
```

#### `.card`, `.who-card`, `.milestone-card`, `.project-card`, `.module-card`, `.faq-item`, `.contact-form-wrap`
Liquid-glass family with:
- transparent base
- inset highlight via `::before`
- refractive filter via `::after`
- hover lift `translateY(-2px)`
- hover highlight shifts from white to gold

Use when the surface should feel lighter and more liquid than `.glass-card`.

#### `glass-nav` equivalent
Not a class. Equivalent is navbar shell:
- `.navbar::before`: border-bottom `1px solid rgba(255,255,255,0.08)`
- `.navbar::after`: `background-color: rgba(24,24,27,0.35)` + `filter:url(#container-glass)`
- both fade in only on `.navbar.scrolled`

Example:

```html
<nav class="navbar scrolled">
  <div class="nav-inner">...</div>
</nav>
```

#### `glass-panel` equivalent
Not a class. Use `.glass-card` or page-local panels like `.booking-cta`.

#### `input-base` equivalent
Not a class. Shared pattern exists as:
- `.form-input, .form-select, .form-textarea`
- `background: var(--bg-card)`
- `border: 1px solid var(--border-muted)`
- `border-radius: 10px` or `var(--radius-md)`
- focus ring uses violet or gold depending on page

Example:

```html
<input class="form-input" placeholder="Your name" />
<select class="form-select"></select>
<textarea class="form-textarea"></textarea>
```

#### `portal-root`
- not present

#### Other reusable globals
- `.container`
- `.section`
- `.gradient-text`
- `.gradient-text-gold`
- `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-ghost`
- `.bento-grid`, `.bento-grid.bento-2`, `.bento-feature`
- `.divider`
- `.orb`, `.orb-violet`, `.orb-gold`
- reveal system: `[data-reveal]`, `.is-revealed`
- depth system: `.depth-track`, `.depth-viewport`, `.depth-pane`, `.depth-lens`

---

## 4. Typography System

### 4.1 Fonts
- Display: local `Clash Display` from `/public/fonts/ClashDisplay-Variable.ttf`
- Body: `Inter` via `next/font/google`
- Mono: `ui-monospace, SF Mono, JetBrains Mono, Menlo`

### 4.2 Type scale
- `t-display-xl`: `clamp(48px, 7vw, 96px)`, `600`, `1.05`, `-0.03em`
- `t-display-lg`: `clamp(36px, 5vw, 72px)`, `600`, `1.1`, `-0.025em`
- `t-display-md`: `clamp(28px, 3.5vw, 48px)`, `500`, `1.15`, `-0.02em`
- `t-heading`: `clamp(20px, 2.5vw, 32px)`, `500`, `1.2`, `-0.015em`
- `t-label`: `11px`, `600`, `0.12em`, uppercase
- `t-body-lg`: `clamp(16px, 1.5vw, 18px)`, `1.7`
- `t-body`: `15px`, `1.65`
- `t-body-sm`: `13px`, `1.6`

### 4.3 Conventions
- Display/headings use `Clash Display`
- Body/forms/nav use `Inter`
- Most labels and metadata are uppercase with wide tracking
- Headline tracking is always negative
- Body copy is always `var(--text-secondary)`, not bright white

Example:

```html
<span class="t-label">Projects</span>
<h2 class="t-display-md">Behavioral intelligence in motion.</h2>
<p class="t-body">Secondary explanatory copy.</p>
```

---

## 5. Animation & Motion

### 5.1 Global keyframes
- `moveHorizontal`
- `moveInCircle`
- `moveVertical`
- `meshDrift`
- `orbPulse`
- `fadeUp`
- `warpArrive`
- `flowSignal`

### 5.2 GSAP patterns
- Hero entrance: blurred/faded timeline, `power3.out` / `power4.out`
- Navbar entrance after reveal event
- Scroll reveals:
  - desktop: GSAP `ScrollTrigger.batch("[data-reveal]")`
  - touch/mobile: `IntersectionObserver`
- Depth system:
  - GSAP `ScrollTrigger.create({ snap })`
  - snap duration `{ min: 0.65, max: 1.1 }`
  - ease `power3.out`
- Lenis smooth scroll on desktop only:
  - `duration: 1.2`
  - easing: exponential ease-out

### 5.3 Transition conventions
- Micro interactions: `150ms` to `300ms`
- Surface hover: `300ms ease-in-out`
- 3D/depth motion: `var(--ease-3d)`
- Route warp:
  - out: `380ms`
  - hold: `520ms`
  - in: `950ms`

Example:

```css
transition: transform var(--duration-default) var(--ease-state);
transition: opacity 0.65s ease-out, transform 0.65s ease-out;
```

---

## 6. Spacing & Layout

### 6.1 Containers
- Standard max width: `1200px`
- Desktop horizontal padding: `32px`
- Tablet: `16px`
- Mobile: `8px`

### 6.2 Section rhythm
- Default section vertical padding: `120px`
- Tablet: `80px`
- Mobile: `64px`

### 6.3 Grid patterns
- Standard card grids: `repeat(3, 1fr)` desktop
- Tablet collapse: `repeat(2, 1fr)` at `900px`
- Mobile collapse: `1fr` at `600px`
- Bento grid:
  - `3` columns default
  - `2` columns for `.bento-2`
  - `.bento-feature` spans `2` columns

### 6.4 Breakpoints used
- `1200px` large layout adjustments
- `900px` tablet collapse
- `768px` nav/mobile typography adjustments
- `640px` blog grid collapse
- `600px` mobile single-column
- `480px` smallest container/section padding

Example:

```html
<div class="container">
  <section class="section">
    <div class="bento-grid">
      <article class="glass-card bento-feature"></article>
      <article class="glass-card"></article>
    </div>
  </section>
</div>
```

---

## 7. Component Patterns

### 7.1 Buttons
- `.btn`: inline-flex pill button base
- `.btn-primary`: solid violet CTA with glow
- `.btn-secondary`: liquid-glass neutral button, hover text turns gold
- `.btn-ghost`: text-only gold link-style button

Example:

```html
<a class="btn btn-primary">Primary CTA</a>
<a class="btn btn-secondary">Secondary CTA</a>
<a class="btn btn-ghost">Text action</a>
```

### 7.2 Cards
- Standard solid card: `background: var(--bg-card); border: 1px solid var(--border-muted);`
- Liquid glass card: `.card` family
- Premium refractive card: `.glass-card`
- Typical structure:

```html
<article class="glass-card">
  <div class="type-badge">Category</div>
  <h3>Title</h3>
  <p>Body copy</p>
  <a class="btn btn-secondary">Action</a>
</article>
```

### 7.3 Badge/tag patterns
- Tags: pill border, secondary text, muted border
- Type badges: gold text, uppercase, small, pill border
- Status badges:
  - active: green
  - progress: violet
  - planned: gold
- Date badges: solid violet for upcoming, muted gold for past

Example:

```html
<span class="type-badge">Release</span>
<span class="status-badge badge-progress"><span class="status-dot"></span>In Progress</span>
```

### 7.4 Navigation
- Fixed top nav
- Transparent until scrolled
- Scrolled state adds glass film and bottom border
- Desktop: inline links + CTA
- Mobile: fullscreen overlay menu

Example:

```html
<nav class="navbar">
  <div class="nav-inner">
    <a class="nav-logo">Polynovea</a>
    <ul class="nav-links">...</ul>
    <a class="btn btn-primary nav-cta">Contact Us</a>
  </div>
</nav>
```

### 7.5 Form fields
- Labels are uppercase 11px with tracking
- Inputs/selects/textarea are dark solid surfaces
- Focus state is a colored border + soft glow
- Form groups stack with `var(--space-xs)` gap

Example:

```html
<div class="form-group">
  <label class="form-label">Email</label>
  <input class="form-input" type="email" placeholder="you@example.com" />
</div>
```

---

## 8. Color Usage Rules

### 8.1 Accent vs violet
- Use `accent-intelligence` (violet) for:
  - primary buttons
  - focus rings
  - active state
  - play buttons
  - date badges
  - glows
- Use `accent-authority` (gold) for:
  - brand emphasis inside headlines
  - labels, tags, secondary CTA emphasis
  - cultural/editorial tone
  - planned state
- Use `accent-authority-muted` for subtle metadata/kickers

### 8.2 Status colors
Only one mode exists.

| Status | Background | Foreground |
|---|---|---|
| Active/OK | `rgba(34,197,94,0.12)` | `#4ade80` |
| Progress/Info | `rgba(124,58,237,0.15)` | `#a78bfa` |
| Planned/Warn | `rgba(230,211,163,0.1)` | `var(--accent-authority)` |
| Error/Danger | no global token; ad hoc `#fca5a5` used in contact form error |

### 8.3 Surface hierarchy
This is inferred from usage, not formalized by token names:
- Canvas: `--bg-primary`
- Surface: `--bg-secondary`
- Surface card: `--bg-card`
- Surface elevated: local `--bg-elevated` on blog only
- Surface glass: `.card` family / `.glass-card`

### 8.4 Border conventions
- Default structural border: `1px solid var(--border-muted)`
- Glass border: `1px solid rgba(255,255,255,0.08)` or `0.09`
- Focus/active border: violet
- Hover premium border: gold-tinted translucent border

---

## 9. Generation Rules for New Pages

When generating new pages in this codebase:
1. Stay dark-first; do not invent light mode.
2. Prefer `Clash Display` for headlines and `Inter` for everything else.
3. Use `--bg-primary` canvas, `--text-primary` headings, `--text-secondary` body.
4. Use violet for action; use gold for emphasis.
5. Build sections with `.container` + `.section`.
6. Use 3-column to 2-column to 1-column collapse at `900px` and `600px`.
7. Prefer `.glass-card` for premium feature cards and `.btn-secondary` for non-primary actions.
8. Keep motion smooth and cinematic, not snappy or playful.
9. Do not rely on nonexistent globals like `--bg-elevated`, `glass-panel`, `input-base`, or `.dark`.

### Canonical page snippet

```html
<section class="section">
  <div class="container">
    <span class="t-label" style="color: var(--accent-authority-muted)">Section</span>
    <h2 class="t-display-md" style="margin-top: var(--space-md); color: var(--text-primary)">
      Headline with a <span class="gradient-text">violet-gold accent</span>.
    </h2>
    <p class="t-body" style="margin-top: var(--space-md)">
      Secondary body copy explaining the section.
    </p>

    <div class="bento-grid" style="margin-top: var(--space-2xl)">
      <article class="glass-card bento-feature" style="padding: var(--space-xl)">
        <span class="type-badge">Featured</span>
        <h3>Primary feature</h3>
        <p>Use premium glass treatment for high-value content.</p>
        <a class="btn btn-primary">Primary action</a>
      </article>

      <article class="glass-card" style="padding: var(--space-xl)">
        <h3>Secondary feature</h3>
        <p>Use secondary cards for supporting content.</p>
        <a class="btn btn-secondary">Learn more</a>
      </article>
    </div>
  </div>
</section>
```
