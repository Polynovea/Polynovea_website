import Navbar from "@/components/Navbar";
import HomeExperience from "@/components/HomeExperience";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What exactly is a behavioral intelligence operation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A closed-loop system that observes how humans make decisions, extracts the underlying patterns, and converts them into repeatable frameworks — then deploys those frameworks as products, optimisations, or client engagements. The goal is to reduce blind decision-making inside systems that should be measurable.",
      },
    },
    {
      "@type": "Question",
      name: "How does Polynovea's intelligence scale across domains?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Each domain gets its own purpose-built product — Hospitality's is the Acquisition System, live today; a Workplace product is in development. Underneath every domain's product sits a deeper, shared layer of the infrastructure that gets sharper the more domains it operates across — every new product starts smarter because of the ones before it.",
      },
    },
    {
      "@type": "Question",
      name: "Are you available for external projects or clients?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Selectively. We engage with venues, institutions, and organisations where the work generates intelligence that compounds our system. We do not take on engagements that don't fit that model. Use the contact form to start a conversation — we'll tell you directly whether there's a match.",
      },
    },
    {
      "@type": "Question",
      name: "What happens after I reach out?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We read every submission. We evaluate fit based on what you're building, what problem you're trying to solve, and whether the engagement compounds the system for both sides. If there's a match, you'll hear from us within 48 hours. No pitch decks, no discovery theatre — just a direct answer.",
      },
    },
    {
      "@type": "Question",
      name: "How do I know if Polynovea is relevant to what I'm building?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If you're operating a venue, running a business, or managing a workforce — and decisions are being made on intuition rather than structured intelligence — we're likely relevant. The ecosystem exists precisely to address that gap. Send us a message and we'll tell you directly.",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <HomeExperience />
    </>
  );
}
