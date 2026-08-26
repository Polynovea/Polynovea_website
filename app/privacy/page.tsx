import type { Metadata } from "next";
import PrivacyPolicy from "@/components/PrivacyPolicy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Polynovea collects, uses, stores, and protects personal data submitted through this website, and how to exercise your rights under India's Digital Personal Data Protection Act, 2023.",
  alternates: {
    canonical: "https://www.polynovea.in/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return <PrivacyPolicy />;
}
