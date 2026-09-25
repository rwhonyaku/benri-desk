"use client"

import { useMemo, useState } from "react"
import {
  getJpHolidayDataStatus,
  getJpHolidayName,
  JP_HOLIDAY_END_YEAR,
  JP_HOLIDAY_OFFICIAL_THROUGH_YEAR,
  JP_HOLIDAY_START_YEAR,
  type YMD,
} from "@/lib/jpHolidays"

function pad2(n: number) {
  return String(n).padStart(2, "0")
}

function parseISODate(s: string): YMD | null {
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!m) return null
  return { y: Number(m[1]), m: Number(m[2]), d: Number(m[3]) }
}

function shiftDate(ymd: YMD, days: number): string {
  const dt = new Date(Date.UTC(ymd.y, ymd.m - 1, ymd.d + days, 3, 0, 0))
  return `${dt.getUTCFullYear()}-${pad2(dt.getUTCMonth() + 1)}-${pad2(dt.getUTCDate())}`
}

function getWeekdayName(ymd: YMD) {
  const dt = new Date(Date.UTC(ymd.y, ymd.m - 1, ymd.d, 3, 0, 0))
  return new Intl.DateTimeFormat("ja-JP", { weekday: "short" }).format(dt)
}

function isWeekend(ymd: YMD) {
  const dt = new Date(Date.UTC(ymd.y, ymd.m - 1, ymd.d, 3, 0, 0))
  const day = dt.getUTCDay()
  return day === 0 || day === 6
}

function isBankHolidayClosure(ymd: YMD) {
  const { m, d } = ymd
  return (m === 12 && d === 31) || (m === 1 && (d === 1 || d === 2 || d === 3))
}

export default function BankBusinessDayClient() {
  const todayISO = useMemo(() => {
    return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tokyo" }).format(new Date())
  }, [])

  const [dateStr, setDateStr] = useState(todayISO)

  const result = useMemo(() => {
    const ymd = parseISODate(dateStr)
    if (!ymd) return null
    const status = getJpHolidayDataStatus(ymd.y)
    if (status === "unsupported") return { unsupported: true as const }

    const weekday = getWeekdayName(ymd)
    const holidayName = getJpHolidayName(ymd)
    const weekend = isWeekend(ymd)
    const bankLawClosure = isBankHolidayClosure(ymd)

    const reasons: string[] = []
    if (holidayName) reasons.push(holidayName)
    if (weekend) reasons.push("土日")
    if (bankLawClosure && !holidayName) reasons.push("年末年始休業")

    const isOpen = reasons.length === 0

    return { unsupported: false as const, ymd, weekday, isOpen, reasons, projected: status === "projected" }
  }, [dateStr])

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <label className="text-sm font-bold italic text-neutral-700">対象日</label>
          <button
            onClick={() => setDateStr(todayISO)}
            className="text-xs font-medium text-blue-600 hover:text-blue-800"
          >
            今日を選択
          </button>
        </div>

        <input
          type="date"
          min={`${JP_HOLIDAY_START_YEAR}-01-01`}
          max={`${JP_HOLIDAY_END_YEAR}-12-31`}
          className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-xl font-semibold text-neutral-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
          value={dateStr}
          onChange={(e) => setDateStr(e.target.value)}
        />

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setDateStr((prev) => shiftDate(parseISODate(prev)!, -1))}
            className="flex-1 rounded-md border border-neutral-200 py-2 text-sm font-medium hover:bg-neutral-50 active:bg-neutral-100"
          >
            ← 前の日
          </button>
          <button
            onClick={() => setDateStr((prev) => shiftDate(parseISODate(prev)!, 1))}
            className="flex-1 rounded-md border border-neutral-200 py-2 text-sm font-medium hover:bg-neutral-50 active:bg-neutral-100"
          >
            次の日 →
          </button>
        </div>
      </div>

      {result?.unsupported && (
        <p className="rounded-lg bg-amber-50 p-4 text-center text-sm font-bold text-amber-900">
          銀行営業日の確認は{JP_HOLIDAY_START_YEAR}年から{JP_HOLIDAY_END_YEAR}年までに対応しています。
        </p>
      )}

      {result && !result.unsupported && (
        <div
          className={`rounded-2xl border-2 p-8 text-center transition-all ${
            result.isOpen
              ? "border-emerald-100 bg-emerald-50 shadow-[0_0_20px_rgba(16,185,129,0.05)]"
              : "border-rose-100 bg-rose-50 shadow-[0_0_20px_rgba(244,63,94,0.05)]"
          }`}
        >
          <div className="mb-2 text-sm font-bold tracking-widest text-neutral-500">
            {result.ymd.y}年{result.ymd.m}月{result.ymd.d}日 ({result.weekday})
          </div>

          <div className={`text-4xl font-black ${result.isOpen ? "text-emerald-700" : "text-rose-700"}`}>
            {result.isOpen ? "銀行営業日" : "銀行休業日"}
          </div>

          {!result.isOpen && (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {result.reasons.map((reason) => (
                <span key={reason} className="rounded-full bg-rose-200/50 px-3 py-1 text-xs font-bold text-rose-800">
                  {reason}
                </span>
              ))}
            </div>
          )}

          <div className="mt-6 text-xs text-neutral-400">
            ※銀行法令上の休日をもとにした窓口営業日の目安です。店舗独自の休日、ATM、ネットバンキングは各金融機関でご確認ください。
            <a
              href="https://www.fsa.go.jp/access/30/182a.html"
              target="_blank"
              rel="noreferrer"
              className="ml-1 font-bold underline underline-offset-2"
            >
              金融庁の案内
            </a>
          </div>
          {result.projected && (
            <div className="mt-3 text-xs leading-5 text-amber-800">
              ※{JP_HOLIDAY_OFFICIAL_THROUGH_YEAR + 1}年以降の祝日は暫定値です。正式公表後に再確認してください。
            </div>
          )}
        </div>
      )}
    </div>
  )
}
