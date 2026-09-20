"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SECTION_COUNT } from "@/lib/depthStore";
import { clusterCenter } from "./networkData";
import { clusterFocus, journeyPosition } from "@/lib/clusterFocus";

/**
 * Particle ignition. As the camera arrives at a cluster, that cluster's
 * particles bloom outward and dissolve — energy gathering where content is
 * about to surface, then dispersing back into the field as you leave.
 *
 * One Points cloud, one draw call. Per-cluster focus is pushed each frame into
 * a uFocus[] uniform; the vertex shader expands + brightens by focus.
 */
const VERT = /* glsl */ `
  uniform float uFocus[${SECTION_COUNT}];
  uniform float uTime;
  attribute vec3 aCenter;
  attribute vec3 aDir;
  attribute float aCluster;
  attribute float aSeed;
  varying float vAlpha;

  void main() {
    int idx = int(aCluster + 0.5);
    float focus = uFocus[idx];
    // Bloom outward with focus; a little perpetual breathing keeps it alive.
    float spread = mix(0.15, 6.5, focus) * (0.4 + aSeed);
    float breathe = sin(uTime * 1.2 + aSeed * 6.2831) * 0.15 * focus;
    vec3 pos = aCenter + aDir * (spread + breathe);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    // Particles fade as they reach the outer edge of the bloom -> dissolve feel.
    vAlpha = focus * focus * 0.6 * (1.0 - aSeed * 0.5);
    // Perspective attenuation, hard-clamped small: with normal blending + this
    // cap, fill-rate stays in the same safe envelope as the gold nodes.
    float depth = max(-mv.z, 0.1);
    gl_PointSize = clamp(mix(1.0, 3.5, focus) * (24.0 / depth), 0.0, 10.0);
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAG = /* glsl */ `
  precision mediump float;
  uniform vec3 uColor;
  varying float vAlpha;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    float a = smoothstep(0.5, 0.0, d) * vAlpha;
    if (a < 0.01) discard;
    gl_FragColor = vec4(uColor, a);
  }
`;

function pseudoRandom(index: number, salt: number): number {
  const value = Math.sin((index + 1) * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

export default function ClusterIgnite({ lowPower }: { lowPower: boolean }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const perCluster = lowPower ? 22 : 48;

  const { geometry, uniforms } = useMemo(() => {
    const count = SECTION_COUNT * perCluster;
    const centers = new Float32Array(count * 3);
    const dirs = new Float32Array(count * 3);
    const clusters = new Float32Array(count);
    const seeds = new Float32Array(count);

    let p = 0;
    for (let i = 0; i < SECTION_COUNT; i++) {
      const c = clusterCenter(i);
      for (let n = 0; n < perCluster; n++) {
        // Deterministic pseudo-random point on a sphere for an even radial burst.
        const u = pseudoRandom(p, 1);
        const v = pseudoRandom(p, 2);
        const theta = u * Math.PI * 2;
        const phi = Math.acos(2 * v - 1);
        const sinPhi = Math.sin(phi);
        centers[p * 3] = c.x;
        centers[p * 3 + 1] = c.y;
        centers[p * 3 + 2] = c.z;
        dirs[p * 3] = Math.cos(theta) * sinPhi;
        dirs[p * 3 + 1] = Math.sin(theta) * sinPhi;
        dirs[p * 3 + 2] = Math.cos(phi);
        clusters[p] = i;
        seeds[p] = pseudoRandom(p, 3);
        p++;
      }
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("aCenter", new THREE.BufferAttribute(centers, 3));
    g.setAttribute("aDir", new THREE.BufferAttribute(dirs, 3));
    g.setAttribute("aCluster", new THREE.BufferAttribute(clusters, 1));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    // Position attribute required by three; unused (we build pos in the shader).
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(count * 3), 3));

    const u = {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#e6c9a0") },
      uFocus: { value: new Array(SECTION_COUNT).fill(0) as number[] },
    };
    return { geometry: g, uniforms: u };
  }, [perCluster]);

  useFrame(({ clock }) => {
    const mat = matRef.current;
    if (!mat) return;
    mat.uniforms.uTime.value = clock.elapsedTime;
    const f = journeyPosition();
    const focus = mat.uniforms.uFocus.value as number[];
    for (let i = 0; i < SECTION_COUNT; i++) focus[i] = clusterFocus(f, i);
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={VERT}
        fragmentShader={FRAG}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
}
