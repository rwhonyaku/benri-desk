import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "length-units"

export const metadata: Metadata = {
  title: {
    absolute: "長さの単位とは？mm・cm・m・km・インチ・フィートの違い",
  },
  description:
    "長さの単位であるmm・cm・m・km・インチ・フィートの違いや、よく使う換算例をわかりやすく解説します。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "長さの単位とは？mm・cm・m・km・インチ・フィートの違い",
    description:
      "長さの単位であるmm・cm・m・km・インチ・フィートの違いや、よく使う換算例をわかりやすく解説します。",
    url: `https://benri-desk.com/guides/${slug}`,
  },
}

export default function LengthUnitsGuidePage() {
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  return <GuidePageFrame guide={guide} />
}
