import type { MetadataRoute } from "next";

const AI_CRAWLER_USER_AGENTS = [
  // OpenAI
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  // Anthropic
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  // Google (AI training / Gemini grounding)
  "Google-Extended",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Meta
  "meta-externalagent",
  "FacebookBot",
  // Apple
  "Applebot-Extended",
  // ByteDance
  "Bytespider",
  // Amazon
  "Amazonbot",
  // Common Crawl (feeds many LLM training sets)
  "CCBot",
  // You.com
  "YouBot",
  // Diffbot
  "Diffbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      ...AI_CRAWLER_USER_AGENTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/"],
      })),
    ],
    sitemap: "https://www.polynovea.in/sitemap.xml",
  };
}
