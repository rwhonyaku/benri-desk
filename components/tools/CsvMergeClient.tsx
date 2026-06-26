"use client"

import { useMemo, useState } from "react"
import { parseDelimitedRows, stringifyDelimitedRows } from "@/lib/csvUtils"

export default function CsvMergeClient() {
  const [firstCsv, setFirstCsv] = useState("")
  const [secondCsv, setSecondCsv] = useState("")
  const [skipSecondHeader, setSkipSecondHeader] = useState(true)

  const result = useMemo(() => {
    if (!firstCsv.trim() && !secondCsv.trim()) return ""

    const firstRows = firstCsv.trim() ? parseDelimitedRows(firstCsv) : []
    const secondRows = secondCsv.trim() ? parseDelimitedRows(secondCsv) : []
    const rows = [...firstRows, ...(skipSecondHeader ? secondRows.slice(1) : secondRows)]

    return stringifyDelimitedRows(rows)
  }, [firstCsv, secondCsv, skipSecondHeader])

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
          <label className="mb-2 block text-sm font-bold italic text-neutral-700">CSV 1</label>
          <textarea
            className="h-56 w-full rounded-lg border border-neutral-300 p-4 font-mono text-xs text-neutral-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
            value={firstCsv}
            onChange={(e) => setFirstCsv(e.target.value)}
            placeholder="name,email&#10;佐藤,test@example.com"
          />
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
          <label className="mb-2 block text-sm font-bold italic text-neutral-700">CSV 2</label>
          <textarea
            className="h-56 w-full rounded-lg border border-neutral-300 p-4 font-mono text-xs text-neutral-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
            value={secondCsv}
            onChange={(e) => setSecondCsv(e.target.value)}
            placeholder="name,email&#10;田中,info@example.com"
          />
        </div>
      </div>

      <label className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-700 shadow-sm">
        <input
          type="checkbox"
          checked={skipSecondHeader}
          onChange={(e) => setSkipSecondHeader(e.target.checked)}
          className="h-4 w-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
        />
        CSV 2の1行目を見出しとして除外する
      </label>

      {result && (
        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6">
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-bold italic text-neutral-700">結合結果</label>
            <button
              onClick={() => navigator.clipboard.writeText(result)}
              className="text-xs font-bold text-blue-600 hover:text-blue-800"
            >
              結果をコピー
            </button>
          </div>
          <textarea
            readOnly
            className="h-56 w-full rounded-lg border border-neutral-200 bg-white p-4 font-mono text-xs text-neutral-700 outline-none"
            value={result}
          />
        </div>
      )}
    </div>
  )
}
