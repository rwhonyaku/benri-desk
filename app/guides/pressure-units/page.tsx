import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "pressure-units"

export const metadata: Metadata = {
  title: {
    absolute: "圧力の単位とは？Pa・kPa・MPa・bar・atm・psiの違い",
  },
  description:
    "圧力の単位であるPa・kPa・MPa・bar・atm・psiの違いや、空気圧・気圧・技術資料で使う換算例を解説します。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "圧力の単位とは？Pa・kPa・MPa・bar・atm・psiの違い",
    description:
      "圧力の単位であるPa・kPa・MPa・bar・atm・psiの違いや、空気圧・気圧・技術資料で使う換算例を解説します。",
    url: `https://benri-desk.com/guides/${slug}`,
  },
}

export default function PressureUnitsGuidePage() {
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  return <GuidePageFrame guide={guide} />
}
