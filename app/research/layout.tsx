import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research — Behavioral Study",
  description:
    "Help Polynovea understand what drives live entertainment decisions. A short behavioral study about nightlife, music, and venue experiences in India — feeding the Human Behavioral Intelligence Framework.",
  alternates: { canonical: "https://www.polynovea.in/research" },
  openGraph: {
    title: "Research | Polynovea",
    description:
      "16 questions about what makes a great night out — shaping how we build behavioral intelligence from live environments.",
    url: "https://www.polynovea.in/research",
  },
};

export default function ResearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
