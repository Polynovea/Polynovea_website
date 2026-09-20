"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { depthState, SECTION_COUNT } from "@/lib/depthStore";
import { clusterCenter } from "./networkData";

const CAMERA_BACKOFF = 11;

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

/**
 * Drives the camera along the cluster path from depthState.progress.
 * Scroll moves the viewer deeper into the network; each section has a
 * camera keyframe slightly behind its cluster, looking into it.
 */
export default function CameraRig({
  lightRef,
}: {
  lightRef: React.RefObject<THREE.PointLight | null>;
}) {
  const mouse = useRef({ x: 0, y: 0 });

  const keyframes = useMemo(() => {
    return Array.from({ length: SECTION_COUNT }, (_, i) => {
      const center = clusterCenter(i);
      const pos = center.clone().add(new THREE.Vector3(
        Math.sin(i * 0.9) * 1.6,
        Math.cos(i * 1.1) * 0.9 + 0.4,
        CAMERA_BACKOFF
      ));
      return { pos, look: center };
    });
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const tmpPos = useRef(new THREE.Vector3());
  const tmpLook = useRef(new THREE.Vector3());

  useFrame(({ camera, clock }, delta) => {
    const time = clock.elapsedTime;
    const pos = tmpPos.current;
    const look = tmpLook.current;

    if (depthState.sceneMode === "ambient") {
      const k = keyframes[depthState.ambientIndex % SECTION_COUNT];
      const a = time * 0.07 + depthState.ambientIndex * 1.3;
      pos.copy(k.pos);
      pos.x += Math.sin(a) * 2.4;
      pos.y += Math.cos(a * 0.8) * 1.3;
      pos.z += Math.sin(a * 0.6) * 1.1;
      look.copy(k.look);
    } else {
      const f = depthState.progress * (SECTION_COUNT - 1);
      const i0 = Math.min(Math.floor(f), SECTION_COUNT - 2);
      const t = smoothstep(THREE.MathUtils.clamp(f - i0, 0, 1));
      pos.lerpVectors(keyframes[i0].pos, keyframes[i0 + 1].pos, t);
      look.lerpVectors(keyframes[i0].look, keyframes[i0 + 1].look, t);
    }

    // Idle drift + mouse parallax keep the frame alive between scrolls.
    pos.x += Math.sin(time * 0.23) * 0.35 + mouse.current.x * 0.7;
    pos.y += Math.cos(time * 0.31) * 0.22 - mouse.current.y * 0.45;

    camera.position.lerp(pos, 1 - Math.pow(0.0015, delta));
    camera.lookAt(look);

    if (lightRef.current) {
      lightRef.current.position.set(look.x, look.y + 2, look.z + 3);
    }
  });

  return null;
}
