"use client";

import { BentoGrid, type BentoItem } from "@/components/ui/bento-grid";

const systemModules: BentoItem[] = [
  {
    num: "01",
    tag: "M1",
    title: "Decision Framework",
    desc: "Determines whether an opportunity is viable. Evaluates engagement fit, pricing logic, and expected outcomes before any resource is committed.",
    colSpan: 1,
  },
  {
    num: "02",
    tag: "M2",
    title: "Acquisition System",
    desc: "Multi-source behavioural signal extraction, structured through an ontology layer that maps how human behaviour operates inside commercial environments.",
    colSpan: 2,
  },
  {
    num: "03",
    tag: "M3",
    title: "Optimisation System",
    desc: "Two-part system. Part 1 instruments the live environment — POS, venue data, audience behaviour. Part 2 converts that intelligence into measurable revenue optimisation for venues.",
    colSpan: 3,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <div className="projects-header" data-reveal>
          <span className="t-label" style={{ color: "var(--accent-authority-muted)" }}>
            Projects
          </span>
          <h2 className="t-display-md" style={{ marginTop: "var(--space-md)", color: "var(--text-primary)" }}>
            The intelligence{" "}
            <span style={{ color: "var(--accent-authority)" }}>infrastructure</span>{" "}
            in motion.
          </h2>
          <p className="t-body" style={{ marginTop: "var(--space-md)" }}>
            Three modules. One compounding system.
          </p>
        </div>

        <div data-reveal data-reveal-delay="50">
          <BentoGrid items={systemModules} />
        </div>
      </div>

      <style jsx>{`
        .projects-section {
          background: rgba(18, 18, 18, 0.5);
        }
        .projects-header {
          margin-bottom: var(--space-3xl);
        }
      `}</style>
    </section>
  );
}
