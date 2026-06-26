import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "csv-tsv-difference"

export const metadata: Metadata = {
  title: {
    absolute: "CSVとTSVの違いとは？どちらを使うべきかをわかりやすく解説",
  },
  description:
    "CSVとTSVの違いや、カンマ区切りとタブ区切りの使い分けをわかりやすく解説します。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "CSVとTSVの違いとは？どちらを使うべきかをわかりやすく解説",
    description:
      "CSVとTSVの違いや、カンマ区切りとタブ区切りの使い分けをわかりやすく解説します。",
    url: `https://benri-desk.com/guides/${slug}`,
  },
}

export default function CsvTsvDifferenceGuidePage() {
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  return <GuidePageFrame guide={guide} />
}
