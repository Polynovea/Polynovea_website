"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SECTION_COUNT } from "@/lib/depthStore";
import { clusterCenter, clusterZ } from "./networkData";
import { clusterFocus, journeyPosition } from "@/lib/clusterFocus";

const VERT = /* glsl */ `
  varying vec3 vWorldPos;

  void main() {
    vec4 worldPos4 = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos4.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos4;
  }
`;

const FRAG = /* glsl */ `
  uniform float uFocus[${SECTION_COUNT}];
  uniform vec3 uClusterXZ[${SECTION_COUNT}];
  varying vec3 vWorldPos;

  void main() {
    // Anti-aliased grid via fract + fwidth (no external deps).
    float cellSize = 2.8;
    vec2 coord = vWorldPos.xz / cellSize;
    vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
    float line = 1.0 - min(min(grid.x, grid.y), 1.0);

    // Base grid: violet at low opacity.
    vec3 baseColor = vec3(0.486, 0.227, 0.929); // #7C3AED
    vec3 hotColor  = vec3(0.902, 0.827, 0.639); // #E6D3A3

    // Heat tint: brighten grid cells near active cluster centers.
    float heat = 0.0;
    for (int i = 0; i < ${SECTION_COUNT}; i++) {
      float dx = vWorldPos.x - uClusterXZ[i].x;
      float dz = vWorldPos.z - uClusterXZ[i].y;
      float dist2 = dx * dx + dz * dz;
      float radius = 64.0; // 8-unit soft radius
      float proximity = max(0.0, 1.0 - dist2 / radius);
      heat += uFocus[i] * proximity * proximity;
    }
    heat = clamp(heat, 0.0, 1.0);

    vec3 color = mix(baseColor, hotColor, heat * 0.65);
    float baseOpacity = mix(0.07, 0.18, heat);

    // Manual exponential fog: density 0.02, fog color #0a0912.
    float fogDist = length(cameraPosition - vWorldPos);
    float fogFactor = 1.0 - exp(-0.02 * fogDist);
    vec3 fogColor = vec3(0.039, 0.035, 0.071); // #0a0912

    vec3 finalColor = mix(color, fogColor, fogFactor);
    float alpha = line * baseOpacity * (1.0 - fogFactor * 0.6);

    if (alpha < 0.005) discard;
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

export default function HeatGrid({ lowPower }: { lowPower: boolean }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  // Cover full journey Z range + X spread.
  const zMin = clusterZ(SECTION_COUNT - 1) - 12;
  const zMax = clusterZ(0) + 12; // FIRST_CLUSTER_Z + 12

  const width = 48;
  const depth = zMax - zMin;
  const segs = lowPower ? 24 : 64;

  const uniforms = useMemo(() => {
    const clusterXZ = Array.from({ length: SECTION_COUNT }, (_, i) => {
      const c = clusterCenter(i);
      return new THREE.Vector3(c.x, c.z, 0);
    });
    return {
      uFocus: { value: new Array(SECTION_COUNT).fill(0) as number[] },
      uClusterXZ: { value: clusterXZ },
    };
  }, []);

  useFrame(() => {
    const mat = matRef.current;
    if (!mat) return;
    const f = journeyPosition();
    const focus = mat.uniforms.uFocus.value as number[];
    for (let i = 0; i < SECTION_COUNT; i++) focus[i] = clusterFocus(f, i);
  });

  // Center the plane over the midpoint of the journey.
  const centerZ = (zMin + zMax) / 2;

  return (
    <mesh
      position={[0, -7, centerZ]}
      rotation={[-Math.PI / 2, 0, 0]}
      frustumCulled={false}
    >
      <planeGeometry args={[width, depth, segs, segs]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={VERT}
        fragmentShader={FRAG}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
