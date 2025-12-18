import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "お問い合わせ | Benri Desk",
  description: "Benri Desk（オンライン便利ツール集）のお問い合わせ先です。",
}

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8">
      <h1 className="text-xl font-semibold text-neutral-900">お問い合わせ</h1>

      <section className="mt-4 space-y-3 rounded-lg border border-neutral-200 bg-white p-4 text-sm text-neutral-800">
        <p>不具合報告・ご要望は下記までご連絡ください。</p>
        <p>
          <a className="underline" href="mailto:contact@benri-desk.com">
            contact@benri-desk.com
          </a>
        </p>
      </section>
    </main>
  )
}
