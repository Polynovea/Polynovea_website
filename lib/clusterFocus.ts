/**
 * Shared "where is the journey right now" math. Every in-world effect
 * (labels, ignition bursts, lens) derives from these two pure helpers so they
 * stay phase-locked to the single scroll scalar depthState.progress.
 */
import { depthState, SECTION_COUNT } from "@/lib/depthStore";

/**
 * Continuous journey position in cluster units (0 .. SECTION_COUNT-1).
 * Home: scroll progress. Subpages (ambient): the route's parked cluster.
 */
export function journeyPosition(): number {
  return depthState.sceneMode === "ambient"
    ? depthState.ambientIndex
    : depthState.progress * (SECTION_COUNT - 1);
}

/**
 * Focus of a given cluster: 1 when the camera is on it, easing to 0 a full
 * section away. `f` is the value from journeyPosition().
 */
export function clusterFocus(f: number, index: number): number {
  const t = Math.max(0, 1 - Math.abs(f - index));
  return t * t * (3 - 2 * t); // smoothstep
}

/**
 * Boundary takeover: 0..1 surge that swells as the camera crosses *between*
 * clusters (peaks at the mid-transition) and is 0 while parked on a section.
 * One shared scalar so the FOV punch, bloom flare and pulse surge all fire in
 * lockstep at the same instant. Journey mode only — subpages never take over.
 */
export function boundaryTakeover(): number {
  if (depthState.sceneMode === "ambient") return 0;
  const f = depthState.progress * (SECTION_COUNT - 1);
  const frac = f - Math.floor(f);
  const t = Math.max(0, 1 - Math.abs(frac - 0.5) * 4.2); // active ~[0.26, 0.74]
  return t * t * (3 - 2 * t); // smoothstep → a swell, not a spike
}
