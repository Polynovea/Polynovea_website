import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Insights on Music & Intelligence",
  description:
    "Thoughts on independent music, live events, artist development, and behavioral intelligence from the Polynovea Records team.",
  alternates: { canonical: "https://www.polynovea.in/blog" },
  openGraph: {
    title: "Blog | Polynovea Records",
    description:
      "Intelligence, music, and systems thinking — direct from the Polynovea Records team.",
    url: "https://www.polynovea.in/blog",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
