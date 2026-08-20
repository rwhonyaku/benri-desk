import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "csv-sort"

export const metadata: Metadata = {
  title: {
    absolute: "CSVソートの方法｜指定列で昇順・降順に並び替える",
  },
  description:
    "CSVを指定した列で昇順・降順に並び替える方法を解説します。見出し行や数値の扱いを確認し、そのまま無料ツールでソートできます。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "CSVソートの方法｜指定列で昇順・降順に並び替える",
    description:
      "CSVを指定した列で昇順・降順に並び替える方法を解説します。見出し行や数値の扱いを確認し、そのまま無料ツールでソートできます。",
    url: `https://benri-desk.com/guides/${slug}`,
  },
}

export default function CsvSortGuidePage() {
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  return <GuidePageFrame guide={guide} />
}
