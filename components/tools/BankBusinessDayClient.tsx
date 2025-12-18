"use client"

import { useMemo, useState } from "react"
import { getJpHolidayName } from "../../lib/jpHolidays"



type YMD = { y: number; m: number; d: number }

function pad2(n: number) {
  return String(n).padStart(2, "0")
}

function toISODate(ymd: YMD) {
  return `${ymd.y}-${pad2(ymd.m)}-${pad2(ymd.d)}`
}

function parseISODate(s: string): YMD | null {
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!m) return null
  const y = Number(m[1])
  const mo = Number(m[2])
  const d = Number(m[3])
  if (y < 1 || mo < 1 || mo > 12 || d < 1 || d > 31) return null
  const dt = new Date(Date.UTC(y, mo - 1, d))
  if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== mo - 1 || dt.getUTCDate() !== d) return null
  return { y, m: mo, d }
}

function weekdayJST(ymd: YMD) {
  const dt = new Date(Date.UTC(ymd.y, ymd.m - 1, ymd.d))
  return new Intl.DateTimeFormat("ja-JP", { weekday: "short", timeZone: "Asia/Tokyo" }).format(dt)
}

function isWeekendJST(ymd: YMD) {
 
  // Above is awkward; simpler: derive JST day by shifting date to JST noon.
  // Use a stable method:
  const jstNoon = new Date(Date.UTC(ymd.y, ymd.m - 1, ymd.d, 3, 0, 0)) // 12:00 JST == 03:00 UTC
  const day = jstNoon.getUTCDay() // 0 Sun .. 6 Sat (matches JST day at noon)
  return day === 0 || day === 6
}



// Minimal fallback list for closures that matter for banks regardless of public holiday variability.
function isYearEndNewYearClosure(ymd: YMD) {
  const { m, d } = ymd
  // Typical banking non-business days: Jan 1–3 and Dec 31.
  if (m === 1 && (d === 1 || d === 2 || d === 3)) return true
  if (m === 12 && d === 31) return true
  return false
}

// Optional: allow user to paste a small holiday list (YYYY-MM-DD) for their year.
// But per “boring/low-maintenance”, we keep v1 simple.
export default function BankBusinessDayClient() {
  const todayJST = useMemo(() => {
    const now = new Date()
    // Convert "today" in JST to ISO date input default:
    const dt = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Tokyo" }))
    const y = dt.getFullYear()
    const m = dt.getMonth() + 1
    const d = dt.getDate()
    return `${y}-${pad2(m)}-${pad2(d)}`
  }, [])

  const [dateStr, setDateStr] = useState(todayJST)

    const result = useMemo(() => {
    const ymd = parseISODate(dateStr)
    if (!ymd) return { ok: false as const, message: "日付を選択してください。" }

    const wd = weekdayJST(ymd)
    const weekend = isWeekendJST(ymd)
    const yearEnd = isYearEndNewYearClosure(ymd)

    const holidayName = getJpHolidayName(ymd)

    const reasons: string[] = []
    if (weekend) reasons.push("土日")
    if (yearEnd) reasons.push("年末年始（1/1〜1/3・12/31）")
    if (holidayName) reasons.push(holidayName)

    const isBusinessDay = !weekend && !yearEnd && !holidayName

    return {
      ok: true as const,
      ymd,
      wd,
      isBusinessDay,
      reasons,
    }
  }, [dateStr])


  return (
    <section className="rounded-lg border border-neutral-200 bg-white p-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="text-sm font-medium text-neutral-900">判定する日付</div>
        <div className="text-xs text-neutral-500">JST基準</div>
      </div>

      <input
        type="date"
        className="mt-2 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:ring-2 focus:ring-neutral-200"
        value={dateStr}
        onChange={(e) => setDateStr(e.target.value)}
      />

      <div className="mt-4 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
        {!result.ok ? (
          <div className="text-sm text-neutral-700">{result.message}</div>
        ) : (
          <>
            <div className="text-sm text-neutral-700">
              {toISODate(result.ymd)}（{result.wd}）
            </div>

            <div className="mt-2 text-2xl font-semibold text-neutral-900">
              {result.isBusinessDay ? "営業日" : "休業日"}
            </div>

            {!result.isBusinessDay && result.reasons.length > 0 && (
              <div className="mt-2 text-sm text-neutral-700">
                理由: {result.reasons.join("・")}
              </div>
            )}

          </>
        )}
      </div>

      <p className="mt-4 text-xs text-neutral-500">
        入力内容は保存されません。判定は一般的な銀行休業日（土日・年末年始）を基準にしています。
      </p>
    </section>
  )
}
