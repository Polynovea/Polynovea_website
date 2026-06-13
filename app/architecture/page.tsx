import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArchitectureDeepDive from "@/components/ArchitectureDeepDive";

export const metadata: Metadata = {
  title: "The System Architecture",
  description:
    "A deep dive into how Polynovea's Human Behavioral Intelligence Framework (HBIF) is structured — four milestones, the behavioral intelligence pipeline, and the long-term ecosystem design.",
  alternates: { canonical: "https://www.polynovea.in/architecture" },
  openGraph: {
    title: "The System Architecture | Polynovea",
    description:
      "How the HBIF is structured — four milestones from intelligence infrastructure to distribution, and the behavioral intelligence loop that compounds them.",
    url: "https://www.polynovea.in/architecture",
  },
};

export default function ArchitecturePage() {
  return (
    <>
      <Navbar />
      <ArchitectureDeepDive />
      <Footer />
    </>
  );
}
