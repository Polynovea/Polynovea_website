"use client";

const flowSteps = [
  "Raw Behaviour Input",
  "Pattern Recognition Layer",
  "Intelligence Framework",
  "Decision Engine",
  "Scalable Output",
];

const milestones = [
  {
    num: "01",
    title: "Behavioral Intelligence Framework",
    desc: "The foundation. An AI and data-driven system built to read, map, and model human behaviour — designed to power every milestone that follows.",
  },
  {
    num: "02",
    title: "Original Music & IP",
    desc: "Creating original music and building our own intellectual property — establishing Polynovea as an independent creative operation with real cultural output.",
  },
  {
    num: "03",
    title: "Artist Automation Tools",
    desc: "AI-powered tools that handle the tedious parts of music publishing — giving independent artists a fairer, simpler path without the exploitation.",
  },
  {
    num: "04",
    title: "Distribution Infrastructure",
    desc: "Building a full distribution framework — acquiring the licenses and infrastructure to make music release sustainable and accessible for artists across India.",
  },
];

export default function Architecture() {
  return (
    <section id="architecture" className="section arch-section">
      <div className="container">
        {/* The System */}
        <div className="arch-grid">
          <div className="arch-text" data-reveal data-reveal-delay="0">
            <span className="t-label" style={{ color: "var(--accent-authority-muted)" }}>
              The Architecture
            </span>
            <h2 className="t-display-md" style={{ marginTop: "var(--space-md)", color: "var(--text-primary)" }}>
              The System
            </h2>
            <p className="t-body-lg" style={{ marginTop: "var(--space-md)" }}>
              Polynovea is not a creative agency or a tech startup. It is a
              behavioral intelligence operation — a closed loop that observes
              human decision-making, extracts patterns, and converts them into
              repeatable frameworks, products, and automated systems.
            </p>
            <p className="t-body-sm" style={{ marginTop: "var(--space-md)", color: "var(--text-disabled)" }}>
              Every output feeds the next input. Nothing is wasted.
            </p>
          </div>

          {/* Flow diagram */}
          <div className="flow-diagram-wrap" data-reveal data-reveal-delay="100">
            <div className="flow-diagram">
              {flowSteps.map((step, i) => (
                <div key={step}>
                  <div className="flow-box">
                    <span className="flow-dot" />
                    <span className="flow-label">{step}</span>
                  </div>
                  {i < flowSteps.length - 1 && (
                    <div className="flow-connector">
                      <div className="flow-line">
                        <div className="flow-pulse" style={{ animationDelay: `${i * 0.4}s` }} />
                      </div>
                      <span className="flow-arrow">↓</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div className="milestones-header" data-reveal>
          <h2 className="t-display-md" style={{ color: "var(--text-primary)" }}>
            Four Milestones. One Direction.
          </h2>
          <p className="t-body" style={{ marginTop: "var(--space-sm)" }}>
            Each milestone compounds the last. The architecture builds itself.
          </p>
        </div>

        <div className="milestones-grid">
          {milestones.map((m, i) => (
            <div
              key={m.num}
              className="milestone-card milestone-card-glass"
              data-reveal
              data-reveal-delay={String(i * 80)}
            >
              <div className="milestone-header">
                <div className="milestone-title">{m.title}</div>
                <div className="milestone-num">{m.num}</div>
              </div>
              <p className="t-body-sm">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .arch-section {
          background: rgba(18, 18, 18, 0.6);
        }

        .arch-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-3xl);
          align-items: start;
          margin-bottom: var(--space-5xl);
        }

        .arch-text {
          padding-top: var(--space-md);
        }

        .flow-diagram-wrap {
          position: relative;
        }

        .flow-diagram {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          max-width: 480px;
          margin-inline: auto;
        }

        .flow-box {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          padding: var(--space-md) var(--space-lg);
          background: rgba(24, 24, 27, 0.35);
          backdrop-filter: blur(24px) saturate(120%);
          -webkit-backdrop-filter: blur(24px) saturate(120%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-md);
          box-shadow: inset 0 1px 0px rgba(255, 255, 255, 0.05);
          transition: all var(--duration-default) ease;
        }

        .flow-box:hover {
          border-color: rgba(230, 211, 163, 0.3);
          background: rgba(24, 24, 27, 0.45);
          box-shadow: inset 0 1px 0px rgba(255, 255, 255, 0.1), 0 8px 24px rgba(0, 0, 0, 0.5);
          transform: translateY(-1px);
        }

        .flow-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent-intelligence);
          flex-shrink: 0;
          box-shadow: 0 0 8px var(--accent-intelligence-glow);
        }

        .flow-label {
          font-size: 14px;
          font-weight: 500;
          color: var(--text-primary);
        }

        .flow-connector {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2px 0;
          margin-left: 28px;
        }

        .flow-arrow {
          color: var(--accent-authority-muted);
          font-size: 14px;
          line-height: 1;
        }

        .milestones-header {
          text-align: center;
          margin-bottom: var(--space-2xl);
        }

        .milestones-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-lg);
        }

        .milestone-card-glass {
          padding: var(--space-xl);
          background: rgba(24, 24, 27, 0.35);
          backdrop-filter: blur(24px) saturate(120%);
          -webkit-backdrop-filter: blur(24px) saturate(120%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-lg);
          box-shadow: 
            inset 0 1px 0px 0px rgba(255, 255, 255, 0.05),
            0 8px 32px 0 rgba(0, 0, 0, 0.4);
          position: relative;
          transition: all var(--duration-default) var(--ease-state);
        }

        .milestone-card-glass:hover {
          background: rgba(24, 24, 27, 0.45);
          border-color: rgba(230, 211, 163, 0.3);
          box-shadow: 
            inset 0 1px 0px 0px rgba(255, 255, 255, 0.1),
            0 12px 40px 0 rgba(0, 0, 0, 0.6);
          transform: translateY(-2px);
        }

        .milestone-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: var(--space-md);
          margin-bottom: var(--space-md);
        }

        .milestone-title {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.3;
          margin-top: 6px;
        }

        .milestone-num {
          font-family: var(--font-display);
          font-size: 52px;
          font-weight: 700;
          line-height: 1;
          color: var(--accent-authority);
          opacity: 0.3;
          letter-spacing: -2px;
          flex-shrink: 0;
        }

        @media (max-width: 900px) {
          .arch-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 640px) {
          .milestones-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
