import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Polynovea - Products, Open Infrastructure & HBIF Research",
  description:
    "Polynovea is a deep-tech AI, data, behavioural-intelligence and decision-infrastructure company. Infrakinetic is the current commercial lead, the Content Operations Platform is moving toward open source, and HBIF is the longer-horizon research architecture.",
  alternates: { canonical: "https://www.polynovea.in/about" },
  openGraph: {
    title: "About Polynovea",
    description:
      "Commercial products, open infrastructure and evidence-gated behavioural-intelligence research - built as one company without collapsing product claims into research claims.",
    url: "https://www.polynovea.in/about",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "About Polynovea" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Polynovea",
    description:
      "Products that create independent value. Research that has to earn its claims.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
