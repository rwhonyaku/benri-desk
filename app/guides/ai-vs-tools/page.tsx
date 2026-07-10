import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "ai-vs-tools"

export const metadata: Metadata = {
  title: {
    absolute: "AIと専用ツール、どちらを使うべき？正確な作業での違いを解説",
  },
  description:
    "AIと専用ツールの違いを、文字数カウント・CSV変換・営業日計算などの例でわかりやすく解説します。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "AIと専用ツール、どちらを使うべき？正確な作業での違いを解説",
    description:
      "AIと専用ツールの違いを、文字数カウント・CSV変換・営業日計算などの例でわかりやすく解説します。",
    url: `https://benri-desk.com/guides/${slug}`,
  },
}

export default function AiVsToolsGuidePage() {
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  return <GuidePageFrame guide={guide} />
}
