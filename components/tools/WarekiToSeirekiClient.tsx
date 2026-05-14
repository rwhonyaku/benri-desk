"use client"

import { useState, useMemo } from "react"

const ERAS = [
  { name: "令和", symbol: "R", startYear: 2019 },
  { name: "平成", symbol: "H", startYear: 1989 },
  { name: "昭和", symbol: "S", startYear: 1926 },
  { name: "大正", symbol: "T", startYear: 1912 },
  { name: "明治", symbol: "M", startYear: 1868 },
]

export default function WarekiToSeirekiClient() {
  const [selectedEra, setSelectedEra] = useState("令和")
  const [year, setYear] = useState<number | "">(1)

  const westernYear = useMemo(() => {
    if (!year || year < 1) return null
    const era = ERAS.find((e) => e.name === selectedEra)
    if (!era) return null
    return era.startYear + (Number(year) - 1)
  }, [selectedEra, year])

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-4 block text-sm font-bold text-neutral-700 italic">Japanese Era to Western</label>
        
        <div className="flex gap-2">
          <select
            value={selectedEra}
            onChange={(e) => setSelectedEra(e.target.value)}
            className="flex-1 rounded-lg border border-neutral-300 px-4 py-3 text-lg font-bold outline-none focus:border-blue-500"
          >
            {ERAS.map((e) => (
              <option key={e.name} value={e.name}>{e.name} ({e.symbol})</option>
            ))}
          </select>
          <div className="flex flex-[0.5] items-center gap-2">
            <input
              type="number"
              min="1"
              value={year}
              onChange={(e) => setYear(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-lg font-bold outline-none focus:border-blue-500"
            />
            <span className="font-bold text-neutral-600">年</span>
          </div>
        </div>
      </div>

      {westernYear && (
        <div className="rounded-2xl border-2 border-blue-100 bg-blue-50 p-8 text-center shadow-sm">
          <div className="mb-2 text-sm font-bold tracking-widest text-blue-400 uppercase">
            Western Calendar
          </div>
          <div className="text-5xl font-black text-blue-700">
            {westernYear}<span className="ml-2 text-2xl">年</span>
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(westernYear.toString())}
            className="mt-6 text-xs font-bold text-blue-500 hover:underline"
          >
            コピーする
          </button>
        </div>
      )}
    </div>
  )
}