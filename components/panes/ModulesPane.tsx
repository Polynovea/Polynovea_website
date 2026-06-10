"use client";

const systemModules = [
  {
    tag: "Module 01",
    title: "Decision Framework",
    desc: "Determines whether an opportunity is viable. Evaluates engagement fit, pricing logic, and expected outcomes before any resource is committed.",
  },
  {
    tag: "Module 02",
    title: "Acquisition System",
    desc: "Multi-source behavioural signal extraction, structured through an ontology layer that maps how human behaviour operates inside commercial environments. Feeds a field execution system that tells you who to target, how to reach them, and what they respond to before a single show runs.",
  },
  {
    tag: "Module 03",
    title: "Optimisation System",
    desc: "Two-part system. Part 1 instruments the live environment — POS, venue data, audience behaviour. Part 2 converts that intelligence into measurable revenue optimisation for venues.",
  },
];

export default function ModulesPane() {
  return (
    <section className="section pane-section">
      <div className="container">
        <div className="mod-header">
          <span className="t-label" style={{ color: "var(--accent-authority-muted)" }}>
            Infrastructure
          </span>
          <h2 className="t-display-md" style={{ marginTop: "var(--space-md)", color: "var(--text-primary)" }}>
            The Machines Behind the Music
          </h2>
        </div>

        <div className="mod-grid">
          {systemModules.map((m) => (
            <div key={m.tag} className="module-card mod-card">
              <span className="mod-tag">{m.tag}</span>
              <h3 className="mod-title">{m.title}</h3>
              <p className="t-body-sm">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .mod-header {
          text-align: center;
          margin-bottom: var(--space-2xl);
        }

        .mod-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-lg);
          max-width: 1080px;
          margin-inline: auto;
          align-items: stretch;
        }

        .mod-card {
          padding: var(--space-xl);
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
        }

        .mod-tag {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent-intelligence);
        }

        .mod-title {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 500;
          color: var(--text-primary);
        }

        @media (max-width: 1024px) {
          .mod-grid { grid-template-columns: 1fr; max-width: 520px; }
          .mod-card { padding: var(--space-lg); }
        }
      `}</style>
    </section>
  );
}
