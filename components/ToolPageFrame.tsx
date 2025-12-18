// components/ToolPageFrame.tsx
import Link from "next/link"
import type { Tool } from "@/lib/tools"

export default function ToolPageFrame({
  tool,
  related,
  children,
}: {
  tool: Tool
  related: Tool[]
  children: React.ReactNode
}) {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <header className="mb-6">
        <p className="text-sm text-neutral-500">Benri Desk / オンライン便利ツール集</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900">
          {tool.titleJa}
        </h1>
        <p className="mt-3 leading-7 text-neutral-700">{tool.descriptionJa}</p>
      </header>

      {children}

      <section className="mt-8">
        <h2 className="text-sm font-semibold text-neutral-900">関連ツール</h2>
        {related.length === 0 ? (
          <p className="mt-2 text-sm text-neutral-600">（準備中）</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {related.map((t) => (
              <li key={t.slug}>
                <Link
                  className="block rounded-md border border-neutral-200 bg-white px-4 py-3 hover:bg-neutral-50"
                  href={`/tools/${t.slug}`}
                >
                  <div className="text-sm font-medium text-neutral-900">{t.titleJa}</div>
                  <div className="mt-1 text-sm text-neutral-600">{t.descriptionJa}</div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <nav className="mt-10 text-sm">
        <Link className="text-neutral-700 underline underline-offset-4" href="/">
          ← ツール一覧へ
        </Link>
      </nav>
    </main>
  )
}
