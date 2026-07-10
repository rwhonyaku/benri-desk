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

const CATEGORY_GUIDE_LINKS: Partial<Record<(typeof CATEGORIES)[number]["id"], { href: string; label: string }[]>> = {
  text: [
    {
      href: "/guides/zenkaku-hankaku-difference",
      label: "全角・半角の違い",
    },
    {
      href: "/guides/character-count-byte-count",
      label: "文字数とバイト数の違い",
    },
    {
      href: "/guides/regex-basics",
      label: "正規表現（Regex）とは？",
    },
  ],
  date: [
    {
      href: "/guides/business-day-meaning",
      label: "営業日とは？平日・稼働日との違い",
    },
    {
      href: "/guides/iso-8601-date-format",
      label: "ISO 8601とは？日付フォーマットの基本",
    },
    {
      href: "/guides/japanese-holidays-business-days",
      label: "日本の祝日とは？営業日との関係",
    },
    {
      href: "/guides/bank-business-day-meaning",
      label: "銀行営業日とは？",
    },
    {
      href: "/guides/business-days-within-meaning",
      label: "「○営業日以内」とは？",
    },
  ],
  network: [
    {
      href: "/guides/character-encoding-meaning",
      label: "文字コードとは？UTF-8・Shift_JIS・Unicodeの違い",
    },
    {
      href: "/guides/unicode-meaning",
      label: "Unicodeとは？UTF-8との違い",
    },
    {
      href: "/guides/url-encoding-meaning",
      label: "URLエンコードとは？",
    },
  ],
  dev: [
    {
      href: "/guides/csv-tsv-difference",
      label: "CSVとTSVの違い",
    },
    {
      href: "/guides/csv-open-excel",
      label: "CSVをExcelで開く方法",
    },
    {
      href: "/guides/csv-formatting",
      label: "CSV整形とは？引用符・改行の扱い",
    },
    {
      href: "/guides/csv-column-extract",
      label: "CSV列抽出とは？必要な列だけを取り出す",
    },
    {
      href: "/guides/csv-duplicate-removal",
      label: "CSV重複削除とは？同じ行を整理する",
    },
    {
      href: "/guides/csv-sort",
      label: "CSVソートとは？指定列で並び替える",
    },
    {
      href: "/guides/json-csv-difference",
      label: "JSONとは？CSVとの違い",
    },
    {
      href: "/guides/csv-mojibake-fix",
      label: "CSVが文字化けする原因と対処法",
    },
  ],
  calc: [
    {
      href: "/guides/unit-conversion-meaning",
      label: "単位換算とは？長さ・重さ・温度の単位",
    },
    {
      href: "/guides/file-size-units",
      label: "ファイルサイズとは？KB・MB・GBの違い",
    },
    {
      href: "/guides/temperature-units",
      label: "温度の単位とは？摂氏・華氏・ケルビン",
    },
    {
      href: "/guides/length-units",
      label: "長さの単位とは？mm・cm・m・km",
    },
    {
      href: "/guides/weight-units",
      label: "重さの単位とは？mg・g・kg・lb",
    },
    {
      href: "/guides/area-units",
      label: "面積の単位とは？平方メートル・坪",
    },
    {
      href: "/guides/volume-units",
      label: "体積・容量の単位とは？ml・L・m³",
    },
    {
      href: "/guides/speed-units",
      label: "速度の単位とは？m/s・km/h・mph",
    },
    {
      href: "/guides/pressure-units",
      label: "圧力の単位とは？Pa・kPa・psi",
    },
    {
      href: "/guides/energy-units",
      label: "エネルギーの単位とは？J・kcal・kWh",
    },
    {
      href: "/guides/power-units",
      label: "仕事率・電力の単位とは？W・kW・馬力",
    },
    {
      href: "/guides/cooking-conversions",
      label: "料理の単位換算とは？小さじ・大さじ",
    },
    {
      href: "/guides/time-units",
      label: "時間の単位とは？秒・分・時間・日",
    },
  ],
  other: [
    {
      href: "/guides/postal-code-address-lookup",
      label: "郵便番号から住所を調べる仕組み",
    },
  ],
  youtube: [
    {
      href: "/guides/youtube-url-types",
      label: "YouTube URLの種類と違い",
    },
  ],
}

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

              {CATEGORY_GUIDE_LINKS[cat.id] && (
                <div className="mt-5 flex flex-wrap gap-3 text-xs font-bold text-neutral-500">
                  {CATEGORY_GUIDE_LINKS[cat.id]?.map((guide) => (
                    <Link
                      key={guide.href}
                      href={guide.href}
                      className="transition-colors hover:text-blue-600"
                    >
                      関連ガイド：{guide.label}
                    </Link>
                  ))}
                </div>
              )}
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
