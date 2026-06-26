import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "business-day-meaning"

export const metadata: Metadata = {
  title: {
    absolute: "営業日とは？平日・稼働日との違いをわかりやすく解説",
  },
  description:
    "営業日・平日・稼働日の違いや、土日祝を除いた営業日の数え方をわかりやすく解説します。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "営業日とは？平日・稼働日との違いをわかりやすく解説",
    description:
      "営業日・平日・稼働日の違いや、土日祝を除いた営業日の数え方をわかりやすく解説します。",
    url: `https://benri-desk.com/guides/${slug}`,
  },
}

export default function BusinessDayMeaningGuidePage() {
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  return <GuidePageFrame guide={guide} />
}
