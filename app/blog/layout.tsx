import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Intelligence & Systems Thinking",
  description:
    "Behavioral intelligence, systems thinking, and operational insights from the Polynovea team. Covering patterns in human behavior, live environments, and the infrastructure being built to understand them.",
  alternates: { canonical: "https://www.polynovea.in/blog" },
  openGraph: {
    title: "Blog | Polynovea",
    description:
      "Intelligence, systems thinking, and behavioral patterns — from the team building the Human Behavioral Intelligence Framework.",
    url: "https://www.polynovea.in/blog",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
