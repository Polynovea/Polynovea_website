"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";

const ENGINE_OPTIONS = [
  "CRM & Sales",
  "HR",
  "Payroll",
  "Recruitment",
  "Finance",
  "Billing & Invoicing",
  "Payments",
  "Marketing",
  "Operations",
  "Customer 360",
  "Migration Engine",
  "Equity",
  "Platform Infrastructure",
  "Full platform / not sure yet",
];

const COMPANY_SIZES = ["1–25", "26–50", "51–100", "101–250", "251–500", "501–1,000", "1,001+"];
const TIMELINES = ["As soon as possible", "Within 1–3 months", "Within 3–6 months", "6+ months", "Still evaluating"];

interface CountPayload {
  count?: number;
}

interface InfrakineticEarlyAccessClientProps {
  initialCount: number | null;
}

export default function InfrakineticEarlyAccessClient({ initialCount }: InfrakineticEarlyAccessClientProps) {
  const [count, setCount] = useState<number | null>(initialCount);
  const [selectedEngines, setSelectedEngines] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const selectionSummary = useMemo(
    () =>
      selectedEngines.length === 0
        ? "Select the engines or areas you want us to evaluate."
        : `${selectedEngines.length} ${selectedEngines.length === 1 ? "area" : "areas"} selected`,
    [selectedEngines]
  );

  const loadCount = async () => {
    try {
      const response = await fetch("/api/early-access/infrakinetic/count", { cache: "no-store" });
      if (!response.ok) return;
      const data = (await response.json()) as CountPayload;
      if (typeof data.count === "number") setCount(data.count);
    } catch {
      // Keep the page usable while the shared datastore is being connected.
    }
  };

  useEffect(() => {
    let cancelled = false;

    fetch("/api/early-access/infrakinetic/count", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) return null;
        return response.json() as Promise<CountPayload>;
      })
      .then((data) => {
        if (!cancelled && data && typeof data.count === "number") {
          setCount(data.count);
        }
      })
      .catch(() => {
        // Keep the page usable while the shared datastore is being connected.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const toggleEngine = (engine: string) => {
    setSelectedEngines((current) =>
      current.includes(engine) ? current.filter((item) => item !== engine) : [...current, engine]
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (selectedEngines.length === 0) {
      setError("Select at least one engine or operating area.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    setSubmitting(true);
    try {
      const response = await fetch("/api/early-access/infrakinetic/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          company: formData.get("company"),
          role: formData.get("role"),
          companySize: formData.get("companySize"),
          timeline: formData.get("timeline"),
          currentStack: formData.get("currentStack"),
          problemStatement: formData.get("problemStatement"),
          engines: selectedEngines,
          sourceSite: "polynovea",
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || "We could not add you to Early Access yet.");
      }

      setSubmitted(true);
      await loadCount();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="early-page">
      <div className="container early-shell">
        <div className="early-intro" data-reveal>
          <div className="eyebrow-row">
            <span className="status-dot" aria-hidden="true" />
            <span>Infrakinetic · A Polynovea Product · Controlled Early Access</span>
          </div>

          <h1 className="t-display-md">
            Join the first controlled
            <br />
            <span className="gradient-text">Infrakinetic cohorts.</span>
          </h1>

          <p className="intro-copy">
            This is not an open signup. We are forming deployment cohorts deliberately so migration,
            configuration, governance and operating workflows can be handled with care.
          </p>

          <div className="counter-card" aria-live="polite">
            <strong>{count ?? "—"}</strong>
            <div>
              <span>organisations joined</span>
              <p>Only explicit Early Access signups are counted.</p>
            </div>
          </div>

          <div className="how-it-works">
            <span className="t-label">How it works</span>
            <div className="steps">
              <div><b>01</b><span>Tell us what you need</span></div>
              <div><b>02</b><span>We review operating fit</span></div>
              <div><b>03</b><span>Suitable organisations enter an upcoming cohort</span></div>
            </div>
          </div>

          <div className="briefing-card">
            <span className="t-label">Need to understand the platform first?</span>
            <p>Request a technical briefing without joining the Early Access list.</p>
            <a href="https://www.infrakinetic.in/briefing" target="_blank" rel="noreferrer">
              Request a platform briefing ↗
            </a>
          </div>
        </div>

        <div className="form-card card" data-reveal data-reveal-delay="120">
          {submitted ? (
            <div className="success-state">
              <div className="success-mark">✓</div>
              <span className="t-label">Early Access</span>
              <h2 className="t-display-sm">You&apos;re on the list.</h2>
              <p>
                We&apos;ll review your operating requirements when forming upcoming onboarding cohorts.
                Joining the list does not lock you into a deployment.
              </p>
              <div className="success-count">
                <strong>{count ?? "—"}</strong>
                <span>organisations have now joined</span>
              </div>
              <Link href="/" className="btn btn-secondary">Back to Polynovea</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="waitlist-form">
              <div className="form-heading">
                <span className="t-label">Join Early Access</span>
                <h2>Tell us where Infrakinetic should start.</h2>
                <p>
                  The information below helps us understand fit before assigning future onboarding cohorts.
                </p>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full name</label>
                  <input id="name" name="name" type="text" placeholder="Your name" autoComplete="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Work email</label>
                  <input id="email" name="email" type="email" placeholder="you@company.com" autoComplete="email" required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="company">Company</label>
                  <input id="company" name="company" type="text" placeholder="Company name" autoComplete="organization" required />
                </div>
                <div className="form-group">
                  <label htmlFor="role">Your role</label>
                  <input id="role" name="role" type="text" placeholder="Founder, COO, Finance Lead…" autoComplete="organization-title" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="companySize">Company size</label>
                  <select id="companySize" name="companySize" required defaultValue="">
                    <option value="" disabled>Select employee count</option>
                    {COMPANY_SIZES.map((size) => <option key={size} value={size}>{size}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="timeline">Expected timeline</label>
                  <select id="timeline" name="timeline" required defaultValue="">
                    <option value="" disabled>Select a timeline</option>
                    {TIMELINES.map((timeline) => <option key={timeline} value={timeline}>{timeline}</option>)}
                  </select>
                </div>
              </div>

              <fieldset className="engine-fieldset">
                <legend>Which engines or operating areas matter to you?</legend>
                <p>{selectionSummary}</p>
                <div className="engine-grid">
                  {ENGINE_OPTIONS.map((engine) => {
                    const active = selectedEngines.includes(engine);
                    return (
                      <button
                        type="button"
                        key={engine}
                        className={`engine-chip${active ? " active" : ""}`}
                        onClick={() => toggleEngine(engine)}
                        aria-pressed={active}
                      >
                        {engine}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="form-group">
                <label htmlFor="currentStack">What are you using today?</label>
                <textarea
                  id="currentStack"
                  name="currentStack"
                  rows={3}
                  placeholder="For example: Zoho CRM, Keka, Tally, spreadsheets, custom systems…"
                />
              </div>

              <div className="form-group">
                <label htmlFor="problemStatement">What problem are you trying to solve?</label>
                <textarea
                  id="problemStatement"
                  name="problemStatement"
                  rows={5}
                  placeholder="Describe the operating problem, fragmentation, workflow or replacement you want us to understand."
                  required
                />
              </div>

              <label className="consent-row">
                <input type="checkbox" required />
                <span>
                  I am explicitly asking to join the Infrakinetic Early Access list and understand that cohort selection is reviewed rather than strictly first-come-first-served.
                </span>
              </label>

              {error && <p className="form-error">{error}</p>}

              <button type="submit" className="btn btn-primary submit-btn" disabled={submitting}>
                {submitting ? "Joining…" : "Join Infrakinetic Early Access →"}
              </button>

              <p className="form-footnote">
                Briefing requests and general contact submissions do not increment the public Early Access count.
              </p>
            </form>
          )}
        </div>
      </div>

      <style jsx>{`
        .early-page {
          min-height: 100vh;
          padding: calc(var(--nav-height) + 64px) 0 96px;
          background: rgba(9, 8, 16, 0.62);
        }
        .early-shell {
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
          gap: clamp(42px, 6vw, 84px);
          align-items: start;
        }
        .early-intro {
          position: sticky;
          top: calc(var(--nav-height) + 42px);
        }
        .eyebrow-row {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--accent-authority);
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 650;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 22px;
        }
        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent-authority);
          box-shadow: 0 0 0 6px rgba(230, 211, 163, 0.07), 0 0 18px rgba(230, 211, 163, 0.35);
        }
        .intro-copy {
          margin-top: 22px;
          max-width: 620px;
          color: var(--text-secondary);
          font-size: 16px;
          line-height: 1.7;
        }
        .counter-card {
          margin-top: 30px;
          display: flex;
          align-items: center;
          gap: 22px;
          padding: 20px 22px;
          border: 1px solid rgba(230, 211, 163, 0.2);
          border-radius: 16px;
          background: linear-gradient(110deg, rgba(230, 211, 163, 0.06), rgba(123, 97, 255, 0.03));
        }
        .counter-card strong {
          min-width: 72px;
          color: var(--text-primary);
          font-family: var(--font-display);
          font-size: 52px;
          line-height: 1;
          letter-spacing: -0.05em;
          font-weight: 560;
        }
        .counter-card span {
          color: var(--text-primary);
          font-size: 13px;
          font-weight: 600;
        }
        .counter-card p {
          margin: 4px 0 0;
          color: var(--text-disabled);
          font-size: 11px;
          line-height: 1.45;
        }
        .how-it-works {
          margin-top: 30px;
        }
        .steps {
          margin-top: 12px;
          display: grid;
          gap: 10px;
        }
        .steps div {
          display: grid;
          grid-template-columns: 34px 1fr;
          gap: 12px;
          align-items: center;
          padding: 11px 0;
          border-bottom: 1px solid var(--border-muted);
        }
        .steps b {
          color: var(--accent-authority);
          font-family: var(--font-mono);
          font-size: 10px;
        }
        .steps span {
          color: var(--text-secondary);
          font-size: 13px;
        }
        .briefing-card {
          margin-top: 28px;
          padding: 18px;
          border: 1px solid var(--border-muted);
          border-radius: 14px;
          background: rgba(255,255,255,0.018);
        }
        .briefing-card p {
          margin: 8px 0 10px;
          color: var(--text-secondary);
          font-size: 12px;
          line-height: 1.55;
        }
        .briefing-card a {
          color: var(--accent-authority);
          font-size: 12px;
          text-decoration: none;
        }
        .form-card {
          padding: clamp(24px, 4vw, 38px);
        }
        .waitlist-form {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }
        .form-heading h2 {
          margin: 8px 0 0;
          color: var(--text-primary);
          font-size: clamp(26px, 3vw, 36px);
          letter-spacing: -0.03em;
        }
        .form-heading p {
          margin: 10px 0 0;
          color: var(--text-secondary);
          font-size: 13px;
          line-height: 1.55;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }
        .form-group label,
        .engine-fieldset legend {
          color: var(--text-secondary);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
        }
        input,
        select,
        textarea {
          width: 100%;
          border: 1px solid var(--border-muted);
          border-radius: 10px;
          background: var(--bg-card);
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 14px;
          padding: 12px 14px;
          outline: none;
          transition: border-color 180ms ease, box-shadow 180ms ease, background 180ms ease;
        }
        select {
          appearance: none;
          -webkit-appearance: none;
        }
        select option {
          background: var(--bg-card);
          color: var(--text-primary);
        }
        textarea {
          resize: vertical;
        }
        input:focus,
        select:focus,
        textarea:focus {
          border-color: var(--accent-authority);
          background: var(--bg-elevated);
          box-shadow: 0 0 0 3px rgba(230, 211, 163, 0.08);
        }
        input::placeholder,
        textarea::placeholder {
          color: var(--text-muted);
        }
        .engine-fieldset {
          margin: 0;
          padding: 0;
          border: 0;
        }
        .engine-fieldset p {
          margin: 7px 0 12px;
          color: var(--text-muted);
          font-size: 11px;
        }
        .engine-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .engine-chip {
          border: 1px solid var(--border-muted);
          border-radius: 999px;
          background: rgba(255,255,255,0.02);
          color: var(--text-secondary);
          padding: 8px 11px;
          font: inherit;
          font-size: 11px;
          cursor: pointer;
          transition: border-color 160ms ease, background 160ms ease, color 160ms ease;
        }
        .engine-chip:hover {
          border-color: rgba(230, 211, 163, 0.36);
          color: var(--text-primary);
        }
        .engine-chip.active {
          border-color: rgba(230, 211, 163, 0.55);
          background: rgba(230, 211, 163, 0.1);
          color: var(--accent-authority);
        }
        .consent-row {
          display: grid;
          grid-template-columns: 16px 1fr;
          gap: 10px;
          align-items: start;
          color: var(--text-muted);
          font-size: 11px;
          line-height: 1.55;
          cursor: pointer;
        }
        .consent-row input {
          width: 14px;
          height: 14px;
          margin-top: 2px;
          accent-color: var(--accent-authority);
        }
        .form-error {
          margin: 0;
          color: #fca5a5;
          font-size: 12px;
        }
        .submit-btn {
          width: 100%;
          justify-content: center;
          padding: 14px 18px;
          font-size: 14px;
        }
        .submit-btn:disabled {
          opacity: 0.62;
          cursor: wait;
        }
        .form-footnote {
          margin: -8px 0 0;
          color: var(--text-disabled);
          font-size: 10px;
          line-height: 1.5;
          text-align: center;
        }
        .success-state {
          min-height: 560px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          gap: 14px;
        }
        .success-mark {
          display: grid;
          place-items: center;
          width: 58px;
          height: 58px;
          border-radius: 50%;
          border: 1px solid var(--accent-authority);
          background: rgba(230, 211, 163, 0.1);
          color: var(--accent-authority);
          font-size: 22px;
        }
        .success-state p {
          max-width: 460px;
          color: var(--text-secondary);
          font-size: 13px;
          line-height: 1.65;
        }
        .success-count {
          margin: 10px 0 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .success-count strong {
          color: var(--text-primary);
          font-family: var(--font-display);
          font-size: 54px;
          line-height: 1;
        }
        .success-count span {
          color: var(--text-muted);
          font-size: 11px;
        }
        @media (max-width: 980px) {
          .early-shell {
            grid-template-columns: 1fr;
          }
          .early-intro {
            position: static;
          }
        }
        @media (max-width: 640px) {
          .early-page {
            padding-top: calc(var(--nav-height) + 36px);
          }
          .form-row {
            grid-template-columns: 1fr;
          }
          .counter-card strong {
            font-size: 44px;
          }
        }
      `}</style>
    </main>
  );
}
