"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { depthState, REVEAL_OPEN_EVENT, SECTION_COUNT } from "@/lib/depthStore";
import { clusterCenter } from "./networkData";
import { boundaryTakeover } from "@/lib/clusterFocus";
import {
  JOURNEY_DURATION,
  getCameraObject,
  getJourneySheet,
  startStudio,
} from "@/lib/theatre";

const CAMERA_BACKOFF = 11;
const INTRO_EXTRA_DISTANCE = 14;

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

interface CameraOverlay {
  fov: number;
  offset: { x: number; y: number; z: number };
  lookOffset: { x: number; y: number; z: number };
}

const DEFAULT_OVERLAY: CameraOverlay = {
  fov: 58,
  offset: { x: 0, y: 0, z: 0 },
  lookOffset: { x: 0, y: 0, z: 0 },
};

/**
 * Procedural camera spine (ported from CameraRig) with a Theatre.js overlay.
 *
 * The cluster path, intro dolly, idle drift, mouse parallax and gold-light
 * follow are unchanged. On top, a Theatre "Camera" object contributes an
 * authorable fov + position/look offset; its sequence playhead is locked to
 * depthState.progress so any keyframes animate across the journey. At default
 * values the overlay is a no-op, so behaviour matches the old rig exactly.
 */
export default function TheatreCamera({
  lightRef,
}: {
  lightRef: React.RefObject<THREE.PointLight | null>;
}) {
  const introT = useRef(0);
  const revealOpen = useRef(false);
  const mouse = useRef({ x: 0, y: 0 });
  const overlay = useRef<CameraOverlay>(DEFAULT_OVERLAY);

  const keyframes = useMemo(() => {
    return Array.from({ length: SECTION_COUNT }, (_, i) => {
      const center = clusterCenter(i);
      const pos = center.clone().add(
        new THREE.Vector3(
          Math.sin(i * 0.9) * 1.6,
          Math.cos(i * 1.1) * 0.9 + 0.4,
          CAMERA_BACKOFF
        )
      );
      return { pos, look: center };
    });
  }, []);

  // Theatre: read the authorable overlay into a ref; start the dev Studio.
  useEffect(() => {
    const cameraObject = getCameraObject();
    const unsub = cameraObject.onValuesChange((v) => {
      overlay.current = v as unknown as CameraOverlay;
    });
    void startStudio();
    return () => unsub();
  }, []);

  useEffect(() => {
    const onReveal = () => {
      revealOpen.current = true;
    };
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener(REVEAL_OPEN_EVENT, onReveal);
    window.addEventListener("pointermove", onMove, { passive: true });
    if (depthState.revealOpen) revealOpen.current = true;
    return () => {
      window.removeEventListener(REVEAL_OPEN_EVENT, onReveal);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const tmpPos = useMemo(() => new THREE.Vector3(), []);
  const tmpLook = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ camera, clock }, delta) => {
    const time = clock.elapsedTime;

    // Lock the Theatre sequence playhead to the journey so overlay keyframes
    // animate in step with scroll (or the parked cluster on subpages).
    const journeyT =
      depthState.sceneMode === "ambient"
        ? depthState.ambientIndex / Math.max(1, SECTION_COUNT - 1)
        : depthState.progress;
    getJourneySheet().sequence.position = journeyT * JOURNEY_DURATION;
    const ov = overlay.current;

    if (depthState.sceneMode === "ambient") {
      const k = keyframes[depthState.ambientIndex % SECTION_COUNT];
      const a = time * 0.07 + depthState.ambientIndex * 1.3;
      tmpPos.copy(k.pos);
      tmpPos.x += Math.sin(a) * 2.4;
      tmpPos.y += Math.cos(a * 0.8) * 1.3;
      tmpPos.z += Math.sin(a * 0.6) * 1.1;
      tmpLook.copy(k.look);
    } else {
      const f = depthState.progress * (SECTION_COUNT - 1);
      const i0 = Math.min(Math.floor(f), SECTION_COUNT - 2);
      const t = smoothstep(THREE.MathUtils.clamp(f - i0, 0, 1));
      tmpPos.lerpVectors(keyframes[i0].pos, keyframes[i0 + 1].pos, t);
      tmpLook.lerpVectors(keyframes[i0].look, keyframes[i0 + 1].look, t);
    }

    // Theatre overlay: authorable position / look offsets.
    tmpPos.x += ov.offset.x;
    tmpPos.y += ov.offset.y;
    tmpPos.z += ov.offset.z;
    tmpLook.x += ov.lookOffset.x;
    tmpLook.y += ov.lookOffset.y;
    tmpLook.z += ov.lookOffset.z;

    // Intro dolly: hold far back behind the curtain, ease in once it opens.
    if (revealOpen.current && introT.current < 1) {
      introT.current = Math.min(1, introT.current + delta * 0.55);
    }
    const introEase = 1 - Math.pow(1 - introT.current, 4);
    tmpPos.z += INTRO_EXTRA_DISTANCE * (1 - introEase);

    // Idle drift + mouse parallax keep the frame alive between scrolls.
    tmpPos.x += Math.sin(time * 0.23) * 0.35 + mouse.current.x * 0.7;
    tmpPos.y += Math.cos(time * 0.31) * 0.22 - mouse.current.y * 0.45;

    camera.position.lerp(tmpPos, 1 - Math.pow(0.0015, delta));
    camera.lookAt(tmpLook);

    // FOV punch at section crossings: widens at the mid-transition, then settles
    // as the new section locks in. Shares the one boundary curve with the bloom
    // flare + pulse surge so the whole takeover fires as a single beat.
    const targetFov = ov.fov + boundaryTakeover() * 14;

    const perspective = camera as THREE.PerspectiveCamera;
    if (perspective.isPerspectiveCamera) {
      perspective.fov = THREE.MathUtils.lerp(perspective.fov, targetFov, 0.1);
      perspective.updateProjectionMatrix();
    }

    // The gold "active section" light travels with the journey.
    if (lightRef.current) {
      lightRef.current.position.set(tmpLook.x, tmpLook.y + 2, tmpLook.z + 3);
    }
  });

  return null;
}
