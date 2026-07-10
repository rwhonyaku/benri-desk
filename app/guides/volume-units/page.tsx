import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "volume-units"

export const metadata: Metadata = {
  title: {
    absolute: "体積・容量の単位とは？ml・L・m³・カップ・ガロンの違い",
  },
  description:
    "体積・容量の単位であるml・L・m³・カップ・ガロンの違いや、料理や日常で使う換算例をわかりやすく解説します。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "体積・容量の単位とは？ml・L・m³・カップ・ガロンの違い",
    description:
      "体積・容量の単位であるml・L・m³・カップ・ガロンの違いや、料理や日常で使う換算例をわかりやすく解説します。",
    url: `https://benri-desk.com/guides/${slug}`,
  },
}

export default function VolumeUnitsGuidePage() {
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  return <GuidePageFrame guide={guide} />
}
