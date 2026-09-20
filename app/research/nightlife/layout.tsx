import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nightlife Behaviour Study - India",
  description:
    "A short Polynovea research study about nightlife and venue decisions in India, preserved as a Hospitality-domain research input.",
  alternates: { canonical: "https://www.polynovea.in/research/nightlife" },
  openGraph: {
    title: "Nightlife Behaviour Study | Polynovea",
    description:
      "16 questions about what shapes a night out - a voluntary Hospitality-domain behavioural study from Polynovea.",
    url: "https://www.polynovea.in/research/nightlife",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does the nightlife behaviour study take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The study contains 16 short questions and most people complete it in a few minutes.",
      },
    },
    {
      "@type": "Question",
      name: "Is personally identifying information required?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No personally identifying information is required to complete the study. Responses are intended to be analysed in aggregate for the Hospitality research programme under the study's stated terms.",
      },
    },
    {
      "@type": "Question",
      name: "Why does Polynovea run this study?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The study captures self-reported decision context around nightlife and venue choices as one Hospitality-domain evidence source alongside other behavioural and operational research inputs.",
      },
    },
    {
      "@type": "Question",
      name: "Who can participate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The study is designed for people who visit restaurants, bars or live venues in India.",
      },
    },
  ],
};

export default function NightlifeResearchLayout({ children }: { children: React.ReactNode }) {
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
