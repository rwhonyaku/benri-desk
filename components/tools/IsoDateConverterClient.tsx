"use client"

import { useState } from "react"

export default function IsoDateConverterClient() {
  const [input, setInput] = useState(new Date().toISOString())

  const formats = [
    { label: "ISO 8601", value: new Date(input).toISOString() },
    { label: "日付のみ", value: new Date(input).toLocaleDateString("ja-JP") },
    { label: "タイムスタンプ", value: new Date(input).getTime().toString() },
    { label: "UTC形式", value: new Date(input).toUTCString() },
  ]

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-4 block text-sm font-bold text-neutral-700 italic">日時を入力</label>
        <input
          type="datetime-local"
          onChange={(e) => setInput(e.target.value)}
          className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-lg font-bold outline-none focus:border-blue-500"
        />
      </div>

      <div className="space-y-3">
        {formats.map((f) => (
          <div key={f.label} className="flex items-center justify-between rounded-lg border border-neutral-100 bg-white p-4 shadow-sm">
            <div>
              <div className="text-[10px] font-bold text-neutral-400 uppercase">{f.label}</div>
              <div className="text-sm font-bold text-neutral-900 break-all">{f.value}</div>
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(f.value)}
              className="ml-4 rounded-md border border-neutral-200 px-3 py-1 text-[10px] font-bold hover:bg-neutral-50"
            >
              コピー
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}