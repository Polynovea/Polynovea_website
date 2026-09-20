"use client";

import Link from "next/link";
import { BentoGrid, type BentoItem } from "@/components/ui/bento-grid";

const ossProjects: BentoItem[] = [
  {
    num: "01",
    tag: "Preparing for open-source release",
    title: "Content Operations Platform",
    desc: "An open-source, self-hostable headless CMS and structured-content platform for teams that need more than a place to type and publish pages. It brings structured data, visual schema modelling, editorial collaboration, review, releases, delivery operations, developer APIs and governed extensions into one operating surface.",
    colSpan: 3,
  },
];

const principles = [
  {
    title: "Own the system",
    body: "The open-source path is designed so users can run the software on supported infrastructure without depending on a private Polynovea service to keep the core product useful.",
  },
  {
    title: "Portable by default",
    body: "The platform is built around PostgreSQL semantics and provider boundaries rather than one mandatory hosting stack. Polynovea's own deployment should be a reference, not a lock-in mechanism.",
  },
  {
    title: "Inspectable by engineers",
    body: "Visual workflows should not hide canonical schemas, migrations, contracts, operational plans or evidence from the people responsible for the system.",
  },
  {
    title: "Governance is part of the product",
    body: "Permissions, approvals, audit, versioning and evidence belong in the normal operating path instead of being treated as optional wrappers around automation or AI.",
  },
];

