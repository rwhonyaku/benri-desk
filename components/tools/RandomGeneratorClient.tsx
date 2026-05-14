"use client"

import { useState } from "react"

export default function RandomGeneratorClient() {
  const [min, setMin] = useState(1)
  const [max, setMax] = useState(100)
  const [result, setResult] = useState<number | null>(null)

  const handleGenerate = () => {
    const num = Math.floor(Math.random() * (max - min + 1)) + min
    setResult(num)
  }

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-4 block text-sm font-bold text-neutral-700 italic">範囲を指定</label>
        <div className="flex items-center gap-4">
          <input type="number" value={min} onChange={e => setMin(Number(e.target.value))} className="w-full rounded border p-3 font-bold text-center"/>
          <span className="font-bold text-neutral-300">～</span>
          <input type="number" value={max} onChange={e => setMax(Number(e.target.value))} className="w-full rounded border p-3 font-bold text-center"/>
        </div>
        <button onClick={handleGenerate} className="mt-6 w-full rounded-md bg-neutral-800 py-4 text-sm font-bold text-white hover:bg-neutral-900 active:scale-95 transition-all">抽選する</button>
      </div>

      {result !== null && (
        <div className="rounded-2xl border-2 border-blue-100 bg-blue-50 p-10 text-center shadow-sm">
          <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">生成結果</div>
          <div className="text-7xl font-black text-blue-700">{result}</div>
        </div>
      )}
    </div>
  )
}