import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ProjectsExpanded from "@/components/ProjectsExpanded";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Behavioral Intelligence Projects & Products",
  description:
    "Active behavioral intelligence projects across Polynovea — Hospitality live via the Acquisition System, Workplace product Infrakinetic in development.",
  alternates: { canonical: "https://www.polynovea.in/projects" },
  openGraph: {
    title: "Behavioral Intelligence Projects | Polynovea",
    description:
      "Active initiatives across the Polynovea ecosystem — intelligence infrastructure, live operations, and product development.",
    url: "https://www.polynovea.in/projects",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Polynovea Projects" }],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Behavioral Intelligence Projects — Active Initiatives",
  description:
    "Active projects across the Polynovea ecosystem — behavioral intelligence infrastructure, live experience operations, and product development.",
  author: { "@type": "Organization", name: "Polynovea" },
  publisher: {
    "@type": "Organization",
    name: "Polynovea",
    url: "https://www.polynovea.in",
    logo: { "@type": "ImageObject", url: "https://www.polynovea.in/logo.png" },
  },
  datePublished: "2024-01-01",
  dateModified: "2026-07-28",
  url: "https://www.polynovea.in/projects",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.polynovea.in/projects" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What projects is Polynovea currently working on?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hospitality's product, the Acquisition System, is live: the Decision Framework defines what to measure and why, the Acquisition System extracts behavioral signals through a six-stage extraction-to-output pipeline, and the Optimisation System converts intelligence into measurable revenue optimisation. Infrakinetic, the Workplace domain's product, is in development.",
      },
    },
    {
      "@type": "Question",
      name: "What is the behavioral intelligence Decision Framework?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Decision Framework is the first module of Polynovea's behavioral intelligence system. It defines what behavior to measure, establishes success metrics, and sets baseline measurements before any optimization occurs. Output includes KPIs, decision criteria, and a measurement baseline for each operating environment.",
      },
    },
    {
      "@type": "Question",
      name: "What is Polynovea's Acquisition System?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Acquisition System is a behavioral signal extraction pipeline — not review sentiment analysis. It processes Google Reviews and multi-source data to extract Stimuli (what drew someone in), Frictions (what created resistance), Compensations (what people tolerate despite friction), and Emotional context (the occasion driving the visit). These signals map to five fitness dimensions and score venues using pure percentile calibration, which decouples score from review volume — a five-review venue and a five-hundred-review venue are ranked on the same true-standing basis, with confidence tracked separately via a HIGH/MED/LOW/SPARSE badge. Currently live across 11,063 venues across the Mumbai Metro Region. Output feeds a six-stage acquisition pipeline that produces a repeatable venue playbook.",
      },
    },
    {
      "@type": "Question",
      name: "What is the Optimisation System?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Optimisation System is a two-part system. Part 1 instruments the live environment by capturing POS data, venue flow, and audience behavior in real time. Part 2 converts that intelligence into measurable revenue optimisation decisions for venue operators — turning raw behavioral data into actionable recommendations.",
      },
    },
    {
      "@type": "Question",
      name: "What is Infrakinetic?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Infrakinetic is the Workplace domain's product — a full enterprise operating system covering commercial/CRM, finance (with an immutable cryptographic ledger), HR & payroll, workflow automation, governance, and marketing. Running the business through Infrakinetic generates the behavioral signal this domain's intelligence is built on, the same way the Acquisition System is built on Hospitality's data. Currently in development.",
      },
    },
  ],
};

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <main>
        <ProjectsExpanded />
      </main>
      <Footer />
    </>
  );
}
