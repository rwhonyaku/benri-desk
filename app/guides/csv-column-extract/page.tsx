import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "csv-column-extract"

export const metadata: Metadata = {
  title: {
    absolute: "CSV列抽出とは？必要な列だけを取り出す方法をわかりやすく解説",
  },
  description:
    "CSVから指定した列だけを取り出す列抽出の基本と、列番号・見出し行・カンマや引用符の注意点を解説します。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "CSV列抽出とは？必要な列だけを取り出す方法をわかりやすく解説",
    description:
      "CSVから指定した列だけを取り出す列抽出の基本と、列番号・見出し行・カンマや引用符の注意点を解説します。",
    url: `https://benri-desk.com/guides/${slug}`,
  },
}

export default function CsvColumnExtractGuidePage() {
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  return <GuidePageFrame guide={guide} />
}
