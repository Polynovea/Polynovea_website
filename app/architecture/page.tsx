import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArchitectureDeepDive from "@/components/ArchitectureDeepDive";

export const metadata: Metadata = {
  title: "Human Behavioral Intelligence Framework Architecture",
  description:
    "How Polynovea's Human Behavioral Intelligence Framework works: domain-specific Layer 1 products - including Infrakinetic, the current commercial lead - built on a shared intelligence layer.",
  alternates: { canonical: "https://www.polynovea.in/architecture" },
  openGraph: {
    title: "Human Behavioral Intelligence Framework Architecture | Polynovea",
    description:
      "The HBIF architecture explained - domain-specific Layer 1 products, the behavioral signal pipeline, and the continuous learning loop that improves every cycle.",
    url: "https://www.polynovea.in/architecture",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Polynovea Architecture" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Human Behavioral Intelligence Framework Architecture | Polynovea",
    description:
      "The HBIF architecture explained - domain-specific Layer 1 products, the behavioral signal pipeline, and the continuous learning loop that improves every cycle.",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Human Behavioral Intelligence Framework Architecture - How the HBIF Works",
  description:
    "How Polynovea's Human Behavioral Intelligence Framework works: domain-specific Layer 1 products - including Infrakinetic, the current commercial lead - built on a shared intelligence layer.",
  author: { "@type": "Organization", name: "Polynovea" },
  publisher: {
    "@type": "Organization",
    name: "Polynovea",
    url: "https://www.polynovea.in",
    logo: { "@type": "ImageObject", url: "https://www.polynovea.in/logo.png" },
  },
  datePublished: "2024-01-01",
  dateModified: "2026-07-28",
  url: "https://www.polynovea.in/architecture",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.polynovea.in/architecture" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Behavioral Intelligence?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Behavioral Intelligence is the systematic observation, modelling, and interpretation of human decision-making to generate actionable operational intelligence. It differs from conventional analytics by explaining the mechanisms behind decisions - not just recording their outcomes.",
      },
    },
    {
      "@type": "Question",
      name: "What is the HBIF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Human Behavioral Intelligence Framework (HBIF) is Polynovea's behavioral intelligence infrastructure. It comprises three modules - the Decision Framework, the Acquisition System, and the Optimisation System - each taking the output of the previous as its input to create a continuous intelligence pipeline.",
      },
    },
    {
      "@type": "Question",
      name: "What is the behavioral intelligence pipeline?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The HBIF intelligence pipeline transforms raw human behavior into operational recommendations through a continuous sequence: Commercial Environment → Human Behaviour → Behavioural Signals → Decision Framework → Acquisition System → Behavioural Intelligence → Optimisation System → Recommendations → Observed Outcomes → Continuous Learning.",
      },
    },
    {
      "@type": "Question",
      name: "What is Polynovea's acquisition pipeline?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Polynovea's acquisition pipeline runs in six stages - Signal Extraction, Pattern Clustering, Governance Validation, Behavioral Scoring, Similarity Enrichment, and Output & Intervention Playbooks. It extracts multi-source behavioral signals from commercial environments, structures them through an ontology layer, and scores venues using pure percentile calibration across fitness dimensions and audience archetypes - decoupling score from review volume so new or low-review venues are ranked on true signal, not penalized for data sparsity. The output is a repeatable venue playbook.",
      },
    },
    {
      "@type": "Question",
      name: "Which industries does Polynovea's behavioral intelligence infrastructure serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Infrakinetic, the Workplace domain's product, is Polynovea's current lead product for commercialisation and revenue. Hospitality's Acquisition System is undergoing an architectural rebuild. Education is in design. Each domain gets its own purpose-built product, not a redeployment of an existing one - but every product is built on a shared underlying layer of the infrastructure that gets sharper with every domain it operates across.",
      },
    },
    {
      "@type": "Question",
      name: "How is Behavioral Intelligence different from sentiment analysis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sentiment analysis classifies reviews as positive or negative. The HBIF Acquisition System extracts behavioral signals: Stimuli (what drew someone in), Frictions (what created resistance), Compensations (what people tolerate despite friction), and Emotional context (the occasion driving the visit). The output is a behavioral fingerprint - not a sentiment score. The pipeline currently covers 11,063 venues across the Mumbai Metro Region.",
      },
    },
  ],
};

export default function ArchitecturePage() {
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
      <ArchitectureDeepDive />
      <Footer />
    </>
  );
}
