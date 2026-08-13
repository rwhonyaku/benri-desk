import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "pressure-units"

export const metadata: Metadata = {
  title: {
    absolute: "圧力の単位とは？bar・psi・MPa・kPaの違いと換算",
  },
  description:
    "圧力の単位であるbar・psi・MPa・kPa・Paの違いや、1bar・1psi・1MPaの換算例をわかりやすく解説します。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "圧力の単位とは？bar・psi・MPa・kPaの違いと換算",
    description:
      "圧力の単位であるbar・psi・MPa・kPa・Paの違いや、1bar・1psi・1MPaの換算例をわかりやすく解説します。",
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
