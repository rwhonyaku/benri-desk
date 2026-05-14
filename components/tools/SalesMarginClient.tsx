"use client"

import { useState, useMemo } from "react"

export default function SalesMarginClient() {
  const [cost, setCost] = useState<number | "">(1000)
  const [price, setPrice] = useState<number | "">(1500)

  const stats = useMemo(() => {
    if (!cost || !price) return null
    const profit = Number(price) - Number(cost)
    const margin = (profit / Number(price)) * 100
    return { profit, margin: margin.toFixed(1) }
  }, [cost, price])

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm space-y-4">
        <div>
          <label className="mb-1 block text-sm font-bold text-neutral-700 italic">原価 (円)</label>
          <input type="number" value={cost} onChange={e => setCost(Number(e.target.value))} className="w-full rounded border p-3 font-bold text-xl"/>
        </div>
        <div>
          <label className="mb-1 block text-sm font-bold text-neutral-700 italic">販売価格 (円)</label>
          <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} className="w-full rounded border p-3 font-bold text-xl"/>
        </div>
      </div>

      {stats && (
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-neutral-100 bg-white p-6 text-center shadow-sm">
            <div className="text-[10px] font-bold text-neutral-400 uppercase">粗利益</div>
            <div className="text-3xl font-black text-neutral-900">{stats.profit.toLocaleString()}<span className="text-sm ml-1">円</span></div>
          </div>
          <div className="rounded-2xl border border-neutral-100 bg-white p-6 text-center shadow-sm">
            <div className="text-[10px] font-bold text-neutral-400 uppercase">粗利率</div>
            <div className="text-3xl font-black text-blue-600">{stats.margin}<span className="text-sm ml-1">%</span></div>
          </div>
        </div>
      )}
    </div>
  )
}