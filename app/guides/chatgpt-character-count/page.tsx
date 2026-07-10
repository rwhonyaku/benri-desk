import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "chatgpt-character-count"

export const metadata: Metadata = {
  title: {
    absolute: "ChatGPTで文字数カウントはできる？正確に数えるなら専用ツールが安全",
  },
  description:
    "ChatGPTなどのAIで文字数を数える場合の注意点と、文字数・バイト数を正確に確認する方法を解説します。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "ChatGPTで文字数カウントはできる？正確に数えるなら専用ツールが安全",
    description:
      "ChatGPTなどのAIで文字数を数える場合の注意点と、文字数・バイト数を正確に確認する方法を解説します。",
    url: `https://benri-desk.com/guides/${slug}`,
  },
}

export default function ChatgptCharacterCountGuidePage() {
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  return <GuidePageFrame guide={guide} />
}
