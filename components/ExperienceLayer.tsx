"use client";

import { EtheralShadow } from "@/components/ui/etheral-shadow";
import PageTransition from "@/components/PageTransition";

export default function ExperienceLayer() {
  return (
    <>
      <div
        aria-hidden="true"
        style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", backgroundColor: "rgb(7, 6, 16)" }}
      >
        {/* Wave layer */}
        <EtheralShadow
          color="rgba(100, 40, 220, 1)"
          animation={{ scale: 100, speed: 90 }}
          noise={{ opacity: 0.6, scale: 1.2 }}
          sizing="fill"
        />
        {/* Frosted glass diffusion — softens orbs, keeps wave movement visible */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backdropFilter: "blur(28px) saturate(120%)",
            WebkitBackdropFilter: "blur(28px) saturate(120%)",
            backgroundColor: "rgba(7, 6, 16, 0.25)",
          }}
        />
      </div>
      <PageTransition />
    </>
  );
}
