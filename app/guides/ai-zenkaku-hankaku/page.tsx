import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "ai-zenkaku-hankaku"

export const metadata: Metadata = {
  title: {
    absolute: "AIで全角・半角チェックはできる？専用変換ツールとの違い",
  },
  description:
    "AIで全角・半角をチェック・変換する場合の注意点と、専用ツールを使うメリットを解説します。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "AIで全角・半角チェックはできる？専用変換ツールとの違い",
    description:
      "AIで全角・半角をチェック・変換する場合の注意点と、専用ツールを使うメリットを解説します。",
    url: `https://benri-desk.com/guides/${slug}`,
  },
}

export default function AiZenkakuHankakuGuidePage() {
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  return <GuidePageFrame guide={guide} />
}
