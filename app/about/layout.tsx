import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Behavioral Intelligence Company — About Polynovea",
  description:
    "Polynovea is a behavioral intelligence company building the Human Behavioral Intelligence Framework (HBIF) — infrastructure that maps human decision-making into repeatable operational systems. Based in Navi Mumbai, India.",
  alternates: { canonical: "https://www.polynovea.in/about" },
  openGraph: {
    title: "About Polynovea — Behavioral Intelligence Company",
    description:
      "Polynovea is an AI and data company building the HBIF. Polynovea Records is the cultural deployment arm — one surface of the parent behavioral intelligence ecosystem, not the company itself.",
    url: "https://www.polynovea.in/about",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "About Polynovea" }],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
