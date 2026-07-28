"use client";

import Contact from "@/components/Contact";

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/polynovea.in/" },
  { label: "X", href: "https://x.com/Polynovea" },
];

/** Contact section plus a slim end-of-journey footer strip. */
export default function ContactPane() {
  return (
    <div className="contact-pane">
      <Contact />

      <footer className="footer-strip">
        <span className="strip-copy">© {new Date().getFullYear()} Polynovea · Navi Mumbai, India</span>
        <nav className="strip-links" aria-label="Social links">
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          ))}
        </nav>
      </footer>

      <style jsx>{`
        .contact-pane {
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        /* Let the contact section flex to fill, so the footer strip always
           lands at the bottom of the viewport instead of overflowing the
           centred, overflow-hidden depth pane and getting clipped. */
        .contact-pane :global(.contact-section) {
          min-height: 0;
          flex: 1 1 auto;
        }

        .footer-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-lg);
          flex-wrap: wrap;
          max-width: var(--max-width);
          width: 100%;
          margin-inline: auto;
          padding: var(--space-md) var(--space-xl) var(--space-lg);
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .strip-copy {
          font-size: 12px;
          color: var(--text-disabled);
          letter-spacing: 0.02em;
        }

        .strip-links {
          display: flex;
          gap: var(--space-lg);
        }

        .strip-links a {
          font-size: 12px;
          color: var(--text-secondary);
          letter-spacing: 0.04em;
          transition: color var(--duration-fast) ease;
        }

        .strip-links a:hover {
          color: var(--accent-authority);
        }
      `}</style>
    </div>
  );
}
