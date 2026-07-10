import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "csv-sort"

export const metadata: Metadata = {
  title: {
    absolute: "CSVソートとは？指定した列で行を並び替える方法を解説",
  },
  description:
    "CSVを指定した列でソートする基本と、昇順・降順、見出し行、数値と文字列の並び順の注意点を解説します。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "CSVソートとは？指定した列で行を並び替える方法を解説",
    description:
      "CSVを指定した列でソートする基本と、昇順・降順、見出し行、数値と文字列の並び順の注意点を解説します。",
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
