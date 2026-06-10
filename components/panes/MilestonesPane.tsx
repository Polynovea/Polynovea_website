"use client";

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

export default function MilestonesPane() {
  return (
    <section className="section pane-section">
      <div className="container">
        <div className="ms-header">
          <h2 className="t-display-md" style={{ color: "var(--text-primary)" }}>
            Four Milestones. One Direction.
          </h2>
          <p className="t-body" style={{ marginTop: "var(--space-sm)" }}>
            Each milestone compounds the last. The architecture builds itself.
          </p>
        </div>

        <div className="ms-grid">
          {milestones.map((m) => (
            <div key={m.num} className="milestone-card ms-card">
              <div className="ms-card-header">
                <div className="ms-title">{m.title}</div>
                <div className="ms-num">{m.num}</div>
              </div>
              <p className="t-body-sm">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .ms-header {
          text-align: center;
          margin-bottom: var(--space-2xl);
        }

        .ms-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-lg);
          max-width: 980px;
          margin-inline: auto;
        }

        .ms-card {
          padding: var(--space-lg) var(--space-xl);
        }

        .ms-card-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: var(--space-md);
          margin-bottom: var(--space-sm);
        }

        .ms-title {
          font-family: var(--font-display);
          font-size: 19px;
          font-weight: 500;
          color: var(--text-primary);
          letter-spacing: -0.01em;
        }

        .ms-num {
          font-family: var(--font-display);
          font-size: 28px;
          font-weight: 600;
          color: var(--accent-intelligence);
          opacity: 0.7;
          line-height: 1;
        }

        @media (max-width: 1024px) {
          .ms-grid { grid-template-columns: 1fr; gap: var(--space-md); }
          .ms-card { padding: var(--space-md) var(--space-lg); }
        }
      `}</style>
    </section>
  );
}
