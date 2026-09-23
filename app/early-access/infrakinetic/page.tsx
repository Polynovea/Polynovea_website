import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPublicEarlyAccessCount } from "@/lib/earlyAccess";
import InfrakineticEarlyAccessClient from "./InfrakineticEarlyAccessClient";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Infrakinetic Early Access | Polynovea",
  description:
    "Join Infrakinetic Controlled Early Access for upcoming onboarding cohorts. Tell Polynovea which engines you need, what you use today and the operating problem you want to solve.",
  keywords: [
    "Infrakinetic early access",
    "Infrakinetic waitlist",
    "enterprise software early access",
    "business operating platform",
    "controlled onboarding",
  ],
  alternates: {
    canonical: "https://www.polynovea.in/early-access/infrakinetic",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Join Infrakinetic Controlled Early Access",
    description:
      "Register your organisation for an upcoming Infrakinetic onboarding cohort and tell us which engines and operating problems matter most.",
    url: "https://www.polynovea.in/early-access/infrakinetic",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Join Infrakinetic Controlled Early Access",
    description:
      "Register your organisation for an upcoming Infrakinetic onboarding cohort.",
  },
};

export default async function InfrakineticEarlyAccessPage() {
  const earlyAccessCount = await getPublicEarlyAccessCount();

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.polynovea.in/early-access/infrakinetic#webpage",
    url: "https://www.polynovea.in/early-access/infrakinetic",
    name: "Infrakinetic Controlled Early Access",
    description:
      "An explicit registration programme for organisations that want to be considered for controlled Infrakinetic onboarding cohorts. Briefing and general contact requests do not join the Early Access list.",
    isPartOf: { "@id": "https://www.polynovea.in/#organization" },
    about: {
      "@type": "SoftwareApplication",
      name: "Infrakinetic",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: "https://www.infrakinetic.in/",
      provider: { "@id": "https://www.polynovea.in/#organization" },
    },
    potentialAction: {
      "@type": "RegisterAction",
      name: "Join Infrakinetic Early Access",
      target: "https://www.polynovea.in/early-access/infrakinetic",
    },
    ...(earlyAccessCount !== null
      ? {
          interactionStatistic: {
            "@type": "InteractionCounter",
            interactionType: { "@type": "RegisterAction" },
            userInteractionCount: earlyAccessCount,
          },
        }
      : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <InfrakineticEarlyAccessClient initialCount={earlyAccessCount} />
      <Footer />
    </>
  );
}
