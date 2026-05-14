"use client"

import { useState, useMemo } from "react"

export default function DiscountCalcClient() {
  const [price, setPrice] = useState<number | "">(3000)
  const [percent, setPercent] = useState<number | "">(20)

  const result = useMemo(() => {
    if (price === "" || percent === "") return null
    const discount = Math.floor(price * (percent / 100))
    return {
      discount,
      final: price - discount
    }
  }, [price, percent])

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm space-y-4">
        <div>
          <label className="mb-1 block text-sm font-bold text-neutral-700 italic">元の価格</label>
          <div className="flex items-center gap-2">
            <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} className="flex-1 rounded border p-3 font-black text-xl"/>
            <span className="font-bold text-neutral-400">円</span>
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-bold text-neutral-700 italic text-right">割引率 (%)</label>
          <div className="flex items-center gap-2">
            <input type="number" value={percent} onChange={e => setPercent(Number(e.target.value))} className="flex-1 rounded border p-3 font-black text-xl text-blue-600 text-right"/>
            <span className="font-bold text-neutral-400">% OFF</span>
          </div>
        </div>
      </div>

      {result && (
        <div className="rounded-2xl border-2 border-rose-100 bg-rose-50 p-8 text-center shadow-sm">
          <div className="mb-2 text-sm font-bold text-rose-400 uppercase tracking-widest">割引後の価格</div>
          <div className="text-5xl font-black text-rose-600">
            {result.final.toLocaleString()}<span className="ml-2 text-2xl">円</span>
          </div>
          <div className="mt-4 text-sm font-bold text-rose-300 italic">
            お得になる金額: {result.discount.toLocaleString()}円
          </div>
        </div>
      )}
    </div>
  )
}