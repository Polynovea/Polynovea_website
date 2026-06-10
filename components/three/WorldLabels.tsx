"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { depthState, SECTION_COUNT } from "@/lib/depthStore";
import { clusterCenter } from "./networkData";
import { clusterFocus, journeyPosition } from "@/lib/clusterFocus";

/** Short chapter titles that float in the network — one per cluster. These are
 *  environment, NOT the DOM copy: they label the "place" the camera arrives at. */
const LABELS = [
  "POLYNOVEA",
  "THE SYSTEM",
  "MILESTONES",
  "WHY DIFFERENT",
  "WHO WE ARE",
  "PROJECTS",
  "MODULES",
  "QUESTIONS",
  "CONTACT",
];

const MAX_OPACITY = 0.22; // environmental — must not fight DOM body copy

function WorldLabel({ index, text }: { index: number; text: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const center = clusterCenter(index);

  useFrame(() => {
    const mesh = ref.current;
    if (!mesh) return;
    // Environmental titles are tuned for the home journey's legibility lens;
    // on subpages (ambient mode) they have nothing to recede behind and
    // collide with real DOM copy, so keep them hidden there.
    if (depthState.sceneMode !== "journey") {
      mesh.visible = false;
      return;
    }
    const focus = clusterFocus(journeyPosition(), index);
    // Recede + rise slightly when unfocused so arrival feels like the title
    // settling into place.
    mesh.position.set(center.x, center.y + 2.4, center.z - (1 - focus) * 5);
    const mat = mesh.material as THREE.Material & { opacity: number };
    mat.opacity = focus * MAX_OPACITY;
    mesh.visible = focus > 0.02;
  });

  return (
    <Text
      ref={ref}
      fontSize={3.4}
      letterSpacing={0.18}
      anchorX="center"
      anchorY="middle"
      color="#cbb9ff"
      // Normal alpha blending (NOT additive): physically cannot accumulate
      // brightness, so it can never blow the frame out or feed the bloom pass.
      material-transparent
      material-depthWrite={false}
      fillOpacity={1}
    >
      {text}
    </Text>
  );
}

export default function WorldLabels() {
  return (
    <group>
      {Array.from({ length: SECTION_COUNT }, (_, i) => (
        <WorldLabel key={i} index={i} text={LABELS[i] ?? ""} />
      ))}
    </group>
  );
}
