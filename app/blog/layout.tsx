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
  dateModified: "2026-06-27",
  inLanguage: "en",
};

export const metadata: Metadata = {
  title: "Behavioral Intelligence Blog — Systems & Patterns",
  description:
    "Behavioral intelligence insights, systems thinking, and operational patterns from Polynovea. Covering human behavior in live environments, decision frameworks, and the intelligence infrastructure behind the HBIF.",
  alternates: { canonical: "https://www.polynovea.in/blog" },
  openGraph: {
    title: "Behavioral Intelligence Blog | Polynovea",
    description:
      "Intelligence, systems thinking, and behavioral patterns — from the team building the Human Behavioral Intelligence Framework.",
    url: "https://www.polynovea.in/blog",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Polynovea Blog" }],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      {children}
    </>
  );
}
