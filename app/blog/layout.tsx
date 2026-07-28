import type { Metadata } from "next";

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Behavioral Intelligence Blog | Polynovea",
  description:
    "Behavioral intelligence insights, systems thinking, and operational patterns from Polynovea.",
  url: "https://www.polynovea.in/blog",
  publisher: {
    "@type": "Organization",
    name: "Polynovea",
    url: "https://www.polynovea.in",
    logo: { "@type": "ImageObject", url: "https://www.polynovea.in/logo.png" },
  },
  author: { "@type": "Organization", name: "Polynovea Intelligence Team" },
  dateModified: "2026-07-28",
  inLanguage: "en",
};

export const metadata: Metadata = {
  title: "Behavioral Intelligence Blog — Insights",
  description:
    "Behavioral intelligence insights, systems thinking, and operational patterns from the Polynovea team — covering decision frameworks, HBIF, and venue data.",
  alternates: { canonical: "https://www.polynovea.in/blog" },
  openGraph: {
    title: "Behavioral Intelligence Blog | Polynovea",
    description:
      "Intelligence, systems thinking, and behavioral patterns — from the team building the Human Behavioral Intelligence Framework.",
    url: "https://www.polynovea.in/blog",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Polynovea Blog" }],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What topics does the Polynovea blog cover?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The blog covers behavioral intelligence as a discipline — how it differs from sentiment analysis and traditional analytics, systems thinking, decision frameworks, and operational patterns from building the Human Behavioral Intelligence Framework.",
      },
    },
    {
      "@type": "Question",
      name: "How often does Polynovea publish new content?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "New posts are published as the team develops real findings from operating the Acquisition System and building HBIF — not on a fixed weekly schedule, so each post reflects genuine progress rather than filler content.",
      },
    },
    {
      "@type": "Question",
      name: "Who writes the Polynovea blog?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Posts are written by the Polynovea Intelligence Team, the same group building and operating the Human Behavioral Intelligence Framework and the Acquisition System.",
      },
    },
  ],
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
