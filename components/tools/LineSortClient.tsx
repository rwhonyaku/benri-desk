"use client"

import { useState } from "react"

export default function LineSortClient() {
  const [text, setText] = useState("")

  const sortLines = (order: 'asc' | 'desc') => {
    const lines = text.split(/\r?\n/).filter(line => line.trim() !== "")
    lines.sort((a, b) => {
      return order === 'asc' 
        ? a.localeCompare(b, 'ja') 
        : b.localeCompare(a, 'ja')
    })
    setText(lines.join("\n"))
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-2 block text-sm font-bold text-neutral-700 italic">並び替えるテキストを入力</label>
        <textarea
          className="h-64 w-full rounded-lg border border-neutral-300 p-4 text-xs font-mono text-neutral-900 outline-none focus:border-blue-500"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="mt-4 flex gap-3">
          <button onClick={() => sortLines('asc')} className="flex-1 rounded-md bg-neutral-800 py-3 text-sm font-bold text-white hover:bg-neutral-900">昇順 (あ→ん / A→Z)</button>
          <button onClick={() => sortLines('desc')} className="flex-1 rounded-md bg-neutral-800 py-3 text-sm font-bold text-white hover:bg-neutral-900">降順 (ん→あ / Z→A)</button>
        </div>
      </div>
    </div>
  )
}