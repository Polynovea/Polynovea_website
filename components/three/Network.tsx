"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { NetworkData } from "./networkData";
import { clusterFocus, journeyPosition, boundaryTakeover } from "@/lib/clusterFocus";

// ── Violet bloom cloud ──────────────────────────────────────────────────────

const VIOLET_VERT = /* glsl */ `
  attribute float aScale;
  attribute float aColorT;
  varying float vColorT;
  varying float vAlpha;

  void main() {
    vColorT = aColorT;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float depth = max(-mv.z, 0.1);
    // Perspective size with TDR-safe cap (same pattern as ClusterIgnite).
    gl_PointSize = clamp(aScale * 280.0 / depth, 0.0, 18.0);
    vAlpha = clamp(aScale * 6.0, 0.3, 0.9);
    gl_Position = projectionMatrix * mv;
  }
`;

const VIOLET_FRAG = /* glsl */ `
  precision mediump float;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vColorT;
  varying float vAlpha;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    float a = smoothstep(0.5, 0.0, d) * vAlpha;
    if (a < 0.01) discard;
    gl_FragColor = vec4(mix(uColorA, uColorB, vColorT), a);
  }
`;

// ── Gold bloom cloud ────────────────────────────────────────────────────────

const GOLD_VERT = /* glsl */ `
  attribute float aScale;
  attribute float aPhase;
  uniform float uTime;
  varying float vAlpha;

  void main() {
    // Breathing pulse driven in the vertex shader.
    float pulse = 1.0 + sin(uTime * 1.4 + aPhase) * 0.22;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float depth = max(-mv.z, 0.1);
    gl_PointSize = clamp(aScale * pulse * 230.0 / depth, 0.0, 13.0);
    vAlpha = clamp(aScale * 7.0, 0.4, 1.0);
    gl_Position = projectionMatrix * mv;
  }
`;

const GOLD_FRAG = /* glsl */ `
  precision mediump float;
  uniform vec3 uColor;
  varying float vAlpha;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    float a = pow(smoothstep(0.5, 0.0, d), 1.7) * vAlpha;
    if (a < 0.01) discard;
    gl_FragColor = vec4(uColor, a);
  }
`;

// ── Synapse wires: a signal pulse fires and travels along every edge ─────────

const FIRE_VERT = /* glsl */ `
  attribute float aEdgeT;
  attribute float aSeed;
  varying float vT;
  varying float vSeed;

  void main() {
    vT = aEdgeT;
    vSeed = aSeed;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FIRE_FRAG = /* glsl */ `
  precision mediump float;
  uniform float uTime;
  uniform float uSurge;
  uniform vec3 uBase;
  uniform vec3 uPulse;
  varying float vT;
  varying float vSeed;

  void main() {
    // Each wire fires on its own phase; signals accelerate at section crossings.
    float speed = (0.10 + 0.12 * fract(vSeed * 7.31)) * (1.0 + uSurge * 2.2);
    float head = fract(uTime * speed + vSeed * 6.2831);
    float d = head - vT;
    d = d - floor(d);                 // wrap: distance behind the travelling head
    float pulse = pow(smoothstep(0.16, 0.0, d), 1.5);
    float baseA = 0.09 + uSurge * 0.05;
    vec3 col = mix(uBase, uPulse, pulse);
    float a = baseA + pulse * 0.9;
    gl_FragColor = vec4(col, a);
  }
