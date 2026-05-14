"use client"

import { useState } from "react"

export default function NewlineCodeConverterClient() {
  const [text, setText] = useState("")

  const convert = (type: 'crlf' | 'lf' | 'cr') => {
    // First, normalize all newlines to LF
    let normalized = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n")
    
    let result = ""
    switch (type) {
      case 'crlf':
        result = normalized.replace(/\n/g, "\r\n")
        break
      case 'lf':
        result = normalized
        break
      case 'cr':
        result = normalized.replace(/\n/g, "\r")
        break
    }
    setText(result)
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-2 block text-sm font-bold text-neutral-700 italic">テキストを入力</label>
        <textarea
          className="h-64 w-full rounded-lg border border-neutral-300 p-4 text-xs font-mono text-neutral-900 outline-none focus:border-blue-500"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="変換したいテキストを貼り付けてください..."
        />
        
        <div className="mt-4 grid grid-cols-3 gap-3">
          <button
            onClick={() => convert('lf')}
            className="rounded-md bg-neutral-800 py-3 text-xs font-bold text-white hover:bg-neutral-900 transition-all"
          >
            LFに変換 (Unix/Mac)
          </button>
          <button
            onClick={() => convert('crlf')}
            className="rounded-md bg-neutral-800 py-3 text-xs font-bold text-white hover:bg-neutral-900 transition-all"
          >
            CRLFに変換 (Win)
          </button>
          <button
            onClick={() => convert('cr')}
            className="rounded-md bg-neutral-800 py-3 text-xs font-bold text-white hover:bg-neutral-900 transition-all"
          >
            CRに変換 (旧Mac)
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