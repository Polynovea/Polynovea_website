"use client";

const rows = [
  {
    left: "Reacts to briefs and client requests",
    right: "Operates from a pre-built intelligence framework",
  },
  {
    left: "Delivers outputs and invoices",
    right: "Converts every engagement into system data",
  },
  {
    left: "Makes decisions on intuition and trend",
    right: "Runs measurement-first decision systems",
  },
  {
    left: "Grows by getting more clients",
    right: "Grows by compounding its own intelligence",
  },
  {
    left: "Replaces itself with the next trend",
    right: "Builds systems that become more valuable over time",
  },
];

export default function WhyDifferent() {
  return (
    <section className="section why-section">
      <div className="container">
        <div className="why-heading" data-reveal>
          <span className="t-label" style={{ color: "var(--accent-authority-muted)" }}>
            The Difference
          </span>
          <h2 className="t-display-md" style={{ marginTop: "var(--space-md)", color: "var(--text-primary)" }}>
            Not Creative. Not Consulting.
            <br />
            <span className="gold-accent">Something Else.</span>
          </h2>
        </div>

        <div className="contrast-table" data-reveal data-reveal-delay="100">
          <div className="contrast-header-row">
            <div className="col-label col-label-left">Everyone Else</div>
            <div className="col-divider-head" />
            <div className="col-label col-label-right">Polynovea</div>
          </div>

          {rows.map((row, i) => (
            <div key={i} className="contrast-row">
              <div className="contrast-cell left-cell">
                <span className="mobile-prefix">Everyone Else</span>
                {row.left}
              </div>
              <div className="contrast-divider">
                <div className="divider-line" />
                <div className="vs-dot" />
                <div className="divider-line" />
              </div>
              <div className="contrast-cell right-cell">
                <span className="mobile-prefix">Polynovea</span>
                {row.right}
              </div>
            </div>
          ))}
        </div>

        <div className="why-cta" data-reveal data-reveal-delay="200">
          <a href="#architecture" className="btn btn-secondary">
            Explore the Architecture
          </a>
        </div>
      </div>

      <style jsx>{`
        .why-section {
          background: rgba(10, 10, 10, 0.5);
        }

        .why-heading {
          text-align: center;
          margin-bottom: clamp(16px, 3.5vh, 48px);
        }

        .gold-accent {
          color: var(--accent-authority);
          font-weight: inherit;
        }

        .contrast-table {
          max-width: 900px;
          margin-inline: auto;
          background: rgba(24, 24, 27, 0.35);
          backdrop-filter: blur(24px) saturate(120%);
          -webkit-backdrop-filter: blur(24px) saturate(120%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-lg);
          padding: clamp(12px, 2.2vh, 32px) var(--space-2xl);
          box-shadow: 
            inset 0 1px 0px 0px rgba(255, 255, 255, 0.05),
            0 8px 32px 0 rgba(0, 0, 0, 0.4);
        }

        .contrast-header-row {
          display: grid;
          grid-template-columns: 1fr 40px 1fr;
          margin-bottom: var(--space-md);
          padding-bottom: var(--space-md);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .col-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .col-label-left {
          color: var(--text-disabled);
        }

        .col-label-right {
          color: var(--accent-authority);
          text-align: right;
        }

        .contrast-row {
          display: grid;
          grid-template-columns: 1fr 40px 1fr;
          align-items: center;
          padding: clamp(10px, 1.8vh, 24px) 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          transition: all var(--duration-default) var(--ease-state);
        }

        .contrast-row:last-child {
          border-bottom: none;
        }

        .contrast-row:hover {
          background: rgba(255, 255, 255, 0.015);
        }

        .contrast-cell {
          font-size: 15px;
          line-height: 1.5;
          padding: 0 var(--space-md);
          transition: all var(--duration-default) var(--ease-state);
        }

        .left-cell {
          color: var(--text-disabled);
          text-decoration: line-through;
          text-decoration-color: rgba(113, 113, 122, 0.3);
        }

        .right-cell {
          color: var(--text-primary);
          font-weight: 500;
          text-align: right;
        }

        .contrast-row:hover .right-cell {
          color: var(--accent-authority);
          transform: scale(1.01);
        }

        .contrast-divider {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .divider-line {
          width: 1px;
          height: 12px;
          background: rgba(255, 255, 255, 0.08);
          transition: background var(--duration-default) var(--ease-state);
        }

        .contrast-row:hover .divider-line {
          background: var(--accent-authority-muted);
        }

        .vs-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transition: all var(--duration-default) var(--ease-state);
        }

        .contrast-row:hover .vs-dot {
          background: var(--accent-authority);
          transform: scale(1.3);
          box-shadow: 0 0 10px var(--accent-authority);
        }

        .why-cta {
          text-align: center;
          margin-top: clamp(14px, 3vh, 40px);
        }

        .mobile-prefix {
          display: none;
        }

        @media (max-width: 768px) {
          .contrast-table {
            padding: var(--space-md);
          }
          .contrast-row {
            padding: var(--space-md) 0;
          }
        }

        @media (max-width: 640px) {
          .mobile-prefix {
            display: block;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            margin-bottom: 4px;
          }
          
          .left-cell .mobile-prefix {
            color: var(--text-disabled);
          }
          
          .right-cell .mobile-prefix {
            color: var(--accent-authority);
          }
          
          .contrast-row {
            background: rgba(24, 24, 27, 0.2);
            border: 1px solid var(--border-muted);
            border-radius: var(--radius-md);
            padding: var(--space-md);
            margin-bottom: var(--space-md);
            grid-template-columns: 1fr;
            gap: var(--space-md);
            align-items: start;
          }
          
          .contrast-row:hover {
            background: rgba(24, 24, 27, 0.3);
            border-color: rgba(230, 211, 163, 0.3);
          }
          
          .left-cell, .right-cell {
            padding: 0;
            text-align: left;
          }

          .contrast-row:hover .right-cell {
            transform: none;
          }
          
          .contrast-divider {
            display: none;
          }
          
          .contrast-header-row {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
