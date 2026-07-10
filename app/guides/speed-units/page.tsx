import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "speed-units"

export const metadata: Metadata = {
  title: {
    absolute: "速度の単位とは？m/s・km/h・mph・ノットの違い",
  },
  description:
    "速度の単位であるm/s・km/h・mph・ノットの違いや、よく使う換算例をわかりやすく解説します。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "速度の単位とは？m/s・km/h・mph・ノットの違い",
    description:
      "速度の単位であるm/s・km/h・mph・ノットの違いや、よく使う換算例をわかりやすく解説します。",
    url: `https://benri-desk.com/guides/${slug}`,
  },
}

export default function SpeedUnitsGuidePage() {
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  return <GuidePageFrame guide={guide} />
}
