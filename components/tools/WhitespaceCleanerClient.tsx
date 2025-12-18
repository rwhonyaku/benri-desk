"use client"

import { useMemo, useState } from "react"

export default function WhitespaceCleanerClient() {
  const [text, setText] = useState("")
  const [mode, setMode] = useState<"trim" | "all">("trim")

  const result = useMemo(() => {
    if (mode === "trim") {
      return text.trim()
    }
    // 全角・半角スペース・改行・タブをすべて削除
    return text.replace(/[\s\u3000]+/g, "")
  }, [text, mode])

  return (
    <section className="rounded-lg border border-neutral-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-neutral-900">空白削除</div>
        <div className="text-xs text-neutral-500">入力内容は保存されません</div>
      </div>

      <div className="mt-3 flex gap-4 text-sm">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={mode === "trim"}
            onChange={() => setMode("trim")}
          />
          前後のみ削除
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={mode === "all"}
            onChange={() => setMode("all")}
          />
          すべて削除
        </label>
      </div>

      <div className="mt-4">
        <div className="text-xs text-neutral-500">入力</div>
        <textarea
          className="mt-1 h-32 w-full rounded-md border border-neutral-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="ここにテキストを貼り付けてください"
        />
      </div>

      <div className="mt-4">
        <div className="text-xs text-neutral-500">出力</div>
        <textarea
          className="mt-1 h-32 w-full rounded-md border border-neutral-200 bg-neutral-50 p-3 text-sm outline-none"
          value={result}
          readOnly
        />
      </div>
    </section>
  )
}
