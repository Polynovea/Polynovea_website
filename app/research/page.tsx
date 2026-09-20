"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const tracks = [
  {
    tag: "Domain evidence",
    title: "Real systems before universal claims",
    body: "HBIF begins with domain-specific systems, ontologies, observations, interventions and outcomes. Hospitality produced the first substantial empirical lineage; Workplace now has Infrakinetic as its Layer 1 operating product.",
  },
  {
    tag: "Executable experiments",
    title: "Mathematics and dynamics implemented against data",
    body: "The research estate includes implemented statistical, information-theoretic and dynamical-systems experiments with preserved outputs. The point is not mathematical decoration; candidate structures must survive empirical testing.",
  },
  {
    tag: "Layer 2 reference",
    title: "Behavioral Phase Model",
    body: "BPM operationalises a subset of the research into a state-and-dynamics pipeline. It is the current Layer 2 technical reference, while shared cross-domain validity remains an open research problem.",
  },
  {
    tag: "Cross-domain programme",
    title: "Transfer is tested, not assumed",
    body: "The long-horizon objective is to test whether independently observed domain phenomena converge toward useful shared behavioural structure. Replication, falsification, uncertainty and boundary conditions are required before promotion.",
  },
  {
    tag: "AI / LLM boundary",
    title: "Reasoning systems consume evidence; they do not rewrite it",
    body: "Future AI and agent interfaces should preserve HBIF observation, state estimate, uncertainty and competing hypotheses separately from an LLM's interpretation or recommendation.",
  },
  {
    tag: "Research governance",
    title: "Evidence state is part of the architecture",
    body: "Implemented, calibrated, hypothesised, restricted and unproven are not interchangeable labels. Public claims are intentionally narrower than the full internal research ledger.",
  },
];

