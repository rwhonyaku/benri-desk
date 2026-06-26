"use client"

import { useMemo, useState } from "react"
import { formatDelimitedCell } from "@/lib/csvUtils"

export default function CsvQuoteEscapeClient() {
  const [text, setText] = useState("")
  const [mode, setMode] = useState<"lines" | "single">("lines")

  const result = useMemo(() => {
    if (!text) return ""

    if (mode === "single") {
      return formatDelimitedCell(text)
    }

    return text
      .replace(/\r\n?/g, "\n")
      .split("\n")
      .map((line) => formatDelimitedCell(line))
      .join("\n")
  }, [text, mode])

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <label className="text-sm font-bold italic text-neutral-700">エスケープする値を入力</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as "lines" | "single")}
            className="rounded border border-neutral-300 px-3 py-2 text-sm font-bold outline-none focus:border-blue-500"
          >
            <option value="lines">1行ずつ処理</option>
            <option value="single">全体を1つの値として処理</option>
          </select>
        </div>

        <textarea
          className="h-48 w-full rounded-lg border border-neutral-300 p-4 font-mono text-xs text-neutral-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={'山田, 太郎\n見積 "A" 確認'}
        />
      </div>

      {result && (
        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6">
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-bold italic text-neutral-700">エスケープ結果</label>
            <button
              onClick={() => navigator.clipboard.writeText(result)}
              className="text-xs font-bold text-blue-600 hover:text-blue-800"
            >
              結果をコピー
            </button>
          </div>
          <textarea
            readOnly
            className="h-40 w-full rounded-lg border border-neutral-200 bg-white p-4 font-mono text-xs text-neutral-700 outline-none"
            value={result}
          />
        </div>
      )}
    </div>
  )
}
