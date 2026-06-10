"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

const WARP_OUT_MS = 380; // content fades, scene stays
const FLIGHT_HOLD_MS = 520; // camera mid-flight to the new cluster
const WARP_IN_MS = 950;

/**
 * 3D route transitions. On internal link clicks the page content fades out
 * while the persistent WebGL camera flies to the destination's cluster,
 * then the new page fades in. Pure opacity on <main>/<footer> — transforms
 * or filters there would break position:fixed descendants (depth pager).
 */
export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const warping = useRef(false);
  const timers = useRef<number[]>([]);

  // Phase 1: intercept internal navigation, fade out, then push.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/")) return; // external or hash-only
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const url = new URL(href, window.location.origin);
      if (url.pathname === window.location.pathname) return; // same page (hash scroll)
      if (warping.current) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      warping.current = true;
      document.documentElement.classList.add("warp-out");
      timers.current.push(
        window.setTimeout(() => {
          router.push(href);
        }, WARP_OUT_MS)
      );
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  // Phase 2: new route mounted — hold a beat for the flight, then fade in.
  useEffect(() => {
    if (!warping.current) return;
    const html = document.documentElement;
    timers.current.push(
      window.setTimeout(() => {
        html.classList.remove("warp-out");
        html.classList.add("warp-in");
        timers.current.push(
          window.setTimeout(() => {
            html.classList.remove("warp-in");
            warping.current = false;
          }, WARP_IN_MS)
        );
      }, FLIGHT_HOLD_MS)
    );
  }, [pathname]);

  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach((t) => window.clearTimeout(t));
      document.documentElement.classList.remove("warp-out", "warp-in");
    };
  }, []);

  return null;
}
