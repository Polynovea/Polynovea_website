"use client";

import Link from "next/link";
import { BentoGrid, type BentoItem } from "@/components/ui/bento-grid";

const hospitalityModules: BentoItem[] = [
  {
    num: "01",
    tag: "Architectural rebuild",
    title: "Hospitality Product",
    desc: "Polynovea's first behavioural-intelligence proving ground created a substantial historical product and research lineage. The earlier Decision Framework / Acquisition System / Optimisation System remains reference material; the next Hospitality product is being rebuilt rather than treated as a finished future specification.",
    colSpan: 3,
  },
];

const workplaceModules: BentoItem[] = [
  {
    num: "01",
    tag: "Phase 1 complete · Commercial lead",
    title: "Infrakinetic",
    desc: "A unified business operating environment connecting the systems a company uses to sell, operate, hire, govern, bill, collect, account and serve customers. Commercial, sales, documents, operations, billing, payments, finance, recruitment, HR, payroll, Customer Success, approvals, governance, migration and bounded AI remain connected without erasing functional ownership.",
    colSpan: 3,
  },
];

const faqItems = [
  {
    q: "What is Polynovea's current commercial product?",
    a: "Infrakinetic is Polynovea's current commercial and revenue lead. It is the Workplace domain's Layer 1 product and has completed its Phase 1 programme milestone. Capability-level availability still depends on the specific implementation, deployment and certification state rather than one blanket GA claim.",
  },
  {
    q: "Where does Polynovea's open-source software live?",
    a: "Open-source software has its own Polynovea Open Source directory rather than being treated as a domain product. The Content Operations Platform is the first project in that separate portfolio and is being prepared for open-source/self-hosted distribution.",
  },
  {
    q: "Is Hospitality still a Polynovea product area?",
    a: "Yes. Hospitality remains a Polynovea Layer 1 domain, but the old three-module stack is historical lineage and reference material. The next Hospitality product is an architectural rebuild and should not be presented as already built.",
  },
  {
    q: "Are these all the same product underneath?",
    a: "No. Layer 1 is domain-specific and each product must earn its own product validity. Shared HBIF Layer 2 and Layer 3 research can learn across domains only where evidence supports transfer; Polynovea does not assume that one domain automatically generalises to another.",
  },
  {
    q: "Is HBIF itself a commercial product?",
    a: "HBIF is Polynovea's broader behavioural-intelligence framework and research architecture. Research may inform products, but research is not automatically a product feature and implemented experiments are not automatically commercially available capabilities.",
  },
];

