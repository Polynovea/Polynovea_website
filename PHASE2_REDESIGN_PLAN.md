# Phase 2 Redesign: Heatmap/Grid foundation, density blooms, signal pulses, sparse data readouts

_Written 2026-06-11. Supersedes the visual direction (not the architecture) of Phase 2 in
IMMERSION_HANDOFF.md / WEBSITE_IMMERSION_PLAN.md._

## Context

The previously-shipped Phase 2 (`ClusterIgnite` particle bursts + `WorldLabels` giant
chapter-title text) doesn't match the direction the team has now settled on. This redesign
replaces the "abstract icosahedron spheres + giant floating titles" look with a
**behavioral-data-surface** aesthetic:

- **#1 (highest leverage):** a receding geometric grid plane as the scene's floor, with the
  existing node clusters reframed as glowing **density blooms** (heat-style hotspots) instead
  of faceted spheres. Evolves the current cluster layout — same data, same camera path —
  rather than tearing it down. Also fixes the earlier "nodes look off/too big" complaint,
  since soft glows read better at scale than discrete icosahedrons.
- **#3:** reskin `Pulses.tsx` (signal packets traveling synapse edges) as elongated
  **signal/waveform** streaks instead of plain spheres. Near-zero new architecture — same
  instanced-mesh-per-edge animation loop, different geometry + a brightness oscillation for
  the "waveform" feel.
- **#4:** **sparse floating data readouts** (drei `<Html>`) near 2–3 cluster centers only —
  small monospace strings like `state: engaged · confidence: 0.94 · intent: purchase`. Gives
  concrete "this glow is a measured human state" meaning without competing with DOM copy.
  Home-journey only, focus-gated like `WorldLabels`.

`ClusterIgnite` (particle ignition bursts) and `WorldLabels` (now home-only after the
2026-06-11 fix) are **left as-is** — they're complementary effects, not part of this
redesign. `TheatreCamera`, `networkData.ts` (node/edge/cluster generation), and the camera
path are **unchanged**.

## Implementation

### 1. New file: `components/three/HeatGrid.tsx`
A single horizontal plane (`PlaneGeometry`, rotated -90° on X) acting as a "data floor"
beneath the node field (node Y ranges roughly ±5.6, so place at `y = -7`). Covers the full
journey's Z range (`clusterZ(8) - 12` to `FIRST_CLUSTER_Z + 12`, i.e. roughly `-100` to `38`)
and X range (`±24`, matching interstitial node spread).

- Custom `THREE.ShaderMaterial`:
  - Fragment shader draws anti-aliased grid lines via `fract(worldPos.xz / cellSize)` +
    `fwidth` (standard technique — no external deps).
  - Manual exponential fog matching the scene fog (`#0a0912`, density `0.02`) computed from
    `length(cameraPosition - worldPos)`, since raw `ShaderMaterial` doesn't get three's
    built-in fog automatically.
  - Base grid color: violet (`#7C3AED`) at very low opacity (~0.07–0.10), `NormalBlending`,
    `depthWrite={false}`, `transparent` — matches the "normal blending only" TDR-safety rule
    from `IMMERSION_HANDOFF.md`.
  - **Heat tie-in**: pass a `uFocus[SECTION_COUNT]` uniform array (same pattern as
    `ClusterIgnite.tsx`), updated per-frame via `journeyPosition()` + `clusterFocus()` from
    `lib/clusterFocus.ts`. In the fragment shader, brighten grid cells near each
    `clusterCenter(i)`'s XZ position toward a warm gold (`#E6D3A3`) tint, scaled by
    `uFocus[i]` — the floor "lights up" under the cluster the camera is arriving at.
- Mounted once in `NeuralScene.tsx`, before `<Network>`.

### 2. `components/three/Network.tsx` — node rendering rewrite (density blooms)

Keep `networkData.ts`, edges (`lineSegments`), and cluster glow sprites as-is structurally,
but:

- Replace the two `instancedMesh` + `icosahedronGeometry` blocks (violet "structure" nodes
  and gold "signal" nodes) with **two `THREE.Points` clouds** using a shader pattern adapted
  from `ClusterIgnite.tsx`:
  - Attributes: `position` (node position), `aScale` (from `node.scale`), `aColorT`
    (per-node hue-lerp factor, replacing the current `(i % 7) * 0.09` color variation), and
    for gold nodes an `aPhase` attribute (replacing the per-frame `Math.sin(t*1.4+phase)`
    breathing — now driven in the vertex shader via `uTime`).
  - Vertex shader: `gl_PointSize` from `aScale` with the same depth-attenuation clamp
    pattern as `ClusterIgnite` (`clamp(... * (K / depth), 0, MAX)`), so blooms shrink
    realistically with distance but never spike (TDR-safe).
  - Fragment shader: same soft radial falloff (`smoothstep` circle) as `ClusterIgnite.FRAG`,
    giving a glow/bloom look instead of a faceted sphere. Violet cloud uses the existing
    `VIOLET`/`VIOLET_DEEP` lerp range; gold cloud uses `GOLD` with the existing breathing
    pulse now in `gl_PointSize` instead of mesh scale.
  - `NormalBlending`, `depthWrite={false}`, `transparent` (consistent with the TDR-safety
    rule — these are the densest objects in the scene).
