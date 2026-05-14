import React from 'react'
import Link from 'next/link'
import { ShoppingCart, Percent, Tag, ArrowLeft, Coins, ExternalLink, TrendingDown, CreditCard } from 'lucide-react'

export const metadata = {
  title: "「どっちがお得？」を秒で解決。買い物に役立つ割引率と単価計算のコツ",
  description: "セールの「〇〇％OFF」や「大容量パック」は本当にお得なのか。買い物で損をしないための計算ツールの活用方法。",
}

export default function ShoppingCalcArticle() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12 md:py-20">
      <Link href="/blog" className="inline-flex items-center text-sm font-bold text-neutral-400 hover:text-orange-600 transition-colors mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" /> BACK TO GUIDE
      </Link>

      <article className="prose prose-neutral max-w-none">
        <header className="not-prose mb-12 text-center">
          <h1 className="text-3xl md:text-5xl font-black text-neutral-900 leading-tight mb-6 italic">
            SHOPPING SMART.
          </h1>
          <p className="text-xl text-neutral-600 font-medium">セールで「損をしない」ための数値判断術</p>
        </header>

        <section className="mt-16">
          <div className="flex items-center gap-3 mb-4 text-orange-600">
            <Percent size={24} />
            <h2 className="m-0 text-2xl font-bold text-neutral-900">1. 「〇〇％OFF」の罠にかからない</h2>
          </div>
          <p>
            「メーカー希望小売価格から30%OFF！」という表示。元値が少し高いだけで、実は他のショップの定価より高いこともあります。
            <Link href="/tools/discount-calc" className="mx-1 text-orange-600 underline">割引計算ツール</Link> を使い、冷静に「実質いくらなのか」を算出。
            さらに <Link href="/tools/tax-calc" className="mx-1 text-orange-600 underline">消費税計算</Link> で税込の最終支払額を把握することが、衝動買いを防ぐ鍵です。
          </p>
        </section>

        <section className="mt-16">
          <div className="flex items-center gap-3 mb-4 text-orange-600">
            <Coins size={24} />
            <h2 className="m-0 text-2xl font-bold text-neutral-900">2. 「大容量＝お得」とは限らない</h2>
          </div>
          <p>
            詰め替え用の方が100mlあたりの単価が高いケースは、残念ながらよくあります。
            複数の商品を比較する際は <Link href="/tools/percentage-diff" className="mx-1 text-orange-600 underline">パーセンテージ差分計算</Link> を代用して、
            どちらがどれだけ割安なのかを数値で比較しましょう。
          </p>
        </section>

        {/* REPLACED PLACEHOLDER WITH CLEAN RECOMMENDATION BOX */}
        <section className="mt-16 p-8 bg-neutral-900 rounded-3xl border border-neutral-800 not-prose text-white shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <TrendingDown className="text-orange-400 h-6 w-6" />
            <h2 className="text-xl font-bold text-white">賢い買い物のためのステップ</h2>
          </div>
          <p className="text-neutral-400 text-sm mb-8 leading-relaxed">
            Amazonプライムデーや楽天スーパーSALEを攻略するには、事前のリストアップが不可欠です。
            キャンペーンへのエントリーを済ませ、当サイトの計算ツールを片手に、ポイント還元率を最大限に高めましょう。
          </p>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-neutral-800 p-5 rounded-xl border border-neutral-700">
              <div className="flex items-center gap-2 mb-2 text-orange-400">
                <ShoppingCart size={16} />
                <h3 className="text-sm font-bold">大手ECセールの活用</h3>
              </div>
              <p className="text-xs text-neutral-400 mb-4">定期的なビッグセール期間に合わせ、消耗品をまとめて購入するのが最も効率的です。</p>
              <span className="text-[10px] font-bold text-orange-400 flex items-center gap-1">
                CHECK TODAY'S DEALS <ExternalLink size={10} />
              </span>
            </div>
            <div className="bg-neutral-800 p-5 rounded-xl border border-neutral-700">
              <div className="flex items-center gap-2 mb-2 text-orange-400">
                <CreditCard size={16} />
                <h3 className="text-sm font-bold">高還元率ポイント経済圏</h3>
              </div>
              <p className="text-xs text-neutral-400 mb-4">クレジットカードやキャッシュバックを活用し、実質価格をさらに引き下げる手法。</p>
              <span className="text-[10px] font-bold text-orange-400 flex items-center gap-1">
                OPTIMIZE REWARDS <ExternalLink size={10} />
              </span>
            </div>
          </div>
          <p className="mt-6 text-[10px] text-neutral-500 text-center uppercase tracking-widest">Selected Shopping Resources</p>
        </section>

        <footer className="mt-20 pt-10 border-t border-neutral-100 text-center">
          <p className="text-sm text-neutral-500 italic">
            Benri Deskは、あなたの「買う理由」を数値で裏付けし、後悔のない買い物をサポートします。
          </p>
        </footer>
      </article>
    </main>
  )
}