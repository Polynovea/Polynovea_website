"use client";

import { useState } from "react";
import Link from "next/link";

type SurfaceKey = "hospitality" | "music" | "education" | "workplace";

// ─── Intelligence pipeline ────────────────────────────────────────────────────
const pipelineSteps = [
  "Commercial Environment",
  "Human Behaviour",
  "Behavioural Signals",
  "Decision Framework",
  "Acquisition System",
  "Behavioural Intelligence",
  "Optimisation System",
  "Recommendations",
  "Observed Outcomes",
  "Continuous Learning",
];

// ─── HBIF modules ─────────────────────────────────────────────────────────────
const modules = [
  {
    key: "decision-framework",
    num: "01",
    title: "Decision Framework",
    purpose: "Defines what should be measured before data collection begins.",
    what: "The Decision Framework establishes the behavioral objectives of each operating environment. Before signals are extracted or scores are calculated, this module defines what behavior matters, what evidence is required, and how success will be measured. It prevents the most common failure mode in analytics: collecting data without knowing what it should explain.",
    how: [
      "Define behavioral objectives for each operating environment",
      "Establish evidence requirements and data collection strategy",
      "Set measurement baselines before any optimisation begins",
      "Define decision criteria that downstream modules will act on",
    ],
    output: "Behavioural objectives, KPIs, measurement baseline, decision criteria.",
  },
  {
    key: "acquisition-system",
    num: "02",
    title: "Acquisition System",
    purpose: "Extracts behavioral signals from multiple sources and models them into venue intelligence.",
    what: "Traditional review analytics classify opinions. The Acquisition System explains behaviours. It processes Google Reviews, field observation, POS signals, and audience data — not to score sentiment, but to extract the behavioral mechanisms that explain why people visit, what creates friction, what they tolerate, and what occasions drive their decisions. These signals are structured through an ontology layer and scored across six fitness dimensions using Bayesian inference.",
    how: [
      "Google Reviews behavioral pipeline: 11,063 venues behaviourally analysed across Mumbai — each review run through the HBIF extraction layer, not classified, fingerprinted",
      "Extracts Stimuli (what drew someone in), Frictions (what created resistance), Compensations (what people tolerate despite friction), and Emotional context (the occasion driving the visit)",
      "Multi-source signal unification: reviews, field observation, POS data, audience flow — structured through an ontology layer",
      "Bayesian venue scoring across six fitness dimensions: social dwell, group energy, retention strength, operational quality, and more",
      "8-phase field execution framework converting intelligence into a live acquisition playbook per venue",
    ],
    output: "Behavioural fingerprints, behavioural similarity maps, audience archetypes, behavioural fitness scores, opportunity mapping, commercial intelligence, acquisition playbooks.",
  },
  {
    key: "optimisation-system",
    num: "03",
    title: "Optimisation System",
    purpose: "The learning engine: converts behavioral intelligence into recommendations and improves the model over time.",
    what: "The Optimisation System closes the intelligence loop. It instruments live operating environments — capturing POS data, audience flow, dwell time, and behavioral responses to interventions — and converts that intelligence into measurable operational recommendations. As outcomes are observed and fed back into the model, the system continuously improves its predictions and the quality of its recommendations.",
    how: [
      "Instrument live environments: POS, audience flow, dwell time, spend pattern tracking",
      "Detect behavioral patterns and correlate them with operational variables",
      "Evaluate intervention outcomes against predicted behavioral impact",
      "Generate prioritised recommendations and improvement actions",
      "Feed observed outcomes back into the behavioral model for continuous learning",
    ],
    output: "Recommendations, interventions, predicted impact, outcome measurements, and continuously improving behavioral models.",
  },
];

// ─── Deployment surfaces ──────────────────────────────────────────────────────
const surfaces: Record<SurfaceKey, { label: string; status: "live" | "in development"; examples: string[] }> = {
  hospitality: {
    label: "Hospitality Intelligence",
    status: "live",
    examples: [
      "13,492 venues indexed across the Mumbai Metro Region. 11,063 behaviourally analysed through a multi-source blend pipeline — quality-filtered by behavioral relevance, not by category.",
      "54 behavioral primitives extracted per review — not sentiment scores. Primitives span 12 categories: culinary, pricing, service, ambience, social, behavioral, emotional, and use-case. Negation-aware, contradiction-tracked, confidence-scored per review via a 6-component formula including temporal decay, corroboration saturation, and explicit vs. implied evidence weighting.",
      "7 customer segments modelled per venue with full revenue economics: RevPASH ranges from ₹180/hr (Office Workers at lunch) to ₹1,800/hr (Premium Diners). 11 audience archetypes with spend trigger scripts, peer influence coefficients, occasion multipliers, and diminishing-returns timing. Grounded in peer-reviewed behavioral economics research on F&B consumer psychology.",
      "5 fitness dimensions scored per venue: Office Lunch, Repeat Habit, Social Dwell, Group Energy, Destination Visit — each a 0–1 behavioral fit score computed from signal match ratios, not a category label. Behavioral competitor mapping uses cosine similarity on 54-dimension signal vectors, not geographic radius or price tier.",
      "Intervention playbooks generated per venue with priority tiers (HIGH / MEDIUM / CANDIDATE): dwell monetisation (long-stay venues not converting to multi-round orders), premium justification, friction reduction, operational optimisation — each with revenue impact estimates and narrative output readable by venue operators.",
      "Intelligence surfaces for venue operators: Behavioral Health Score (0–100), 5-dimension fitness radar, audience composition with RevPASH by segment, behavioral competitor map with similarity buckets, repositioning roadmap with target-gap scoring, channel-specific marketing briefs per segment, and a venue-specific AI chat running on the complete behavioral data as its knowledge base.",
    ],
  },
  music: {
    label: "Music & Live Events",
    status: "live",
    examples: [
      "Audience behavioral intelligence applied to live event environments and artist–audience relationships.",
      "Behavioral signals from live events feed artist development decisions via Polynovea Records.",
      "Audience intelligence from releases feeds back into creative and IP decisions.",
      "Cappella: behavioral software product operating within the music context.",
    ],
  },
  education: {
    label: "Education Intelligence",
    status: "in development",
    examples: [
      "Learning behavior mapping: how students engage, retain, and respond across different formats.",
      "Institutional intelligence: pattern extraction from academic and training environments.",
      "Intervention design: behavioral models informing curriculum and engagement structure.",
      "Outcome measurement: validating intelligence loops against educational outcomes.",
    ],
  },
  workplace: {
    label: "Workplace Intelligence",
    status: "in development",
    examples: [
      "Organisational behavior mapping: how teams make decisions under pressure and at scale.",
      "Performance intelligence: patterns from work environments correlated against outcomes.",
      "Culture measurement: converting observed behaviour into quantifiable cultural signals.",
      "Intervention design: behavioral models informing organisational structure and systems.",
    ],
  },
};

