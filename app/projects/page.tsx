import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ProjectsExpanded from "@/components/ProjectsExpanded";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Infrakinetic Enterprise Operating System - Products",
  description:
    "Polynovea's products - Infrakinetic, the Workplace domain's product and current commercial lead, and Hospitality, undergoing an architectural rebuild.",
  alternates: { canonical: "https://www.polynovea.in/projects" },
  openGraph: {
    title: "Infrakinetic Enterprise Operating System - Products | Polynovea",
    description:
      "Polynovea's products across domains - Infrakinetic as the current commercial lead, Hospitality's architectural rebuild, and the shared intelligence layer underneath both.",
    url: "https://www.polynovea.in/projects",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Polynovea Projects" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Infrakinetic Enterprise Operating System - Products | Polynovea",
    description:
      "Polynovea's products across domains - Infrakinetic as the current commercial lead, Hospitality's architectural rebuild, and the shared intelligence layer underneath both.",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Infrakinetic Enterprise Operating System - Polynovea Products",
  description:
    "Polynovea's products - Infrakinetic, the Workplace domain's product and current commercial lead, and Hospitality, undergoing an architectural rebuild.",
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
        text: "Infrakinetic, the Workplace domain's product, is Polynovea's current lead product for commercialisation and revenue. Hospitality's historical product - the Decision Framework, the Acquisition System, and the Optimisation System - is undergoing an architectural rebuild; the six-stage extraction pipeline and revenue-optimisation mechanics described below are reference assets from that build.",
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
        text: "The Acquisition System is a behavioral signal extraction pipeline - not review sentiment analysis. It processes Google Reviews and multi-source data to extract Stimuli (what drew someone in), Frictions (what created resistance), Compensations (what people tolerate despite friction), and Emotional context (the occasion driving the visit). These signals map to five fitness dimensions and score venues using pure percentile calibration, which decouples score from review volume - a five-review venue and a five-hundred-review venue are ranked on the same true-standing basis, with confidence tracked separately via a HIGH/MED/LOW/SPARSE badge. Currently live across 11,063 venues across the Mumbai Metro Region. Output feeds a six-stage acquisition pipeline that produces a repeatable venue playbook.",
      },
    },
    {
      "@type": "Question",
      name: "What is the Optimisation System?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Optimisation System is a two-part system. Part 1 instruments the live environment by capturing POS data, venue flow, and audience behavior in real time. Part 2 converts that intelligence into measurable revenue optimisation decisions for venue operators - turning raw behavioral data into actionable recommendations.",
      },
    },
    {
      "@type": "Question",
      name: "What is Infrakinetic?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Infrakinetic is the Workplace domain's product and Polynovea's current lead product for commercialisation and revenue - a full enterprise operating system covering commercial/CRM, finance (with an immutable cryptographic ledger), HR & payroll, workflow automation, governance, and marketing. Running the business through Infrakinetic generates the behavioral signal this domain's intelligence is built on, the same way the Acquisition System was built on Hospitality's data.",
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
