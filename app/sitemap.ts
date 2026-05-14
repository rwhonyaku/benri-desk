import type { MetadataRoute } from "next"
import { tools } from "@/lib/tools"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://benri-desk.com"
  const priorityToolSlugs = new Set([
    "bank-business-day",
    "working-days-count",
    "unit-converter",
    "mojisuu-count",
    "zenkaku-hankaku",
  ])

  // 1. Dynamic Tool Pages
  const toolUrls = tools.map((t) => ({
    url: `${base}/tools/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: priorityToolSlugs.has(t.slug) ? 0.9 : 0.8,
  }))

  // 2. Blog Post Slugs (The 10 articles we created)
  const blogSlugs = [
    "remote-work-security",
    "business-efficiency",
    "developer-productivity",
    "life-planning-tools",
    "data-cleanup-guide",
    "youtube-creator-essentials",
    "holiday-travel-planning",
    "privacy-and-password-security",
    "smart-shopping-calc",
    "writing-and-content-metrics",
  ]

  const blogUrls = blogSlugs.map((slug) => ({
    url: `${base}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  // 3. Static Policy & Info Pages
  const staticPages = ["about", "privacy", "terms", "contact", "blog"].map((page) => ({
    url: `${base}/${page}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: page === "blog" ? 0.9 : 0.5, // Blog index gets higher priority than policies
  }))

  return [
    // Home Page
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    ...staticPages,
    ...blogUrls,
    ...toolUrls,
  ]
}
