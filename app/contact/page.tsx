import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "お問い合わせ | Benri Desk",
  description: "Benri Deskへの不具合報告やご連絡に関するページです。",
}

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12 md:py-20">
      <header className="mb-10 border-b border-neutral-100 pb-8">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
          お問い合わせ
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-neutral-600">
          Benri Desk に関する不具合報告、表示内容の修正依頼、その他のご連絡はこちらをご確認ください。
        </p>
      </header>

      <section className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
        <h2 className="mb-4 text-base font-bold text-neutral-900">連絡先</h2>
        <p className="text-sm leading-7 text-neutral-700">
          お問い合わせは、下記メールアドレスまでお送りください。
        </p>
        <div className="mt-5 flex w-fit items-center rounded-xl border border-neutral-100 bg-neutral-50 px-5 py-4">
          <span className="font-mono text-sm font-bold text-neutral-900 selection:bg-blue-100">
            contact@benri-desk.com
          </span>
        </div>

        <div className="mt-8 border-t border-neutral-100 pt-6">
          <h3 className="text-sm font-bold text-neutral-900">ご確認事項</h3>
          <ul className="mt-4 space-y-3">
            {[
              "返信をお約束するものではありませんが、確認が必要な内容は順次対応します。",
              "個別の法的判断、医療・金融に関する判断、本人確認に関する判断には対応できません。",
              "重要な計算結果や手続きに関する内容は、公式情報もあわせてご確認ください。",
            ].map((text) => (
              <li key={text} className="flex items-start gap-3 text-xs leading-relaxed text-neutral-500">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-300" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </section>

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
