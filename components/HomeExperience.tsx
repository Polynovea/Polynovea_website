"use client";

import DepthRoot, { DepthPaneDef } from "@/components/depth/DepthRoot";
import Hero from "@/components/Hero";
import SystemPane from "@/components/panes/SystemPane";
import MilestonesPane from "@/components/panes/MilestonesPane";
import WhyDifferent from "@/components/WhyDifferent";
import WhoPane from "@/components/panes/WhoPane";
import ModulesPane from "@/components/panes/ModulesPane";
import FAQ from "@/components/FAQ";
import ContactPane from "@/components/panes/ContactPane";

interface HomeExperienceProps {
  earlyAccessCount: number | null;
}

export default function HomeExperience({ earlyAccessCount }: HomeExperienceProps) {
  const panes: DepthPaneDef[] = [
    { id: "home", node: <Hero earlyAccessCount={earlyAccessCount} /> },
    { id: "architecture", node: <SystemPane /> },
    { node: <MilestonesPane /> },
    { node: <WhyDifferent /> },
    { node: <WhoPane /> },
    { node: <ModulesPane /> },
    { id: "faq", node: <FAQ /> },
    { id: "contact", node: <ContactPane /> },
  ];

  return (
    <main id="main-content" className="home-main">
      <DepthRoot panes={panes} />
    </main>
  );
}
