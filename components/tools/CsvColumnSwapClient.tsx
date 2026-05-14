"use client"

import { useState } from "react"

export default function CsvColumnSwapClient() {
  const [csv, setCsv] = useState("")
  const [colA, setColA] = useState(1)
  const [colB, setColB] = useState(2)

  const handleSwap = () => {
    const lines = csv.split("\n")
    const result = lines.map(line => {
      const cols = line.split(",")
      const idxA = colA - 1
      const idxB = colB - 1
      if (cols[idxA] !== undefined && cols[idxB] !== undefined) {
        const temp = cols[idxA]
        cols[idxA] = cols[idxB]
        cols[idxB] = temp
      }
      return cols.join(",")
    }).join("\n")
    setCsv(result)
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <label className="text-sm font-bold text-neutral-700 italic">CSV列の入れ替え</label>
          <div className="flex items-center gap-2 text-xs font-bold text-neutral-500">
            <span>列</span>
            <input type="number" value={colA} onChange={e => setColA(Number(e.target.value))} className="w-12 border rounded p-1"/>
            <span>と 列</span>
            <input type="number" value={colB} onChange={e => setColB(Number(e.target.value))} className="w-12 border rounded p-1"/>
            <span>を入れ替え</span>
          </div>
        </div>
        <textarea
          className="h-48 w-full rounded-lg border border-neutral-300 p-4 text-xs font-mono outline-none focus:border-blue-500"
          value={csv}
          onChange={(e) => setCsv(e.target.value)}
        />
        <button onClick={handleSwap} className="mt-4 w-full rounded-md bg-blue-600 py-3 text-sm font-bold text-white">入れ替え実行</button>
      </div>
    </div>
  )
}