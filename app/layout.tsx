// app/layout.tsx
import type { Metadata } from "next"
import "./globals.css"
import Link from "next/link"
import Script from "next/script"
import SiteFooter from "@/components/layout/SiteFooter"

export const metadata: Metadata = {
  metadataBase: new URL("https://benri-desk.com"),
  title: {
    default: "Benri Desk | オンライン便利ツール集",
    template: "%s | Benri Desk",
  },
  description:
    "日本向けのオンライン便利ツール集。会員登録なし・保存なし・シンプルに使える定番ユーティリティ。",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "Benri Desk",
    title: "Benri Desk | オンライン便利ツール集",
    description:
      "日本向けのオンライン便利ツール集。会員登録なし・保存なし・シンプルに使える定番ユーティリティ。",
    url: "https://benri-desk.com/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      {/* AdSense: sitewide verification + base script */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2711217631458410"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      <body className="min-h-dvh bg-neutral-50 text-neutral-900">
        <header className="border-b border-neutral-200 bg-white">
          <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-4">
            <Link href="/" className="group">
              <div className="text-base font-semibold tracking-tight group-hover:underline underline-offset-4">
                Benri Desk
              </div>
              <div className="text-xs text-neutral-500">
                オンライン便利ツール集
              </div>
            </Link>

            <div className="text-xs text-neutral-500">会員登録なし・保存なし</div>
          </div>
        </header>

        {children}

        <footer className="mt-12 border-t border-neutral-200 bg-white">
          <div className="mx-auto w-full max-w-3xl px-4 py-6 text-xs text-neutral-500">
            <p>© {new Date().getFullYear()} Benri Desk</p>

            <nav className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              <Link href="/about" className="hover:underline">
                このサイトについて
              </Link>
              <Link href="/privacy" className="hover:underline">
                プライバシーポリシー
              </Link>
              <Link href="/contact" className="hover:underline">
                お問い合わせ
              </Link>
            </nav>

            <p className="mt-2">
              広告はページ運営のために表示されます（各ページ1枠・控えめに配置）。
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
