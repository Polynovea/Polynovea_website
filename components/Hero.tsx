"use client";

import { useEffect } from "react";
import Link from "next/link";
import { depthState, REVEAL_OPEN_EVENT } from "@/lib/depthStore";

export default function Hero() {
  useEffect(() => {
    let played = false;
    const play = () => {
      if (played) return;
      played = true;
      import("gsap").then(({ gsap }) => {
        const tl = gsap.timeline({ delay: 0.25 });
        // The whole block resolves out of a soft blur + slight push-back, as if
        // the page is focusing into place behind the parting curtain.
        tl.fromTo(
          ".hero-content",
          { scale: 0.965, filter: "blur(8px)" },
          { scale: 1, filter: "blur(0px)", duration: 1.3, ease: "power3.out" }
        );
        tl.fromTo(
          ".hero-headline",
          { opacity: 0, y: 44, filter: "blur(14px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power4.out" },
          "-=1.2"
        );
        tl.fromTo(
          ".hero-sub",
          { opacity: 0, y: 25, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.0, ease: "power3.out" },
          "-=0.95"
        );
        tl.fromTo(
          ".hero-ctas",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.7"
        );
        tl.fromTo(
          ".hero-scroll-hint",
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.3"
        );
      });
    };

    // Sync the headline entrance with the curtain opening.
    if (depthState.revealOpen) play();
    window.addEventListener(REVEAL_OPEN_EVENT, play, { once: true });
    const fallback = setTimeout(play, 5200);
    return () => {
      window.removeEventListener(REVEAL_OPEN_EVENT, play);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1 className="hero-headline" style={{ opacity: 0 }}>
          We are building the system that{" "}
          <span className="gold-accent">reads, maps, and acts on</span>{" "}
          human behaviour.
        </h1>

        <p className="hero-sub" style={{ opacity: 0 }}>
          Deep-tech AI, behavioral-intelligence and decision infrastructure. Infrakinetic -
          our enterprise operating system - is the current commercial lead, with each domain
          sharpening the same intelligence underneath.
        </p>

        <p className="hero-byline" style={{ opacity: 0 }}>
          By Polynovea Intelligence Team · Updated August 20, 2026
        </p>

        <div className="hero-ctas" style={{ opacity: 0 }}>
          <Link href="/projects" className="btn btn-primary">
            Explore Products
          </Link>
          <Link href="/architecture" className="btn btn-secondary">
            See the Architecture
          </Link>
        </div>
      </div>

      <div className="hero-scroll-hint" style={{ opacity: 0 }}>
        <span className="hint-label">Scroll to go deeper</span>
        <span className="hint-line" />
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding-top: var(--nav-height);
        }

        .hero-content {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: var(--space-4xl) var(--space-xl);
          max-width: 900px;
          margin-inline: auto;
        }

        .hero-headline {
          font-family: var(--font-display);
          font-size: clamp(40px, 6vw, 80px);
          font-weight: 600;
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          margin-bottom: var(--space-xl);
          text-shadow: 0 2px 40px rgba(10, 9, 18, 0.9);
        }

        .gold-accent {
          color: var(--accent-authority);
          font-weight: inherit;
        }

        .hero-sub {
          font-size: clamp(16px, 1.5vw, 19px);
          line-height: 1.7;
          color: var(--text-secondary);
          max-width: 680px;
          margin-inline: auto;
          margin-bottom: var(--space-2xl);
        }

        .hero-byline {
          font-size: 12px;
          color: var(--text-disabled);
          font-family: var(--font-mono, monospace);
          letter-spacing: 0.06em;
          margin-bottom: var(--space-lg);
        }

        .hero-ctas {
          display: flex;
          gap: var(--space-md);
          justify-content: center;
          flex-wrap: wrap;
        }

        .hero-scroll-hint {
          position: absolute;
          bottom: 36px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          z-index: 1;
        }

        .hint-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--text-disabled);
        }

        .hint-line {
          width: 1px;
          height: 36px;
          background: linear-gradient(to bottom, var(--accent-authority), transparent);
          animation: hintDrop 2s ease-in-out infinite;
        }

        @keyframes hintDrop {
          0% { transform: scaleY(0); transform-origin: top; opacity: 1; }
          60% { transform: scaleY(1); transform-origin: top; opacity: 1; }
          100% { transform: scaleY(1); transform-origin: top; opacity: 0; }
        }
      `}</style>
    </section>
  );
}
