/**
 * Frame-synced scroll state shared between the DOM depth-scroll system and
 * the WebGL camera rig. Mutable singleton by design: it is written and read
 * inside requestAnimationFrame loops where allocating new objects every frame
 * would defeat the purpose. Never read from React render paths.
 */

export const SECTION_COUNT = 9;

export type SceneMode = "journey" | "ambient";

export interface DepthState {
  /** 0..1 across the whole journey */
  progress: number;
  /** true once the curtain reveal has begun opening (camera intro dolly) */
  revealOpen: boolean;
  /** 'depth' = z-axis pager (desktop), 'flow' = normal scroll (mobile / reduced motion) */
  mode: "depth" | "flow";
  /** 'journey' = scroll-driven camera (home), 'ambient' = parked drift (subpages) */
  sceneMode: SceneMode;
  /** which cluster the camera parks at in ambient mode */
  ambientIndex: number;
  /** set once the WebGL scene has rendered its first frame */
  sceneReady: boolean;
}

export const depthState: DepthState = {
  progress: 0,
  revealOpen: false,
  mode: "flow",
  sceneMode: "journey",
  ambientIndex: 0,
  sceneReady: false,
};

export const SCENE_READY_EVENT = "polynovea:scene-ready";
export const REVEAL_OPEN_EVENT = "polynovea:reveal-open";

/**
 * Each route parks the ambient camera at its own neural cluster, so client
 * navigation reads as a flight through the network to a new "place".
 */
export function routeClusterIndex(pathname: string): number {
  if (pathname === "/") return 0;
  if (pathname.startsWith("/architecture")) return 1;
  if (pathname.startsWith("/cappella")) return 2;
  if (pathname.startsWith("/blog")) return 3;
  if (pathname.startsWith("/about")) return 4;
  if (pathname.startsWith("/projects")) return 5;
  if (pathname.startsWith("/live-portfolio")) return 6;
  if (pathname.startsWith("/research")) return 7;
  if (pathname.startsWith("/contact")) return 8;
  return 3; // unknown routes settle mid-network
}
