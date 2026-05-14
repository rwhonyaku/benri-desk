"use client"

import { useState, useMemo } from "react"

export default function TimeUnitConverterClient() {
  const [value, setValue] = useState<number | "">(1)
  const [unit, setUnit] = useState<string>("hours")

  const conversions = useMemo(() => {
    if (value === "" || value < 0) return null

    const rates: Record<string, number> = {
      seconds: 1,
      minutes: 60,
      hours: 3600,
      days: 86400,
      weeks: 604800,
    }

    const labels: Record<string, string> = {
      seconds: "秒",
      minutes: "分",
      hours: "時間",
      days: "日",
      weeks: "週間",
    }

    const baseSeconds = Number(value) * rates[unit]

    return Object.keys(rates).map((key) => ({
      key,
      label: labels[key],
      val: (baseSeconds / rates[key]).toLocaleString(undefined, { maximumFractionDigits: 6 })
    }))
  }, [value, unit])

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-4 block text-sm font-bold text-neutral-700 italic">数値を入力して単位を選択</label>
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
            <option value="seconds">秒</option>
            <option value="minutes">分</option>
            <option value="hours">時間</option>
            <option value="days">日</option>
            <option value="weeks">週間</option>
          </select>
        </div>
      </div>

      {conversions && (
        <div className="grid grid-cols-1 gap-3">
          {conversions.map((item) => (
            <div key={item.key} className="flex items-center justify-between rounded-xl border border-neutral-100 bg-white p-4 shadow-sm">
              <span className="text-xs font-black text-neutral-400 uppercase tracking-widest">{item.label}</span>
              <span className="text-lg font-black text-neutral-900">
                {item.val} <span className="text-xs text-neutral-400">{item.label}</span>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}