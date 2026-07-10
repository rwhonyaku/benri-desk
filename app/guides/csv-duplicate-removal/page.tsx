import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "csv-duplicate-removal"

export const metadata: Metadata = {
  title: {
    absolute: "CSV重複削除とは？同じ行を整理する方法をわかりやすく解説",
  },
  description:
    "CSVの重複行を削除する基本と、見出し行・完全一致・並び順・空白や文字違いの注意点を解説します。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "CSV重複削除とは？同じ行を整理する方法をわかりやすく解説",
    description:
      "CSVの重複行を削除する基本と、見出し行・完全一致・並び順・空白や文字違いの注意点を解説します。",
    url: `https://benri-desk.com/guides/${slug}`,
  },
}

export default function CsvDuplicateRemovalGuidePage() {
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  return <GuidePageFrame guide={guide} />
}
