"use client"

import { useState } from "react"
import { parseDelimitedRows, stringifyDelimitedRows } from "@/lib/csvUtils"

export default function JsonCsvConverterClient() {
  const [text, setText] = useState("")

  const handleJsonToCsv = () => {
    try {
      const data = JSON.parse(text)
      if (!Array.isArray(data)) throw new Error("JSON must be an array")
      if (data.length === 0) {
        setText("")
        return
      }

      const rows = data.map((item) => {
        if (item === null || typeof item !== "object" || Array.isArray(item)) {
          throw new Error("JSON must be an array of objects")
        }
        return item as Record<string, unknown>
      })
      const headers = Array.from(new Set(rows.flatMap((row) => Object.keys(row))))
      const csvRows = [
        headers,
        ...rows.map((row) =>
          headers.map((header) => {
            const value = row[header]
            if (value === null || value === undefined) return ""
            if (typeof value === "object") return JSON.stringify(value)
            return String(value)
          })
        ),
      ]
      setText(stringifyDelimitedRows(csvRows))
    } catch (e) {
      alert("JSONの形式が正しくありません。配列形式である必要があります。")
    }
  }

  const handleCsvToJson = () => {
    try {
      const rows = parseDelimitedRows(text)
      const headers = rows[0]?.map((header) => header.trim()) ?? []
      const json = rows.slice(1).map((row) =>
        headers.reduce<Record<string, string>>((obj, header, i) => {
          if (header) obj[header] = row[i] ?? ""
          return obj
        }, {})
      )
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
