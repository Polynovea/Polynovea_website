import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ExperienceLayer from "@/components/ExperienceLayer";
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
    "Polynovea is a behavioral intelligence operation based in Navi Mumbai, India. We map human decision-making in commercial environments and convert it into repeatable frameworks, products, and automated systems.",
  metadataBase: new URL("https://www.polynovea.in"),
  keywords: [
    "behavioral intelligence india",
    "independent music label india",
    "live music events mumbai",
    "artist development india",
    "behavioral data music venues",
    "music publishing india",
  ],
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Polynovea | Behavioral Intelligence for Music",
    description:
      "Behavioral intelligence operation based in Navi Mumbai. Mapping human decision-making into frameworks, products, and systems — applied through Polynovea Records.",
    siteName: "Polynovea",
    url: "https://www.polynovea.in",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Polynovea" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Polynovea | Behavioral Intelligence for Music",
    description:
      "Behavioral intelligence operation based in Navi Mumbai. Mapping human decision-making into frameworks, products, and systems — applied through Polynovea Records.",
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
  logo: "https://www.polynovea.in/logo.png",
  description:
    "Behavioral intelligence operation based in Navi Mumbai, India. We map human decision-making in commercial environments and convert it into repeatable frameworks, products, and automated systems.",
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
        <link rel="image_src" href="https://www.polynovea.in/logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        {/* Persistent WebGL backdrop: must render before content so positioned content paints above it */}
        <ExperienceLayer />
        <CustomCursor />
        <ScrollReveal />
        <TiltEffect />
        <SmoothScroll>{children}</SmoothScroll>

        {/* Global SVG Filters for Liquid Glass Effect */}
        <svg style={{ display: "none", position: "absolute", width: 0, height: 0 }} aria-hidden="true">
          <defs>
            <filter id="container-glass">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.015 0.015"
                numOctaves="2"
                seed="5"
                result="turbulence"
              />
              <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
              <feSpecularLighting
                in="softMap"
                surfaceScale="4"
                specularConstant="1.2"
                specularExponent="80"
                lightingColor="#ffffff"
                result="specLight"
              >
                <fePointLight x="-200" y="-200" z="300" />
              </feSpecularLighting>
              <feDisplacementMap
                in="SourceGraphic"
                in2="softMap"
                scale="25"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>

            <filter id="btn-glass">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.03 0.03"
                numOctaves="1"
                seed="17"
                result="turbulence"
              />
              <feGaussianBlur in="turbulence" stdDeviation="1.5" result="softMap" />
              <feSpecularLighting
                in="softMap"
                surfaceScale="3"
                specularConstant="1.5"
                specularExponent="120"
                lightingColor="#ffffff"
                result="specLight"
              >
                <fePointLight x="-100" y="-100" z="200" />
              </feSpecularLighting>
              <feDisplacementMap
                in="SourceGraphic"
                in2="softMap"
                scale="12"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
      </body>
    </html>
  );
}
