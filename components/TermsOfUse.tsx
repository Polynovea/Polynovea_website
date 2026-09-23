"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const lastUpdated = "2026-08-27";

export default function TermsOfUse() {
  return (
    <>
      <Navbar />
      <main className="legal-main">
        <div className="container">
          <span className="legal-eyebrow">Legal</span>
          <h1 className="legal-heading">Terms of Use</h1>
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
              These Terms of Use govern your access to and use of{" "}
              <Link href="/">polynovea.in</Link> (the &quot;Site&quot;),
              operated by Polynovea (&quot;Polynovea,&quot; &quot;we,&quot;
              &quot;us&quot;). By using the Site, you agree to these terms. If
              you do not agree, do not use the Site.
            </p>

            <h2>What this Site is</h2>
            <p>
              The Site is an informational resource describing Polynovea and its
              products, including the Infrakinetic business operating system, a
              blog covering behavioral intelligence and decision-infrastructure
              topics, and an opt-in behavioral research survey. The Site does
              not itself provide access to any Polynovea product; product access
              is governed by a separate commercial agreement entered into
              directly with customers.
            </p>

            <h2>The research survey</h2>
            <p>
              Participation in the research survey on this Site is voluntary. By
              submitting responses, you consent to Polynovea using your
              anonymized responses for research and product-development
              purposes. You may request that your identifying information be
              deleted at any time; see our{" "}
              <Link href="/privacy">Privacy Policy</Link>
              {" for how that data is handled."}
            </p>

            <h2>Intellectual property</h2>
            <p>
              All content on the Site, text, graphics, logos, product names,
              blog articles, and the underlying code, is owned by Polynovea or
              its licensors and protected by applicable intellectual property
              law. You may view and share content from the Site for
              non-commercial, informational purposes, including linking to and
              quoting blog articles with attribution. You may not reproduce,
              redistribute, modify, or create derivative works from Site content
              for commercial purposes without our written permission.
            </p>

            <h2>Acceptable use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>
                Use the Site in a way that violates any applicable law or
                regulation.
              </li>
              <li>
                Attempt to gain unauthorized access to the Site, its underlying
                systems, or any account or data not belonging to you.
              </li>
              <li>
                Interfere with or disrupt the Site&apos;s operation, including
                through automated scraping at a rate that degrades service for
                other users.
              </li>
              <li>
                Submit false, misleading, or fraudulent information through any
                form on the Site, including the contact form or research survey.
              </li>
            </ul>

            <h2>Third-party links and services</h2>
            <p>
              The Site may link to third-party websites or use third-party
              services (including Google for contact-form delivery and
              analytics, and Airtable for research-survey storage, described in
              our <Link href="/privacy">Privacy Policy</Link>). We are not
              responsible for the content, accuracy, or practices of third-party
              sites or services we do not control.
            </p>

            <h2>Disclaimers</h2>
            <p>
              The Site and its content, including blog articles and any
              statements about behavioral-intelligence research or product
              capabilities, are provided &quot;as is&quot; without warranties of
              any kind, express or implied, including accuracy, completeness, or
              fitness for a particular purpose.
            </p>

            <h2>Limitation of liability</h2>
            <p>
              To the maximum extent permitted by applicable law, Polynovea is
              not liable for any indirect, incidental, or consequential damages
              arising from your use of the Site. Nothing in this section limits
              liability that cannot be excluded under applicable Indian law.
            </p>

            <h2>Governing law</h2>
            <p>
              These Terms are governed by the laws of India. Any dispute arising
              from these Terms or your use of the Site is subject to the
              exclusive jurisdiction of the courts of Mumbai, Maharashtra.
            </p>

            <h2>Changes to these Terms</h2>
            <p>
              We may update these Terms as the Site changes. Material changes
              will update the &quot;Last updated&quot; date above. Continued use
              of the Site after a change constitutes acceptance of the updated
              Terms.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about these Terms can be sent to{" "}
              <a href="mailto:admin@polynovea.in">
                admin@polynovea.in
              </a>
              .
            </p>

            <p className="legal-seealso">
              See also: <Link href="/privacy">Privacy Policy</Link>.
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
