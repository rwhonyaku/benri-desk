import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "プライバシーポリシー | Benri Desk",
  description: "Benri Deskのプライバシーポリシーと入力内容の取り扱いについてのご案内です。",
}

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12 md:py-20">
      <header className="mb-12 border-b border-neutral-100 pb-8">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
          プライバシーポリシー
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-neutral-600">
          Benri Desk（以下「当サイト」）における情報の取り扱いについて記載します。
        </p>
      </header>

      <div className="space-y-10 text-sm leading-7 text-neutral-700">
        <section>
          <h2 className="mb-3 text-base font-bold text-neutral-900">入力内容の取り扱い</h2>
          <p>
            ユーザーが各ツールに入力した内容は、原則としてそのツールの処理と結果表示のために利用されます。
            多くのツールはブラウザ上で処理されますが、郵便番号検索など一部のツールでは、必要な結果を取得するために外部サービスへ通信する場合があります。
          </p>
          <p className="mt-3">
            当サイトがユーザー入力を保存する場合は、そのツール内で分かるように記載します。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-bold text-neutral-900">アクセス情報・解析について</h2>
          <p>
            当サイトでは、改善や利用状況の確認のため、アクセス解析などの外部サービスを使用する場合があります。
            その際、閲覧ページ、利用環境、アクセス日時などの基本的な情報が取得される場合があります。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-bold text-neutral-900">広告・Cookieについて</h2>
          <p>
            当サイトでは、運営状況に応じて広告配信サービスを利用する場合があります。
            広告やアクセス解析のために、Cookieなどの技術が使用される場合があります。
            Cookieはブラウザの設定により無効にできます。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-bold text-neutral-900">外部サービスについて</h2>
          <p>
            当サイトでは、サイト配信、アクセス解析、広告配信、郵便番号検索などのために外部サービスを使用する場合があります。
            外部サービス上で扱われる情報は、各サービスの規約やプライバシーポリシーに従って取り扱われます。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-bold text-neutral-900">お問い合わせ</h2>
          <p>
            本ポリシーに関するお問い合わせは、お問い合わせページからご連絡ください。
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-flex text-xs font-bold text-blue-600 underline underline-offset-4 hover:text-blue-700"
          >
            お問い合わせへ
          </Link>
        </section>

        <p className="border-t border-neutral-100 pt-8 text-xs text-neutral-400">
          最終更新日：2026-05-14
        </p>
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
