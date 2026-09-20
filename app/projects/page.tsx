import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ProjectsExpanded from "@/components/ProjectsExpanded";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Products - Infrakinetic & Hospitality",
  description:
    "Polynovea's domain-product portfolio: Infrakinetic, the current Workplace commercial lead, and Hospitality, a domain product under architectural rebuild. Open-source software lives in a separate Polynovea Open Source directory.",
  alternates: { canonical: "https://www.polynovea.in/projects" },
  openGraph: {
    title: "Products | Polynovea",
    description:
      "Explore Polynovea's domain products: Infrakinetic for connected business operations and Hospitality under architectural rebuild.",
    url: "https://www.polynovea.in/projects",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Polynovea Products" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Products | Polynovea",
    description:
      "Infrakinetic is Polynovea's current commercial lead; Hospitality remains a separate domain product under architectural rebuild.",
  },
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Polynovea Products",
  description:
    "The current domain-product portfolio from Polynovea, including Infrakinetic and the Hospitality rebuild.",
  url: "https://www.polynovea.in/projects",
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
        name: "Infrakinetic",
        description:
          "Polynovea's current commercial lead: a unified business operating environment for commercial, financial, workforce, workflow, governance, document and customer operations.",
        url: "https://www.infrakinetic.in/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Hospitality",
        description:
          "A Polynovea domain product area under architectural rebuild; earlier systems remain historical product and research lineage.",
        url: "https://www.polynovea.in/projects#hospitality",
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
      name: "Products",
      item: "https://www.polynovea.in/projects",
    },
  ],
};

export default function ProjectsPage() {
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
        <ProjectsExpanded />
      </main>
      <Footer />
    </>
  );
}
