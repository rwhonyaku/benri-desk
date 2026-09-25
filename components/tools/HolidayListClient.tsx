"use client"

import { useMemo, useState } from "react"
import {
  getJpHolidayDataStatus,
  getJpHolidayName,
  getJpHolidaysForYear,
  JP_HOLIDAY_END_YEAR,
  JP_HOLIDAY_OFFICIAL_THROUGH_YEAR,
  JP_HOLIDAY_SOURCE_URL,
  JP_HOLIDAY_START_YEAR,
} from "@/lib/jpHolidays"
import { getWeekdayName, parseISODate, todayISOInJapan } from "@/lib/businessDayUtils"

export default function HolidayListClient() {
  const todayISO = useMemo(() => todayISOInJapan(), [])
  const [year, setYear] = useState(Number(todayISO.slice(0, 4)))
  const [dateStr, setDateStr] = useState(todayISO)

  const holidays = useMemo(() => getJpHolidaysForYear(year), [year])

  const lookup = useMemo(() => {
    const ymd = parseISODate(dateStr)
    if (!ymd) return null
    return {
      ymd,
      weekday: getWeekdayName(ymd),
      name: getJpHolidayName(ymd),
      status: getJpHolidayDataStatus(ymd.y),
    }
  }, [dateStr])

  const yearStatus = getJpHolidayDataStatus(year)

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-3 block text-sm font-bold italic text-neutral-700">日付で確認</label>
        <input
          type="date"
          min={`${JP_HOLIDAY_START_YEAR}-01-01`}
          max={`${JP_HOLIDAY_END_YEAR}-12-31`}
          value={dateStr}
          onChange={(e) => setDateStr(e.target.value)}
          className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-lg font-semibold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
        />

        {lookup && lookup.status !== "unsupported" && (
          <div className="mt-4 rounded-lg bg-neutral-50 p-4 text-center">
            <div className="text-sm font-bold text-neutral-500">
              {lookup.ymd.y}年{lookup.ymd.m}月{lookup.ymd.d}日 ({lookup.weekday})
            </div>
            <div className={`mt-2 text-2xl font-black ${lookup.name ? "text-rose-600" : "text-neutral-700"}`}>
              {lookup.name ?? "祝日ではありません"}
            </div>
          </div>
        )}
        {lookup?.status === "unsupported" && (
          <p className="mt-4 rounded-lg bg-amber-50 p-3 text-sm font-bold text-amber-900">
            {JP_HOLIDAY_START_YEAR}年から{JP_HOLIDAY_END_YEAR}年までの日付を選択してください。
          </p>
        )}
      </div>

      <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <button
          onClick={() => setYear(year - 1)}
          disabled={year <= JP_HOLIDAY_START_YEAR}
          className="rounded-full p-2 text-neutral-400 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-30"
        >
          ←
        </button>
        <div className="text-2xl font-black text-neutral-900">
          {year}年 <span className="text-sm font-normal text-neutral-400">祝日一覧</span>
        </div>
        <button
          onClick={() => setYear(year + 1)}
          disabled={year >= JP_HOLIDAY_END_YEAR}
          className="rounded-full p-2 text-neutral-400 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-30"
        >
          →
        </button>
      </div>

      <div className={`rounded-xl border px-4 py-3 text-sm leading-6 ${yearStatus === "official" ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-amber-200 bg-amber-50 text-amber-950"}`}>
        {yearStatus === "official" ? (
          <>
            {year}年の祝日・休日は、内閣府の公表内容に対応しています。
            <a href={JP_HOLIDAY_SOURCE_URL} target="_blank" rel="noreferrer" className="ml-1 font-bold underline underline-offset-2">
              内閣府の一覧を確認
            </a>
          </>
        ) : (
          <>
            {year}年は現行の祝日法と暦計算に基づく暫定表示です。正式な日付は、内閣府が前年2月に公表した後に更新します。
          </>
        )}
      </div>

      <div className="overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-neutral-50">
              <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-neutral-400">日付</th>
              <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-neutral-400">祝日名</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-50">
            {holidays.map((holiday) => (
              <tr key={holiday.date} className="transition-colors hover:bg-neutral-50/50">
                <td className="px-6 py-4 font-mono text-sm font-bold text-neutral-600">
                  {holiday.date.replace(/-/g, "/")}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-block rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-600">
                    {holiday.name}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-center text-[10px] italic text-neutral-400">
        ※{JP_HOLIDAY_START_YEAR}年〜{JP_HOLIDAY_OFFICIAL_THROUGH_YEAR}年は公表済み、{JP_HOLIDAY_OFFICIAL_THROUGH_YEAR + 1}年〜{JP_HOLIDAY_END_YEAR}年は暫定です。
      </p>
    </div>
  )
}
