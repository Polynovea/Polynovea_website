"use client";

import { useEffect, useRef, useState } from "react";
import { depthState, REVEAL_OPEN_EVENT, SCENE_READY_EVENT } from "@/lib/depthStore";

const MIN_HOLD_MS = 1700;
const SCENE_TIMEOUT_MS = 4500;
const OPEN_DURATION_MS = 1350;

/**
 * Curtain reveal. Two dark glass panels hold a wordmark and thesis line
 * while the WebGL network boots behind them. The moment the scene reports
 * its first rendered frame (or a safety timeout fires), the panels part
 * and the camera begins its intro dolly into the network.
 */
export default function PageReveal() {
  // Client nav back to home: the show already happened, skip the curtain.
  const [phase, setPhase] = useState<"hold" | "opening" | "done">(() =>
    depthState.revealOpen ? "done" : "hold"
  );
  const mounted = useRef(true);

  useEffect(() => {
    if (depthState.revealOpen) return;
    mounted.current = true;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    document.documentElement.classList.add("reveal-lock");

    const startedAt = performance.now();
    let opened = false;
    let timeoutId: ReturnType<typeof setTimeout>;
    let doneId: ReturnType<typeof setTimeout>;

    const open = () => {
      if (opened || !mounted.current) return;
      opened = true;
      depthState.revealOpen = true;
      window.dispatchEvent(new Event(REVEAL_OPEN_EVENT));
      setPhase("opening");
      doneId = setTimeout(() => {
        if (!mounted.current) return;
        document.documentElement.classList.remove("reveal-lock");
        setPhase("done");
      }, reduced ? 80 : OPEN_DURATION_MS);
    };

    const onSceneReady = () => {
      const elapsed = performance.now() - startedAt;
      const wait = reduced ? 0 : Math.max(0, MIN_HOLD_MS - elapsed);
      timeoutId = setTimeout(open, wait);
    };

    if (depthState.sceneReady) {
      // Scene booted before we mounted (layout-persistent canvas).
      onSceneReady();
    } else {
      window.addEventListener(SCENE_READY_EVENT, onSceneReady, { once: true });
    }
    // Safety net: never trap the visitor behind the curtain.
    const safetyId = setTimeout(open, SCENE_TIMEOUT_MS);

    return () => {
      mounted.current = false;
      clearTimeout(timeoutId);
      clearTimeout(safetyId);
      clearTimeout(doneId);
      window.removeEventListener(SCENE_READY_EVENT, onSceneReady);
      document.documentElement.classList.remove("reveal-lock");
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div className={`reveal ${phase === "opening" ? "reveal-opening" : ""}`} aria-hidden="true">
      <div className="reveal-panel reveal-left" />
      <div className="reveal-panel reveal-right" />
      <div className="reveal-seam" />

      <div className="reveal-center">
        <span className="reveal-kicker">Behavioral Intelligence</span>
        <div className="reveal-wordmark">POLYNOVEA</div>
        <div className="reveal-rule" />
        <p className="reveal-line">
          We read, map, and act on human behaviour.
        </p>
      </div>

      <style jsx>{`
        .reveal {
          position: fixed;
          inset: 0;
          z-index: 10000;
          overflow: hidden;
          pointer-events: all;
        }

        .reveal-panel {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 50.5%;
          background:
            radial-gradient(120% 100% at 100% 50%, rgba(124, 58, 237, 0.10) 0%, transparent 55%),
            linear-gradient(160deg, #0d0b16 0%, #08070f 60%, #0a0814 100%);
          transition: transform ${OPEN_DURATION_MS}ms cubic-bezier(0.85, 0, 0.15, 1);
          will-change: transform;
        }
        .reveal-left { left: -0.25%; }
        .reveal-right {
          right: -0.25%;
          background:
            radial-gradient(120% 100% at 0% 50%, rgba(124, 58, 237, 0.10) 0%, transparent 55%),
            linear-gradient(200deg, #0d0b16 0%, #08070f 60%, #0a0814 100%);
        }

        .reveal-seam {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 1px;
          transform: translateX(-50%);
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(230, 211, 163, 0.55) 30%,
            rgba(230, 211, 163, 0.85) 50%,
            rgba(230, 211, 163, 0.55) 70%,
            transparent 100%
          );
          box-shadow: 0 0 24px 2px rgba(230, 211, 163, 0.35);
          animation: seamBreathe 2.4s ease-in-out infinite;
          transition: opacity 400ms ease;
        }

        @keyframes seamBreathe {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 1; }
        }

        .reveal-center {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 18px;
          text-align: center;
          padding-inline: 24px;
          transition: opacity 480ms ease, transform 480ms ease;
        }

        .reveal-kicker {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.34em;
          text-transform: uppercase;
          color: var(--accent-authority-muted);
          animation: revealFadeUp 0.9s ease-out 0.15s both;
        }

        .reveal-wordmark {
          font-family: var(--font-display);
          font-size: clamp(40px, 7vw, 92px);
          font-weight: 600;
          letter-spacing: 0.08em;
          line-height: 1;
          color: var(--text-primary);
          text-shadow: 0 0 60px rgba(124, 58, 237, 0.45);
          animation: revealFadeUp 1s ease-out 0.3s both;
        }

        .reveal-rule {
          width: 64px;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--accent-authority), transparent);
          animation: revealRule 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.55s both;
        }

        .reveal-line {
          font-family: var(--font-body);
          font-size: clamp(14px, 1.4vw, 17px);
          color: var(--text-secondary);
          letter-spacing: 0.02em;
          animation: revealFadeUp 1s ease-out 0.7s both;
        }

        @keyframes revealFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes revealRule {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        .reveal-opening { pointer-events: none; }
        .reveal-opening .reveal-left { transform: translateX(-101%); }
        .reveal-opening .reveal-right { transform: translateX(101%); }
        .reveal-opening .reveal-seam { opacity: 0; }
        .reveal-opening .reveal-center {
          opacity: 0;
          transform: scale(1.04);
        }
      `}</style>
    </div>
  );
}
