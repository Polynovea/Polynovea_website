"use client";

import Link from "next/link";

const layers = [
  {
    num: "01",
    title: "Domain Product & Domain Intelligence",
    status: "Domain-specific",
    summary:
      "Layer 1 is where Polynovea builds real products for real operating environments. Every domain keeps its own ontology, state, workflows, evidence boundary, interfaces and validation programme.",
    examples: [
      "Workplace → Infrakinetic, the current commercial lead",
      "Hospitality → product under architectural rebuild",
      "A successful domain does not prove another domain can be copied from it",
    ],
  },
  {
    num: "02",
    title: "Shared Behavioural State & Dynamics",
    status: "Research engineering",
    summary:
      "Layer 2 studies whether deeper behavioural state and dynamics can be represented without carrying a domain's surface categories directly into the shared layer. The current technical reference is the Behavioral Phase Model (BPM).",
    examples: [
      "Intended to be domain-agnostic where evidence supports that abstraction",
      "State, dynamics, uncertainty and evidence remain explicit",
      "Not described as universally validated",
    ],
  },
  {
    num: "03",
    title: "Frontier Human Decision-Mechanism Research",
    status: "Evidence-gated frontier",
    summary:
      "Layer 3 is the long-horizon research frontier: deeper mechanisms of human decision and behavioural state that may survive comparison across meaningfully different domains.",
    examples: [
      "Psychological Decoder research",
      "Physics-inspired and dynamical-systems experiments",
      "Attractor, phase-transition, scaling and related candidate models",
      "Research is not automatically a product feature",
    ],
  },
];

const loop = [
  "Domain observation",
  "Domain product operation",
  "Structured telemetry",
  "Decisions / interventions",
  "Measured outcomes",
  "Domain learning",
  "Cross-domain testing where valid",
  "Validated intelligence returns to products",
];

const gates = [
  {
    title: "Independent evidence",
    body: "A candidate shared mechanism should survive evidence from meaningfully different domains rather than only the domain where it was discovered.",
  },
  {
    title: "Explicit abstraction",
    body: "The mapping from domain-specific observations into a shared construct must be stated instead of being hidden inside a convenient label.",
  },
  {
    title: "Replication & falsification",
    body: "Candidates must be tested outside the discovery setting, including failure modes, boundary conditions and null or baseline comparisons.",
  },
  {
    title: "Uncertainty preserved",
    body: "Probabilistic state, competing explanations and evidence maturity must not be flattened into factual certainty by a model or LLM interface.",
  },
  {
    title: "Useful beyond elegance",
    body: "A shared construct has to improve explanation, state estimation, prediction, intervention reasoning or decision quality - not merely look mathematically interesting.",
  },
  {
    title: "Governance before promotion",
    body: "Research moves into canonical HBIF or product use only through explicit evidence and governance gates.",
  },
];

const faqs = [
  {
    q: "Is HBIF a finished theory of human behaviour?",
    a: "No. HBIF is an evolving behavioural-intelligence framework and research architecture. Polynovea has implemented experimental infrastructure and domain evidence, but cross-domain validity remains unproven and the company does not claim a solved universal model of human behaviour.",
  },
  {
    q: "Is Layer 1 the same product in every domain?",
    a: "No. Layer 1 is deliberately domain-specific. A Workplace product does not prove a Hospitality or Education product can be copied from it. Each domain must earn its own ontology, workflows, interfaces, evidence and product validity.",
  },
  {
    q: "What is the current Layer 2 technical reference?",
    a: "The Behavioral Phase Model (BPM) is the current Layer 2 technical reference. It is research engineering, not a claim that one shared behavioural state model has already been universally validated across domains.",
  },
  {
    q: "Does every product automatically make HBIF smarter?",
    a: "No. Domain learning can become a candidate for shared research, but cross-domain transfer is earned through evidence. Some mechanisms may transfer, some may remain domain-specific, and some may fail completely.",
  },
  {
    q: "Does customer product data automatically enter HBIF research?",
    a: "No. Standard product use does not grant unrestricted research rights. Research participation and the exact permitted data or derived evidence classes must be separately governed, contractually defined and privacy-aware.",
  },
  {
    q: "Can an LLM decide what HBIF means?",
    a: "No. An LLM may consume bounded HBIF outputs, but it should not erase provenance, uncertainty or competing hypotheses. Interpretation, recommendation, policy decisions and actual interventions remain distinct layers of authority.",
  },
];

