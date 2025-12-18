// app/sitemap.ts
import type { MetadataRoute } from "next"
import { tools } from "@/lib/tools"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://benri-desk.com"

  const toolUrls = tools.map((t) => ({
    url: `${base}/tools/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...toolUrls,
  ]
}
