"use client"

import { useState } from "react"

function normalizeNewlines(text: string) {
  return text.replace(/\r\n?/g, "\n")
}

function parseDelimitedLine(line: string, delimiter: string) {
  const cells: string[] = []
  let current = ""
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    const next = line[i + 1]

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
      continue
    }

    if (!inQuotes && char === delimiter) {
      cells.push(current)
      current = ""
      continue
    }

    current += char
  }

  cells.push(current)
  return cells
}

function formatDelimitedCell(value: string, delimiter: string) {
  const needsQuotes = value.includes(delimiter) || value.includes('"') || value.includes("\n")
  if (!needsQuotes) return value
  return `"${value.replace(/"/g, '""')}"`
}

function convertDelimitedText(input: string, fromDelimiter: string, toDelimiter: string) {
  const normalized = normalizeNewlines(input)
  return normalized
    .split("\n")
    .map((line) => {
      if (line === "") return ""
      const cells = parseDelimitedLine(line, fromDelimiter)
      return cells.map((cell) => formatDelimitedCell(cell, toDelimiter)).join(toDelimiter)
    })
    .join("\n")
}

export default function TsvCsvConverterClient() {
  const [input, setInput] = useState("")

  const convertToCsv = () => {
    setInput((current) => convertDelimitedText(current, "\t", ","))
  }

  const convertToTsv = () => {
    setInput((current) => convertDelimitedText(current, ",", "\t"))
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-2 block text-sm font-bold italic text-neutral-700">変換するデータ</label>
        <textarea
          className="h-48 w-full rounded-lg border border-neutral-300 p-4 font-mono text-xs text-neutral-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="データを貼り付けてください..."
        />

        <div className="mt-4 flex gap-3">
          <button
            onClick={convertToCsv}
            className="flex-1 rounded-md bg-neutral-800 py-3 text-sm font-bold text-white transition-all hover:bg-neutral-900 active:scale-95"
          >
            CSVに変換 (カンマ区切り)
          </button>
          <button
            onClick={convertToTsv}
            className="flex-1 rounded-md bg-neutral-800 py-3 text-sm font-bold text-white transition-all hover:bg-neutral-900 active:scale-95"
          >
            TSVに変換 (タブ区切り)
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button onClick={() => setInput("")} className="text-xs text-neutral-400 hover:text-rose-500">
            クリア
          </button>
          <button
            onClick={() => navigator.clipboard.writeText(input)}
            className="text-xs font-bold text-blue-600 hover:text-blue-800"
          >
            結果をコピー
          </button>
        </div>
      </div>
    </div>
  )
}
