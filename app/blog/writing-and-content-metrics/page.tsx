import React from 'react'
import Link from 'next/link'
import { PenTool, BarChart3, FileText, ArrowLeft, Sparkles, ExternalLink, Headphones, Glasses, Zap } from 'lucide-react'

export const metadata = {
  title: "「伝わる文章」をデータで裏付ける：文字数カウントと頻出語分析の活用",
  description: "Webライティングや論文作成において重要な文字数・行数の管理。推敲の質を高めるためのテキスト分析ツールの使い方。",
}

export default function WritingArticle() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12 md:py-20">
      <Link href="/blog" className="inline-flex items-center text-sm font-bold text-neutral-400 hover:text-violet-600 transition-colors mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" /> BACK TO GUIDE
      </Link>

      <article className="prose prose-neutral max-w-none">
        <header className="not-prose mb-12 border-b border-neutral-100 pb-10">
          <h1 className="text-3xl md:text-4xl font-black text-neutral-900 leading-tight mb-4">
            感性に「データ」をプラスする：<br className="hidden md:block" />
            推敲を加速させるテキスト計測術
          </h1>
          <div className="flex items-center gap-4 text-neutral-500 text-sm">
            <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full font-bold text-xs uppercase">Writing & Editorial</span>
            <time dateTime="2026-02-23">2026.02.23</time>
          </div>
        </header>

        <section className="mt-16">
          <div className="flex items-center gap-3 mb-4 text-violet-600">
            <FileText size={24} />
            <h2 className="m-0 text-2xl font-bold text-neutral-900">1. 文字数の「壁」を戦略的に突破する</h2>
          </div>
          <p>
            SEOライティングでは「3,000文字以上」、SNS投稿では「140文字以内」。
            書くべきボリュームは媒体によって決まっています。
            <Link href="/tools/mojisuu-count" className="mx-1 text-violet-600 underline">文字数カウント</Link> で、全角・半角・バイト数まで正確に把握することで、
            冗長な表現を削ぎ落とし、密度の高い文章を作成できます。
          </p>
        </section>

        <section className="mt-16">
          <div className="flex items-center gap-3 mb-4 text-violet-600">
            <BarChart3 size={24} />
            <h2 className="m-0 text-2xl font-bold text-neutral-900">2. 語彙の「偏り」を可視化する</h2>
          </div>
          <p>
            良い文章にはリズムがあります。特定の単語が何度も登場しすぎていないか、
            <Link href="/tools/char-frequency" className="mx-1 text-violet-600 underline">文字出現回数カウント</Link> を使って分析してみましょう。
            自分の「癖」を客観的なデータとして見ることで、類語辞典を引くべき箇所が明確になります。
          </p>
        </section>

        {/* AFFILIATE SECTION - CONOHA PENCIL */}
        <section className="mt-16 p-8 bg-neutral-900 rounded-3xl border border-neutral-800 not-prose text-white shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="text-violet-400 h-6 w-6" />
            <h2 className="text-xl font-bold text-white">執筆を加速させるAIアシスタント</h2>
          </div>
          <p className="text-neutral-400 text-sm mb-8 leading-relaxed">
            文字数の管理ができたら、次は「内容の質」です。AIの力を借りて、記事の構成案や導入文作成の時間を大幅に短縮しましょう。
          </p>
          
          <div className="bg-neutral-800 p-6 rounded-2xl border border-neutral-700 hover:border-violet-500 transition-all group">
            <div className="flex items-center gap-2 mb-2 text-violet-400">
              <Zap size={18} />
              <h3 className="text-lg font-bold">ConoHa Pencil</h3>
            </div>
            <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
              ブログ運営を超効率化。AIがあなたの代わりにキーワードから最適な文章構成を提案します。
            </p>
            {/* CONOHA PENCIL LINK */}
            <a href="//af.moshimo.com/af/c/click?a_id=5400050&p_id=2312&pc_id=4967&pl_id=89336" rel="nofollow" referrerPolicy="no-referrer-when-downgrade" className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 px-6 py-3 rounded-xl font-bold transition-all">
              Pencil で効率化を始める <ExternalLink size={16} />
            </a>
            <img src="//i.moshimo.com/af/i/impression?a_id=5400050&p_id=2312&pc_id=4967&pl_id=89336" width="1" height="1" style={{border:'none'}} loading="lazy" />
          </div>

          <div className="grid gap-4 mt-6 sm:grid-cols-2">
            <div className="bg-neutral-800 p-5 rounded-xl border border-neutral-700">
              <div className="flex items-center gap-2 mb-2 text-violet-400">
                <Glasses size={16} />
                <h3 className="text-sm font-bold">アイウェア</h3>
              </div>
              <p className="text-xs text-neutral-400">JINS SCREEN等で長時間の執筆による目の疲れを軽減。</p>
            </div>
            <div className="bg-neutral-800 p-5 rounded-xl border border-neutral-700">
              <div className="flex items-center gap-2 mb-2 text-violet-400">
                <Headphones size={16} />
                <h3 className="text-sm font-bold">オーディオ</h3>
              </div>
              <p className="text-xs text-neutral-400">ノイズキャンセリングで深い集中状態をキープ。</p>
            </div>
          </div>
        </section>

        <footer className="mt-20 pt-10 border-t border-neutral-100 text-center">
          <p className="text-sm text-neutral-500 italic">
            Benri Deskは、感性に頼りがちな文章作成に「正確な指標」を提供し、あなたの言葉の力を引き出します。
          </p>
        </footer>
      </article>
    </main>
  )
}