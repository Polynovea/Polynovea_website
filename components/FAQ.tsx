"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What exactly is a behavioral intelligence operation?",
    a: "A closed-loop system that observes how humans make decisions, extracts the underlying patterns, and converts them into repeatable frameworks - then deploys those frameworks as products, optimisations, or client engagements. The goal is to reduce blind decision-making inside systems that should be measurable.",
  },
  {
    q: "How does Polynovea's intelligence scale across domains?",
    a: "Each domain gets its own purpose-built product - Infrakinetic, the Workplace domain's product, is Polynovea's current lead product for commercialisation and revenue; Hospitality's Acquisition System is undergoing an architectural rebuild. Underneath every domain's product sits a deeper, shared layer of the infrastructure that gets sharper the more domains it operates across - every new product starts smarter because of the ones before it.",
  },
  {
    q: "Are you available for external projects or clients?",
    a: "Selectively. We engage with venues, institutions, and organisations where the work generates intelligence that compounds our system. We do not take on engagements that don't fit that model. Use the contact form to start a conversation - we'll tell you directly whether there's a match.",
  },
  {
    q: "What happens after I reach out?",
    a: "We read every submission. We evaluate fit based on what you're building, what problem you're trying to solve, and whether the engagement compounds the system for both sides. If there's a match, you'll hear from us within 48 hours. No pitch decks, no discovery theatre - just a direct answer.",
  },
  {
    q: "How do I know if Polynovea is relevant to what I'm building?",
    a: "If you're operating a venue, running a business, or managing a workforce - and decisions are being made on intuition rather than structured intelligence - we're likely relevant. The ecosystem exists precisely to address that gap. Send us a message and we'll tell you directly.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className={`faq-item${open ? " open" : ""}`}>
      <button className="faq-question" onClick={handleToggle} aria-expanded={open}>
        <h3 className="faq-question-text">{q}</h3>
        <span className="faq-icon">{open ? "−" : "+"}</span>
      </button>
      <div className={`faq-answer-wrap${open ? " open" : ""}`}>
        <div className="faq-answer-inner">
          <p className="faq-answer">{a}</p>
        </div>
      </div>

      <style jsx>{`
        .faq-item {
          background: rgba(24, 24, 27, 0.35);
          backdrop-filter: blur(24px) saturate(120%);
          -webkit-backdrop-filter: blur(24px) saturate(120%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-md);
          overflow: hidden;
          transition: all var(--duration-default) var(--ease-state);
        }
        .faq-item.open { 
          border-color: var(--accent-authority) !important; 
          background: rgba(24, 24, 27, 0.45);
          box-shadow: 0 4px 20px rgba(230, 211, 163, 0.1);
        }
        .faq-item:hover:not(.open) {
          border-color: rgba(255, 255, 255, 0.15);
          background: rgba(24, 24, 27, 0.4);
        }
        .faq-question {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-md);
          padding: var(--space-md) var(--space-lg);
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          outline: none;
        }
        .faq-question-text {
          margin: 0;
          font-size: 15px;
          font-weight: 500;
          color: var(--text-primary);
          font-family: var(--font-body);
          line-height: 1.4;
        }
        .faq-icon {
          color: var(--accent-authority);
          font-size: 20px;
          font-weight: 700;
          flex-shrink: 0;
          line-height: 1;
          transition: transform var(--duration-fast) ease;
        }
        .faq-item.open .faq-icon {
          transform: rotate(180deg);
        }
        .faq-answer-wrap {
          display: grid;
          grid-template-rows: 0fr;
          overflow: hidden;
          transition: grid-template-rows 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .faq-answer-wrap.open {
          grid-template-rows: 1fr;
        }
        .faq-answer-inner {
          min-height: 0;
        }
        .faq-answer {
          margin: 0 var(--space-lg) var(--space-md);
          padding-top: var(--space-md);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.65;
        }
      `}</style>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="section faq-section">
      <div className="container">
        <div className="faq-header" data-reveal>
          <span className="t-label" style={{ color: "var(--accent-authority-muted)" }}>
            FAQ
          </span>
          <h2 className="t-display-md" style={{ marginTop: "var(--space-md)", color: "var(--text-primary)" }}>
            Common questions,{" "}
            <span className="gold-accent">direct answers.</span>
          </h2>
        </div>

        <div className="faq-list" data-reveal data-reveal-delay="100">
          {faqs.map((item) => (
            <FAQItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .faq-section { background: rgba(18, 18, 18, 0.5); }
        .faq-header { text-align: center; margin-bottom: var(--space-2xl); }
        .gold-accent {
          color: var(--accent-authority);
          font-weight: inherit;
        }
        .faq-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
          max-width: 840px;
          margin-inline: auto;
        }
      `}</style>
    </section>
  );
}
