"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { NetworkData } from "./networkData";

const VIOLET = new THREE.Color("#7C3AED");
const VIOLET_DEEP = new THREE.Color("#3b1d7a");
const GOLD = new THREE.Color("#E6D3A3");

/** Soft radial texture used for volumetric glow sprites. */
function makeGlowTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(255,255,255,0.45)");
  g.addColorStop(0.6, "rgba(255,255,255,0.12)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

export default function Network({ data }: { data: NetworkData }) {
  const violetRef = useRef<THREE.InstancedMesh>(null);
  const goldRef = useRef<THREE.InstancedMesh>(null);
  const glowTexture = useMemo(() => makeGlowTexture(), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Static violet nodes: matrices set once.
  useEffect(() => {
    const mesh = violetRef.current;
    if (!mesh) return;
    data.nodes.forEach((n, i) => {
      dummy.position.copy(n.position);
      dummy.scale.setScalar(n.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      // Slight per-node hue variation keeps the field from looking stamped.
      const c = VIOLET_DEEP.clone().lerp(VIOLET, 0.25 + (i % 7) * 0.09);
      mesh.setColorAt(i, c);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [data, dummy]);

  // Gold signal nodes breathe: a slow scale pulse, cheap at this count.
  useFrame(({ clock }) => {
    const mesh = goldRef.current;
    if (!mesh) return;
    const t = clock.elapsedTime;
    data.goldNodes.forEach((n, i) => {
      const pulse = 1 + Math.sin(t * 1.4 + n.phase) * 0.22;
      dummy.position.copy(n.position);
      dummy.scale.setScalar(n.scale * pulse);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      {/* Structure nodes: lit, slightly rough, violet-cored */}
      <instancedMesh ref={violetRef} args={[undefined, undefined, data.nodes.length]} frustumCulled={false}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial
          color="#241046"
          emissive="#7C3AED"
          emissiveIntensity={0.5}
          roughness={0.35}
          metalness={0.15}
        />
      </instancedMesh>

      {/* Signal nodes: hot gold cores that feed the bloom pass */}
      <instancedMesh ref={goldRef} args={[undefined, undefined, data.goldNodes.length]} frustumCulled={false}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial
          color="#3a3322"
          emissive="#E6D3A3"
          emissiveIntensity={1.6}
          roughness={0.25}
          metalness={0.3}
        />
      </instancedMesh>

      {/* Synapse lines */}
      <lineSegments frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[data.edgePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color="#7C3AED"
          transparent
          opacity={0.14}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* Volumetric haze: one soft additive glow per cluster */}
      {data.clusterCenters.map((c, i) => (
        <sprite key={i} position={c} scale={[20, 14, 1]}>
          <spriteMaterial
            map={glowTexture}
            color={i % 3 === 1 ? GOLD : VIOLET}
            transparent
            opacity={i % 3 === 1 ? 0.07 : 0.12}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </sprite>
      ))}
    </group>
  );
}
