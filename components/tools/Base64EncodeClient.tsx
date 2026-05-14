"use client"

import { useState } from "react"

export default function Base64EncodeClient() {
  const [text, setText] = useState("")

  const handleEncode = () => {
    try {
      setText(btoa(unescape(encodeURIComponent(text))))
    } catch (e) {
      alert("エンコードに失敗しました。")
    }
  }

  const handleDecode = () => {
    try {
      setText(decodeURIComponent(escape(atob(text))))
    } catch (e) {
      alert("デコードに失敗しました。不正なBase64文字列です。")
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-2 block text-sm font-bold text-neutral-700 italic">Base64変換対象</label>
        <textarea
          className="h-48 w-full rounded-lg border border-neutral-300 p-4 text-neutral-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="テキスト、またはBase64文字列を入力してください..."
        />
        
        <div className="mt-4 flex gap-3">
          <button onClick={handleEncode} className="flex-1 rounded-md bg-blue-600 py-3 text-sm font-bold text-white hover:bg-blue-700">エンコード</button>
          <button onClick={handleDecode} className="flex-1 rounded-md bg-neutral-800 py-3 text-sm font-bold text-white hover:bg-neutral-900">デコード</button>
        </div>
        <div className="mt-4 flex justify-between">
          <button onClick={() => setText("")} className="text-xs text-neutral-400">クリア</button>
          <button onClick={() => navigator.clipboard.writeText(text)} className="text-xs font-bold text-blue-600">コピー</button>
        </div>
      </div>
    </div>
  )
}