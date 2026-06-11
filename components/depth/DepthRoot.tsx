"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { depthState, SECTION_COUNT } from "@/lib/depthStore";

export interface DepthPaneDef {
  /** anchor id placed at this pane's scroll offset (for #links) */
  id?: string;
  node: ReactNode;
}

const DESKTOP_MIN_WIDTH = 900;
const ENTER_SCALE = 0.84;
const EXIT_SCALE = 1.2;
const ENTER_BLUR_PX = 12;
const EXIT_BLUR_PX = 8;

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

/**
 * Z-axis section pager. The document provides (N-1) viewports of scroll
 * range; every pane is a fixed full-viewport layer. Scroll progress fades
 * and scales panes so new sections arrive from the back (small, blurred)
 * while outgoing sections fly past the camera (enlarged, fading).
 *
 * Mobile and reduced-motion users get a normal scrolling page instead.
 */
export default function DepthRoot({ panes }: { panes: DepthPaneDef[] }) {
  const [mode, setMode] = useState<"flow" | "depth">("flow");
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDepth = window.innerWidth >= DESKTOP_MIN_WIDTH && !reduced;
    depthState.mode = isDepth ? "depth" : "flow";
    setMode(depthState.mode);
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
      const vh = window.innerHeight;
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
        if (dist >= 1) {
          if (el.style.visibility !== "hidden") el.style.visibility = "hidden";
          // Disassemble hidden panes so they re-animate on return.
          if (el.classList.contains("pane-assembled")) el.classList.remove("pane-assembled");
          return;
        }
        if (el.style.visibility !== "visible") el.style.visibility = "visible";

        let scale: number;
        let opacity: number;
        let blur: number;
        if (local >= 0) {
          // Arriving from the depths of the network.
          const t = easeOutQuart(1 - local);
          scale = ENTER_SCALE + (1 - ENTER_SCALE) * t;
          opacity = Math.pow(1 - local, 1.7);
          blur = ENTER_BLUR_PX * local;
        } else {
          // Flying past the camera.
          const v = -local;
          scale = 1 + (EXIT_SCALE - 1) * v * v;
          opacity = Math.max(0, 1 - v * 1.9);
          blur = EXIT_BLUR_PX * v;
        }
        el.style.opacity = opacity.toFixed(3);
        el.style.transform = `scale(${scale.toFixed(4)})`;
        el.style.filter = blur > 0.2 ? `blur(${blur.toFixed(1)}px)` : "none";

        // Born from the network: the legibility well + scale origin sit on this
        // cluster's projected point (the camera tracks it, so ~centre — correct
        // for readability). The card's children stream in from the *incoming*
        // cluster's direction (i+1, off-centre as it drifts in from the depths),
        // so content arrives along the synapse the camera is flying down.
        const cs = depthState.clusterScreen[i];
        const src = depthState.clusterScreen[Math.min(i + 1, SECTION_COUNT - 1)];
        const ox = (cs.x * 100).toFixed(1);
        const oy = (cs.y * 100).toFixed(1);
        el.style.transformOrigin = `${ox}% ${oy}%`;
        el.style.setProperty("--birth-x", `${((src.x - 0.5) * 140).toFixed(1)}px`);
        el.style.setProperty("--birth-y", `${((src.y - 0.5) * 120 + 26).toFixed(1)}px`);

        // Card assembly: snap children in when the camera arrives.
        const assembled = local > -0.38 && local < 0.18;
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

  // Snap each scroll gesture to a whole section.
  useEffect(() => {
    if (mode !== "depth") return;
    let trigger: import("gsap/ScrollTrigger").ScrollTrigger | undefined;
    let cancelled = false;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      trigger = ScrollTrigger.create({
        start: 0,
        end: () => (SECTION_COUNT - 1) * window.innerHeight,
        snap: {
          snapTo: 1 / (SECTION_COUNT - 1),
          duration: { min: 0.65, max: 1.1 },
          ease: "power3.out",
          delay: 0.22,
          directional: true,
        },
      });
    };
    init();
    return () => {
      cancelled = true;
      trigger?.kill();
    };
  }, [mode]);

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
      {/* Scroll track: provides range + anchor targets for #links */}
      <div className="depth-track" style={{ height: `${SECTION_COUNT * 100}vh` }}>
        {panes.map((p, i) =>
          p.id ? (
            <div key={p.id} id={p.id} style={{ position: "absolute", top: `${i * 100}vh` }} />
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