export default function ProjectsExpanded() {
  return (
    <section className="section projects-expanded">
      <div className="container">

        {/* Hero */}
        <div className="hero-section" data-reveal="true">
          <div className="hero-copy">
            <span className="hero-label">Products</span>
            <h1>
              Products that stand on their own. <span className="gradient-text">Research that compounds carefully.</span>
            </h1>
            <p>Infrakinetic is the current commercial lead in the Workplace domain. Hospitality remains a second domain under architectural rebuild. Polynovea&apos;s open-source infrastructure lives separately under Open Source, while HBIF remains a research architecture rather than another product card.</p>
            <p className="hero-byline">By Polynovea Intelligence Team · Current portfolio view · Updated September 19, 2026</p>
          </div>
          <div className="hero-actions">
            <Link href="/" className="btn btn-secondary">Back to Home</Link>
          </div>
        </div>

        {/* Intelligence System — bento, split by domain */}
        <div className="content-section">
          <div className="block-header" data-reveal="true" data-reveal-delay="40">
            <h2 className="block-label-h2">What is Polynovea building today?</h2>
            <p className="block-answer">The domain-product portfolio currently has two distinct states: Infrakinetic as the commercial lead in Workplace, and Hospitality as a domain product under architectural rebuild. Open-source software is maintained as a separate portfolio because it serves a different distribution and product role.</p>
          </div>

          <div className="domain-block" data-reveal="true" data-reveal-delay="80">
            <div className="domain-block-header">
              <span className="domain-block-name">Infrakinetic · Workplace</span>
              <span className="domain-block-status domain-block-status-live">Commercial lead</span>
            </div>
            <BentoGrid items={workplaceModules} />
            <a
              href="https://www.infrakinetic.in"
              target="_blank"
              rel="noopener noreferrer"
              className="domain-block-link"
            >
              Visit infrakinetic.in &rarr;
            </a>
          </div>

          <div className="domain-block" data-reveal="true" data-reveal-delay="110">
            <div className="domain-block-header">
              <span className="domain-block-name">Hospitality</span>
              <span className="domain-block-status domain-block-status-dev">Architectural rebuild</span>
            </div>
            <BentoGrid items={hospitalityModules} />
          </div>
        </div>

        {/* How it works */}
        <div className="content-section" data-reveal="true">
          <div className="block-header">
            <h2 className="block-label-h2">How do products and research reinforce one another?</h2>
            <p className="block-answer">The commercial company does not depend on a universal HBIF thesis being true. Products solve real problems independently; permitted evidence can improve domain intelligence; cross-domain research tests what transfers; and validated intelligence can return to products where it is actually supported.</p>
          </div>
          <div className="stats-row">
            <div className="stat-item">
              <span className="stat-num">P1</span>
              <span className="stat-label">Infrakinetic Phase 1 complete</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">2D</span>
              <span className="stat-label">current domain-product areas</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">V2</span>
              <span className="stat-label">Hospitality rebuild direction</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">3L</span>
              <span className="stat-label">current public HBIF architecture</span>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="content-section faq-section" data-reveal="true">
          <div className="block-header">
            <h2 className="block-label-h2">Frequently asked questions about Polynovea&apos;s products</h2>
          </div>
          <div className="faq-list">
            {faqItems.map(({ q, a }) => (
              <div key={q} className="faq-item">
                <h3 className="faq-q">{q}</h3>
                <p className="faq-a">{a}</p>
              </div>
            ))}
          </div>
          <div className="faq-links">
            <Link href="/open-source">Explore Polynovea Open Source</Link>
            <Link href="/architecture">Explore the HBIF architecture</Link>
            <Link href="/about">About Polynovea</Link>
            <Link href="/#contact">Contact Polynovea</Link>
          </div>
        </div>

      </div>

      <style jsx>{`
        .projects-expanded {
          background: rgba(9, 8, 16, 0.62);
        }

        /* ── Hero ── */
        .hero-section {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: var(--space-2xl);
          align-items: end;
          margin-bottom: var(--space-4xl);
        }

        .hero-label {
          display: inline-block;
          color: var(--accent-authority-muted);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .hero-copy h1 {
          margin: var(--space-md) 0 0;
          color: var(--text-primary);
          font-family: var(--font-display);
          font-size: clamp(34px, 5vw, 64px);
          line-height: 1.04;
        }

        .hero-copy p {
          margin: var(--space-md) 0 0;
          color: var(--text-secondary);
          font-size: 16px;
          line-height: 1.6;
          max-width: 44rem;
        }

        .hero-byline {
          font-size: 12px !important;
          color: var(--text-disabled) !important;
          font-family: var(--font-mono, monospace);
          letter-spacing: 0.06em;
          margin-top: var(--space-sm) !important;
        }

        .hero-actions {
          display: flex;
          justify-content: flex-end;
          align-items: flex-start;
        }

        /* ── Section chrome ── */
        .content-section { margin-top: var(--space-4xl); }

        .domain-block { margin-bottom: var(--space-xl); }
        .domain-block:last-child { margin-bottom: 0; }

        .domain-block-link {
          display: inline-block;
          margin-top: var(--space-md);
          font-size: 14px;
          font-weight: 500;
          color: var(--accent-intelligence);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .domain-block-link:hover { color: var(--accent-authority); }

        .domain-block-header {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          margin-bottom: var(--space-md);
        }

        .domain-block-name {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-primary);
        }

        .domain-block-status {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: var(--radius-pill);
          border: 1px solid currentColor;
        }

        .domain-block-status-live { color: #4ade80; }
        .domain-block-status-dev { color: var(--accent-authority, #e6d3a3); opacity: 0.85; }

        .block-header {
          margin-bottom: var(--space-xl);
          padding-bottom: var(--space-md);
          border-bottom: 1px solid var(--border-muted);
        }

        .block-label {
          color: var(--text-secondary);
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .block-label-h2 {
          color: var(--text-primary);
          font-family: var(--font-display);
          font-size: clamp(22px, 3vw, 32px);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.15;
          margin: 0 0 var(--space-md);
        }

        .block-answer {
          color: var(--text-secondary);
          font-size: 16px;
          line-height: 1.7;
          max-width: 720px;
          margin: 0;
        }

        /* ── Stats ── */
        .stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-md);
          margin-top: var(--space-2xl);
        }

        .stat-item {
          border: 1px solid rgba(124, 58, 237, 0.22);
          border-radius: var(--radius-sm, 8px);
          padding: var(--space-lg);
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
        }

        .stat-num {
          font-family: var(--font-display);
          font-size: clamp(36px, 4vw, 56px);
          font-weight: 700;
          color: var(--accent-authority);
          line-height: 1;
          letter-spacing: -0.03em;
        }

        .stat-label {
          font-size: 12px;
          color: var(--text-disabled);
          line-height: 1.4;
          font-family: var(--font-mono, monospace);
          letter-spacing: 0.04em;
        }

        /* ── FAQ ── */
        .faq-section { padding-bottom: var(--space-4xl); }

        .faq-list {
          display: grid;
          gap: var(--space-lg);
          margin-bottom: var(--space-2xl);
        }

        .faq-item {
          border-left: 2px solid rgba(124, 58, 237, 0.4);
          padding-left: var(--space-lg);
        }

        .faq-q {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 var(--space-sm);
          line-height: 1.4;
        }

        .faq-a {
          font-size: 15px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin: 0;
        }

        .faq-links {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-md);
          padding-top: var(--space-xl);
          border-top: 1px solid var(--border-muted);
        }

        .faq-links a {
          font-size: 14px;
          font-weight: 500;
          color: var(--accent-intelligence);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .faq-links a:hover { color: var(--accent-authority); }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .hero-section {
            grid-template-columns: 1fr;
            align-items: start;
          }
          .hero-actions { justify-content: flex-start; }
          .stats-row { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 600px) {
          .hero-section {
            gap: var(--space-lg);
            margin-bottom: var(--space-3xl);
          }
          .content-section { margin-top: var(--space-3xl); }
          .stats-row { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </section>
  );
}