// ─── Canonical definitions ────────────────────────────────────────────────────
const definitions = [
  {
    term: "What is a Behavioral Signal?",
    def: "A behavioral signal is a measurable indicator of human decision-making extracted from a real commercial environment. Unlike a data point, which records what happened, a behavioral signal captures why it happened — the mechanisms, motivations, and context driving a specific action.",
  },
  {
    term: "What is a Behavioral Fingerprint?",
    def: "A behavioral fingerprint is the unique pattern of behavioral signals that characterises a specific environment, venue, or audience segment. It describes the decision-making mechanisms at work — what attracts, what repels, what compensates, and what occasions drive behavior in that context.",
  },
  {
    term: "What is Behavioral Similarity?",
    def: "Behavioral similarity is a measurement of how closely two environments share the same underlying behavioral mechanisms, independent of their category or surface characteristics. Two venues may appear different yet share identical behavioral patterns for a specific audience archetype.",
  },
  {
    term: "What is Behavioral Fitness?",
    def: "Behavioral fitness is a scored measure of how well a specific environment is positioned to attract, retain, and monetise a particular audience archetype. It is calculated from behavioral signal data across multiple fitness dimensions and updated continuously as new signals are collected.",
  },
];

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "What is Behavioral Intelligence?",
    a: "Behavioral Intelligence is the systematic observation, modelling, and interpretation of human decision-making to generate actionable operational intelligence. It differs from conventional analytics by explaining the mechanisms behind decisions — not just recording their outcomes.",
  },
  {
    q: "What is Behavioral Intelligence Infrastructure?",
    a: "Behavioral Intelligence Infrastructure is the underlying technical and operational system that continuously collects behavioral signals, models them into intelligence, generates recommendations, and improves its models as new outcomes are observed. HBIF — the Human Behavioral Intelligence Framework — is Polynovea's implementation of this infrastructure.",
  },
  {
    q: "What is HBIF?",
    a: "HBIF — the Human Behavioral Intelligence Framework — is Polynovea's behavioral intelligence infrastructure. It comprises three modules: the Decision Framework (defining what to measure), the Acquisition System (extracting and modelling behavioral signals), and the Optimisation System (generating recommendations and learning from outcomes). It is domain-agnostic — the same framework deploys across hospitality, music, education, and workplace environments.",
  },
  {
    q: "How is Behavioral Intelligence different from Sentiment Analysis?",
    a: "Sentiment analysis classifies opinions as positive or negative. Behavioral Intelligence extracts the mechanisms behind those opinions: what drew someone in (Stimuli), what created resistance (Frictions), what they tolerate despite friction (Compensations), and what occasion drove the visit (Emotional context). The output is not a sentiment score — it is a behavioral fingerprint that explains decision-making and enables prediction.",
  },
  {
    q: "How is Behavioral Intelligence different from Business Intelligence?",
    a: "Business Intelligence reports what happened using historical metrics, dashboards, and aggregated data. Behavioral Intelligence explains why it happened by modelling the decision-making mechanisms that produced those outcomes. BI tells you revenue dropped; Behavioral Intelligence tells you which behavioral friction caused it and what intervention would address it.",
  },
  {
    q: "What is a Behavioral Fingerprint?",
    a: "A behavioral fingerprint is the unique pattern of behavioral signals that characterises a specific environment or audience segment. It captures what attracts, what repels, what compensates, and what occasions drive behavior — enabling comparison across environments without requiring identical categories or contexts.",
  },
  {
    q: "What is Behavioral Fitness?",
    a: "Behavioral fitness is a scored measure of how well an environment is positioned to attract, retain, and monetise a particular audience archetype. It is calculated from behavioral signal data across multiple fitness dimensions and updated continuously as new signals are collected.",
  },
  {
    q: "What industries can HBIF be applied to?",
    a: "HBIF is domain-agnostic. The same framework currently deploys in Hospitality and Music & Live Events. Education and Workplace are in development. The infrastructure does not require a rebuild per domain — behavioral signal extraction, modelling, and optimisation follow the same pipeline regardless of industry.",
  },
  {
    q: "How does HBIF learn and improve over time?",
    a: "HBIF operates a continuous feedback loop: behavioral signals are extracted, modelled into intelligence, used to generate recommendations and interventions, and the outcomes of those interventions are observed and fed back into the model. Each cycle improves the accuracy of the behavioral models and the quality of recommendations.",
  },
  {
    q: "Why is HBIF domain agnostic?",
    a: "Human decision-making follows universal mechanisms — attraction, friction, compensation, and context — regardless of industry. The HBIF models these mechanisms rather than industry-specific metrics. Once the framework understands how behavioral signals map to operational outcomes in one domain, the same logic applies to any other commercial environment.",
  },
];

