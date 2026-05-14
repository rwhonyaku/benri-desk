"use client"

import { useState } from "react"

export default function CsvHeaderRemoverClient() {
  const [csv, setCsv] = useState("")

  const handleRemoveHeader = () => {
    const lines = csv.split("\n")
    if (lines.length > 0) {
      setCsv(lines.slice(1).join("\n"))
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-2 block text-sm font-bold text-neutral-700 italic">CSVデータを入力</label>
        <textarea
          className="h-48 w-full rounded-lg border border-neutral-300 p-4 text-xs font-mono text-neutral-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
          value={csv}
          onChange={(e) => setCsv(e.target.value)}
          placeholder="id,name,email&#10;1,tanaka,test@example.com..."
        />
        
        <button
          onClick={handleRemoveHeader}
          className="mt-4 w-full rounded-md bg-rose-600 py-3 text-sm font-bold text-white hover:bg-rose-700 active:scale-95 transition-all"
        >
          最初の1行（ヘッダー）を削除する
        </button>

        <div className="mt-4 flex justify-between items-center">
          <button onClick={() => setCsv("")} className="text-xs text-neutral-400 hover:text-rose-500">クリア</button>
          <button 
            onClick={() => navigator.clipboard.writeText(csv)}
            className="text-xs font-bold text-blue-600 hover:text-blue-800"
          >
            結果をコピー
          </button>
        </div>
      </div>
    </div>
  )
}