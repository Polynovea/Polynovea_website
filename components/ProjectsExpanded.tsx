"use client";

import Link from "next/link";
import { BentoGrid, type BentoItem } from "@/components/ui/bento-grid";

const systemModules: BentoItem[] = [
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
    desc: "Not review sentiment analysis — behavioral signal extraction. Each Google Review is run through the HBIF extraction layer to pull out Stimuli, Frictions, Compensations, and Emotional context. 11,063 venues behaviourally analysed across Mumbai. Signals map to six fitness dimensions and feed a live 8-phase acquisition playbook that tells you who to target, how to reach them, and what they respond to before a show runs.",
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

const faqItems = [
  {
    q: "What projects is Polynovea currently working on?",
    a: "Polynovea is actively building three behavioral intelligence modules: the Decision Framework which defines what to measure and why; the Acquisition System which maps behavioral mechanics of commercial environments using an 8-phase live execution framework; and the Optimisation System which instruments live environments and converts behavioral intelligence into measurable revenue optimisation.",
  },
  {
    q: "What is the behavioral intelligence Decision Framework?",
    a: "The Decision Framework is the foundation of Polynovea's behavioral intelligence system. It defines what behavior to measure, establishes success metrics, and creates measurement baselines before any optimization occurs. Output: KPIs, decision criteria, and a behavioral baseline for each operating environment.",
  },
  {
    q: "What is the 8-phase Acquisition System?",
    a: "The Acquisition System extracts multi-source behavioral signals from commercial environments and structures them through an ontology layer that maps how human behavior operates. It scores venues across fitness dimensions and audience archetypes using Bayesian inference, then converts that intelligence into an 8-phase field execution framework.",
  },
  {
    q: "What is the Optimisation System?",
    a: "The Optimisation System is a two-part behavioral intelligence system. Part 1 instruments the live environment — capturing POS data, venue flow, and audience behavior in real time. Part 2 converts that intelligence into measurable revenue optimisation decisions for venue operators.",
  },
  {
    q: "What is Cappella by Polynovea?",
    a: "Cappella is a behavioral software product built by Polynovea operating within the music context. It applies the HBIF's measurement and pattern-recognition capabilities to the artist–audience relationship, creating a data layer for the music domain.",
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
            <p>Three behavioral intelligence modules. One compounding system. Live inside every domain Polynovea operates — hospitality, music, and beyond.</p>
            <p className="hero-byline">By Polynovea Intelligence Team · 3 active modules · Updated June 27, 2026</p>
          </div>
          <div className="hero-actions">
            <Link href="/" className="btn btn-secondary">Back to Home</Link>
          </div>
        </div>

        {/* Intelligence System — bento */}
        <div className="content-section">
          <div className="block-header" data-reveal="true" data-reveal-delay="40">
            <h2 className="block-label-h2">What are the active behavioral intelligence modules?</h2>
            <p className="block-answer">The behavioral intelligence system comprises 3 compounding modules, each converting the output of the previous into higher-order operational leverage. Together they form an end-to-end pipeline from signal extraction to revenue optimisation.</p>
          </div>

          <div data-reveal="true" data-reveal-delay="80">
            <BentoGrid items={systemModules} />
          </div>
        </div>

        {/* How it works */}
        <div className="content-section" data-reveal="true">
          <div className="block-header">
            <h2 className="block-label-h2">How does the behavioral intelligence system compound across domains?</h2>
            <p className="block-answer">Each module is deployed live in the hospitality domain first, then the same infrastructure runs inside the music domain without a rebuild. Behavioral patterns observed in live hospitality environments surface mechanisms that improve accuracy in music — and vice versa. The system becomes more intelligent the more domains it operates in.</p>
          </div>
          <div className="stats-row">
            <div className="stat-item">
              <span className="stat-num">3</span>
              <span className="stat-label">active behavioral intelligence modules</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">2</span>
              <span className="stat-label">live deployment domains</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">8</span>
              <span className="stat-label">phase acquisition execution framework</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">3</span>
              <span className="stat-label">intelligence modules</span>
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
