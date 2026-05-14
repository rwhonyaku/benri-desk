"use client"

import { useState } from "react"

export default function UrlEncodeClient() {
  const [text, setText] = useState("")

  const handleEncode = () => {
    try {
      setText(encodeURIComponent(text))
    } catch (e) {
      alert("エンコードに失敗しました。")
    }
  }

  const handleDecode = () => {
    try {
      setText(decodeURIComponent(text))
    } catch (e) {
      alert("デコードに失敗しました。正しいURL形式か確認してください。")
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-2 block text-sm font-bold text-neutral-700 italic">変換するURL / テキスト</label>
        <textarea
          className="h-48 w-full rounded-lg border border-neutral-300 p-4 text-neutral-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="https://example.com/テスト"
        />
        
        <div className="mt-4 flex gap-3">
          <button
            onClick={handleEncode}
            className="flex-1 rounded-md bg-blue-600 py-3 text-sm font-bold text-white hover:bg-blue-700 active:scale-95 transition-all"
          >
            エンコード
          </button>
          <button
            onClick={handleDecode}
            className="flex-1 rounded-md bg-neutral-800 py-3 text-sm font-bold text-white hover:bg-neutral-900 active:scale-95 transition-all"
          >
            デコード
          </button>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <button onClick={() => setText("")} className="text-xs text-neutral-400 hover:text-rose-500">クリア</button>
          <button 
            onClick={() => navigator.clipboard.writeText(text)}
            className="text-xs font-bold text-blue-600 hover:text-blue-800"
          >
            結果をコピー
          </button>
        </div>
      </div>
    </div>
  )
}