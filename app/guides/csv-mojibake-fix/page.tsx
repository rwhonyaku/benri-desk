import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "csv-mojibake-fix"

export const metadata: Metadata = {
  title: {
    absolute: "CSVが文字化けする原因と対処法をわかりやすく解説",
  },
  description:
    "CSVで文字化けが起こる原因や、UTF-8・Shift_JISの違い、Excelで開くときの注意点を解説します。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "CSVが文字化けする原因と対処法をわかりやすく解説",
    description:
      "CSVで文字化けが起こる原因や、UTF-8・Shift_JISの違い、Excelで開くときの注意点を解説します。",
    url: `https://benri-desk.com/guides/${slug}`,
  },
}

export default function CsvMojibakeFixGuidePage() {
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  return <GuidePageFrame guide={guide} />
}
