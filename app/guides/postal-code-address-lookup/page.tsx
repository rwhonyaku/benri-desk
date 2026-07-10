import type { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidePageFrame from "@/components/GuidePageFrame"
import { getGuide } from "@/lib/guides"

const slug = "postal-code-address-lookup"

export const metadata: Metadata = {
  title: {
    absolute: "郵便番号から住所を調べる仕組みとは？入力時の注意点も解説",
  },
  description:
    "郵便番号から住所を調べる仕組みや、住所入力時に気をつけたい点をわかりやすく解説します。",
  alternates: {
    canonical: `/guides/${slug}`,
  },
  openGraph: {
    title: "郵便番号から住所を調べる仕組みとは？入力時の注意点も解説",
    description:
      "郵便番号から住所を調べる仕組みや、住所入力時に気をつけたい点をわかりやすく解説します。",
    url: `https://benri-desk.com/guides/${slug}`,
  },
}

export default function PostalCodeAddressLookupGuidePage() {
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  return <GuidePageFrame guide={guide} />
}
