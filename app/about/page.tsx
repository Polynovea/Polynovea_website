import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = dynamic(() => import("@/components/About"));

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Behavioral Intelligence Company — About Polynovea",
  description:
    "Polynovea is a behavioral intelligence company building the Human Behavioral Intelligence Framework (HBIF) — infrastructure that maps human decision-making into repeatable operational systems.",
  author: { "@type": "Organization", name: "Polynovea" },
  publisher: {
    "@type": "Organization",
    name: "Polynovea",
    url: "https://www.polynovea.in",
    logo: { "@type": "ImageObject", url: "https://www.polynovea.in/logo.png" },
  },
  datePublished: "2023-01-01",
  dateModified: "2026-06-27",
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
        text: "Polynovea builds the Human Behavioral Intelligence Framework (HBIF) — infrastructure that observes human decision-making in commercial environments, identifies repeatable behavioral patterns, and converts them into operational systems. Hospitality is the first live domain. Music and live events are the second. Education and workplace environments are in design.",
      },
    },
    {
      "@type": "Question",
      name: "What is the Human Behavioral Intelligence Framework (HBIF)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The HBIF is Polynovea's behavioral intelligence infrastructure — three sequential modules that convert raw behavioral signals into operational intelligence. The Decision Framework defines what to measure. The Acquisition System extracts and models behavioral signals from commercial environments. The Optimisation System generates recommendations and learns from observed outcomes. It is domain-agnostic: the same framework deploys across hospitality, music, education, and workplace environments.",
      },
    },
    {
      "@type": "Question",
      name: "What is Polynovea Records?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Polynovea Records is the cultural and IP execution layer of the Polynovea ecosystem — not the parent company. It converts behavioral intelligence from live environments into artist development, owned IP, and audience assets. It is the music-facing identity of a broader behavioral intelligence operation.",
      },
    },
    {
      "@type": "Question",
      name: "Where is Polynovea based?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Polynovea is based in Navi Mumbai, Maharashtra, India. The company was founded in 2023 by Subrojit Roy. Contact: subrojitroy@polynovea.in.",
      },
    },
    {
      "@type": "Question",
      name: "What industries does Polynovea's behavioral intelligence serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Polynovea currently operates live in Hospitality and Music/Live Events. Education Intelligence and Workplace Intelligence are in the design phase. The HBIF infrastructure is built to be domain-agnostic — it does not require a rebuild to deploy across new industries.",
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
