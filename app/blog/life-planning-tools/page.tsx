import React from 'react'
import Link from 'next/link'
import { Gift, CalendarDays, Hourglass, ArrowLeft, Heart, ExternalLink, Cake, PartyPopper } from 'lucide-react'

export const metadata = {
  title: "意外と知らない「自分の日数」：年齢計算と記念日管理で人生を可視化する",
  description: "生年月日から経過日数や次の誕生日までを算出. 履歴書作成やライフプランニングに役立つ日付ツールの活用ガイド。",
}

export default function LifePlanningArticle() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12 md:py-20">
      <Link href="/blog" className="inline-flex items-center text-sm font-bold text-neutral-400 hover:text-pink-600 transition-colors mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" /> BACK TO GUIDE
      </Link>

      <article className="prose prose-neutral max-w-none">
        <header className="not-prose mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-neutral-900 leading-tight mb-6">
            自分の「生きた日数」を知っていますか？<br className="hidden md:block" />
            年齢計算と記念日管理の重要性
          </h1>
          <div className="flex items-center gap-4 text-neutral-500 text-sm">
            <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full font-bold text-xs uppercase">Lifestyle & Planning</span>
            <time dateTime="2026-02-23">2026.02.23</time>
          </div>
        </header>

        <p className="text-lg leading-relaxed text-neutral-700">
          履歴書の「満年齢」欄や、保険の加入手続き。日常の中で「正確な日付の計算」を求められる場面は意外と多いものです。
          しかし、単なる事務作業としてだけでなく、自分の歩んできた日数や次の節目を可視化することは、豊かなライフプランニングにも繋がります。
        </p>

        <section className="mt-16">
          <div className="flex items-center gap-3 mb-4">
            <Hourglass className="text-pink-600 h-6 w-6" />
            <h2 className="m-0 text-2xl font-bold text-neutral-900">1. 「満年齢」と「数え年」の混同を防ぐ</h2>
          </div>
          <p>
            日本の公的な書類では「満年齢」が基本ですが、お祝い事（七五三や還暦など）では「数え年」を意識する場面もあります。
            当サイトの年齢計算ツールは、入力された生年月日から現在の正確な年齢を即座に算出します。
          </p>
          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 my-8">
            <h4 className="text-sm font-bold text-neutral-900 mt-0">関連ツール:</h4>
            <Link href="/tools/age-calculator" className="text-pink-600 font-bold hover:underline">
              年齢計算・経過日数確認ツール →
            </Link>
          </div>
        </section>

        <section className="mt-16">
          <div className="flex items-center gap-3 mb-4">
            <Gift className="text-pink-600 h-6 w-6" />
            <h2 className="m-0 text-2xl font-bold text-neutral-900">2. 次の誕生日、そして記念日までのカウントダウン</h2>
          </div>
          <p>
            「あと何日で10,000日目のお祝いか」「次の大きな節目まであと何日か」。
            日数を可視化することで、大切な人へのギフト選びや旅行の計画に、余裕を持った準備が可能になります。
          </p>
        </section>

        {/* REPLACED PLACEHOLDER WITH CLEAN RECOMMENDATION BOX */}
        <section className="mt-16 p-8 bg-neutral-900 rounded-3xl border border-neutral-800 not-prose text-white">
          <div className="flex items-center gap-3 mb-6">
            <Heart className="text-pink-400 h-6 w-6" />
            <h2 className="text-xl font-bold text-white">大切な節目を形に残す</h2>
          </div>
          <p className="text-neutral-400 text-sm mb-8 leading-relaxed">
            計算ツールで「日数」を確認したら、次は形に残る準備を。人生の節目にふさわしいギフトや、日々の感謝を伝えるアイテムは、早めにチェックしておくことで心のこもった選択ができます。
          </p>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-neutral-800 p-5 rounded-xl border border-neutral-700">
              <div className="flex items-center gap-2 mb-2 text-pink-400">
                <Cake size={16} />
                <h3 className="text-sm font-bold">カタログギフト・内祝い</h3>
              </div>
              <p className="text-xs text-neutral-400 mb-4">贈られた側が好きなものを選べる、失敗しないお祝いの定番です。</p>
              <span className="text-[10px] font-bold text-pink-400 flex items-center gap-1">
                GIFT SELECTION <ExternalLink size={10} />
              </span>
            </div>
            <div className="bg-neutral-800 p-5 rounded-xl border border-neutral-700">
              <div className="flex items-center gap-2 mb-2 text-pink-400">
                <PartyPopper size={16} />
                <h3 className="text-sm font-bold">記念日サプライズ</h3>
              </div>
              <p className="text-xs text-neutral-400 mb-4">特別な日の演出に欠かせない、人気のアニバーサリーグッズ。</p>
              <span className="text-[10px] font-bold text-pink-400 flex items-center gap-1">
                ITEM LIST <ExternalLink size={10} />
              </span>
            </div>
          </div>
          <p className="mt-6 text-[10px] text-neutral-500 text-center uppercase tracking-widest">Anniversary Planning</p>
        </section>

        <footer className="mt-20 pt-10 border-t border-neutral-100 text-center">
          <p className="text-sm text-neutral-500 italic">
            Benri Deskは、あなたが歩んだ時間を可視化し、これからの計画を彩るお手伝いをします。
          </p>
        </footer>
      </article>
    </main>
  )
}