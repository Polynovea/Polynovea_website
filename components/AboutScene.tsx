"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 120;
const CONNECTION_DISTANCE = 1.8;

const INITIAL_NODE_POSITIONS = (() => {
  const arr = new Float32Array(NODE_COUNT * 3);
  for (let i = 0; i < NODE_COUNT; i++) {
    arr[i * 3]     = (Math.random() - 0.5) * 10;
    arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
    arr[i * 3 + 2] = (Math.random() - 0.5) * 4;
  }
  return arr;
})();

const INITIAL_NODE_VELOCITIES = (() => {
  const arr = new Float32Array(NODE_COUNT * 3);
  for (let i = 0; i < NODE_COUNT; i++) {
    arr[i * 3]     = (Math.random() - 0.5) * 0.002;
    arr[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
    arr[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
  }
  return arr;
})();

const INITIAL_LINE_POSITIONS = (() => {
  const nodes: number[][] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push([
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 4,
    ]);
  }
  const lines: number[] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    for (let j = i + 1; j < NODE_COUNT; j++) {
      const dx = nodes[i][0] - nodes[j][0];
      const dy = nodes[i][1] - nodes[j][1];
      const dz = nodes[i][2] - nodes[j][2];
      if (Math.sqrt(dx * dx + dy * dy + dz * dz) < CONNECTION_DISTANCE) {
        lines.push(...nodes[i], ...nodes[j]);
      }
    }
  }
  return new Float32Array(lines);
})();

function Nodes() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const entranceRef = useRef({ scale: 0 });

  const positionsRef = useRef<Float32Array | null>(null);
  const velocitiesRef = useRef<Float32Array | null>(null);
  const currentRef = useRef<Float32Array | null>(null);

  if (positionsRef.current == null) {
    positionsRef.current = INITIAL_NODE_POSITIONS;
  }
  if (velocitiesRef.current == null) {
    velocitiesRef.current = INITIAL_NODE_VELOCITIES.slice();
  }
  if (currentRef.current == null) {
    currentRef.current = INITIAL_NODE_POSITIONS.slice();
  }

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    // Entrance scale animation using GSAP
    import("gsap").then(({ gsap }) => {
      gsap.to(entranceRef.current, {
        scale: 1,
        duration: 1.5,
        ease: "power2.out",
      });
    });

    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current || !currentRef.current || !velocitiesRef.current) return;
    timeRef.current += delta;

    const current = currentRef.current;
    const velocities = velocitiesRef.current;

    for (let i = 0; i < NODE_COUNT; i++) {
      current[i * 3]     += velocities[i * 3];
      current[i * 3 + 1] += velocities[i * 3 + 1];
      current[i * 3 + 2] += velocities[i * 3 + 2];
      if (Math.abs(current[i * 3])     > 5.5) velocities[i * 3]     *= -1;
      if (Math.abs(current[i * 3 + 1]) > 3.5) velocities[i * 3 + 1] *= -1;
      if (Math.abs(current[i * 3 + 2]) > 2.5) velocities[i * 3 + 2] *= -1;

      // Mathematical stagger reveal based on index
      const nodeDelay = i * 0.006;
      const nodeEntrance = Math.max(0, Math.min(1, (entranceRef.current.scale * 1.5) - nodeDelay));
      const pulse = (0.04 + Math.sin(timeRef.current * 1.5 + i * 0.3) * 0.015) * nodeEntrance;

      dummy.position.set(
        current[i * 3]     + mouseRef.current.x * 0.08,
        current[i * 3 + 1] + mouseRef.current.y * 0.08,
        current[i * 3 + 2]
      );
      dummy.scale.setScalar(pulse);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      const c = new THREE.Color("#A78BFA");
      c.multiplyScalar((0.8 + Math.sin(timeRef.current + i) * 0.2) * nodeEntrance);
      meshRef.current.setColorAt(i, c);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, NODE_COUNT]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial roughness={0.25} metalness={0.8} transparent opacity={1} vertexColors />
    </instancedMesh>
  );
}

function Connections() {
  const linesRef = useRef<THREE.LineSegments>(null);
  const timeRef  = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta;
    if (linesRef.current) linesRef.current.rotation.y = Math.sin(timeRef.current * 0.05) * 0.03;
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[INITIAL_LINE_POSITIONS, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#7C3AED" transparent opacity={0.35} />
    </lineSegments>
  );
}

function CameraRig() {
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 0.4;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 0.2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(({ camera }) => {
    camera.position.x += (mouseRef.current.x - camera.position.x) * 0.03;
    camera.position.y += (mouseRef.current.y - camera.position.y) * 0.03;
  });

  return null;
}

function StudioRig() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} color="#F5F5F5" />
      <pointLight position={[-5, -3, -2]} intensity={0.8} color="#E6D3A3" />
    </>
  );
}

export default function AboutScene() {
  return (
    <div className="about-canvas">
      <Canvas 
        camera={{ position: [0, 0, 7], fov: 55 }} 
        gl={{ antialias: true, alpha: true }} 
        dpr={[1, 2]}
        style={{ background: "transparent" }}
      >
        <StudioRig />
        <CameraRig />
        <Nodes />
        <Connections />
      </Canvas>
      <style jsx>{`
        .about-canvas {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
