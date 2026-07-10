import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "youtube-url-types"

export const metadata: Metadata = {
  title: {
    absolute: "YouTube URLの種類とは？通常URL・短縮URL・埋め込みURLの違い",
  },
  description:
    "YouTubeの通常URL・短縮URL・埋め込みURLの違いや、動画IDの確認方法をわかりやすく解説します。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "YouTube URLの種類とは？通常URL・短縮URL・埋め込みURLの違い",
    description:
      "YouTubeの通常URL・短縮URL・埋め込みURLの違いや、動画IDの確認方法をわかりやすく解説します。",
    url: `https://benri-desk.com/guides/${slug}`,
  },
}

export default function YoutubeUrlTypesGuidePage() {
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  return <GuidePageFrame guide={guide} />
}
