"use client"

import { useState, useMemo } from "react"

export default function UnitPriceCompareClient() {
  const [p1, setP1] = useState({ price: 500, qty: 300 })
  const [p2, setP2] = useState({ price: 1200, qty: 800 })

  const comparison = useMemo(() => {
    const unit1 = p1.price / p1.qty
    const unit2 = p2.price / p2.qty
    return {
      unit1,
      unit2,
      better: unit1 < unit2 ? 'A' : 'B',
      diff: Math.abs(unit1 - unit2)
    }
  }, [p1, p2])

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
          <label className="text-xs font-bold text-neutral-400 uppercase italic mb-2 block">商品 A</label>
          <input type="number" value={p1.price} onChange={e => setP1({...p1, price: Number(e.target.value)})} className="w-full border-b mb-2 p-1 text-sm font-bold" placeholder="価格"/>
          <input type="number" value={p1.qty} onChange={e => setP1({...p1, qty: Number(e.target.value)})} className="w-full border-b p-1 text-sm font-bold" placeholder="容量/個数"/>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
          <label className="text-xs font-bold text-neutral-400 uppercase italic mb-2 block">商品 B</label>
          <input type="number" value={p2.price} onChange={e => setP2({...p2, price: Number(e.target.value)})} className="w-full border-b mb-2 p-1 text-sm font-bold" placeholder="価格"/>
          <input type="number" value={p2.qty} onChange={e => setP2({...p2, qty: Number(e.target.value)})} className="w-full border-b p-1 text-sm font-bold" placeholder="容量/個数"/>
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm text-center">
        <div className="text-xs font-bold text-neutral-400 mb-4">1単位あたりの価格</div>
        <div className="flex justify-around items-end mb-6">
          <div className={comparison.better === 'A' ? "text-blue-600 font-black" : ""}>
            <div className="text-xs">商品 A</div>
            <div className="text-2xl">{comparison.unit1.toFixed(2)}円</div>
          </div>
          <div className="h-8 w-px bg-neutral-100" />
          <div className={comparison.better === 'B' ? "text-blue-600 font-black" : ""}>
            <div className="text-xs">商品 B</div>
            <div className="text-2xl">{comparison.unit2.toFixed(2)}円</div>
          </div>
        </div>
        <div className="rounded-lg bg-blue-50 py-3 text-sm font-black text-blue-700">
          商品 {comparison.better} の方がお得です！
        </div>
      </div>
    </div>
  )
}