"use client"

import { useMemo, useState } from "react"

const units = [
  { key: "seconds", label: "秒", seconds: 1 },
  { key: "minutes", label: "分", seconds: 60 },
  { key: "hours", label: "時間", seconds: 3600 },
  { key: "days", label: "日", seconds: 86400 },
  { key: "weeks", label: "週間", seconds: 604800 },
] as const

type UnitKey = (typeof units)[number]["key"]

const presets: { label: string; value: number; unit: UnitKey }[] = [
  { label: "60秒", value: 60, unit: "seconds" },
  { label: "90分", value: 90, unit: "minutes" },
  { label: "2.5時間", value: 2.5, unit: "hours" },
  { label: "1日", value: 1, unit: "days" },
]

export default function TimeUnitConverterClient() {
  const [value, setValue] = useState<number | "">(1)
  const [unit, setUnit] = useState<UnitKey>("hours")
  const [copied, setCopied] = useState(false)

  const conversions = useMemo(() => {
    if (value === "" || value < 0) return null

    const source = units.find((item) => item.key === unit)
    if (!source) return null

    const baseSeconds = Number(value) * source.seconds

    return units.map((item) => ({
      ...item,
      val: (baseSeconds / item.seconds).toLocaleString("ja-JP", {
        maximumFractionDigits: 8,
      }),
    }))
  }, [value, unit])

  const copyResults = async () => {
    if (!conversions || value === "") return

    const sourceLabel = units.find((item) => item.key === unit)?.label ?? ""
    const text = [
      `${value}${sourceLabel} の換算結果`,
      ...conversions.map((item) => `${item.val}${item.label}`),
    ].join("\n")

    await navigator.clipboard.writeText(text)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
        <label htmlFor="time-value" className="mb-3 block text-sm font-bold text-neutral-800">
          変換する時間
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            id="time-value"
            type="number"
            min="0"
            step="any"
            value={value}
            onChange={(e) => setValue(e.target.value === "" ? "" : Number(e.target.value))}
            inputMode="decimal"
            aria-describedby="time-converter-note"
            className="min-w-0 flex-1 rounded-lg border border-neutral-300 px-4 py-3 text-xl font-bold outline-none focus:border-amber-700"
          />
          <select
            value={unit}
            aria-label="変換元の単位"
            onChange={(e) => setUnit(e.target.value as UnitKey)}
            className="rounded-lg border border-neutral-300 bg-stone-50 px-4 py-3 font-bold outline-none focus:border-amber-700"
          >
            {units.map((item) => (
              <option key={item.key} value={item.key}>{item.label}</option>
            ))}
          </select>
        </div>
        <p id="time-converter-note" className="mt-3 text-xs leading-5 text-neutral-500">
          入力すると、5つの単位へ同時に換算します。
        </p>
        <div className="mt-4 flex flex-wrap gap-2" aria-label="入力例">
          {presets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => {
                setValue(preset.value)
                setUnit(preset.unit)
              }}
              className="rounded-full border border-stone-300 bg-stone-50 px-3 py-1.5 text-xs font-bold text-stone-700 transition-colors hover:border-amber-700 hover:bg-amber-50"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {conversions && (
        <div className="space-y-3" aria-live="polite">
          <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
            {conversions.map((item) => (
              <div
                key={item.key}
                className={`flex items-center justify-between gap-4 border-b border-stone-100 p-4 last:border-b-0 ${item.key === unit ? "bg-amber-50" : ""}`}
              >
                <span className="text-sm font-bold text-stone-600">{item.label}</span>
                <span className="break-all text-right text-lg font-black tabular-nums text-stone-900">
                  {item.val} <span className="text-xs text-stone-500">{item.label}</span>
                </span>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={copyResults}
            className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-sm font-bold text-stone-700 transition-colors hover:border-amber-700 hover:text-amber-800"
          >
            {copied ? "コピーしました" : "換算結果をコピー"}
          </button>
        </div>
      )}

      {value !== "" && value < 0 && (
        <p className="rounded-lg bg-red-50 p-3 text-center text-sm font-bold text-red-700">
          0以上の数値を入力してください。
        </p>
      )}
    </div>
  )
}
