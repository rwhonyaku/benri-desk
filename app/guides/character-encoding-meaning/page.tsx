import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "character-encoding-meaning"

export const metadata: Metadata = {
  title: {
    absolute: "文字コードとは？UTF-8・Shift_JIS・Unicodeの違いをわかりやすく解説",
  },
  description:
    "文字コードの基本と、UTF-8・Shift_JIS・Unicodeの違い、文字化けが起こる理由をわかりやすく解説します。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "文字コードとは？UTF-8・Shift_JIS・Unicodeの違いをわかりやすく解説",
    description:
      "文字コードの基本と、UTF-8・Shift_JIS・Unicodeの違い、文字化けが起こる理由をわかりやすく解説します。",
    url: `https://benri-desk.com/guides/${slug}`,
  },
}

export default function CharacterEncodingMeaningGuidePage() {
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  return <GuidePageFrame guide={guide} />
}
