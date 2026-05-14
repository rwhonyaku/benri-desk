"use client"

import { useState, useMemo } from "react"

export default function CsvRowCountClient() {
  const [csv, setCsv] = useState("")

  const count = useMemo(() => {
    if (!csv.trim()) return 0
    return csv.trim().split("\n").length
  }, [csv])

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-2 block text-sm font-bold text-neutral-700 italic">CSVデータを貼り付け</label>
        <textarea
          className="h-64 w-full rounded-lg border border-neutral-300 p-4 text-xs font-mono text-neutral-900 outline-none focus:border-blue-500"
          value={csv}
          onChange={(e) => setCsv(e.target.value)}
          placeholder="CSVを貼り付けると自動で行数を集計します..."
        />
      </div>

      <div className="rounded-2xl border-2 border-neutral-100 bg-white p-8 text-center shadow-sm">
        <div className="text-sm font-bold text-neutral-400 uppercase tracking-widest">現在の行数</div>
        <div className="mt-2 text-5xl font-black text-neutral-900">
          {count.toLocaleString()}<span className="ml-2 text-xl text-neutral-400">行</span>
        </div>
        <button 
          onClick={() => setCsv("")}
          className="mt-6 text-xs text-neutral-400 hover:text-rose-500"
        >
          クリアする
        </button>
      </div>
    </div>
  )
}