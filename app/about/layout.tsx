import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Polynovea - Deep-Tech AI & Decision Infrastructure",
  description:
    "Polynovea is a deep-tech AI, behavioral-intelligence and decision-infrastructure company. Infrakinetic is the current lead product; Hospitality is being rebuilt.",
  alternates: { canonical: "https://www.polynovea.in/about" },
  openGraph: {
    title: "About Polynovea - Deep-Tech AI & Decision Infrastructure",
    description:
      "Polynovea is a deep-tech AI, behavioral-intelligence and decision-infrastructure company. Each domain gets its own purpose-built product, all sharpening one shared intelligence layer underneath.",
    url: "https://www.polynovea.in/about",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "About Polynovea" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Polynovea - Deep-Tech AI & Decision Infrastructure",
    description:
      "Polynovea is a deep-tech AI, behavioral-intelligence and decision-infrastructure company. Each domain gets its own purpose-built product, all sharpening one shared intelligence layer underneath.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
