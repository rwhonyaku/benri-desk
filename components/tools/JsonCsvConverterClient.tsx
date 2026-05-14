"use client"

import { useState } from "react"

export default function JsonCsvConverterClient() {
  const [text, setText] = useState("")

  const handleJsonToCsv = () => {
    try {
      const data = JSON.parse(text)
      if (!Array.isArray(data)) throw new Error("JSON must be an array of objects")
      const headers = Object.keys(data[0])
      const csv = [
        headers.join(","),
        ...data.map(row => headers.map(h => row[h]).join(","))
      ].join("\n")
      setText(csv)
    } catch (e) {
      alert("JSONの形式が正しくありません。配列形式である必要があります。")
    }
  }

  const handleCsvToJson = () => {
    try {
      const lines = text.trim().split("\n")
      const headers = lines[0].split(",")
      const json = lines.slice(1).map(line => {
        const values = line.split(",")
        return headers.reduce((obj, header, i) => {
          obj[header.trim()] = values[i]?.trim()
          return obj
        }, {} as any)
      })
      setText(JSON.stringify(json, null, 2))
    } catch (e) {
      alert("CSVの解析に失敗しました。")
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-2 block text-sm font-bold text-neutral-700 italic">変換対象 (JSON または CSV)</label>
        <textarea
          className="h-64 w-full rounded-lg border border-neutral-300 p-4 text-xs font-mono text-neutral-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        
        <div className="mt-4 flex gap-3">
          <button onClick={handleJsonToCsv} className="flex-1 rounded-md bg-blue-600 py-3 text-sm font-bold text-white hover:bg-blue-700">JSON → CSV</button>
          <button onClick={handleCsvToJson} className="flex-1 rounded-md bg-neutral-800 py-3 text-sm font-bold text-white hover:bg-neutral-900">CSV → JSON</button>
        </div>
      </div>
    </div>
  )
}