"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { depthState, REVEAL_OPEN_EVENT } from "@/lib/depthStore";

const homeLinks = [
  { href: "/", label: "Home" },
  { href: "/architecture", label: "Platform" },
  { href: "/projects", label: "Products" },
  { href: "/blog", label: "Insights" },
  { href: "/about", label: "Company" },
  { href: "/research", label: "Research" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Assemble the navbar into place: on the home page this is held until the
  // curtain parts (REVEAL_OPEN_EVENT); on subpages it plays as the scene eases in.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const isHome = window.location.pathname === "/";
    let played = false;

    const play = () => {
      if (played) return;
      played = true;
      import("gsap").then(({ gsap }) => {
        const q = gsap.utils.selector(nav);
        const tl = gsap.timeline();
        tl.fromTo(
          nav,
          { opacity: 0, y: -18 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
        );
        tl.fromTo(
          q(".nav-logo, .nav-link, .nav-cta"),
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power2.out" },
          "-=0.4"
        );
      });
    };

    if (depthState.revealOpen || !isHome) {
      play();
    } else {
      window.addEventListener(REVEAL_OPEN_EVENT, play, { once: true });
    }
    const fallback = setTimeout(play, isHome ? 5200 : 600);
    return () => {
      window.removeEventListener(REVEAL_OPEN_EVENT, play);
      clearTimeout(fallback);
    };
  }, []);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    setMenuOpen(false);
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav ref={navRef} className={`navbar${scrolled ? " scrolled" : ""}`} aria-label="Primary navigation">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Polynovea logo"
              width={36}
              height={36}
              className="nav-logo-img"
            />
            Polynovea
          </Link>

          <ul className="nav-links">
            {homeLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="nav-link"
                  onClick={(e) => handleAnchorClick(e, l.href)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/contact"
            className="btn btn-primary nav-cta"
            onClick={(e) => handleAnchorClick(e, "/contact")}
          >
            Discuss Deployment
          </Link>

          <button
            className={`hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <ul>
          {homeLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={(e) => handleAnchorClick(e, l.href)}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              className="btn btn-primary"
              onClick={(e) => handleAnchorClick(e, "/contact")}
            >
              Discuss Deployment
            </Link>
          </li>
        </ul>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          height: var(--nav-height);
        }

        .navbar::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background-color: transparent;
          opacity: 0;
          transition: opacity var(--duration-default) var(--ease-state);
        }

        .navbar::after {
          content: "";
          position: absolute;
          z-index: -2;
          inset: 0;
          -webkit-backdrop-filter: blur(0px);
          backdrop-filter: blur(0px);
          -webkit-filter: url(#container-glass);
          filter: url(#container-glass);
          background-color: rgba(24, 24, 27, 0.35);
          opacity: 0;
          transition: opacity var(--duration-default) var(--ease-state);
        }

        .navbar.scrolled::before,
        .navbar.scrolled::after {
          opacity: 1;
        }

        .nav-inner {
          max-width: var(--max-width);
          margin-inline: auto;
          padding-inline: var(--space-xl);
          height: 100%;
          display: flex;
          align-items: center;
          gap: var(--space-xl);
        }

        .nav-logo {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          margin-right: auto;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .nav-logo :global(.nav-logo-img) {
          border-radius: 8px;
          flex-shrink: 0;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: var(--space-lg);
          list-style: none;
        }

        .nav-link {
          font-size: 14px;
          color: var(--text-secondary);
          transition: color var(--duration-fast) var(--ease-state);
        }

        .nav-link:hover {
          color: var(--text-primary);
        }

        .nav-cta {
          font-size: 13px;
          padding: 9px 20px;
        }

        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }

        .hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: var(--text-primary);
          border-radius: 2px;
          transition: all var(--duration-default) var(--ease-state);
        }

        .hamburger.open span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }

        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        .mobile-menu {
          display: none;
          position: fixed;
          inset: 0;
          z-index: 99;
          background: var(--bg-primary);
          padding: calc(var(--nav-height) + var(--space-xl)) var(--space-xl)
            var(--space-xl);
          flex-direction: column;
        }

        .mobile-menu.open {
          display: flex;
        }

        .mobile-menu ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
        }

        .mobile-menu a {
          font-family: var(--font-display);
          font-size: 28px;
          font-weight: 500;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        @media (max-width: 768px) {
          .nav-links,
          .nav-cta {
            display: none;
          }

          .hamburger {
            display: flex;
          }
        }
      `}</style>
    </>
  );
}
