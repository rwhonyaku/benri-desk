"use client"

import { useState, useMemo } from "react"

export default function LastDayOfMonthClient() {
  const [targetMonth, setTargetMonth] = useState(() => {
    const d = new Date()
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
  })

  const result = useMemo(() => {
    if (!targetMonth) return null
    const [year, month] = targetMonth.split("-").map(Number)
    const lastDay = new Date(year, month, 0)
    const weekday = new Intl.DateTimeFormat("ja-JP", { weekday: "short" }).format(lastDay)
    
    return {
      date: `${year}年${month}月${lastDay.getDate()}日`,
      weekday
    }
  }, [targetMonth])

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-4 block text-sm font-bold text-neutral-700 italic">年月を選択</label>
        <input
          type="month"
          value={targetMonth}
          onChange={(e) => setTargetMonth(e.target.value)}
          className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-xl font-black text-neutral-900 outline-none focus:border-blue-500"
        />
      </div>

      {result && (
        <div className="rounded-2xl border-2 border-neutral-100 bg-white p-8 text-center shadow-sm">
          <div className="mb-2 text-sm font-bold tracking-widest text-neutral-400 uppercase tracking-widest">対象月の末日</div>
          <div className="text-4xl font-black text-neutral-900">
            {result.date} <span className="text-2xl text-neutral-500">({result.weekday})</span>
          </div>
        </div>
      )}
    </div>
  )
}