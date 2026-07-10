import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "file-size-units"

export const metadata: Metadata = {
  title: {
    absolute: "ファイルサイズとは？KB・MB・GB・TBの違い",
  },
  description:
    "ファイルサイズの基本と、KB・MB・GB・TBの違いや換算の考え方をわかりやすく解説します。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "ファイルサイズとは？KB・MB・GB・TBの違い",
    description:
      "ファイルサイズの基本と、KB・MB・GB・TBの違いや換算の考え方をわかりやすく解説します。",
    url: `https://benri-desk.com/guides/${slug}`,
  },
}

export default function FileSizeUnitsGuidePage() {
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  return <GuidePageFrame guide={guide} />
}
