import type { MetadataRoute } from "next"
import { guides } from "@/lib/guides"
import { tools } from "@/lib/tools"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://benri-desk.com"
  const priorityToolSlugs = new Set([
    "bank-business-day",
    "working-days-count",
    "next-business-day",
    "payment-due-date",
    "date-diff",
    "age-calculator",
    "week-number",
    "fiscal-year-calculator",
    "holiday-list",
    "unit-converter",
    "mojisuu-count",
    "zenkaku-hankaku",
    "regex-tester",
    "char-code-checker",
    "tsv-csv-converter",
    "csv-formatter",
    "csv-sort",
    "csv-quote-escape",
    "csv-column-extract",
    "csv-duplicate-remover",
    "csv-merge",
    "csv-split",
    "json-csv-converter",
    "yt-video-id",
    "yt-url-shorten",
    "yt-timestamp-generator",
    "yt-playlist-id",
    "yt-channel-id",
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

  const guideUrls = guides.map((guide) => ({
    url: `${base}/guides/${guide.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }))

  // 3. Static Policy & Info Pages
  const staticPages = ["about", "privacy", "terms", "contact", "blog", "guides"].map((page) => ({
    url: `${base}/${page}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: page === "guides" ? 0.7 : page === "blog" ? 0.6 : 0.5,
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
    ...guideUrls,
    ...toolUrls,
  ]
}
