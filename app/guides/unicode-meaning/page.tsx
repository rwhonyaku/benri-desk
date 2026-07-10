import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "unicode-meaning"

export const metadata: Metadata = {
  title: {
    absolute: "Unicodeとは？UTF-8との違いをわかりやすく解説",
  },
  description:
    "Unicodeの基本やUTF-8との違い、日本語・絵文字・文字化けとの関係をわかりやすく解説します。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "Unicodeとは？UTF-8との違いをわかりやすく解説",
    description:
      "Unicodeの基本やUTF-8との違い、日本語・絵文字・文字化けとの関係をわかりやすく解説します。",
    url: `https://benri-desk.com/guides/${slug}`,
  },
}

export default function UnicodeMeaningGuidePage() {
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  return <GuidePageFrame guide={guide} />
}
