import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "mph-meaning"

export const metadata: Metadata = {
  title: {
    absolute: "mphとは？km/hとの違いと換算方法をわかりやすく解説",
  },
  description:
    "mphの意味、km/hとの違い、1mphが何km/hか、海外の速度表示での使われ方をわかりやすく解説します。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "mphとは？km/hとの違いと換算方法をわかりやすく解説",
    description:
      "mphの意味、km/hとの違い、1mphが何km/hか、海外の速度表示での使われ方をわかりやすく解説します。",
    url: `https://benri-desk.com/guides/${slug}`,
  },
}

export default function MphMeaningGuidePage() {
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  return <GuidePageFrame guide={guide} />
}
