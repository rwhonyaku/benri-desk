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
    "日本向けのオンライン便利ツール集。ログイン不要で使えるシンプルな定番ユーティリティ。",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "Benri Desk",
    title: "Benri Desk | オンライン便利ツール集",
    description:
      "日本向けのオンライン便利ツール集。ログイン不要で使えるシンプルな定番ユーティリティ。",
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
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2711217631458410"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-dvh bg-paper font-sans text-neutral-900 antialiased">
        {/* Navigation / Header */}
        <header className="border-b border-t-2 border-b-neutral-200 border-t-rose-500 bg-white">
          <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-5 py-5">
            <Link href="/" className="group flex flex-col gap-0.5">
              <div className="text-lg font-bold tracking-tight text-neutral-900 group-hover:text-blue-600 transition-colors">
                Benri Desk
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                オンライン便利ツール集
              </div>
            </Link>

            <nav aria-label="主要メニュー" className="flex items-center gap-5 text-xs font-bold text-neutral-600">
              <Link href="/" className="transition-colors hover:text-blue-600">
                ツール一覧
              </Link>
              <Link href="/guides" className="transition-colors hover:text-blue-600">
                ガイド
              </Link>
            </nav>
          </div>
        </header>

        {/* Global Wrapper */}
        <div className="relative">
          {children}
        </div>

        {/* Unified Footer Component */}
        <SiteFooter />
      </body>
    </html>
  )
}
