import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "プライバシーポリシー | Benri Desk",
  description: "Benri Desk（オンライン便利ツール集）のプライバシーポリシーです。",
}

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8">
      <h1 className="text-xl font-semibold text-neutral-900">プライバシーポリシー</h1>

      <section className="mt-4 space-y-4 rounded-lg border border-neutral-200 bg-white p-4 text-sm text-neutral-800">
        <p>
          Benri Desk（以下「当サイト」）は、ユーザーの利便性向上のために必要な範囲で情報を取り扱います。
        </p>

        <div className="space-y-2">
          <h2 className="text-base font-medium text-neutral-900">広告について</h2>
          <p>
            当サイトは、第三者配信の広告サービス（Google AdSense）を利用する場合があります。広告配信事業者は、
            ユーザーの興味に応じた広告を表示するために Cookie を使用することがあります。
          </p>
          <p>
            Google による広告での Cookie の使用により、当サイトや他サイトへのアクセス情報に基づいて広告が配信されることがあります。
            パーソナライズ広告は{" "}
            <a
              className="underline"
              href="https://adssettings.google.com/"
              target="_blank"
              rel="noreferrer"
            >
              Google の広告設定
            </a>
            から無効にできます。
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-base font-medium text-neutral-900">アクセス解析について</h2>
          <p>当サイトは、現時点で個人を特定する目的のアクセス解析を行いません。</p>
        </div>

        <div className="space-y-2">
          <h2 className="text-base font-medium text-neutral-900">お問い合わせ</h2>
          <p>
            本ポリシーに関するお問い合わせは、{" "}
            <a className="underline" href="mailto:contact@benri-desk.com">
              contact@benri-desk.com
            </a>{" "}
            までご連絡ください。
          </p>
        </div>

        <p className="text-xs text-neutral-500">最終更新日：2025-12-17</p>
      </section>
    </main>
  )
}
