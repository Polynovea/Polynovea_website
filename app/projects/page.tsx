import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ProjectsExpanded from "@/components/ProjectsExpanded";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Projects — Independent Music Ecosystem",
  description:
    "Polynovea Records projects: music releases, live event production, artist development, and distribution initiatives for independent artists in India.",
  alternates: { canonical: "https://polynovearecords.in/projects" },
  openGraph: {
    title: "Projects | Polynovea Records",
    description:
      "Music releases, live productions, and artist development projects by Polynovea Records.",
    url: "https://polynovearecords.in/projects",
  },
};

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main>
        <ProjectsExpanded />
      </main>
      <Footer />
    </>
  );
}
