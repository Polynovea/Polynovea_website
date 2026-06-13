import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — The Company",
  description:
    "Polynovea is an AI and data company building the Human Behavioral Intelligence Framework — infrastructure that maps human decision-making into repeatable operational systems. Polynovea Records is the cultural arm: one deployment surface of the parent ecosystem, not the parent itself.",
  alternates: { canonical: "https://www.polynovea.in/about" },
  openGraph: {
    title: "About Polynovea — The Company",
    description:
      "Polynovea is an AI and data company. Polynovea Records is the cultural deployment arm — one surface of the parent behavioral intelligence ecosystem, not the company itself.",
    url: "https://www.polynovea.in/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
