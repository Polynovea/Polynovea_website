import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ADMIN_API = process.env.NEXT_PUBLIC_ADMIN_API_BASE || "https://polynovea-admin-488b.vercel.app/api/content";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  author: string;
  category?: string;
  status: "draft" | "published";
}

async function getPost(id: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`${ADMIN_API}/blog-posts/${id}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = await res.json();
    const post: BlogPost = data.data ?? data;
    return post.status === "published" ? post : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `https://www.polynovea.in/blog/${id}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://www.polynovea.in/blog/${id}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "Polynovea",
      url: "https://www.polynovea.in",
    },
    url: `https://www.polynovea.in/blog/${id}`,
    mainEntityOfPage: `https://www.polynovea.in/blog/${id}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Navbar />
      <main className="post-main">
        <div className="container post-container">
          <div className="post-back" data-reveal>
            <Link href="/blog">← Back to Blog</Link>
          </div>
          <article className="post-article" data-reveal>
            <div className="post-meta">
              {post.category && <span className="post-category">{post.category}</span>}
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.author}</span>
            </div>
            <h1 className="post-title">{post.title}</h1>
            <p className="post-excerpt">{post.excerpt}</p>
            {post.content && (
              <div
                className="post-body"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            )}
          </article>
        </div>
      </main>
      <Footer />

      <style jsx>{`
        .post-main {
          background: var(--bg-primary);
          min-height: 100vh;
          padding-top: calc(var(--nav-height) + var(--space-2xl));
          padding-bottom: var(--space-4xl);
        }
        .post-container {
          max-width: 720px;
          margin-inline: auto;
        }
        .post-back a {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.2s;
        }
        .post-back a:hover {
          color: var(--accent-intelligence);
        }
        .post-article {
          margin-top: var(--space-2xl);
        }
        .post-meta {
          display: flex;
          align-items: center;
          gap: var(--space-xs);
          color: var(--text-secondary);
          font-size: 0.8125rem;
          margin-bottom: var(--space-md);
        }
        .post-category {
          color: var(--accent-intelligence);
          font-weight: 600;
        }
        .post-title {
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 700;
          line-height: 1.2;
          color: var(--text-primary);
          margin-bottom: var(--space-lg);
        }
        .post-excerpt {
          font-size: 1.125rem;
          color: var(--text-secondary);
          line-height: 1.6;
          border-left: 3px solid var(--accent-intelligence);
          padding-left: var(--space-md);
          margin-bottom: var(--space-2xl);
        }
        .post-body {
          color: var(--text-primary);
          font-size: 1rem;
          line-height: 1.75;
        }
        .post-body h2, .post-body h3 {
          color: var(--text-primary);
          margin-top: var(--space-2xl);
          margin-bottom: var(--space-md);
        }
        .post-body p {
          margin-bottom: var(--space-md);
          color: var(--text-secondary);
        }
        .post-body a {
          color: var(--accent-intelligence);
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}
