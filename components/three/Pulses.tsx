"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { NetworkData } from "./networkData";

interface PulseState {
  edge: number;
  t: number;
  speed: number;
  edgeDir: THREE.Vector3;
  edgeLen: number;
}

const Y_AXIS = new THREE.Vector3(0, 1, 0);
const NEG_Y = new THREE.Vector3(0, -1, 0);

export default function Pulses({ data, count }: { data: NetworkData; count: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const _q = useMemo(() => new THREE.Quaternion(), []);

  const pulses = useMemo<PulseState[]>(() => {
    return Array.from({ length: count }, (_, i) => {
      const edge = (i * 37) % data.edges.length;
      const e = data.edges[edge];
      const edgeDir = new THREE.Vector3().subVectors(e.b, e.a);
      const edgeLen = edgeDir.length();
      return {
        edge,
        t: (i * 0.137) % 1,
        speed: 0.25 + ((i * 53) % 100) / 220,
        edgeDir: edgeDir.clone().normalize(),
        edgeLen,
      };
    });
  }, [data, count]);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    for (let i = 0; i < pulses.length; i++) {
      const p = pulses[i];
      p.t += delta * p.speed;
      if (p.t >= 1) {
        p.t = 0;
        const newEdge = Math.floor(Math.random() * data.edges.length);
        p.edge = newEdge;
        const e = data.edges[newEdge];
        p.edgeDir.subVectors(e.b, e.a);
        p.edgeLen = p.edgeDir.length();
        p.edgeDir.normalize();
      }

      const e = data.edges[p.edge];
      dummy.position.lerpVectors(e.a, e.b, p.t);

      // Guard against antiparallel case where setFromUnitVectors breaks.
      if (p.edgeDir.dot(Y_AXIS) < -0.9999) {
        dummy.quaternion.setFromUnitVectors(NEG_Y, Y_AXIS);
      } else {
        _q.setFromUnitVectors(Y_AXIS, p.edgeDir);
        dummy.quaternion.copy(_q);
      }

      // Scale Y by flare so the streak breathes in length mid-flight.
      const flare = 0.6 + Math.sin(p.t * Math.PI) * 0.9;
      const streakLen = Math.min(p.edgeLen * 0.18, 1.2) * flare;
      dummy.scale.set(1, streakLen, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      <cylinderGeometry args={[0.022, 0.022, 1, 5]} />
      <meshBasicMaterial color="#F5E9C8" toneMapped={false} />
    </instancedMesh>
  );
}
