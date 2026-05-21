import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About — Who We Are",
  description:
    "Polynovea Records is an independent music label and intelligence company based in Navi Mumbai, India. Learn about our team, mission, and approach.",
  alternates: { canonical: "https://polynovearecords.in/about" },
  openGraph: {
    title: "About Polynovea Records",
    description:
      "Independent music label and intelligence company based in Navi Mumbai, India.",
    url: "https://polynovearecords.in/about",
  },
};

const About = dynamic(() => import("@/components/About"), { ssr: false });

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <About />
      </main>
      <Footer />
    </>
  );
}
