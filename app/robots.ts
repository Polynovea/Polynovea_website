import type { MetadataRoute } from "next";

const AI_CRAWLERS = [
  "GPTBot",           // OpenAI / ChatGPT
  "ChatGPT-User",     // ChatGPT browsing
  "anthropic-ai",     // Anthropic / Claude
  "Claude-Web",       // Claude web search
  "PerplexityBot",    // Perplexity
  "Google-Extended",  // Gemini training
  "CCBot",            // Common Crawl (training data for most LLMs)
  "cohere-ai",        // Cohere
  "meta-externalagent", // Meta / Llama
  "Applebot-Extended",  // Apple Intelligence
  "YouBot",           // You.com
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Explicitly allow all AI crawlers — full site access
      ...AI_CRAWLERS.map((ua) => ({
        userAgent: ua,
        allow: "/",
        disallow: ["/api/"],
      })),
      // Default rule for all other crawlers
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://www.polynovea.in/sitemap.xml",
  };
}
