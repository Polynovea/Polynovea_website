import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogContent, { type BlogPost } from "@/components/BlogContent";

export const dynamic = "force-dynamic";

async function getPublishedPosts(): Promise<BlogPost[]> {
  try {
    const apiBase = process.env.NEXT_PUBLIC_ADMIN_API_BASE ?? "https://admin.polynovea.in/api/content";
    const res = await fetch(`${apiBase}/blog-posts`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.data ?? []).filter((p: BlogPost) => p.status === "published");
  } catch {
    return [];
  }
}

const blogFaqs = [
  {
    q: "What topics does the Polynovea blog cover?",
    a: "The blog covers behavioral intelligence as a discipline — how it differs from sentiment analysis and traditional analytics, systems thinking, decision frameworks, and operational patterns from building the Human Behavioral Intelligence Framework.",
  },
  {
    q: "How often does Polynovea publish new content?",
    a: "New posts are published as the team develops real findings from operating the Acquisition System and building HBIF — not on a fixed weekly schedule, so each post reflects genuine progress rather than filler content.",
  },
  {
    q: "Who writes the Polynovea blog?",
    a: "Posts are written by the Polynovea Intelligence Team, the same group building and operating the Human Behavioral Intelligence Framework and the Acquisition System.",
  },
];

export default async function BlogPage() {
  const initialPosts = await getPublishedPosts();
  return (
    <>
      <Navbar />
      <BlogContent initialPosts={initialPosts} />

      <section className="blog-faq-section">
        <div className="blog-faq-inner">
          <h2 className="blog-faq-title">Frequently asked questions</h2>
          <div className="blog-faq-list">
            {blogFaqs.map(({ q, a }) => (
              <div key={q} className="blog-faq-item">
                <h3 className="blog-faq-q">{q}</h3>
                <p className="blog-faq-a">{a}</p>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          .blog-faq-section {
            position: relative;
            background: rgba(9, 8, 16, 0.62);
            padding: 64px 24px 96px;
            border-top: 1px solid var(--border-muted);
          }
          .blog-faq-inner { max-width: 760px; margin: 0 auto; }
          .blog-faq-title {
            font-family: var(--font-display);
            font-size: clamp(22px, 3vw, 30px);
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 32px;
          }
          .blog-faq-list { display: grid; gap: 24px; }
          .blog-faq-item { border-left: 2px solid rgba(124, 58, 237, 0.35); padding-left: 16px; }
          .blog-faq-q { font-size: 16px; font-weight: 600; color: var(--text-primary); margin: 0 0 6px; }
          .blog-faq-a { font-size: 14px; color: var(--text-secondary); line-height: 1.65; margin: 0; }
        `}</style>
      </section>

      <Footer />
    </>
  );
}
