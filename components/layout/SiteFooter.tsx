import Link from "next/link"

export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-neutral-200 bg-white">
      <div className="mx-auto w-full max-w-3xl px-5 py-10">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <div className="text-sm font-bold text-neutral-900">Benri Desk</div>
            <p className="mt-2 text-xs leading-relaxed text-neutral-500">
              ログイン不要で使える、日常作業向けのシンプルな無料ツール集です。
            </p>
          </div>
          <div className="flex flex-col sm:items-end">
            <nav className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-bold text-neutral-400 sm:justify-end">
              <Link href="/" className="hover:text-neutral-900 transition-colors">ホーム</Link>
              <Link href="/about" className="hover:text-neutral-900 transition-colors">運営情報</Link>
              <Link href="/privacy" className="hover:text-neutral-900 transition-colors">プライバシーポリシー</Link>
              <Link href="/terms" className="hover:text-neutral-900 transition-colors">利用規約</Link>
              <Link href="/contact" className="hover:text-neutral-900 transition-colors">お問い合わせ</Link>
            </nav>
            <p className="mt-4 text-[10px] text-neutral-400">
              © {new Date().getFullYear()} Benri Desk Project
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
