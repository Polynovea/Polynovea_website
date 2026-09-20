"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/projects", label: "Products" },
  { href: "/open-source", label: "Open Source" },
  { href: "/architecture", label: "Architecture" },
  { href: "/research", label: "Research" },
  { href: "/blog", label: "Insights" },
  { href: "/about", label: "Company" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`navbar${scrolled ? " scrolled" : ""}`} aria-label="Primary navigation">
        <div className="nav-inner">
          <Link href="/" className="nav-logo" aria-label="Polynovea home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/polynovea-nav-mark.png"
              alt=""
              width={38}
              height={38}
              className="nav-logo-img"
            />
            <span>Polynovea</span>
          </Link>

          <ul className="nav-links">
            {links.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`nav-link${active ? " active" : ""}`}
                    aria-current={active ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link href="/contact" className="nav-contact">
            Discuss deployment
          </Link>

          <button
            className={`hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-inner">
          <div className="mobile-label">Navigate Polynovea</div>
          <ul>
            {links.map((link, index) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <li key={link.href}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link href="/contact" className="mobile-contact" onClick={() => setMenuOpen(false)}>
            Discuss deployment <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          inset: 0 0 auto;
          z-index: 100;
          height: var(--nav-height);
          border-bottom: 1px solid transparent;
          background: linear-gradient(180deg, rgba(8, 8, 11, 0.72), rgba(8, 8, 11, 0));
          transition: background 220ms ease, border-color 220ms ease, backdrop-filter 220ms ease;
        }

        .navbar.scrolled {
          border-bottom-color: rgba(221, 216, 232, 0.09);
          background: rgba(8, 8, 11, 0.88);
          -webkit-backdrop-filter: blur(14px) saturate(115%);
          backdrop-filter: blur(14px) saturate(115%);
        }

        .nav-inner {
          width: min(100%, var(--max-width));
          height: 100%;
          margin-inline: auto;
          padding-inline: var(--space-xl);
          display: flex;
          align-items: center;
          gap: clamp(18px, 2.2vw, 30px);
        }

        :global(.nav-logo) {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          margin-right: auto;
          color: var(--text-primary);
          font-family: var(--font-display);
          font-size: 17px;
          font-weight: 580;
          letter-spacing: -0.02em;
          text-decoration: none;
        }

        .nav-logo-img {
          width: 38px;
          height: 38px;
          object-fit: contain;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: clamp(16px, 1.7vw, 24px);
          list-style: none;
        }

        :global(.nav-link) {
          position: relative;
          display: inline-flex;
          align-items: center;
          min-height: var(--nav-height);
          color: #98959f;
          font-size: 12px;
          font-weight: 560;
          letter-spacing: 0.015em;
          text-decoration: none;
          transition: color 180ms ease;
        }

        :global(.nav-link::after) {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: -1px;
          height: 1px;
          background: var(--accent-authority);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 180ms ease;
        }

        :global(.nav-link:hover),
        :global(.nav-link.active) {
          color: var(--text-primary);
        }

        :global(.nav-link.active::after) {
          transform: scaleX(1);
        }

        :global(.nav-contact) {
          display: inline-flex;
          align-items: center;
          min-height: 38px;
          padding: 0 15px;
          border: 1px solid rgba(230, 211, 163, 0.22);
          border-radius: 9px;
          color: var(--accent-authority);
          background: rgba(230, 211, 163, 0.035);
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
          transition: border-color 180ms ease, background 180ms ease, color 180ms ease;
        }

        :global(.nav-contact:hover) {
          border-color: rgba(230, 211, 163, 0.46);
          background: rgba(230, 211, 163, 0.07);
          color: var(--accent-authority-hover);
        }

        .hamburger {
          display: none;
          width: 42px;
          height: 42px;
          padding: 0 10px;
          border: 1px solid rgba(221, 216, 232, 0.10);
          border-radius: 9px;
          background: rgba(13, 14, 18, 0.68);
          cursor: pointer;
        }

        .hamburger span {
          display: block;
          width: 100%;
          height: 1px;
          background: var(--text-primary);
          transition: transform 180ms ease;
        }

        .hamburger span + span {
          margin-top: 7px;
        }

        .hamburger.open span:first-child {
          transform: translateY(4px) rotate(45deg);
        }

        .hamburger.open span:last-child {
          transform: translateY(-4px) rotate(-45deg);
        }

        .mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 90;
          display: none;
          background: rgba(8, 8, 11, 0.98);
          padding: calc(var(--nav-height) + 44px) var(--space-lg) 36px;
          overflow-y: auto;
        }

        .mobile-menu.open {
          display: block;
        }

        .mobile-menu-inner {
          width: min(100%, 620px);
          margin-inline: auto;
        }

        .mobile-label {
          color: var(--text-disabled);
          font-family: var(--font-mono);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          margin-bottom: 22px;
        }

        .mobile-menu ul {
          list-style: none;
          border-top: 1px solid rgba(221, 216, 232, 0.10);
        }

        .mobile-menu li {
          display: grid;
          grid-template-columns: 34px 1fr;
          align-items: center;
          border-bottom: 1px solid rgba(221, 216, 232, 0.10);
        }

        .mobile-menu li > span {
          color: var(--accent-authority-muted);
          font-family: var(--font-mono);
          font-size: 10px;
        }

        .mobile-menu li :global(a) {
          display: block;
          padding: 18px 0;
          color: var(--text-primary);
          font-family: var(--font-display);
          font-size: clamp(28px, 8vw, 42px);
          font-weight: 520;
          letter-spacing: -0.025em;
          text-decoration: none;
        }

        :global(.mobile-contact) {
          display: inline-flex;
          gap: 8px;
          margin-top: 30px;
          color: var(--accent-authority);
          font-size: 14px;
          text-decoration: none;
        }

        @media (max-width: 1080px) {
          .nav-links,
          :global(.nav-contact) {
            display: none;
          }

          .hamburger {
            display: block;
          }
        }
      `}</style>
    </>
  );
}
