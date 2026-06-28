"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { depthState, SECTION_COUNT } from "@/lib/depthStore";

export interface DepthPaneDef {
  /** anchor id placed at this pane's scroll offset (for #links) */
  id?: string;
  node: ReactNode;
}

// Depth mode runs on all screen sizes; only reduced-motion opts out.
const ENTER_SCALE = 0.84;
const EXIT_SCALE = 1.2;
const ENTER_BLUR_PX = 12;
const EXIT_BLUR_PX = 8;

/** Measure 100svh in px once — stable regardless of address-bar shifts. */
function measureSvh(): number {
  const el = document.createElement("div");
  el.style.cssText = "position:fixed;top:0;left:0;height:100svh;width:0;pointer-events:none;visibility:hidden;";
  document.body.appendChild(el);
  const h = el.offsetHeight;
  document.body.removeChild(el);
  return h || window.innerHeight;
}

/**
 * Z-axis section pager. The document provides (N-1) viewports of scroll
 * range; every pane is a fixed full-viewport layer. Scroll progress fades
 * and scales panes so new sections arrive from the back (small, blurred)
 * while outgoing sections fly past the camera (enlarged, fading).
 *
 * Reduced-motion users get a normal scrolling page instead.
 * Touch devices use CSS scroll-snap; pointer devices use GSAP snap.
 */
