// app/page.tsx
import Link from "next/link"
import { tools } from "@/lib/tools"

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
        オンライン便利ツール集
      </h1>
      <p className="mt-3 leading-7 text-neutral-700">
        日本向けのシンプルな定番ツールをまとめています。会員登録なし・入力内容の保存なし。
      </p>

      <section className="mt-8">
        <h2 className="text-sm font-semibold text-neutral-900">ツール一覧</h2>
        <ul className="mt-3 space-y-2">
          {tools.map((t) => (
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
      </section>

      <section className="mt-10 rounded-lg border border-neutral-200 bg-white p-4">
        <h2 className="text-sm font-semibold text-neutral-900">このサイトについて</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-700">
          <li>日本語の検索意図に合わせた、恒久的なユーティリティ</li>
          <li>ログインなし・アカウントなし</li>
          <li>入力内容は保存しません</li>
        </ul>
      </section>
    </main>
  )
}
