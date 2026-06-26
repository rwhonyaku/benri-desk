"use client"

import { useMemo, useState } from "react"
import { getWeekdayName, parseISODate, todayISOInJapan } from "@/lib/businessDayUtils"

export default function FiscalYearCalculatorClient() {
  const todayISO = useMemo(() => todayISOInJapan(), [])
  const [dateStr, setDateStr] = useState(todayISO)
  const [startMonth, setStartMonth] = useState(4)

  const result = useMemo(() => {
    const ymd = parseISODate(dateStr)
    if (!ymd) return null

    const fiscalYear = ymd.m >= startMonth ? ymd.y : ymd.y - 1
    const fiscalMonth = ((ymd.m - startMonth + 12) % 12) + 1
    const quarter = Math.ceil(fiscalMonth / 3)
    const fiscalEndYear = startMonth === 1 ? fiscalYear : fiscalYear + 1
    const endMonth = startMonth === 1 ? 12 : startMonth - 1

    return {
      ymd,
      weekday: getWeekdayName(ymd),
      fiscalYear,
      fiscalMonth,
      quarter,
      startLabel: `${fiscalYear}年${startMonth}月`,
      endLabel: `${fiscalEndYear}年${endMonth}月`,
    }
  }, [dateStr, startMonth])

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="space-y-5 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div>
          <label className="mb-2 block text-sm font-bold italic text-neutral-700">対象日</label>
          <input
            type="date"
            value={dateStr}
            onChange={(e) => setDateStr(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-lg font-semibold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold italic text-neutral-700">年度開始月</label>
          <select
            value={startMonth}
            onChange={(e) => setStartMonth(Number(e.target.value))}
            className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500"
          >
            {Array.from({ length: 12 }, (_, index) => index + 1).map((month) => (
              <option key={month} value={month}>
                {month}月
              </option>
            ))}
          </select>
        </div>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="rounded-2xl border-2 border-blue-100 bg-blue-50 p-8 text-center shadow-sm">
            <div className="mb-2 text-sm font-bold tracking-widest text-blue-500">年度</div>
            <div className="text-5xl font-black text-blue-700">
              {result.fiscalYear}
              <span className="ml-1 text-2xl">年度</span>
            </div>
            <div className="mt-3 text-sm font-medium text-neutral-600">
              第{result.quarter}四半期・年度内{result.fiscalMonth}か月目
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-neutral-50 p-4 text-center">
              <div className="text-[10px] font-bold uppercase text-neutral-400">対象日</div>
              <div className="mt-1 text-sm font-bold text-neutral-700">
                {result.ymd.y}年{result.ymd.m}月{result.ymd.d}日 ({result.weekday})
              </div>
            </div>
            <div className="rounded-xl bg-neutral-50 p-4 text-center">
              <div className="text-[10px] font-bold uppercase text-neutral-400">年度期間</div>
              <div className="mt-1 text-sm font-bold text-neutral-700">
                {result.startLabel}〜{result.endLabel}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
