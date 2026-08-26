import type { Metadata } from "next";
import TermsOfUse from "@/components/TermsOfUse";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms governing your use of the Polynovea website, including the research survey, blog content, intellectual property, and governing law.",
  alternates: {
    canonical: "https://www.polynovea.in/terms",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return <TermsOfUse />;
}
