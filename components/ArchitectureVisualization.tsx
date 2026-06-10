"use client";

import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FlowNodes() {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scaleRefs = useRef([0, 0, 0, 0]);

  const basePositions = useMemo(
    () => [
      new THREE.Vector3(-2.5, 0, 0),
      new THREE.Vector3(-0.8, 0, 0),
      new THREE.Vector3(0.8, 0, 0),
      new THREE.Vector3(2.5, 0, 0),
    ],
    []
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    // Staggered reveal animation on mount using GSAP
    import("gsap").then(({ gsap }) => {
      scaleRefs.current.forEach((_, idx) => {
        const obj = { value: 0 };
        gsap.to(obj, {
          value: 1,
          duration: 1.0,
          delay: idx * 0.12,
          ease: "back.out(1.5)",
          onUpdate: () => {
            scaleRefs.current[idx] = obj.value;
          },
        });
      });
    });

    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    timeRef.current += delta;

    groupRef.current.children.forEach((child, i) => {
      if (!(child instanceof THREE.Mesh)) return;

      const base = basePositions[i];
      const cursor = new THREE.Vector3(mouseRef.current.x * 3, mouseRef.current.y * 2, 0);
      const distance = base.distanceTo(cursor);
      const driftStrength = distance < 3 ? (3 - distance) * 0.015 : 0;
      const target = base.clone().lerp(cursor, driftStrength);
      child.position.lerp(target, 0.08);

      const pulse = (1 + Math.sin(timeRef.current * 1.5 + i * 0.4) * 0.12) * scaleRefs.current[i];
      child.scale.setScalar(pulse);

      if (child.material instanceof THREE.MeshStandardMaterial) {
        child.material.opacity = (0.75 + Math.sin(timeRef.current * 1.5 + i * 0.4) * 0.15) * scaleRefs.current[i];
      } 
    });

    if (linesRef.current) {
      linesRef.current.rotation.y = Math.sin(timeRef.current * 0.05) * 0.03;
    }
  });

  const positions = basePositions.map((position) => position.toArray() as [number, number, number]);

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.22, 32, 32]} />
          <meshStandardMaterial 
            color="#7C3AED" 
            roughness={0.2} 
            metalness={0.9} 
            transparent 
            opacity={0.85} 
          />
        </mesh>
      ))}

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([
              -2.5, 0, 0, -0.8, 0, 0,
              -2.5, 0, 0, 0.8, 0, 0,
              -2.5, 0, 0, 2.5, 0, 0,
              -0.8, 0, 0, 0.8, 0, 0,
              -0.8, 0, 0, 2.5, 0, 0,
              0.8, 0, 0, 2.5, 0, 0,
            ]), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#7C3AED" transparent opacity={0.35} />
      </lineSegments>
    </group>
  );
}

function StudioRig() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} color="#F5F5F5" />
      <pointLight position={[-5, -3, -2]} intensity={0.8} color="#E6D3A3" />
    </>
  );
}

function CameraRig() {
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 0.3;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 0.15;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(({ camera }) => {
    camera.position.x += (mouseRef.current.x - camera.position.x) * 0.05;
    camera.position.y += (mouseRef.current.y - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function ArchitectureVisualization() {
  return (
    <div className="arch-canvas">
      <Canvas 
        camera={{ position: [0, 0, 3.5], fov: 55 }} 
        gl={{ antialias: true, alpha: true }} 
        dpr={[1, 2]}
        style={{ background: "transparent" }}
      >
        <StudioRig />
        <CameraRig />
        <FlowNodes />
      </Canvas>
      <style jsx>{`
        .arch-canvas {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
