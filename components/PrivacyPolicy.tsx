"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const lastUpdated = "2026-08-27";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main className="legal-main">
        <div className="container">
          <span className="legal-eyebrow">Legal</span>
          <h1 className="legal-heading">Privacy Policy</h1>
          <p className="legal-updated">
            Last updated:{" "}
            {new Date(lastUpdated).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          <div className="legal-prose">
            <p>
              This Privacy Policy explains how Polynovea (&quot;Polynovea,&quot;
              &quot;we,&quot; &quot;us&quot;) collects, uses, stores, shares,
              and protects personal data when you visit{" "}
              <Link href="/">polynovea.in</Link>
              {
                " or submit information through it. It is written to meet the notice requirements of India's Digital Personal Data Protection Act, 2023 (DPDPA), under which we act as a Data Fiduciary and you act as a Data Principal."
              }
            </p>

            <h2>Who we are</h2>
            <p>
              Polynovea is based in Navi Mumbai, Maharashtra, India. You can
              reach us at{" "}
              <a href="mailto:admin@polynovea.in">
                admin@polynovea.in
              </a>
              . Our designated Grievance Officer under the DPDPA is Subrojit
              Roy, reachable at the same address.
            </p>

            <h2>What personal data we collect</h2>
            <p>
              We collect three categories of personal data, for three different
              purposes:
            </p>

            <h3>1. Contact form submissions</h3>
            <p>
              When you submit the contact form, we collect your name, email
              address, your relationship to Polynovea, your area of interest,
              and your message. This is sent by email to our team using Gmail as
              the delivery service; it is not stored in a database on our side
              beyond that email.
            </p>

            <h3>2. Research survey responses</h3>
            <p>
              The research survey on this site collects your email address
              together with your answers to a set of behavioral and preference
              questions about entertainment and nightlife experiences. This is a
              separate, opt-in research initiative, not related to commercial
              lead generation, and your responses are stored in Airtable, a
              third-party database service, tied to a submission record that
              includes your email if you provide it.
            </p>

            <h3>3. Data collected automatically through analytics</h3>
            <p>
              We use Google Analytics (GA4) to understand how visitors use this
              site, including standard metrics (approximate location derived
              from IP address, device and browser type, pages visited) and
              custom engagement events on blog posts (scroll depth, time spent
              reading, view events), using cookies and similar identifiers. See{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google&apos;s Privacy Policy
              </a>{" "}
              for how Google itself processes this data.
            </p>

            <h2>Why we process it, and how long we keep it</h2>
            <p>
              Contact form submissions are processed to respond to your message
              and are retained for 12 months from submission.
            </p>
            <p>
              Research survey responses are processed for the specific
              behavioral-research initiative you participated in and are
              retained for the duration of that research project, after which
              identifying information (your email) is deleted while anonymized
              response data may be retained for analysis.
            </p>
            <p>
              Analytics data is processed to understand site usage and improve
              content and performance, retained according to our Google
              Analytics configuration.
            </p>

            <h2>Who we share it with</h2>
            <p>
              Contact form data is shared with Google (as our email provider)
              solely to deliver the message. Research survey data is shared with
              Airtable, which stores it on our behalf. We do not sell personal
              data, and we do not share it with any party outside Polynovea,
              Google, and Airtable for the purposes described above.
            </p>

            <h2>Your rights under the DPDPA</h2>
            <p>As a Data Principal, you have the right to:</p>
            <ul>
              <li>
                <strong>Access</strong> &mdash; request a copy of the personal
                data we hold about you.
              </li>
              <li>
                <strong>Correction</strong> &mdash; request that inaccurate or
                outdated data be corrected.
              </li>
              <li>
                <strong>Erasure</strong> &mdash; request that we delete your
                personal data, subject to any legal retention obligations.
              </li>
              <li>
                <strong>Grievance redressal</strong> &mdash; raise a complaint
                with our Grievance Officer if you believe your data has been
                mishandled, and escalate to the Data Protection Board of India
                if unresolved.
              </li>
              <li>
                <strong>Nomination</strong> &mdash; nominate another individual
                to exercise these rights on your behalf in the event of your
                death or incapacity.
              </li>
            </ul>
            <p>
              To exercise any of these rights, or to withdraw consent for us to
              process your data, email{" "}
              <a href="mailto:admin@polynovea.in">
                admin@polynovea.in
              </a>{" "}
              with the subject line &quot;Data request.&quot; Withdrawing
              consent does not affect the lawfulness of processing carried out
              before withdrawal.
            </p>

            <h2>Cookies</h2>
            <p>
              This site uses cookies set by Google Analytics to distinguish
              visitors and measure site usage. You can block or delete these
              cookies through your browser settings at any time; doing so will
              not affect your ability to browse the site, only our ability to
              measure your visit.
            </p>

            <h2>Changes to this policy</h2>
            <p>
              We may update this policy as our data practices change. Material
              changes will update the &quot;Last updated&quot; date above.
              Continued use of the site after a change constitutes acceptance of
              the updated policy.
            </p>

            <p className="legal-seealso">
              See also: <Link href="/terms">Terms of Use</Link>.
            </p>
          </div>
        </div>
      </main>
      <Footer />

      <style jsx>{`
        .legal-main {
          min-height: 100vh;
          padding-top: calc(var(--nav-height) + var(--space-3xl));
          padding-bottom: var(--space-5xl);
        }

        .legal-eyebrow {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent-authority);
        }

        .legal-heading {
          font-family: var(--font-display);
          font-weight: 600;
          letter-spacing: -0.02em;
          font-size: clamp(2rem, 5vw, 3rem);
          color: var(--text-primary);
          margin-top: var(--space-md);
          max-width: 760px;
        }

        .legal-updated {
          color: var(--text-disabled);
          font-size: 0.9375rem;
          margin-top: var(--space-md);
        }

        .legal-prose {
          margin-top: var(--space-2xl);
          max-width: 760px;
          color: var(--text-secondary);
          font-size: 1rem;
          line-height: 1.8;
        }

        .legal-prose h2 {
          font-family: var(--font-display);
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--text-primary);
          font-size: 1.375rem;
          margin-top: var(--space-2xl);
          margin-bottom: var(--space-md);
        }

        .legal-prose h3 {
          color: var(--text-primary);
          font-size: 1.0625rem;
          font-weight: 600;
          margin-top: var(--space-xl);
          margin-bottom: var(--space-sm);
        }

        .legal-prose p {
          margin-bottom: var(--space-md);
        }

        .legal-prose ul {
          margin: var(--space-md) 0;
          padding-left: var(--space-lg);
        }

        .legal-prose li {
          margin-bottom: var(--space-sm);
        }

        .legal-prose a {
          color: var(--accent-authority);
          text-decoration: underline;
          text-decoration-color: rgba(230, 211, 163, 0.4);
          text-underline-offset: 3px;
        }

        .legal-prose a:hover {
          color: var(--accent-authority-hover);
        }

        .legal-prose strong {
          color: var(--text-primary);
          font-weight: 600;
        }

        .legal-seealso {
          margin-top: var(--space-2xl);
          font-size: 0.875rem;
          color: var(--text-disabled);
        }
      `}</style>
    </>
  );
}
