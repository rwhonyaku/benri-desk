import React from 'react'
import Link from 'next/link'
import { Palmtree, Calendar, Plane, ArrowLeft, Map, ExternalLink, Hotel, Luggage } from 'lucide-react'

export const metadata = {
  title: "祝日カレンダーを味方につける：連休最大化と旅行計画の立て方",
  description: "日本の祝日・振替休日をフル活用して大型連休を作る方法。営業日計算ツールを使ったスマートな休暇申請術。",
}

export default function TravelPlanningArticle() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12 md:py-20">
      <Link href="/blog" className="inline-flex items-center text-sm font-bold text-neutral-400 hover:text-sky-600 transition-colors mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" /> BACK TO GUIDE
      </Link>

      <article className="prose prose-neutral max-w-none">
        <header className="not-prose mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-neutral-900 leading-tight mb-6">
            「カレンダー通り」を卒業する：<br className="hidden md:block" />
            祝日・営業日ツールを駆使した連休最大化術
          </h1>
          <div className="flex items-center gap-4 text-neutral-500 text-sm">
            <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full font-bold text-xs uppercase">Travel & Holidays</span>
            <time dateTime="2026-02-23">2026.02.23</time>
          </div>
        </header>

        <p className="text-lg leading-relaxed text-neutral-700">
          日本の祝日制度は、振替休日やハッピーマンデー制度により、年によって「大型連休の作りやすさ」が劇的に変わります。
          ただカレンダーを眺めるのではなく、ツールを使って「どこに有給を差し込めば最大化できるか」を数値で把握することが、賢いリフレッシュへの第一歩です。
        </p>

        <section className="mt-16">
          <div className="flex items-center gap-3 mb-4 text-sky-600">
            <Calendar size={24} />
            <h2 className="m-0 text-2xl font-bold text-neutral-900">1. 「祝日一覧」で今年のチャンスを特定する</h2>
          </div>
          <p>
            まずは今年の祝日の配置を確認しましょう。火曜日や木曜日が祝日の場合、その隣に有給を置くことで4連休が確定します。
            当サイトの祝日一覧ツールでは、今年の休日を一目で確認できるよう整理しています。
          </p>
          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 my-8">
            <Link href="/tools/holiday-list" className="text-sky-600 font-bold hover:underline italic">
              日本の祝日一覧を確認する →
            </Link>
          </div>
        </section>

        <section className="mt-16">
          <div className="flex items-center gap-3 mb-4 text-sky-600">
            <Map size={24} />
            <h2 className="m-0 text-2xl font-bold text-neutral-900">2. 「営業日計算」で休暇申請の根拠を作る</h2>
          </div>
          <p>
            「休みを取ると仕事が回らない」という不安は、実稼働日数を可視化することで解消できます。
            <Link href="/tools/working-days-count" className="mx-1 text-sky-600 underline">営業日カウント</Link> を使い、休暇前後の稼働日数を計算。
            チームに対して「この期間は実質〇営業日しかないので、前倒しで対応可能です」と定量的に伝えることが、スムーズな休暇取得のコツです。
          </p>
        </section>

        {/* REPLACED PLACEHOLDER WITH CLEAN RECOMMENDATION BOX */}
        <section className="mt-16 p-8 bg-neutral-900 rounded-3xl border border-neutral-800 not-prose text-white">
          <div className="flex items-center gap-3 mb-6">
            <Plane className="text-sky-400 h-6 w-6" />
            <h2 className="text-xl font-bold text-white">スマートな旅の準備</h2>
          </div>
          <p className="text-neutral-400 text-sm mb-8 leading-relaxed">
            日程が決まったら、早めの予約が最も経済的です。人気の宿泊施設や航空券は、連休が確定する前に押さえておくのが鉄則。
            浮いた予算で現地の食事を豪華にするなど、賢いプランニングを楽しみましょう。
          </p>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-neutral-800 p-5 rounded-xl border border-neutral-700">
              <div className="flex items-center gap-2 mb-2 text-sky-400">
                <Hotel size={16} />
                <h3 className="text-sm font-bold">宿泊・ツアー予約</h3>
              </div>
              <p className="text-xs text-neutral-400 mb-4">楽天トラベルやじゃらん等、ポイント還元率の高いサイトでの早期予約を推奨。</p>
              <span className="text-[10px] font-bold text-sky-400 flex items-center gap-1">
                CHECK VACANCIES <ExternalLink size={10} />
              </span>
            </div>
            <div className="bg-neutral-800 p-5 rounded-xl border border-neutral-700">
              <div className="flex items-center gap-2 mb-2 text-sky-400">
                <Luggage size={16} />
                <h3 className="text-sm font-bold">トラベルギア</h3>
              </div>
              <p className="text-xs text-neutral-400 mb-4">軽量スーツケースや機内快適グッズなど、移動の質を高めるアイテム。</p>
              <span className="text-[10px] font-bold text-sky-400 flex items-center gap-1">
                GEAR LIST <ExternalLink size={10} />
              </span>
            </div>
          </div>
          <p className="mt-6 text-[10px] text-neutral-500 text-center uppercase tracking-widest">Selected Travel Services</p>
        </section>

        <footer className="mt-20 pt-10 border-t border-neutral-100 text-center">
          <p className="text-sm text-neutral-500 italic">
            Benri Deskは、あなたの「休む勇気」と「楽しむ計画」をツールで応援します。
          </p>
        </footer>
      </article>
    </main>
  )
}