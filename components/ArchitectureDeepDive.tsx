"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";

type MilestoneKey = "m1" | "m2" | "m3" | "m4";
type SurfaceKey = "venues" | "music";

const milestoneColors: Record<MilestoneKey, string> = {
  m1: "#7C3AED",
  m2: "#FBBF24",
  m3: "#06B6D4",
  m4: "#EC4899",
};

const milestones = [
  {
    key: "m1" as const,
    number: "01",
    stage: "Data In",
    title: "Intelligence Infrastructure",
    summary:
      "Raw behavior becomes measurable insight through decision frameworks, acquisition systems, and optimization loops.",
    flow: "Behavior patterns + raw signals → intelligence insights",
    items: [
      {
        title: "Module 1: Decision Framework",
        what: "Define what you are measuring and why.",
        how: ["Identify behavioral triggers", "Define success metrics", "Set baseline measurements"],
        output: "KPIs, decision criteria, measurement baseline",
      },
      {
        title: "Module 2: Acquisition System",
        what: "Map the behavioural mechanics of commercial environments — not categories, not sentiment, but the operating mechanisms that determine why customers return, spend, and refer.",
        how: [
          "Extract multi-source behavioural signals and structure them through an ontology layer",
          "Score venues across fitness dimensions and audience archetypes using Bayesian inference",
          "Convert intelligence into a field execution framework — 8-phase acquisition system deployed live at each venue",
        ],
        output:
          "Behavioural fitness profiles, audience archetype maps, competitor intelligence by behavioural similarity, and a proven acquisition playbook per venue",
      },
      {
        title: "Module 3: Optimization System",
        what: "Identify patterns and recommend improvements.",
        how: ["Run pattern recognition", "Calculate correlations", "Generate recommendations"],
        output: "Actionable insights, interventions, impact predictions",
      },
    ],
  },
  {
    key: "m2" as const,
    number: "02",
    stage: "Execution",
    title: "IP & Records Layer",
    summary:
      "The cultural execution surface where intelligence informs creator development, owned IP, and audience relationships.",
    flow: "Intelligence insights → records execution",
    items: [
      {
        title: "Artist Discovery & Development",
        what: "Match creators to opportunities and track development.",
        how: ["Use intelligence from M1", "Compare creator fit", "Measure growth signals"],
        output: "Developed talent, success benchmarks",
      },
      {
        title: "IP Creation & Ownership",
        what: "Turn behavioral patterns and creative assets into owned content.",
        how: ["Create original assets", "Manage rights", "Build catalog value"],
        output: "Owned catalog, licensing options, revenue streams",
      },
      {
        title: "Audience Ownership",
        what: "Build direct relationships with audiences.",
        how: ["Capture engagement patterns", "Develop communities", "Strengthen retention"],
        output: "First-party audience data, loyalty, repeatable demand",
      },
    ],
  },
  {
    key: "m3" as const,
    number: "03",
    stage: "Monetization",
    title: "External Services",
    summary:
      "The infrastructure becomes commercially useful through creator services, licensing, and implementation work.",
    flow: "IP + audience data → external services leverage",
    items: [
      {
        title: "Creator / Artist Services",
        what: "Offer production, distribution, and growth support.",
        how: ["Apply behavioral insights", "Optimize release paths", "Track conversion"],
        output: "SaaS fees, revenue share, retainers",
      },
      {
        title: "Infrastructure Licensing",
        what: "License intelligence systems to partners.",
        how: ["Expose platform access", "Package decision frameworks", "Support integrations"],
        output: "API licensing, enterprise tiers",
      },
      {
        title: "Consulting & Implementation",
        what: "Deploy custom behavioral strategy for complex ecosystems.",
        how: ["Map the system", "Instrument feedback loops", "Train operating teams"],
        output: "Project fees, implementation services",
      },
    ],
  },
  {
    key: "m4" as const,
    number: "04",
    stage: "Revenue",
    title: "Distribution & Ownership",
    summary:
      "The final layer: distribution control, rights leverage, and long-term ecosystem sovereignty.",
    flow: "Service revenue + margin → distribution control",
    items: [
      {
        title: "Distribution Infrastructure",
        what: "Reduce dependency on third-party channels.",
        how: ["Build direct channels", "Expand platform presence", "Control delivery"],
        output: "Lower dependency, stronger margins",
      },
      {
        title: "Rights & Catalog Management",
        what: "Control ownership and licensing decisions.",
        how: ["Own IP", "Structure licenses", "Track rights value"],
        output: "Perpetual revenue, licensing leverage",
      },
      {
        title: "Monetization Sovereignty",
        what: "Capture more value from the ecosystem.",
        how: ["Control pricing", "Shape partner agreements", "Protect margins"],
        output: "Sustainable long-term value",
      },
    ],
  },
];

