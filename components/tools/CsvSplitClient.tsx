"use client"

import { useMemo, useState } from "react"
import { parseDelimitedRows, stringifyDelimitedRows } from "@/lib/csvUtils"

export default function CsvSplitClient() {
  const [csv, setCsv] = useState("")
  const [rowsPerChunk, setRowsPerChunk] = useState(100)
  const [hasHeader, setHasHeader] = useState(true)
  const [includeHeader, setIncludeHeader] = useState(true)

  const chunks = useMemo(() => {
    if (!csv.trim()) return []

    const rows = parseDelimitedRows(csv)
    if (rows.length === 0) return []

    const size = Math.max(1, rowsPerChunk || 1)
    const header = hasHeader ? rows[0] : null
    const body = hasHeader ? rows.slice(1) : rows
    const result: string[] = []

    for (let index = 0; index < body.length; index += size) {
      const chunkRows = body.slice(index, index + size)
      const outputRows = header && includeHeader ? [header, ...chunkRows] : chunkRows
      result.push(stringifyDelimitedRows(outputRows))
    }

    return result
  }, [csv, rowsPerChunk, hasHeader, includeHeader])

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="mb-4 grid gap-3 sm:grid-cols-[1fr_auto_auto] sm:items-center">
          <label className="text-sm font-bold italic text-neutral-700">CSVデータを入力</label>
          <label className="flex items-center gap-2 text-xs font-bold text-neutral-600">
            <input
              type="checkbox"
              checked={hasHeader}
              onChange={(e) => setHasHeader(e.target.checked)}
            />
            1行目は見出し
          </label>
          <label className="flex items-center gap-2 text-xs font-bold text-neutral-600">
            <input
              type="checkbox"
              checked={includeHeader}
              onChange={(e) => setIncludeHeader(e.target.checked)}
              disabled={!hasHeader}
            />
            分割後も見出しを付ける
          </label>
        </div>

        <div className="mb-4 flex items-center gap-3">
          <span className="text-xs font-bold text-neutral-500">1つあたりの行数</span>
          <input
            type="number"
            min="1"
            max="100000"
            value={rowsPerChunk}
            onChange={(e) => setRowsPerChunk(Number(e.target.value))}
            className="w-28 rounded border border-neutral-300 px-3 py-2 text-sm font-bold outline-none focus:border-blue-500"
          />
        </div>

        <textarea
          className="h-56 w-full rounded-lg border border-neutral-300 p-4 font-mono text-xs text-neutral-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
          value={csv}
          onChange={(e) => setCsv(e.target.value)}
          placeholder="id,name&#10;1,佐藤&#10;2,田中&#10;3,鈴木"
        />
      </div>

      {chunks.length > 0 && (
        <div className="space-y-4">
          <div className="text-sm font-bold text-neutral-600">分割結果：{chunks.length}個</div>
          {chunks.map((chunk, index) => (
            <div key={index} className="rounded-xl border border-neutral-200 bg-neutral-50 p-6">
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-bold italic text-neutral-700">CSV {index + 1}</label>
                <button
                  onClick={() => navigator.clipboard.writeText(chunk)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800"
                >
                  コピー
                </button>
              </div>
              <textarea
                readOnly
                className="h-36 w-full rounded-lg border border-neutral-200 bg-white p-4 font-mono text-xs text-neutral-700 outline-none"
                value={chunk}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
