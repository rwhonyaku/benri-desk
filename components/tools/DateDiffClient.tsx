"use client"

import { useState, useMemo } from "react"

export default function DateDiffClient() {
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")

  const diffDays = useMemo(() => {
    if (!start || !end) return null
    const s = new Date(start)
    const e = new Date(end)
    const diffTime = Math.abs(e.getTime() - s.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }, [start, end])

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-bold text-neutral-700 italic">開始日</label>
            <input
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-lg font-semibold outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-neutral-700 italic">終了日</label>
            <input
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-lg font-semibold outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {diffDays !== null && (
        <div className="rounded-2xl border-2 border-blue-100 bg-blue-50 p-8 text-center shadow-sm">
          <div className="mb-2 text-sm font-bold tracking-widest text-blue-500 uppercase">
            期間の差
          </div>
          <div className="text-5xl font-black text-blue-700">
            {diffDays}<span className="ml-2 text-2xl">日間</span>
          </div>
          <p className="mt-4 text-xs text-neutral-400">※開始日と終了日の差分を表示しています</p>
        </div>
      )}
    </div>
  )
}