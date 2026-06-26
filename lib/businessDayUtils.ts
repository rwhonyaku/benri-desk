import { getJpHolidayName, type YMD } from "@/lib/jpHolidays"

export function pad2(n: number) {
  return String(n).padStart(2, "0")
}

export function parseISODate(value: string): YMD | null {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!match) return null
  return { y: Number(match[1]), m: Number(match[2]), d: Number(match[3]) }
}

export function ymdToISO(ymd: YMD) {
  return `${ymd.y}-${pad2(ymd.m)}-${pad2(ymd.d)}`
}

export function addDays(ymd: YMD, days: number): YMD {
  const date = new Date(Date.UTC(ymd.y, ymd.m - 1, ymd.d + days, 3, 0, 0))
  return {
    y: date.getUTCFullYear(),
    m: date.getUTCMonth() + 1,
    d: date.getUTCDate(),
  }
}

export function getWeekdayIndex(ymd: YMD) {
  return new Date(Date.UTC(ymd.y, ymd.m - 1, ymd.d, 3, 0, 0)).getUTCDay()
}

export function getWeekdayName(ymd: YMD) {
  return new Intl.DateTimeFormat("ja-JP", { weekday: "short" }).format(
    new Date(Date.UTC(ymd.y, ymd.m - 1, ymd.d, 3, 0, 0))
  )
}

export function isWeekend(ymd: YMD) {
  const day = getWeekdayIndex(ymd)
  return day === 0 || day === 6
}

export function isBusinessDay(ymd: YMD) {
  return !isWeekend(ymd) && !getJpHolidayName(ymd)
}

export function getBusinessDayReason(ymd: YMD) {
  const reasons: string[] = []
  const holidayName = getJpHolidayName(ymd)
  if (isWeekend(ymd)) reasons.push("土日")
  if (holidayName) reasons.push(holidayName)
  return reasons
}

export function todayISOInJapan() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tokyo" }).format(new Date())
}
