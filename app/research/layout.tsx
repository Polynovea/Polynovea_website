import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Behavioral Study - Nightlife Research India",
  description:
    "Help Polynovea understand what drives nightlife and venue decisions in India. A short behavioral study feeding the Human Behavioral Intelligence Framework.",
  alternates: { canonical: "https://www.polynovea.in/research" },
  openGraph: {
    title: "Research | Polynovea",
    description:
      "16 questions about what makes a great night out - shaping how we build behavioral intelligence from live environments.",
    url: "https://www.polynovea.in/research",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does the behavioral study take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The study is 16 short questions about what makes a great night out - most people complete it in under three minutes. There are no long-form answers required, just quick single-choice and multi-choice questions.",
      },
    },
    {
      "@type": "Question",
      name: "Is my data anonymous?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Responses feed the Human Behavioral Intelligence Framework in aggregate - no personally identifying information is required to participate or published in any research output.",
      },
    },
    {
      "@type": "Question",
      name: "Why does Polynovea run this study?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Polynovea's Acquisition System reads behavioral signals from reviews, but this study captures decision-making directly from people themselves - what triggers a night out, what keeps them at a venue, and what makes them leave.",
      },
    },
    {
      "@type": "Question",
      name: "Who can participate in the study?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Anyone who goes out to restaurants, bars, or live venues in India can participate - the study is designed around real nightlife and dining decisions, not a specific city or demographic.",
      },
    },
  ],
};

export default function ResearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
