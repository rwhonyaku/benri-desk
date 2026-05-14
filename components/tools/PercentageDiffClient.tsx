"use client"

import { useState, useMemo } from "react"

export default function PercentageDiffClient() {
  const [before, setBefore] = useState<number | "">(1000)
  const [after, setAfter] = useState<number | "">(1200)

  const stats = useMemo(() => {
    if (before === "" || after === "" || before === 0) return null

    const diff = Number(after) - Number(before)
    const percent = (diff / Math.abs(Number(before))) * 100
    
    return {
      diff: diff.toLocaleString(),
      percent: percent.toFixed(2),
      isIncrease: diff >= 0
    }
  }, [before, after])

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm space-y-4">
        <div>
          <label className="mb-1 block text-sm font-bold text-neutral-700 italic">元の値 (比較元)</label>
          <input 
            type="number" 
            value={before} 
            onChange={e => setBefore(e.target.value === "" ? "" : Number(e.target.value))} 
            className="w-full rounded border border-neutral-300 p-3 font-black text-xl outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-bold text-neutral-700 italic">新しい値 (比較先)</label>
          <input 
            type="number" 
            value={after} 
            onChange={e => setAfter(e.target.value === "" ? "" : Number(e.target.value))} 
            className="w-full rounded border border-neutral-300 p-3 font-black text-xl outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {stats && (
        <div className="space-y-4">
          <div className={`rounded-2xl border-2 p-8 text-center shadow-sm ${stats.isIncrease ? 'border-emerald-100 bg-emerald-50' : 'border-rose-100 bg-rose-50'}`}>
            <div className={`text-sm font-bold uppercase tracking-widest mb-2 ${stats.isIncrease ? 'text-emerald-500' : 'text-rose-500'}`}>
              変化率
            </div>
            <div className={`text-6xl font-black ${stats.isIncrease ? 'text-emerald-700' : 'text-rose-700'}`}>
              {stats.isIncrease ? "+" : ""}{stats.percent}%
            </div>
          </div>
          
          <div className="rounded-xl bg-neutral-50 p-4 text-center">
            <span className="text-sm font-bold text-neutral-500 italic">差分: </span>
            <span className={`text-lg font-black ${stats.isIncrease ? 'text-emerald-600' : 'text-rose-600'}`}>
              {stats.isIncrease ? "+" : ""}{stats.diff}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}