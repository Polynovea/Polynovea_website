"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Only on non-touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    document.body.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };

    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const onEnterLink = () => {
      dotRef.current?.classList.add("expanded");
      ringRef.current?.classList.add("expanded");
    };

    const onLeaveLink = () => {
      dotRef.current?.classList.remove("expanded");
      ringRef.current?.classList.remove("expanded");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    document.querySelectorAll("a, button, [role='button']").forEach((el) => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot-container">
        <div className="cursor-dot-child" />
      </div>
      <div ref={ringRef} className="cursor-ring-container">
        <div className="cursor-ring-child" />
      </div>

      <style jsx global>{`
        .cursor-dot-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 8px;
          height: 8px;
          pointer-events: none;
          z-index: 9999;
          will-change: transform;
        }

        .cursor-dot-child {
          width: 100%;
          height: 100%;
          background: var(--accent-intelligence);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--accent-intelligence-glow),
                      0 0 20px var(--accent-intelligence-glow);
          will-change: transform;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease, box-shadow 0.2s ease;
        }

        .cursor-dot-container.expanded .cursor-dot-child {
          transform: scale(1.5);
          background: var(--accent-authority);
          box-shadow: 0 0 14px rgba(230, 211, 163, 0.5);
        }

        .cursor-ring-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 40px;
          height: 40px;
          pointer-events: none;
          z-index: 9998;
          will-change: transform;
        }

        .cursor-ring-child {
          width: 100%;
          height: 100%;
          border: 1px solid rgba(124, 58, 237, 0.5);
          border-radius: 50%;
          will-change: transform;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease,
                      opacity 0.2s ease;
        }

        .cursor-ring-container.expanded .cursor-ring-child {
          transform: scale(1.4);
          border-color: rgba(230, 211, 163, 0.4);
        }

        @media (hover: none) {
          .cursor-dot-container,
          .cursor-ring-container {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
