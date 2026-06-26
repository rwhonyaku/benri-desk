"use client"

import { useMemo, useState } from "react"
import { parseDelimitedRows, stringifyDelimitedRows } from "@/lib/csvUtils"

export default function CsvSortClient() {
  const [csv, setCsv] = useState("")
  const [column, setColumn] = useState(1)
  const [hasHeader, setHasHeader] = useState(true)
  const [direction, setDirection] = useState<"asc" | "desc">("asc")

  const result = useMemo(() => {
    if (!csv.trim()) return ""

    const rows = parseDelimitedRows(csv)
    if (rows.length === 0) return ""

    const header = hasHeader ? rows.slice(0, 1) : []
    const body = hasHeader ? rows.slice(1) : rows
    const index = Math.max(0, column - 1)

    const sorted = [...body].sort((a, b) => {
      const left = a[index] ?? ""
      const right = b[index] ?? ""
      const compared = left.localeCompare(right, "ja", { numeric: true })
      return direction === "asc" ? compared : -compared
    })

    return stringifyDelimitedRows([...header, ...sorted])
  }, [csv, column, hasHeader, direction])

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="mb-4 grid gap-3 sm:grid-cols-[1fr_auto_auto_auto] sm:items-center">
          <label className="text-sm font-bold italic text-neutral-700">CSVデータを入力</label>
          <label className="flex items-center gap-2 text-xs font-bold text-neutral-600">
            <input
              type="checkbox"
              checked={hasHeader}
              onChange={(e) => setHasHeader(e.target.checked)}
            />
            1行目は見出し
          </label>
          <input
            type="number"
            min="1"
            value={column}
            onChange={(e) => setColumn(Number(e.target.value))}
            className="w-full rounded border border-neutral-300 px-3 py-2 text-sm font-bold outline-none focus:border-blue-500 sm:w-20"
            aria-label="並び替える列番号"
          />
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value as "asc" | "desc")}
            className="rounded border border-neutral-300 px-3 py-2 text-sm font-bold outline-none focus:border-blue-500"
          >
            <option value="asc">昇順</option>
            <option value="desc">降順</option>
          </select>
        </div>

        <textarea
          className="h-48 w-full rounded-lg border border-neutral-300 p-4 font-mono text-xs text-neutral-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
          value={csv}
          onChange={(e) => setCsv(e.target.value)}
          placeholder="name,score&#10;佐藤,80&#10;田中,95&#10;鈴木,72"
        />
      </div>

      {result && (
        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6">
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-bold italic text-neutral-700">並び替え結果</label>
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
