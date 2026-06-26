"use client"

import { useMemo, useState } from "react"
import { parseDelimitedRows, stringifyDelimitedRows } from "@/lib/csvUtils"

export default function CsvFormatterClient() {
  const [csv, setCsv] = useState("")

  const result = useMemo(() => {
    if (!csv.trim()) return ""
    return stringifyDelimitedRows(parseDelimitedRows(csv))
  }, [csv])

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-2 block text-sm font-bold italic text-neutral-700">CSVデータを入力</label>
        <textarea
          className="h-48 w-full rounded-lg border border-neutral-300 p-4 font-mono text-xs text-neutral-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
          value={csv}
          onChange={(e) => setCsv(e.target.value)}
          placeholder={'name,email,memo\n"山田, 太郎",test@example.com,"見積 ""A"" 確認"'}
        />
      </div>

      {result && (
        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6">
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-bold italic text-neutral-700">整形結果</label>
            <button
              onClick={() => navigator.clipboard.writeText(result)}
              className="text-xs font-bold text-blue-600 hover:text-blue-800"
            >
              結果をコピー
            </button>
          </div>
          <textarea
            readOnly
            className="h-48 w-full rounded-lg border border-neutral-200 bg-white p-4 font-mono text-xs text-neutral-700 outline-none"
            value={result}
          />
        </div>
      )}
    </div>
  )
}
