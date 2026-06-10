"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { depthState, routeClusterIndex } from "@/lib/depthStore";
import PageTransition from "@/components/PageTransition";

const NeuralScene = dynamic(() => import("@/components/three/NeuralScene"), {
  ssr: false,
});

/**
 * Site-wide WebGL layer. Lives in the root layout so the canvas (and its
 * camera) survives client navigation — page changes become camera flights
 * through the same neural network instead of repaints.
 */
export default function ExperienceLayer() {
  const pathname = usePathname();

  useEffect(() => {
    const isHome = pathname === "/";
    depthState.sceneMode = isHome ? "journey" : "ambient";
    depthState.ambientIndex = routeClusterIndex(pathname);
    if (!isHome) {
      // Subpages have no curtain; let the camera intro dolly run immediately.
      depthState.revealOpen = true;
    }
  }, [pathname]);

  return (
    <>
      <NeuralScene />
      <PageTransition />
    </>
  );
}
