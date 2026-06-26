import type { Metadata } from "next"
import Link from "next/link"
import { guides } from "@/lib/guides"

export const metadata: Metadata = {
  title: "ガイド",
  description: "Benri Deskのツールに関連する短い解説ページです。",
  alternates: {
    canonical: "/guides",
  },
}

export default function GuidesPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 md:py-16">
      <header className="mb-10">
        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
          <Link href="/" className="transition-colors hover:text-neutral-900">
            Benri Desk
          </Link>
          <span className="text-neutral-300">/</span>
          <span className="text-neutral-500">ガイド</span>
        </nav>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
          ガイド
        </h1>
        <p className="mt-4 text-base leading-relaxed text-neutral-600">
          ツールを使う前に確認しやすい、短い解説ページです。
        </p>
      </header>

      <div className="grid grid-cols-1 gap-3">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group rounded-xl border border-neutral-200 bg-white p-5 transition-all hover:border-blue-400 hover:shadow-md"
          >
            <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
              {guide.categoryLabel}
            </div>
            <h2 className="text-sm font-bold leading-tight text-neutral-900 transition-colors group-hover:text-blue-600">
              {guide.title}
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-neutral-500">
              {guide.description}
            </p>
          </Link>
        ))}
      </div>

      <nav className="mt-16 border-t border-neutral-100 pt-10 text-center">
        <Link
          className="text-xs font-bold uppercase tracking-widest text-neutral-400 transition-all hover:text-neutral-900 hover:tracking-[0.3em]"
          href="/"
        >
          ← ホームへ戻る
        </Link>
      </nav>
    </main>
  )
}
