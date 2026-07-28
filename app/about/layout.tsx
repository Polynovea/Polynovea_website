import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Behavioral Intelligence Company — About Us",
  description:
    "Polynovea builds the Human Behavioral Intelligence Framework — infrastructure mapping human decision-making into repeatable, compounding operational systems.",
  alternates: { canonical: "https://www.polynovea.in/about" },
  openGraph: {
    title: "About Polynovea — Behavioral Intelligence Company",
    description:
      "Polynovea is an AI and data company building the HBIF — each domain gets its own purpose-built product, all sharpening one shared intelligence layer underneath.",
    url: "https://www.polynovea.in/about",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "About Polynovea" }],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
