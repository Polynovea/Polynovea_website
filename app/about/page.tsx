import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = dynamic(() => import("@/components/About"));

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "About Polynovea - Products, Open Infrastructure and HBIF Research",
  description:
    "Polynovea is a deep-tech AI, data, behavioural-intelligence and decision-infrastructure company building commercially independent products alongside HBIF, its longer-horizon behavioural-intelligence research architecture.",
  author: { "@type": "Organization", name: "Polynovea" },
  publisher: {
    "@type": "Organization",
    name: "Polynovea",
    url: "https://www.polynovea.in",
    logo: { "@type": "ImageObject", url: "https://www.polynovea.in/logo.png" },
  },
  datePublished: "2026-01-01",
  dateModified: "2026-09-19",
  url: "https://www.polynovea.in/about",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.polynovea.in/about" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does Polynovea do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Polynovea is a deep-tech AI, data, behavioural-intelligence and decision-infrastructure company. It builds commercially independent products and open infrastructure alongside HBIF, a longer-horizon research architecture for studying behavioural state, dynamics and decision mechanisms.",
      },
    },
    {
      "@type": "Question",
      name: "What is the Human Behavioural Intelligence Framework (HBIF)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "HBIF is Polynovea's broader behavioural-intelligence framework. Layer 1 is domain-specific product and domain intelligence. Layer 2 is shared behavioural state and dynamics, with the Behavioral Phase Model as the current technical reference. Layer 3 is evidence-gated frontier research. HBIF is not presented as a finished universal theory of human behaviour.",
      },
    },
    {
      "@type": "Question",
      name: "What is Polynovea's current commercial priority?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Infrakinetic-first commercialisation and revenue. Infrakinetic is Polynovea's Workplace Layer 1 operating system and its Phase 1 programme milestone is complete.",
      },
    },
    {
      "@type": "Question",
      name: "What is Polynovea's Content Operations Platform?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It is an upcoming open-source and self-hostable content-operations platform. A managed Polynovea Cloud SaaS is planned alongside the OSS edition rather than replacing the self-hosted path.",
      },
    },
    {
      "@type": "Question",
      name: "Does using a Polynovea product automatically contribute data to HBIF research?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Standard product use does not automatically grant unrestricted research rights. Research participation and permitted evidence use are separate, explicit and governed.",
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
