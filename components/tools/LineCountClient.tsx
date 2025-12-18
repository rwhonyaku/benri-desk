"use client"

import { useMemo, useState } from "react"

export default function LineCountClient() {
  const [text, setText] = useState("")
  const [ignoreEmpty, setIgnoreEmpty] = useState(false)

  const lineCount = useMemo(() => {
    if (text.length === 0) return 0
    const lines = text.replace(/\r\n?/g, "\n").split("\n")
    if (!ignoreEmpty) return lines.length
    return lines.filter((l) => l.trim().length > 0).length
  }, [text, ignoreEmpty])

  return (
    <section className="rounded-lg border border-neutral-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-neutral-900">行数カウント</div>
        <div className="text-xs text-neutral-500">入力内容は保存されません</div>
      </div>

      <label className="mt-3 flex items-center gap-2 text-sm text-neutral-700">
        <input
          type="checkbox"
          checked={ignoreEmpty}
          onChange={(e) => setIgnoreEmpty(e.target.checked)}
        />
        空行を除外する
      </label>

      <textarea
        className="mt-3 h-40 w-full rounded-md border border-neutral-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="ここにテキストを貼り付けてください"
      />

      <div className="mt-4 rounded-md border border-neutral-200 bg-neutral-50 p-3">
        <div className="text-xs text-neutral-500">行数</div>
        <div className="text-2xl font-semibold text-neutral-900">
          {lineCount.toLocaleString()}
        </div>
      </div>
    </section>
  )
}
