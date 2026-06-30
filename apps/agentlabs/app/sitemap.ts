import { MetadataRoute } from "next"
import { createBlogRepository } from "../../../shared/blog"
import { AGENTLABS_BLOG_DIRECTORY } from "../lib/blog-directory"

// Use the same published-only blog repository that drives the /blog/[slug]
// routes, so the sitemap never lists an unpublished draft (soft 404).
const blogRepository = createBlogRepository({ blogDirectory: AGENTLABS_BLOG_DIRECTORY })

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://agentlabs.cc"
  const now = new Date()

  const blogEntries: MetadataRoute.Sitemap = blogRepository.getAllBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/agentsdata`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/computer-use-testing`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/agentprobe`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...blogEntries,
  ]
}
