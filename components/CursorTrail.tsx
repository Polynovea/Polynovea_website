"use client";

import { useEffect, useRef } from "react";
import { depthState } from "@/lib/depthStore";

const TRAIL_LEN = 28;
const FADE_MS = 700;

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const trail: { x: number; y: number; born: number }[] = [];
    let raf = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const onMove = (e: PointerEvent) => {
      trail.push({ x: e.clientX, y: e.clientY, born: performance.now() });
      if (trail.length > TRAIL_LEN) trail.shift();
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const draw = () => {
      raf = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (depthState.sceneMode !== "journey") return;

      const now = performance.now();
      for (let i = 0; i < trail.length; i++) {
        const age = (now - trail[i].born) / FADE_MS;
        if (age >= 1) continue;
        const progress = i / trail.length;
        const alpha = (1 - age) * progress * 0.55;
        const radius = 2 + progress * 6 * (1 - age);

        const g = ctx.createRadialGradient(
          trail[i].x, trail[i].y, 0,
          trail[i].x, trail[i].y, radius
        );
        g.addColorStop(0, `rgba(168, 132, 255, ${alpha})`);
        g.addColorStop(1, `rgba(124, 58, 237, 0)`);

        ctx.beginPath();
        ctx.arc(trail[i].x, trail[i].y, radius, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9998,
      }}
    />
  );
}
