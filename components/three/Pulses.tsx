"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { NetworkData } from "./networkData";
import { boundaryTakeover } from "@/lib/clusterFocus";

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
    // At a cluster crossing the spine "fires": packets accelerate down the
    // edges and swell, so the network visibly surges as a new section arrives.
    const surge = boundaryTakeover();
    const speedMul = 1 + surge * 2.4;
    const sizeMul = 1 + surge * 1.3;
    for (let i = 0; i < pulses.length; i++) {
      const p = pulses[i];
      p.t += delta * p.speed * speedMul;
      if (p.t >= 1) {
        p.t = 0;
        p.edge = Math.floor(Math.random() * data.edges.length);
      }
      const e = data.edges[p.edge];
      dummy.position.lerpVectors(e.a, e.b, p.t);
      const flare = 0.6 + Math.sin(p.t * Math.PI) * 0.9;
      dummy.scale.setScalar(0.03 * flare * sizeMul);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#FFF1CE" toneMapped={false} />
    </instancedMesh>
  );
}
