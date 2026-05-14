"use client"

import { useState, useMemo } from "react"

export default function SeirekiToWarekiClient() {
  const [year, setYear] = useState<number>(new Date().getFullYear())

  const result = useMemo(() => {
    if (!year || year < 1868) return null

    if (year >= 2019) return { name: "令和", eraYear: year - 2019 + 1 }
    if (year >= 1989) return { name: "平成", eraYear: year - 1989 + 1 }
    if (year >= 1926) return { name: "昭和", eraYear: year - 1926 + 1 }
    if (year >= 1912) return { name: "大正", eraYear: year - 1912 + 1 }
    return { name: "明治", eraYear: year - 1868 + 1 }
  }, [year])

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-4 block text-sm font-bold text-neutral-700 italic">Western to Japanese Era</label>
        
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="flex-1 rounded-lg border border-neutral-300 px-4 py-3 text-2xl font-black text-neutral-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
          />
          <span className="text-xl font-bold text-neutral-500">年</span>
        </div>
        
        <div className="mt-4 flex gap-2">
          <button onClick={() => setYear(prev => prev - 1)} className="flex-1 rounded border border-neutral-200 py-2 text-sm font-medium hover:bg-neutral-50">← 前年</button>
          <button onClick={() => setYear(new Date().getFullYear())} className="flex-1 rounded border border-neutral-200 py-2 text-sm font-medium hover:bg-neutral-50">今年</button>
          <button onClick={() => setYear(prev => prev + 1)} className="flex-1 rounded border border-neutral-200 py-2 text-sm font-medium hover:bg-neutral-50">次年 →</button>
        </div>
      </div>

      {result && (
        <div className="rounded-2xl border-2 border-emerald-100 bg-emerald-50 p-8 text-center shadow-sm">
          <div className="mb-2 text-sm font-bold tracking-widest text-emerald-500 uppercase">
            Japanese Era
          </div>
          <div className="text-5xl font-black text-emerald-700">
            {result.name}
            {result.eraYear === 1 ? "元年" : `${result.eraYear}年`}
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(`${result.name}${result.eraYear === 1 ? "元年" : `${result.eraYear}年`}`)}
            className="mt-6 text-xs font-bold text-emerald-600 hover:underline"
          >
            コピーする
          </button>
        </div>
      )}
    </div>
  )
}