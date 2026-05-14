"use client"

import { useState } from "react"

export default function DuplicateLineRemoverClient() {
  const [text, setText] = useState("")

  const handleRemove = () => {
    if (!text.trim()) return
    const lines = text.split(/\r?\n/)
    const unique = Array.from(new Set(lines.map(l => l.trim()))).filter(l => l !== "")
    setText(unique.join("\n"))
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-2 block text-sm font-bold text-neutral-700 italic">テキストを入力</label>
        <textarea
          className="h-64 w-full rounded-lg border border-neutral-300 p-4 text-xs font-mono text-neutral-900 outline-none focus:border-blue-500"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="重複行を削除したいテキストを貼り付けてください..."
        />
        <button
          onClick={handleRemove}
          className="mt-4 w-full rounded-md bg-neutral-800 py-3 text-sm font-bold text-white hover:bg-neutral-900 active:scale-95 transition-all"
        >
          重複行を削除
        </button>
        <div className="mt-4 flex justify-between items-center">
          <button onClick={() => setText("")} className="text-xs text-neutral-400">クリア</button>
          <button onClick={() => navigator.clipboard.writeText(text)} className="text-xs font-bold text-blue-600">コピー</button>
        </div>
      </div>
    </div>
  )
}