"use client";

import { useEffect } from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Skip Lenis on phones / touch devices: native scroll is smoother there,
    // and Lenis driving ScrollTrigger via its scroll event proved unreliable
    // on touch (reveal content got stuck hidden). Reveals on these devices run
    // through a dependency-free IntersectionObserver instead (see ScrollReveal).
    if (window.matchMedia("(max-width: 899px), (pointer: coarse)").matches) return;

    let lenis: import("lenis").default | null = null;

    const init = async () => {
      const { default: Lenis } = await import("lenis");
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis!.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    };

    init();
    return () => { lenis?.destroy(); };
  }, []);

  return <>{children}</>;
}
