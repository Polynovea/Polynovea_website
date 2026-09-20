"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What does Polynovea actually build?",
    a: "Polynovea builds commercial software, open infrastructure and a longer-horizon behavioural-intelligence research programme. Infrakinetic is the current commercial lead; the Content Operations Platform is moving toward an open-source release and managed cloud edition; Hospitality is under architectural rebuild; and HBIF is the research architecture connecting domain evidence to deeper behavioural questions.",
  },
  {
    q: "How do Polynovea's products relate to HBIF?",
    a: "Layer 1 is domain-specific: each domain requires its own product, ontology, state, workflows and validation. Layers 2 and 3 are shared research layers. Evidence from one domain can become a candidate for transfer, but it only moves across domains when testing supports that transfer - Polynovea does not assume universality in advance.",
  },
  {
    q: "Does using a Polynovea product automatically contribute data to HBIF research?",
    a: "No. Product access does not require surrendering unrestricted research rights. Research use must be separately permitted, purpose-bound and governed; customer operational data is not treated as unrestricted Polynovea research property.",
  },
  {
    q: "What is Infrakinetic?",
    a: "Infrakinetic is a Polynovea product and the current commercial lead. It connects the systems a company uses to sell, operate, hire, govern, bill, collect, account and serve customers into one business operating environment while preserving clear ownership across each function.",
  },
  {
    q: "What is the Content Operations Platform?",
    a: "It is Polynovea's upcoming open-source, self-hostable platform for structured data, content creation, collaboration, review, releases, delivery operations and governed developer/agent workflows. A managed Polynovea Cloud SaaS is planned alongside the OSS option; the platform should not be read as generally available until its public release is complete.",
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
