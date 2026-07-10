import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "weight-units"

export const metadata: Metadata = {
  title: {
    absolute: "重さの単位とは？mg・g・kg・t・lbの違いをわかりやすく解説",
  },
  description:
    "重さの単位であるmg・g・kg・t・lb（ポンド）の違いや、よく使う換算例をわかりやすく解説します。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "重さの単位とは？mg・g・kg・t・lbの違いをわかりやすく解説",
    description:
      "重さの単位であるmg・g・kg・t・lb（ポンド）の違いや、よく使う換算例をわかりやすく解説します。",
    url: `https://benri-desk.com/guides/${slug}`,
  },
}

export default function WeightUnitsGuidePage() {
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  return <GuidePageFrame guide={guide} />
}
