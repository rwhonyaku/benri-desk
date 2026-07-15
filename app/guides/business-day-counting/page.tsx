import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "business-day-counting"

export const metadata: Metadata = {
  title: {
    absolute: "稼働日とは？営業日・第一営業日との違いと数え方を解説",
  },
  description:
    "稼働日の意味、営業日・平日との違い、第一営業日や「○営業日前」「○営業日後」の数え方をわかりやすく解説します。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "稼働日とは？営業日・第一営業日との違いと数え方を解説",
    description:
      "稼働日の意味、営業日・平日との違い、第一営業日や「○営業日前」「○営業日後」の数え方をわかりやすく解説します。",
    url: `https://benri-desk.com/guides/${slug}`,
  },
}

export default function BusinessDayCountingGuidePage() {
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  return <GuidePageFrame guide={guide} />
}
