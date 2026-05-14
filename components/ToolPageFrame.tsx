// components/ToolPageFrame.tsx
import Link from "next/link"
import { categoryMeta, type Tool } from "@/lib/tools"

export default function ToolPageFrame({
  tool,
  related,
  children,
}: {
  tool: Tool
  related: Tool[]
  children: React.ReactNode
}) {
  const category = categoryMeta[tool.category]
  const pageTitle = tool.pageTitleJa ?? tool.titleJa

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 md:py-16">
      <header className="mb-10">
        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
          <Link href="/" className="transition-colors hover:text-neutral-900">
            Benri Desk
          </Link>
          <span className="text-neutral-300">/</span>
          <Link href={category.href} className="text-neutral-500 transition-colors hover:text-neutral-900">
            {category.labelJa}
          </Link>
        </nav>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
          {pageTitle}
        </h1>

        <p className="mt-4 text-base leading-relaxed text-neutral-600">{tool.descriptionJa}</p>
      </header>

      <div className="relative">
        {tool.introLines && tool.introLines.length > 0 && (
          <section className="mb-8 rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-4">
            <div className="space-y-2 text-sm leading-7 text-neutral-700">
              {tool.introLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </section>
        )}

        {children}
      </div>

      <section className="mt-20">
        <div className="mb-6 flex items-center gap-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400">関連ツール</h2>
          <div className="h-px flex-1 bg-neutral-100" />
        </div>

        {related.length === 0 ? (
          <div className="rounded-xl border border-dashed border-neutral-200 p-6 text-center">
            <Link
              href={category.href}
              className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
            >
              {category.labelJa}の一覧を見る
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {related.map((t) => (
              <Link
                key={t.slug}
                className="group flex flex-col justify-between rounded-xl border border-neutral-200 bg-white p-5 transition-all hover:border-blue-400 hover:shadow-md"
                href={`/tools/${t.slug}`}
              >
                <div>
                  <div className="text-sm font-bold text-neutral-900 transition-colors group-hover:text-blue-600">
                    {t.titleJa}
                  </div>
                  <div className="mt-1 text-xs leading-relaxed text-neutral-500 line-clamp-1">
                    {t.descriptionJa}
                  </div>
                </div>
                <div className="mt-4 text-[10px] font-bold uppercase tracking-widest text-neutral-300 transition-colors group-hover:text-blue-400">
                  このツールを開く →
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <nav className="mt-16 border-t border-neutral-100 pt-10 text-center">
        <Link
          className="text-xs font-bold uppercase tracking-widest text-neutral-400 transition-all hover:text-neutral-900 hover:tracking-[0.3em]"
          href={category.href}
        >
          ← {category.labelJa}へ戻る
        </Link>
      </nav>
    </main>
  )
}
