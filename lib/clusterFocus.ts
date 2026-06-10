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
