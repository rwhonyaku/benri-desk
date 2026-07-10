import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "bank-business-day-meaning"

export const metadata: Metadata = {
  title: {
    absolute: "銀行営業日とは？土日祝・年末年始との関係をわかりやすく解説",
  },
  description:
    "銀行営業日の意味や、土日祝・年末年始・振込予定日との関係をわかりやすく解説します。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "銀行営業日とは？土日祝・年末年始との関係をわかりやすく解説",
    description:
      "銀行営業日の意味や、土日祝・年末年始・振込予定日との関係をわかりやすく解説します。",
    url: `https://benri-desk.com/guides/${slug}`,
  },
}

export default function BankBusinessDayMeaningGuidePage() {
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  return <GuidePageFrame guide={guide} />
}
