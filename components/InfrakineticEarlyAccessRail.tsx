"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface CountResponse {
  count?: number;
}

interface InfrakineticEarlyAccessRailProps {
  initialCount: number | null;
}

export default function InfrakineticEarlyAccessRail({ initialCount }: InfrakineticEarlyAccessRailProps) {
  const [count, setCount] = useState<number | null>(initialCount);

  useEffect(() => {
    let active = true;

    const loadCount = async () => {
      try {
        const response = await fetch("/api/early-access/infrakinetic/count", {
          cache: "no-store",
        });

        if (!response.ok) return;
        const data = (await response.json()) as CountResponse;
        if (active && typeof data.count === "number") {
          setCount(data.count);
        }
      } catch {
        // The waitlist UI remains visible while the shared datastore is being connected.
      }
    };

    loadCount();
    const timer = window.setInterval(loadCount, 60_000);

    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  return (
    <section className="early-access" aria-label="Infrakinetic controlled early access">
      <div className="early-access-topline">
        <span className="pulse-dot" aria-hidden="true" />
        <span>Infrakinetic · Controlled Early Access</span>
      </div>

      <div className="early-access-grid">
        <div className="count-block" aria-live="polite">
          <strong>{count ?? "—"}</strong>
          <span>organisations joined</span>
        </div>

        <p>
          Initial deployments are being formed in controlled onboarding cohorts. Join the list if
          you want Infrakinetic considered for your operating environment.
        </p>

        <div className="early-access-actions">
          <Link href="/early-access/infrakinetic" className="join-link">
            Join Early Access <span aria-hidden="true">→</span>
          </Link>
          <a
            href="https://www.infrakinetic.in/briefing"
            className="briefing-link"
            target="_blank"
            rel="noreferrer"
          >
            Need context first? Request a briefing ↗
          </a>
        </div>
      </div>

      <style jsx>{`
        .early-access {
          margin-top: 28px;
          padding: 18px 20px;
          border: 1px solid rgba(230, 211, 163, 0.2);
          border-radius: 16px;
          background:
            linear-gradient(110deg, rgba(230, 211, 163, 0.055), rgba(123, 97, 255, 0.025)),
            rgba(10, 10, 14, 0.38);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.025);
          backdrop-filter: blur(10px);
        }

        .early-access-topline {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--accent-authority);
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 650;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        .pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: var(--accent-authority);
          box-shadow: 0 0 0 5px rgba(230, 211, 163, 0.07), 0 0 18px rgba(230, 211, 163, 0.35);
        }

        .early-access-grid {
          display: grid;
          grid-template-columns: 150px minmax(0, 1fr) auto;
          gap: 22px;
          align-items: center;
          margin-top: 14px;
        }

        .count-block {
          display: flex;
          flex-direction: column;
          padding-right: 20px;
          border-right: 1px solid rgba(221, 216, 232, 0.1);
        }

        .count-block strong {
          color: var(--text-primary);
          font-family: var(--font-display);
          font-size: clamp(34px, 3.2vw, 48px);
          line-height: 0.95;
          letter-spacing: -0.045em;
          font-weight: 560;
        }

        .count-block span {
          margin-top: 7px;
          color: var(--text-disabled);
          font-size: 10px;
          letter-spacing: 0.04em;
        }

        .early-access-grid p {
          margin: 0;
          max-width: 430px;
          color: var(--text-secondary);
          font-size: 12px;
          line-height: 1.55;
        }

        .early-access-actions {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
          min-width: 185px;
        }

        .join-link,
        .briefing-link {
          text-decoration: none;
        }

        .join-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #121015;
          background: var(--accent-authority);
          border-radius: 999px;
          padding: 9px 14px;
          font-size: 11px;
          font-weight: 700;
          transition: transform 180ms ease, filter 180ms ease;
        }

        .join-link:hover {
          transform: translateY(-1px);
          filter: brightness(1.04);
        }

        .briefing-link {
          color: var(--text-disabled);
          font-size: 10px;
          line-height: 1.35;
          transition: color 180ms ease;
        }

        .briefing-link:hover {
          color: var(--text-primary);
        }

        @media (max-width: 980px) {
          .early-access-grid {
            grid-template-columns: 130px minmax(0, 1fr);
          }

          .early-access-actions {
            grid-column: 1 / -1;
            flex-direction: row;
            align-items: center;
            flex-wrap: wrap;
          }
        }

        @media (max-width: 640px) {
          .early-access {
            margin-top: 22px;
            padding: 16px;
          }

          .early-access-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }

          .count-block {
            padding-right: 0;
            padding-bottom: 12px;
            border-right: 0;
            border-bottom: 1px solid rgba(221, 216, 232, 0.1);
          }

          .early-access-actions {
            grid-column: auto;
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </section>
  );
}
