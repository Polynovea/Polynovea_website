import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ProjectsExpanded from "@/components/ProjectsExpanded";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Projects — Active Initiatives",
  description:
    "Active projects across the Polynovea ecosystem — behavioral intelligence infrastructure, live experience operations through Polynovea Records, and product development including Cappella.",
  alternates: { canonical: "https://www.polynovea.in/projects" },
  openGraph: {
    title: "Projects | Polynovea",
    description:
      "Active initiatives across the Polynovea ecosystem — intelligence infrastructure, live operations, and product development.",
    url: "https://www.polynovea.in/projects",
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
