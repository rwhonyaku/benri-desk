"use client"

import { useState } from "react"

export default function LineNumberingClient() {
  const [text, setText] = useState("")
  const [separator, setSeparator] = useState(". ")
  const [position, setPosition] = useState<'start' | 'end'>('start')

  const handleAddNumbers = () => {
    const lines = text.split("\n")
    const result = lines.map((line, index) => {
      const num = index + 1
      return position === 'start' ? `${num}${separator}${line}` : `${line}${separator}${num}`
    }).join("\n")
    setText(result)
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <label className="text-sm font-bold text-neutral-700 italic text-right">Line Numbering</label>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-neutral-500">区切り:</span>
              <input 
                type="text" 
                value={separator}
                onChange={(e) => setSeparator(e.target.value)}
                className="w-12 rounded border border-neutral-300 px-2 py-1 text-sm font-bold outline-none focus:border-blue-500"
              />
            </div>
            <select 
              value={position}
              onChange={(e) => setPosition(e.target.value as 'start' | 'end')}
              className="rounded border border-neutral-300 px-2 py-1 text-xs font-bold text-neutral-600 outline-none"
            >
              <option value="start">行頭</option>
              <option value="end">行末</option>
            </select>
          </div>
        </div>

        <textarea
          className="h-48 w-full rounded-lg border border-neutral-300 p-4 text-neutral-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="連番を付与したいテキストを入力..."
        />

        <button
          onClick={handleAddNumbers}
          className="mt-4 w-full rounded-md bg-blue-600 py-3 text-sm font-bold text-white hover:bg-blue-700 active:scale-95 transition-all"
        >
          連番を付与する
        </button>

        <div className="mt-4 flex justify-between">
          <button onClick={() => setText("")} className="text-xs text-neutral-400 hover:text-rose-500">クリア</button>
          <button onClick={() => navigator.clipboard.writeText(text)} className="text-xs font-bold text-blue-600 hover:text-blue-800">コピー</button>
        </div>
      </div>
    </div>
  )
}