# PolyNovea Website Design Enhancement — Handoff Document

**Date:** May 12, 2026  
**Status:** Design enhancement phase (visual refinement, no content changes)  
**Next Owner:** [Kimi/Codex or assigned AI]  
**Scope:** Implement Founder Constellation + design system refinements

---

## 1. Project Overview

### Mission
PolyNovea: "We are building the system that reads, maps, and acts on human behaviour."

### Three Modules (Context)
1. **Module 1** — Website + Admin UI (current phase)
2. **Module 2** — Acquisition Intelligence (behavioral analysis)
3. **Module 3** — Revenue Optimization (data products)

### Current Phase
- **What:** Design enhancement without content changes
- **Why:** Elevate existing marketing site with visual depth, signal system, physics-based motion
- **Primary Task:** Create "Founder Constellation" component showing five founding dimensions (Astrophysics, Art, Music, AI, Data)

---

## 2. Design System & Philosophy

### Aesthetic Direction
**Cinematic Scientific Minimalism + Behavioral Systems Design + Luxury Editorial Restraint**

Think: Observatory interfaces, signal intelligence rooms, scientific visualization, NOT startup SaaS or cyberpunk.

### Core Color System (Semantic)

```css
--bg-primary: #0A0A0A;              /* Layered black (creates depth, not flat) */
--bg-secondary: #121212;
--bg-card: #18181B;
--border-muted: #27272A;
--border-active: #7C3AED;           /* Violet */

--accent-authority: #E6D3A3;        /* GOLD — signal energy, use sparingly */
--accent-authority-muted: #9A8F6A;
--accent-authority-hover: #F0DFB8;

--accent-intelligence: #7C3AED;     /* VIOLET — emergence/AI, sparse & atmospheric */
--accent-intelligence-hover: #6D28D9;
--accent-intelligence-glow: rgba(124, 58, 237, 0.3);
```

### What Each Color Means
- **Gold** = Data importance, active signal, selected state, critical metrics
- **Violet** = AI inference, emergence, abstraction, latent system energy (use sparingly)
- **Black** = Layered depth (never flat), use warmth variation and texture

### Typography
- **Headlines/Display:** Clash Display (elegant, editorial, non-futuristic)
- **Body/UI:** Inter (ultra-clean, system-friendly)

### Spacing & Layout
- Max width: `1200px`
- Padding blocks per section: `120px` (large breathing room)
- Card borders: subtle glassmorphism (blur 20px, opacity 0.65)

### Animation Principles
- **Motion language:** Orbital, resonant, gravitational, wave-propagated
- **NOT:** Random easing, flashy hover animations, trendy UI motion
- **Duration defaults:** 
  - Fast: 150ms
  - Default: 300ms (but feel should be slow/gravitational)
  - Slow: 600ms
- **Easing:** Use `cubic-bezier(0.16, 1, 0.3, 1)` for 3D/entrance animations (feels orbital)

### Texture & Depth
- Grain overlay on entire page: `opacity: 0.035`, SVG-based noise
- Section backgrounds: subtle radial gradients (violet + gold at low opacity)
- No flat blacks — all blacks have warmth variation
- Glassmorphism: `backdrop-filter: blur(20px)` on cards

### Data Visualization
- Organic, flowing graph structures (NOT enterprise dashboards)
- Topology lines, signal clusters, orbital relationships
- Behavioral astronomy feel (not business intelligence)
- Signal fields as recurring motif (tiny glowing nodes, constellation relationships)

---

## 3. Technical Stack

### Framework & Language
- **Next.js** (with breaking changes from standard docs — check `node_modules/next/dist/docs/`)
- **TypeScript** (strict mode, no `any`, use `unknown` for external input)
- **React 18+**

### Styling & Animation
- **CSS:** `globals.css` for design tokens and global styles
- **Component styles:** styled-jsx (inline `<style jsx>` tags in components)
- **Animation library:** Lenis (smooth scroll) + custom CSS keyframes
- **3D graphics:** Three.js (already used in HeroScene.tsx)

### Backend & Data
- **Database:** Supabase
- **API:** Next.js API routes (`/app/api/`)
- **Environment:** `.env.local` (see setup docs)

### Key Dependencies
```json
{
  "next": "latest",
  "react": "^18",
  "three": "^r128",
  "lenis": "^latest"
}
```

---

## 4. Project File Structure & Key Locations

### Design System
```
/polynovea-web/app/globals.css          ← ALL design tokens, typography scale, animations
```

### Components (Reference These)
```
/polynovea-web/components/
  Hero.tsx                             ← Structure & pattern for entrance animations
  HeroScene.tsx                        ← Three.js integration (particle network)
  Navbar.tsx                           ← Header structure
  About.tsx, Architecture.tsx, etc.    ← Other major sections
  
  /sections/                           ← Larger section components
  /ui/                                 ← Reusable UI elements (buttons, cards, etc.)
  /three/                              ← Three.js related components
```

