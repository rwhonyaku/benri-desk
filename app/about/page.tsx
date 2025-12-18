import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "このサイトについて | Benri Desk",
  description: "Benri Desk（オンライン便利ツール集）についての説明ページです。",
}

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8">
      <h1 className="text-xl font-semibold text-neutral-900">このサイトについて</h1>

      <section className="mt-4 space-y-4 rounded-lg border border-neutral-200 bg-white p-4 text-sm text-neutral-800">
        <p>
          Benri Desk は、日本向けの「オンライン便利ツール集」です。日常・事務・開発まわりで必要になりやすい小さな処理を、
          できるだけ静かに・確実に使える形で提供します。
        </p>
        <p>入力内容は保存しません。ログインやアカウント作成も不要です。</p>
      </section>
    </main>
  )
}
