import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "utf-8-bom-csv"

export const metadata: Metadata = {
  title: {
    absolute: "BOMとは？UTF-8 BOMとCSVの関係をわかりやすく解説",
  },
  description:
    "BOMの意味、UTF-8 BOM付きCSVが使われる理由、文字化けやExcelで開くときの注意点をわかりやすく解説します。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "BOMとは？UTF-8 BOMとCSVの関係をわかりやすく解説",
    description:
      "BOMの意味、UTF-8 BOM付きCSVが使われる理由、文字化けやExcelで開くときの注意点をわかりやすく解説します。",
    url: `https://benri-desk.com/guides/${slug}`,
  },
}

export default function Utf8BomCsvGuidePage() {
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  return <GuidePageFrame guide={guide} />
}
