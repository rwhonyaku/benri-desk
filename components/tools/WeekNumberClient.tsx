"use client"

import { useState, useMemo } from "react"

export default function WeekNumberClient() {
  const [dateStr, setDateStr] = useState(new Date().toISOString().split('T')[0])

  const result = useMemo(() => {
    if (!dateStr) return null
    const date = new Date(dateStr)
    const day = date.getDate()
    const weekNum = Math.ceil(day / 7)
    const weekday = new Intl.DateTimeFormat("ja-JP", { weekday: "long" }).format(date)
    
    return { weekNum, weekday }
  }, [dateStr])

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-4 block text-sm font-bold text-neutral-700 italic">日付を選択</label>
        <input
          type="date"
          value={dateStr}
          onChange={(e) => setDateStr(e.target.value)}
          className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-xl font-semibold text-neutral-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
        />
      </div>

      {result && (
        <div className="rounded-2xl border-2 border-neutral-100 bg-white p-8 text-center shadow-sm">
          <div className="mb-2 text-sm font-bold tracking-widest text-neutral-400 uppercase">判定結果</div>
          <div className="text-4xl font-black text-neutral-900">
            第 {result.weekNum} {result.weekday}
          </div>
          <div className="mt-4 text-xs text-neutral-400">
            ※その月の何回目の曜日であるかを算出しています
          </div>
        </div>
      )}
    </div>
  )
}