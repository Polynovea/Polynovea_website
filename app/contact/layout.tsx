import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discuss Your Infrakinetic Deployment - Contact Polynovea",
  description:
    "Contact Polynovea to discuss behavioral intelligence partnerships, venue optimisation, or workplace intelligence. We reply within 48 hours to every message.",
  alternates: { canonical: "https://www.polynovea.in/contact" },
  openGraph: {
    title: "Discuss Your Infrakinetic Deployment - Contact Polynovea",
    description:
      "Work with Polynovea - behavioral intelligence infrastructure for commercial environments. Based in Navi Mumbai, India.",
    url: "https://www.polynovea.in/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Discuss Your Infrakinetic Deployment - Contact Polynovea",
    description:
      "Work with Polynovea - behavioral intelligence infrastructure for commercial environments. Based in Navi Mumbai, India.",
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
        text: "Polynovea reads every submission and evaluates fit based on what you're building. If there's a match, you'll hear back within 48 hours - no automated sequences, no discovery-call theatre.",
      },
    },
    {
      "@type": "Question",
      name: "Does Polynovea only work with hospitality venues?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No - Infrakinetic, the Workplace domain's product, is Polynovea's current lead product for commercialisation and revenue. Hospitality's Acquisition System is undergoing an architectural rebuild. Reach out if you're operating a venue, running a business, or managing a workforce.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a cost to reach out?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Sending a message costs nothing. Polynovea evaluates fit before any engagement begins and will tell you directly whether there's a match - no obligation either way.",
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
    {
      "@type": "Question",
      name: "What happens after I request an Infrakinetic product evaluation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The team reviews what you've shared about your current systems and operating problem, then replies directly with whether Infrakinetic is a fit and what a product review or deployment discussion would look like next.",
      },
    },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Contact Polynovea - Discuss Your Infrakinetic Deployment",
  description:
    "Reach Polynovea to discuss whether Infrakinetic, our enterprise operating system, is a fit for your organisation's operating environment.",
  author: { "@type": "Organization", name: "Polynovea" },
  publisher: {
    "@type": "Organization",
    name: "Polynovea",
    url: "https://www.polynovea.in",
    logo: { "@type": "ImageObject", url: "https://www.polynovea.in/logo.png" },
  },
  datePublished: "2026-01-01",
  dateModified: "2026-08-20",
  url: "https://www.polynovea.in/contact",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.polynovea.in/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
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
      {children}
    </>
  );
}
