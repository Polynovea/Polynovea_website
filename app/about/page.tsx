import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = dynamic(() => import("@/components/About"));

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Deep-Tech AI & Decision Infrastructure - About Polynovea",
  description:
    "Polynovea is a deep-tech AI, behavioral-intelligence and decision-infrastructure company building the Human Behavioral Intelligence Framework (HBIF). Infrakinetic is the current lead product for commercialisation; Hospitality is undergoing an architectural rebuild.",
  author: { "@type": "Organization", name: "Polynovea" },
  publisher: {
    "@type": "Organization",
    name: "Polynovea",
    url: "https://www.polynovea.in",
    logo: { "@type": "ImageObject", url: "https://www.polynovea.in/logo.png" },
  },
  datePublished: "2026-01-01",
  dateModified: "2026-07-28",
  url: "https://www.polynovea.in/about",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.polynovea.in/about" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is behavioral intelligence?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Behavioral intelligence is the systematic process of observing human decision-making patterns, extracting repeatable structures from them, and converting those structures into operational systems. Rather than relying on survey data or stated preferences, it works from observed behavior in real commercial environments.",
      },
    },
    {
      "@type": "Question",
      name: "What does Polynovea do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Polynovea is a deep-tech AI, behavioral-intelligence and decision-infrastructure company building the Human Behavioral Intelligence Framework (HBIF) - infrastructure that observes human decision-making in commercial environments, identifies repeatable behavioral patterns, and converts them into operational systems. Each domain gets its own purpose-built product. Infrakinetic (Workplace) is the current lead product for commercialisation and revenue. Hospitality is undergoing an architectural rebuild. Education is in design.",
      },
    },
    {
      "@type": "Question",
      name: "What is the Human Behavioral Intelligence Framework (HBIF)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "HBIF is domain, product, and shared intelligence. In Hospitality, the framework historically ran as three sequential modules - the Decision Framework, the Acquisition System, and the Optimisation System - now being carried into an architectural rebuild. Each new domain gets its own purpose-built version of this; Infrakinetic is the Workplace domain's version and Polynovea's current lead product for commercialisation. Every domain's product is built on a shared, deeper layer of the infrastructure that reads behavioral state directly, independent of industry, and gets sharper with every domain it operates across.",
      },
    },
    {
      "@type": "Question",
      name: "Where is Polynovea based?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Polynovea is based in Navi Mumbai, Maharashtra, India. The company was founded in 2026 by Subrojit Roy. Contact: subrojitroy@polynovea.in.",
      },
    },
    {
      "@type": "Question",
      name: "What industries does Polynovea's behavioral intelligence serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Infrakinetic, the Workplace domain's product, is Polynovea's current lead product for commercialisation and revenue. Hospitality's Acquisition System is undergoing an architectural rebuild. Education is in the design phase. Each domain gets its own purpose-built product, built on a shared underlying layer of the infrastructure that gets sharper with every domain it operates across.",
      },
    },
  ],
};

export default function AboutPage() {
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
        <About />
      </main>
      <Footer />
    </>
  );
}
