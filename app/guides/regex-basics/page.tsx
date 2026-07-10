import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "regex-basics"

export const metadata: Metadata = {
  title: {
    absolute: "正規表現（Regex）とは？初心者向けに基本をわかりやすく解説",
  },
  description:
    "正規表現の意味、よく使う記号、検索・置換での使い方を初心者向けに解説します。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "正規表現（Regex）とは？初心者向けに基本をわかりやすく解説",
    description:
      "正規表現の意味、よく使う記号、検索・置換での使い方を初心者向けに解説します。",
    url: `https://benri-desk.com/guides/${slug}`,
  },
}

export default function RegexBasicsGuidePage() {
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  return <GuidePageFrame guide={guide} />
}
