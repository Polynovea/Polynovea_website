"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { depthState, SECTION_COUNT } from "@/lib/depthStore";

export interface DepthPaneDef {
  /** anchor id placed at this pane's scroll offset (for #links) */
  id?: string;
  node: ReactNode;
}

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
 * Z-axis section pager. The background camera moves continuously through the
 * neural scene, while only one content pane is readable at a time. This keeps
 * the immersive depth effect without allowing adjacent copy/cards to collide.
 * Reduced-motion and mobile users get a normal scrolling page instead.
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
        document.documentElement.classList.add("depth-touch");
      }
    }

    return () => {
      document.documentElement.classList.remove("depth-touch");
    };
  }, []);

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
        const local = i - f;
        const dist = Math.abs(local);
        const isActive = i === activeIndex;

        if (!isActive) {
          el.style.visibility = "hidden";
          el.style.opacity = "0";
          if (el.classList.contains("pane-assembled")) {
            el.classList.remove("pane-assembled");
          }
          return;
        }

        el.style.visibility = "visible";
        el.style.opacity = "1";

        // Keep a very small sense of depth inside the active band without
        // making content drift into neighbouring sections.
        const scale = 1 - Math.min(0.025, dist * 0.05);
        el.style.transform = `scale(${scale.toFixed(4)})`;
        el.style.filter = "none";

        const cs = depthState.clusterScreen[i];
        const src = depthState.clusterScreen[Math.min(i + 1, SECTION_COUNT - 1)];
        const ox = (cs.x * 100).toFixed(1);
        const oy = (cs.y * 100).toFixed(1);
        el.style.transformOrigin = `${ox}% ${oy}%`;
        el.style.setProperty("--birth-x", `${((src.x - 0.5) * 140).toFixed(1)}px`);
        el.style.setProperty("--birth-y", `${((src.y - 0.5) * 120 + 26).toFixed(1)}px`);

        if (!el.classList.contains("pane-assembled")) {
          el.classList.add("pane-assembled");
        }

        const lensEl = el.querySelector<HTMLElement>(".depth-lens");
        if (lensEl) {
          lensEl.style.setProperty("--lens-x", `${ox}%`);
          lensEl.style.setProperty("--lens-y", `${oy}%`);
          lensEl.style.opacity = Math.max(0.35, 1 - dist * 0.9).toFixed(3);
        }
      });
    };

    raf = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(raf);
      document.body.classList.remove("depth-mode");
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
      <div className="depth-track" style={{ height: `${SECTION_COUNT * 100}svh` }}>
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
            <div className="depth-lens" />
            {p.node}
          </div>
        ))}
      </div>
    </>
  );
}
