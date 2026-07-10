import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "energy-units"

export const metadata: Metadata = {
  title: {
    absolute: "エネルギーの単位とは？J・kJ・cal・kcal・Wh・kWhの違い",
  },
  description:
    "エネルギーの単位であるJ・kJ・cal・kcal・Wh・kWhの違いや、食品表示・電力量で使う換算例を解説します。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "エネルギーの単位とは？J・kJ・cal・kcal・Wh・kWhの違い",
    description:
      "エネルギーの単位であるJ・kJ・cal・kcal・Wh・kWhの違いや、食品表示・電力量で使う換算例を解説します。",
    url: `https://benri-desk.com/guides/${slug}`,
  },
}

export default function EnergyUnitsGuidePage() {
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  return <GuidePageFrame guide={guide} />
}
