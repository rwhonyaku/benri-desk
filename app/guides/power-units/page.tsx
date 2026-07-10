import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "power-units"

export const metadata: Metadata = {
  title: {
    absolute: "仕事率・電力の単位とは？W・kW・MW・馬力の違い",
  },
  description:
    "仕事率・電力の単位であるW・kW・MW・馬力の違いや、家電・モーター・電力量との関係をわかりやすく解説します。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "仕事率・電力の単位とは？W・kW・MW・馬力の違い",
    description:
      "仕事率・電力の単位であるW・kW・MW・馬力の違いや、家電・モーター・電力量との関係をわかりやすく解説します。",
    url: `https://benri-desk.com/guides/${slug}`,
  },
}

export default function PowerUnitsGuidePage() {
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  return <GuidePageFrame guide={guide} />
}