### App Structure
```
/polynovea-web/app/
  globals.css                          ← Global styles
  layout.tsx                           ← Root layout
  page.tsx                             ← Home page
  /api/                                ← API routes
  /[route]/                            ← Other pages (about, projects, etc.)
```

---

## 5. Existing Component Patterns (Follow These)

### Pattern 1: Entrance Animation (Staggered)
```tsx
// In globals.css:
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
.hero-animate-1 { animation: fadeUp 0.6s ease-out 0.2s both; }
.hero-animate-2 { animation: fadeUp 0.8s ease-out 0.5s both; }
.hero-animate-3 { animation: fadeUp 0.7s ease-out 0.85s both; }
```

Use for: Sequential text reveals, CTA buttons, data chains.

### Pattern 2: Gradient Orbs (Atmospheric Background)
```tsx
<div className="orb orb-violet" style={{ width: 700, height: 700, top: "-20%", left: "30%", opacity: 0.5 }} />
<div className="orb orb-gold" style={{ width: 500, height: 500, top: "40%", right: "-10%", opacity: 0.3 }} />
```

Use for: Backdrop energy, directional visual flow.

### Pattern 3: Glassmorphism Cards
```css
.card {
  background: rgba(24, 24, 27, 0.65);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(39, 39, 42, 0.8);
  border-radius: var(--radius-lg);
  transition: border-color 300ms var(--ease-state);
}

.card:hover {
  border-color: rgba(124, 58, 237, 0.35);
  box-shadow: 0 0 32px rgba(124, 58, 237, 0.12);
}
```

Use for: Any contained content section.

### Pattern 4: Scroll Reveal (IntersectionObserver)
```tsx
// In ScrollReveal.tsx:
// Driven by IntersectionObserver, not a library
[data-reveal] {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.65s ease-out, transform 0.65s ease-out;
}
[data-reveal].is-revealed {
  opacity: 1;
  transform: translateY(0);
}
```

Use for: Any section content that should animate in on scroll.

### Pattern 5: Animated Gradient Mesh (Per Section)
```css
.section::before {
  content: "";
  position: absolute;
  inset: -50%;
  background:
    radial-gradient(ellipse 55% 45% at 25% 35%, rgba(124, 58, 237, 0.07) 0%, transparent 65%),
    radial-gradient(ellipse 40% 55% at 75% 65%, rgba(230, 211, 163, 0.04) 0%, transparent 65%);
  animation: meshDrift 16s ease-in-out infinite alternate;
  pointer-events: none;
  z-index: 0;
}

@keyframes meshDrift {
  0%   { transform: translate(0%, 0%) scale(1); }
  33%  { transform: translate(4%, -3%) scale(1.04); }
  66%  { transform: translate(-3%, 4%) scale(0.97); }
  100% { transform: translate(2%, 2%) scale(1.02); }
}
```

Use for: Atmospheric depth in section backgrounds.

---

## 6. PRIMARY TASK: Founder Constellation Component

### Specification

**Component Name:** `FounderConstellation.tsx` (or `FounderDNA.tsx`)

**Location:** `/components/FounderConstellation.tsx`  
**Integration:** Insert after Hero section, before Architecture section

### Visual Concept
Five nodes representing:
1. **Astrophysics** — Orbital mechanics, gravitational systems
2. **Art** — Visual language, aesthetic signal
3. **Music** — Rhythm, frequency, resonance
4. **AI** — Pattern recognition, emergence
5. **Data** — Signal capture, information topology

### Interaction Behavior
- **Default state:** Nodes orbit slowly in 2D or 3D space (use Three.js or SVG)
- **Hover over node:** 
  - Violet semi-transparent halo appears
  - Founder name + brief contribution appears
  - Audio feedback: low-frequency pulse/resonance tone (optional but recommended)
  - Topology lines brighten (gold)
- **Visual language:**
  - Nodes: small glowing circles (violet outline, dark fill)
  - Topology lines: thin SVG paths in gold (`#E6D3A3`)
  - Connection visualization: shows how five elements feed into PolyNovea's core mission
  - Waveform-like motion in topology lines (subtle wave propagation)

### Technical Approach Options

**Option A (Recommended): SVG + Three.js**
- Nodes as Three.js particles with orbital motion
- Topology lines as SVG rendered on top (or Three.js tubes)
- Lighter weight than full 3D scene
- Can reuse HeroScene.tsx pattern

**Option B: Pure Three.js**
- Full 3D constellation (orbital planes)
- More immersive but heavier
- Use if founders want spatial depth

**Option C: SVG only (Lightweight)**
- SVG circles with animation
- SVG paths with stroke animation
- No Three.js dependency
- Fast but less immersive

### Data Structure (Internal)
```typescript
interface FounderDimension {
  id: string;                    // 'astrophysics' | 'art' | 'music' | 'ai' | 'data'
  label: string;                 // Display name
  founderName: string;           // Founder's name
  contribution: string;          // Brief 1-2 line description
  angle: number;                 // Position in orbital layout (degrees)
  color: string;                 // Glow color (violet or gold highlight)
  connections: string[];         // Which other dimensions it connects to
}
```

