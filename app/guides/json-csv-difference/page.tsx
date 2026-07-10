import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "json-csv-difference"

export const metadata: Metadata = {
  title: {
    absolute: "JSONとは？CSVとの違いと使い分けをわかりやすく解説",
  },
  description:
    "JSONとCSVの違いや、それぞれの特徴、データ形式の使い分けをわかりやすく解説します。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "JSONとは？CSVとの違いと使い分けをわかりやすく解説",
    description:
      "JSONとCSVの違いや、それぞれの特徴、データ形式の使い分けをわかりやすく解説します。",
    url: `https://benri-desk.com/guides/${slug}`,
  },
}

export default function JsonCsvDifferenceGuidePage() {
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  return <GuidePageFrame guide={guide} />
}
