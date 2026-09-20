import type { Metadata } from "next";

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Insights | Polynovea",
  description:
    "Product, engineering and behavioural-intelligence research insights from Polynovea.",
  url: "https://www.polynovea.in/blog",
  publisher: {
    "@type": "Organization",
    name: "Polynovea",
    url: "https://www.polynovea.in",
    logo: { "@type": "ImageObject", url: "https://www.polynovea.in/logo.png" },
  },
  author: { "@type": "Organization", name: "Polynovea Intelligence Team" },
  dateModified: "2026-09-19",
  inLanguage: "en",
};

export const metadata: Metadata = {
  title: "Insights - Products, Engineering & HBIF Research",
  description:
    "Product, engineering and research notes from Polynovea - covering Infrakinetic, open-source content operations, HBIF, decision infrastructure and systems thinking.",
  alternates: { canonical: "https://www.polynovea.in/blog" },
  openGraph: {
    title: "Insights | Polynovea",
    description:
      "Products, engineering, systems thinking and behavioural-intelligence research from Polynovea.",
    url: "https://www.polynovea.in/blog",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Polynovea Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights | Polynovea",
    description:
      "Products, engineering, systems thinking and behavioural-intelligence research from Polynovea.",
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
        text: "The blog covers Polynovea's product, engineering and research work: Infrakinetic, open-source content operations, HBIF research, decision infrastructure, governance, systems thinking and lessons from building real operating software.",
      },
    },
    {
      "@type": "Question",
      name: "How often does Polynovea publish new content?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "New posts are published around meaningful product, engineering and research developments across Infrakinetic, the Content Operations Platform, Hospitality and HBIF rather than on a fixed filler-driven schedule.",
      },
    },
    {
      "@type": "Question",
      name: "Who writes the Polynovea blog?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Posts are written by the Polynovea team working across products, engineering and HBIF research. Individual articles should preserve the evidence state of the work they discuss rather than turning research hypotheses into product claims.",
      },
    },
    {
      "@type": "Question",
      name: "Is the Polynovea blog only about Hospitality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The blog covers enterprise systems, open-source infrastructure and decision architecture alongside behavioural-intelligence research - reflecting work across Infrakinetic, the Content Operations Platform, Hospitality and HBIF.",
      },
    },
    {
      "@type": "Question",
      name: "Can I get notified about new Polynovea blog posts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There is no email subscription yet. Check back on the blog directly, or reach out through the contact page to ask about specific topics you're interested in.",
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
