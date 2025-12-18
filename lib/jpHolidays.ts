// lib/jpHolidays.ts
// Japan national holidays calculator (2020–2035)
// Covers: fixed holidays, Happy Monday, equinoxes, substitute holidays, citizen’s holidays,
// and 2020/2021 special moves (Olympics).

export type YMD = { y: number; m: number; d: number }

function pad2(n: number) {
  return String(n).padStart(2, "0")
}
export function ymdToKey(ymd: YMD) {
  return `${ymd.y}-${pad2(ymd.m)}-${pad2(ymd.d)}`
}

function dateUTC(y: number, m: number, d: number) {
  return new Date(Date.UTC(y, m - 1, d))
}
function addDays(ymd: YMD, days: number): YMD {
  const dt = dateUTC(ymd.y, ymd.m, ymd.d)
  dt.setUTCDate(dt.getUTCDate() + days)
  return { y: dt.getUTCFullYear(), m: dt.getUTCMonth() + 1, d: dt.getUTCDate() }
}
function isSame(a: YMD, b: YMD) {
  return a.y === b.y && a.m === b.m && a.d === b.d
}
function weekdayJST(ymd: YMD) {
  // stable: JST noon == 03:00 UTC
  const dt = new Date(Date.UTC(ymd.y, ymd.m - 1, ymd.d, 3, 0, 0))
  return dt.getUTCDay() // 0 Sun .. 6 Sat
}

function nthMonday(year: number, month: number, nth: number): YMD {
  // nth Monday in month (1-based)
  const first = { y: year, m: month, d: 1 }
  const dow = weekdayJST(first)
  const offsetToMon = (1 - dow + 7) % 7
  const day = 1 + offsetToMon + (nth - 1) * 7
  return { y: year, m: month, d: day }
}

function vernalEquinoxDay(year: number) {
  // valid for 1980–2099 (sufficient)
  return Math.floor(20.8431 + 0.242194 * (year - 1980) - Math.floor((year - 1980) / 4))
}
function autumnEquinoxDay(year: number) {
  return Math.floor(23.2488 + 0.242194 * (year - 1980) - Math.floor((year - 1980) / 4))
}

function baseHolidaysForYear(year: number): Map<string, string> {
  const h = new Map<string, string>()

  const put = (m: number, d: number, name: string) => h.set(ymdToKey({ y: year, m, d }), name)
  const putYMD = (ymd: YMD, name: string) => h.set(ymdToKey(ymd), name)

  // Fixed
  put(1, 1, "元日")
  put(2, 11, "建国記念の日")
  put(2, 23, "天皇誕生日")
  put(4, 29, "昭和の日")
  put(5, 3, "憲法記念日")
  put(5, 4, "みどりの日")
  put(5, 5, "こどもの日")
  put(11, 3, "文化の日")
  put(11, 23, "勤労感謝の日")

  // Equinoxes
  put(3, vernalEquinoxDay(year), "春分の日")
  put(9, autumnEquinoxDay(year), "秋分の日")

  // Happy Monday system
  putYMD(nthMonday(year, 1, 2), "成人の日")
  putYMD(nthMonday(year, 7, 3), "海の日")
  putYMD(nthMonday(year, 9, 3), "敬老の日")
  putYMD(nthMonday(year, 10, 2), "スポーツの日")

  // Mountain Day (normal)
  put(8, 11, "山の日")

  // Special moves (Olympics)
  if (year === 2020) {
    // 2020: 海の日 7/23, スポーツの日 7/24, 山の日 8/10
    // Remove defaults
    h.delete(ymdToKey(nthMonday(year, 7, 3)))
    h.delete(ymdToKey(nthMonday(year, 10, 2)))
    h.delete(ymdToKey({ y: year, m: 8, d: 11 }))
    // Add special
    put(7, 23, "海の日")
    put(7, 24, "スポーツの日")
    put(8, 10, "山の日")
  }

  if (year === 2021) {
    // 2021: 海の日 7/22, スポーツの日 7/23, 山の日 8/8
    h.delete(ymdToKey(nthMonday(year, 7, 3)))
    h.delete(ymdToKey(nthMonday(year, 10, 2)))
    h.delete(ymdToKey({ y: year, m: 8, d: 11 }))
    put(7, 22, "海の日")
    put(7, 23, "スポーツの日")
    put(8, 8, "山の日")
  }

  return h
}

function applySubstituteAndCitizens(year: number, base: Map<string, string>): Map<string, string> {
  const out = new Map(base)

  const getName = (ymd: YMD) => out.get(ymdToKey(ymd)) ?? null
  const setName = (ymd: YMD, name: string) => out.set(ymdToKey(ymd), name)

  // Substitute holiday: if holiday falls on Sunday, next non-holiday weekday becomes 振替休日
  // Apply repeatedly (handles consecutive holidays)
  const keys = Array.from(base.keys()).sort()
  for (const k of keys) {
    const [y, m, d] = k.split("-").map(Number)
    const ymd = { y, m, d }
    if (weekdayJST(ymd) !== 0) continue // not Sunday

    let cur = addDays(ymd, 1)
    while (true) {
      // If already a holiday, keep moving forward
      if (!getName(cur)) {
        setName(cur, "振替休日")
        break
      }
      cur = addDays(cur, 1)
    }
  }

  // Citizen's holiday: a weekday between two holidays becomes 国民の休日
  // Scan the year range safely
  const start = { y: year, m: 1, d: 1 }
  const end = { y: year, m: 12, d: 31 }
  let cur = start
  while (true) {
    const dow = weekdayJST(cur)
    const todayIsHoliday = !!getName(cur)
    if (!todayIsHoliday && dow >= 1 && dow <= 5) {
      const prev = addDays(cur, -1)
      const next = addDays(cur, 1)
      if (prev.y === year && next.y === year) {
        if (getName(prev) && getName(next)) setName(cur, "国民の休日")
      }
    }

    if (isSame(cur, end)) break
    cur = addDays(cur, 1)
  }

  return out
}

export function getJpHolidayName(ymd: YMD): string | null {
  if (ymd.y < 2020 || ymd.y > 2035) return null

  const base = baseHolidaysForYear(ymd.y)
  const full = applySubstituteAndCitizens(ymd.y, base)
  return full.get(ymdToKey(ymd)) ?? null
}

export function isJpHoliday(ymd: YMD) {
  return getJpHolidayName(ymd) !== null
}
