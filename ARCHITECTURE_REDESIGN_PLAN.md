# Architecture Page Redesign Plan

_Written 2026-06-11. Target: `app/architecture/page.tsx` → `components/ArchitectureDeepDive.tsx`._
_Design DNA mined (Haiku agent) from 5 references; north star **Vivid+Co**, with
**Active Theory** (hairline structure) and **Dala** (single-accent discipline)._

## Why the current page reads as generic

1. **Rainbow accents.** Four milestone hues — violet `#7C3AED`, amber `#FBBF24`,
   cyan `#06B6D4`, pink `#EC4899` — plus a violet→cyan→pink timeline beam. This
   fights Polynovea's disciplined **violet + gold** identity and is the single
   biggest "cheap" tell.
2. **Decorative layers competing with the WebGL scene.** The hero stacks an
   animated `aurora` gradient blob + a `dots` grid on top of the (ambient) neural
   scene — two backgrounds doing the same job, neither well.
3. **Cramped vertical rhythm.** Sections run together; no editorial breathing room.
4. **Soft default cards.** 16px radius + faint fills read as generic SaaS, not
   technical/behavioral-intelligence.

## Design principles to apply (via EXISTING tokens — no new fonts)

- Fonts stay `--font-display: "Clash Display"` + `--font-body: "Inter"`.
- **Single accent system:** violet `--accent-intelligence` (#7C3AED) as the one
  structural accent; gold `--accent-authority` (#E6D3A3) as sparse warm
  punctuation (layer numerals / section labels). **Drop amber/cyan/pink entirely.**
  The four layers differentiate by **numeral + label + position**, not by hue.
- **Hairline structure, flat depth** (Active Theory): cards become transparent with
  a 1px violet hairline (`rgba(124,58,237,0.22)`), radius `--radius-sm`→`md` (4–8px),
  **no drop shadows** — depth comes from the scene + borders + type scale.
- **Editorial rhythm** (Vivid+Co): `--space-5xl` (120px) between major sections;
  each of the four layers gets its own full-width moment.
- **Instrument micro-labels** (Dala / Active Theory / Max Yinger): stage labels,
  flow lines, and module "Output:" use **monospace, uppercase, tracked** for the
  behavioral-intelligence / telemetry feel. (Adds one mono fallback stack —
  `ui-monospace, "SF Mono", monospace` — no web font.)

## Concrete changes

### 1. Hero — restrained editorial, scene-forward
- **Remove** `.hero-aurora` and `.hero-dots`. Let the ambient WebGL scene be the
  only backdrop; keep `.hero-fade` bottom gradient for legibility into section 1.
- Keep the big `Clash Display` headline ("From behavior → to ownership.") but
  tighten: left-aligned, `clamp(56px, 8vw, 116px)`, line-height 0.95, tracking
  −0.03em. Drop the white→violet gradient text fill in favor of solid
  `--text-primary` with **"ownership." in gold** — one deliberate accent, not a wash.
- Replace the multi-color chips with 4 **hairline** chips: mono numeral `01–04`
  + label, violet hover only (no per-chip color var).

### 2. Milestone timeline — the centerpiece
- **Beam recolor:** violet→gold single gradient (drop cyan/pink).
- Each layer entry becomes an editorial block:
  - Oversized **ghost numeral** (01–04) intentionally placed (large, low-opacity
    violet/gold outline) as the layer anchor — make the existing faint `entry-num`
    a deliberate design element, not an afterthought.
  - **Stage label** → mono, uppercase, tracked, gold.
  - **Title** → Clash Display `clamp(32px, 4vw, 56px)`, tracking −0.02em.
  - **Summary** → constrained 620px measure.
  - **Module cards** → 3-col hairline grid; the violet left-edge bar stays (single
    color now); expand/hover interaction kept; **"Output:"** line → mono.
  - **Flow line** footer → mono, tracked.
- Section gap between layers → `--space-5xl` (120px).

### 3. Applied Surfaces
- Drop the amber surface color; both tabs use violet active state + gold eyebrow.
- Tabs + card → hairline treatment, mono step labels (M1–M4).

### 4. Intelligence Flow ("sankey")
- Keep the 8-step signal→leverage concept; reskin as a refined hairline rail:
  mono two-digit numerals, single violet connectors (replace `--border-muted`
  arrows with violet), tighter type. Reads as a data pipeline, not 8 grey boxes.

### 5. CTA
- Minor: align to hairline + single-accent system; keep existing buttons.

### 6. Page shell
- Keep `arch-page` translucent over the scene; remove competing decorative
  gradients. Ensure consistent translucent surface (same lesson as the Cappella fix).

## Out of scope (this pass)
- The separate `ArchitectureVisualization.tsx` 3D flow-nodes component (not mounted
  on this page; leave as-is).
- Content/copy rewrites — structure & visuals only; text stays.

## Verification
- Typecheck green; `node scripts/capture-check.mjs` style real-context screenshot
  of the architecture route (0 console errors).
- Visual review at desktop + mobile widths (the page is DOM/framer-motion, so the
  in-IDE preview renders it fine — unlike the rAF-throttled home scene).
- Confirm single-accent discipline: no amber/cyan/pink remain (grep the file).
