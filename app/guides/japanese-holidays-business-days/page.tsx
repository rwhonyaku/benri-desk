import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "japanese-holidays-business-days"

export const metadata: Metadata = {
  title: {
    absolute: "日本の祝日とは？営業日との関係をわかりやすく解説",
  },
  description:
    "日本の祝日の基本や、土日祝を除く営業日計算・銀行営業日との関係をわかりやすく解説します。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "日本の祝日とは？営業日との関係をわかりやすく解説",
    description:
      "日本の祝日の基本や、土日祝を除く営業日計算・銀行営業日との関係をわかりやすく解説します。",
    url: `https://benri-desk.com/guides/${slug}`,
  },
}

export default function JapaneseHolidaysBusinessDaysGuidePage() {
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  return <GuidePageFrame guide={guide} />
}
