"use client";

import { useState } from "react";
import Link from "next/link";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  published_at: string | null;
  author: string;
  category?: string;
  cover_image?: string | null;
  status: "draft" | "published";
}

const POSTS_PER_PAGE = 6;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogContent({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(initialPosts.length / POSTS_PER_PAGE);
  const startIdx = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = initialPosts.slice(startIdx, startIdx + POSTS_PER_PAGE);

  return (
    <main className="blog-main">
      <div className="blog-container">
        {/* ── Header ── */}
        <div className="blog-header" data-reveal>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--accent-authority-muted)",
            }}
          >
            Insights
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "var(--text-primary)",
              marginTop: "var(--space-md)",
            }}
          >
            Behavioral Intelligence Blog
          </h1>
          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.7,
              color: "var(--text-secondary)",
              marginTop: "var(--space-md)",
              maxWidth: "640px",
            }}
          >
            Systems thinking, operational insights, and patterns in human behavior — from the Polynovea team.
          </p>
        </div>

        {/* ── Search ── */}
        <div className="search-wrapper" data-reveal>
          <input
            type="text"
            placeholder="Search articles..."
            className="search-input"
            aria-label="Search articles"
          />
        </div>

        {/* ── Grid ── */}
        <div className="blog-grid">
          {currentPosts.length > 0 ? (
            currentPosts.map((post, i) => (
              <article
                key={post.id}
                className="blog-card glass-card"
                data-reveal
                data-reveal-delay={String(i * 60)}
                onClick={() => window.gtag?.("event", "blog_card_click", {
                  post_slug: post.slug,
                  post_title: post.title,
                  card_position: startIdx + i + 1,
                })}
              >
                {/* Cover image — edge-to-edge */}
                <Link href={`/blog/${post.slug}`} className="card-img-link" tabIndex={-1} aria-hidden="true">
                  <div className="card-img-wrap">
                    {post.cover_image ? (
                      <img src={post.cover_image} alt={post.title} className="card-img" />
                    ) : (
                      <div className="card-img-placeholder">
                        <div className="placeholder-glow" />
                      </div>
                    )}
                    {/* Gradient fade into card body */}
                    <div className="card-img-fade" />
                  </div>
                </Link>

                {/* Content */}
                <div className="card-body">
                  {/* Category tag */}
                  {post.category && (
                    <span className="card-category">{post.category}</span>
                  )}

                  <h2 className="card-title">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <p className="card-excerpt">{post.excerpt}</p>

                  <div className="card-footer">
                    <div className="card-meta">
                      <span className="card-author">{post.author}</span>
                      {post.published_at && (
                        <>
                          <span className="meta-dot">·</span>
                          <span className="card-date">{formatDate(post.published_at)}</span>
                        </>
                      )}
                    </div>
                    <Link href={`/blog/${post.slug}`} className="card-cta">
                      Read →
                    </Link>
                  </div>
                </div>

                {/* Bento glow orb */}
                <div className="card-glow" aria-hidden="true" />
              </article>
            ))
          ) : (
            <p style={{ color: "var(--text-secondary)", gridColumn: "1 / -1" }}>No posts yet.</p>
          )}
        </div>

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="pagination" data-reveal>
            {currentPage > 1 && (
              <button className="page-btn" onClick={() => setCurrentPage(currentPage - 1)}>
                ←
              </button>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`page-btn${page === currentPage ? " active" : ""}`}
                onClick={() => setCurrentPage(page)}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </button>
            ))}
            {currentPage < totalPages && (
              <button className="page-btn" onClick={() => setCurrentPage(currentPage + 1)}>
                →
              </button>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .blog-main {
          min-height: 100vh;
          padding-top: calc(var(--nav-height) + var(--space-3xl));
          padding-bottom: var(--space-5xl);
          padding-inline: var(--space-lg);
        }

        .blog-container {
          max-width: var(--max-width);
          margin-inline: auto;
        }

        .blog-header {
          margin-bottom: var(--space-3xl);
        }

        .search-wrapper {
          margin-bottom: var(--space-2xl);
        }

        .search-input {
          width: 100%;
          max-width: 420px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-lg);
          padding: 0.75rem 1.125rem;
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 0.9375rem;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          outline: none;
          backdrop-filter: blur(8px);
        }

        .search-input:focus {
          border-color: rgba(124, 58, 237, 0.5);
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.12);
        }

        .search-input::placeholder {
          color: var(--text-disabled);
        }

        /* ── Grid ── */
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-lg);
        }

        /* ── Card shell — glass-card handles border/backdrop, we layer on top ── */
        .blog-card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          cursor: pointer;
          padding: 0 !important; /* override any glass-card padding */
        }

        /* ── Cover image ── */
        .card-img-link {
          display: block;
          text-decoration: none;
        }

        .card-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
        }

        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s var(--ease-3d);
        }

        .blog-card:hover .card-img {
          transform: scale(1.06);
        }

        .card-img-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #16122a 0%, #1e1a38 40%, #12101e 100%);
          position: relative;
          overflow: hidden;
        }

        .placeholder-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 50% at 50% 60%, rgba(124, 58, 237, 0.18) 0%, transparent 70%);
        }

        .card-img-fade {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 40%;
          background: linear-gradient(to bottom, transparent, rgba(12, 11, 20, 0.55));
          pointer-events: none;
        }

        /* ── Card body ── */
        .card-body {
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
          padding: var(--space-lg);
          flex: 1;
        }

        .card-category {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--accent-authority-muted);
        }

        .card-title {
          margin: 0;
        }

        .card-title a {
          font-family: var(--font-display);
          font-size: clamp(16px, 1.4vw, 20px);
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1.2;
          color: var(--text-primary);
          text-decoration: none;
          transition: color 0.2s ease;
          display: block;
        }

        .blog-card:hover .card-title a {
          color: var(--accent-authority);
        }

        .card-excerpt {
          font-size: 0.875rem;
          line-height: 1.6;
          color: var(--text-secondary);
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          padding-top: var(--space-md);
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .card-meta {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          color: var(--text-disabled);
        }

        .card-author {
          color: var(--text-secondary);
          font-weight: 500;
        }

        .meta-dot {
          opacity: 0.4;
        }

        .card-date {
          font-variant-numeric: tabular-nums;
        }

        .card-cta {
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--accent-intelligence);
          text-decoration: none;
          transition: color 0.2s ease, transform 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          white-space: nowrap;
        }

        .blog-card:hover .card-cta {
          color: var(--accent-authority);
        }

        /* ── Bento glow orb ── */
        .card-glow {
          position: absolute;
          bottom: -80px;
          right: -80px;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            var(--accent-intelligence) 0%,
            var(--accent-authority) 60%,
            transparent 100%
          );
          filter: blur(60px);
          opacity: 0.06;
          pointer-events: none;
          transition: opacity 0.35s ease;
        }

        .blog-card:hover .card-glow {
          opacity: 0.14;
        }

        /* ── Pagination ── */
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: var(--space-xs);
          margin-top: var(--space-3xl);
        }

        .page-btn {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-secondary);
          padding: 0.5rem 0.875rem;
          border-radius: var(--radius-md);
          font-family: var(--font-body);
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .page-btn:hover {
          border-color: rgba(124, 58, 237, 0.4);
          color: var(--text-primary);
        }

        .page-btn.active {
          background: var(--accent-intelligence);
          border-color: var(--accent-intelligence);
          color: #fff;
          box-shadow: 0 0 16px rgba(124, 58, 237, 0.4);
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .blog-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .blog-main {
            padding-inline: var(--space-md);
          }

          .blog-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
