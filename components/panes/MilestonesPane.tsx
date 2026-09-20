"use client";

const milestones = [
  {
    num: "01",
    title: "Commercial Products",
    desc: "Products have to create independent customer value first. Infrakinetic is Polynovea's Phase-1-complete Workplace operating system and current commercial lead.",
  },
  {
    num: "02",
    title: "Open Infrastructure",
    desc: "Polynovea's Content Operations Platform is a substantial self-hostable software asset moving toward an open-source release, with a managed cloud SaaS planned alongside the OSS path.",
  },
  {
    num: "03",
    title: "HBIF Research",
    desc: "HBIF is the longer-horizon behavioural-intelligence architecture: domain-specific systems at Layer 1, shared behavioural state and dynamics at Layer 2, and evidence-gated frontier research at Layer 3.",
  },
  {
    num: "04",
    title: "Evidence-Gated Transfer",
    desc: "Domain learning can inform shared research and return to products only where evidence supports transfer. Polynovea is building for compounding intelligence without pretending every domain is already the same system.",
  },
];

export default function MilestonesPane() {
  return (
    <section className="section pane-section">
      <div className="container">
        <div className="ms-header">
          <h2 className="t-display-md" style={{ color: "var(--text-primary)" }}>
            Four parts of one operating model.
          </h2>
          <p className="t-body" style={{ marginTop: "var(--space-sm)" }}>
            Products, open infrastructure and research reinforce one another without collapsing into one claim.
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
