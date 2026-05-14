"use client"

import { useState } from "react"

export default function DummyImageClient() {
  const [size, setSize] = useState("600x400")
  const [bg, setBg] = useState("cccccc")
  const [text, setText] = useState("Dummy Image")

  const imageUrl = `https://placehold.jp/30/${bg}/ffffff/${size}.png?text=${encodeURIComponent(text)}`

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm space-y-4">
        <div>
          <label className="mb-1 block text-xs font-bold text-neutral-500 italic text-right">サイズ (例: 800x600)</label>
          <input type="text" value={size} onChange={(e) => setSize(e.target.value)} className="w-full rounded border p-2 font-bold" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold text-neutral-500 italic text-right">表示テキスト</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="w-full rounded border p-2 font-bold" />
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-center shadow-sm">
        <img src={imageUrl} alt="Generated Dummy" className="mx-auto mb-6 rounded shadow-sm" />
        <button
          onClick={() => navigator.clipboard.writeText(imageUrl)}
          className="text-xs font-bold text-blue-600 hover:underline"
        >
          画像のURLをコピー
        </button>
      </div>
    </div>
  )
}