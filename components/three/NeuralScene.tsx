"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { depthState, SCENE_READY_EVENT, SECTION_COUNT } from "@/lib/depthStore";
import { generateNetwork } from "./networkData";
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

/** Bloom that surges at section-crossing boundaries. */
function DynamicBloom() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bloomRef = useRef<any>(null);

  useFrame(() => {
    if (!bloomRef.current) return;
    const f = depthState.progress * (SECTION_COUNT - 1);
    const frac = f - Math.floor(f);
    const boundaryT = Math.max(0, 1 - Math.abs(frac - 0.5) * 5.5);
    bloomRef.current.intensity = THREE.MathUtils.lerp(
      bloomRef.current.intensity,
      0.85 + boundaryT * 2.0,
      0.06
    );
  });

  return (
    <EffectComposer multisampling={0}>
      <Bloom ref={bloomRef} mipmapBlur intensity={0.85} luminanceThreshold={0.34} luminanceSmoothing={0.32} />
      <Vignette offset={0.22} darkness={0.78} />
    </EffectComposer>
  );
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

export default function NeuralScene() {
  const [lowPower, setLowPower] = useState<boolean | null>(null);
  const goldLightRef = useRef<THREE.PointLight>(null);

  useEffect(() => {
    setLowPower(window.innerWidth < 900 || navigator.hardwareConcurrency <= 4);
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
        <color attach="background" args={["#0a0912"]} />
        <fogExp2 attach="fog" args={["#0a0912", 0.02]} />

        <ambientLight intensity={0.22} color="#4633a0" />
        <CameraLight />
        {/* Warm light parked at the active cluster; CameraRig moves it */}
        <pointLight ref={goldLightRef} color="#E6D3A3" intensity={60} distance={30} decay={2} />

        <HeatGrid lowPower={lowPower} />
        <Network data={data} />
        <Pulses data={data} count={lowPower ? 36 : 90} />
        <ClusterIgnite lowPower={lowPower} />
        <DataReadouts />
        <TheatreCamera lightRef={goldLightRef} />
        <ReadySignal />

        {!lowPower && <DynamicBloom />}
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
