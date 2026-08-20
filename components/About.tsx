"use client";

import React from 'react';
import Link from 'next/link';

export default function About() {

  return (
    <section className="about-section">
      {/* Hero rides on the global neural scene */}
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-heading">Measurement Changes Everything</h1>
          <p className="hero-subheading">Most systems operate without behavioral intelligence. Polynovea built the infrastructure layer that changes that.</p>
          <p className="hero-byline">By Polynovea Intelligence Team · Founded April 2026 · Navi Mumbai, India · Updated July 28, 2026</p>
        </div>
      </div>

      {/* FOUNDER THESIS */}
      <div className="container">
        <div className="thesis-section">
          <div className="thesis-card">
            <div className="card-number">01</div>
            <h3>The Real Problem</h3>
            <p>Important decisions across industries are made blindly inside systems that should be measurable. Weak measurement creates weak decisions, wasted resources, and repeated mistakes.</p>
          </div>

          <div className="thesis-card">
            <div className="card-number">02</div>
            <h3>The Insight</h3>
            <p>Behavior is not random. Human systems contain patterns, incentives, triggers, and repeatable structures. Most organizations never build infrastructure to capture and optimize them.</p>
          </div>

          <div className="thesis-card">
            <div className="card-number">03</div>
            <h3>The Approach</h3>
            <p>Observe → Measure → Identify Patterns → Design Intervention → Execute → Measure Again → Scale. Skip one step and you return to guessing.</p>
          </div>

          <div className="thesis-card">
            <div className="card-number">04</div>
            <h3>The Goal</h3>
            <p>Build behavioral intelligence infrastructure capable of improving execution quality, pattern recognition, and decision-making across layered ecosystems.</p>
          </div>
        </div>

        {/* THE ECOSYSTEM */}
        <div className="ecosystem-section">
          <h2 className="section-title">How is the Polynovea behavioral intelligence ecosystem structured?</h2>
          <p className="section-subtitle">Domain, product, intelligence - three tiers, each domain building its own version of the first two, all of them sharpening one thing underneath.</p>

          <div className="milestones-grid">
            <div className="milestone">
              <div className="milestone-header">
                <span className="milestone-number">1</span>
                <h3>Domain Product</h3>
              </div>
              <p>Every domain HBIF enters gets its own purpose-built product - not a reconfiguration of an existing one. Infrakinetic, the Workplace domain&apos;s product, is Polynovea&apos;s current lead product for commercialisation and revenue, with 121/121 Billing + Payments tests passing and a canary migration that promoted 626/626 staged records with 12/12 reconciliation checks passed (Source: Infrakinetic Product Guide, Aug 2026). Hospitality&apos;s Acquisition System is undergoing an architectural rebuild.</p>
              <ul>
                <li>Decision Framework</li>
                <li>Acquisition layer</li>
                <li>Optimisation layer</li>
              </ul>
            </div>

            <div className="milestone">
              <div className="milestone-header">
                <span className="milestone-number">2</span>
                <h3>Shared Intelligence</h3>
              </div>
              <p>Underneath every domain&apos;s product sits a deeper layer of the infrastructure - one that reads behavioral state and decision-making directly, independent of industry.</p>
              <ul>
                <li>Domain-agnostic by design</li>
                <li>Shared across every product</li>
                <li>Gets sharper with each domain</li>
              </ul>
            </div>

            <div className="milestone">
              <div className="milestone-header">
                <span className="milestone-number">3</span>
                <h3>The Flywheel</h3>
              </div>
              <p>Operating a domain&apos;s product generates the behavioral data that sharpens the shared intelligence layer - which makes every other domain&apos;s product smarter from day one.</p>
              <ul>
                <li>Data compounds across domains</li>
                <li>Each new product starts ahead</li>
                <li>The moat deepens with scale</li>
              </ul>
            </div>
          </div>
        </div>

        {/* WHY WE EXIST */}
        <div className="why-exists-section">
          <h2 className="section-title">Why did Polynovea build behavioral intelligence infrastructure?</h2>
          <p className="section-subtitle">Important decisions across industries are made blindly inside systems that should be measurable. Behavioral intelligence infrastructure fixes that by converting observed human behavior into repeatable operational systems.</p>
          <div className="why-exists-content">
            <div className="why-block">
              <h3>The Pattern We Noticed</h3>
              <p>Important decisions across industries are made blindly inside systems that should be measurable. The problem isn&apos;t weak activity - it&apos;s weak measurement. Weak measurement creates weak decisions, wasted resources, and repeated mistakes.</p>
            </div>
            <div className="why-block">
              <h3>The Core Insight</h3>
              <p>Behavior is not random. Human systems contain patterns, incentives, triggers, environmental responses, and repeatable structures. Most organizations never build the infrastructure required to capture, structure, interpret, and operationalize those patterns. This exposes blindness where clarity should exist.</p>
            </div>
            <div className="why-block">
              <h3>What Hospitality taught us</h3>
              <p>Hospitality became our first proving ground because behavioral response becomes visible quickly, spend decisions happen in real time, and feedback loops close fast. That work produced data, engineering, and intervention history we carry forward into its architectural rebuild - while Infrakinetic, the Workplace domain&apos;s product, now carries the model into commercialisation as Polynovea&apos;s current lead product for revenue.</p>
            </div>
            <div className="why-block">
              <h3>The Long-Term Purpose</h3>
              <p>The ecosystem exists to build behavioral intelligence and operational decision systems capable of improving execution quality, pattern recognition, and strategic decision-making across every domain we operate in. Each domain&apos;s product matters on its own - but underneath all of them is the same foundational pursuit: understanding behavior well enough to build systems that become more intelligent over time.</p>
            </div>
          </div>
        </div>

        {/* CORE PHILOSOPHY */}
        <div className="philosophy-section">
          <h2 className="section-title">What principles guide Polynovea&apos;s behavioral intelligence approach?</h2>
          <p className="section-subtitle">Six operating principles that govern how Polynovea observes, measures, and converts human behavior into compounding intelligence infrastructure.</p>
          <div className="philosophy-grid">
            <div className="phil-item">
              <h4>Measurement First</h4>
              <p>If behavior cannot be measured, it cannot be reliably optimized. This applies to everything from audience response to venue behavior to retention and engagement.</p>
            </div>
            <div className="phil-item">
              <h4>Systems Over Intuition</h4>
              <p>Creativity becomes more powerful when patterns are visible, feedback loops are active, variables are isolated, and outcomes are measurable. We don&apos;t reject creativity - we reject unmeasured execution.</p>
            </div>
            <div className="phil-item">
              <h4>Baseline Before Intervention</h4>
              <p>No optimization occurs before observing reality. Understanding the current state is the prerequisite for any meaningful change. Intervention without baseline is guessing.</p>
            </div>
            <div className="phil-item">
              <h4>Pattern Before Scaling</h4>
              <p>One good result is not a pattern. Repeatable data precedes growth. We scale what works repeatedly, not what works once.</p>
            </div>
            <div className="phil-item">
              <h4>Responsible Intelligence</h4>
              <p>Understand behavior responsibly. Reduce friction intelligently. Improve experiences intentionally. Create alignment between customer, operator, and business. The goal is better systems and clearer decisions, not exploitation.</p>
            </div>
            <div className="phil-item">
              <h4>Infrastructure Over Personality</h4>
              <p>Build systems that scale without founder dependency. Operational intelligence should be repeatable, documented, and transferable. Long-term value comes from infrastructure, not individual intuition.</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="faq-section">
          <h2 className="section-title" style={{ textAlign: 'left', fontSize: '32px' }}>Frequently asked questions about Polynovea</h2>
          <div className="faq-list">
            {[
              {
                q: "What is behavioral intelligence?",
                a: "Behavioral intelligence is the systematic process of observing human decision-making patterns in real commercial environments, extracting repeatable structures, and converting those structures into operational systems. Unlike survey data or stated preferences, it works from what people actually do.",
              },
              {
                q: "What does Polynovea do?",
                a: "Polynovea is a deep-tech AI, behavioral-intelligence and decision-infrastructure company building the Human Behavioral Intelligence Framework (HBIF) - infrastructure that observes human decision-making, identifies repeatable behavioral patterns, and converts them into operational systems. Each domain we enter gets its own purpose-built product. Infrakinetic (Workplace) is the current lead product for commercialisation; Hospitality is undergoing an architectural rebuild; Education is in design.",
              },
              {
                q: "What is the Human Behavioral Intelligence Framework (HBIF)?",
                a: "HBIF is domain, product, and shared intelligence. Every domain gets its own product - Infrakinetic for Workplace, the Acquisition System for Hospitality (currently being rebuilt). Underneath every domain's product sits a deeper, shared layer of the infrastructure that reads behavioral state and decision-making directly, independent of industry - and gets sharper with every domain it operates across.",
              },
              {
                q: "Where is Polynovea based and when was it founded?",
                a: "Polynovea was founded in April 2026 by Subrojit Roy and is based in Navi Mumbai, Maharashtra, India.",
              },
              {
                q: "What industries does Polynovea's behavioral intelligence serve?",
                a: "Infrakinetic, the Workplace domain's product, is Polynovea's current lead product for commercialisation and revenue. Hospitality's Acquisition System is undergoing an architectural rebuild. Education is in the design phase.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="faq-item">
                <h3 className="faq-q">{q}</h3>
                <p className="faq-a">{a}</p>
              </div>
            ))}
          </div>
          <div className="faq-links">
            <Link href="/architecture">Explore the system architecture</Link>
            <Link href="/projects">View active behavioral intelligence projects</Link>
            <a href="/#contact">Contact the team</a>
          </div>
        </div>

        {/* CTA */}
        <div className="about-cta">
          <a href="/architecture" className="btn btn-primary">
            Explore Architecture
          </a>
        </div>
      </div>

      <style jsx>{`
        .about-section {
          position: relative;
          background: rgba(9, 8, 16, 0.62); /* veil over the global neural scene */
          min-height: 100vh;
          /* room for the fade-out so content never sits on the seam */
          padding-bottom: 200px;
        }

        /* Ramp the translucent veil down into the opaque footer colour so the
           neural scene resolves into the footer instead of cutting off. */
        .about-section::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 360px;
          background: linear-gradient(
            to bottom,
            rgba(18, 18, 18, 0) 0%,
            rgba(18, 18, 18, 0.7) 55%,
            var(--bg-secondary) 100%
          );
          pointer-events: none;
          z-index: 0;
        }

        .hero-container {
          position: relative;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-bottom: 1px solid var(--border-muted);
        }

        .hero-content {
          position: relative;
          z-index: 10;
          text-align: center;
          max-width: 900px;
          padding: 0 40px;
        }

        .hero-heading {
          font-size: 64px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 20px;
          line-height: 1.1;
        }

        .hero-subheading {
          font-size: 20px;
          color: var(--text-secondary);
          font-weight: 300;
        }

        .hero-byline {
          font-size: 12px;
          color: var(--text-disabled);
          margin-top: 12px;
          font-family: var(--font-mono, monospace);
          letter-spacing: 0.06em;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
        }

        /* THESIS */
        .thesis-section {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
          margin: 120px 0;
        }

        .thesis-card {
          background: rgba(24, 24, 27, 0.25);
          border: 1px solid rgba(124, 58, 237, 0.2);
          border-radius: 12px;
          padding: 40px;
          backdrop-filter: blur(32px);
          -webkit-backdrop-filter: blur(32px);
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.08), 0 4px 24px rgba(0, 0, 0, 0.4);
          transition: border-color var(--duration-default) var(--ease-state),
                      box-shadow var(--duration-default) var(--ease-state),
                      transform var(--duration-default) var(--ease-state);
        }

        .thesis-card:hover {
          border-color: rgba(124, 58, 237, 0.45);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6),
                      inset 0 1px 1px rgba(255, 255, 255, 0.15),
                      0 0 32px rgba(124, 58, 237, 0.15);
          transform: translateY(-2px);
        }

        .card-number {
          font-size: 48px;
          font-weight: 700;
          color: var(--accent-authority);
          opacity: 0.3;
          margin-bottom: 20px;
        }

        .thesis-card h3 {
          font-size: 24px;
          color: var(--text-primary);
          margin-bottom: 15px;
        }

        .thesis-card p {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* ECOSYSTEM */
        .ecosystem-section {
          margin: 140px 0;
        }

        .section-title {
          font-size: 48px;
          font-weight: 700;
          color: var(--text-primary);
          text-align: center;
          margin-bottom: 15px;
        }

        .section-subtitle {
          text-align: center;
          color: var(--text-secondary);
          font-size: 18px;
          margin-bottom: 60px;
        }

        .milestones-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          margin-bottom: 60px;
        }

        .milestone {
          background: linear-gradient(135deg, rgba(24, 24, 27, 0.25) 0%, rgba(24, 24, 27, 0.1) 100%);
          border: 1px solid rgba(124, 58, 237, 0.2);
          border-radius: 12px;
          padding: 40px;
          backdrop-filter: blur(32px);
          -webkit-backdrop-filter: blur(32px);
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.08), 0 4px 24px rgba(0, 0, 0, 0.4);
          transition: border-color var(--duration-default) var(--ease-state),
                      box-shadow var(--duration-default) var(--ease-state),
                      transform var(--duration-default) var(--ease-state);
        }

        .milestone:hover {
          border-color: rgba(124, 58, 237, 0.45);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6),
                      inset 0 1px 1px rgba(255, 255, 255, 0.15),
                      0 0 32px rgba(124, 58, 237, 0.15);
          transform: translateY(-2px);
        }

        .milestone-number {
          font-size: 56px;
          font-weight: 700;
          color: var(--accent-authority);
          opacity: 0.4;
          display: block;
          line-height: 1;
        }

        .milestone-header {
          margin-bottom: 25px;
        }

        .milestone-header h3 {
          font-size: 24px;
          color: var(--text-primary);
          margin-top: 10px;
        }

        .milestone p {
          color: var(--text-secondary);
          font-size: 15px;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .milestone ul {
          list-style: none;
          padding: 0;
        }

        .milestone li {
          color: var(--text-secondary);
          font-size: 14px;
          padding: 8px 0;
          padding-left: 20px;
          position: relative;
        }

        .milestone li:before {
          content: '→';
          position: absolute;
          left: 0;
          color: var(--accent-intelligence);
        }

        /* WHY WE EXIST */
        .why-exists-section {
          margin: 140px 0;
        }

        .why-exists-content {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 40px;
          margin-top: 60px;
        }

        .why-block {
          background: rgba(24, 24, 27, 0.25);
          border: 1px solid rgba(124, 58, 237, 0.2);
          border-radius: 12px;
          padding: 30px;
          backdrop-filter: blur(32px);
          -webkit-backdrop-filter: blur(32px);
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.08), 0 4px 24px rgba(0, 0, 0, 0.4);
          transition: border-color var(--duration-default) var(--ease-state),
                      box-shadow var(--duration-default) var(--ease-state),
                      transform var(--duration-default) var(--ease-state);
        }

        .why-block:hover {
          border-color: rgba(124, 58, 237, 0.45);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6),
                      inset 0 1px 1px rgba(255, 255, 255, 0.15),
                      0 0 32px rgba(124, 58, 237, 0.15);
          transform: translateY(-2px);
        }

        .why-block h3 {
          font-size: 20px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 15px;
        }

        .why-block p {
          color: var(--text-secondary);
          line-height: 1.7;
          font-size: 15px;
        }

        /* PHILOSOPHY */
        .philosophy-section {
          margin: 140px 0;
        }

        .philosophy-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 50px;
        }

        .phil-item {
          background: rgba(24, 24, 27, 0.25);
          border: 1px solid rgba(124, 58, 237, 0.2);
          border-radius: 12px;
          padding: 32px 24px;
          text-align: center;
          backdrop-filter: blur(32px);
          -webkit-backdrop-filter: blur(32px);
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.08), 0 4px 20px rgba(0, 0, 0, 0.4);
          transition: border-color var(--duration-default) var(--ease-state),
                      box-shadow var(--duration-default) var(--ease-state),
                      transform var(--duration-default) var(--ease-state);
        }

        .phil-item:hover {
          border-color: rgba(124, 58, 237, 0.45);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.6),
                      inset 0 1px 1px rgba(255, 255, 255, 0.15),
                      0 0 24px rgba(124, 58, 237, 0.1);
          transform: translateY(-2px);
        }

        .phil-item h4 {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 12px;
        }

        .phil-item p {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .faq-section {
          margin: 140px 0 80px;
        }

        .faq-list {
          display: grid;
          gap: 24px;
          margin: 40px 0 32px;
        }

        .faq-item {
          border-left: 2px solid rgba(124, 58, 237, 0.4);
          padding-left: 24px;
        }

        .faq-q {
          font-size: 17px;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 10px;
          line-height: 1.4;
        }

        .faq-a {
          font-size: 15px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin: 0;
        }

        .faq-links {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          padding-top: 24px;
          border-top: 1px solid rgba(124, 58, 237, 0.15);
        }

        .faq-links a {
          font-size: 14px;
          font-weight: 500;
          color: rgba(124, 58, 237, 0.9);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .faq-links a:hover {
          color: var(--accent-authority, #e6d3a3);
        }

        .about-cta {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: center;
          margin: 100px 0 0;
        }

        @media (max-width: 768px) {
          .hero-heading {
            font-size: 40px;
          }

          .thesis-section,
          .milestones-grid {
            grid-template-columns: 1fr;
          }

          .philosophy-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .why-exists-content {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
