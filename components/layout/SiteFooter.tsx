import Link from "next/link"

export default function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-neutral-200 bg-white">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-4 py-6 text-sm text-neutral-700 md:flex-row md:items-center md:justify-between">
        <div className="text-neutral-600">© {new Date().getFullYear()} Benri Desk</div>
        <nav className="flex flex-wrap gap-x-4 gap-y-2">
          <Link className="hover:underline" href="/about">
            このサイトについて
          </Link>
          <Link className="hover:underline" href="/privacy">
            プライバシーポリシー
          </Link>
          <Link className="hover:underline" href="/contact">
            お問い合わせ
          </Link>
        </nav>
      </div>
    </footer>
  )
}
