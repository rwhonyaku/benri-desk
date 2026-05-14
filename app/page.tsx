import Link from "next/link"
import { tools } from "@/lib/tools"

// Define the order and display names for your 8 categories
const CATEGORIES = [
  { id: "text", name: "テキスト・文字ツール", icon: "📝" },
  { id: "date", name: "日付・時間・営業日", icon: "📅" },
  { id: "network", name: "Web・IT 基本ツール", icon: "🌐" },
  { id: "dev", name: "CSV・データ処理", icon: "🛠️" },
  { id: "calc", name: "計算・変換ツール", icon: "🔢" },
  { id: "other", name: "日本向け実務ツール", icon: "🇯🇵" },
  { id: "time", name: "時間系シンプル", icon: "⏱️" },
  { id: "youtube", name: "YouTube補助", icon: "📺" },
] as const

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-5 py-12 md:py-20">
      {/* Header - Updated to Benri Desk branding */}
      <header className="mb-12">
        <h1 className="text-4xl font-black tracking-tight text-neutral-900 sm:text-5xl">
          Benri Desk
        </h1>
        <p className="mt-6 text-lg font-medium text-neutral-500 leading-relaxed">
          オンライン便利ツール集
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-600">
          ログイン不要で使える、日常作業向けのシンプルな無料ツール集です。
          入力内容は、各ツールの処理に必要な範囲でブラウザ上または必要な外部サービス上で扱われます。
        </p>
      </header>

      {/* Policy Snippet */}
      <div className="mb-16 flex flex-wrap gap-x-8 gap-y-4 border-y border-neutral-100 py-8">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-700">
          <span className="text-lg">🛡️</span> 必要最小限の処理
        </div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-700">
          <span className="text-lg">🚀</span> ログイン不要
        </div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-700">
          <span className="text-lg">🇯🇵</span> 日本向けツール
        </div>
      </div>

      {/* Categorized Tool Sections */}
      <div className="space-y-20">
        {CATEGORIES.map((cat) => {
          // Filter tools belonging to this category
          const categoryTools = tools.filter((t) => t.category === cat.id)
          
          if (categoryTools.length === 0) return null

          return (
            <section key={cat.id} id={cat.id} className="scroll-mt-20">
              <div className="mb-8 flex items-center gap-4">
                <h2 className="flex items-center gap-3 text-xl font-extrabold tracking-tight text-neutral-900">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-xl">
                    {cat.icon}
                  </span>
                  {cat.name}
                </h2>
                <div className="h-px flex-1 bg-neutral-100" />
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-300">
                  {categoryTools.length}件
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                {categoryTools.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/tools/${t.slug}`}
                    className="group relative flex flex-col justify-between rounded-xl border border-neutral-200 bg-white p-5 transition-all hover:border-blue-400 hover:shadow-md active:scale-[0.98]"
                  >
                    <div>
                      <h3 className="text-sm font-bold leading-tight text-neutral-900 group-hover:text-blue-600 transition-colors">
                        {t.titleJa}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-neutral-500 line-clamp-2">
                        {t.descriptionJa}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-300 group-hover:text-blue-400">
                        利用する
                      </span>
                      <span className="text-xs opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100 text-blue-500">
                        →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}
      </div>

      {/* Footer Info */}
      <footer className="mt-24 border-t border-neutral-100 pt-10 text-[11px] text-neutral-400 leading-6">
        <p className="font-bold text-neutral-500 mb-2 underline underline-offset-4 decoration-neutral-200">ご利用にあたって</p>
        <p>※ 郵便番号検索など、一部のツールでは結果取得のために外部サービスへの通信が発生します。</p>
        <p>※ 重要な計算や手続きに利用する場合は、公式情報や一次情報もあわせて確認してください。</p>
      </footer>
    </main>
  )
}
