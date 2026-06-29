import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

interface ContentBlock {
  id: string;
  title: string;
  body: string;
  media: string | null;
}

function isVideo(url: string) {
  return /\.(mp4|webm|mov)/i.test(url.split("?")[0]);
}

function PostBody({ content, styles: s }: { content: string; styles: Record<string, string> }) {
  try {
    const blocks: ContentBlock[] = JSON.parse(content);
    if (Array.isArray(blocks)) {
      return (
        <div className={s.postBody}>
          {blocks.map((block, i) => (
            <div key={block.id ?? i} className={s.postBlock}>
              {block.title && <h2 className={s.postBlockTitle}>{block.title}</h2>}
              {block.body && (
                <div className={s.postBlockBody}>
                  {block.body.split("\n\n").map((para, pi) => (
                    <p key={pi}>{para}</p>
                  ))}
                </div>
              )}
              {block.media && (
                <div className={s.postBlockMedia}>
                  {isVideo(block.media) ? (
                    <video src={block.media} controls className={s.postBlockVideo} />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={block.media} alt={block.title || `Block ${i + 1}`} className={s.postBlockImage} />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }
  } catch {}
  // Fallback: legacy HTML content
  return <div className={s.postBody} dangerouslySetInnerHTML={{ __html: content }} />;
}

const ADMIN_API = process.env.NEXT_PUBLIC_ADMIN_API_BASE || "https://admin.polynovea.in/api/content";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  published_at: string | null;
  author: string;
  category?: string;
  cover_image?: string | null;
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
      publishedTime: post.published_at ?? undefined,
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
    datePublished: post.published_at ?? undefined,
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
      <main className={styles.postMain}>
        <div className={`container ${styles.postContainer}`}>
          <div className={styles.postBack} data-reveal>
            <Link href="/blog">← Back to Blog</Link>
          </div>
          <article className={styles.postArticle} data-reveal>
            <div className={styles.postMeta}>
              {post.category && <span className={styles.postCategory}>{post.category}</span>}
              {post.published_at && (
                <span>{new Date(post.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
              )}
              <span>·</span>
              <span>{post.author}</span>
            </div>
            <h1 className={styles.postTitle}>{post.title}</h1>
            <p className={styles.postExcerpt}>{post.excerpt}</p>
            {post.content && <PostBody content={post.content} styles={styles} />}
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
