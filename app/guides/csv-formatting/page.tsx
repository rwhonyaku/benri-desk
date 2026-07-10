import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "csv-formatting"

export const metadata: Metadata = {
  title: {
    absolute: "CSV整形とは？カンマ・引用符・改行の扱いをわかりやすく解説",
  },
  description:
    "CSV整形の基本と、カンマ・ダブルクォート・改行を含むデータを扱うときの注意点を解説します。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "CSV整形とは？カンマ・引用符・改行の扱いをわかりやすく解説",
    description:
      "CSV整形の基本と、カンマ・ダブルクォート・改行を含むデータを扱うときの注意点を解説します。",
    url: `https://benri-desk.com/guides/${slug}`,
  },
}

export default function CsvFormattingGuidePage() {
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  return <GuidePageFrame guide={guide} />
}
