import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ExperienceLayer from "@/components/ExperienceLayer";
import ScrollReveal from "@/components/ScrollReveal";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Polynovea - AI, Behavioural Intelligence & Decision Infrastructure",
    template: "%s | Polynovea",
  },
  description:
    "Polynovea is a deep-tech AI, data, behavioural-intelligence and decision-infrastructure company. Infrakinetic is the current commercial lead; HBIF is the longer-horizon research architecture; and the Content Operations Platform is moving toward open source and a managed cloud edition.",
  metadataBase: new URL("https://www.polynovea.in"),
  keywords: [
    "behavioral intelligence",
    "human behavioral intelligence framework",
    "HBIF",
    "AI data company india",
    "behavioral pattern recognition",
    "decision intelligence infrastructure",
    "behavioral data systems",
    "human behavior AI",
    "behavioral intelligence india",
    "infrakinetic",
    "content operations platform",
    "open source cms",
    "self hosted cms",
    "decision infrastructure",
    "enterprise operating system",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/icon.png",
  },
  openGraph: {
    title: "Polynovea - AI, Behavioural Intelligence & Decision Infrastructure",
    description:
      "A deep-tech AI, data, behavioural-intelligence and decision-infrastructure company building commercially independent products alongside a longer-horizon research architecture.",
    siteName: "Polynovea",
    url: "https://www.polynovea.in",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Polynovea" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Polynovea - AI, Behavioural Intelligence & Decision Infrastructure",
    description:
      "A deep-tech AI, data, behavioural-intelligence and decision-infrastructure company building commercially independent products alongside a longer-horizon research architecture.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.polynovea.in",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.polynovea.in/#organization",
  name: "Polynovea",
  url: "https://www.polynovea.in",
  logo: "https://www.polynovea.in/logo.png",
  description:
    "Deep-tech AI, data, behavioural-intelligence and decision-infrastructure company based in Navi Mumbai, India. Infrakinetic is the current commercial lead; Polynovea also develops HBIF and an upcoming open-source Content Operations Platform.",
  brand: {
    "@type": "Brand",
    "@id": "https://www.infrakinetic.in/#brand",
    name: "Infrakinetic",
    url: "https://www.infrakinetic.in/",
  },
  foundingDate: "2026-04",
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
  sameAs: [
    "https://www.linkedin.com/company/111494249/",
    "https://www.instagram.com/polynovea.in/",
    "https://x.com/Polynovea",
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
        <Script id="clarity-init" strategy="beforeInteractive">{`
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "yfm60pcdpr");
        `}</Script>
      </head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-153C7YTRNT"
        strategy="lazyOnload"
      />
      <Script id="ga4-init" strategy="lazyOnload">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-153C7YTRNT');
      `}</Script>
      <body>
        {/* Skip-to-content for keyboard / screen-reader users */}
        <a href="#main-content" className="skip-link">Skip to content</a>

        {/* Persistent Polynovea Field backdrop: content paints above it on every route. */}
        <ExperienceLayer />
        <ScrollReveal />
        <SmoothScroll>{children}</SmoothScroll>

      </body>
    </html>
  );
}
