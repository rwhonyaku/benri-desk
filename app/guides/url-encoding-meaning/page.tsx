import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "url-encoding-meaning"

export const metadata: Metadata = {
  title: {
    absolute: "URLエンコードとは？なぜ必要なのかをわかりやすく解説",
  },
  description:
    "URLエンコード・URLデコード・パーセントエンコードの意味や、URLで日本語や記号を扱う理由を解説します。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "URLエンコードとは？なぜ必要なのかをわかりやすく解説",
    description:
      "URLエンコード・URLデコード・パーセントエンコードの意味や、URLで日本語や記号を扱う理由を解説します。",
    url: `https://benri-desk.com/guides/${slug}`,
  },
}

export default function UrlEncodingMeaningGuidePage() {
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  return <GuidePageFrame guide={guide} />
}
