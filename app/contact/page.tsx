"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CONTACT_EMAIL = "subrojitroy@polynovea.in";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const who = formData.get("who") as string;
    const interest = formData.get("interest") as string;
    const message = formData.get("message") as string;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          who,
          interest,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please email us directly at " + CONTACT_EMAIL
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="contact-page">
        <div className="container">
          <div className="contact-inner">
            <div className="contact-copy" data-reveal>
              <span className="t-label">Contact</span>
              <h1 className="t-display-md" style={{ marginTop: "var(--space-md)" }}>
                Let&apos;s understand your
                <br />
                <span className="gradient-text">operating environment.</span>
              </h1>
              <p className="t-body" style={{ marginTop: "var(--space-md)" }}>
                Tell us what you&apos;re trying to evaluate - Infrakinetic, the upcoming Content Operations Platform, a research collaboration, or a broader partnership - and we&apos;ll route it to the right part of the team.
              </p>
              <div className="contact-tags">
                {["Infrakinetic", "Open Source / CMS", "HBIF Research", "Partnerships"].map((tag) => (
                  <span key={tag} className="contact-tag">{tag}</span>
                ))}
              </div>
              <div className="direct-email">
                <p>Or reach us directly:</p>
                <p style={{ color: "var(--accent-intelligence)", margin: 0 }}>{CONTACT_EMAIL}</p>
              </div>
            </div>

            <div className="contact-form-wrap card" data-reveal data-reveal-delay="120">
              {submitted ? (
                <div className="form-success">
                  <div className="success-icon">✓</div>
                  <h3 className="t-heading">Message received.</h3>
                  <p className="t-body">
                    We read every submission. If there&apos;s a fit, you&apos;ll hear from
                    us within 48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="name">Name</label>
                      <input className="form-input" type="text" id="name" name="name" placeholder="Your name" autoComplete="name" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="email">Email</label>
                      <input className="form-input" type="email" id="email" name="email" placeholder="your@email.com" autoComplete="email" required />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="who">I am a</label>
                    <select className="form-select" id="who" name="who" required defaultValue="">
                      <option value="" disabled>Select who you are</option>
                      <option value="venue">Venue / Institution</option>
                      <option value="business">Business / Workplace</option>
                      <option value="brand">Brand / Organisation</option>
                      <option value="partner">Potential Partner</option>
                      <option value="other">Something else</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="interest">I&apos;m interested in</label>
                    <select className="form-select" id="interest" name="interest" required defaultValue="">
                      <option value="" disabled>Select what you&apos;re looking for</option>
                      <optgroup label="Products">
                        <option value="infrakinetic">Infrakinetic product evaluation</option>
                        <option value="cms">Content Operations Platform / OSS</option>
                        <option value="hospitality">Hospitality product / domain enquiry</option>
                      </optgroup>
                      <optgroup label="Research & Company">
                        <option value="research">HBIF research or academic collaboration</option>
                        <option value="research-partner">Research-partner programme enquiry</option>
                        <option value="partnership">Partnership or collaboration</option>
                        <option value="learn">Learning more about Polynovea</option>
                        <option value="other">Something else</option>
                      </optgroup>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="message">Tell us more</label>
                    <textarea className="form-textarea" id="message" name="message" placeholder="What are you working on? What problem are you trying to solve?" required rows={4} />
                  </div>

                  {error && <p className="form-error">{error}</p>}

                  <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
                    {loading ? "Sending..." : "Contact Us →"}
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="contact-faq" data-reveal>
            <h2 className="t-display-sm contact-faq-title">Frequently asked questions</h2>
            <p className="contact-faq-updated">Last updated: September 19, 2026</p>
            <div className="contact-faq-list">
              {[
                {
                  q: "How long does Polynovea take to reply?",
                  a: "Polynovea reads every submission and evaluates fit based on what you're building. If there's a match, you'll hear back within 48 hours - no automated sequences, no discovery-call theatre.",
                },
                {
                  q: "Does Polynovea only work with hospitality venues?",
                  a: "No. Infrakinetic is the current commercial lead; Polynovea is also preparing the Content Operations Platform for open-source distribution, rebuilding its Hospitality product, and running the HBIF research programme.",
                },
                {
                  q: "Is there a cost to reach out?",
                  a: "No. Sending a message costs nothing. Polynovea evaluates fit before any engagement begins and will tell you directly whether there's a match - no obligation either way.",
                },
                {
                  q: "What should I include in my message?",
                  a: "Tell Polynovea what you're evaluating, the problem or collaboration you have in mind, and any constraints that matter. Product, research and partnership enquiries are routed differently, so context helps the team respond directly.",
                },
                {
                  q: "What happens after I request an Infrakinetic product evaluation?",
                  a: "The team reviews what you've shared about your current systems and operating problem, then replies directly with whether Infrakinetic is a fit and what a product review or deployment discussion would look like next.",
                },
              ].map(({ q, a }) => (
                <div key={q} className="contact-faq-item">
                  <h3 className="contact-faq-q">{q}</h3>
                  <p className="contact-faq-a">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <style jsx>{`
        .contact-page {
          background: rgba(9, 8, 16, 0.62); /* veil over the global neural scene */
          min-height: 100vh;
          padding-top: calc(var(--nav-height) + var(--space-2xl));
          padding-bottom: var(--space-4xl);
        }
        .contact-inner {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: var(--space-3xl);
          align-items: start;
        }
        .contact-tags {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-sm);
          margin-top: var(--space-xl);
        }
        .contact-tag {
          font-size: 12px;
          font-weight: 500;
          color: var(--text-secondary);
          padding: 5px 12px;
          border: 1px solid var(--border-muted);
          border-radius: var(--radius-pill);
        }
        .direct-email {
          margin-top: var(--space-xl);
        }
        .direct-email p {
          color: var(--text-muted);
          font-size: 13px;
          margin-bottom: var(--space-xs);
        }
        .direct-email a {
          color: var(--accent-intelligence);
          font-size: 14px;
          text-decoration: none;
        }
        .direct-email a:hover { opacity: 0.8; }
        .contact-form-wrap { padding: var(--space-xl); }
        .contact-form { display: flex; flex-direction: column; gap: var(--space-lg); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); }
        .form-group { display: flex; flex-direction: column; gap: var(--space-xs); }
        .form-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-secondary);
        }
        .form-input, .form-select, .form-textarea {
          background: var(--bg-card);
          border: 1px solid var(--border-muted);
          border-radius: 10px;
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 14px;
          padding: 0.75rem 1rem;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          outline: none;
          width: 100%;
          appearance: none;
          -webkit-appearance: none;
        }
        .form-input:focus, .form-select:focus, .form-textarea:focus {
          border-color: var(--accent-intelligence);
          background: var(--bg-elevated);
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.18);
        }
        .form-input::placeholder, .form-textarea::placeholder { color: var(--text-muted); }
        .form-select option { background: var(--bg-card); color: var(--text-primary); }
        .form-textarea { resize: vertical; min-height: 100px; }
        .form-error { color: #fca5a5; font-size: 13px; }
        .submit-btn { width: 100%; justify-content: center; padding: 14px; font-size: 15px; }
        .form-success {
          text-align: center;
          padding: var(--space-2xl) var(--space-xl);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-md);
        }
        .success-icon {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(124,58,237,0.15);
          border: 1px solid var(--accent-intelligence);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          color: var(--accent-intelligence);
        }
        .contact-faq {
          margin-top: var(--space-4xl);
          padding-top: var(--space-3xl);
          border-top: 1px solid var(--border-muted);
        }
        .contact-faq-title {
          margin-bottom: var(--space-xs);
        }
        .contact-faq-updated {
          font-size: 12px;
          color: var(--text-disabled);
          font-family: var(--font-mono, monospace);
          letter-spacing: 0.06em;
          margin: 0 0 var(--space-xl);
        }
        .contact-faq-list {
          display: grid;
          gap: var(--space-lg);
          max-width: 760px;
        }
        .contact-faq-item {
          border-left: 2px solid rgba(124, 58, 237, 0.35);
          padding-left: var(--space-md);
        }
        .contact-faq-q {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 6px;
        }
        .contact-faq-a {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.65;
          margin: 0;
        }
        @media (max-width: 900px) { .contact-inner { grid-template-columns: 1fr; } }
        @media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}
