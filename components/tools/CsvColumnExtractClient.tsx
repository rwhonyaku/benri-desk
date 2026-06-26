"use client"

import { useState, useMemo } from "react"
import { parseDelimitedRows, stringifyDelimitedRows } from "@/lib/csvUtils"

export default function CsvColumnExtractClient() {
  const [csv, setCsv] = useState("")
  const [colIndex, setColIndex] = useState(1)

  const result = useMemo(() => {
    if (!csv) return ""
    const rows = parseDelimitedRows(csv)
    return stringifyDelimitedRows(
      rows
        .map((row) => [row[colIndex - 1] ?? ""])
        .filter((row) => row[0].trim() !== "")
    )
  }, [csv, colIndex])

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <label className="text-sm font-bold text-neutral-700 italic">CSVデータを入力</label>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-neutral-500">抽出する列番号:</span>
            <input 
              type="number" 
              min="1"
              value={colIndex}
              onChange={(e) => setColIndex(Number(e.target.value))}
              className="w-16 rounded border border-neutral-300 px-2 py-1 text-sm font-bold outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <textarea
          className="h-48 w-full rounded-lg border border-neutral-300 p-4 text-xs font-mono text-neutral-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
          value={csv}
          onChange={(e) => setCsv(e.target.value)}
          placeholder="name,email,tel&#10;tanaka,test@example.com,090...&#10;suzuki,info@example.com,080..."
        />
      </div>

      {result && (
        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-bold text-neutral-700 italic">抽出結果 ({colIndex}列目)</label>
            <button 
              onClick={() => navigator.clipboard.writeText(result)}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              結果をコピー
            </button>
          </div>
          <textarea
            readOnly
            className="h-40 w-full rounded-lg border border-neutral-200 bg-white p-4 text-xs font-mono text-neutral-700 outline-none"
            value={result}
          />
        </div>
      )}
    </div>
  )
}