// ─── ModuleCard ───────────────────────────────────────────────────────────────
function ModuleCard({
  mod,
  expanded,
  onToggle,
}: {
  mod: (typeof modules)[number];
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`mod-card${expanded ? " open" : ""}`}>
      <button type="button" aria-expanded={expanded} onClick={onToggle} className="mod-btn">
        <span className="mod-num">{mod.num}</span>
        <span className="mod-title">{mod.title}</span>
        <span className="mod-purpose">{mod.purpose}</span>
        <span className="mod-chevron" aria-hidden="true">{expanded ? "−" : "+"}</span>
      </button>
      <div className="mod-body">
        <div className="mod-inner">
          <p className="mod-what">{mod.what}</p>
          <ul className="mod-how">
            {mod.how.map((line) => <li key={line}>{line}</li>)}
          </ul>
          <div className="mod-output">
            <span className="mod-output-label">Outputs</span>
            {mod.output}
          </div>
        </div>
      </div>
      <style jsx>{`
        .mod-card {
          border: 1px solid rgba(124, 58, 237, 0.22);
          border-radius: var(--radius-sm, 8px);
          overflow: hidden;
          transition: border-color 0.22s ease;
        }
        .mod-card.open { border-color: rgba(124, 58, 237, 0.55); }
        .mod-btn {
          width: 100%;
          display: grid;
          grid-template-columns: 48px 1fr auto 32px;
          gap: var(--space-md, 16px);
          align-items: center;
          padding: var(--space-lg, 24px);
          background: transparent;
          border: 0;
          cursor: pointer;
          text-align: left;
          transition: background 0.2s ease;
        }
        .mod-card.open .mod-btn { background: rgba(124, 58, 237, 0.06); }
        .mod-num {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          color: var(--accent-authority, #e6d3a3);
          opacity: 0.7;
        }
        .mod-title {
          font-size: 17px;
          font-weight: 700;
          color: var(--text-primary, #fff);
          letter-spacing: -0.01em;
        }
        .mod-purpose {
          font-size: 13px;
          color: var(--text-secondary, #aaa);
          line-height: 1.45;
          padding-right: var(--space-md, 16px);
        }
        .mod-chevron {
          font-size: 22px;
          color: var(--accent-intelligence, #7c3aed);
          font-weight: 300;
          line-height: 1;
          text-align: center;
        }
        .mod-body {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.28s ease;
        }
        .mod-card.open .mod-body { grid-template-rows: 1fr; }
        .mod-inner {
          min-height: 0;
          overflow: hidden;
          padding: 0 var(--space-lg, 24px);
          border-top: 1px solid transparent;
          transition: border-color 0.2s ease;
        }
        .mod-card.open .mod-inner {
          padding-bottom: var(--space-xl, 32px);
          border-top-color: rgba(124, 58, 237, 0.18);
        }
        .mod-what {
          font-size: 15px;
          color: var(--text-secondary, #aaa);
          line-height: 1.75;
          margin: var(--space-lg, 24px) 0 var(--space-md, 16px);
          max-width: 800px;
        }
        .mod-how {
          list-style: none;
          padding: 0;
          margin: 0 0 var(--space-lg, 24px);
          display: grid;
          gap: var(--space-sm, 8px);
        }
        .mod-how li {
          position: relative;
          padding-left: 20px;
          font-size: 14px;
          color: var(--text-secondary, #aaa);
          line-height: 1.6;
        }
        .mod-how li::before {
          content: "→";
          position: absolute;
          left: 0;
          top: 2px;
          color: var(--accent-intelligence, #7c3aed);
          font-size: 11px;
        }
        .mod-output {
          border-top: 1px solid rgba(124, 58, 237, 0.18);
          padding-top: var(--space-md, 16px);
          font-family: var(--font-mono, monospace);
          font-size: 12px;
          color: var(--text-secondary, #aaa);
          line-height: 1.6;
          letter-spacing: 0.02em;
        }
        .mod-output-label {
          display: block;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--accent-authority-muted, rgba(230,211,163,0.6));
          margin-bottom: 6px;
        }
        @media (max-width: 768px) {
          .mod-btn { grid-template-columns: 40px 1fr 28px; }
          .mod-purpose { display: none; }
        }
      `}</style>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ArchitectureDeepDive() {
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [selectedSurface, setSelectedSurface] = useState<SurfaceKey>("hospitality");
  const surface = surfaces[selectedSurface];

  return (
    <main className="arch-page">

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="arch-hero">
        <div className="container hero-body">
          <span className="hero-eyebrow" data-reveal>
            The Human Behavioral Intelligence Framework
          </span>
          <h1 className="hero-title" data-reveal data-reveal-delay="100">
            Behavioral Intelligence<br />
            <span className="gold">Infrastructure.</span>
          </h1>
          <p className="hero-desc" data-reveal data-reveal-delay="200">
            How Polynovea observes, models, and improves human decision-making across commercial environments through the Human Behavioral Intelligence Framework (HBIF).
          </p>
          <div className="hero-meta" data-reveal data-reveal-delay="260">
            <span>By Polynovea Intelligence Team</span>
            <span aria-hidden="true">·</span>
            <span>3 intelligence modules</span>
            <span aria-hidden="true">·</span>
            <span>2 live domains</span>
            <span aria-hidden="true">·</span>
            <time dateTime="2026-06-27">Updated June 27, 2026</time>
          </div>
          <div className="hero-actions" data-reveal data-reveal-delay="320">
            <a href="#hbif-modules" className="btn btn-primary">Explore the Architecture</a>
            <Link href="/research" className="btn btn-secondary">View Research</Link>
          </div>
        </div>
        <div className="hero-fade" aria-hidden="true" />
      </section>

      {/* ── Section 1: What is Behavioral Intelligence? ─────────────── */}
      <section className="section" id="what-is-behavioral-intelligence">
        <div className="container">
          <div className="sec-head" data-reveal>
            <span className="sec-label">Definition</span>
            <h2 className="t-display-md">What is Behavioral Intelligence?</h2>
          </div>
          <div className="definition-block" data-reveal>
            <p className="definition-lead">
              <strong>Behavioral Intelligence</strong> is the systematic observation, modelling, and interpretation of human decision-making to generate actionable operational intelligence.
            </p>
            <p className="definition-body">
              It differs from conventional analytics by explaining the <em>mechanisms behind decisions</em> — not just recording their outcomes. Where a standard analytics system tells you that revenue dropped by 12%, a behavioral intelligence system explains which specific friction in the customer experience caused it, which audience segment was affected, and what intervention would address it.
            </p>
            <p className="definition-body">
              Behavioral intelligence treats human environments as systems with observable, repeatable patterns. The goal is not to collect more data — it is to extract the right signals, model them accurately, and convert them into decisions that improve over time.
            </p>
          </div>
          <div className="three-col" data-reveal>
            <div className="three-col-item">
              <h3>What it is</h3>
              <p>The systematic extraction of behavioral signals from human environments, structured into models that explain decision-making and generate operational recommendations.</p>
            </div>
            <div className="three-col-item">
              <h3>Why it matters</h3>
              <p>Most commercial decisions are made without understanding the behavioral mechanisms driving customer behavior. Behavioral intelligence replaces assumption with evidence.</p>
            </div>
            <div className="three-col-item">
              <h3>How it differs from analytics</h3>
              <p>Analytics reports outcomes. Behavioral intelligence explains decisions. Analytics shows what happened. Behavioral intelligence shows why — and predicts what will happen next.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 1.5: What is Behavioral Intelligence Infrastructure? ─ */}
      <section className="section section-alt" id="behavioral-intelligence-infrastructure">
        <div className="container">
          <div className="sec-head" data-reveal>
            <span className="sec-label">Infrastructure</span>
            <h2 className="t-display-md">What is Behavioral Intelligence Infrastructure?</h2>
            <p className="sec-answer">
              Behavioral Intelligence is the discipline. Behavioral Intelligence Infrastructure operationalises that discipline. The Human Behavioral Intelligence Framework (HBIF) is Polynovea&apos;s implementation of that infrastructure.
            </p>
            <p className="sec-answer" style={{ marginTop: "var(--space-md, 16px)" }}>
              Infrastructure is not a dashboard or a reporting tool. It is the full operational stack — from behavioral observation through signal extraction, modelling, decision support, continuous learning, and feedback — that makes Behavioral Intelligence scalable and self-improving.
            </p>
          </div>

          <div className="hier-diagram" data-reveal>
            <div className="hier-tier">
              <span className="hier-label">Behavioral Intelligence</span>
              <span className="hier-sub">The discipline — systematic observation and interpretation of human decision-making</span>
            </div>
            <div className="hier-arrow" aria-hidden="true">↓</div>
            <div className="hier-tier hier-tier-mid">
              <span className="hier-label">Behavioral Intelligence Infrastructure</span>
              <span className="hier-sub">The technical and operational system that operationalises the discipline at scale</span>
            </div>
            <div className="hier-arrow" aria-hidden="true">↓</div>
            <div className="hier-tier hier-tier-hbif">
              <span className="hier-label">Human Behavioral Intelligence Framework (HBIF)</span>
              <span className="hier-sub">Polynovea&apos;s implementation of Behavioral Intelligence Infrastructure</span>
            </div>
            <div className="hier-arrow" aria-hidden="true">↓</div>
            <div className="hier-domains-row">
              {["Hospitality", "Music & Live Events", "Education", "Workplace"].map((d) => (
                <span key={d} className="hier-domain">{d}</span>
              ))}
            </div>
          </div>

          <div className="infra-grid" data-reveal>
            {[
              { label: "Behavioral Observation", desc: "Systematic collection of behavioral signals from commercial environments at scale — across sources, geographies, and time." },
              { label: "Signal Extraction", desc: "Processing raw behavioral data into structured, standardised signal objects with confidence scores, inference types, and contradiction tracking." },
              { label: "Behavioral Modelling", desc: "Building and continuously updating models that explain the mechanisms driving human behavior across different operating environments." },
              { label: "Decision Support", desc: "Converting behavioral models into prioritised, actionable recommendations that operators can deploy without data expertise." },
              { label: "Continuous Learning", desc: "Feeding observed outcomes back into the behavioral model — each intervention cycle improves the accuracy of subsequent recommendations." },
              { label: "Feedback Loops", desc: "Closing the gap between prediction and outcome so the infrastructure compounds its intelligence the longer it operates." },
            ].map(({ label, desc }) => (
              <div key={label} className="infra-item">
                <strong className="infra-label">{label}</strong>
                <p className="infra-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 1.6: Why Behavioral Intelligence? ────────────────── */}
      <section className="section" id="why-behavioral-intelligence">
        <div className="container">
          <div className="sec-head" data-reveal>
            <span className="sec-label">Context</span>
            <h2 className="t-display-md">Why Behavioral Intelligence?</h2>
            <p className="sec-answer">
              Commercial intelligence has evolved in successive layers. Each generation solved the problems of the previous one — and exposed a new limitation.
            </p>
          </div>
          <div className="evolution-flow" data-reveal>
            {[
              { era: "Business Intelligence", desc: "Reports what happened using historical metrics and dashboards. Cannot explain why." },
              { era: "Customer Analytics", desc: "Segments customers by attribute. Cannot model the mechanisms driving their decisions." },
              { era: "Machine Learning", desc: "Predicts patterns from historical data. Cannot explain the behavioral mechanisms that produced those patterns." },
              { era: "Behavioral Intelligence", desc: "Explains the mechanisms behind decisions. Predicts behavior from first principles. Generates operational recommendations. Improves continuously.", current: true },
            ].map(({ era, desc, current }) => (
              <div key={era} className={`evo-item${current ? " evo-current" : ""}`}>
                <strong className="evo-era">{era}</strong>
                <p className="evo-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 1.7: Where Behavioral Intelligence Applies ────────── */}
      <section className="section section-alt" id="behavioral-intelligence-applications">
        <div className="container">
          <div className="sec-head" data-reveal>
            <span className="sec-label">Applications</span>
            <h2 className="t-display-md">Where Behavioral Intelligence can be applied.</h2>
            <p className="sec-answer">
              HBIF is domain-agnostic because it models human decision-making rather than industry-specific metrics. The behavioral mechanisms that drive commercial decisions — attraction, friction, compensation, context — operate the same way regardless of industry.
            </p>
          </div>
          <div className="apps-grid" data-reveal>
            {[
              { domain: "Hospitality", status: "live" },
              { domain: "Music & Live Events", status: "live" },
              { domain: "Education", status: "in development" },
              { domain: "Workplace", status: "in development" },
              { domain: "Retail", status: "future" },
              { domain: "Healthcare", status: "future" },
              { domain: "Financial Services", status: "future" },
              { domain: "Sports", status: "future" },
            ].map(({ domain, status }) => (
              <div key={domain} className="app-item">
                <span className="app-domain">{domain}</span>
                <span className={`app-status app-status-${status.replace(/\s/g, "-")}`}>
                  {status === "live" ? "Live" : status === "in development" ? "In development" : "Future"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 2: Why Existing Analytics Are Limited ───────────── */}
      <section className="section section-alt" id="analytics-comparison">
        <div className="container">
          <div className="sec-head" data-reveal>
            <span className="sec-label">Comparison</span>
            <h2 className="t-display-md">Why existing analytics are limited.</h2>
            <p className="sec-answer">
              Business Intelligence, customer analytics, and review sentiment analysis all operate on outcomes — what customers said, what they rated, what they bought. They cannot explain the behavioral mechanisms that produced those outcomes. Behavioral Intelligence can.
            </p>
          </div>
          <div className="table-wrap" data-reveal>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Capability</th>
                  <th>Traditional Analytics</th>
                  <th>Review Sentiment Analysis</th>
                  <th className="col-hi">Behavioral Intelligence</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Primary question</td>
                  <td>What happened?</td>
                  <td>How do customers feel?</td>
                  <td className="col-hi">Why did customers behave this way?</td>
                </tr>
                <tr>
                  <td>Output</td>
                  <td>Reports outcomes</td>
                  <td>Positive / negative score</td>
                  <td className="col-hi">Explains decisions</td>
                </tr>
                <tr>
                  <td>Review data</td>
                  <td>Aggregated ratings</td>
                  <td>Opinion classification</td>
                  <td className="col-hi">Behavioural mechanisms</td>
                </tr>
                <tr>
                  <td>Time orientation</td>
                  <td>Historical metrics</td>
                  <td>Current sentiment</td>
                  <td className="col-hi">Predictive behavioural models</td>
                </tr>
                <tr>
                  <td>Scope</td>
                  <td>Individual metrics</td>
                  <td>Individual feedback</td>
                  <td className="col-hi">Cross-customer behavioural patterns</td>
                </tr>
                <tr>
                  <td>Actionability</td>
                  <td>Dashboards</td>
                  <td>Sentiment alerts</td>
                  <td className="col-hi">Operational recommendations</td>
                </tr>
                <tr>
                  <td>Improves over time</td>
                  <td>No</td>
                  <td>No</td>
                  <td className="col-hi">Yes — continuous learning loop</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Section 3: How Behavioral Intelligence Works ────────────── */}
      <section className="section" id="how-it-works">
        <div className="container">
          <div className="sec-head" data-reveal>
            <span className="sec-label">The Intelligence Pipeline</span>
            <h2 className="t-display-md">How Behavioral Intelligence works.</h2>
            <p className="sec-answer">
              The HBIF intelligence pipeline transforms raw human behavior into operational recommendations through a continuous sequence of observation, modelling, intervention, and learning. Each step feeds the next.
            </p>
          </div>
          <div className="pipeline" data-reveal>
            {pipelineSteps.map((step, i) => (
              <div key={step} className="pipeline-step">
                <span className="pipeline-num">{String(i + 1).padStart(2, "0")}</span>
                <strong className="pipeline-label">{step}</strong>
                {i < pipelineSteps.length - 1 && <i className="pipeline-arrow" aria-hidden="true" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: HBIF Modules ─────────────────────────────────── */}
      <section className="section section-alt" id="hbif-modules">
        <div className="container">
          <div className="sec-head" data-reveal>
            <span className="sec-label">The Human Behavioral Intelligence Framework</span>
            <h2 className="t-display-md">The HBIF intelligence modules.</h2>
            <p className="sec-answer">
              HBIF comprises three sequential modules. Each takes the output of the previous as its input, creating a pipeline that converts raw behavioral signals into operational intelligence and continuously improves its models over time.
            </p>
          </div>
          <div className="modules-list" data-reveal>
            {modules.map((mod) => (
              <ModuleCard
                key={mod.key}
                mod={mod}
                expanded={expandedModule === mod.key}
                onToggle={() => setExpandedModule(expandedModule === mod.key ? null : mod.key)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5: Intelligence Feedback Loop ───────────────────── */}
      <section className="section" id="feedback-loop">
        <div className="container">
          <div className="sec-head" data-reveal>
            <span className="sec-label">Continuous Learning</span>
            <h2 className="t-display-md">The intelligence feedback loop.</h2>
            <p className="sec-answer">
              HBIF is not a static analytics system. It continuously improves its behavioral models as new signals are collected and new outcomes are observed. Each intervention generates data that makes the next recommendation more accurate.
            </p>
          </div>
          <div className="loop-grid" data-reveal>
            {[
              { step: "01", label: "Observe", desc: "Collect behavioral signals from commercial environments." },
              { step: "02", label: "Extract", desc: "Run signals through the HBIF extraction layer to produce structured behavioral data." },
              { step: "03", label: "Model", desc: "Build and update behavioral models: fingerprints, similarity maps, fitness scores." },
              { step: "04", label: "Predict", desc: "Generate predictions about future behavior and opportunity mapping." },
              { step: "05", label: "Intervene", desc: "Deploy acquisition playbooks, optimisation recommendations, and operational changes." },
              { step: "06", label: "Measure", desc: "Observe outcomes against predicted behavioral impact." },
              { step: "07", label: "Learn", desc: "Feed observed outcomes back into the behavioral model to improve accuracy." },
              { step: "08", label: "Observe", desc: "The loop continues — each cycle improves every subsequent cycle." },
            ].map(({ step, label, desc }) => (
              <div key={step} className="loop-item">
                <span className="loop-num">{step}</span>
                <strong className="loop-label">{label}</strong>
                <p className="loop-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 6: Current Deployments ──────────────────────────── */}
      <section className="section section-alt" id="deployments">
        <div className="container">
          <div className="sec-head" data-reveal>
            <span className="sec-label">Deployments</span>
            <h2 className="t-display-md">Where the HBIF currently operates.</h2>
            <p className="sec-answer">
              The same behavioral intelligence infrastructure deploys across domains without a rebuild. Hospitality and Music & Live Events are live. Education and Workplace are in development.
            </p>
          </div>
          <div className="stats-row" data-reveal>
            {[
              { num: "13,492", label: "venues indexed" },
              { num: "11,063", label: "behaviourally analysed venues" },
              { num: "3", label: "intelligence modules" },
              { num: "8-phase", label: "acquisition methodology" },
            ].map(({ num, label }) => (
              <div key={label} className="stat-item">
                <span className="stat-num">{num}</span>
                <span className="stat-label">{label}</span>
              </div>
            ))}
          </div>
          <div className="surf-tabs" data-reveal>
            {(Object.keys(surfaces) as SurfaceKey[]).map((key) => (
              <button
                key={key}
                className={key === selectedSurface ? "active" : ""}
                onClick={() => setSelectedSurface(key)}
              >
                {surfaces[key].label}
                <span className={surfaces[key].status === "live" ? "status-live" : "status-dev"}>
                  {surfaces[key].status === "live" ? "Live" : "In development"}
                </span>
              </button>
            ))}
          </div>
          <div className="surf-card" data-reveal>
            <div className="surf-card-head">
              <h3>{surface.label}</h3>
              <span className={surface.status === "live" ? "status-live" : "status-dev"}>
                {surface.status === "live" ? "Live" : "In development"}
              </span>
            </div>
            <div className="surf-flow">
              {surface.examples.map((ex, i) => (
                <div key={ex} className="surf-step">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <p>{ex}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 7: Canonical Definitions ────────────────────────── */}
      <section className="section" id="definitions">
        <div className="container">
          <div className="sec-head" data-reveal>
            <span className="sec-label">Key Concepts</span>
            <h2 className="t-display-md">Definitions in Behavioral Intelligence.</h2>
          </div>
          <div className="defs-grid" data-reveal>
            {definitions.map(({ term, def }) => (
              <div key={term} className="def-item">
                <h3 className="def-term">{term}</h3>
                <p className="def-body">{def}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 8: FAQ ───────────────────────────────────────────── */}
      <section className="section section-alt" id="faq">
        <div className="container">
          <div className="sec-head" data-reveal>
            <span className="sec-label">FAQ</span>
            <h2 className="t-display-md">Frequently asked questions about Behavioral Intelligence and HBIF.</h2>
          </div>
          <div className="faq-list" data-reveal>
            {faqs.map(({ q, a }) => (
              <div key={q} className="faq-item">
                <h3 className="faq-q">{q}</h3>
                <p className="faq-a">{a}</p>
              </div>
            ))}
          </div>
          <div className="faq-links" data-reveal>
            <Link href="/about">About Polynovea</Link>
            <Link href="/projects">View active projects</Link>
            <Link href="/research">Research</Link>
            <Link href="/#contact">Partner with us</Link>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="cta-card" data-reveal>
            <span className="sec-label">Work With Polynovea</span>
            <h2>Bring Behavioral Intelligence into your operating environment.</h2>
            <p>
              Partner with Polynovea to instrument your environment, build the behavioral intelligence layer, and convert human behavioral signals into a compounding operational advantage.
            </p>
            <div className="cta-actions">
              <Link href="/#contact" className="btn btn-primary">Partner with us</Link>
              <Link href="/about" className="btn btn-secondary">About Polynovea</Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* ── Base ──────────────────────────────────────────────────── */
        .arch-page {
          background: rgba(9, 8, 16, 0.62);
          color: var(--text-primary);
        }
        .section { padding: var(--space-5xl, 96px) 0; }
        .section-alt { background: rgba(0, 0, 0, 0.2); }

        /* ── Hero ──────────────────────────────────────────────────── */
        .arch-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding-top: var(--nav-height, 72px);
        }
        .hero-fade {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 30%;
          background: linear-gradient(to bottom, transparent, #090810);
          pointer-events: none;
          z-index: 1;
        }
        .hero-body {
          position: relative;
          z-index: 2;
          max-width: 880px;
          padding-bottom: var(--space-4xl, 80px);
        }
        .hero-eyebrow {
          display: block;
          font-family: var(--font-mono, monospace);
          color: var(--accent-authority, #e6d3a3);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: var(--space-lg, 24px);
        }
        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(52px, 7.5vw, 110px);
          font-weight: 700;
          line-height: 0.96;
          letter-spacing: -0.03em;
          margin: 0 0 var(--space-xl, 32px);
          color: var(--text-primary);
        }
        .hero-title .gold { color: var(--accent-authority, #e6d3a3); }
        .hero-desc {
          color: var(--text-secondary);
          font-size: clamp(16px, 1.6vw, 19px);
          line-height: 1.7;
          max-width: 560px;
          margin: 0 0 var(--space-lg, 24px);
        }
        .hero-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: var(--space-xs, 6px);
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: var(--text-disabled);
          margin-bottom: var(--space-xl, 32px);
        }
        .hero-actions {
          display: flex;
          gap: var(--space-md, 16px);
          flex-wrap: wrap;
        }

        /* ── Section structure ─────────────────────────────────────── */
        .sec-head { max-width: 760px; margin-bottom: var(--space-3xl, 56px); }
        .sec-label {
          display: block;
          font-family: var(--font-mono, monospace);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--accent-authority, #e6d3a3);
          margin-bottom: var(--space-md, 16px);
        }
        .sec-head h2 { color: var(--text-primary); }
        .sec-answer {
          color: var(--text-secondary);
          font-size: 16px;
          line-height: 1.7;
          max-width: 680px;
          margin-top: var(--space-md, 16px);
        }

        /* ── Definition block ──────────────────────────────────────── */
        .definition-block {
          max-width: 780px;
          margin-bottom: var(--space-3xl, 56px);
        }
        .definition-lead {
          font-size: 18px;
          color: var(--text-primary);
          line-height: 1.65;
          margin: 0 0 var(--space-lg, 24px);
        }
        .definition-lead strong { color: var(--accent-authority, #e6d3a3); }
        .definition-body {
          font-size: 16px;
          color: var(--text-secondary);
          line-height: 1.75;
          margin: 0 0 var(--space-md, 16px);
        }

        /* ── Three columns ─────────────────────────────────────────── */
        .three-col {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-lg, 24px);
        }
        .three-col-item {
          border: 1px solid rgba(124, 58, 237, 0.2);
          border-radius: var(--radius-sm, 8px);
          padding: var(--space-xl, 32px);
        }
        .three-col-item h3 {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 var(--space-sm, 8px);
        }
        .three-col-item p {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.65;
          margin: 0;
        }

        /* ── Comparison table ──────────────────────────────────────── */
        .table-wrap {
          overflow-x: auto;
          border-radius: var(--radius-sm, 8px);
          border: 1px solid rgba(124, 58, 237, 0.22);
        }
        .comparison-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }
        .comparison-table th {
          background: rgba(124, 58, 237, 0.08);
          color: var(--text-primary);
          font-weight: 700;
          text-align: left;
          padding: var(--space-md, 16px) var(--space-lg, 24px);
          font-size: 13px;
          border-bottom: 1px solid rgba(124, 58, 237, 0.3);
          white-space: nowrap;
        }
        .comparison-table th:first-child { color: var(--accent-authority, #e6d3a3); }
        .comparison-table th.col-hi { background: rgba(124, 58, 237, 0.18); }
        .comparison-table td {
          padding: var(--space-md, 16px) var(--space-lg, 24px);
          color: var(--text-secondary);
          border-bottom: 1px solid rgba(124, 58, 237, 0.1);
          vertical-align: top;
          line-height: 1.5;
        }
        .comparison-table td:first-child {
          color: var(--text-primary);
          font-weight: 600;
          white-space: nowrap;
        }
        .comparison-table td.col-hi {
          color: var(--text-primary);
          background: rgba(124, 58, 237, 0.05);
        }
        .comparison-table tr:last-child td { border-bottom: 0; }

        /* ── Pipeline ──────────────────────────────────────────────── */
        .pipeline {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: var(--space-sm, 8px);
        }
        .pipeline-step {
          position: relative;
          padding: var(--space-md, 16px);
          border: 1px solid rgba(124, 58, 237, 0.2);
          border-radius: var(--radius-sm, 8px);
          min-height: 100px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .pipeline-num {
          font-family: var(--font-mono, monospace);
          color: var(--accent-authority, #e6d3a3);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          opacity: 0.7;
        }
        .pipeline-label {
          color: var(--text-primary);
          font-size: 13px;
          font-weight: 600;
          line-height: 1.3;
        }
        .pipeline-arrow {
          position: absolute;
          right: -1px; top: 50%;
          width: 0; height: 0;
          border-top: 5px solid transparent;
          border-bottom: 5px solid transparent;
          border-left: 6px solid var(--accent-intelligence, #7c3aed);
          transform: translateY(-50%);
          z-index: 1;
          opacity: 0.7;
        }

        /* ── Modules list ──────────────────────────────────────────── */
        .modules-list { display: grid; gap: var(--space-md, 16px); }

        /* ── Feedback loop ─────────────────────────────────────────── */
        .loop-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-md, 16px);
        }
        .loop-item {
          border: 1px solid rgba(124, 58, 237, 0.22);
          border-radius: var(--radius-sm, 8px);
          padding: var(--space-lg, 24px);
          display: flex;
          flex-direction: column;
          gap: var(--space-xs, 6px);
        }
        .loop-num {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          color: var(--accent-authority, #e6d3a3);
          opacity: 0.7;
        }
        .loop-label {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .loop-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }

        /* ── Stats ─────────────────────────────────────────────────── */
        .stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-md, 16px);
          margin-bottom: var(--space-2xl, 48px);
        }
        .stat-item {
          border: 1px solid rgba(124, 58, 237, 0.22);
          border-radius: var(--radius-sm, 8px);
          padding: var(--space-lg, 24px);
          display: flex;
          flex-direction: column;
          gap: var(--space-xs, 6px);
        }
        .stat-num {
          font-family: var(--font-display);
          font-size: clamp(28px, 3vw, 44px);
          font-weight: 700;
          color: var(--accent-authority, #e6d3a3);
          line-height: 1;
          letter-spacing: -0.03em;
        }
        .stat-label {
          font-size: 12px;
          color: var(--text-disabled);
          line-height: 1.4;
          font-family: var(--font-mono, monospace);
          letter-spacing: 0.04em;
        }

        /* ── Surface tabs ──────────────────────────────────────────── */
        .surf-tabs {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-sm, 8px);
          margin-bottom: var(--space-md, 16px);
        }
        .surf-tabs button {
          border-radius: var(--radius-sm, 8px);
          padding: var(--space-md, 16px) var(--space-lg, 24px);
          text-align: left;
          color: var(--text-primary);
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 14px;
          background: transparent;
          border: 1px solid rgba(124, 58, 237, 0.22);
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .surf-tabs button.active {
          border-color: rgba(124, 58, 237, 0.6);
          background: rgba(124, 58, 237, 0.06);
        }
        .surf-card {
          border: 1px solid rgba(124, 58, 237, 0.22);
          border-radius: var(--radius-sm, 8px);
          padding: var(--space-2xl, 48px);
        }
        .surf-card-head {
          display: flex;
          align-items: center;
          gap: var(--space-md, 16px);
          margin-bottom: var(--space-xl, 32px);
        }
        .surf-card-head h3 {
          font-family: var(--font-display);
          font-size: clamp(22px, 2.5vw, 32px);
          font-weight: 700;
          letter-spacing: -0.02em;
          margin: 0;
        }
        .surf-flow {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-md, 16px);
        }
        .surf-step {
          border: 1px solid var(--border-muted);
          border-radius: var(--radius-sm, 8px);
          padding: var(--space-md, 16px);
        }
        .surf-step span {
          font-family: var(--font-mono, monospace);
          color: var(--accent-intelligence, #7c3aed);
          font-weight: 600;
          font-size: 12px;
          letter-spacing: 0.1em;
          display: block;
          margin-bottom: var(--space-sm, 8px);
        }
        .surf-step p {
          color: var(--text-secondary);
          font-size: 13px;
          line-height: 1.55;
          margin: 0;
        }
        .status-live {
          color: #4ade80;
          font-size: 11px;
          font-family: var(--font-mono, monospace);
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .status-dev {
          color: var(--accent-authority, #e6d3a3);
          opacity: 0.7;
          font-size: 11px;
          font-family: var(--font-mono, monospace);
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* ── Definitions ───────────────────────────────────────────── */
        .defs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-lg, 24px);
        }
        .def-item {
          border: 1px solid rgba(124, 58, 237, 0.2);
          border-radius: var(--radius-sm, 8px);
          padding: var(--space-xl, 32px);
        }
        .def-term {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 var(--space-md, 16px);
          line-height: 1.35;
        }
        .def-body {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin: 0;
        }

        /* ── FAQ ───────────────────────────────────────────────────── */
        .faq-list {
          display: grid;
          gap: var(--space-lg, 24px);
          margin-bottom: var(--space-2xl, 48px);
        }
        .faq-item {
          border-left: 2px solid rgba(124, 58, 237, 0.4);
          padding-left: var(--space-lg, 24px);
        }
        .faq-q {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 var(--space-sm, 8px);
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
          gap: var(--space-md, 16px);
          padding-top: var(--space-xl, 32px);
          border-top: 1px solid var(--border-muted);
        }
        .faq-links a {
          font-size: 14px;
          font-weight: 500;
          color: var(--accent-intelligence, #7c3aed);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .faq-links a:hover { color: var(--accent-authority, #e6d3a3); }

        /* ── CTA ───────────────────────────────────────────────────── */
        .cta-card {
          border: 1px solid rgba(124, 58, 237, 0.22);
          border-radius: var(--radius-sm, 8px);
          padding: var(--space-3xl, 64px) var(--space-2xl, 48px);
          text-align: center;
        }
        .cta-card h2 {
          font-family: var(--font-display);
          font-size: clamp(26px, 3.5vw, 44px);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: var(--space-sm, 8px) auto var(--space-md, 16px);
          max-width: 680px;
        }
        .cta-card p {
          color: var(--text-secondary);
          max-width: 560px;
          margin: 0 auto;
          line-height: 1.7;
          font-size: 16px;
        }
        .cta-actions {
          display: flex;
          justify-content: center;
          gap: var(--space-md, 16px);
          flex-wrap: wrap;
          margin-top: var(--space-xl, 32px);
        }

        /* ── Hierarchy diagram ─────────────────────────────────────── */
        .hier-diagram {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 640px;
          margin: 0 auto var(--space-3xl, 56px);
        }
        .hier-tier {
          width: 100%;
          border: 1px solid rgba(124, 58, 237, 0.3);
          border-radius: var(--radius-sm, 8px);
          padding: var(--space-lg, 24px) var(--space-xl, 32px);
          text-align: center;
        }
        .hier-tier-mid {
          border-color: rgba(124, 58, 237, 0.55);
          background: rgba(124, 58, 237, 0.04);
        }
        .hier-tier-hbif {
          border-color: rgba(230, 211, 163, 0.35);
          background: rgba(230, 211, 163, 0.02);
        }
        .hier-label {
          display: block;
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: var(--space-xs, 6px);
        }
        .hier-sub {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .hier-arrow {
          font-size: 20px;
          color: var(--accent-intelligence, #7c3aed);
          opacity: 0.5;
          line-height: 2;
        }
        .hier-domains-row {
          display: flex;
          gap: var(--space-sm, 8px);
          flex-wrap: wrap;
          justify-content: center;
          width: 100%;
        }
        .hier-domain {
          border: 1px solid rgba(124, 58, 237, 0.22);
          border-radius: var(--radius-sm, 8px);
          padding: var(--space-xs, 6px) var(--space-md, 16px);
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
          font-family: var(--font-mono, monospace);
          letter-spacing: 0.04em;
        }

        /* ── Infrastructure grid ──────────────────────────────────── */
        .infra-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-md, 16px);
        }
        .infra-item {
          border: 1px solid rgba(124, 58, 237, 0.2);
          border-radius: var(--radius-sm, 8px);
          padding: var(--space-xl, 32px);
        }
        .infra-label {
          display: block;
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: var(--space-sm, 8px);
        }
        .infra-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.65;
          margin: 0;
        }

        /* ── Evolution flow ───────────────────────────────────────── */
        .evolution-flow {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          border: 1px solid rgba(124, 58, 237, 0.2);
          border-radius: var(--radius-sm, 8px);
          overflow: hidden;
        }
        .evo-item {
          padding: var(--space-xl, 32px) var(--space-lg, 24px);
          border-right: 1px solid rgba(124, 58, 237, 0.2);
          position: relative;
        }
        .evo-item:last-child { border-right: 0; }
        .evo-item::after {
          content: "→";
          position: absolute;
          right: calc(-1 * var(--space-xs, 6px) - 6px);
          top: var(--space-xl, 32px);
          color: var(--accent-intelligence, #7c3aed);
          opacity: 0.4;
          font-size: 14px;
          z-index: 1;
        }
        .evo-item:last-child::after { display: none; }
        .evo-current { background: rgba(230, 211, 163, 0.03); }
        .evo-era {
          display: block;
          font-size: 13px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: var(--space-sm, 8px);
          font-family: var(--font-mono, monospace);
          letter-spacing: 0.04em;
        }
        .evo-current .evo-era { color: var(--accent-authority, #e6d3a3); }
        .evo-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }

        /* ── Applications grid ────────────────────────────────────── */
        .apps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-md, 16px);
        }
        .app-item {
          border: 1px solid rgba(124, 58, 237, 0.2);
          border-radius: var(--radius-sm, 8px);
          padding: var(--space-lg, 24px);
          display: flex;
          flex-direction: column;
          gap: var(--space-xs, 6px);
        }
        .app-domain {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .app-status {
          font-size: 10px;
          font-family: var(--font-mono, monospace);
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .app-status-live { color: #4ade80; }
        .app-status-in-development { color: var(--accent-authority, #e6d3a3); opacity: 0.7; }
        .app-status-future { color: var(--text-disabled); }

        /* ── Responsive ────────────────────────────────────────────── */
        @media (max-width: 1024px) {
          .loop-grid { grid-template-columns: repeat(2, 1fr); }
          .surf-tabs { grid-template-columns: repeat(2, 1fr); }
          .surf-flow { grid-template-columns: repeat(2, 1fr); }
          .stats-row { grid-template-columns: repeat(2, 1fr); }
          .pipeline { grid-template-columns: repeat(5, 1fr); }
          .infra-grid { grid-template-columns: repeat(2, 1fr); }
          .apps-grid { grid-template-columns: repeat(2, 1fr); }
          .evolution-flow { grid-template-columns: repeat(2, 1fr); }
          .evo-item { border-right: 0; border-bottom: 1px solid rgba(124, 58, 237, 0.2); }
          .evo-item:last-child { border-bottom: 0; }
          .evo-item::after { display: none; }
        }
        @media (max-width: 768px) {
          .three-col { grid-template-columns: 1fr; }
          .pipeline { grid-template-columns: repeat(2, 1fr); }
          .defs-grid { grid-template-columns: 1fr; }
          .surf-flow { grid-template-columns: 1fr; }
          .cta-card { padding: var(--space-xl, 32px) var(--space-lg, 24px); }
          .cta-actions { flex-direction: column; }
          .infra-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .loop-grid { grid-template-columns: 1fr; }
          .pipeline { grid-template-columns: 1fr; }
          .surf-tabs { grid-template-columns: 1fr; }
          .apps-grid { grid-template-columns: 1fr; }
          .evolution-flow { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
}
