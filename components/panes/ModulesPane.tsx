"use client";

import { useState } from "react";

type PortfolioKey = "infrakinetic" | "cms" | "hospitality";

const portfolio: Record<
  PortfolioKey,
  {
    label: string;
    status: "architectural rebuild" | "commercial lead" | "upcoming OSS";
    modules: { tag: string; title: string; desc: string }[];
  }
> = {
  infrakinetic: {
    label: "Infrakinetic",
    status: "commercial lead",
    modules: [
      {
        tag: "Commercial Lead · Phase 1 Complete",
        title: "Where Business Operates as One",
        desc: "A unified business operating environment connecting commercial work, sales, documents, operations, billing, payments, finance, recruitment, HR, payroll, Customer Success, approvals, governance, migration and bounded AI while preserving clear ownership across each function.",
      },
    ],
  },
  cms: {
    label: "Open Source",
    status: "upcoming OSS",
    modules: [
      {
        tag: "Upcoming Open Source",
        title: "Content Operations Platform",
        desc: "Polynovea's first open-source project is a self-hostable platform spanning structured data, content creation, collaboration, review, releases, delivery operations, schema control, developer APIs, governed agents and extensions. The open-source edition comes first; a managed Polynovea Cloud SaaS is planned without removing the self-hosted path.",
      },
    ],
  },
  hospitality: {
    label: "Hospitality",
    status: "architectural rebuild",
    modules: [
      {
        tag: "Layer 1 · Rebuild",
        title: "Hospitality Product",
        desc: "Polynovea's first behavioural-intelligence proving ground created a substantial historical research and product lineage. That earlier Decision Framework / Acquisition System / Optimisation System stack is reference material, while the next Hospitality product is being rebuilt rather than copied forward as the future specification.",
      },
    ],
  },
};

export default function ModulesPane() {
  const [selected, setSelected] = useState<PortfolioKey>("infrakinetic");
  const product = portfolio[selected];

  return (
    <section className="section pane-section">
      <div className="container">
        <div className="mod-header">
          <span className="t-label" style={{ color: "var(--accent-authority-muted)" }}>
            Current Work
          </span>
          <h2 className="t-display-md" style={{ marginTop: "var(--space-md)", color: "var(--text-primary)" }}>
            What is Polynovea building now?
          </h2>
          <p className="t-body" style={{ marginTop: "var(--space-sm)", maxWidth: 640, marginInline: "auto" }}>
            Domain products, open-source infrastructure and research have different jobs - and different evidence boundaries.
          </p>

          <div className="mod-domain-select">
            <label htmlFor="mod-domain" className="mod-domain-label">Area</label>
            <select
              id="mod-domain"
              className="mod-domain-dropdown"
              value={selected}
              onChange={(e) => setSelected(e.target.value as PortfolioKey)}
            >
              {(Object.keys(portfolio) as PortfolioKey[]).map((key) => (
                <option key={key} value={key}>
                  {portfolio[key].label} - {portfolio[key].status === "architectural rebuild" ? "Architectural rebuild" : portfolio[key].status === "commercial lead" ? "Commercial lead" : "Upcoming OSS"}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mod-grid">
          {product.modules.map((m) => (
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