export default function ArchitectureDeepDive() {
  return (
    <main className="arch-page">
      <section className="arch-hero">
        <div className="container hero-inner">
          <span className="eyebrow">Human Behavioural Intelligence Framework</span>
          <h1>
            Domain-specific reality.<br />
            <span className="gold">Shared intelligence only where evidence survives.</span>
          </h1>
          <p className="hero-copy">
            HBIF is Polynovea&apos;s broader behavioural-intelligence framework: domain products and domain intelligence at Layer 1, shared behavioural-state research at Layer 2, and frontier decision-mechanism research at Layer 3.
          </p>
          <div className="hero-meta">
            <span>Current public architecture: 3 layers</span>
            <span>·</span>
            <span>Cross-domain validity: not yet established</span>
            <span>·</span>
            <span>Updated September 19, 2026</span>
          </div>
          <div className="hero-actions">
            <a href="#layers" className="btn btn-primary">Explore the layers</a>
            <Link href="/research" className="btn btn-secondary">See the research programme</Link>
          </div>
        </div>
      </section>

      <section className="section" id="what-is-hbif">
        <div className="container split">
          <div>
            <span className="section-label">Definition</span>
            <h2>What HBIF is - and what it is not.</h2>
          </div>
          <div className="prose-stack">
            <p className="lead">
              HBIF is not one model, one API, one scoring formula, one database or one LLM. It is the framework through which Polynovea separates domain-specific behavioural intelligence from shared research that may, or may not, transfer across domains.
            </p>
            <p>
              The architecture exists to avoid two opposite errors: treating every domain as unrelated and throwing away useful learning, or pretending a universal behavioural system already exists before the evidence supports it.
            </p>
            <div className="callout">
              <strong>Core rule:</strong> Layer 1 remains domain-specific. Intelligence can compound beneath and across domains only where evidence supports transfer.
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt" id="layers">
        <div className="container">
          <div className="section-head">
            <span className="section-label">Architecture</span>
            <h2>The three public HBIF layers.</h2>
            <p>Each layer has a different evidence burden and a different relationship to commercial product claims.</p>
          </div>
          <div className="layers-grid">
            {layers.map((layer) => (
              <article className="layer-card" key={layer.num}>
                <div className="layer-top">
                  <span className="layer-num">Layer {layer.num}</span>
                  <span className="status-pill">{layer.status}</span>
                </div>
                <h3>{layer.title}</h3>
                <p>{layer.summary}</p>
                <ul>
                  {layer.examples.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="compounding">
        <div className="container">
          <div className="section-head">
            <span className="section-label">Compounding architecture</span>
            <h2>How learning can move without assuming universality.</h2>
            <p>Products create value first. Evidence becomes research input only where it is lawful, permitted and scientifically suitable.</p>
          </div>
          <div className="loop" aria-label="HBIF learning loop">
            {loop.map((item, index) => (
              <div className="loop-item" key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
              </div>
            ))}
          </div>
          <div className="callout wide">
            If no domain-independent grand theory ever emerges, Polynovea&apos;s products can still become valuable businesses. If cross-domain mechanisms do survive, Polynovea already has the products, operating context and governed evidence pathways through which that intelligence can return to real systems.
          </div>
        </div>
      </section>

      <section className="section section-alt" id="evidence-gates">
        <div className="container">
          <div className="section-head">
            <span className="section-label">Research discipline</span>
            <h2>What has to happen before a shared mechanism is promoted.</h2>
            <p>A compelling pattern is a research candidate, not a canonical mechanism.</p>
          </div>
          <div className="gate-grid">
            {gates.map((gate) => (
              <div className="gate-card" key={gate.title}>
                <h3>{gate.title}</h3>
                <p>{gate.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="data-boundary">
        <div className="container split">
          <div>
            <span className="section-label">Data & research boundary</span>
            <h2>Product access is not a research-data contract.</h2>
          </div>
          <div className="prose-stack">
            <p className="lead">
              Standard customers receive the contracted product without automatically becoming research partners. Polynovea does not treat raw customer databases as unrestricted HBIF property.
            </p>
            <p>
              Where research participation exists, permissions should define the exact event or data classes, purpose, retention, geography, access, revocation, publication and whether raw, derived, aggregated or anonymised forms may be used.
            </p>
            <div className="callout">
              <strong>Separation:</strong> service delivery, domain intelligence and cross-domain research are different permission and governance contexts.
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt" id="research-state">
        <div className="container">
          <div className="section-head">
            <span className="section-label">Current state</span>
            <h2>Substantial research estate. Deliberately bounded claims.</h2>
            <p>Polynovea has executable experimental assets, preserved outputs, a large historical Hospitality corpus, calibrated behavioural-state tooling and explicit research-to-product mappings. What it does not yet have is proven cross-domain universality.</p>
          </div>
          <div className="state-grid">
            <div className="state-card">
              <span className="state-kicker">Implemented</span>
              <h3>Executable research</h3>
              <p>Mathematical, statistical and dynamical-systems experiments have been implemented against real datasets rather than existing only as conceptual notes.</p>
            </div>
            <div className="state-card">
              <span className="state-kicker">Operationalised subset</span>
              <h3>Behavioral Phase Model</h3>
              <p>BPM operationalises a subset of the research into a working state-and-dynamics pipeline and currently anchors the Layer 2 technical reference.</p>
            </div>
            <div className="state-card">
              <span className="state-kicker">Unproven</span>
              <h3>Cross-domain universality</h3>
              <p>Candidate structures still need independent domains, replication, falsification and boundary testing before they can be treated as domain-independent mechanisms.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="container">
          <div className="section-head">
            <span className="section-label">FAQ</span>
            <h2>Questions the architecture should answer directly.</h2>
          </div>
          <div className="faq-grid">
            {faqs.map(({ q, a }) => (
              <div className="faq-card" key={q}>
                <h3>{q}</h3>
                <p>{a}</p>
              </div>
            ))}
          </div>
          <div className="end-actions">
            <Link href="/research" className="btn btn-primary">Explore HBIF research</Link>
            <Link href="/projects" className="btn btn-secondary">View Polynovea products</Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .arch-page { position: relative; background: rgba(9, 8, 16, 0.62); }
        .arch-hero { min-height: 88svh; display: flex; align-items: center; padding: calc(var(--nav-height) + 72px) 0 80px; }
        .hero-inner { max-width: 1120px; }
        .eyebrow, .section-label, .state-kicker { display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--accent-authority-muted); }
        .arch-hero h1 { max-width: 1050px; margin: 18px 0 24px; font-family: var(--font-display); font-size: clamp(48px, 7vw, 94px); line-height: .98; letter-spacing: -.045em; color: var(--text-primary); }
        .gold { color: var(--accent-authority); }
        .hero-copy { max-width: 760px; font-size: clamp(17px, 1.7vw, 21px); line-height: 1.65; color: var(--text-secondary); }
        .hero-meta { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 22px; font-family: var(--font-mono, monospace); font-size: 11px; color: var(--text-disabled); }
        .hero-actions, .end-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 30px; }
        .section { padding: clamp(72px, 9vw, 132px) 0; }
        .section-alt { background: rgba(15, 13, 25, .58); border-block: 1px solid var(--border-muted); }
        .section-head { max-width: 820px; margin-bottom: 42px; }
        .section-head h2, .split h2 { margin: 12px 0 14px; font-family: var(--font-display); font-size: clamp(34px, 5vw, 62px); line-height: 1.04; letter-spacing: -.035em; color: var(--text-primary); }
        .section-head p { font-size: 17px; line-height: 1.7; color: var(--text-secondary); }
        .split { display: grid; grid-template-columns: .9fr 1.1fr; gap: clamp(36px, 7vw, 100px); align-items: start; }
        .prose-stack { display: grid; gap: 18px; color: var(--text-secondary); font-size: 16px; line-height: 1.75; }
        .lead { font-size: 19px; color: var(--text-primary); }
        .callout { padding: 18px 20px; border: 1px solid rgba(230, 211, 163, .24); border-radius: var(--radius-md); background: rgba(230, 211, 163, .045); color: var(--text-secondary); }
        .callout strong { color: var(--accent-authority); }
        .callout.wide { max-width: 920px; margin-top: 26px; }
        .layers-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .layer-card, .gate-card, .state-card, .faq-card { border: 1px solid var(--border-muted); border-radius: var(--radius-lg); background: rgba(24, 24, 27, .42); backdrop-filter: blur(18px); }
        .layer-card { padding: 26px; }
        .layer-top { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 22px; }
        .layer-num { font-family: var(--font-mono, monospace); font-size: 11px; color: var(--accent-intelligence); }
        .status-pill { border: 1px solid rgba(255,255,255,.12); border-radius: 999px; padding: 5px 9px; font-size: 10px; text-transform: uppercase; letter-spacing: .08em; color: var(--text-disabled); }
        .layer-card h3, .gate-card h3, .state-card h3, .faq-card h3 { color: var(--text-primary); font-family: var(--font-display); }
        .layer-card h3 { font-size: 23px; margin-bottom: 12px; }
        .layer-card p, .gate-card p, .state-card p, .faq-card p { color: var(--text-secondary); line-height: 1.65; }
        .layer-card ul { margin: 20px 0 0; padding-left: 18px; display: grid; gap: 9px; color: var(--text-disabled); font-size: 13px; line-height: 1.5; }
        .loop { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
        .loop-item { min-height: 112px; padding: 18px; border: 1px solid rgba(124,58,237,.22); border-radius: var(--radius-md); background: rgba(24,24,27,.34); display: flex; flex-direction: column; justify-content: space-between; gap: 14px; }
        .loop-item span { font-family: var(--font-mono, monospace); font-size: 11px; color: var(--accent-intelligence); }
        .loop-item strong { color: var(--text-primary); font-size: 14px; line-height: 1.4; }
        .gate-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .gate-card { padding: 22px; }
        .gate-card h3 { font-size: 19px; margin-bottom: 8px; }
        .state-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .state-card { padding: 24px; }
        .state-card h3 { font-size: 22px; margin: 10px 0; }
        .faq-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .faq-card { padding: 22px; }
        .faq-card h3 { font-size: 18px; margin-bottom: 9px; }
        @media (max-width: 960px) {
          .layers-grid, .gate-grid, .state-grid { grid-template-columns: 1fr; }
          .loop { grid-template-columns: repeat(2, 1fr); }
          .split { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .arch-hero { min-height: auto; padding-top: calc(var(--nav-height) + 56px); }
          .arch-hero h1 { font-size: clamp(42px, 13vw, 64px); }
          .loop, .faq-grid { grid-template-columns: 1fr; }
          .section { padding: 64px 0; }
        }
      `}</style>
    </main>
  );
}
