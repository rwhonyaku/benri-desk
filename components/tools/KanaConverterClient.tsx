"use client"

import { useState } from "react"

export default function KanaConverterClient() {
  const [text, setText] = useState("")

  const convert = (toKatakana: boolean) => {
    const result = text.replace(/[ぁ-んァ-ン]/g, (s) => {
      return String.fromCharCode(s.charCodeAt(0) + (toKatakana ? 0x60 : -0x60))
    })
    setText(result)
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-2 block text-sm font-bold text-neutral-700 italic text-right">Hiragana ⇄ Katakana</label>
        <textarea
          className="h-48 w-full rounded-lg border border-neutral-300 p-4 text-neutral-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
          placeholder="テキストを入力してください..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => convert(true)}
            className="flex-1 rounded-md bg-blue-600 py-2.5 text-sm font-bold text-white hover:bg-blue-700 active:scale-95 transition-all"
          >
            カタカナに変換
          </button>
          <button
            onClick={() => convert(false)}
            className="flex-1 rounded-md bg-neutral-800 py-2.5 text-sm font-bold text-white hover:bg-neutral-900 active:scale-95 transition-all"
          >
            ひらがなに変換
          </button>
        </div>

        <div className="mt-4 flex justify-between items-center pt-2">
          <button onClick={() => setText("")} className="text-xs font-medium text-neutral-400 hover:text-rose-500">
            クリア
          </button>
          <button 
            onClick={() => navigator.clipboard.writeText(text)}
            className="text-xs font-bold text-blue-600 hover:text-blue-800"
          >
            結果をコピーする
          </button>
        </div>
      </div>
    </div>
  )
}