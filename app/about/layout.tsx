import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Who We Are",
  description:
    "Polynovea Records is an independent music label and intelligence company based in Navi Mumbai, India. Learn about our team, mission, and approach.",
  alternates: { canonical: "https://polynovearecords.in/about" },
  openGraph: {
    title: "About Polynovea Records",
    description:
      "Independent music label and intelligence company based in Navi Mumbai, India.",
    url: "https://polynovearecords.in/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
