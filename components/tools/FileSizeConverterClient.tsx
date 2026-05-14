"use client"

import { useState, useMemo } from "react"

export default function FileSizeConverterClient() {
  const [value, setValue] = useState<number | "">(1024)
  const [unit, setUnit] = useState<string>("MB")

  const results = useMemo(() => {
    if (value === "" || value < 0) return null

    // Convert input to Bytes first
    const units: Record<string, number> = {
      "B": 1,
      "KB": 1024,
      "MB": 1024 ** 2,
      "GB": 1024 ** 3,
      "TB": 1024 ** 4
    }

    const bytes = Number(value) * units[unit]

    return Object.keys(units).map((u) => ({
      unit: u,
      val: (bytes / units[u]).toLocaleString(undefined, { maximumFractionDigits: 4 })
    }))
  }, [value, unit])

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-4 block text-sm font-bold text-neutral-700 italic">値を入力して単位を選択</label>
        <div className="flex gap-2">
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value === "" ? "" : Number(e.target.value))}
            className="flex-1 rounded-lg border border-neutral-300 px-4 py-3 text-xl font-black outline-none focus:border-blue-500"
          />
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="rounded-lg border border-neutral-300 bg-neutral-50 px-4 py-3 font-bold outline-none"
          >
            <option value="B">B</option>
            <option value="KB">KB</option>
            <option value="MB">MB</option>
            <option value="GB">GB</option>
            <option value="TB">TB</option>
          </select>
        </div>
      </div>

      {results && (
        <div className="grid grid-cols-1 gap-3">
          {results.map((res) => (
            <div key={res.unit} className="flex items-center justify-between rounded-xl border border-neutral-100 bg-white p-4 shadow-sm">
              <span className="text-xs font-black text-neutral-400 uppercase tracking-widest">{res.unit}</span>
              <span className="text-lg font-black text-neutral-900">
                {res.val} <span className="text-xs text-neutral-400">{res.unit}</span>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}