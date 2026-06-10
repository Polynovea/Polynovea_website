# Polynovea — Cinematic Immersion Build

Status: **Phase 1 in progress** · Owner started: 2026-06-10

This is the build spec for evolving the home/site WebGL experience from
"flat glass cards floating over a neural network" into a **cinematic, immersive
experience where the information cards are born from the scene itself.**

It is written so that later, repetitive phases (per-section card work) can be
handed to a cheaper model (Codex/Kimi) with enough context to execute cold.

---

## 0. Decisions locked

| Decision | Choice | Why |
|---|---|---|
| Card integration | **Hybrid** — 3D in-world headlines/labels (troika/drei `Text`) + DOM for body copy & forms | Maximum immersion on the parts that read as "world", while keeping the contact form interactive, editable, accessible |
| Cinematic camera | **Theatre.js (core + studio, NOT `@theatre/r3f`)** | `@theatre/r3f@0.7` only supports R3F v8; project is on **R3F v9 / React 19**. Core is framework-agnostic and drives our existing procedural camera cleanly |
| Scope | **Full phased build** | Ship the whole experience, phase by phase |
| Scroll system | **KEEP the bespoke rig** (`DepthRoot` + GSAP ScrollTrigger snap + `depthState.progress` + Lenis). **Do NOT adopt drei `ScrollControls`** | Research confirms ScrollTrigger + ScrollControls conflict (camera stutter). Our rig already works |

## 0.1 Hard constraints (do not violate)

- **R3F v9 / React 19 / Next 16 (Turbopack).** No libs that peer-dep R3F v8.
- **Theatre Studio is dev-only.** Must be tree-shaken/guarded out of production
  (`process.env.NODE_ENV !== "production"`), or the editor UI ships to users.
- **Performance floor:** 60fps desktop, smooth on `lowPower` (mobile / ≤4 cores).
  Every heavy feature needs a `lowPower` + `prefers-reduced-motion` off-ramp.
  Both branches already exist in the codebase — extend them, don't reinvent.
- **Legibility:** body copy must stay readable. The flat veils
  (`About.tsx` 62%, `.depth-pane::before` scrim) get replaced by a *focused*
  legibility lens on the active card, not a global dim.

---

## 1. Architecture

### 1.1 The layers (z-order, back to front)
1. **WebGL scene** (`NeuralScene`, fixed, z-index 0) — network, particles, pulses, postFX.
2. **In-world 3D text** — section headlines/labels rendered *inside* the Canvas
   (troika via drei `Text`), occluding/occluded by the network.
3. **DOM panes** (`DepthRoot` depth-pager, z-index 1) — body copy, lists, forms.
4. **Reveal curtain / navbar / cursor** (top).

### 1.2 The single source of truth: `depthState.progress`
Already exists. `DepthRoot` writes `progress` (0..1 across the 9-section journey)
every frame from scroll. **Everything cinematic reads from it:**
- Theatre sequence playhead position = `progress * sequenceDuration`.
- Active cluster index = `round(progress * (SECTION_COUNT-1))`.
- Cluster ignition amount, legibility lens focus, boundary-takeover surges.

This keeps Theatre, the camera, the DOM pager, and the shaders all phase-locked
to one scalar with **no competing scroll authorities.**

### 1.3 Theatre.js wiring (core-only pattern)
```
lib/theatre.ts         -> creates project + main sheet, lazy-loads studio in dev
components/three/
  TheatreCamera.tsx     -> a perspective camera whose transform is driven by a
                           Theatre object; in useFrame we set
                           sheet.sequence.position = progress * DURATION,
                           then copy the Theatre-animated values onto the camera.
```
- `getProject("Polynovea").sheet("Journey")` holds keyframed camera props
  (position x/y/z, lookAt target, fov, plus custom channels like `bloom`, `dof`).
- In dev, `studio.initialize()` + `studio.extend` gives the drag-keyframe editor.
  Author the camera path once, export the `state.json`, ship that; studio never
  loads in prod.
- `CameraRig` (current procedural lerp) is **replaced** by `TheatreCamera` but the
  *input* stays `depthState.progress`, so `DepthRoot`/snap/Lenis are untouched.

### 1.4 The "card born from the network" model (the signature beat)
For each section cluster:
1. As `progress` approaches cluster *i*, its nodes **ignite** — a particle burst
   (vertex-morph + dissolve shader) rises and coalesces into a faint panel-shaped
   glow at the cluster's projected screen position.
2. The **3D headline** (troika `Text`) resolves out of that glow (dissolve-in).
3. The **DOM body card** assembles in front of it (the GSAP assembly we already
   started in Hero/Navbar), anchored to the projected cluster position.
4. On exit, the headline dissolves out and the particles disperse back into the
   network. Content literally returns to the field.

Reusable primitives:
- `ClusterIgnite` (WebGL): particle burst + panel glow, `amount` 0..1 driven by
  proximity of `progress` to the cluster.
- `WorldHeadline` (WebGL): troika `Text` with a dissolve shader, `reveal` 0..1.
- `useClusterFocus(index)` (hook): returns 0..1 focus for a given cluster from
  `depthState.progress` — the one knob every per-section effect subscribes to.

