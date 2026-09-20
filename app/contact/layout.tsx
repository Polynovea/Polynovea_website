import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Polynovea - Products, Research & Partnerships",
  description:
    "Contact Polynovea about Infrakinetic, the upcoming open-source Content Operations Platform, HBIF research collaborations, research-partner enquiries or broader partnerships.",
  alternates: { canonical: "https://www.polynovea.in/contact" },
  openGraph: {
    title: "Contact Polynovea",
    description:
      "Product, open-source, research and partnership enquiries for Polynovea.",
    url: "https://www.polynovea.in/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Polynovea",
    description:
      "Talk to Polynovea about Infrakinetic, open-source infrastructure, HBIF research or partnerships.",
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
        text: "Polynovea reads every submission and routes product, research and partnership enquiries to the appropriate part of the team. If there is a fit, the team aims to reply within 48 hours.",
      },
    },
    {
      "@type": "Question",
      name: "Does Polynovea only work on Infrakinetic?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Infrakinetic is the current commercial lead; Polynovea is also preparing the Content Operations Platform for open-source distribution, rebuilding its Hospitality product, and running the HBIF research programme.",
      },
    },
    {
      "@type": "Question",
      name: "Can I contact Polynovea about the Content Operations Platform?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The contact form includes a Content Operations Platform and open-source enquiry option. The platform is upcoming rather than presented as generally available today.",
      },
    },
    {
      "@type": "Question",
      name: "Can I contact Polynovea about HBIF research?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Academic, research and research-partner enquiries can be submitted through the contact form. Research participation and data permissions are separately governed from ordinary product access.",
      },
    },
    {
      "@type": "Question",
      name: "What happens after I request an Infrakinetic product evaluation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The team reviews your current systems and operating problem, then responds with whether Infrakinetic is a fit and what a product review or deployment discussion would look like next.",
      },
    },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Polynovea",
  description:
    "Contact Polynovea about products, open-source infrastructure, behavioural-intelligence research or partnerships.",
  url: "https://www.polynovea.in/contact",
  dateModified: "2026-09-19",
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
