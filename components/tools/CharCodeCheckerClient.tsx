"use client"

import { useState } from "react"

export default function CharCodeCheckerClient() {
  const [text, setText] = useState("")

  const codes = Array.from(text).map(char => ({
    char,
    code: char.codePointAt(0) ?? 0,
    hex: (char.codePointAt(0) ?? 0).toString(16).toUpperCase().padStart(4, "0")
  }))

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-2 block text-sm font-bold text-neutral-700">確認する文字</label>
        <input
          type="text"
          className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-xl text-neutral-900 outline-none focus:border-blue-500"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="例：あA①"
        />
      </div>

      {codes.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {codes.map((item, idx) => (
            <div key={idx} className="rounded-lg border border-neutral-100 bg-white p-4 text-center shadow-sm">
              <div className="text-2xl font-black text-blue-600 mb-2">{item.char}</div>
              <div className="text-[10px] font-bold text-neutral-400">10進数：{item.code}</div>
              <div className="text-[10px] font-bold text-neutral-400">コード：U+{item.hex}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
