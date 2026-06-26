import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "unit-conversion-meaning"

export const metadata: Metadata = {
  title: {
    absolute: "単位換算とは？よく使う長さ・重さ・温度の単位をわかりやすく解説",
  },
  description:
    "単位換算の基本と、長さ・重さ・温度・面積・体積・速度・圧力・エネルギーなどの違いや換算例をわかりやすく解説します。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "単位換算とは？よく使う長さ・重さ・温度の単位をわかりやすく解説",
    description:
      "単位換算の基本と、長さ・重さ・温度・面積・体積・速度・圧力・エネルギーなどの違いや換算例をわかりやすく解説します。",
    url: `https://benri-desk.com/guides/${slug}`,
  },
}

export default function UnitConversionMeaningGuidePage() {
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  return <GuidePageFrame guide={guide} />
}
