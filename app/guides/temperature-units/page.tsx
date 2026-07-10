import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "temperature-units"

export const metadata: Metadata = {
  title: {
    absolute: "温度の単位とは？摂氏・華氏・ケルビンの違いをわかりやすく解説",
  },
  description:
    "温度の単位である摂氏（℃）・華氏（°F）・ケルビン（K）の違いや、よく使う換算例をわかりやすく解説します。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "温度の単位とは？摂氏・華氏・ケルビンの違いをわかりやすく解説",
    description:
      "温度の単位である摂氏（℃）・華氏（°F）・ケルビン（K）の違いや、よく使う換算例をわかりやすく解説します。",
    url: `https://benri-desk.com/guides/${slug}`,
  },
}

export default function TemperatureUnitsGuidePage() {
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  return <GuidePageFrame guide={guide} />
}
