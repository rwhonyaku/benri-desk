import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "business-days-within-meaning"

export const metadata: Metadata = {
  title: {
    absolute: "「○営業日以内」とは？2営業日・3営業日の数え方と当日を含むかを解説",
  },
  description:
    "「2営業日以内」「3営業日以内」の意味や、当日を含むかどうか、土日祝を除いた営業日の数え方を解説します。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "「○営業日以内」とは？2営業日・3営業日の数え方と当日を含むかを解説",
    description:
      "「2営業日以内」「3営業日以内」の意味や、当日を含むかどうか、土日祝を除いた営業日の数え方を解説します。",
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
