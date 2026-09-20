"use client";

import Link from "next/link";

const surfaces = [
  {
    href: "/projects",
    index: "01",
    label: "Products",
    title: "Infrakinetic",
    meta: "Commercial lead",
  },
  {
    href: "/open-source",
    index: "02",
    label: "Open Source",
    title: "Content Operations Platform",
    meta: "Preparing for OSS",
  },
  {
    href: "/research",
    index: "03",
    label: "Research",
    title: "HBIF",
    meta: "Evidence-gated",
  },
];

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-frame">
        <div className="hero-copy">
          <div className="hero-kicker">
            <span className="kicker-mark" />
            Polynovea · Systems, infrastructure & behavioural research
          </div>

          <h1 className="hero-headline">
            Software for complex operations.
            <span> Research into how decisions happen.</span>
          </h1>

          <p className="hero-sub">
            Polynovea builds commercially independent products, open infrastructure, and an
            evidence-gated research architecture for studying behaviour, decisions and outcomes.
          </p>

          <div className="hero-actions">
            <Link href="/projects" className="btn btn-primary">
              Explore Products
            </Link>
            <Link href="/research" className="hero-text-link">
              Read the research <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        <aside className="hero-state" aria-label="Current Polynovea state">
          <div className="state-label">Current state</div>
          <div className="state-row">
            <span className="state-dot state-dot-gold" />
            <div>
              <strong>Commercial</strong>
              <span>Infrakinetic leads revenue and deployment.</span>
            </div>
          </div>
          <div className="state-row">
            <span className="state-dot state-dot-neutral" />
            <div>
              <strong>Open infrastructure</strong>
              <span>Content Operations Platform is preparing for OSS.</span>
            </div>
          </div>
          <div className="state-row">
            <span className="state-dot state-dot-violet" />
            <div>
              <strong>Research</strong>
              <span>HBIF remains evidence-gated and cross-domain validity remains open.</span>
            </div>
          </div>
        </aside>

        <div className="surface-index" aria-label="Explore Polynovea">
          {surfaces.map((surface) => (
            <Link key={surface.href} href={surface.href} className="surface-link">
              <span className="surface-index-number">{surface.index}</span>
              <span className="surface-copy">
                <span className="surface-label">{surface.label}</span>
                <strong>{surface.title}</strong>
                <span className="surface-meta">{surface.meta}</span>
              </span>
              <span className="surface-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="hero-scroll-hint" aria-hidden="true">
        <span>Explore</span>
        <i />
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          min-height: 100svh;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding: calc(var(--nav-height) + 56px) var(--space-xl) 84px;
        }

        .hero-frame {
          width: min(100%, 1200px);
          margin-inline: auto;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(260px, 330px);
          column-gap: clamp(48px, 7vw, 110px);
          row-gap: clamp(36px, 5vh, 64px);
          align-items: end;
        }

        .hero-copy {
          max-width: 870px;
        }

        .hero-kicker {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: var(--text-secondary);
          font-size: 11px;
          font-weight: 650;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 24px;
        }

        .kicker-mark {
          width: 22px;
          height: 1px;
          background: var(--accent-authority);
          box-shadow: 0 0 18px rgba(230, 211, 163, 0.24);
        }

        .hero-headline {
          font-family: var(--font-display);
          font-size: clamp(48px, 5.6vw, 82px);
          line-height: 0.98;
          letter-spacing: -0.048em;
          font-weight: 560;
          color: var(--text-primary);
          max-width: 920px;
          text-wrap: balance;
        }

        .hero-headline span {
          color: var(--accent-authority);
        }

        .hero-sub {
          max-width: 720px;
          margin-top: 26px;
          color: #b6b3be;
          font-size: clamp(16px, 1.35vw, 19px);
          line-height: 1.62;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-top: 32px;
          flex-wrap: wrap;
        }

        .hero-text-link {
          color: var(--text-primary);
          font-size: 14px;
          text-decoration: none;
          border-bottom: 1px solid rgba(230, 211, 163, 0.26);
          padding-bottom: 4px;
          transition: color 180ms ease, border-color 180ms ease;
        }

        .hero-text-link:hover {
          color: var(--accent-authority);
          border-color: var(--accent-authority);
        }

        .hero-state {
          align-self: center;
          border-left: 1px solid rgba(230, 211, 163, 0.16);
          padding-left: 24px;
          display: grid;
          gap: 22px;
        }

        .state-label {
          color: var(--text-disabled);
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .state-row {
          display: grid;
          grid-template-columns: 8px minmax(0, 1fr);
          gap: 12px;
          align-items: start;
        }

        .state-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          margin-top: 7px;
        }

        .state-dot-gold {
          background: var(--accent-authority);
          box-shadow: 0 0 16px rgba(230, 211, 163, 0.34);
        }

        .state-dot-violet {
          background: var(--accent-intelligence);
          box-shadow: 0 0 14px rgba(123, 97, 255, 0.28);
        }

        .state-dot-neutral {
          background: #d1ced6;
        }

        .state-row strong,
        .state-row span {
          display: block;
        }

        .state-row strong {
          color: var(--text-primary);
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .state-row div > span {
          color: var(--text-disabled);
          font-size: 12px;
          line-height: 1.48;
        }

        .surface-index {
          grid-column: 1 / -1;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          border-top: 1px solid rgba(221, 216, 232, 0.10);
          border-bottom: 1px solid rgba(221, 216, 232, 0.10);
        }

        .surface-link {
          min-height: 118px;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 16px;
          padding: 20px 22px;
          color: inherit;
          text-decoration: none;
          background: rgba(8, 8, 11, 0.22);
          transition: background 220ms ease, border-color 220ms ease;
        }

        .surface-link + .surface-link {
          border-left: 1px solid rgba(221, 216, 232, 0.10);
        }

        .surface-link:hover {
          background: rgba(18, 18, 24, 0.66);
        }

        .surface-index-number {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--accent-authority-muted);
          align-self: start;
          margin-top: 3px;
        }

        .surface-copy {
          display: grid;
          gap: 3px;
        }

        .surface-label {
          color: var(--text-disabled);
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .surface-copy strong {
          color: var(--text-primary);
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 520;
          letter-spacing: -0.015em;
        }

        .surface-meta {
          color: var(--text-secondary);
          font-size: 12px;
        }

        .surface-arrow {
          color: var(--text-disabled);
          font-size: 15px;
          transition: color 180ms ease, transform 180ms ease;
        }

        .surface-link:hover .surface-arrow {
          color: var(--accent-authority);
          transform: translate(2px, -2px);
        }

        .hero-scroll-hint {
          position: absolute;
          right: max(var(--space-xl), calc((100vw - 1200px) / 2));
          bottom: 28px;
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text-disabled);
          font-size: 9px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .hero-scroll-hint i {
          width: 42px;
          height: 1px;
          background: linear-gradient(90deg, rgba(230, 211, 163, 0.45), transparent);
        }

        @media (max-width: 960px) {
          .hero-frame {
            grid-template-columns: 1fr;
          }

          .hero-state {
            display: none;
          }
        }

        @media (max-width: 760px) {
          .hero {
            min-height: auto;
            padding: calc(var(--nav-height) + 46px) var(--space-lg) 54px;
          }

          .hero-headline {
            font-size: clamp(42px, 12vw, 60px);
          }

          .surface-index {
            grid-template-columns: 1fr;
            border-bottom: 0;
          }

          .surface-link {
            min-height: 96px;
            border-bottom: 1px solid rgba(221, 216, 232, 0.10);
          }

          .surface-link + .surface-link {
            border-left: 0;
          }

          .hero-scroll-hint {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
