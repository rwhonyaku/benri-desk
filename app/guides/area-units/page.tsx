import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "area-units"

export const metadata: Metadata = {
  title: {
    absolute: "面積の単位とは？平方メートル・平方キロメートル・坪の違い",
  },
  description:
    "面積の単位である平方メートル、平方キロメートル、ヘクタール、坪、平方フィートなどの違いや換算例を解説します。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "面積の単位とは？平方メートル・平方キロメートル・坪の違い",
    description:
      "面積の単位である平方メートル、平方キロメートル、ヘクタール、坪、平方フィートなどの違いや換算例を解説します。",
    url: `https://benri-desk.com/guides/${slug}`,
  },
}

export default function AreaUnitsGuidePage() {
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  return <GuidePageFrame guide={guide} />
}
