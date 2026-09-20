"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette, ToneMapping, Noise } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import { PerformanceMonitor, AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";
import { depthState, SCENE_READY_EVENT, SECTION_COUNT } from "@/lib/depthStore";
import { boundaryTakeover } from "@/lib/clusterFocus";
import { generateNetwork, clusterCenter } from "./networkData";
import Network from "./Network";
import Pulses from "./Pulses";
import TheatreCamera from "./TheatreCamera";
import ClusterIgnite from "./ClusterIgnite";
import HeatGrid from "./HeatGrid";
import DataReadouts from "./DataReadouts";

/** Announces readiness after the first real frame so the curtain can open on truth, not a timer. */
function ReadySignal() {
  const announced = useRef(false);
  useFrame(() => {
    if (announced.current) return;
    announced.current = true;
    depthState.sceneReady = true;
    window.dispatchEvent(new Event(SCENE_READY_EVENT));
  });
  return null;
}

/**
 * Publishes each cluster's projected screen position into depthState every
 * frame, so the DOM pager can anchor card "birth" to the exact point in the
 * network the camera is arriving at. The bridge between the WebGL scene and the
 * DOM cards — the connective tissue the removed floating labels never gave us.
 */
function ClusterProjector() {
  const { camera } = useThree();
  const v = useRef(new THREE.Vector3());
  useFrame(() => {
    for (let i = 0; i < SECTION_COUNT; i++) {
      v.current.copy(clusterCenter(i)).project(camera);
      const point = depthState.clusterScreen[i];
      // NDC (-1..1) → screen fraction (0..1, top-left origin), clamped so a
      // cluster drifting off-frame still anchors to a sane on-card position.
      point.x = Math.min(0.84, Math.max(0.16, v.current.x * 0.5 + 0.5));
      point.y = Math.min(0.82, Math.max(0.22, -v.current.y * 0.5 + 0.5));
    }
  });
  return null;
}

/** Bloom that surges at section-crossing boundaries. */
function DynamicBloom() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bloomRef = useRef<any>(null);

  useFrame(() => {
    if (!bloomRef.current) return;
    // Flare shares the one boundary curve with the FOV punch + pulse surge.
    bloomRef.current.intensity = THREE.MathUtils.lerp(
      bloomRef.current.intensity,
      1.3 + boundaryTakeover() * 2.3,
      0.12
    );
  });

  return (
    <EffectComposer multisampling={0}>
      <Bloom ref={bloomRef} mipmapBlur intensity={1.3} luminanceThreshold={0.08} luminanceSmoothing={0.3} />
      <ToneMapping mode={ToneMappingMode.REINHARD} />
      <Noise premultiply opacity={0.045} />
      <Vignette offset={0.2} darkness={0.85} />
    </EffectComposer>
  );
}

/** Disposes the GL renderer when the Canvas unmounts (e.g. route navigation). */
function GlDispose() {
  const { gl } = useThree();
  useEffect(() => () => { gl.dispose(); }, [gl]);
  return null;
}

/** Violet key light that follows the camera, so foreground nodes are always modelled. */
function CameraLight() {
  const ref = useRef<THREE.PointLight>(null);
  const { camera } = useThree();
  useFrame(() => {
    if (!ref.current) return;
    ref.current.position.copy(camera.position);
    ref.current.position.x += 3;
    ref.current.position.y += 2.5;
  });
  return <pointLight ref={ref} color="#9a6cff" intensity={120} distance={45} decay={2} />;
}

/** Subtle cursor parallax — the whole field leans toward the pointer. */
function CursorLook() {
  const target = useRef({ x: 0, y: 0 });
  const cur = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  // Runs after TheatreCamera (which resets rotation each frame) and before
  // ClusterProjector, so the offset is consistent between render and card anchoring.
  useFrame(({ camera }) => {
    cur.current.x += (target.current.x - cur.current.x) * 0.04;
    cur.current.y += (target.current.y - cur.current.y) * 0.04;
    camera.rotation.y += cur.current.x * 0.05;
    camera.rotation.x += -cur.current.y * 0.035;
  });
  return null;
}

export default function NeuralScene() {
  const [lowPower, setLowPower] = useState<boolean | null>(null);
  // After 3 consecutive FPS flipflops, drop post-processing entirely.
  const [degraded, setDegraded] = useState(false);
  const goldLightRef = useRef<THREE.PointLight>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setLowPower(window.innerWidth < 900 || navigator.hardwareConcurrency <= 4);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const data = useMemo(
    () => (lowPower === null ? null : generateNetwork(lowPower)),
    [lowPower]
  );

  if (data === null || lowPower === null) return null;

  return (
    <div className="neural-scene" aria-hidden="true">
      <Canvas
        dpr={[1, lowPower ? 1.25 : 1.75]}
        gl={{ antialias: !lowPower, powerPreference: "high-performance" }}
        camera={{ fov: 58, near: 0.1, far: 220, position: [0, 0.5, 51] }}
        onCreated={({ gl }) => {
          // Survive a GPU reset (Windows TDR / driver hiccup): calling
          // preventDefault lets the browser restore the same context instead
          // of leaving every WebGL surface permanently white.
          const canvas = gl.domElement;
          canvas.addEventListener(
            "webglcontextlost",
            (e) => e.preventDefault(),
            false
          );
        }}
      >
        {/* Phase 6: adaptive DPR + performance safety valve */}
        <PerformanceMonitor
          flipflops={3}
          onFallback={() => setDegraded(true)}
        >
          <AdaptiveDpr pixelated />
        </PerformanceMonitor>
        <GlDispose />

        <color attach="background" args={["#0a0912"]} />
        <fogExp2 attach="fog" args={["#0a0912", 0.022]} />

        <ambientLight intensity={0.22} color="#4633a0" />
        <CameraLight />
        {/* Warm light parked at the active cluster; CameraRig moves it */}
        <pointLight ref={goldLightRef} color="#E6D3A3" intensity={60} distance={30} decay={2} />

        <HeatGrid lowPower={lowPower} />
        <Network data={data} />
        <Pulses data={data} count={lowPower ? 60 : 150} />
        <ClusterIgnite lowPower={lowPower} />
        <DataReadouts />
        <TheatreCamera lightRef={goldLightRef} />
        <CursorLook />
        <ClusterProjector />
        <ReadySignal />

        {!lowPower && !degraded && <DynamicBloom />}
      </Canvas>

      <style jsx>{`
        .neural-scene {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          /* subpages have no curtain: ease the scene in instead of popping */
          animation: sceneFadeIn 1.1s ease-out both;
        }

        @keyframes sceneFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
