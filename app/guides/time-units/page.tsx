import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "time-units"

export const metadata: Metadata = {
  title: {
    absolute: "時間の単位とは？秒・分・時間・日の違いと換算方法",
  },
  description:
    "時間の単位である秒・分・時間・日の違いや、よく使う換算例をわかりやすく解説します。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "時間の単位とは？秒・分・時間・日の違いと換算方法",
    description:
      "時間の単位である秒・分・時間・日の違いや、よく使う換算例をわかりやすく解説します。",
    url: `https://benri-desk.com/guides/${slug}`,
  },
}

export default function TimeUnitsGuidePage() {
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  return <GuidePageFrame guide={guide} />
}
