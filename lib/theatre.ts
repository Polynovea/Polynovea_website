/**
 * Theatre.js wiring (core + studio, NOT @theatre/r3f).
 *
 * @theatre/r3f@0.7 only peer-supports react-three-fiber v8; this project is on
 * R3F v9 / React 19, so we use the framework-agnostic core and apply animated
 * values to the three.js camera ourselves (see TheatreCamera).
 *
 * Theatre is layered as an *authorable overlay* on top of the existing
 * procedural camera: at default values the camera behaves exactly as before.
 * The Studio GUI (dev-only) lets you keyframe the overlay channels against the
 * journey; the sequence playhead is locked to depthState.progress.
 */
import { getProject, types } from "@theatre/core";

/** Sequence length in seconds. progress 0..1 maps to position 0..DURATION. */
export const JOURNEY_DURATION = 10;

const PROJECT_NAME = "Polynovea";
const SHEET_NAME = "Journey";

const OFFSET_RANGE = { range: [-20, 20] as [number, number] };

/**
 * Empty baseline state. Seeding this silences Theatre's "state is empty" warning
 * (which Next's dev overlay escalates to a blocking error) when Studio isn't
 * loaded. `shallowValidateOnDiskState` only checks definitionVersion. Once the
 * camera is authored in `?studio`, export the real state and replace this.
 */
const EMPTY_STATE = {
  sheetsById: {},
  definitionVersion: "0.4.0",
  revisionHistory: [],
} as const;

let project: ReturnType<typeof getProject> | null = null;

function getJourneyProject() {
  if (!project) {
    project = getProject(PROJECT_NAME, { state: EMPTY_STATE as never });
  }
  return project;
}

export function getJourneySheet() {
  return getJourneyProject().sheet(SHEET_NAME);
}

/**
 * Authorable camera overlay. Defaults are no-ops (offsets 0, fov 58 = the
 * Canvas default) so the procedural camera is unchanged until you keyframe it.
 */
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

// Lazily created on the client only — avoids constructing Theatre objects during
// SSR module evaluation, and dedupes across HMR / remounts.
let cameraObject: ReturnType<typeof createCameraObject> | null = null;
let studioStarted = false;

export function getCameraObject() {
  if (!cameraObject) cameraObject = createCameraObject();
  return cameraObject;
}

/**
 * Mount the Theatre Studio authoring UI. Opt-in and dev-only: it only loads when
 * the page is opened with `?studio` (or localStorage `theatreStudio=1`), so the
 * editor never covers normal dev view and never ships to production.
 *
 * Author the camera overlay there, then we export its state to ship a baseline.
 */
export async function startStudio(): Promise<void> {
  if (process.env.NODE_ENV === "production") return;
  if (studioStarted || typeof window === "undefined") return;

  const optedIn =
    new URLSearchParams(window.location.search).has("studio") ||
    window.localStorage.getItem("theatreStudio") === "1";
  if (!optedIn) return;

  studioStarted = true;
  try {
    const studio = (await import("@theatre/studio")).default;
    studio.initialize();
  } catch (err) {
    studioStarted = false;
    console.error("Theatre Studio failed to initialize", err);
  }
}
