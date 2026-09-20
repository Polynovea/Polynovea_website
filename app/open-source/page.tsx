import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OpenSourceExpanded from "@/components/OpenSourceExpanded";

export const metadata: Metadata = {
  title: "Open Source - Self-Hosted CMS & Content Infrastructure",
  description:
    "Open-source, self-hostable software from Polynovea. The first project is a headless CMS and structured-content platform for schemas, workflows, releases, APIs and delivery operations.",
  alternates: { canonical: "https://www.polynovea.in/open-source" },
  openGraph: {
    title: "Polynovea Open Source",
    description:
      "Open-source, self-hostable software from Polynovea, beginning with a headless CMS and structured-content platform for governed content operations.",
    url: "https://www.polynovea.in/open-source",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Polynovea Open Source" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Polynovea Open Source",
    description:
      "Open-source, self-hostable software from Polynovea, beginning with a headless CMS and structured-content platform.",
  },
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Polynovea Open Source",
  description:
    "The directory for open-source software from Polynovea, including the upcoming Content Operations Platform.",
  url: "https://www.polynovea.in/open-source",
  isPartOf: {
    "@type": "WebSite",
    name: "Polynovea",
    url: "https://www.polynovea.in",
  },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Content Operations Platform",
        description:
          "An upcoming open-source, self-hostable headless CMS and structured-content platform from Polynovea.",
        url: "https://www.polynovea.in/open-source#content-operations-platform",
      },
    ],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.polynovea.in",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Open Source",
      item: "https://www.polynovea.in/open-source",
    },
  ],
};

export default function OpenSourcePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />
      <main id="main-content">
        <OpenSourceExpanded />
      </main>
      <Footer />
    </>
  );
}
