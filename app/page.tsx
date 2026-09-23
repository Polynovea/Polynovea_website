import Navbar from "@/components/Navbar";
import HomeExperience from "@/components/HomeExperience";
import { getPublicEarlyAccessCount } from "@/lib/earlyAccess";

export const revalidate = 60;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does Polynovea actually build?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Polynovea builds commercial software, open infrastructure and a longer-horizon behavioural-intelligence research programme. Infrakinetic is the current commercial lead; the Content Operations Platform is moving toward an open-source release and managed cloud edition; Hospitality is under architectural rebuild; and HBIF is the research architecture connecting domain evidence to deeper behavioural questions.",
      },
    },
    {
      "@type": "Question",
      name: "How do Polynovea's products relate to HBIF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Layer 1 is domain-specific: each domain requires its own product, ontology, state, workflows and validation. Layers 2 and 3 are shared research layers. Evidence from one domain can become a candidate for transfer, but it only moves across domains when testing supports that transfer.",
      },
    },
    {
      "@type": "Question",
      name: "Does using a Polynovea product automatically contribute data to HBIF research?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Product access does not require surrendering unrestricted research rights. Research use must be separately permitted, purpose-bound and governed; customer operational data is not treated as unrestricted Polynovea research property.",
      },
    },
    {
      "@type": "Question",
      name: "What is Infrakinetic?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Infrakinetic is a Polynovea product and the current commercial lead. It connects the systems a company uses to sell, operate, hire, govern, bill, collect, account and serve customers into one business operating environment while preserving clear ownership across each function.",
      },
    },
    {
      "@type": "Question",
      name: "What is Polynovea's Content Operations Platform?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It is Polynovea's upcoming open-source, self-hostable platform for structured data, content creation, collaboration, review, releases, delivery operations and governed developer and agent workflows. A managed Polynovea Cloud SaaS is planned alongside the OSS option; the platform should not be read as generally available until its public release is complete.",
      },
    },
  ],
};

export default async function Home() {
  const earlyAccessCount = await getPublicEarlyAccessCount();

  const earlyAccessSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.polynovea.in/#infrakinetic-early-access",
    name: "Infrakinetic Controlled Early Access",
    description:
      "Infrakinetic is accepting explicit Early Access registrations for controlled onboarding cohorts. Briefing and general contact requests do not count as Early Access registrations.",
    url: "https://www.polynovea.in/early-access/infrakinetic",
    about: {
      "@type": "SoftwareApplication",
      name: "Infrakinetic",
      applicationCategory: "BusinessApplication",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(earlyAccessSchema) }} />
      <Navbar />
      <HomeExperience earlyAccessCount={earlyAccessCount} />
    </>
  );
}
