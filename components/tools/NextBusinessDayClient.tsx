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

export default function NextBusinessDayClient() {
  const todayISO = useMemo(() => todayISOInJapan(), [])
  const [dateStr, setDateStr] = useState(todayISO)
  const [includeStart, setIncludeStart] = useState(false)

  const result = useMemo(() => {
    const start = parseISODate(dateStr)
    if (!start) return null

    let current = includeStart ? start : addDays(start, 1)
    let movedDays = includeStart ? 0 : 1

    while (!isBusinessDay(current)) {
      current = addDays(current, 1)
      movedDays++
    }

    return {
      date: current,
      iso: ymdToISO(current),
      weekday: getWeekdayName(current),
      movedDays,
      startReasons: getBusinessDayReason(start),
    }
  }, [dateStr, includeStart])

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="space-y-5 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <label className="text-sm font-bold italic text-neutral-700">基準日</label>
            <button
              onClick={() => setDateStr(todayISO)}
              className="text-xs font-medium text-blue-600 hover:text-blue-800"
            >
              今日を選択
            </button>
          </div>

          <input
            type="date"
            value={dateStr}
            onChange={(e) => setDateStr(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-xl font-semibold text-neutral-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
          />
        </div>

        <label className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-medium text-neutral-700">
          <input
            type="checkbox"
            checked={includeStart}
            onChange={(e) => setIncludeStart(e.target.checked)}
            className="h-4 w-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
          />
          基準日が営業日の場合は当日を含める
        </label>
      </div>

      {result && (
        <div className="rounded-2xl border-2 border-blue-100 bg-blue-50 p-8 text-center shadow-sm">
          <div className="mb-2 text-sm font-bold tracking-widest text-blue-500">次の営業日</div>
          <div className="text-4xl font-black text-blue-700">
            {result.date.y}年{result.date.m}月{result.date.d}日
            <span className="ml-2 text-2xl">({result.weekday})</span>
          </div>
          <div className="mt-4 text-sm font-medium text-neutral-600">
            {result.movedDays === 0 ? "基準日が営業日です。" : `基準日から${result.movedDays}日後です。`}
          </div>
          {result.startReasons.length > 0 && (
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {result.startReasons.map((reason) => (
                <span key={reason} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-neutral-600">
                  基準日：{reason}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
