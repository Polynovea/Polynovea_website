import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArchitectureDeepDive from "@/components/ArchitectureDeepDive";

export const metadata: Metadata = {
  title: "The System Architecture",
  description:
    "A deep dive into how Polynovea Records maps behavioral data from live music events into actionable intelligence for venues and artists in India.",
  alternates: { canonical: "https://polynovearecords.in/architecture" },
  openGraph: {
    title: "The System Architecture | Polynovea Records",
    description:
      "How we convert live event behavior into intelligence — the full system breakdown.",
    url: "https://polynovearecords.in/architecture",
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
