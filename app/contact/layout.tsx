import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Work With Us",
  description:
    "Get in touch with Polynovea Records. We work with venues, independent artists, brands, and partners across India.",
  alternates: { canonical: "https://polynovearecords.in/contact" },
  openGraph: {
    title: "Contact Polynovea Records",
    description:
      "Work with us — venues, artists, brands, and partners. Based in Navi Mumbai, India.",
    url: "https://polynovearecords.in/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