export default function OpenSourceExpanded() {
  return (
    <section className="section open-source-expanded">
      <div className="container">
        <div className="hero-section" data-reveal="true">
          <div className="hero-copy">
            <span className="hero-label">Open Source</span>
            <h1>
              Software you can inspect, run and own. <span className="gradient-text">Built in the open where it should be.</span>
            </h1>
            <p>
              Polynovea&apos;s open-source work lives here as a separate portfolio from our domain products.
              The first project is a self-hostable headless CMS and structured-content platform that grew into
              a broader Content Operations Platform.
            </p>
            <p className="hero-byline">Polynovea Open Source · Portfolio view · Updated September 19, 2026</p>
          </div>
          <div className="hero-actions">
            <Link href="/projects" className="btn btn-secondary">View Products</Link>
          </div>
        </div>

        <div className="content-section">
          <div className="block-header" data-reveal="true" data-reveal-delay="40">
            <h2 className="block-label-h2">Open-source projects from Polynovea</h2>
            <p className="block-answer">
              This directory is the canonical home for Polynovea&apos;s OSS portfolio. New open-source projects
              will be added here as they are ready for public release rather than being mixed into the domain-product directory.
            </p>
          </div>

          <div className="project-block" data-reveal="true" data-reveal-delay="80">
            <div className="project-block-header">
              <div>
                <span className="project-name">Content Operations Platform</span>
                <p className="project-category">Open-source headless CMS · Structured content · Self-hosted software</p>
              </div>
              <span className="project-status">Upcoming OSS</span>
            </div>
            <BentoGrid items={ossProjects} />

            <div className="capability-grid">
              <div className="capability-card">
                <span className="capability-kicker">Structure</span>
                <h3>Content and data models</h3>
                <p>Visual schema and database modelling for structured records, content-enabled models and publishable content.</p>
              </div>
              <div className="capability-card">
                <span className="capability-kicker">Operate</span>
                <h3>Review, release and delivery</h3>
                <p>Collaboration, validation, approvals, preview, release management, routes, delivery operations and observable publishing workflows.</p>
              </div>
              <div className="capability-card">
                <span className="capability-kicker">Build</span>
                <h3>REST, SDK, CLI and extensions</h3>
                <p>Developer-facing contracts and automation surfaces designed to remain bounded by the same governance model as the visual product.</p>
              </div>
            </div>

            <div className="status-note">
              <strong>Release boundary.</strong> Current public source documentation describes the intended complete OSS product after Phase 13.
              It should not be read as a claim that every future-state capability is already generally available today.
            </div>
          </div>
        </div>

        <div className="content-section" data-reveal="true">
          <div className="block-header">
            <h2 className="block-label-h2">What does open source mean here?</h2>
            <p className="block-answer">
              Open source is not a decorative distribution label. The project is being designed around ownership,
              portability, inspectability and a useful self-hosted path.
            </p>
          </div>
          <div className="principles-grid">
            {principles.map((principle) => (
              <article key={principle.title} className="principle-card">
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="content-section deployment-section" data-reveal="true">
          <div className="block-header">
            <h2 className="block-label-h2">Self-hosted first. Managed cloud later.</h2>
            <p className="block-answer">
              The open-source edition is the core distribution path. A managed Polynovea Cloud edition is a planned future option for teams that prefer Polynovea to operate the infrastructure; it is not a replacement for self-hosting.
            </p>
          </div>
          <div className="deployment-grid">
            <div className="deployment-card deployment-card-primary">
              <span className="deployment-label">Open Source</span>
              <h3>Self-hosted</h3>
              <p>Run the platform on supported infrastructure, retain control of deployment and data, and use the public developer interfaces without depending on a private Polynovea runtime.</p>
            </div>
            <div className="deployment-card">
              <span className="deployment-label">Planned</span>
              <h3>Polynovea Cloud</h3>
              <p>A managed deployment path intended to remove operational overhead while keeping the open-source option available. Commercial and release details will be published when that service is ready.</p>
            </div>
          </div>
        </div>

        <div className="content-section faq-section" data-reveal="true">
          <div className="block-header">
            <h2 className="block-label-h2">Open-source questions</h2>
          </div>
          <div className="faq-list">
            <div className="faq-item">
              <h3>Is the Content Operations Platform another Polynovea domain product?</h3>
              <p>No. Domain products live under Products. The Content Operations Platform belongs to Polynovea&apos;s separate open-source portfolio and has a different distribution and product role.</p>
            </div>
            <div className="faq-item">
              <h3>Is the open-source release generally available today?</h3>
              <p>Not yet. The public product guide describes the intended post-Phase-13 OSS product. This page therefore labels the project as preparing for open-source release rather than implying a public GA state that has not been established.</p>
            </div>
            <div className="faq-item">
              <h3>Will there be a managed version?</h3>
              <p>A managed Polynovea Cloud path is planned for the future. The goal is to add convenience and managed operations without removing the self-hosted option.</p>
            </div>
          </div>
          <div className="faq-links">
            <Link href="/projects">Explore Polynovea products</Link>
            <Link href="/research">Explore research</Link>
            <Link href="/about">About Polynovea</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .open-source-expanded {
          background: rgba(9, 8, 16, 0.62);
        }

        .hero-section {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: var(--space-2xl);
          align-items: end;
          margin-bottom: var(--space-4xl);
        }

        .hero-label,
        .capability-kicker,
        .deployment-label {
          display: inline-block;
          color: var(--accent-authority-muted);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.09em;
          text-transform: uppercase;
        }

        .hero-copy h1 {
          margin: var(--space-md) 0 0;
          color: var(--text-primary);
          font-family: var(--font-display);
          font-size: clamp(36px, 5vw, 66px);
          line-height: 1.04;
          max-width: 980px;
        }

        .hero-copy p {
          margin: var(--space-md) 0 0;
          color: var(--text-secondary);
          font-size: 16px;
          line-height: 1.65;
          max-width: 48rem;
        }

        .hero-byline {
          font-size: 12px !important;
          color: var(--text-disabled) !important;
          font-family: var(--font-mono, monospace);
          letter-spacing: 0.05em;
        }

        .content-section {
          margin-top: var(--space-4xl);
        }

        .block-header {
          max-width: 800px;
          margin-bottom: var(--space-xl);
        }

        .block-label-h2 {
          color: var(--text-primary);
          font-family: var(--font-display);
          font-size: clamp(28px, 4vw, 44px);
          line-height: 1.08;
          margin: 0;
        }

        .block-answer {
          color: var(--text-secondary);
          line-height: 1.7;
          margin-top: var(--space-md);
          font-size: 16px;
        }

        .project-block-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: var(--space-lg);
          margin-bottom: var(--space-md);
        }

        .project-name {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .project-category {
          color: var(--text-disabled);
          margin-top: 5px;
          font-size: 13px;
        }

        .project-status {
          flex-shrink: 0;
          color: var(--accent-authority-muted);
          border: 1px solid rgba(214, 173, 78, 0.28);
          background: rgba(214, 173, 78, 0.08);
          border-radius: var(--radius-pill);
          padding: 5px 11px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .capability-grid,
        .principles-grid,
        .deployment-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: var(--space-md);
          margin-top: var(--space-xl);
        }

        .capability-card,
        .principle-card,
        .deployment-card,
        .faq-item,
        .status-note {
          border: 1px solid rgba(124, 58, 237, 0.18);
          background: rgba(18, 17, 27, 0.6);
          border-radius: 14px;
        }

        .capability-card,
        .principle-card,
        .deployment-card {
          padding: var(--space-xl);
        }

        .capability-card h3,
        .principle-card h3,
        .deployment-card h3 {
          color: var(--text-primary);
          font-family: var(--font-display);
          font-size: 20px;
          margin: var(--space-sm) 0;
        }

        .capability-card p,
        .principle-card p,
        .deployment-card p,
        .faq-item p {
          color: var(--text-secondary);
          line-height: 1.65;
          font-size: 14px;
        }

        .status-note {
          padding: var(--space-lg);
          margin-top: var(--space-lg);
          color: var(--text-secondary);
          line-height: 1.65;
          font-size: 14px;
        }

        .status-note strong {
          color: var(--text-primary);
        }

        .principles-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .deployment-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .deployment-card-primary {
          border-color: rgba(214, 173, 78, 0.3);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
        }

        .faq-list {
          display: grid;
          gap: var(--space-md);
        }

        .faq-item {
          padding: var(--space-lg);
        }

        .faq-item h3 {
          color: var(--text-primary);
          font-size: 17px;
          margin: 0 0 var(--space-sm);
        }

        .faq-links {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-lg);
          margin-top: var(--space-xl);
        }

        .faq-links :global(a) {
          color: var(--accent-intelligence);
          font-size: 14px;
          text-decoration: none;
        }

        .faq-links :global(a:hover) {
          color: var(--accent-authority);
        }

        @media (max-width: 900px) {
          .hero-section {
            grid-template-columns: 1fr;
          }

          .hero-actions {
            justify-self: start;
          }

          .capability-grid,
          .principles-grid,
          .deployment-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .project-block-header {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
}
