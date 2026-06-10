"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { depthState } from "@/lib/depthStore";
import { clusterCenter } from "./networkData";
import { clusterFocus, journeyPosition } from "@/lib/clusterFocus";

const MAX_OPACITY = 0.35;
const FOCUS_THRESHOLD = 0.08;

interface ReadoutDef {
  clusterIndex: number;
  text: string;
  offset: THREE.Vector3;
  accentClass: "readout--violet" | "readout--gold";
}

const READOUTS: ReadoutDef[] = [
  {
    clusterIndex: 1,
    text: "signal: live · nodes: 1,204 · latency: 42ms",
    offset: new THREE.Vector3(5.5, 1.2, 0),
    accentClass: "readout--violet",
  },
  {
    clusterIndex: 5,
    text: "state: engaged · confidence: 0.94 · intent: purchase",
    offset: new THREE.Vector3(-5.8, 1.0, 0),
    accentClass: "readout--gold",
  },
  {
    clusterIndex: 7,
    text: "pattern: detected · drift: 0.02 · model: v0.3",
    offset: new THREE.Vector3(5.2, 1.4, 0),
    accentClass: "readout--violet",
  },
];

function Readout({ def }: { def: ReadoutDef }) {
  const divRef = useRef<HTMLDivElement>(null);
  const center = clusterCenter(def.clusterIndex);
  const pos: [number, number, number] = [
    center.x + def.offset.x,
    center.y + def.offset.y,
    center.z + def.offset.z,
  ];

  useFrame(() => {
    const el = divRef.current;
    if (!el) return;

    if (depthState.sceneMode !== "journey") {
      el.style.opacity = "0";
      el.style.pointerEvents = "none";
      return;
    }

    const focus = clusterFocus(journeyPosition(), def.clusterIndex);
    if (focus <= FOCUS_THRESHOLD) {
      el.style.opacity = "0";
      return;
    }
    el.style.opacity = String((focus * MAX_OPACITY).toFixed(3));
  });

  return (
    <Html position={pos} center prepend style={{ pointerEvents: "none" }}>
      <div ref={divRef} className={`readout ${def.accentClass}`} style={{ opacity: 0 }}>
        {def.text}
        <style>{`
          .readout {
            font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
            font-size: 11px;
            letter-spacing: 0.06em;
            white-space: nowrap;
            transition: opacity 0.3s ease;
            user-select: none;
          }
          .readout--violet { color: #b89aff; }
          .readout--gold   { color: #c8ad78; }
        `}</style>
      </div>
    </Html>
  );
}

/** Sparse behavioral data readouts near clusters 1, 5, 7. Home-journey only. */
export default function DataReadouts() {
  return (
    <group>
      {READOUTS.map((def) => (
        <Readout key={def.clusterIndex} def={def} />
      ))}
    </group>
  );
}
