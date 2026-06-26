"use client"

import { useMemo, useState } from "react"
import {
  addDays,
  getBusinessDayReason,
  getWeekdayName,
  isBusinessDay,
  parseISODate,
  todayISOInJapan,
  ymdToISO,
} from "@/lib/businessDayUtils"

type AdjustMode = "next" | "previous" | "none"

function adjustBusinessDay(dateStr: string, mode: AdjustMode) {
  const base = parseISODate(dateStr)
  if (!base || mode === "none" || isBusinessDay(base)) {
    return { date: base, adjustedDays: 0 }
  }

  const step = mode === "next" ? 1 : -1
  let current = base
  let adjustedDays = 0

  while (!isBusinessDay(current)) {
    current = addDays(current, step)
    adjustedDays += step
  }

  return { date: current, adjustedDays }
}

export default function PaymentDueDateClient() {
  const todayISO = useMemo(() => todayISOInJapan(), [])
  const [baseDate, setBaseDate] = useState(todayISO)
  const [termDays, setTermDays] = useState(30)
  const [adjustMode, setAdjustMode] = useState<AdjustMode>("next")

  const result = useMemo(() => {
    const base = parseISODate(baseDate)
    if (!base) return null

    const raw = addDays(base, termDays)
    const rawISO = ymdToISO(raw)
    const adjusted = adjustBusinessDay(rawISO, adjustMode)
    if (!adjusted.date) return null

    return {
      raw,
      rawISO,
      rawWeekday: getWeekdayName(raw),
      rawReasons: getBusinessDayReason(raw),
      adjusted: adjusted.date,
      adjustedISO: ymdToISO(adjusted.date),
      adjustedWeekday: getWeekdayName(adjusted.date),
      adjustedDays: adjusted.adjustedDays,
    }
  }, [baseDate, termDays, adjustMode])

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="space-y-5 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div>
          <label className="mb-2 block text-sm font-bold italic text-neutral-700">基準日</label>
          <input
            type="date"
            value={baseDate}
            onChange={(e) => setBaseDate(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-lg font-semibold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold italic text-neutral-700">支払サイト（日数）</label>
          <input
            type="number"
            min="0"
            max="3650"
            value={termDays}
            onChange={(e) => setTermDays(Number(e.target.value))}
            className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-lg font-semibold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold italic text-neutral-700">土日祝の場合</label>
          <select
            value={adjustMode}
            onChange={(e) => setAdjustMode(e.target.value as AdjustMode)}
            className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500"
          >
            <option value="next">翌営業日にする</option>
            <option value="previous">前営業日にする</option>
            <option value="none">調整しない</option>
          </select>
        </div>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="rounded-2xl border-2 border-blue-100 bg-blue-50 p-8 text-center shadow-sm">
            <div className="mb-2 text-sm font-bold tracking-widest text-blue-500">支払期日</div>
            <div className="text-4xl font-black text-blue-700">
              {result.adjusted.y}年{result.adjusted.m}月{result.adjusted.d}日
              <span className="ml-2 text-2xl">({result.adjustedWeekday})</span>
            </div>
            {result.adjustedDays !== 0 && (
              <div className="mt-4 text-sm font-medium text-neutral-600">
                計算上の日付が土日祝のため、{Math.abs(result.adjustedDays)}日
                {result.adjustedDays > 0 ? "後" : "前"}に調整しました。
              </div>
            )}
          </div>

          <div className="rounded-xl bg-neutral-50 p-4 text-sm text-neutral-600">
            調整前：{result.raw.y}年{result.raw.m}月{result.raw.d}日 ({result.rawWeekday})
            {result.rawReasons.length > 0 && `：${result.rawReasons.join("、")}`}
          </div>
        </div>
      )}
    </div>
  )
}
