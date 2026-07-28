"use client";

import { useState } from "react";

type DomainKey = "hospitality" | "workplace" | "education";

const domains: Record<
  DomainKey,
  {
    label: string;
    status: "live" | "in development" | "in design";
    modules: { tag: string; title: string; desc: string }[];
  }
> = {
  hospitality: {
    label: "Hospitality",
    status: "live",
    modules: [
      {
        tag: "Module 01",
        title: "Decision Framework",
        desc: "Determines whether an opportunity is viable. Evaluates engagement fit, pricing logic, and expected outcomes before any resource is committed.",
      },
      {
        tag: "Module 02",
        title: "Acquisition System",
        desc: "Multi-source behavioural signal extraction, structured through an ontology layer that maps how human behaviour operates inside commercial environments. Feeds a live acquisition playbook that tells you who to target, how to reach them, and what they respond to before they walk in.",
      },
      {
        tag: "Module 03",
        title: "Optimisation System",
        desc: "Two-part system. Part 1 instruments the live environment — POS, venue data, audience behaviour. Part 2 converts that intelligence into measurable revenue optimisation for venues.",
      },
    ],
  },
  workplace: {
    label: "Workplace",
    status: "in development",
    modules: [
      {
        tag: "Infrakinetic",
        title: "Infrakinetic",
        desc: "The Workplace domain's product. A full operational platform — finance, HR, payroll, commercial — that runs the business and, underneath, generates the behavioral signal this domain's intelligence is built on. Module breakdown lands as the product ships.",
      },
    ],
  },
  education: {
    label: "Education",
    status: "in design",
    modules: [
      {
        tag: "In Design",
        title: "Education Intelligence",
        desc: "The Education domain's product is still in design. Same underlying pattern as Hospitality and Workplace — a purpose-built product on top, sharpening the shared intelligence layer underneath.",
      },
    ],
  },
};

export default function ModulesPane() {
  const [selected, setSelected] = useState<DomainKey>("hospitality");
  const domain = domains[selected];

  return (
    <section className="section pane-section">
      <div className="container">
        <div className="mod-header">
          <span className="t-label" style={{ color: "var(--accent-authority-muted)" }}>
            Infrastructure
          </span>
          <h2 className="t-display-md" style={{ marginTop: "var(--space-md)", color: "var(--text-primary)" }}>
            The Infrastructure Layer
          </h2>
          <p className="t-body" style={{ marginTop: "var(--space-sm)", maxWidth: 640, marginInline: "auto" }}>
            Every domain gets its own product. Every one of them runs on something deeper, shared, and still growing underneath.
          </p>

          <div className="mod-domain-select">
            <label htmlFor="mod-domain" className="mod-domain-label">Domain</label>
            <select
              id="mod-domain"
              className="mod-domain-dropdown"
              value={selected}
              onChange={(e) => setSelected(e.target.value as DomainKey)}
            >
              {(Object.keys(domains) as DomainKey[]).map((key) => (
                <option key={key} value={key}>
                  {domains[key].label} — {domains[key].status === "live" ? "Live" : domains[key].status === "in development" ? "In development" : "In design"}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mod-grid">
          {domain.modules.map((m) => (
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

        .mod-domain-select {
          display: inline-flex;
          align-items: center;
          gap: var(--space-sm);
          margin-top: var(--space-lg);
        }

        .mod-domain-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-disabled);
        }

        .mod-domain-dropdown {
          background: rgba(24, 24, 27, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: var(--radius-pill);
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 500;
          padding: 8px 16px;
          outline: none;
          cursor: pointer;
          transition: border-color var(--duration-fast) ease;
        }

        .mod-domain-dropdown:hover,
        .mod-domain-dropdown:focus {
          border-color: var(--accent-authority);
        }

        .mod-domain-dropdown option {
          background: var(--bg-card);
          color: var(--text-primary);
        }

        .mod-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 320px));
          justify-content: center;
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
