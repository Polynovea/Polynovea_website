import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";

const LivePortfolioExpanded = dynamic(() => import("@/components/LivePortfolioExpanded"));

export const metadata: Metadata = {
  title: "Live Portfolio — Events & Shows",
  description:
    "Explore Polynovea Records' live music portfolio — shows, venues, and events across Mumbai and Navi Mumbai featuring independent artists.",
  alternates: { canonical: "https://www.polynovea.in/live-portfolio" },
  openGraph: {
    title: "Live Portfolio | Polynovea Records",
    description:
      "Live music events and shows by Polynovea Records across Mumbai and Navi Mumbai.",
    url: "https://www.polynovea.in/live-portfolio",
  },
};

export default function LivePortfolioPage() {
  return (
    <>
      <Navbar />
      <main>
        <LivePortfolioExpanded />
      </main>
      <Footer />
    </>
  );
}