### Styling Requirements
- Use CSS variables: `--accent-intelligence` (violet) for hovers, `--accent-authority` (gold) for topology lines
- Grain texture overlay should be visible (opacity 0.035 already global)
- Section background: animated gradient mesh (use existing pattern)
- Motion: smooth, slow, orbital feel (no jarring transitions)

### Content (Get from Master Doc)
- Five founders' names & backgrounds
- How each dimension shaped the company
- How they interconnect (the "topology")

### Optional Enhancements
- Audio: Low-frequency pulse on node hover (use Web Audio API or pre-recorded tone)
- Tooltip animations: Fade in/out with stagger
- Mobile responsiveness: Flatten to 2D grid below 768px
- Analytics: Track which nodes users interact with most

---

## 7. Code Style & Standards

### TypeScript Rules
- Type all public APIs and component props
- Use `interface` for object shapes, `type` for unions
- No `any` — use `unknown` and narrow safely
- No `console.log` in production code
- Immutable updates (spread operator, not mutation)

### React Rules
- Component props as named `interface`
- Callback props typed explicitly
- Max 50 lines per function (break large components into smaller pieces)
- Use styled-jsx for component-scoped styles
- CSS variables for all colors, spacing, durations

### File Organization
- Max 800 lines per file
- Extract repeated logic into utilities
- One component per file (unless very small utilities)
- Prefer many small files over few large files

### Component Template
```typescript
'use client'; // If using client features (Three.js, event listeners, etc.)

import { useMemo } from 'react';

interface FounderConstellationProps {
  // Define props here
}

export default function FounderConstellation({}: FounderConstellationProps) {
  return (
    <section className="founder-constellation">
      {/* Content */}
      <style jsx>{`
        .founder-constellation {
          /* Styles */
        }
      `}</style>
    </section>
  );
}
```

---

## 8. Integration Checklist

- [ ] Component created at `/components/FounderConstellation.tsx`
- [ ] Imported and rendered in home page after Hero section
- [ ] Uses existing design tokens from `globals.css`
- [ ] Follows animation patterns (orbital, not trendy)
- [ ] Violet/gold color usage follows signal/energy semantics
- [ ] Responsive (works on mobile, tablet, desktop)
- [ ] Grain overlay visible and intentional
- [ ] TypeScript strict mode passes
- [ ] No `console.log` statements
- [ ] Tested on light and dark rendering
- [ ] Performance: doesn't cause layout shifts or janky scrolling

---

## 9. Reference Files to Include in Handoff

**Essential:**
- [ ] `/polynovea-web/` (entire directory)
- [ ] `/Master file.md` (company vision, modules, strategy)
- [ ] Brand visual document (color rationale, design philosophy)
- [ ] `/LIVE_PORTFOLIO_PAGE_SPEC.md` (existing patterns)
- [ ] `/PROJECTS_PAGE_SPEC.md` (structure reference)

**Optional:**
- [ ] `/ADMIN_UI_INTEGRATION_GUIDE.md` (for context on other UI work)
- [ ] `/CLOUD_STRATEGY.md` (for infrastructure context)

---

## 10. Known Constraints & Preferences

### Design Constraints
- No content changes (copy is fixed)
- Violet should be sparse (signal/AI states only, NOT default UI)
- Gold should feel like "energy" not "decoration"
- Blacks should feel layered/warm, not flat
- Motion should feel orbital/gravitational, NOT trendy/fast

### Budget & Scope
- AI token budget: ~40% per week (be focused, minimize back-and-forth)
- Scope: Design enhancement only (this session)
- Success metric: Website feels like "Observatory Intelligence" — cinematic, refined, signal-focused

### Questions for the Implementer
If unclear on anything:
1. Check the Master Operating Document (company vision)
2. Check the Brand Visual Document (design rationale)
3. Review existing components (Hero.tsx, HeroScene.tsx) for patterns
4. Ask: "Does this feel like a scientific observatory, not a startup?" — if no, reconsider

---

## 11. Success Criteria

✅ **Founder Constellation is:**
- Visually distinctive and matches site aesthetic
- Interactive without being distracting
- Uses gold/violet semantically (not decoratively)
- Tells the story of how five dimensions → PolyNovea
- Feels orbital/gravitational/scientific

✅ **Integration is:**
- Responsive (mobile, tablet, desktop)
- Fast (no layout jank, smooth animations)
- Accessible (keyboard navigation, alt text)
- TypeScript strict mode passes
- Zero `console.log` in production code

---

## 12. Contact & Questions

- **Original Designer:** [Claude]
- **Next Owner:** [Kimi/Codex/Assigned AI]
- **Context Sources:** Master Operating Document, Brand Visual Document, existing website files
- **Escalation:** If design direction conflicts with spec, refer back to "Observatory Intelligence" philosophy

---

**Last Updated:** May 12, 2026  
**Status:** Ready for handoff
