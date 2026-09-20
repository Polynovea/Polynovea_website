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
    a: "The blog covers Polynovea's product, engineering and research work: Infrakinetic, open-source content operations, HBIF research, decision infrastructure, governance, systems thinking and lessons from building real operating software.",
  },
  {
    q: "How often does Polynovea publish new content?",
    a: "New posts are published around meaningful product, engineering and research developments across Infrakinetic, the Content Operations Platform, Hospitality and HBIF rather than on a fixed filler-driven schedule.",
  },
  {
    q: "Who writes the Polynovea blog?",
    a: "Posts are written by the Polynovea team working across products, engineering and HBIF research. Individual articles should preserve the evidence state of the work they discuss rather than turning research hypotheses into product claims.",
  },
  {
    q: "Is the Polynovea blog only about Hospitality?",
    a: "No. The blog covers enterprise systems, open-source infrastructure and decision architecture alongside behavioural-intelligence research - reflecting work across Infrakinetic, the Content Operations Platform, Hospitality and HBIF.",
  },
  {
    q: "Can I get notified about new Polynovea blog posts?",
    a: "There is no email subscription yet. Check back on the blog directly, or reach out through the contact page to ask about specific topics you're interested in.",
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
