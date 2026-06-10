# Immersion Build — Session Handoff

_Written 2026-06-10. Read this first when resuming._

## TL;DR (the one thing to know)

**The code is NOT broken.** The white background + `Cannot read properties of null
(reading 'alpha')` errors you saw are a **browser-side WebGL context failure**
(GPU TDR + context exhaustion) from a very long dev session — NOT a code bug.

**Proof:** rendering the home page in a fresh **SwiftShader** (software-GL) context
via `scripts/capture-check.mjs` produced a correct dark scene, working depth pager,
and **zero console errors** (`scripts/shots/check-home.jpg`, `check-section1.jpg`).

**Do this first when you resume:**
1. **Fully quit Chrome** (not just refresh — quit the whole browser) to release all
   leaked WebGL contexts and let the GPU driver fully recover.
2. **Restart the dev server** (`Ctrl+C`, then `npm run dev`).
3. Open a **single** fresh tab to `http://localhost:3000`. The scene will be back.

---

## What the error actually means

`reading 'alpha'` is thrown at `NeuralScene.tsx:57` (`<Canvas>`) and `:89`
(`<EffectComposer>`) because three.js calls `gl.getContextAttributes()` and gets
**`null`** — i.e. the browser refused to create a WebGL context. Causes:

- **Context exhaustion:** browsers cap ~16 live WebGL contexts. Each HMR reload of
  the 3D canvas during dev can leak one. After dozens of edits this session, the cap
  was hit → new contexts return null → `alpha` error; existing ones get force-killed
  → white screen everywhere.
- **GPU TDR (Windows):** the earlier 200px additive particles × bloom tripped the
  Windows GPU watchdog, resetting the driver and killing every context at once. That
  trigger is now fixed (particles are clamped + normal-blended), but a driver left in
  a bad state stays bad until a full browser/GPU reset.

**This does not happen in production** (no HMR, no repeated canvas remounts).

---

## How to verify from now on (IMPORTANT)

Do **not** trust the in-IDE preview tab or manual refreshes for the 3D scene — the
preview tab runs hidden, which pauses `requestAnimationFrame`, so the scene/GSAP/
Theatre never animate there and screenshots time out.

**Use the headless SwiftShader capture instead** — fresh, GPU-independent context
every run, immune to TDR/exhaustion:

```bash
# dev server must be running on :3000
node scripts/capture-check.mjs
# → writes scripts/shots/check-home.jpg + check-section1.jpg, prints ERROR_COUNT
```

If `ERROR_COUNT: 0` and the JPGs look right, the code is good regardless of what your
live Chrome is doing. This is the source of truth.

---

## ⚠️ Do this before anything else: COMMIT A BASELINE

The **entire 3D system is currently uncommitted** (untracked in git): `components/three/`,
`components/depth/`, `components/panes/`, `lib/depthStore.ts`, `lib/theatre.ts`,
`lib/clusterFocus.ts`, `ExperienceLayer`, `HomeExperience`, `PageReveal`, etc. The last
commit (`2e84b3d`) predates the whole overhaul. **There is no clean rollback point.**

Once the scene is confirmed working (via the capture script), **commit it** so there's
a safe baseline before continuing:
```bash
git add -A && git commit -m "feat: immersive WebGL home (neural scene, depth pager, theatre camera, ignition + labels)"
```

---

## What changed this session (inventory + how to revert each)

### New files (the immersion layer added this session)
| File | Purpose | Revert = delete + unwire |
|---|---|---|
| `lib/theatre.ts` | Theatre.js project/sheet + authorable camera overlay + opt-in Studio (`?studio`) | remove import in `TheatreCamera.tsx` |
| `components/three/TheatreCamera.tsx` | Camera (1:1 port of `CameraRig`) + Theatre overlay | swap back to `CameraRig` in `NeuralScene.tsx` |
| `components/three/ClusterIgnite.tsx` | Particle bloom at active cluster (normal-blended, TDR-safe) | remove from `NeuralScene.tsx` |
| `components/three/WorldLabels.tsx` | Floating chapter titles (normal-blended) | remove from `NeuralScene.tsx` |
| `lib/clusterFocus.ts` | `journeyPosition()` / `clusterFocus()` shared math | used by the two above |
| `WEBSITE_IMMERSION_PLAN.md` | Full phased build spec | — |
| `scripts/capture-check.mjs` | Headless render + error check (keep this!) | — |

