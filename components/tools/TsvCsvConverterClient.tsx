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
  const [copyMessage, setCopyMessage] = useState("")

  const convertToCsv = () => {
    setInput((current) => convertDelimitedText(current, "\t", ","))
  }

  const convertToTsv = () => {
    setInput((current) => convertDelimitedText(current, ",", "\t"))
  }

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(input)
      setCopyMessage("コピーしました")
    } catch {
      setCopyMessage("コピーできませんでした")
    } finally {
      window.setTimeout(() => setCopyMessage(""), 1500)
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="mb-2 flex items-center justify-between gap-3">
          <label className="block text-sm font-bold text-neutral-700">変換するデータ</label>
          <button
            type="button"
            onClick={() => setInput("名前\t年齢\t都道府県\n山田太郎\t35\t東京都\n佐藤花子\t28\t大阪府")}
            className="text-xs font-medium text-blue-600 hover:text-blue-800"
          >
            TSV例を入力
          </button>
        </div>
        <textarea
          className="h-48 w-full rounded-lg border border-neutral-300 p-4 font-mono text-xs text-neutral-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={"例：名前\t年齢\n山田太郎\t35"}
          spellCheck={false}
        />

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <button
            onClick={convertToCsv}
            disabled={!input}
            className="rounded-md bg-neutral-800 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-neutral-900 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
          >
            TSV → CSV（カンマ区切り）
          </button>
          <button
            onClick={convertToTsv}
            disabled={!input}
            className="rounded-md bg-neutral-800 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-neutral-900 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
          >
            CSV → TSV（タブ区切り）
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button onClick={() => { setInput(""); setCopyMessage("") }} className="text-xs text-neutral-400 hover:text-rose-500">
            クリア
          </button>
          <div className="flex items-center gap-3">
            <span className="text-xs text-emerald-700" aria-live="polite">{copyMessage}</span>
            <button
              onClick={copyResult}
              disabled={!input}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 disabled:cursor-not-allowed disabled:text-neutral-300"
            >
              結果をコピー
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-neutral-100 px-4 py-3 text-center text-[11px] text-neutral-500">
        入力内容はブラウザ内で処理され、保存されません。
      </div>
    </div>
  )
}
