"use client";

import PageReveal from "@/components/PageReveal";
import CursorTrail from "@/components/CursorTrail";
import DepthRoot, { DepthPaneDef } from "@/components/depth/DepthRoot";
import Hero from "@/components/Hero";
import SystemPane from "@/components/panes/SystemPane";
import MilestonesPane from "@/components/panes/MilestonesPane";
import WhyDifferent from "@/components/WhyDifferent";
import WhoPane from "@/components/panes/WhoPane";
import MusicPane from "@/components/panes/MusicPane";
import ModulesPane from "@/components/panes/ModulesPane";
import FAQ from "@/components/FAQ";
import ContactPane from "@/components/panes/ContactPane";

/**
 * The home page journey. Order here MUST stay in sync with SECTION_COUNT
 * in lib/depthStore.ts — one pane per neural cluster the camera visits.
 */
const panes: DepthPaneDef[] = [
  { id: "home", node: <Hero /> },
  { id: "architecture", node: <SystemPane /> },
  { node: <MilestonesPane /> },
  { node: <WhyDifferent /> },
  { node: <WhoPane /> },
  { id: "projects", node: <MusicPane /> },
  { node: <ModulesPane /> },
  { id: "faq", node: <FAQ /> },
  { id: "contact", node: <ContactPane /> },
];

export default function HomeExperience() {
  return (
    <>
      <CursorTrail />
      <PageReveal />
      <main className="home-main">
        <DepthRoot panes={panes} />
      </main>
    </>
  );
}
