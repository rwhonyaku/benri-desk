import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ToolPageFrame from "@/components/ToolPageFrame"
import { getGuidesForToolSlug } from "@/lib/guides"
import { getTool } from "@/lib/tools"
import { toolComponents } from "@/lib/toolComponents"

type Props = { params: Promise<{ slug: string }> }

type ToolCategory = "text" | "date" | "network" | "dev" | "calc" | "other" | "time" | "youtube"

const CATEGORY_USES: Record<ToolCategory, string[]> = {
  text: [
    "貼り付けた文章の整形・クリーニング",
    "フォーム入力前の体裁調整",
    "コピペ由来の崩れの修正",
  ],
  date: [
    "日付・曜日・営業日の確認",
    "スケジュール作成時の入力ミス防止",
    "締切や反映日の目安チェック",
  ],
  network: [
    "Web・ネットワークの基本情報確認",
    "接続トラブル切り分けの初動チェック",
    "サポート問い合わせ前の情報整理",
  ],
  dev: [
    "CSVやデータ処理の簡易チェック",
    "加工前後の内容確認",
    "作業前の事前検証や再現テスト",
  ],
  calc: [
    "簡単な計算や換算",
    "見積もりや比較の目安計算",
    "手計算ミスの防止",
  ],
  other: [
    "日常の確認作業の時短",
    "入力ミスの発見と再確認",
    "作業前の目安チェック",
  ],
  time: [
    "短時間の計測や時間管理",
    "作業や学習の区切り管理",
    "シンプルな時間計測",
  ],
  youtube: [
    "YouTube URLや埋め込みの補助",
    "投稿作業前の確認",
    "必要最小限の動画関連作業",
  ],
}

const DEFAULT_NOTES: string[] = [
  "本ツールは補助目的です。重要な用途では、提出先や公式情報の仕様もご確認ください。",
  "入力データはブラウザ内で処理され、保存されません。",
]

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tool = getTool(slug)

  if (!tool) {
    return {}
  }

  const title = tool.pageTitleJa ?? tool.titleJa

  return {
    title,
    description: tool.descriptionJa,
    alternates: {
      canonical: `/tools/${tool.slug}`,
    },
    openGraph: {
      title,
      description: tool.descriptionJa,
      url: `https://benri-desk.com/tools/${tool.slug}`,
    },
  }
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params

  const tool = getTool(slug)
  if (!tool) notFound()

  const ToolComponent = toolComponents[slug]
  if (!ToolComponent) notFound()

  const related = tool.relatedSlugs
    .map((relatedSlug) => getTool(relatedSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))

  const relatedGuides = getGuidesForToolSlug(slug)

  const uses = CATEGORY_USES[tool.category as ToolCategory] ?? CATEGORY_USES.other

  return (
    <ToolPageFrame tool={tool} related={related} relatedGuides={relatedGuides}>
      <section className="mb-12">
        <ToolComponent />
      </section>

      {tool.articleHtml && (
        <article
          className="prose prose-neutral mt-16 max-w-none border-t border-neutral-200 pt-12 leading-8 text-neutral-800 prose-headings:font-bold prose-headings:text-neutral-900 prose-strong:text-neutral-900 prose-a:text-blue-600"
        >
          <div dangerouslySetInnerHTML={{ __html: tool.articleHtml }} />
        </article>
      )}

      <section className="mt-16 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-100 bg-neutral-50/50 px-6 py-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-400">ツールについて</h2>
        </div>

        <div className="p-6">
          <p className="text-sm font-medium leading-relaxed text-neutral-700">{tool.descriptionJa}</p>

          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
            <div>
              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900">
                <span className="h-1 w-3 rounded-full bg-blue-500"></span>
                よくある使い方
              </h3>
              <ul className="mt-4 space-y-3 pl-1">
                {uses.map((use) => (
                  <li key={use} className="flex items-start gap-3 text-sm text-neutral-600">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-neutral-300"></span>
                    {use}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900">
                <span className="h-1 w-3 rounded-full bg-rose-500"></span>
                ご利用上の注意
              </h3>
              <ul className="mt-4 space-y-3 pl-1">
                {DEFAULT_NOTES.map((note) => (
                  <li key={note} className="flex items-start gap-3 text-sm leading-relaxed text-neutral-600">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-neutral-300"></span>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-100 bg-neutral-50 px-6 py-4 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
            かんたん・すばやく・ブラウザで完結
          </p>
        </div>
      </section>
    </ToolPageFrame>
  )
}
