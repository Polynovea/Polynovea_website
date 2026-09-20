import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogPostTracker from "@/components/BlogPostTracker";
import VideoBlock from "@/components/VideoBlock";
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

function parseContentBlocks(content: string): ContentBlock[] | null {
  try {
    const parsed: unknown = JSON.parse(content);
    return Array.isArray(parsed) ? (parsed as ContentBlock[]) : null;
  } catch {
    return null;
  }
}

function PostBody({ content, styles: s }: { content: string; styles: Record<string, string> }) {
  const blocks = parseContentBlocks(content);
  if (blocks) {
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
                  <VideoBlock src={block.media} className={s.postBlockVideo} />
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
  // Fallback: legacy HTML content
  return <div className={s.postBody} dangerouslySetInnerHTML={{ __html: content }} />;
}

function countWords(content?: string): number {
  if (!content) return 0;
  const blocks = parseContentBlocks(content);
  if (blocks) {
    return blocks.reduce((sum, b) => {
      const text = `${b.title ?? ""} ${b.body ?? ""}`;
      return sum + text.split(/\s+/).filter(Boolean).length;
    }, 0);
  }
  return content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
}

const ADMIN_API = process.env.NEXT_PUBLIC_ADMIN_API_BASE || "https://admin.polynovea.in/api/content";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  published_at: string | null;
  author: string;
  category?: string;
  cover_image?: string | null;
  status: "draft" | "published";
}

async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`${ADMIN_API}/blog-posts/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    const post: BlogPost = data.data ?? data;
    return post.status === "published" ? post : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `https://www.polynovea.in/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://www.polynovea.in/blog/${post.slug}`,
      type: "article",
      publishedTime: post.published_at ?? undefined,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
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
    url: `https://www.polynovea.in/blog/${post.slug}`,
    mainEntityOfPage: `https://www.polynovea.in/blog/${post.slug}`,
  };

  const wordCount = countWords(post.content);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BlogPostTracker
        slug={post.slug}
        title={post.title}
        category={post.category ?? ""}
        wordCount={wordCount}
      />
      <Navbar />
      <main className={styles.postMain}>
        <div className={styles.postContainer}>
          <div className={styles.postBack} data-reveal>
            <Link href="/blog">← Back to Blog</Link>
          </div>

          <article className={`glass-card ${styles.postCard}`} data-reveal>
            {/* Cover image — edge-to-edge at top of card */}
            {post.cover_image && (
              <div className={styles.postCoverWrap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.cover_image} alt={post.title} className={styles.postCoverImg} />
                <div className={styles.postCoverFade} />
              </div>
            )}

            <div className={styles.postInner}>
              <div className={styles.postMeta}>
                {post.category && (
                  <>
                    <span className={styles.postCategory}>{post.category}</span>
                    <span className={styles.metaDot}>·</span>
                  </>
                )}
                {post.published_at && (
                  <span>{new Date(post.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })}</span>
                )}
                {post.published_at && <span className={styles.metaDot}>·</span>}
                <span>{post.author}</span>
              </div>

              <h1 className={styles.postTitle}>{post.title}</h1>
              <p className={styles.postExcerpt}>{post.excerpt}</p>
              {post.content && <PostBody content={post.content} styles={styles} />}
              <div data-article-end aria-hidden="true" />
            </div>

            {/* Ambient glow orb */}
            <div className={styles.postGlow} aria-hidden="true" />
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
