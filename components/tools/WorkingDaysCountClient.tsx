"use client"

import { useMemo, useState } from "react"
import {
  getJpHolidayDataStatus,
  isJpHoliday,
  JP_HOLIDAY_END_YEAR,
  JP_HOLIDAY_OFFICIAL_THROUGH_YEAR,
  JP_HOLIDAY_START_YEAR,
} from "@/lib/jpHolidays"
import { addDays, parseISODate, todayISOInJapan, ymdToISO } from "@/lib/businessDayUtils"

const DEFAULT_START = todayISOInJapan()
const DEFAULT_END = ymdToISO(addDays(parseISODate(DEFAULT_START)!, 7))

export default function WorkingDaysCountClient() {
  const [startDate, setStartDate] = useState(DEFAULT_START)
  const [endDate, setEndDate] = useState(DEFAULT_END)

  const stats = useMemo(() => {
    if (!startDate || !endDate) return null

    const startYear = Number(startDate.slice(0, 4))
    const endYear = Number(endDate.slice(0, 4))
    const firstYear = Math.min(startYear, endYear)
    const lastYear = Math.max(startYear, endYear)
    if (getJpHolidayDataStatus(firstYear) === "unsupported" || getJpHolidayDataStatus(lastYear) === "unsupported") {
      return { unsupported: true as const }
    }

    let start = new Date(startDate)
    let end = new Date(endDate)

    const isReversed = start > end
    if (isReversed) {
      const temp = start
      start = end
      end = temp
    }

    let totalDays = 0
    let workingDays = 0
    let nonWorkingDays = 0

    const current = new Date(start)
    while (current <= end) {
      totalDays++

      const year = current.getFullYear()
      const month = current.getMonth() + 1
      const day = current.getDate()
      const dayOfWeek = current.getDay()
      const weekend = dayOfWeek === 0 || dayOfWeek === 6
      const holiday = isJpHoliday({ y: year, m: month, d: day })

      if (weekend || holiday) {
        nonWorkingDays++
      } else {
        workingDays++
      }

      current.setDate(current.getDate() + 1)
    }

    return {
      unsupported: false as const,
      totalDays,
      workingDays,
      nonWorkingDays,
      isReversed,
      projected: lastYear > JP_HOLIDAY_OFFICIAL_THROUGH_YEAR,
    }
  }, [startDate, endDate])

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="space-y-4 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-xs font-bold uppercase text-neutral-400">開始日</label>
            <input
              type="date"
              min={`${JP_HOLIDAY_START_YEAR}-01-01`}
              max={`${JP_HOLIDAY_END_YEAR}-12-31`}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded border border-neutral-300 p-2 font-bold outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold uppercase text-neutral-400">終了日</label>
            <input
              type="date"
              min={`${JP_HOLIDAY_START_YEAR}-01-01`}
              max={`${JP_HOLIDAY_END_YEAR}-12-31`}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full rounded border border-neutral-300 p-2 font-bold outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {stats?.unsupported && (
        <p className="rounded-lg bg-amber-50 p-4 text-center text-sm font-bold text-amber-900">
          営業日計算は{JP_HOLIDAY_START_YEAR}年から{JP_HOLIDAY_END_YEAR}年までに対応しています。
        </p>
      )}

      {stats && !stats.unsupported && (
        <div className="grid grid-cols-1 gap-4">
          <div className="rounded-2xl border-2 border-blue-100 bg-blue-50 p-8 text-center shadow-sm">
            <div className="mb-1 text-sm font-bold uppercase tracking-widest text-blue-500">
              営業日数 (平日)
            </div>
            <div className="text-6xl font-black text-blue-700">
              {stats.workingDays}
              <span className="ml-1 text-xl">日</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-neutral-50 p-4 text-center">
              <div className="text-[10px] font-bold uppercase text-neutral-400">総日数</div>
              <div className="text-xl font-bold text-neutral-700">{stats.totalDays}日</div>
            </div>
            <div className="rounded-xl bg-neutral-50 p-4 text-center">
              <div className="text-[10px] font-bold uppercase text-neutral-400">土日祝</div>
              <div className="text-xl font-bold text-rose-400">{stats.nonWorkingDays}日</div>
            </div>
          </div>

          {stats.isReversed && (
            <p className="text-center text-[10px] font-bold italic text-rose-500">
              ※開始日と終了日が逆転しています。期間として計算しました。
            </p>
          )}
          {stats.projected && (
            <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-center text-xs leading-5 text-amber-900">
              {JP_HOLIDAY_OFFICIAL_THROUGH_YEAR + 1}年以降の祝日は、現行法と暦計算に基づく暫定値です。重要な期限は公表後に再確認してください。
            </p>
          )}
        </div>
      )}
    </div>
  )
}
