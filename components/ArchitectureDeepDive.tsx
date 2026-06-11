"use client";

import { useState } from "react";
import Link from "next/link";

type MilestoneKey = "m1" | "m2" | "m3" | "m4";
type SurfaceKey = "venues" | "music";

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

const appliedSurfaces: Record<SurfaceKey, { label: string; eyebrow: string; examples: string[] }> = {
  venues: {
    label: "Venue Revenue Optimisation",
    eyebrow: "Live environments",
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
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="entry" id={`milestone-${milestone.key}`} data-reveal>
      {/* Dot on the timeline track */}
      <div className="entry-dot" aria-hidden="true" />

      {/* Oversized ghost numeral anchoring the layer */}
      <span className="entry-num" aria-hidden="true">{milestone.number}</span>

      {/* Header row */}
      <div className="entry-head">
        <span className="entry-stage">{milestone.stage}</span>
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
                  <div className="mod-output">
                    <span className="mod-output-label">Output</span>
                    {item.output}
                  </div>
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
          top: 16px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--accent-intelligence);
          border: 2.5px solid #090810;
          box-shadow: 0 0 14px rgba(124, 58, 237, 0.6);
          z-index: 2;
        }

        /* Oversized ghost numeral — deliberate layer anchor, not decoration */
        .entry-num {
          position: absolute;
          top: -0.18em;
          right: 0;
          font-family: var(--font-display);
          font-size: clamp(86px, 11vw, 168px);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.04em;
          color: transparent;
          -webkit-text-stroke: 1px rgba(230, 211, 163, 0.12);
          user-select: none;
          pointer-events: none;
          z-index: 0;
        }

        .entry-head {
          margin-bottom: var(--space-sm);
        }

        .entry-stage {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--accent-authority);
        }

        .entry-title {
          position: relative;
          z-index: 1;
          font-family: var(--font-display);
          font-size: clamp(32px, 4vw, 56px);
          font-weight: 700;
          line-height: 1.04;
          letter-spacing: -0.02em;
          margin: 0 0 var(--space-md);
          color: var(--text-primary);
        }

        .entry-summary {
          color: var(--text-secondary);
          font-size: 16px;
          line-height: 1.7;
          max-width: 620px;
          margin: 0 0 var(--space-2xl);
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
          border-radius: var(--radius-sm);
          border: 1px solid rgba(124, 58, 237, 0.22);
          background: transparent;
          transition:
            border-color 0.22s ease,
            background 0.22s ease,
            transform 0.22s ease;
        }

        .mod-card::before {
          content: "";
          position: absolute;
          inset: 0 auto 0 0;
          width: 2px;
          background: var(--accent-intelligence);
          opacity: 0.7;
        }

        .mod-card.open {
          background: rgba(124, 58, 237, 0.06);
          border-color: rgba(124, 58, 237, 0.55);
          transform: translateY(-2px);
        }

        .mod-card button {
          width: 100%;
          min-height: 64px;
          padding: var(--space-md) var(--space-lg);
          padding-left: calc(var(--space-lg) + 2px);
          background: transparent;
          border: 0;
          cursor: pointer;
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 600;
          line-height: 1.4;
          letter-spacing: -0.01em;
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
          padding-left: calc(var(--space-lg) + 2px);
        }

        .mod-card.open .mod-inner {
          padding-bottom: var(--space-lg);
        }

        .mod-inner p,
        .mod-inner li {
          color: var(--text-secondary);
          font-size: 13px;
          line-height: 1.65;
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
          border-top: 1px solid rgba(124, 58, 237, 0.18);
          padding-top: var(--space-sm);
          margin-top: var(--space-md);
          font-family: var(--font-mono);
          font-size: 11px;
          line-height: 1.6;
          letter-spacing: 0.02em;
          color: var(--text-secondary);
        }

        .mod-output-label {
          display: block;
          margin-bottom: 4px;
          color: var(--accent-authority-muted);
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-size: 10px;
        }

        .entry-flow {
          margin-top: var(--space-xl);
          padding-top: var(--space-md);
          border-top: 1px solid var(--border-muted);
          font-family: var(--font-mono);
          color: var(--accent-authority);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
      `}</style>
    </div>
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
  return (
    <div className="tl">
      {/* Track — static violet→gold spine */}
      <div className="tl-track" aria-hidden="true">
        <div className="tl-line" />
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
          align-self: stretch;
        }

        .tl-line {
          position: absolute;
          left: 50%;
          top: 24px;
          bottom: 24px;
          width: 1px;
          transform: translateX(-50%);
          background: linear-gradient(
            to bottom,
            rgba(124, 58, 237, 0.7) 0%,
            rgba(124, 58, 237, 0.35) 50%,
            rgba(230, 211, 163, 0.6) 100%
          );
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
        <div className="container hero-body">
          <span className="hero-label" data-reveal>
            The Behavioral Intelligence Stack
          </span>

          <h1 className="hero-title" data-reveal data-reveal-delay="100">
            From behavior<br />to <span className="gold">ownership.</span>
          </h1>

          <p className="hero-desc" data-reveal data-reveal-delay="200">
            Polynovea turns fragmented human behavior into intelligence, uses that intelligence
            to create IP, commercializes the infrastructure, and compounds toward
            distribution control.
          </p>

          <div className="hero-chips" data-reveal data-reveal-delay="320">
            {milestones.map((m) => (
              <a key={m.key} href={`#milestone-${m.key}`} className="chip">
                <span className="chip-num">{m.number}</span>
                {m.title}
              </a>
            ))}
          </div>
        </div>

        <div className="hero-fade" aria-hidden="true" />
      </section>

      {/* ── Timeline breakdown ────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="sec-head" data-reveal>
            <span className="sec-label">Milestone Breakdown</span>
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
            <span className="sec-label">Applied Surfaces</span>
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
                onClick={() => setSelectedSurface(key)}
              >
                {appliedSurfaces[key].label}
                <span>{appliedSurfaces[key].eyebrow}</span>
              </button>
            ))}
          </div>

          <div className="surf-card" data-reveal>
            <div>
              <span className="surf-eyebrow">{surface.eyebrow}</span>
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
            <span className="sec-label">Intelligence Flow</span>
            <h2 className="t-display-md">How signal becomes leverage.</h2>
          </div>
          <div className="sankey" data-reveal>
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
          <div className="cta-card">
            <span className="sec-label">Build The System</span>
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

        /* ── Hero — scene-forward, editorial ───────────────────── */
        .arch-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding-top: var(--nav-height);
        }

        .hero-fade {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 30%;
          background: linear-gradient(to bottom, transparent, #090810);
          pointer-events: none;
          z-index: 1;
        }

        .hero-body {
          position: relative;
          z-index: 2;
          max-width: 940px;
          padding-bottom: var(--space-4xl);
        }

        .hero-label {
          display: block;
          font-family: var(--font-mono);
          color: var(--accent-authority);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: var(--space-lg);
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(56px, 8vw, 116px);
          font-weight: 700;
          line-height: 0.95;
          letter-spacing: -0.03em;
          margin: 0 0 var(--space-xl);
          color: var(--text-primary);
        }

        .hero-title .gold {
          color: var(--accent-authority);
        }

        .hero-desc {
          color: var(--text-secondary);
          font-size: clamp(16px, 1.6vw, 19px);
          line-height: 1.7;
          max-width: 560px;
          margin: 0 0 var(--space-2xl);
        }

        .hero-chips {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-sm);
        }

        .chip {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border-radius: var(--radius-sm);
          padding: 9px 16px;
          font-size: 13px;
          font-weight: 500;
          line-height: 1;
          white-space: nowrap;
          text-decoration: none;
          color: var(--text-secondary);
          background: transparent;
          border: 1px solid rgba(124, 58, 237, 0.22);
          transition: all 0.2s ease;
        }

        .chip:hover {
          color: var(--text-primary);
          border-color: rgba(124, 58, 237, 0.6);
          background: rgba(124, 58, 237, 0.06);
        }

        .chip-num {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.1em;
          color: var(--accent-authority);
        }

        /* ── Section heads ─────────────────────────────────────── */
        .sec-head {
          max-width: 760px;
          margin-bottom: var(--space-3xl);
        }

        .sec-label {
          display: block;
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--accent-authority);
          margin-bottom: var(--space-md);
        }

        .sec-head h2 {
          color: var(--text-primary);
        }

        .sec-head p { margin-top: var(--space-md); }

        /* ── Applied surfaces ──────────────────────────────────── */
        .surf-tabs {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-sm);
          margin-bottom: var(--space-md);
        }

        .surf-tabs button {
          border-radius: var(--radius-sm);
          padding: var(--space-md) var(--space-lg);
          text-align: left;
          color: var(--text-primary);
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 15px;
          background: transparent;
          border: 1px solid rgba(124, 58, 237, 0.22);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .surf-tabs button span {
          display: block;
          margin-top: 4px;
          font-family: var(--font-mono);
          color: var(--text-disabled);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .surf-tabs button.active {
          border-color: rgba(124, 58, 237, 0.6);
          background: rgba(124, 58, 237, 0.06);
        }

        .surf-card {
          border: 1px solid rgba(124, 58, 237, 0.22);
          border-radius: var(--radius-sm);
          padding: var(--space-2xl);
        }

        .surf-eyebrow {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--accent-authority);
        }

        .surf-card h3 {
          font-family: var(--font-display);
          font-size: clamp(26px, 3vw, 38px);
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-top: var(--space-sm);
        }

        .surf-flow {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-md);
          margin-top: var(--space-2xl);
        }

        .surf-step {
          border: 1px solid var(--border-muted);
          border-radius: var(--radius-sm);
          padding: var(--space-md);
        }

        .surf-step span {
          font-family: var(--font-mono);
          color: var(--accent-intelligence);
          font-weight: 600;
          font-size: 12px;
          letter-spacing: 0.1em;
        }
        .surf-step p { color: var(--text-secondary); margin-top: var(--space-sm); font-size: 14px; line-height: 1.55; }

        /* ── Intelligence flow rail ────────────────────────────── */
        .sankey {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: var(--space-sm);
        }

        .sankey-step {
          position: relative;
          padding: var(--space-md);
          border-radius: var(--radius-sm);
          background: transparent;
          border: 1px solid rgba(124, 58, 237, 0.2);
          min-height: 112px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .sankey-step span {
          font-family: var(--font-mono);
          color: var(--accent-authority);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;
        }

        .sankey-step strong {
          color: var(--text-primary);
          font-size: 13px;
          font-weight: 600;
          line-height: 1.35;
          letter-spacing: -0.01em;
        }

        .sankey-step i {
          position: absolute;
          right: -1px; top: 50%;
          width: 0; height: 0;
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
          border-left: 7px solid var(--accent-intelligence);
          transform: translateY(-50%);
          z-index: 1;
          opacity: 0.7;
        }

        /* ── CTA ───────────────────────────────────────────────── */
        .cta-card {
          border: 1px solid rgba(124, 58, 237, 0.22);
          border-radius: var(--radius-sm);
          padding: var(--space-3xl) var(--space-2xl);
          text-align: center;
        }

        .cta-card h2 {
          font-family: var(--font-display);
          font-size: clamp(28px, 4vw, 48px);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.08;
          margin: var(--space-sm) auto var(--space-md);
          max-width: 720px;
        }

        .cta-card p {
          color: var(--text-secondary);
          max-width: 580px;
          margin: 0 auto;
          line-height: 1.7;
        }

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
        }

        @media (max-width: 600px) {
          .sankey { grid-template-columns: repeat(2, 1fr); }
          .cta-card { padding: var(--space-xl) var(--space-lg); }
          .cta-actions { flex-direction: column; }
          .cta-actions a { width: 100%; }
        }
      `}</style>
    </main>
  );
}
