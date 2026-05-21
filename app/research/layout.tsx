import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research — Behavioral Study",
  description:
    "Help Polynovea Records understand what drives live music decisions. A short behavioral study about nightlife, music, and venue experiences in India.",
  alternates: { canonical: "https://polynovearecords.in/research" },
  openGraph: {
    title: "Research | Polynovea Records",
    description:
      "16 questions about what makes a great night out — shaping how we build live experiences.",
    url: "https://polynovearecords.in/research",
  },
};

export default function ResearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
