import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Work With Us",
  description:
    "Get in touch with Polynovea — the AI and data company building the Human Behavioral Intelligence Framework. We work with venues, commercial partners, and institutions across India.",
  alternates: { canonical: "https://www.polynovea.in/contact" },
  openGraph: {
    title: "Contact Polynovea",
    description:
      "Work with Polynovea — behavioral intelligence infrastructure for commercial environments. Based in Navi Mumbai, India.",
    url: "https://www.polynovea.in/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
