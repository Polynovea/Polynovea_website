"use client";

const flowSteps = [
  "Raw Behaviour Input",
  "Pattern Recognition Layer",
  "Intelligence Framework",
  "Decision Engine",
  "Scalable Output",
];

export default function SystemPane() {
  return (
    <section className="section pane-section">
      <div className="container sys-grid">
        <div className="sys-text">
          <span className="t-label" style={{ color: "var(--accent-authority-muted)" }}>
            The Architecture
          </span>
          <h2 className="t-display-md" style={{ marginTop: "var(--space-md)", color: "var(--text-primary)" }}>
            What is Polynovea&apos;s behavioral intelligence system?
          </h2>
          <p className="t-body-lg" style={{ marginTop: "var(--space-md)" }}>
            Polynovea is not a creative agency or a tech startup. It is a
            behavioral intelligence operation - a closed loop that observes
            human decision-making, extracts patterns, and converts them into
            repeatable frameworks, products, and automated systems.
          </p>
          <p className="t-body-sm" style={{ marginTop: "var(--space-md)", color: "var(--text-disabled)" }}>
            Every output feeds the next input. Nothing is wasted.
          </p>
        </div>

        <div className="sys-flow">
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
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .sys-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: var(--space-3xl);
          align-items: center;
        }

        .sys-flow {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          max-width: 360px;
          justify-self: center;
          width: 100%;
        }

        .flow-box {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          padding: 12px var(--space-lg);
          border-radius: var(--radius-md);
          background: rgba(24, 24, 27, 0.45);
          backdrop-filter: blur(16px) saturate(130%);
          -webkit-backdrop-filter: blur(16px) saturate(130%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
        }

        .flow-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent-intelligence);
          box-shadow: 0 0 10px var(--accent-intelligence-glow);
          flex-shrink: 0;
        }

        .flow-label {
          font-size: 13px;
          font-weight: 500;
          color: var(--text-primary);
          letter-spacing: 0.01em;
        }

        .flow-connector {
          display: flex;
          justify-content: center;
          padding-block: 2px;
        }

        @media (max-width: 1024px) {
          .sys-grid {
            grid-template-columns: 1fr;
            gap: var(--space-xl);
          }
          .sys-flow { max-width: 320px; }
        }
      `}</style>
    </section>
  );
}