const appliedSurfaces: Record<SurfaceKey, {
  label: string;
  eyebrow: string;
  color: string;
  examples: string[];
}> = {
  venues: {
    label: "Venue Revenue Optimisation",
    eyebrow: "Live environments",
    color: "#7C3AED",
    examples: [
      "Measure baseline venue behavior before changing the experience.",
      "Track sales timing, dwell time, audience retention, and response quality.",
      "Use live entertainment as an operational variable, not a decorative add-on.",
      "Turn repeatable patterns into show formats and venue playbooks.",
    ],
  },
  music: {
    label: "Music Creation & Production",
    eyebrow: "Cultural output",
    color: "#FBBF24",
    examples: [
      "Study how structure, lyric, emotion, and production choices shape listener response.",
      "Use audience and context signals to guide creative decisions without flattening taste.",
      "Develop music that is creatively strong and behaviorally aware.",
      "Convert learning from releases back into artist development and owned IP strategy.",
    ],
  },
};

// ─── Timeline ──────────────────────────────────────────────────────────────

function TimelineEntry({
  milestone,
  expandedModules,
  hoveredModule,
  onToggle,
  onHover,
}: {
  milestone: (typeof milestones)[number];
  expandedModules: Set<string>;
  hoveredModule: { milestone: MilestoneKey; index: number } | null;
  onToggle: (key: string) => void;
  onHover: (v: { milestone: MilestoneKey; index: number } | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const color = milestoneColors[milestone.key];

  return (
    <motion.div
      ref={ref}
      className="tl-entry"
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Timeline dot */}
      <div className="tl-dot-wrap">
        <div className="tl-dot" style={{ background: color, boxShadow: `0 0 16px ${color}88` }} />
      </div>

      {/* Content */}
      <div className="tl-content" id={`milestone-${milestone.key}`}>
        <div className="tl-header">
          <span className="tl-stage" style={{ color }}>{milestone.stage}</span>
          <span className="tl-number">{milestone.number}</span>
        </div>
        <h3 className="tl-title">{milestone.title}</h3>
        <p className="tl-summary">{milestone.summary}</p>

        <div className="module-grid">
          {milestone.items.map((item, index) => {
            const moduleKey = `${milestone.key}-${index}`;
            const expanded = expandedModules.has(moduleKey);
            const hovered =
              hoveredModule?.milestone === milestone.key && hoveredModule.index === index;

            return (
              <div
                key={item.title}
                className={`module-card card${expanded || hovered ? " expanded" : ""}`}
                style={{ "--milestone-color": color } as CSSProperties}
                onMouseEnter={() => onHover({ milestone: milestone.key, index })}
                onMouseLeave={() => onHover(null)}
              >
                <button
                  type="button"
                  aria-expanded={expanded}
                  onClick={() => onToggle(moduleKey)}
                >
                  <span>{item.title}</span>
                </button>
                <div className="module-body">
                  <div className="module-body-inner">
                    <p>{item.what}</p>
                    <ul>
                      {item.how.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                    <div className="output">Output: {item.output}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="tl-flow">{milestone.flow}</div>
      </div>
    </motion.div>
  );
}

function MilestoneTimeline({
  expandedModules,
  hoveredModule,
  onToggle,
  onHover,
}: {
  expandedModules: Set<string>;
  hoveredModule: { milestone: MilestoneKey; index: number } | null;
  onToggle: (key: string) => void;
  onHover: (v: { milestone: MilestoneKey; index: number } | null) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 12%", "end 68%"],
  });
  const beamHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="tl-container">
      {/* Track */}
      <div className="tl-track" aria-hidden="true">
        <div className="tl-track-line" />
        <motion.div className="tl-track-beam" style={{ height: beamHeight }} />
      </div>

      {/* Entries */}
      <div className="tl-entries">
        {milestones.map((m) => (
          <TimelineEntry
            key={m.key}
            milestone={m}
            expandedModules={expandedModules}
            hoveredModule={hoveredModule}
            onToggle={onToggle}
            onHover={onHover}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────

export default function ArchitectureDeepDive() {
  const [hoveredModule, setHoveredModule] = useState<{ milestone: MilestoneKey; index: number } | null>(null);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(() => new Set());
  const [selectedSurface, setSelectedSurface] = useState<SurfaceKey>("venues");
  const surface = appliedSurfaces[selectedSurface];

  const toggleModule = (moduleKey: string) => {
    setExpandedModules((current) => {
      const next = new Set(current);
      if (next.has(moduleKey)) next.delete(moduleKey);
      else next.add(moduleKey);
      return next;
    });
  };

  return (
    <main className="architecture-page">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="architecture-hero">
        <div className="hero-aurora" aria-hidden="true" />
        <div className="hero-grid-overlay" aria-hidden="true" />
        <div className="container hero-content">
          <motion.span
            className="t-label hero-eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            The Behavioral Intelligence Stack
          </motion.span>
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            From behavior<br />to ownership.
          </motion.h1>
          <motion.p
            className="hero-desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: "easeOut" }}
          >
            Polynovea turns fragmented human behavior into intelligence, uses that intelligence
            to create IP, commercializes the infrastructure, and compounds toward distribution control.
          </motion.p>
          <motion.div
            className="hero-chips"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.38 }}
          >
            {milestones.map((m) => (
              <a
                key={m.key}
                href={`#milestone-${m.key}`}
                className="hero-chip"
                style={{ "--chip-color": milestoneColors[m.key] } as CSSProperties}
              >
                <span className="chip-dot" aria-hidden="true" />
                {m.number} — {m.title}
              </a>
            ))}
          </motion.div>
        </div>
        <div className="hero-fade" aria-hidden="true" />
      </section>

      {/* ── Timeline breakdown ───────────────────────────────────────── */}
      <section className="section breakdown-section">
        <div className="container">
          <div className="section-heading" data-reveal>
            <span className="t-label" style={{ color: "var(--accent-authority)" }}>
              Milestone Breakdown
            </span>
            <h2 className="t-display-md">Four compounding layers.</h2>
          </div>
          <MilestoneTimeline
            expandedModules={expandedModules}
            hoveredModule={hoveredModule}
            onToggle={toggleModule}
            onHover={setHoveredModule}
          />
        </div>
      </section>

      {/* ── Applied Surfaces ─────────────────────────────────────────── */}
      <section className="section surface-section">
        <div className="container">
          <div className="section-heading" data-reveal>
            <span className="t-label" style={{ color: "var(--accent-authority)" }}>
              Applied Surfaces
            </span>
            <h2 className="t-display-md">Where the framework is being tested first.</h2>
            <p className="t-body-lg">
              The system is strongest when it stays close to measurable reality. For now, the clearest
              surfaces are live venues and music creation.
            </p>
          </div>

          <div className="surface-tabs" data-reveal>
            {(Object.keys(appliedSurfaces) as SurfaceKey[]).map((key) => (
              <button
                key={key}
                className={key === selectedSurface ? "active" : ""}
                style={{ "--surface-color": appliedSurfaces[key].color } as CSSProperties}
                onClick={() => setSelectedSurface(key)}
              >
                {appliedSurfaces[key].label}
                <span>{appliedSurfaces[key].eyebrow}</span>
              </button>
            ))}
          </div>

          <div className="surface-card card" style={{ "--surface-color": surface.color } as CSSProperties} data-reveal>
            <div>
              <span className="t-label" style={{ color: surface.color }}>{surface.eyebrow}</span>
              <h3>{surface.label}</h3>
            </div>
            <div className="surface-flow">
              {surface.examples.map((example, index) => (
                <div key={example} className="surface-step">
                  <span>M{index + 1}</span>
                  <p>{example}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Intelligence Flow ────────────────────────────────────────── */}
      <section className="section data-section">
        <div className="container">
          <div className="section-heading" data-reveal>
            <span className="t-label" style={{ color: "var(--accent-authority)" }}>
              Intelligence Flow
            </span>
            <h2 className="t-display-md">How signal becomes leverage.</h2>
          </div>
          <div className="sankey-card card" data-reveal>
            {[
              "Raw behavior input",
              "Decision framework",
              "Acquisition system",
              "Optimization system",
              "Execution layer",
              "Monetization",
              "Sovereignty",
              "Sustainable value",
            ].map((step, index) => (
              <div key={step} className="sankey-step">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
                {index < 7 && <i />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="section architecture-cta">
        <div className="container cta-card card">
          <span className="t-label" style={{ color: "var(--accent-authority)" }}>
            Build The System
          </span>
          <h2>Bring behavioral intelligence into your ecosystem.</h2>
          <p>
            Partner with Polynovea to define the signals, build the measurement layer, and turn
            behavior into a compounding operating advantage.
          </p>
          <div className="cta-actions">
            <Link href="/#contact" className="btn btn-primary">Partner with us</Link>
            <a href="#milestone-m1" className="btn btn-secondary">Review the stack</a>
          </div>
        </div>
      </section>

      <style jsx>{`
        .architecture-page {
          background: rgba(9, 8, 16, 0.62);
          color: var(--text-primary);
        }

        /* ─── Hero ─────────────────────────────────────────────────── */
        .architecture-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding-top: var(--nav-height);
        }

        /* Aurora gradient layer */
        .hero-aurora {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 20% 20%, rgba(124, 58, 237, 0.28) 0%, transparent 55%),
            radial-gradient(ellipse 60% 50% at 80% 70%, rgba(6, 182, 212, 0.14) 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 55% 40%, rgba(236, 72, 153, 0.1) 0%, transparent 45%);
          animation: auroraShift 12s ease-in-out infinite alternate;
        }

        @keyframes auroraShift {
          0%   { opacity: 0.85; transform: scale(1) translate(0, 0); }
          33%  { opacity: 1;    transform: scale(1.04) translate(-1%, 1%); }
          66%  { opacity: 0.9;  transform: scale(1.02) translate(1%, -1%); }
          100% { opacity: 0.85; transform: scale(1) translate(0, 0); }
        }

        /* Subtle dot grid */
        .hero-grid-overlay {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px);
          background-size: 36px 36px;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%);
        }

        .hero-fade {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 38%;
          background: linear-gradient(to bottom, transparent, #090810);
          pointer-events: none;
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 860px;
          padding-bottom: var(--space-4xl);
        }

        .hero-eyebrow {
          display: block;
          color: var(--accent-authority);
          margin-bottom: var(--space-lg);
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(52px, 7vw, 104px);
          font-weight: 700;
          line-height: 0.97;
          letter-spacing: -0.03em;
          margin: 0 0 var(--space-xl);
          background: linear-gradient(135deg, #fff 60%, rgba(168, 132, 255, 0.7));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-desc {
          color: var(--text-secondary);
          max-width: 520px;
          margin-bottom: var(--space-2xl);
          font-size: clamp(15px, 1.6vw, 18px);
          line-height: 1.6;
        }

        .hero-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .hero-chip {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          border-radius: var(--radius-pill);
          padding: 7px 14px 7px 10px;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.01em;
          line-height: 1;
          white-space: nowrap;
          text-decoration: none;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-muted);
          transition: all 0.2s ease;
        }

        .hero-chip:hover {
          color: var(--text-primary);
          border-color: var(--chip-color);
          background: color-mix(in srgb, var(--chip-color) 10%, transparent);
          box-shadow: 0 0 18px color-mix(in srgb, var(--chip-color) 22%, transparent);
          transform: translateY(-1px);
        }

        .chip-dot {
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--chip-color);
          box-shadow: 0 0 6px var(--chip-color);
          flex-shrink: 0;
        }

        /* ─── Timeline ─────────────────────────────────────────────── */
        .tl-container {
          display: grid;
          grid-template-columns: 48px 1fr;
          gap: 0 var(--space-2xl);
          position: relative;
        }

        .tl-track {
          position: relative;
          grid-column: 1;
          grid-row: 1 / -1;
        }

        .tl-track-line {
          position: absolute;
          left: 50%;
          top: 16px;
          bottom: 16px;
          width: 2px;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.06);
          border-radius: 1px;
        }

        .tl-track-beam {
          position: absolute;
          left: 50%;
          top: 16px;
          width: 2px;
          transform: translateX(-50%);
          background: linear-gradient(to bottom, #7C3AED, #06B6D4, #EC4899);
          border-radius: 1px;
          will-change: height;
        }

        .tl-entries {
          grid-column: 2;
          display: flex;
          flex-direction: column;
          gap: var(--space-5xl);
          padding-bottom: var(--space-5xl);
        }

        .tl-entry {
          display: contents;
        }

        /* Dot positioned on the track */
        .tl-dot-wrap {
          grid-column: 1;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 10px;
          position: relative;
          z-index: 1;
        }

        .tl-dot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 2px solid rgba(9, 8, 16, 0.8);
          flex-shrink: 0;
        }

        /* Entry content */
        .tl-content {
          grid-column: 2;
          padding-bottom: var(--space-4xl);
        }

        .tl-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--space-md);
        }

        .tl-stage {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .tl-number {
          font-family: var(--font-display);
          font-size: 72px;
          font-weight: 700;
          line-height: 1;
          color: rgba(255, 255, 255, 0.04);
          letter-spacing: -0.02em;
          user-select: none;
        }

        .tl-title {
          font-family: var(--font-display);
          font-size: clamp(30px, 4vw, 52px);
          font-weight: 700;
          line-height: 1.07;
          letter-spacing: -0.02em;
          margin: 0 0 var(--space-md);
          color: var(--text-primary);
        }

        .tl-summary {
          color: var(--text-secondary);
          font-size: 15px;
          line-height: 1.65;
          max-width: 640px;
          margin: 0 0 var(--space-xl);
        }

        .tl-flow {
          margin-top: var(--space-xl);
          padding-top: var(--space-md);
          border-top: 1px solid var(--border-muted);
          color: var(--accent-authority);
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.01em;
        }

        /* ─── Module cards ─────────────────────────────────────────── */
        .module-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-md);
        }

        @media (max-width: 1024px) {
          .module-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 600px) {
          .module-grid { grid-template-columns: 1fr; }
        }

        .module-card {
          position: relative;
          padding: 0;
          overflow: hidden;
          transition:
            border-color var(--duration-default) ease,
            box-shadow var(--duration-default) ease,
            transform var(--duration-default) ease,
            background var(--duration-default) ease;
        }

        .module-card::before {
          content: "";
          position: absolute;
          inset: 0 auto 0 0;
          width: 3px;
          background: var(--milestone-color);
          opacity: 0.85;
        }

        .module-card:hover,
        .module-card.expanded {
          background: color-mix(in srgb, var(--milestone-color) 8%, rgba(24,24,27,0.65));
          border-color: color-mix(in srgb, var(--milestone-color) 54%, var(--border-muted));
          box-shadow: 0 0 28px color-mix(in srgb, var(--milestone-color) 18%, transparent);
          transform: scale(1.02);
        }

        .module-card button {
          width: 100%;
          min-height: 72px;
          padding: var(--space-lg);
          padding-left: calc(var(--space-lg) + 3px);
          background: transparent;
          border: 0;
          cursor: pointer;
          color: var(--text-primary);
          font: inherit;
          font-weight: 700;
          line-height: 1.35;
          text-align: left;
        }

        @media (max-width: 768px) {
          .module-card button {
            min-height: 64px;
            padding: var(--space-md);
            padding-left: calc(var(--space-md) + 3px);
            font-size: 14px;
          }
        }

        .module-card button span { display: block; }

        .module-card p,
        .module-card li,
        .output {
          color: var(--text-secondary);
          font-size: 14px;
          line-height: 1.55;
        }

        .module-body {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows var(--duration-default) ease;
        }

        .module-card.expanded .module-body,
        .module-card:hover .module-body,
        .module-card:focus-within .module-body {
          grid-template-rows: 1fr;
        }

        .module-body-inner {
          min-height: 0;
          overflow: hidden;
          padding-inline: var(--space-lg);
          padding-left: calc(var(--space-lg) + 3px);
        }

        .module-card.expanded .module-body-inner,
        .module-card:hover .module-body-inner,
        .module-card:focus-within .module-body-inner {
          padding-bottom: var(--space-lg);
        }

        .module-card p { margin-top: 0; }

        .module-card ul {
          margin: var(--space-md) 0;
          padding-left: 0;
          list-style: none;
        }

        .module-card li {
          position: relative;
          padding-left: 18px;
          margin-top: 8px;
        }

        .module-card li::before {
          content: "->";
          position: absolute;
          left: 0;
          color: var(--accent-intelligence);
        }

        .output {
          border-top: 1px solid var(--border-muted);
          padding-top: var(--space-md);
        }

        /* ─── Section headings ─────────────────────────────────────── */
        .section-heading {
          max-width: 820px;
          margin-bottom: var(--space-3xl);
        }

        .section-heading h2 {
          color: var(--text-primary);
          margin-top: var(--space-md);
        }

        .section-heading p { margin-top: var(--space-md); }

        /* ─── Applied surfaces ─────────────────────────────────────── */
        .surface-tabs {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-sm);
          margin-bottom: var(--space-lg);
        }

        .surface-tabs button {
          border-radius: var(--radius-md);
          padding: var(--space-md);
          text-align: left;
          color: var(--text-primary);
          font-weight: 700;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border-muted);
          cursor: pointer;
          transition: all var(--duration-default) ease;
        }

        .surface-tabs button span {
          display: block;
          margin-top: 4px;
          color: var(--text-disabled);
          font-size: 12px;
          font-weight: 500;
        }

        .surface-tabs button.active {
          border-color: var(--surface-color);
          box-shadow: 0 0 24px color-mix(in srgb, var(--surface-color) 24%, transparent);
        }

        .surface-card {
          padding: var(--space-xl);
          border-color: color-mix(in srgb, var(--surface-color) 36%, var(--border-muted));
        }

        .surface-card h3 {
          font-family: var(--font-display);
          font-size: 36px;
          margin-top: var(--space-sm);
        }

        .surface-flow {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-md);
          margin-top: var(--space-xl);
        }

        @media (max-width: 1024px) {
          .surface-flow { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .surface-flow { grid-template-columns: 1fr; }
          .surface-tabs { grid-template-columns: 1fr; }
        }

        .surface-step {
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border-muted);
          border-radius: var(--radius-md);
          padding: var(--space-md);
        }

        .surface-step span {
          color: var(--surface-color);
          font-weight: 800;
        }

        .surface-step p {
          color: var(--text-secondary);
          margin-top: var(--space-sm);
          font-size: 14px;
        }

        /* ─── Intelligence flow ────────────────────────────────────── */
        .sankey-card {
          padding: var(--space-xl);
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: var(--space-sm);
        }

        @media (max-width: 1024px) {
          .sankey-card { grid-template-columns: repeat(4, 1fr); }
        }

        @media (max-width: 600px) {
          .sankey-card { grid-template-columns: repeat(2, 1fr); }
        }

        .sankey-step {
          position: relative;
          padding: var(--space-md);
          border-radius: var(--radius-md);
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border-muted);
          min-height: 110px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .sankey-step span {
          color: var(--accent-authority);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
        }

        .sankey-step strong {
          color: var(--text-primary);
          font-size: 13px;
          line-height: 1.35;
        }

        .sankey-step i {
          position: absolute;
          right: -1px;
          top: 50%;
          width: 0;
          height: 0;
          border-top: 7px solid transparent;
          border-bottom: 7px solid transparent;
          border-left: 8px solid var(--border-muted);
          transform: translateY(-50%);
          z-index: 1;
        }

        /* ─── CTA ──────────────────────────────────────────────────── */
        .cta-card {
          padding: var(--space-xl);
          text-align: center;
        }

        .cta-card h2 {
          font-family: var(--font-display);
          font-size: clamp(28px, 4vw, 48px);
          line-height: 1.1;
          margin: var(--space-sm) 0 var(--space-md);
        }

        .cta-card p { color: var(--text-secondary); }

        .cta-actions {
          display: flex;
          justify-content: center;
          gap: var(--space-md);
          flex-wrap: wrap;
          margin-top: var(--space-xl);
        }

        /* ─── Timeline responsive ──────────────────────────────────── */
        @media (max-width: 900px) {
          .tl-container {
            grid-template-columns: 32px 1fr;
            gap: 0 var(--space-lg);
          }

          .tl-number { font-size: 48px; }
        }

        @media (max-width: 600px) {
          .tl-container {
            grid-template-columns: 24px 1fr;
            gap: 0 var(--space-md);
          }

          .tl-dot { width: 12px; height: 12px; }

          .architecture-hero { min-height: 85vh; }

          .hero-title { font-size: clamp(44px, 12vw, 72px); }

          .cta-card {
            padding: var(--space-lg);
          }

          .cta-card h2 { font-size: clamp(24px, 5vw, 36px); }

          .cta-actions { flex-direction: column; gap: var(--space-sm); }
          .cta-actions a { width: 100%; }
        }
      `}</style>
    </main>
  );
}
