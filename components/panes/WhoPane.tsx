"use client";

const theses = [
  {
    num: "01",
    title: "The Real Problem",
    body: "Organisations run critical work across fragmented systems, fragmented data and weak feedback loops. Decisions are often separated from the evidence and outcomes that should improve them.",
  },
  {
    num: "02",
    title: "The Insight",
    body: "Operational systems produce more than transactions. They can preserve context around state, decisions, interventions and outcomes - the raw material required for better intelligence.",
  },
  {
    num: "03",
    title: "Our Approach",
    body: "Build useful products first. Measure what happens. Learn inside each domain. Test what transfers across domains. Return validated intelligence to products without turning hypotheses into claims.",
  },
  {
    num: "04",
    title: "The Goal",
    body: "Build decision infrastructure that can become more intelligent over time while preserving governance, evidence boundaries and human authority where decisions are consequential.",
  },
];

export default function WhoPane() {
  return (
    <section className="section pane-section">
      <div className="container">
        <div className="who-header">
          <h2 className="t-display-md" style={{ color: "var(--text-primary)" }}>
            Who is Polynovea?
          </h2>
          <p className="t-body" style={{ marginTop: "var(--space-sm)" }}>
            Our operating thesis on products, evidence and measurable systems
          </p>
        </div>

        <div className="who-grid">
          {theses.map((t) => (
            <div key={t.num} className="who-card thesis-card">
              <div className="thesis-num">{t.num}</div>
              <h3 className="thesis-title">{t.title}</h3>
              <p className="t-body-sm">{t.body}</p>
            </div>
          ))}
        </div>

        <div className="who-cta">
          <a href="/about" className="btn btn-secondary">
            Learn More About Us
          </a>
        </div>
      </div>

      <style jsx>{`
        .who-header {
          text-align: center;
          margin-bottom: var(--space-2xl);
        }

        .who-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-lg);
          max-width: 980px;
          margin-inline: auto;
        }

        .thesis-card {
          padding: var(--space-lg) var(--space-xl);
        }

        .thesis-num {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: var(--accent-authority-muted);
          margin-bottom: var(--space-xs);
        }

        .thesis-title {
          font-family: var(--font-display);
          font-size: 19px;
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: var(--space-xs);
        }

        .who-cta {
          display: flex;
          justify-content: center;
          margin-top: var(--space-xl);
        }

        @media (max-width: 1024px) {
          .who-grid { grid-template-columns: 1fr; gap: var(--space-md); }
          .thesis-card { padding: var(--space-md) var(--space-lg); }
        }
      `}</style>
    </section>
  );
}
