"use client";

import { useRef } from "react";
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
  const dummy = useRef(new THREE.Object3D());
  const pulses = useRef<PulseState[]>(
    Array.from({ length: count }, (_, i) => ({
      edge: (i * 37) % data.edges.length,
      t: (i * 0.137) % 1,
      speed: 0.25 + ((i * 53) % 100) / 220,
    }))
  );

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    // At a cluster crossing the spine "fires": packets accelerate down the
    // edges and swell, so the network visibly surges as a new section arrives.
    const surge = boundaryTakeover();
    const speedMul = 1 + surge * 2.4;
    const sizeMul = 1 + surge * 1.3;
    for (let i = 0; i < pulses.current.length; i++) {
      const p = pulses.current[i];
      p.t += delta * p.speed * speedMul;
      if (p.t >= 1) {
        p.t = 0;
        p.edge = Math.floor(Math.random() * data.edges.length);
      }
      const e = data.edges[p.edge];
      dummy.current.position.lerpVectors(e.a, e.b, p.t);
      const flare = 0.6 + Math.sin(p.t * Math.PI) * 0.9;
      dummy.current.scale.setScalar(0.03 * flare * sizeMul);
      dummy.current.updateMatrix();
      mesh.setMatrixAt(i, dummy.current.matrix);
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
