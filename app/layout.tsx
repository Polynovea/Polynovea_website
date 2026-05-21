import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import ScrollReveal from "@/components/ScrollReveal";
import TiltEffect from "@/components/TiltEffect";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Polynovea Records | Independent Music Label India",
    template: "%s | Polynovea Records",
  },
  description:
    "Polynovea Records is an independent music label in India building live music experiences, artist distribution, and behavioral intelligence systems for venues and artists.",
  metadataBase: new URL("https://polynovearecords.in"),
  keywords: [
    "independent music label india",
    "music distribution india",
    "live music events mumbai",
    "artist development india",
    "independent artist distribution",
    "music publishing india",
  ],
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Polynovea Records | Independent Music Label India",
    description:
      "Independent music label in India. Live events, artist distribution, and behavioral intelligence for venues.",
    siteName: "Polynovea Records",
    url: "https://polynovearecords.in",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Polynovea Records" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Polynovea Records | Independent Music Label India",
    description:
      "Independent music label in India. Live events, artist distribution, and behavioral intelligence for venues.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://polynovearecords.in",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "MusicGroup"],
  name: "Polynovea Records",
  url: "https://polynovearecords.in",
  logo: "https://polynovearecords.in/icon.png",
  description:
    "Independent music label in India building live music experiences, artist distribution, and behavioral intelligence systems.",
  foundingLocation: {
    "@type": "Place",
    name: "Navi Mumbai, Maharashtra, India",
  },
  areaServed: ["Mumbai", "Navi Mumbai", "India"],
  contactPoint: {
    "@type": "ContactPoint",
    email: "subrojitroy@polynovearecords.in",
    contactType: "customer service",
  },
  sameAs: [
    "https://www.instagram.com/polynovearecords/",
    "https://www.instagram.com/polynovea.in/",
    "https://x.com/PolynoveaRec",
    "https://www.threads.com/@polynovearecords",
    "https://www.youtube.com/@PolynoveaRecords",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <CustomCursor />
        <ScrollReveal />
        <TiltEffect />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
