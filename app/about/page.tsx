import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "運営情報 | Benri Desk",
  description: "Benri Deskの運営方針とツールの取り扱いについてのご案内です。",
}

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12 md:py-20">
      <header className="mb-12 border-b border-neutral-100 pb-8">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
          運営情報
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-neutral-600">
          Benri Desk は、日常作業で使う小さな計算・変換・確認をすばやく行うための無料ツール集です。
        </p>
      </header>

      <div className="space-y-10 text-sm leading-7 text-neutral-700">
        <section>
          <h2 className="mb-3 text-base font-bold text-neutral-900">このサイトについて</h2>
          <p>
            テキスト処理、日付計算、CSVの整形、Web・IT向けの基本確認など、日々の作業で使いやすい単機能のツールを掲載しています。
            会員登録やログインは不要です。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-bold text-neutral-900">ツールの方針</h2>
          <p>
            各ツールは、入力に対して決まった結果を返すシンプルな処理を基本にしています。
            必要以上に機能を増やさず、すぐに使えて結果を確認しやすい形を保つことを重視しています。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-bold text-neutral-900">入力内容の扱い</h2>
          <p>
            入力内容は、各ツールの処理に必要な範囲で扱われます。
            多くのツールはブラウザ上で処理されますが、郵便番号検索など一部のツールでは、結果取得のために外部サービスへの通信が発生する場合があります。
            入力内容を保存する場合は、そのツール内で分かるように記載します。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-bold text-neutral-900">正確性について</h2>
          <p>
            計算結果や変換結果は可能な範囲で確認していますが、すべての状況で完全な正確性を保証するものではありません。
            重要な計算や手続きに使う場合は、公式情報や一次情報もあわせて確認してください。
          </p>
        </section>

        <section className="rounded-2xl border border-neutral-100 bg-white p-6">
          <h2 className="mb-3 text-base font-bold text-neutral-900">連絡先</h2>
          <p>
            不具合の報告や掲載内容に関する連絡は、お問い合わせページからお願いします。
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-flex text-xs font-bold text-blue-600 underline underline-offset-4 hover:text-blue-700"
          >
            お問い合わせへ
          </Link>
        </section>
      </div>

      <div className="mt-16 text-center">
        <Link
          href="/"
          className="text-xs font-bold tracking-widest text-neutral-400 transition-colors hover:text-neutral-900"
        >
          ツール一覧へ戻る
        </Link>
      </div>
    </main>
  )
}
