import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "business-days-within-meaning"

export const metadata: Metadata = {
  title: {
    absolute: "「○営業日以内」とは？数え方と注意点をわかりやすく解説",
  },
  description:
    "「3営業日以内」などの意味や、当日を含むかどうか、土日祝を除いた数え方をわかりやすく解説します。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "「○営業日以内」とは？数え方と注意点をわかりやすく解説",
    description:
      "「3営業日以内」などの意味や、当日を含むかどうか、土日祝を除いた数え方をわかりやすく解説します。",
    url: `https://benri-desk.com/guides/${slug}`,
  },
}

export default function BusinessDaysWithinMeaningGuidePage() {
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  return <GuidePageFrame guide={guide} />
}
