"use client";

import { useEffect } from "react";

interface Props {
  slug: string;
  title: string;
  category: string;
  wordCount: number;
}

function fire(event: string, params: Record<string, unknown>) {
  window.gtag?.("event", event, params);
}

function estimatedReadMin(words: number) {
  return Math.max(1, Math.ceil(words / 200));
}

export default function BlogPostTracker({ slug, title, category, wordCount }: Props) {
  useEffect(() => {
    const base = { post_slug: slug, post_title: title, post_category: category || "uncategorized" };
    const readMin = estimatedReadMin(wordCount);

    // ── View event (fires once on mount) ──────────────────────────────────
    fire("blog_post_view", { ...base, estimated_read_min: readMin, word_count: wordCount });

    // ── Scroll depth: 25 / 50 / 75 / 90 / 100 % ──────────────────────────
    const SCROLL_MARKS = [25, 50, 75, 90, 100];
    const scrollFired = new Set<number>();

    const onScroll = () => {
      const el = document.documentElement;
      const pct = Math.round(((window.scrollY + window.innerHeight) / el.scrollHeight) * 100);
      for (const mark of SCROLL_MARKS) {
        if (!scrollFired.has(mark) && pct >= mark) {
          scrollFired.add(mark);
          fire("blog_scroll_depth", { ...base, depth_percent: mark });
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // ── Time-on-page milestones: 30s / 60s / 2min / 5min ─────────────────
    const TIME_MARKS = [30, 60, 120, 300];
    const timers = TIME_MARKS.map((s) =>
      setTimeout(() => fire("blog_time_spent", { ...base, seconds: s, read_min_estimate: readMin }), s * 1000)
    );

    // ── Article completion: IntersectionObserver on the last paragraph ─────
    const articleEl = document.querySelector("[data-article-end]");
    let completionObserver: IntersectionObserver | null = null;
    if (articleEl) {
      completionObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            fire("blog_article_complete", { ...base, word_count: wordCount, read_min_estimate: readMin });
            completionObserver?.disconnect();
          }
        },
        { threshold: 0.5 }
      );
      completionObserver.observe(articleEl);
    }

    // ── Navigation after reading: where do readers go next? ───────────────
    const KEY_PAGES: Record<string, string> = {
      "/architecture": "architecture",
      "/contact": "contact",
      "/projects": "projects",
      "/research": "research",
      "/about": "about",
      "/blog": "blog_listing",
    };

    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      // Don't fire for clicks to another blog post (already tracked as post_view)
      if (/^\/blog\/.+/.test(href)) return;
      const destKey = Object.keys(KEY_PAGES).find((k) => href.startsWith(k));
      if (destKey) {
        fire("blog_exit_navigation", { ...base, destination: KEY_PAGES[destKey], scroll_pct: Math.max(...[...scrollFired, 0]) });
      }
    };

    document.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      timers.forEach(clearTimeout);
      completionObserver?.disconnect();
      document.removeEventListener("click", onClick);
    };
  }, [slug, title, category, wordCount]);

  return null;
}
