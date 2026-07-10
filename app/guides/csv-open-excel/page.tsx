import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "csv-open-excel"

export const metadata: Metadata = {
  title: {
    absolute: "CSVをExcelで開く方法とは？文字化けや区切り崩れの注意点",
  },
  description:
    "CSVをExcelで開く方法や、文字化け・列の区切り崩れが起こる原因、開く前に確認したいポイントを解説します。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "CSVをExcelで開く方法とは？文字化けや区切り崩れの注意点",
    description:
      "CSVをExcelで開く方法や、文字化け・列の区切り崩れが起こる原因、開く前に確認したいポイントを解説します。",
    url: `https://benri-desk.com/guides/${slug}`,
  },
}

export default function CsvOpenExcelGuidePage() {
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  return <GuidePageFrame guide={guide} />
}
