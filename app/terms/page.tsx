import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "利用規約 | Benri Desk",
  description: "Benri Deskの利用規約に関するページです。",
}

export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12 md:py-20">
      <header className="mb-12 border-b border-neutral-100 pb-8">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
          利用規約
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-neutral-600">
          Benri Desk（以下「本サイト」）を利用する際の基本的な条件を記載します。
        </p>
      </header>

      <div className="space-y-10 text-sm leading-7 text-neutral-700">
        <section>
          <h2 className="mb-3 text-base font-bold text-neutral-900">1. サービスの提供</h2>
          <p>
            本サイトのツールは、現状のまま無料で提供されます。
            予告なく内容の変更、停止、終了を行う場合があります。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-bold text-neutral-900">2. 結果の確認</h2>
          <p>
            各ツールの計算結果や変換結果は、完全な正確性を保証するものではありません。
            重要な計算、手続き、業務上の判断に利用する場合は、必ず利用者自身でも確認してください。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-bold text-neutral-900">3. 禁止事項</h2>
          <p>
            本サイトに過度な負荷をかける行為、不正アクセス、他者に迷惑をかける行為、公序良俗に反する利用は禁止します。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-bold text-neutral-900">4. 免責事項</h2>
          <p>
            本サイトの利用により生じた損害、データの消失、サービスの中断、結果の誤りについて、運営者は責任を負いかねます。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-bold text-neutral-900">5. 規約の変更</h2>
          <p>
            本規約は必要に応じて変更される場合があります。
            変更後の内容は、本サイトに掲載された時点から適用されます。
          </p>
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