### Modified files
- `components/three/NeuralScene.tsx` — added `<ClusterIgnite>`, `<WorldLabels>`, swapped
  `CameraRig`→`TheatreCamera`, and added a **`webglcontextlost` preventDefault handler**
  in `onCreated` (auto-recovers from a GPU reset instead of staying white).
- `app/globals.css` — strengthened the `.depth-pane::before` legibility lens.
- `components/About.tsx` — (earlier) bottom fade into footer (fixed the seam discontinuity).
- `components/panes/ContactPane.tsx` — (earlier) flex so the footer strip isn't clipped.
- `components/three/networkData.ts` — (earlier) reduced node sizes.
- `components/Hero.tsx`, `components/Navbar.tsx` — (earlier) reveal "assembly" animation.
- `package.json` / lockfile — added `@theatre/core`, `@theatre/studio`.

### Dependency check (verified OK — not the cause)
`three@0.184.0`, `@react-three/fiber@9.6.1`, `@react-three/drei@10.7.7`,
`@react-three/postprocessing@3.0.4`, `postprocessing@6.39.1`. All mutually compatible
(`postprocessing` peer is `three >= 0.168 < 0.185`; 0.184 is in range). The Theatre
install did **not** bump three. The `THREE.Clock deprecated` log is benign.

---

## Phase status

| Phase | What | Status |
|---|---|---|
| 1 | Theatre.js camera foundation | ✅ done, verified, non-destructive |
| 2 | ClusterIgnite + WorldLabels | ✅ done, TDR-safe (normal blending) |
| 3a | Legibility lens | ✅ done |
| 3b | DOM body cards anchored to cluster screen-positions, assemble/disperse on `clusterFocus` | ⬜ next |
| 4 | Boundary takeovers (FOV punch + pulse surge; conditional DepthOfField) | ⬜ |
| 5 | Behavioral cursor (heat trail + live readout) | ⬜ |
| 6 | Perf + a11y hardening (PerformanceMonitor adaptive DPR, dispose on unmount, reduced-motion, aria text equivalents for WebGL copy) | ⬜ |

### Tuning knobs (single-line, if visuals need adjusting)
- Labels: `MAX_OPACITY` in `WorldLabels.tsx` (currently 0.22).
- Particles: `perCluster` count + `gl_PointSize` clamp + `vAlpha` in `ClusterIgnite.tsx`.
- **Rule:** keep any new emissive/additive **below bloom `luminanceThreshold` (0.34)**
  and prefer **normal blending** for particle layers — additive × bloom is what tripped TDR.

---

## Theatre.js caveats (so the next session doesn't re-discover them)
- `@theatre/r3f` is **R3F-v8 only** → we use `@theatre/core` + `@theatre/studio` and apply
  values to the camera manually.
- Authoring is **GUI-only** in Studio (open `localhost:3000/?studio`); there's no clean
  code API for keyframes. After authoring, export state and replace the `EMPTY_STATE`
  placeholder in `lib/theatre.ts`.
- An empty `state` (`{sheetsById:{},definitionVersion:"0.4.0",revisionHistory:[]}`) is
  seeded to silence Theatre's "state empty" warning that Next escalates to a blocking overlay.

---

## Recommended next-session order
1. Restart browser + dev server; run `node scripts/capture-check.mjs`; confirm clean.
2. **Commit the baseline.**
3. Add Phase 6's robustness FIRST (it prevents the recurring pain): dispose GL on unmount,
   `PerformanceMonitor` adaptive DPR, and a visible fallback if context creation fails.
4. Then Phase 3b (DOM card-birth) — verify each section via the capture script.
