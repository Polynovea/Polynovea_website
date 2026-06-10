"use client";

import { useEffect, useMemo, useRef } from "react";
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
const NEG_Y_AXIS = new THREE.Vector3(0, -1, 0);
const GOLD_BASE = new THREE.Color("#F5E9C8");

export default function Pulses({ data, count }: { data: NetworkData; count: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

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

  // Pre-warm instanceColor to gold so the first frame isn't black.
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    for (let i = 0; i < count; i++) mesh.setColorAt(i, GOLD_BASE);
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [count]);

  const _color = useMemo(() => new THREE.Color(), []);
  const _q = useMemo(() => new THREE.Quaternion(), []);

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

      // Guard: setFromUnitVectors breaks when vectors are antiparallel.
      if (p.edgeDir.dot(Y_AXIS) < -0.9999) {
        _q.setFromUnitVectors(NEG_Y_AXIS, Y_AXIS);
      } else {
        _q.setFromUnitVectors(Y_AXIS, p.edgeDir);
      }
      dummy.quaternion.copy(_q);

      const streakLen = Math.min(p.edgeLen * 0.18, 1.2);
      dummy.scale.set(1, streakLen, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      // Waveform brightness via instanceColor.
      const flare = 0.55 + Math.sin(p.t * Math.PI) * 0.85;
      _color.setRGB(
        0.96 + flare * 0.04,
        0.91 + flare * 0.09,
        0.78 + flare * 0.22
      );
      mesh.setColorAt(i, _color);
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      <cylinderGeometry args={[0.022, 0.022, 1, 5]} />
      <meshBasicMaterial color="#F5E9C8" toneMapped={false} vertexColors />
    </instancedMesh>
  );
}
