"use client";

const milestones = [
  {
    num: "01",
    title: "Behavioral Intelligence Infrastructure",
    desc: "The foundation. HBIF - a system built to read, map, and model human behaviour at the pattern level, structured as three layers: domain-specific products (Layer 1), shared behavioral state (Layer 2), and frontier decision-mechanism research (Layer 3). Everything that follows is built on this.",
  },
  {
    num: "02",
    title: "Domain Deployment",
    desc: "Hospitality was the first proving ground - chosen because it is behaviourally rich, measurable, and generates rapid feedback. Infrakinetic, the Workplace domain's product, is now Polynovea's current lead product for commercialisation, while Hospitality undergoes an architectural rebuild.",
  },
  {
    num: "03",
    title: "Behavioral Automation",
    desc: "Converting extracted patterns into automated decision systems. Once the infrastructure has sufficient signal from a domain, human decision overhead at the execution layer is replaced by systems that act on what they know.",
  },
  {
    num: "04",
    title: "Behavioral Operating System",
    desc: "The long-term destination. Infrastructure capable of deploying behavioral intelligence across Education, Workplace, and additional sectors - compounding signal across domains without rebuilding from scratch in each new environment.",
  },
];

export default function MilestonesPane() {
  return (
    <section className="section pane-section">
      <div className="container">
        <div className="ms-header">
          <h2 className="t-display-md" style={{ color: "var(--text-primary)" }}>
            Four Phases. One Infrastructure.
          </h2>
          <p className="t-body" style={{ marginTop: "var(--space-sm)" }}>
            The same behavioral intelligence system, extended into progressively broader environments.
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
