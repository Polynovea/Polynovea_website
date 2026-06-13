import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";

const LivePortfolioExpanded = dynamic(() => import("@/components/LivePortfolioExpanded"));

export const metadata: Metadata = {
  title: "Live Portfolio — Events & Shows",
  description:
    "Live music events and shows operated by Polynovea Records — the cultural arm of Polynovea. Venues and performances across Mumbai and Navi Mumbai featuring independent artists.",
  alternates: { canonical: "https://www.polynovea.in/live-portfolio" },
  openGraph: {
    title: "Live Portfolio | Polynovea Records",
    description:
      "Live events and shows by Polynovea Records — the cultural deployment arm of the Polynovea behavioral intelligence ecosystem.",
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