`;

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
  const glowTexture = useMemo(() => makeGlowTexture(), []);

  // ── Violet Points geometry ──────────────────────────────────────────────
  const violetGeo = useMemo(() => {
    const count = data.nodes.length;
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const colorTs = new Float32Array(count);
    data.nodes.forEach((n, i) => {
      positions[i * 3] = n.position.x;
      positions[i * 3 + 1] = n.position.y;
      positions[i * 3 + 2] = n.position.z;
      scales[i] = n.scale;
      colorTs[i] = 0.25 + (i % 7) * 0.09;
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    g.setAttribute("aColorT", new THREE.BufferAttribute(colorTs, 1));
    return g;
  }, [data]);

  const violetUniforms = useMemo(
    () => ({
      uColorA: { value: new THREE.Color("#3b1d7a") },
      uColorB: { value: new THREE.Color("#7C3AED") },
    }),
    []
  );

  // ── Gold Points geometry ────────────────────────────────────────────────
  const goldGeo = useMemo(() => {
    const count = data.goldNodes.length;
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const phases = new Float32Array(count);
    data.goldNodes.forEach((n, i) => {
      positions[i * 3] = n.position.x;
      positions[i * 3 + 1] = n.position.y;
      positions[i * 3 + 2] = n.position.z;
      scales[i] = n.scale;
      phases[i] = n.phase;
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    g.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    return g;
  }, [data]);

  const goldMatRef = useRef<THREE.ShaderMaterial>(null);
  const goldUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#E6D3A3") },
    }),
    []
  );

  // ── Firing synapse wires ──────────────────────────────────────────────────
  const edgeGeo = useMemo(() => {
    const E = data.edges.length;
    const pos = new Float32Array(E * 6);
    const ts = new Float32Array(E * 2);
    const seeds = new Float32Array(E * 2);
    data.edges.forEach((e, i) => {
      pos.set([e.a.x, e.a.y, e.a.z, e.b.x, e.b.y, e.b.z], i * 6);
      ts[i * 2] = 0; ts[i * 2 + 1] = 1;
      const s = (i * 0.3719) % 1;
      seeds[i * 2] = s; seeds[i * 2 + 1] = s;
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aEdgeT", new THREE.BufferAttribute(ts, 1));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    return g;
  }, [data]);

  const fireRef = useRef<THREE.ShaderMaterial>(null);
  const fireUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSurge: { value: 0 },
      uBase: { value: new THREE.Color("#5b3aa8") },
      uPulse: { value: new THREE.Color("#E6D3A3") },
    }),
    []
  );

  // ── Cluster glow sprite refs ────────────────────────────────────────────
  const spriteRefs = useRef<(THREE.Sprite | null)[]>([]);

  useFrame(({ clock }) => {
    if (goldMatRef.current) goldMatRef.current.uniforms.uTime.value = clock.elapsedTime;
    if (fireRef.current) {
      fireRef.current.uniforms.uTime.value = clock.elapsedTime;
      fireRef.current.uniforms.uSurge.value = boundaryTakeover();
    }

    const f = journeyPosition();
    spriteRefs.current.forEach((s, i) => {
      if (!s) return;
      const mat = s.material as THREE.SpriteMaterial;
      const base = i % 3 === 1 ? 0.07 : 0.12;
      mat.opacity = base * (0.6 + 0.4 * clusterFocus(f, i));
    });
  });

  return (
    <group>
      {/* Density bloom cloud — violet nodes */}
      <points geometry={violetGeo} frustumCulled={false}>
        <shaderMaterial
          uniforms={violetUniforms}
          vertexShader={VIOLET_VERT}
          fragmentShader={VIOLET_FRAG}
          transparent
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </points>

      {/* Density bloom cloud — gold signal nodes */}
      <points geometry={goldGeo} frustumCulled={false}>
        <shaderMaterial
          ref={goldMatRef}
          uniforms={goldUniforms}
          vertexShader={GOLD_VERT}
          fragmentShader={GOLD_FRAG}
          transparent
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </points>

      {/* Synapse wires — a gold signal fires and travels along every edge */}
      <lineSegments geometry={edgeGeo} frustumCulled={false}>
        <shaderMaterial
          ref={fireRef}
          uniforms={fireUniforms}
          vertexShader={FIRE_VERT}
          fragmentShader={FIRE_FRAG}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Volumetric haze: one reactive soft glow per cluster */}
      {data.clusterCenters.map((c, i) => (
        <sprite
          key={i}
          ref={(el) => { spriteRefs.current[i] = el; }}
          position={c}
          scale={[20, 14, 1]}
        >
          <spriteMaterial
            map={glowTexture}
            color={i % 3 === 1 ? "#E6D3A3" : "#7C3AED"}
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
