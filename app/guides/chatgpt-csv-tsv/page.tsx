import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "chatgpt-csv-tsv"

export const metadata: Metadata = {
  title: {
    absolute: "ChatGPTでCSVをTSVに変換できる？専用ツールとの違い",
  },
  description:
    "ChatGPTなどのAIでCSVをTSVに変換する場合の注意点と、専用変換ツールを使うメリットを解説します。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "ChatGPTでCSVをTSVに変換できる？専用ツールとの違い",
    description:
      "ChatGPTなどのAIでCSVをTSVに変換する場合の注意点と、専用変換ツールを使うメリットを解説します。",
    url: `https://benri-desk.com/guides/${slug}`,
  },
}

export default function ChatgptCsvTsvGuidePage() {
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  return <GuidePageFrame guide={guide} />
}