export default function DepthRoot({ panes }: { panes: DepthPaneDef[] }) {
  const [mode, setMode] = useState<"flow" | "depth">("flow");
  const viewportRef = useRef<HTMLDivElement>(null);
  const svhRef = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 899px)").matches;
    const isDepth = !reduced && !isMobile;
    const isTouch = isDepth && window.matchMedia("(pointer: coarse)").matches;

    depthState.mode = isDepth ? "depth" : "flow";
    setMode(depthState.mode);

    if (isDepth) {
      svhRef.current = measureSvh();
      if (isTouch) {
        // CSS scroll-snap handles snapping on touch; mark html so the CSS rule fires.
        document.documentElement.classList.add("depth-touch");
      }
    }

    return () => {
      document.documentElement.classList.remove("depth-touch");
    };
  }, []);

  // Drive pane styles + global progress from scroll, frame-synced.
  useEffect(() => {
    if (mode !== "depth") return;

    const viewport = viewportRef.current;
    if (!viewport) return;
    const els = Array.from(viewport.querySelectorAll<HTMLDivElement>(".depth-pane"));

    let raf = 0;
    let activeIndex = -1;

    document.body.classList.add("depth-mode");

    const update = () => {
      raf = requestAnimationFrame(update);
      // Use the stable svh measurement so address-bar drift doesn't shift the maths.
      const vh = svhRef.current || window.innerHeight;
      const max = (SECTION_COUNT - 1) * vh;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      depthState.progress = p;
      const f = p * (SECTION_COUNT - 1);

      const nextActive = Math.round(f);
      if (nextActive !== activeIndex) {
        activeIndex = nextActive;
        els.forEach((el, i) => {
          el.style.pointerEvents = i === activeIndex ? "auto" : "none";
        });
      }

      els.forEach((el, i) => {
        const local = i - f; // >0 upcoming (behind, deeper), <0 passed (flew by)
        const dist = Math.abs(local);
        // Only the two panes straddling the playhead render; anything a full
        // step away is hidden so we never stack three panes at once.
        if (dist >= 1.0) {
          if (el.style.visibility !== "hidden") el.style.visibility = "hidden";
          // Disassemble hidden panes so they re-animate on return.
          if (el.classList.contains("pane-assembled")) el.classList.remove("pane-assembled");
          return;
        }
        if (el.style.visibility !== "visible") el.style.visibility = "visible";

        // Continuous reveal: a wide fully-legible plateau, then a smooth cross-fade
        // into the neighbour. Because each pane stays readable across most of its
        // band, free (un-snapped) scrolling never strands content half-hidden.
        // Linear cross-fade between the two straddling panes: their opacities
        // sum to ~1, so it's never blank (no gap) and never both fully opaque
        // (no muddy stack). One pane dominates near its centre; a soft dissolve
        // at the midpoint. Continuous — no snap.
        const reveal = Math.max(0, 1 - dist);

        // Gentle depth: upcoming sits slightly back/small; passed drifts forward.
        const scale =
          local >= 0
            ? ENTER_SCALE + (1 - ENTER_SCALE) * reveal
            : 1 + (EXIT_SCALE - 1) * (1 - reveal) * 0.5;
        const blur = (1 - reveal) * (local >= 0 ? ENTER_BLUR_PX : EXIT_BLUR_PX) * 0.6;

        el.style.opacity = reveal.toFixed(3);
        el.style.transform = `scale(${scale.toFixed(4)})`;
        el.style.filter = blur > 0.2 ? `blur(${blur.toFixed(1)}px)` : "none";

        const cs = depthState.clusterScreen[i];
        const src = depthState.clusterScreen[Math.min(i + 1, SECTION_COUNT - 1)];
        const ox = (cs.x * 100).toFixed(1);
        const oy = (cs.y * 100).toFixed(1);
        el.style.transformOrigin = `${ox}% ${oy}%`;
        el.style.setProperty("--birth-x", `${((src.x - 0.5) * 140).toFixed(1)}px`);
        el.style.setProperty("--birth-y", `${((src.y - 0.5) * 120 + 26).toFixed(1)}px`);

        // Assemble children across the whole readable plateau (not just dead-centre),
        // so content is present throughout continuous scrolling.
        const assembled = dist < 0.6;
        if (assembled !== el.classList.contains("pane-assembled")) {
          if (assembled) el.classList.add("pane-assembled");
          else el.classList.remove("pane-assembled");
        }

        // Lens opacity: scene bleeds through at the crossing midpoint.
        const lensEl = el.querySelector<HTMLElement>(".depth-lens");
        if (lensEl) {
          lensEl.style.setProperty("--lens-x", `${ox}%`);
          lensEl.style.setProperty("--lens-y", `${oy}%`);
          lensEl.style.opacity = Math.max(0, 1 - dist * 1.6).toFixed(3);
        }
      });
    };
    raf = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(raf);
      document.body.classList.remove("depth-mode");
    };
  }, [mode]);

  // Continuous scroll (1C): the elastic section-snap is gone so the journey
  // scrubs like film. Safe now that the reveal bands above keep every section
  // (incl. contact) legible without needing to land exactly on it. Lenis
  // (SmoothScroll) supplies the smoothing; camera + panes read continuous progress.

  if (mode === "flow") {
    return (
      <div className="depth-flow">
        {panes.map((p, i) => (
          <section key={i} id={p.id} className="depth-flow-pane">
            {p.node}
          </section>
        ))}
      </div>
    );
  }

  return (
    <>
      {/* Scroll track: provides range + anchor targets for #links.
          svh = small viewport height — stable, unaffected by address-bar shifts. */}
      <div className="depth-track" style={{ height: `${SECTION_COUNT * 100}svh` }}>
        {/* CSS scroll-snap targets (touch). One per section, each 100svh tall. */}
        {Array.from({ length: SECTION_COUNT }, (_, i) => (
          <div key={`snap-${i}`} className="depth-snap-zone" style={{ top: `${i * 100}svh` }} />
        ))}
        {panes.map((p, i) =>
          p.id ? (
            <div key={p.id} id={p.id} style={{ position: "absolute", top: `${i * 100}svh` }} />
          ) : null
        )}
      </div>

      <div ref={viewportRef} className="depth-viewport">
        {panes.map((p, i) => (
          <div
            key={i}
            className={`depth-pane${i === 0 ? " pane-assembled" : ""}`}
            style={i === 0 ? undefined : { opacity: 0, visibility: "hidden" }}
          >
            {/* Dynamic legibility lens — opacity driven by JS so scene bleeds through at crossings */}
            <div className="depth-lens" />
            {p.node}
          </div>
        ))}
      </div>
    </>
  );
}
