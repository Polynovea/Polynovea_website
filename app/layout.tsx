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
    default: "Polynovea | Behavioral Intelligence for Music",
    template: "%s | Polynovea",
  },
  description:
    "Polynovea is an independent music intelligence company in India building live music experiences, artist distribution, and behavioral intelligence systems for venues and artists.",
  metadataBase: new URL("https://www.polynovea.in"),
  keywords: [
    "independent music label india",
    "music intelligence india",
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
    title: "Polynovea | Behavioral Intelligence for Music",
    description:
      "Independent music intelligence company in India. Live events, artist distribution, and behavioral intelligence for venues.",
    siteName: "Polynovea",
    url: "https://www.polynovea.in",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Polynovea" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Polynovea | Behavioral Intelligence for Music",
    description:
      "Independent music intelligence company in India. Live events, artist distribution, and behavioral intelligence for venues.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.polynovea.in",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Polynovea",
  url: "https://www.polynovea.in",
  logo: "https://www.polynovea.in/icon.png",
  description:
    "Independent music intelligence company in India building live music experiences, artist distribution, and behavioral intelligence systems.",
  foundingDate: "2023",
  location: {
    "@type": "Place",
    name: "Navi Mumbai, Maharashtra, India",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Navi Mumbai",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
  },
  founder: {
    "@type": "Person",
    name: "Subrojit Roy",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "subrojitroy@polynovea.in",
    contactType: "customer service",
    areaServed: "IN",
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "India",
  },
  subOrganization: {
    "@type": "MusicGroup",
    name: "Polynovea Records",
    url: "https://www.polynovea.in",
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
