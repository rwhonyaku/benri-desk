import React from 'react'
import Link from 'next/link'
import { ArrowRight, BookOpen, Clock, Tag } from 'lucide-react'

// Define your 10 articles here for the listing
const posts = [
  {
    title: "リモートワークの「地味なストレス」を解消する：IP確認とテキスト整形の重要性",
    description: "ネットワーク確認やテキストデータの整形作業を安全かつ効率的に進めるための実践ガイド。",
    slug: "remote-work-security",
    category: "Productivity",
    date: "2026.02.23",
  },
  {
    title: "個人事業主・事務職必見：業務を停滞させない「端数・営業日」の計算術",
    description: "消費税計算の端数処理や、祝日を考慮した営業日計算など、事務実務で発生するミスを防ぐための効率化。",
    slug: "business-efficiency",
    category: "Finance",
    date: "2026.02.23",
  },
  {
    title: "エンジニアの作業効率を最大化する：「ブラウザ完結型」開発補助ツールの活用術",
    description: "環境構築不要で使える、IP確認・エンコード・UUID生成など、開発現場で即戦力となるツールのガイド。",
    slug: "developer-productivity",
    category: "Dev",
    date: "2026.02.23",
  },
  {
    title: "自分の「生きた日数」を知っていますか？年齢計算と記念日管理の重要性",
    description: "履歴書作成やライフプランニングに役立つ日付ツールの活用方法と、人生の節目を可視化するメリット。",
    slug: "life-planning-tools",
    category: "Lifestyle",
    date: "2026.02.23",
  },
  {
    title: "その「手作業」、ツールで1秒に。大量データのクレンジング術",
    description: "重複行の削除、CSVの整理、不要な文字の一括除去など、手作業では不可能なデータ整形を自動化する方法。",
    slug: "data-cleanup-guide",
    category: "Data",
    date: "2026.02.23",
  },
  {
    title: "YouTubeクリエイターのための動画URL・サムネイル活用ガイド",
    description: "動画のURLから高画質なサムネイルを取得する方法や、SNSシェアに最適なURL短縮など、クリエイター向け解説。",
    slug: "youtube-creator-essentials",
    category: "Creative",
    date: "2026.02.23",
  },
  {
    title: "祝日カレンダーを味方につける：連休最大化と旅行計画の立て方",
    description: "日本の祝日・振替休日をフル活用して大型連休を作る方法。営業日計算ツールを使ったスマートな休暇申請術。",
    slug: "holiday-travel-planning",
    category: "Travel",
    date: "2026.02.23",
  },
  {
    title: "プライバシーを守る「最初の壁」：パスワード強度と形式チェックの重要性",
    description: "パスワードの強度判定や個人情報の形式チェック。ブラウザ完結型ツールで安全にセキュリティ意識を高める方法。",
    slug: "privacy-and-password-security",
    category: "Security",
    date: "2026.02.23",
  },
  {
    title: "「どっちがお得？」を秒で解決。買い物に役立つ割引率と単価計算のコツ",
    description: "セールの「〇〇％OFF」や「大容量パック」は本当にお得なのか。買い物で損をしないための数値判断術。",
    slug: "smart-shopping-calc",
    category: "Shopping",
    date: "2026.02.23",
  },
  {
    title: "感性に「データ」をプラスする：推敲を加速させるテキスト計測術",
    description: "Webライティングや論文作成において重要な文字数・行数の管理。推敲の質を高めるための分析ツールの使い方。",
    slug: "writing-and-content-metrics",
    category: "Writing",
    date: "2026.02.23",
  },
]

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-neutral-50 py-16 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
            <BookOpen size={14} />
            Benri Desk Blog
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-neutral-900 mb-6">
            知っておくと便利な、<br />日常と業務のヒント。
          </h1>
          <p className="text-neutral-500 max-w-2xl mx-auto text-lg">
            Benri Deskのツールを最大限に活用し、デジタルライフをより快適に、
            そして効率的にするためのガイド記事をお届けします。
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-3xl border border-neutral-200 p-8 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="flex items-center gap-1.5 text-xs font-bold text-neutral-400 uppercase tracking-widest">
                  <Tag size={12} />
                  {post.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium text-neutral-400">
                  <Clock size={12} />
                  {post.date}
                </span>
              </div>
              
              <h2 className="text-xl font-bold text-neutral-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                {post.title}
              </h2>
              
              <p className="text-neutral-500 text-sm leading-relaxed mb-8 line-clamp-3">
                {post.description}
              </p>

              <div className="mt-auto flex items-center text-blue-600 font-bold text-sm">
                READ ARTICLE 
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Footer info for SEO */}
        <div className="mt-20 pt-10 border-t border-neutral-200 text-center">
          <p className="text-neutral-400 text-xs uppercase tracking-widest font-bold mb-4">
            Total 10 Articles Published
          </p>
          <p className="text-neutral-500 text-sm max-w-lg mx-auto italic">
            記事の内容は、すべて実務や日常生活に基づいた検証を行っています。
            ツールの使い方や活用法に関するリクエストはいつでもお待ちしております。
          </p>
        </div>
      </div>
    </div>
  )
}