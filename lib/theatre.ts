/**
 * Theatre.js wiring (core + studio, NOT @theatre/r3f).
 *
 * @theatre/r3f@0.7 only peer-supports react-three-fiber v8; this project is on
 * R3F v9 / React 19, so we use the framework-agnostic core and apply animated
 * values to the three.js camera ourselves (see TheatreCamera).
 *
 * Theatre is layered as an *authorable overlay* on top of the existing
 * procedural camera: at default values the camera behaves exactly as before.
 *
 * IMPORTANT: Theatre.js IProject/ISheet objects have circular parent/children
 * references in their internal reactive graph. React 19's dev overlay
 * serializes component context with JSON.stringify, which hits those circular
 * refs and crashes. To prevent this, ALL Theatre.js object creation is gated
 * behind the studio opt-in check. When studio is not active, Theatre.js never
 * creates any objects and remains inert.
 */
import { getProject, types } from "@theatre/core";

/** Sequence length in seconds. progress 0..1 maps to position 0..DURATION. */
export const JOURNEY_DURATION = 10;

const PROJECT_NAME = "Polynovea";
const SHEET_NAME = "Journey";

const OFFSET_RANGE = { range: [-20, 20] as [number, number] };

const EMPTY_STATE = {
  sheetsById: {},
  definitionVersion: "0.4.0",
  revisionHistory: [],
} as const;

let project: ReturnType<typeof getProject> | null = null;
let cameraObject: ReturnType<typeof createCameraObject> | null = null;
let studioStarted = false;
let studioActive = false;

/** Returns true only when the ?studio flag or localStorage key is set. */
export function isStudioMode(): boolean {
  if (typeof window === "undefined") return false;
  return (
    new URLSearchParams(window.location.search).has("studio") ||
    window.localStorage.getItem("theatreStudio") === "1"
  );
}

function getJourneyProject() {
  if (!project) {
    project = getProject(PROJECT_NAME, { state: EMPTY_STATE as never });
  }
  return project;
}

function getJourneySheet() {
  return getJourneyProject().sheet(SHEET_NAME);
}

function createCameraObject() {
  return getJourneySheet().object("Camera", {
    fov: types.number(58, { range: [20, 100] }),
    offset: {
      x: types.number(0, OFFSET_RANGE),
      y: types.number(0, OFFSET_RANGE),
      z: types.number(0, OFFSET_RANGE),
    },
    lookOffset: {
      x: types.number(0, OFFSET_RANGE),
      y: types.number(0, OFFSET_RANGE),
      z: types.number(0, OFFSET_RANGE),
    },
  });
}

export interface CameraOverlay {
  fov: number;
  offset: { x: number; y: number; z: number };
  lookOffset: { x: number; y: number; z: number };
}

export const DEFAULT_OVERLAY: CameraOverlay = {
  fov: 58,
  offset: { x: 0, y: 0, z: 0 },
  lookOffset: { x: 0, y: 0, z: 0 },
};

/**
 * Subscribe to camera overlay value changes from Theatre.
 * Returns a no-op unsubscribe if studio is not active.
 */
export function subscribeCameraOverlay(
  cb: (v: CameraOverlay) => void
): () => void {
  if (!studioActive) return () => {};
  if (!cameraObject) cameraObject = createCameraObject();
  return cameraObject.onValuesChange((v) => cb(v as unknown as CameraOverlay));
}

/**
 * Advance the Theatre sequence playhead to match scroll progress.
 * No-ops if studio is not active — avoids creating Theatre objects on every frame.
 */
export function setSequencePosition(journeyT: number): void {
  if (!studioActive) return;
  getJourneySheet().sequence.position = journeyT * JOURNEY_DURATION;
}

/**
 * Mount the Theatre Studio authoring UI. Opt-in and dev-only: it only loads when
 * the page is opened with `?studio` (or localStorage `theatreStudio=1`), so the
 * editor never covers normal dev view and never ships to production.
 */
export async function startStudio(): Promise<void> {
  if (process.env.NODE_ENV === "production") return;
  if (studioStarted || typeof window === "undefined") return;
  if (!isStudioMode()) return;

  studioStarted = true;
  studioActive = true;
  try {
    const studio = (await import("@theatre/studio")).default;
    studio.initialize();
  } catch (err) {
    studioStarted = false;
    studioActive = false;
    console.error("Theatre Studio failed to initialize", err);
  }
}
