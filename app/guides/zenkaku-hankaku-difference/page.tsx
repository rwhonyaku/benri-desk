import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "zenkaku-hankaku-difference"

export const metadata: Metadata = {
  title: {
    absolute: "全角・半角とは？違いと使い分けをわかりやすく解説",
  },
  description:
    "全角・半角の違いや、英数字・記号・日本語入力での使い分けをわかりやすく解説します。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "全角・半角とは？違いと使い分けをわかりやすく解説",
    description:
      "全角・半角の違いや、英数字・記号・日本語入力での使い分けをわかりやすく解説します。",
    url: `https://benri-desk.com/guides/${slug}`,
  },
}

export default function ZenkakuHankakuDifferenceGuidePage() {
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  return <GuidePageFrame guide={guide} />
}
