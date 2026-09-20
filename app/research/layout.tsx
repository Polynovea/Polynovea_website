import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HBIF Research - Behavioural Intelligence Research Programme",
  description:
    "Polynovea's HBIF research programme: executable behavioural experiments, the Behavioral Phase Model, cross-domain testing and explicit evidence boundaries around what is implemented, hypothesised and unproven.",
  alternates: { canonical: "https://www.polynovea.in/research" },
  openGraph: {
    title: "HBIF Research | Polynovea",
    description:
      "A public overview of Polynovea's behavioural-intelligence research programme, current evidence state and cross-domain validation boundaries.",
    url: "https://www.polynovea.in/research",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "HBIF Research" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HBIF Research | Polynovea",
    description:
      "Implemented experiments, research engineering and the questions Polynovea has not yet proved.",
  },
};

export default function ResearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
