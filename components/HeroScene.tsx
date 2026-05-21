"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    // Create particle system — cosmic visualization of Astrophysics, Art, Music, AI, Data
    const particleCount = 800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("velocity", new THREE.BufferAttribute(velocities, 3));

    // Circle sprite texture so particles render as dots, not squares
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.4, "rgba(255,255,255,0.6)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(32, 32, 32, 0, Math.PI * 2);
    ctx.fill();
    const sprite = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 0.04,
      color: new THREE.Color("#C4B5E8"),
      map: sprite,
      transparent: true,
      opacity: 0.35,
      sizeAttenuation: true,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particlesRef.current = particles;

    // Mouse tracking for interaction
    const onMouseMove = (e: MouseEvent) => {
      targetMouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Handle window resize
    const onWindowResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", onWindowResize);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Smooth mouse following
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05;

      // Update particles
      const positionArray = geometry.getAttribute("position") as THREE.BufferAttribute;
      const velocityArray = geometry.getAttribute("velocity") as THREE.BufferAttribute;
      const positions = positionArray.array as Float32Array;
      const velocities = velocityArray.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        // Update position
        positions[i * 3] += velocities[i * 3];
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        positions[i * 3 + 2] += velocities[i * 3 + 2];

        // Mouse repulsion physics
        const dx = positions[i * 3] - mouseRef.current.x * 5;
        const dy = positions[i * 3 + 1] - mouseRef.current.y * 5;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 2) {
          const force = (2 - distance) * 0.01;
          velocities[i * 3] += (dx / distance) * force;
          velocities[i * 3 + 1] += (dy / distance) * force;
        }

        // Bounce off boundaries
        const boundary = 5;
        if (positions[i * 3] > boundary) velocities[i * 3] *= -1;
        if (positions[i * 3] < -boundary) velocities[i * 3] *= -1;
        if (positions[i * 3 + 1] > boundary) velocities[i * 3 + 1] *= -1;
        if (positions[i * 3 + 1] < -boundary) velocities[i * 3 + 1] *= -1;
        if (positions[i * 3 + 2] > boundary) velocities[i * 3 + 2] *= -1;
        if (positions[i * 3 + 2] < -boundary) velocities[i * 3 + 2] *= -1;

        // Damping
        velocities[i * 3] *= 0.995;
        velocities[i * 3 + 1] *= 0.995;
        velocities[i * 3 + 2] *= 0.995;
      }

      positionArray.needsUpdate = true;

      // Subtle camera rotation
      camera.position.x = Math.sin(Date.now() * 0.0001) * 0.5;
      camera.position.y = Math.cos(Date.now() * 0.00008) * 0.3;
      camera.lookAt(0, 0, 0);

      // Rotate particles
      particles.rotation.x += 0.0001;
      particles.rotation.y += 0.00015;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onWindowResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
}
