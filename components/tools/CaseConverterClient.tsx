"use client"

import { useState } from "react"

export default function CaseConverterClient() {
  const [text, setText] = useState("")

  const handleUppercase = () => setText((prev) => prev.toUpperCase())
  const handleLowercase = () => setText((prev) => prev.toLowerCase())
  const handleCapitalize = () => {
    const capitalized = text
      .split(/(\s+)/)
      .map((word) => {
        if (word.trim().length === 0) return word
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      })
      .join("")
    setText(capitalized)
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-2 block text-sm font-bold text-neutral-700 italic">
          Input Text
        </label>
        <textarea
          className="h-48 w-full rounded-lg border border-neutral-300 p-4 text-neutral-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
          placeholder="Type or paste English text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={handleUppercase}
            className="flex-1 whitespace-nowrap rounded-md bg-blue-600 py-2.5 text-sm font-bold text-white hover:bg-blue-700 active:scale-95 transition-all"
          >
            ALL UPPERCASE
          </button>
          <button
            onClick={handleLowercase}
            className="flex-1 whitespace-nowrap rounded-md bg-neutral-800 py-2.5 text-sm font-bold text-white hover:bg-neutral-900 active:scale-95 transition-all"
          >
            all lowercase
          </button>
          <button
            onClick={handleCapitalize}
            className="flex-1 whitespace-nowrap rounded-md border border-neutral-200 py-2.5 text-sm font-bold text-neutral-700 hover:bg-neutral-50 active:scale-95 transition-all"
          >
            Capitalize Word
          </button>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setText("")}
            className="text-xs font-medium text-neutral-400 hover:text-rose-500"
          >
            テキストをクリア
          </button>
        </div>
      </div>

      {text && (
        <div className="flex justify-center">
          <button
            onClick={() => navigator.clipboard.writeText(text)}
            className="rounded-full bg-blue-50 px-6 py-2 text-sm font-bold text-blue-600 hover:bg-blue-100 transition-colors"
          >
            結果をコピーする
          </button>
        </div>
      )}
    </div>
  )
}