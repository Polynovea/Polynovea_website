import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArchitectureDeepDive from "@/components/ArchitectureDeepDive";

export const metadata: Metadata = {
  title: "HBIF Architecture - Human Behavioural Intelligence Framework",
  description:
    "How Polynovea's Human Behavioural Intelligence Framework is structured: domain-specific Layer 1 products, Layer 2 shared behavioural state and dynamics, and evidence-gated Layer 3 frontier research.",
  alternates: { canonical: "https://www.polynovea.in/architecture" },
  openGraph: {
    title: "HBIF Architecture | Polynovea",
    description:
      "Domain-specific reality, shared behavioural-state research and frontier decision-mechanism research - with cross-domain transfer earned through evidence rather than assumed.",
    url: "https://www.polynovea.in/architecture",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "HBIF Architecture" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HBIF Architecture | Polynovea",
    description:
      "The current three-layer public architecture of the Human Behavioural Intelligence Framework.",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "HBIF Architecture - Human Behavioural Intelligence Framework",
  description:
    "The current public HBIF architecture: domain-specific Layer 1, shared behavioural-state and dynamics research at Layer 2, and evidence-gated frontier research at Layer 3.",
  author: { "@type": "Organization", name: "Polynovea" },
  publisher: {
    "@type": "Organization",
    name: "Polynovea",
    url: "https://www.polynovea.in",
    logo: { "@type": "ImageObject", url: "https://www.polynovea.in/logo.png" },
  },
  datePublished: "2026-01-01",
  dateModified: "2026-09-19",
  url: "https://www.polynovea.in/architecture",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.polynovea.in/architecture" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is HBIF a finished theory of human behaviour?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. HBIF is an evolving behavioural-intelligence framework and research architecture. Polynovea has implemented experimental infrastructure and domain evidence, but cross-domain validity remains unproven and the company does not claim a solved universal model of human behaviour.",
      },
    },
    {
      "@type": "Question",
      name: "What is Layer 1 in HBIF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Layer 1 is domain-specific product and domain intelligence. Each domain keeps its own ontology, state, workflows, interfaces, evidence and validation programme. Current examples include Infrakinetic for Workplace and Hospitality under architectural rebuild.",
      },
    },
    {
      "@type": "Question",
      name: "What is Layer 2 in HBIF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Layer 2 is shared behavioural state and dynamics research. The Behavioral Phase Model is the current technical reference. Layer 2 is intended to become useful across domains where the evidence supports that abstraction, but it is not described as universally validated.",
      },
    },
    {
      "@type": "Question",
      name: "What is Layer 3 in HBIF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Layer 3 is evidence-gated frontier research into deeper human decision and behavioural mechanisms, including the Psychological Decoder and mathematics, physics and dynamical-systems research. Layer 3 research is not automatically a product feature.",
      },
    },
    {
      "@type": "Question",
      name: "Does every Polynovea product automatically make HBIF smarter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Domain learning can become a candidate for cross-domain research, but transfer is earned through replication, falsification, uncertainty calibration and other evidence gates. Some mechanisms may transfer and others may remain domain-specific or fail.",
      },
    },
    {
      "@type": "Question",
      name: "Does product usage automatically grant HBIF research rights?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Standard product use does not grant unrestricted research rights. Research participation and permitted data or derived evidence classes must be separately defined, contractually governed and privacy-aware.",
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