const evidenceStates = [
  {
    state: "Implemented",
    title: "Experiment estate",
    body: "Executable experiments and generated artifacts exist across multiple mathematical and computational research tracks.",
  },
  {
    state: "Operationalised subset",
    title: "BPM",
    body: "A subset of the research has been turned into a working behavioural state-and-dynamics pipeline.",
  },
  {
    state: "Substantial lineage",
    title: "Hospitality corpus",
    body: "A large historical domain corpus and product/research lineage provide real empirical material rather than synthetic theory alone.",
  },
  {
    state: "Not yet established",
    title: "Cross-domain universality",
    body: "Polynovea does not claim that one shared behavioural model has already been validated across independent domains.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "HBIF Research - Polynovea Behavioural Intelligence Research Programme",
  description:
    "A public overview of Polynovea's HBIF research programme, executable experiment estate, Behavioral Phase Model and cross-domain evidence boundaries.",
  author: { "@type": "Organization", name: "Polynovea" },
  publisher: {
    "@type": "Organization",
    name: "Polynovea",
    url: "https://www.polynovea.in",
    logo: { "@type": "ImageObject", url: "https://www.polynovea.in/logo.png" },
  },
  dateModified: "2026-09-19",
  url: "https://www.polynovea.in/research",
};

export default function ResearchPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Navbar />
      <main className="research-page">
        <section className="research-hero">
          <div className="container">
            <span className="eyebrow">HBIF Research Programme</span>
            <h1>
              The interesting question is not whether a pattern exists.<br />
              <span className="gold">It is whether the pattern survives.</span>
            </h1>
            <p className="hero-copy">
              Polynovea&apos;s Human Behavioural Intelligence Framework is an evolving research architecture built from real domain systems, executable experiments, behavioural-state modelling and cross-domain tests. It is not presented as a finished universal theory of human behaviour.
            </p>
            <div className="hero-meta">
              <span>Research state: pre-cross-domain validation</span>
              <span>·</span>
              <span>Layer 2 reference: BPM</span>
              <span>·</span>
              <span>Updated September 19, 2026</span>
            </div>
            <div className="hero-actions">
              <Link href="/architecture" className="btn btn-primary">Understand the architecture</Link>
              <a href="#tracks" className="btn btn-secondary">Explore public research tracks</a>
            </div>
          </div>
        </section>

        <section className="section research-sheet" id="state">
          <div className="container">
            <div className="sheet-rail">
              <span>Public evidence ledger</span>
              <span>HBIF / 2026.09.19</span>
            </div>
            <div className="section-head research-sheet-head">
              <span className="eyebrow">Evidence state</span>
              <h2>What exists today - and what still has to be proved.</h2>
              <p>Uncertainty is part of the result. The ledger separates implemented work, operationalised research, substantial domain evidence and claims that remain unestablished.</p>
            </div>
            <div className="evidence-ledger">
              {evidenceStates.map((item, index) => (
                <article className="ledger-row" key={item.title}>
                  <span className="ledger-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="state-tag">{item.state}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="tracks">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Public research map</span>
              <h2>Selected research tracks.</h2>
              <p>These are the areas that can be discussed publicly without exposing restricted internal research mechanics.</p>
            </div>
            <div className="track-grid">
              {tracks.map((track) => (
                <article className="track-card" key={track.title}>
                  <span className="track-tag">{track.tag}</span>
                  <h3>{track.title}</h3>
                  <p>{track.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-alt" id="path">
          <div className="container two-col">
            <div>
              <span className="eyebrow">Long-horizon path</span>
              <h2>From domain evidence to shared mechanisms - only if the evidence survives.</h2>
            </div>
            <div className="path-list">
              {[
                "Real domain systems",
                "Domain-specific ontologies and observations",
                "Domain behavioural state and dynamics",
                "Cross-domain comparison",
                "Candidate shared abstractions",
                "Replication and falsification across independent domains",
                "Domain-independent mechanisms where evidence survives",
                "Bounded use by AI, agents and decision systems",
              ].map((item, index) => (
                <div className="path-item" key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="nonclaims">
          <div className="container two-col">
            <div>
              <span className="eyebrow">Claim boundary</span>
              <h2>What this page deliberately does not claim.</h2>
            </div>
            <div className="nonclaim-list">
              <div>HBIF has solved human behaviour.</div>
              <div>HBIF is a universal mathematical theory.</div>
              <div>One successful domain proves another domain will behave the same way.</div>
              <div>Every implemented research result is a product feature.</div>
              <div>Every product customer automatically contributes unrestricted research data.</div>
              <div>An LLM can turn a probabilistic HBIF hypothesis into fact by expressing it fluently.</div>
            </div>
          </div>
        </section>

        <section className="section section-alt" id="study">
          <div className="container study-card">
            <div>
              <span className="eyebrow">Participatory research</span>
              <h2>Nightlife behaviour study.</h2>
              <p>
                The original 16-question nightlife study remains available as a voluntary Hospitality-domain research input. It now lives under the research programme rather than defining the entire Research page.
              </p>
            </div>
            <div className="study-actions">
              <Link href="/research/nightlife" className="btn btn-primary">Take the study</Link>
              <Link href="/architecture" className="btn btn-secondary">How HBIF uses evidence</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        .research-page { position: relative; background: rgba(8, 8, 11, .42); }
        .research-hero { min-height: 88svh; display: flex; align-items: center; padding: calc(var(--nav-height) + 72px) 0 88px; }
        .eyebrow, .state-tag, .track-tag { display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--accent-authority-muted); }
        .research-hero h1 { max-width: 1080px; margin: 18px 0 24px; font-family: var(--font-display); font-size: clamp(46px, 6.8vw, 90px); line-height: .99; letter-spacing: -.045em; color: var(--text-primary); }
        .gold { color: var(--accent-authority); }
        .hero-copy { max-width: 800px; font-size: clamp(17px, 1.7vw, 21px); line-height: 1.7; color: var(--text-secondary); }
        .hero-meta { display: flex; flex-wrap: wrap; gap: 9px; margin-top: 22px; font-family: var(--font-mono, monospace); font-size: 11px; color: var(--text-disabled); }
        .hero-actions, .study-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 28px; }
        .section { padding: clamp(72px, 9vw, 132px) 0; }
        .section-alt { background: rgba(13, 13, 18, .72); border-block: 1px solid rgba(221,216,232,.08); }
        .section-head { max-width: 820px; margin-bottom: 42px; }
        .section-head h2, .two-col h2, .study-card h2 { margin: 12px 0 14px; font-family: var(--font-display); font-size: clamp(34px, 5vw, 60px); line-height: 1.04; letter-spacing: -.035em; color: var(--text-primary); }
        .section-head p, .study-card p { color: var(--text-secondary); font-size: 17px; line-height: 1.7; }
        .research-sheet { background: #ece8de; color: #19191d; border-block: 1px solid rgba(46,43,38,.14); }
        .sheet-rail { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding-bottom: 16px; margin-bottom: 36px; border-bottom: 1px solid rgba(46,43,38,.18); color: #6e685f; font-family: var(--font-mono, monospace); font-size: 10px; letter-spacing: .12em; text-transform: uppercase; }
        .research-sheet .eyebrow { color: #776c4f; }
        .research-sheet-head h2 { color: #19191d; }
        .research-sheet-head p { color: #5f5a53; }
        .evidence-ledger { border-top: 1px solid rgba(46,43,38,.22); }
        .ledger-row { display: grid; grid-template-columns: 42px minmax(120px,.6fr) minmax(180px,.8fr) minmax(260px,1.6fr); gap: 20px; align-items: start; padding: 22px 0; border-bottom: 1px solid rgba(46,43,38,.16); }
        .ledger-index { color: #8b847b; font-family: var(--font-mono, monospace); font-size: 10px; padding-top: 4px; }
        .ledger-row .state-tag { color: #6f5e2e; padding-top: 2px; }
        .ledger-row h3 { margin: 0; color: #202024; font-family: var(--font-display); font-size: 21px; font-weight: 560; letter-spacing: -.015em; }
        .ledger-row p { margin: 0; color: #5b5650; line-height: 1.65; font-size: 14px; }
        .track-card { padding: 22px; border: 1px solid rgba(221,216,232,.10); border-radius: 14px; background: linear-gradient(180deg, rgba(18,18,24,.88), rgba(12,12,17,.82)); }
        .track-card h3 { margin: 10px 0; font-family: var(--font-display); color: var(--text-primary); font-size: 21px; }
        .track-card p { color: var(--text-secondary); line-height: 1.65; font-size: 14px; }
        .track-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .two-col { display: grid; grid-template-columns: .9fr 1.1fr; gap: clamp(38px, 7vw, 100px); align-items: start; }
        .path-list { display: grid; gap: 10px; }
        .path-item { display: grid; grid-template-columns: 42px 1fr; gap: 12px; align-items: center; min-height: 58px; padding: 12px 16px; border: 1px solid rgba(124,58,237,.22); border-radius: var(--radius-md); background: rgba(24,24,27,.34); }
        .path-item span { font-family: var(--font-mono, monospace); color: var(--accent-intelligence); font-size: 11px; }
        .path-item strong { color: var(--text-primary); font-size: 14px; }
        .nonclaim-list { display: grid; gap: 10px; }
        .nonclaim-list div { padding: 14px 16px; border-left: 2px solid rgba(230,211,163,.42); background: rgba(230,211,163,.035); color: var(--text-secondary); line-height: 1.55; }
        .study-card { display: grid; grid-template-columns: 1.2fr auto; gap: 36px; align-items: end; }
        .study-actions { justify-content: flex-end; }
        @media (max-width: 980px) {
          .ledger-row { grid-template-columns: 34px 1fr; }
          .ledger-row h3, .ledger-row p { grid-column: 2; }
          .track-grid { grid-template-columns: 1fr; }
          .two-col, .study-card { grid-template-columns: 1fr; }
          .study-actions { justify-content: flex-start; }
        }
        @media (max-width: 640px) {
          .research-hero { min-height: auto; padding-top: calc(var(--nav-height) + 56px); }
          .research-hero h1 { font-size: clamp(42px, 13vw, 62px); }
          .sheet-rail { align-items: flex-start; flex-direction: column; }
          .section { padding: 64px 0; }
        }
      `}</style>
    </>
  );
}