- Cluster glow sprites: keep the existing `<sprite>` + radial-gradient-texture blocks, but
  make their `opacity` reactive — multiply the existing base opacity (`0.07`/`0.12`) by
  `(0.6 + 0.4 * clusterFocus(journeyPosition(), i))` each frame via a small `useFrame`, so
  the haze brightens as the camera arrives (reusing `journeyPosition`/`clusterFocus`,
  already imported elsewhere).

### 3. `components/three/Pulses.tsx` — signal/waveform reskin

- Geometry: swap `sphereGeometry(1, 8, 8)` for a thin elongated shape stretched along the
  travel direction — e.g. `cylinderGeometry(0.02, 0.02, 1, 6)` (or a stretched
  `boxGeometry`), default-oriented along Y, rotated to align with the edge direction via
  `dummy.quaternion.setFromUnitVectors(Y_AXIS, edgeDir.normalize())` each frame (edge
  direction is static per pulse-edge, can compute once when `p.edge` changes).
- Length: scale Y by edge length × a fraction (e.g. `0.18`) so it reads as a short streak,
  not the full edge.
- "Waveform" feel: keep the existing `flare` calculation but apply it to **emissive
  brightness** via `instanceColor` (lerp `#F5E9C8` brightness by `flare`) rather than just
  uniform scale — gives a pulsing-signal look. `meshBasicMaterial` already has
  `toneMapped={false}`; add `vertexColors` via `instanceColor`.
- Same `instancedMesh` + per-frame `useFrame` loop — no new architecture.

### 4. New file: `components/three/DataReadouts.tsx`

- Uses `@react-three/drei`'s `<Html>` (already a project dependency via drei 10.7.7; `Text`
  from drei is already used in `WorldLabels.tsx`).
- 3 sparse readouts at clusters **1** ("THE SYSTEM" / architecture), **5** ("PROJECTS"), **7**
  ("QUESTIONS" / research) — picked because they're the "intelligence layer" sections where a
  measured-behavior readout makes thematic sense, and they're spread across the journey for
  rhythm.
- Mock copy (static per cluster, illustrative — easy to retune later):
  - Cluster 1: `signal: live · nodes: 1,204 · latency: 42ms`
  - Cluster 5: `state: engaged · confidence: 0.94 · intent: purchase`
  - Cluster 7: `pattern: detected · drift: 0.02 · model: v0.3`
- Each `<Html>` positioned at `clusterCenter(i) + small offset` (offset to one side so it
  doesn't collide with the `WorldLabels` title or DOM body cards), `center`,
  `pointer-events: none`, monospace font stack, low opacity driven the same way as
  `WorldLabels`: opacity = `focus * MAX_OPACITY` updated in a `useFrame` via a ref to the
  wrapper div.
- Same gating as the just-fixed `WorldLabels`: hidden when `depthState.sceneMode !==
  "journey"` (home only), visible only when `clusterFocus(journeyPosition(), index) >
  threshold`.
- Style: small (~11px), `letter-spacing`, color violet (`--accent-intelligence`-ish) or gold
  (`--accent-authority-muted`) depending on cluster, max opacity ~0.35 (slightly higher than
  `WorldLabels`' 0.22 since these are small/sparse and meant to be noticed, not pure
  ambience).

### 5. `components/three/NeuralScene.tsx`

- Import and mount `<HeatGrid />` (before `<Network>`) and `<DataReadouts />` (alongside
  `<WorldLabels>`), both `lowPower`-aware where relevant (e.g. `HeatGrid` can reduce plane
  segment count on `lowPower`).

## Phase status

| Item | What | Status |
|---|---|---|
| 1 | HeatGrid floor + density-bloom nodes + reactive cluster glow | ⬜ in progress |
| 3 | Pulses signal/waveform reskin | ⬜ in progress |
| 4 | Sparse DataReadouts (clusters 1, 5, 7) | ⬜ in progress |
| — | ClusterIgnite, WorldLabels, TheatreCamera, networkData | unchanged |

## Verification

1. `node scripts/capture-check.mjs` — confirm `ERROR_COUNT: 0` and the home + section-1
   screenshots show the new grid floor, glowing density blooms instead of faceted spheres,
   and a streak-style pulse.
2. Adapt the subpage-check approach (fresh Playwright/SwiftShader page to a subpage) to
   confirm `DataReadouts` and `HeatGrid`'s focus-brightening don't leak onto subpages
   incorrectly (grid is fine site-wide; readouts must be home-only like `WorldLabels`).
3. Visual check at clusters 1, 5, 7 (scroll progress ≈ 1/8, 5/8, 7/8) for readout
   placement/legibility against DOM copy.
4. Keep an eye on the TDR-safety rules from `IMMERSION_HANDOFF.md`: all new emissive/additive
   layers stay `NormalBlending` and below bloom `luminanceThreshold` (0.34).
