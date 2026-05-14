"use client"

import { useState } from "react"

export default function SuffixRemoverClient() {
  const [text, setText] = useState("")
  const [count, setCount] = useState(1)

  const handleRemove = () => {
    const lines = text.split("\n")
    const result = lines.map(line => line.substring(0, Math.max(0, line.length - count))).join("\n")
    setText(result)
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <label className="text-sm font-bold text-neutral-700 italic">Target Text</label>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-neutral-500">削除文字数:</span>
            <input 
              type="number" 
              min="1"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-16 rounded border border-neutral-300 px-2 py-1 text-sm font-bold outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <textarea
          className="h-48 w-full rounded-lg border border-neutral-300 p-4 text-neutral-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="行末の文字を削除します..."
        />

        <button
          onClick={handleRemove}
          className="mt-4 w-full rounded-md bg-neutral-800 py-3 text-sm font-bold text-white hover:bg-neutral-900 active:scale-95 transition-all"
        >
          行末から {count} 文字削除する
        </button>

        <div className="mt-4 flex justify-between">
          <button onClick={() => setText("")} className="text-xs text-neutral-400 hover:text-rose-500">クリア</button>
          <button onClick={() => navigator.clipboard.writeText(text)} className="text-xs font-bold text-blue-600 hover:text-blue-800">コピー</button>
        </div>
      </div>
    </div>
  )
}