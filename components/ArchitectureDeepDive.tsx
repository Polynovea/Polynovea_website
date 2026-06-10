"use client";

import { useRef, useState } from "react";
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
        output: "Behavioural fitness profiles, audience archetype maps, competitor intelligence by behavioural similarity, and a proven acquisition playbook per venue",
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
    summary: "The cultural execution surface where intelligence informs creator development, owned IP, and audience relationships.",
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
    summary: "The infrastructure becomes commercially useful through creator services, licensing, and implementation work.",
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
    summary: "The final layer: distribution control, rights leverage, and long-term ecosystem sovereignty.",
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

const appliedSurfaces: Record<SurfaceKey, { label: string; eyebrow: string; color: string; examples: string[] }> = {
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

// ─── TimelineEntry — own styled-jsx scope ────────────────────────────────────

function TimelineEntry({
  milestone,
  expandedModules,
  onToggle,
}: {
  milestone: (typeof milestones)[number];
  expandedModules: Set<string>;
  onToggle: (key: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const color = milestoneColors[milestone.key];
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <motion.div
      ref={ref}
      className="entry"
      id={`milestone-${milestone.key}`}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Dot on the timeline track */}
      <div
        className="entry-dot"
        style={{ background: color, boxShadow: `0 0 14px ${color}99` }}
        aria-hidden="true"
      />

      {/* Header row */}
      <div className="entry-head">
        <span className="entry-stage" style={{ color }}>{milestone.stage}</span>
        <span className="entry-num" aria-hidden="true">{milestone.number}</span>
      </div>

      {/* Title + summary */}
      <h3 className="entry-title">{milestone.title}</h3>
      <p className="entry-summary">{milestone.summary}</p>

      {/* Module cards */}
      <div className="mod-grid">
        {milestone.items.map((item, index) => {
          const key = `${milestone.key}-${index}`;
          const expanded = expandedModules.has(key);
          const hovered = hoveredIdx === index;
          const open = expanded || hovered;

          return (
            <div
              key={item.title}
              className={`mod-card${open ? " open" : ""}`}
              style={{ "--mc": color } as CSSProperties}
              onMouseEnter={() => setHoveredIdx(index)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <button
                type="button"
                aria-expanded={expanded}
                onClick={() => onToggle(key)}
              >
                {item.title}
              </button>
              <div className="mod-body">
                <div className="mod-inner">
                  <p>{item.what}</p>
                  <ul>
                    {item.how.map((line) => <li key={line}>{line}</li>)}
                  </ul>
                  <div className="mod-output">Output: {item.output}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Flow label */}
      <div className="entry-flow">{milestone.flow}</div>

      <style jsx>{`
        .entry {
          position: relative;
          padding-left: 52px;
          padding-bottom: var(--space-5xl);
        }

        .entry-dot {
          position: absolute;
          left: -8px;
          top: 14px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 2.5px solid #090810;
          z-index: 2;
        }

        .entry-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: var(--space-md);
        }

        .entry-stage {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .entry-num {
          font-family: var(--font-display);
          font-size: 64px;
          font-weight: 700;
          line-height: 1;
          color: rgba(255, 255, 255, 0.04);
          letter-spacing: -0.02em;
          user-select: none;
        }

        .entry-title {
          font-family: var(--font-display);
          font-size: clamp(28px, 3.5vw, 48px);
          font-weight: 700;
          line-height: 1.06;
          letter-spacing: -0.02em;
          margin: 0 0 var(--space-md);
          color: var(--text-primary);
        }

        .entry-summary {
          color: var(--text-secondary);
          font-size: 15px;
          line-height: 1.65;
          max-width: 620px;
          margin: 0 0 var(--space-xl);
        }

        /* Module grid */
        .mod-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-md);
        }

        @media (max-width: 1024px) {
          .mod-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 600px) {
          .mod-grid { grid-template-columns: 1fr; }
        }

        .mod-card {
          position: relative;
          overflow: hidden;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-muted);
          background: rgba(255, 255, 255, 0.02);
          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease,
            transform 0.2s ease,
            background 0.2s ease;
        }

        .mod-card::before {
          content: "";
          position: absolute;
          inset: 0 auto 0 0;
          width: 3px;
          background: var(--mc);
          opacity: 0.8;
          border-radius: 3px 0 0 3px;
        }

        .mod-card.open {
          background: color-mix(in srgb, var(--mc) 8%, rgba(24,24,27,0.6));
          border-color: color-mix(in srgb, var(--mc) 50%, var(--border-muted));
          box-shadow: 0 0 28px color-mix(in srgb, var(--mc) 16%, transparent);
          transform: translateY(-2px);
        }

        .mod-card button {
          width: 100%;
          min-height: 68px;
          padding: var(--space-md) var(--space-lg);
          padding-left: calc(var(--space-lg) + 3px);
          background: transparent;
          border: 0;
          cursor: pointer;
          color: var(--text-primary);
          font: inherit;
          font-size: 14px;
          font-weight: 700;
          line-height: 1.35;
          text-align: left;
        }

        /* Collapse via grid trick */
        .mod-body {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.25s ease;
        }

        .mod-card.open .mod-body {
          grid-template-rows: 1fr;
        }

        .mod-inner {
          min-height: 0;
          overflow: hidden;
          padding: 0 var(--space-lg);
          padding-left: calc(var(--space-lg) + 3px);
        }

        .mod-card.open .mod-inner {
          padding-bottom: var(--space-lg);
        }

        .mod-inner p,
        .mod-inner li,
        .mod-output {
          color: var(--text-secondary);
          font-size: 13px;
          line-height: 1.6;
          margin: 0;
        }

        .mod-inner ul {
          margin: var(--space-sm) 0;
          padding: 0;
          list-style: none;
        }

        .mod-inner li {
          position: relative;
          padding-left: 18px;
          margin-top: 6px;
        }

        .mod-inner li::before {
          content: "→";
          position: absolute;
          left: 0;
          color: var(--accent-intelligence);
          font-size: 11px;
        }

        .mod-output {
          border-top: 1px solid var(--border-muted);
          padding-top: var(--space-sm);
          margin-top: var(--space-sm);
        }

        .entry-flow {
          margin-top: var(--space-xl);
          padding-top: var(--space-md);
          border-top: 1px solid var(--border-muted);
          color: var(--accent-authority);
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 0.01em;
        }
      `}</style>
    </motion.div>
  );
}

// ─── MilestoneTimeline — own styled-jsx scope ────────────────────────────────

function MilestoneTimeline({
  expandedModules,
  onToggle,
}: {
  expandedModules: Set<string>;
  onToggle: (key: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 15%", "end 65%"],
  });
  const beamScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="tl">
      {/* Track */}
      <div className="tl-track" aria-hidden="true">
        <div className="tl-line" />
        <motion.div
          className="tl-beam"
          style={{ scaleY: beamScaleY, originY: 0 }}
        />
      </div>

      {/* Entries */}
      <div className="tl-entries">
        {milestones.map((m) => (
          <TimelineEntry
            key={m.key}
            milestone={m}
            expandedModules={expandedModules}
            onToggle={onToggle}
          />
        ))}
      </div>

      <style jsx>{`
        .tl {
          display: grid;
          grid-template-columns: 24px 1fr;
          gap: 0 var(--space-2xl);
          position: relative;
        }

        .tl-track {
          position: relative;
          grid-column: 1;
          grid-row: 1;
          /* Stretch to cover entries column height */
          align-self: stretch;
        }

        .tl-line {
          position: absolute;
          left: 50%;
          top: 24px;
          bottom: 24px;
          width: 2px;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.07);
          border-radius: 1px;
        }

        .tl-beam {
          position: absolute;
          left: 50%;
          top: 24px;
          bottom: 24px;
          width: 2px;
          transform: translateX(-50%);
          background: linear-gradient(to bottom, #7C3AED 0%, #06B6D4 60%, #EC4899 100%);
          border-radius: 1px;
          transform-origin: top center;
          will-change: transform;
        }

        .tl-entries {
          grid-column: 2;
          grid-row: 1;
        }

        @media (max-width: 768px) {
          .tl {
            grid-template-columns: 16px 1fr;
            gap: 0 var(--space-lg);
          }
        }
      `}</style>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ArchitectureDeepDive() {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(() => new Set());
  const [selectedSurface, setSelectedSurface] = useState<SurfaceKey>("venues");
  const surface = appliedSurfaces[selectedSurface];

  const toggleModule = (moduleKey: string) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(moduleKey)) next.delete(moduleKey);
      else next.add(moduleKey);
      return next;
    });
  };

  return (
    <main className="arch-page">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="arch-hero">
        <div className="hero-aurora" aria-hidden="true" />
        <div className="hero-dots" aria-hidden="true" />

        <div className="container hero-body">
          <motion.span
            className="hero-label"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            The Behavioral Intelligence Stack
          </motion.span>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            From behavior<br />to ownership.
          </motion.h1>

          <motion.p
            className="hero-desc"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" }}
          >
            Polynovea turns fragmented human behavior into intelligence, uses that intelligence
            to create IP, commercializes the infrastructure, and compounds toward
            distribution control.
          </motion.p>

          <motion.div
            className="hero-chips"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.36 }}
          >
            {milestones.map((m) => (
              <a
                key={m.key}
                href={`#milestone-${m.key}`}
                className="chip"
                style={{ "--cc": milestoneColors[m.key] } as CSSProperties}
              >
                <span className="chip-dot" aria-hidden="true" />
                {m.number} — {m.title}
              </a>
            ))}
          </motion.div>
        </div>

        <div className="hero-fade" aria-hidden="true" />
      </section>

      {/* ── Timeline breakdown ────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="sec-head" data-reveal>
            <span className="t-label" style={{ color: "var(--accent-authority)" }}>
              Milestone Breakdown
            </span>
            <h2 className="t-display-md">Four compounding layers.</h2>
          </div>

          <MilestoneTimeline
            expandedModules={expandedModules}
            onToggle={toggleModule}
          />
        </div>
      </section>

      {/* ── Applied Surfaces ──────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="sec-head" data-reveal>
            <span className="t-label" style={{ color: "var(--accent-authority)" }}>
              Applied Surfaces
            </span>
            <h2 className="t-display-md">Where the framework is being tested first.</h2>
            <p className="t-body-lg">
              The system is strongest when it stays close to measurable reality. For now, the clearest
              surfaces are live venues and music creation.
            </p>
          </div>

          <div className="surf-tabs" data-reveal>
            {(Object.keys(appliedSurfaces) as SurfaceKey[]).map((key) => (
              <button
                key={key}
                className={key === selectedSurface ? "active" : ""}
                style={{ "--sc": appliedSurfaces[key].color } as CSSProperties}
                onClick={() => setSelectedSurface(key)}
              >
                {appliedSurfaces[key].label}
                <span>{appliedSurfaces[key].eyebrow}</span>
              </button>
            ))}
          </div>

          <div
            className="surf-card card"
            style={{ "--sc": surface.color } as CSSProperties}
            data-reveal
          >
            <div>
              <span className="t-label" style={{ color: surface.color }}>{surface.eyebrow}</span>
              <h3>{surface.label}</h3>
            </div>
            <div className="surf-flow">
              {surface.examples.map((ex, i) => (
                <div key={ex} className="surf-step">
                  <span>M{i + 1}</span>
                  <p>{ex}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Intelligence Flow ─────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="sec-head" data-reveal>
            <span className="t-label" style={{ color: "var(--accent-authority)" }}>
              Intelligence Flow
            </span>
            <h2 className="t-display-md">How signal becomes leverage.</h2>
          </div>
          <div className="sankey card" data-reveal>
            {[
              "Raw behavior input", "Decision framework", "Acquisition system",
              "Optimization system", "Execution layer", "Monetization",
              "Sovereignty", "Sustainable value",
            ].map((step, i) => (
              <div key={step} className="sankey-step">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
                {i < 7 && <i />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="cta-card card">
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
        </div>
      </section>

      <style jsx>{`
        .arch-page {
          background: rgba(9, 8, 16, 0.62);
          color: var(--text-primary);
        }

        /* ── Hero ──────────────────────────────────────────────── */
        .arch-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding-top: var(--nav-height);
        }

        .hero-aurora {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 18% 22%, rgba(124, 58, 237, 0.30) 0%, transparent 52%),
            radial-gradient(ellipse 55% 45% at 82% 68%, rgba(6, 182, 212, 0.16) 0%, transparent 48%),
            radial-gradient(ellipse 45% 38% at 52% 42%, rgba(236, 72, 153, 0.10) 0%, transparent 44%);
          animation: aurora 14s ease-in-out infinite alternate;
        }

        @keyframes aurora {
          0%   { transform: scale(1) translate(0, 0); }
          50%  { transform: scale(1.05) translate(-1.5%, 1.2%); }
          100% { transform: scale(1) translate(1%, -0.8%); }
        }

        .hero-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 36px 36px;
          mask-image: radial-gradient(ellipse 75% 65% at 50% 50%, black 20%, transparent 100%);
        }

        .hero-fade {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 35%;
          background: linear-gradient(to bottom, transparent, #090810);
          pointer-events: none;
          z-index: 1;
        }

        .hero-body {
          position: relative;
          z-index: 2;
          max-width: 860px;
          padding-bottom: var(--space-4xl);
        }

        .hero-label {
          display: block;
          color: var(--accent-authority);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: var(--space-lg);
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(52px, 7.5vw, 108px);
          font-weight: 700;
          line-height: 0.96;
          letter-spacing: -0.03em;
          margin: 0 0 var(--space-xl);
          background: linear-gradient(135deg, #ffffff 55%, rgba(168, 132, 255, 0.65));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-desc {
          color: var(--text-secondary);
          font-size: clamp(15px, 1.6vw, 18px);
          line-height: 1.65;
          max-width: 520px;
          margin: 0 0 var(--space-2xl);
        }

        .hero-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .chip {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          border-radius: var(--radius-pill);
          padding: 7px 14px 7px 10px;
          font-size: 12px;
          font-weight: 500;
          line-height: 1;
          white-space: nowrap;
          text-decoration: none;
          color: var(--text-secondary);
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border-muted);
          transition: all 0.2s ease;
        }

        .chip:hover {
          color: var(--text-primary);
          border-color: var(--cc);
          background: color-mix(in srgb, var(--cc) 10%, transparent);
          box-shadow: 0 0 16px color-mix(in srgb, var(--cc) 20%, transparent);
          transform: translateY(-1px);
        }

        .chip-dot {
          display: inline-block;
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--cc);
          box-shadow: 0 0 6px var(--cc);
          flex-shrink: 0;
        }

        /* ── Section ───────────────────────────────────────────── */
        .sec-head {
          max-width: 760px;
          margin-bottom: var(--space-3xl);
        }

        .sec-head h2 {
          color: var(--text-primary);
          margin-top: var(--space-md);
        }

        .sec-head p { margin-top: var(--space-md); }

        /* ── Applied surfaces ──────────────────────────────────── */
        .surf-tabs {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-sm);
          margin-bottom: var(--space-lg);
        }

        .surf-tabs button {
          border-radius: var(--radius-md);
          padding: var(--space-md);
          text-align: left;
          color: var(--text-primary);
          font-weight: 700;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border-muted);
          cursor: pointer;
          transition: all 0.2s ease;
          font: inherit;
        }

        .surf-tabs button span {
          display: block;
          margin-top: 4px;
          color: var(--text-disabled);
          font-size: 12px;
          font-weight: 500;
        }

        .surf-tabs button.active {
          border-color: var(--sc);
          box-shadow: 0 0 22px color-mix(in srgb, var(--sc) 22%, transparent);
        }

        .surf-card {
          padding: var(--space-xl);
          border-color: color-mix(in srgb, var(--sc) 34%, var(--border-muted));
        }

        .surf-card h3 {
          font-family: var(--font-display);
          font-size: 34px;
          margin-top: var(--space-sm);
        }

        .surf-flow {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-md);
          margin-top: var(--space-xl);
        }

        .surf-step {
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border-muted);
          border-radius: var(--radius-md);
          padding: var(--space-md);
        }

        .surf-step span { color: var(--sc); font-weight: 800; }
        .surf-step p { color: var(--text-secondary); margin-top: var(--space-sm); font-size: 14px; }

        /* ── Intelligence flow ─────────────────────────────────── */
        .sankey {
          padding: var(--space-xl);
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: var(--space-sm);
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
          right: -1px; top: 50%;
          width: 0; height: 0;
          border-top: 7px solid transparent;
          border-bottom: 7px solid transparent;
          border-left: 8px solid var(--border-muted);
          transform: translateY(-50%);
          z-index: 1;
        }

        /* ── CTA ───────────────────────────────────────────────── */
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

        /* ── Responsive ────────────────────────────────────────── */
        @media (max-width: 1024px) {
          .surf-flow { grid-template-columns: repeat(2, 1fr); }
          .sankey { grid-template-columns: repeat(4, 1fr); }
        }

        @media (max-width: 768px) {
          .surf-tabs { grid-template-columns: 1fr; }
          .surf-flow { grid-template-columns: 1fr; }
          .hero-title { font-size: clamp(44px, 12vw, 72px); }
        }

        @media (max-width: 600px) {
          .sankey { grid-template-columns: repeat(2, 1fr); }
          .cta-card { padding: var(--space-lg); }
          .cta-actions { flex-direction: column; }
          .cta-actions a { width: 100%; }
        }
      `}</style>
    </main>
  );
}
