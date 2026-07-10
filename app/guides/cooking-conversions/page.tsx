import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "cooking-conversions"

export const metadata: Metadata = {
  title: {
    absolute: "料理の単位換算とは？小さじ・大さじ・カップ・ml・gの違い",
  },
  description:
    "料理で使う小さじ・大さじ・カップ・ml・gの違いや、レシピでよく使う換算例をわかりやすく解説します。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "料理の単位換算とは？小さじ・大さじ・カップ・ml・gの違い",
    description:
      "料理で使う小さじ・大さじ・カップ・ml・gの違いや、レシピでよく使う換算例をわかりやすく解説します。",
    url: `https://benri-desk.com/guides/${slug}`,
  },
}

export default function CookingConversionsGuidePage() {
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  return <GuidePageFrame guide={guide} />
}
