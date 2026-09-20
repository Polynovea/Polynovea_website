/**
 * Frame-synced scroll state shared between the DOM depth-scroll system and
 * the WebGL camera rig. Mutable singleton by design: it is written and read
 * inside requestAnimationFrame loops where allocating new objects every frame
 * would defeat the purpose. Never read from React render paths.
 */

export const SECTION_COUNT = 8;

export type SceneMode = "journey" | "ambient";

/** A cluster's projected position on screen, normalized 0..1 (top-left origin). */
export interface ScreenPoint {
  x: number;
  y: number;
}

export interface DepthState {
  /** 0..1 across the whole journey */
  progress: number;
  /** 'depth' = z-axis pager (desktop), 'flow' = normal scroll (mobile / reduced motion) */
  mode: "depth" | "flow";
  /** 'journey' = scroll-driven camera (home), 'ambient' = parked drift (subpages) */
  sceneMode: SceneMode;
  /** which cluster the camera parks at in ambient mode */
  ambientIndex: number;
  /** set once the WebGL scene has rendered its first frame */
  sceneReady: boolean;
  /**
   * Each cluster's projected screen position (0..1), written every frame by the
   * WebGL scene and read by the DOM pager so cards can be "born" from the exact
   * spot in the network the camera arrives at. Preallocated; mutated in place.
   */
  clusterScreen: ScreenPoint[];
}

export const depthState: DepthState = {
  progress: 0,
  mode: "flow",
  sceneMode: "journey",
  ambientIndex: 0,
  sceneReady: false,
  clusterScreen: Array.from({ length: SECTION_COUNT }, () => ({ x: 0.5, y: 0.5 })),
};

export const SCENE_READY_EVENT = "polynovea:scene-ready";

/**
 * Each route parks the ambient camera at its own neural cluster, so client
 * navigation reads as a flight through the network to a new "place".
 */
export function routeClusterIndex(pathname: string): number {
  if (pathname === "/") return 0;
  if (pathname.startsWith("/architecture")) return 1;
  if (pathname.startsWith("/blog")) return 3;
  if (pathname.startsWith("/about")) return 4;
  if (pathname.startsWith("/projects")) return 5;
  if (pathname.startsWith("/research")) return 6;
  if (pathname.startsWith("/contact")) return 7;
  return 3; // unknown routes settle mid-network
}
