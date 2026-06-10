"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { NetworkData } from "./networkData";

interface PulseState {
  edge: number;
  t: number;
  speed: number;
}

export default function Pulses({ data, count }: { data: NetworkData; count: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const pulses = useMemo<PulseState[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        edge: (i * 37) % data.edges.length,
        t: (i * 0.137) % 1,
        speed: 0.25 + ((i * 53) % 100) / 220,
      })),
    [data, count]
  );

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    for (let i = 0; i < pulses.length; i++) {
      const p = pulses[i];
      p.t += delta * p.speed;
      if (p.t >= 1) {
        p.t = 0;
        p.edge = Math.floor(Math.random() * data.edges.length);
      }
      const e = data.edges[p.edge];
      dummy.position.lerpVectors(e.a, e.b, p.t);
      const flare = 0.6 + Math.sin(p.t * Math.PI) * 0.9;
      dummy.scale.setScalar(0.045 * flare);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#F5E9C8" toneMapped={false} />
    </instancedMesh>
  );
}
