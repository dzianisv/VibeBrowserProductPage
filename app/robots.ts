import type { MetadataRoute } from "next"

/**
 * Dynamic robots.txt using Next.js metadata convention.
 *
 * IMPORTANT — Cloudflare "AI Scrapers and Crawlers" conflict:
 * Cloudflare prepends a "Managed Content" block at the CDN edge that
 * DISALLOWs ClaudeBot, GPTBot, Amazonbot, Google-Extended, etc.
 * These Cloudflare rules appear BEFORE our rules and take precedence
 * per the robots.txt spec (first matching user-agent group wins).
 *
 * To allow AI bots to crawl the site, disable "AI Scrapers and Crawlers"
 * blocking in the Cloudflare dashboard:
 *   Dashboard → Security → Bots → AI Scrapers and Crawlers → set to "Allow"
 *
 * Our rules below explicitly ALLOW these bots for citation and discovery.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: allow all, block internal paths
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/", "/private/"],
      },

      // Major search engines — explicit allow
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "Bingbot",
        allow: "/",
      },
      {
        userAgent: "Slurp",
        allow: "/",
      },
      {
        userAgent: "DuckDuckBot",
        allow: "/",
      },
      {
        userAgent: "Baiduspider",
        allow: "/",
      },

      // Social media crawlers
      {
        userAgent: "facebookexternalhit",
        allow: "/",
      },
      {
        userAgent: "Twitterbot",
        allow: "/",
      },
      {
        userAgent: "LinkedInBot",
        allow: "/",
      },
      {
        userAgent: "Applebot",
        allow: "/",
      },

      // Block SEO scraper bots
      {
        userAgent: "AhrefsBot",
        disallow: "/",
      },
      {
        userAgent: "SemrushBot",
        disallow: "/",
      },
      {
        userAgent: "DotBot",
        disallow: "/",
      },
      {
        userAgent: "MJ12bot",
        disallow: "/",
      },

      // AI search bots — allow for citation and discovery
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
      },
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
      },
      {
        userAgent: "Amazonbot",
        allow: "/",
      },
    ],
    sitemap: "https://www.vibebrowser.app/sitemap.xml",
  }
}
