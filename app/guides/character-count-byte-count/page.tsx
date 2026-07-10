import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "character-count-byte-count"

export const metadata: Metadata = {
  title: {
    absolute: "文字数とバイト数の違いとは？日本語入力で注意したいポイント",
  },
  description:
    "文字数とバイト数の違いや、UTF-8で日本語のバイト数が増える理由をわかりやすく解説します。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "文字数とバイト数の違いとは？日本語入力で注意したいポイント",
    description:
      "文字数とバイト数の違いや、UTF-8で日本語のバイト数が増える理由をわかりやすく解説します。",
    url: `https://benri-desk.com/guides/${slug}`,
  },
}

export default function CharacterCountByteCountGuidePage() {
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  return <GuidePageFrame guide={guide} />
}
