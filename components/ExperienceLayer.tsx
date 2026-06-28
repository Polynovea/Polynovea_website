"use client";

import { useEffect, useState } from "react";
import { EtheralShadow } from "@/components/ui/etheral-shadow";
import PageTransition from "@/components/PageTransition";

export default function ExperienceLayer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 899px), (pointer: coarse)").matches);
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", backgroundColor: "rgb(7, 6, 16)" }}
      >
        {/* Wave layer — animation disabled on mobile to avoid continuous JS animation loop */}
        <EtheralShadow
          color="rgba(100, 40, 220, 1)"
          animation={isMobile ? undefined : { scale: 100, speed: 90 }}
          noise={isMobile ? undefined : { opacity: 0.6, scale: 1.2 }}
          sizing="fill"
        />
        {/* Frosted glass diffusion — desktop only; backdrop-filter is expensive on mobile GPUs */}
        {!isMobile && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backdropFilter: "blur(28px) saturate(120%)",
              WebkitBackdropFilter: "blur(28px) saturate(120%)",
              backgroundColor: "rgba(7, 6, 16, 0.25)",
            }}
          />
        )}
      </div>
      <PageTransition />
    </>
  );
}