### 1.5 Legibility lens
Replace flat veils with a **focused dim**:
- Option A (cheap, default): a radial scrim *sprite/quad* centered on the active
  cluster's projected position, opacity ramped by focus — dark pool behind the
  card, scene bright at edges.
- Option B (cinematic, takeover-only): `@react-three/postprocessing`
  `DepthOfField`, enabled *only* during boundary takeovers, focal target = active
  cluster. Never always-on (perf).

### 1.6 Boundary takeovers
At cluster crossings (`fract(progress*(N-1))` near 0.5):
- Pulse surge down the spine (reuse `Pulses`), bloom flare (lerp bloom intensity),
  slight camera FOV punch (a Theatre channel), brief lens widening.
Authored as Theatre channels so they're keyframed, not hand-coded per section.

### 1.7 Cursor = tracked behavior (brand hook)
- `behaviorStore`: cursor velocity, dwell, a smoothed "confidence/engagement"
  scalar. Cheap, rAF-sampled, singleton like `depthState`.
- Feeds: heat-trail layer (additive sprites along recent cursor path), pulse
  intensity, and a sparse live readout (`state · confidence · intent`) near 1–2
  clusters. Off in `lowPower` / reduced-motion.

---

## 2. Phased task list

Each phase ends with a visible, demoable result and a verification step.
(Note: screenshots can't be auto-captured here — the preview tab is hidden and
pauses rAF. Verify via DOM/state measurement + the user's foregrounded browser.)

### Phase 1 — Foundation: Theatre.js + camera (THIS PASS)
- [ ] `lib/theatre.ts`: project + "Journey" sheet; dev-only studio init guard.
- [ ] `components/three/TheatreCamera.tsx`: camera driven by Theatre object;
      `sequence.position = depthState.progress * DURATION` each frame.
- [ ] Swap `CameraRig` → `TheatreCamera` in `NeuralScene`, keeping the warm
      gold light follow behavior.
- [ ] Seed a `state.json` with the current camera path (per-cluster keyframes)
      so prod has a baseline without studio.
- [ ] Verify: journey still scrolls, camera still visits clusters, no scroll
      regressions; studio absent in a prod build.

### Phase 2 — Cluster ignition + world headlines (hybrid cards, visual half)
- [ ] `ClusterIgnite` particle/dissolve component; `useClusterFocus` hook.
- [ ] `WorldHeadline` (troika `Text` + dissolve) for each section's title/label.
- [ ] Move section *headlines* from DOM panes into `WorldHeadline`s; DOM panes
      keep body copy/lists/forms (the hybrid split).
- [ ] Verify: headline dissolves in/out per section, anchored to cluster.

### Phase 3 — DOM card birth + legibility lens
- [ ] Anchor DOM body cards to projected cluster positions; assemble/disperse
      synced to `useClusterFocus` (extends the Hero/Navbar GSAP assembly).
- [ ] Replace flat veils with the radial legibility lens (1.5 Option A).
- [ ] Verify: body text readable at every section; cards feel "born".

### Phase 4 — Boundary takeovers + postFX
- [ ] Theatre channels for FOV punch + bloom flare; pulse surge at crossings.
- [ ] Conditional `DepthOfField` during takeovers only.
- [ ] Verify: 60fps held through a takeover; no always-on DOF.

### Phase 5 — Behavioral cursor layer
- [ ] `behaviorStore` + heat-trail + sparse live readout.
- [ ] Wire into pulse intensity.
- [ ] Verify: reacts to cursor; fully off in lowPower/reduced-motion.

### Phase 6 — Performance + a11y hardening
- [ ] `PerformanceMonitor` adaptive DPR; dispose geometries/materials on unmount.
- [ ] `gsap.matchMedia()` reduced-motion: no camera travel, instant card fades.
- [ ] Keyboard focus on DOM cards; ensure 3D headlines have DOM aria equivalents
      (visually-hidden `<h2>` in the pane for SEO/screen readers).
- [ ] Confirm Studio excluded from prod bundle; Lighthouse/Core Web Vitals pass.

---

## 3. Watch-outs (carried from research, filtered for our stack)
- **Do NOT** add drei `ScrollControls` (conflicts with our ScrollTrigger snap).
- **Do NOT** use `@theatre/r3f` (R3F v8 peer; we're on v9).
- 3D `Text` (troika) is a texture → not interactive; keep links/forms in DOM.
- Postprocessing DOF/bloom flare are expensive → takeover-only, never per-frame.
- Each DOM card mounted via projection = a React render; keep counts low, reuse.
- Always provide an aria/SEO text equivalent for any copy that lives in WebGL.

## 4. Handoff notes (for cheaper-model execution of Phases 2–5)
- The repeating unit is **one section** = `{ ClusterIgnite, WorldHeadline, DOM body
  card }` all subscribed to `useClusterFocus(index)`. Build the pattern once for
  section 1 (architecture), then sections 2–8 are parameterized copies.
- Content lives in the existing pane components (`panes/*`, `Hero`, `Contact`,
  `WhyDifferent`, `FAQ`). Hybrid split = move the `<h1/h2>` text into a
  `WorldHeadline`, leave everything else.
- Single knob to learn: `depthState.progress`. Everything derives from it.
