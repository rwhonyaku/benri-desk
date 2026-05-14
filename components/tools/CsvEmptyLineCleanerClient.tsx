"use client"

import { useState } from "react"

export default function CsvEmptyLineCleanerClient() {
  const [csv, setCsv] = useState("")

  const handleClean = () => {
    const lines = csv.split("\n")
    const cleaned = lines.filter(line => line.trim() !== "")
    setCsv(cleaned.join("\n"))
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-2 block text-sm font-bold text-neutral-700 italic">CSVデータを入力</label>
        <textarea
          className="h-48 w-full rounded-lg border border-neutral-300 p-4 text-xs font-mono text-neutral-900 outline-none focus:border-blue-500"
          value={csv}
          onChange={(e) => setCsv(e.target.value)}
          placeholder="空行を含んだCSVを貼り付けてください..."
        />
        <button
          onClick={handleClean}
          className="mt-4 w-full rounded-md bg-blue-600 py-3 text-sm font-bold text-white hover:bg-blue-700 active:scale-95 transition-all"
        >
          すべての空行を削除する
        </button>
        <div className="mt-4 flex justify-between">
          <button onClick={() => setCsv("")} className="text-xs text-neutral-400">クリア</button>
          <button onClick={() => navigator.clipboard.writeText(csv)} className="text-xs font-bold text-blue-600">コピー</button>
        </div>
      </div>
    </div>
  )
}