"use client";

import Link from "next/link";
import { BentoGrid, type BentoItem } from "@/components/ui/bento-grid";

const hospitalityModules: BentoItem[] = [
  {
    num: "01",
    tag: "01",
    title: "Decision Framework",
    desc: "Determines whether an opportunity is viable. Evaluates engagement fit, pricing logic, and expected outcomes before any resource is committed.",
    colSpan: 1,
  },
  {
    num: "02",
    tag: "02",
    title: "Acquisition System",
    desc: "Not review sentiment analysis — behavioral signal extraction. Each Google Review is run through the HBIF extraction layer to pull out Stimuli, Frictions, Compensations, and Emotional context. 11,063 venues behaviourally analysed across Mumbai. Signals map to five fitness dimensions, scored via pure percentile calibration so new venues aren't penalized for low review counts, and feed a live acquisition playbook that tells you who to target, how to reach them, and what they respond to before they walk in.",
    colSpan: 2,
  },
  {
    num: "03",
    tag: "03",
    title: "Optimisation System",
    desc: "Two-part system. Part 1 instruments the live environment — POS, venue data, audience behaviour. Part 2 converts that intelligence into measurable revenue optimisation for venues.",
    colSpan: 3,
  },
];

const workplaceModules: BentoItem[] = [
  {
    num: "01",
    tag: "Workplace",
    title: "Infrakinetic",
    desc: "The Workplace domain's product — a different domain, a different build. A full operational platform — finance, HR, payroll, commercial — that runs the business and, underneath, generates the behavioral signal this domain's intelligence is built on. In development.",
    colSpan: 3,
  },
];

const faqItems = [
  {
    q: "What projects is Polynovea currently working on?",
    a: "Hospitality's product, the Acquisition System, is live: the Decision Framework defines what to measure and why, the Acquisition System maps behavioral mechanics through a six-stage extraction-to-output pipeline, and the Optimisation System converts behavioral intelligence into measurable revenue optimisation. Infrakinetic, the Workplace domain's product, is in development.",
  },
  {
    q: "What is the behavioral intelligence Decision Framework?",
    a: "The Decision Framework is the foundation of Polynovea's behavioral intelligence system. It defines what behavior to measure, establishes success metrics, and creates measurement baselines before any optimization occurs. Output: KPIs, decision criteria, and a behavioral baseline for each operating environment.",
  },
  {
    q: "What is Polynovea's Acquisition System?",
    a: "The Acquisition System extracts multi-source behavioral signals from commercial environments and structures them through an ontology layer that maps how human behavior operates. It scores venues across five fitness dimensions and audience archetypes using pure percentile calibration — decoupling score from review volume so low-review venues aren't diluted toward a neutral average — then converts that intelligence into a six-stage acquisition pipeline.",
  },
  {
    q: "What is the Optimisation System?",
    a: "The Optimisation System is a two-part behavioral intelligence system. Part 1 instruments the live environment — capturing POS data, venue flow, and audience behavior in real time. Part 2 converts that intelligence into measurable revenue optimisation decisions for venue operators.",
  },
];

export default function ProjectsExpanded() {
  return (
    <section className="section projects-expanded">
      <div className="container">

        {/* Hero */}
        <div className="hero-section" data-reveal="true">
          <div className="hero-copy">
            <span className="hero-label">Projects</span>
            <h1>
              Behavioral intelligence <span className="gradient-text">infrastructure</span> in motion.
            </h1>
            <p>Hospitality&apos;s three-module product, live. Infrakinetic, the Workplace domain&apos;s product, in development. Every domain gets its own — all sharpening one intelligence layer underneath.</p>
            <p className="hero-byline">By Polynovea Intelligence Team · 1 live domain, 1 in development · Updated July 28, 2026</p>
          </div>
          <div className="hero-actions">
            <Link href="/" className="btn btn-secondary">Back to Home</Link>
          </div>
        </div>

        {/* Intelligence System — bento, split by domain */}
        <div className="content-section">
          <div className="block-header" data-reveal="true" data-reveal-delay="40">
            <h2 className="block-label-h2">What are the active behavioral intelligence modules?</h2>
            <p className="block-answer">Each domain gets its own product, built on its own timeline. Hospitality&apos;s is live. Workplace&apos;s is in development. They aren&apos;t modules of the same system — they&apos;re separate products, each sharpening the shared intelligence layer underneath.</p>
          </div>

          <div className="domain-block" data-reveal="true" data-reveal-delay="80">
            <div className="domain-block-header">
              <span className="domain-block-name">Hospitality</span>
              <span className="domain-block-status domain-block-status-live">Live</span>
            </div>
            <BentoGrid items={hospitalityModules} />
          </div>

          <div className="domain-block" data-reveal="true" data-reveal-delay="120">
            <div className="domain-block-header">
              <span className="domain-block-name">Workplace</span>
              <span className="domain-block-status domain-block-status-dev">In development</span>
            </div>
            <BentoGrid items={workplaceModules} />
          </div>
        </div>

        {/* How it works */}
        <div className="content-section" data-reveal="true">
          <div className="block-header">
            <h2 className="block-label-h2">How does the behavioral intelligence system compound across domains?</h2>
            <p className="block-answer">Hospitality's Acquisition System proved the model first. Each new domain gets its own purpose-built product, not a copy of Hospitality's — but every product is built on a shared, deeper layer of the infrastructure that gets sharper with every domain it operates across.</p>
          </div>
          <div className="stats-row">
            <div className="stat-item">
              <span className="stat-num">3</span>
              <span className="stat-label">modules in Hospitality's product</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">1</span>
              <span className="stat-label">live domain</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">6-stage</span>
              <span className="stat-label">acquisition pipeline</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">11,063</span>
              <span className="stat-label">venues behaviourally analysed</span>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="content-section faq-section" data-reveal="true">
          <div className="block-header">
            <h2 className="block-label-h2">Frequently asked questions about Polynovea&apos;s projects</h2>
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
            <Link href="/architecture">Explore the behavioral intelligence stack architecture</Link>
            <Link href="/about">About Polynovea</Link>
            <Link href="/#contact">Partner with us</Link>
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
