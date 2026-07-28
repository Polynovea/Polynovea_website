import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Behavioral Intelligence Partner",
  description:
    "Contact Polynovea to discuss behavioral intelligence partnerships, venue optimisation, or workplace intelligence. We reply within 48 hours to every message.",
  alternates: { canonical: "https://www.polynovea.in/contact" },
  openGraph: {
    title: "Contact Polynovea",
    description:
      "Work with Polynovea — behavioral intelligence infrastructure for commercial environments. Based in Navi Mumbai, India.",
    url: "https://www.polynovea.in/contact",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does Polynovea take to reply?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Polynovea reads every submission and evaluates fit based on what you're building. If there's a match, you'll hear back within 48 hours — no automated sequences, no discovery-call theatre.",
      },
    },
    {
      "@type": "Question",
      name: "Does Polynovea only work with hospitality venues?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hospitality is Polynovea's live domain today via the Acquisition System, but Infrakinetic — the Workplace domain's product — is in development. Reach out if you're operating a venue, running a business, or managing a workforce.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a cost to reach out?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Sending a message costs nothing. Polynovea evaluates fit before any engagement begins and will tell you directly whether there's a match — no obligation either way.",
      },
    },
    {
      "@type": "Question",
      name: "What should I include in my message?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tell Polynovea what you're building and what problem you're trying to solve. Specifics about your venue, business, or workforce help the team evaluate fit faster and respond with a direct answer.",
      },
    },
  ],
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
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
