import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "iso-8601-date-format"

export const metadata: Metadata = {
  title: {
    absolute: "ISO 8601とは？日付フォーマットの基本をわかりやすく解説",
  },
  description:
    "ISO 8601の日付・時刻フォーマット、UTCやタイムゾーン表記の基本をわかりやすく解説します。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "ISO 8601とは？日付フォーマットの基本をわかりやすく解説",
    description:
      "ISO 8601の日付・時刻フォーマット、UTCやタイムゾーン表記の基本をわかりやすく解説します。",
    url: `https://benri-desk.com/guides/${slug}`,
  },
}

export default function Iso8601DateFormatGuidePage() {
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  return <GuidePageFrame guide={guide} />
}
