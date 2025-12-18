"use client"

import { useMemo, useState } from "react"

type YMD = { y: number; m: number; d: number }

const ERA_START: Record<string, number> = {
  // Kanji eras
  "令和": 2019,
  "平成": 1989,
  "昭和": 1926,
  "大正": 1912,
  "明治": 1868,
  // Common abbreviations
  "R": 2019,
  "H": 1989,
  "S": 1926,
  "T": 1912,
  "M": 1868,
}

function normalizeInput(s: string) {
  return s.trim().replace(/\s+/g, " ")
}

function isValidYMD(ymd: YMD) {
  const { y, m, d } = ymd
  if (y < 1 || m < 1 || m > 12 || d < 1 || d > 31) return false
  const dt = new Date(Date.UTC(y, m - 1, d))
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d
}

function parseEraYear(raw: string) {
  const s = raw.trim()
  if (s === "元") return 1
  const n = Number(s)
  if (!Number.isFinite(n) || n < 1) return null
  return Math.floor(n)
}

function parseDate(input: string): YMD | null {
  const s = normalizeInput(input)
  if (!s) return null

  // 1) YYYY-MM-DD / YYYY/MM/DD
  {
    const m = s.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/)
    if (m) {
      const ymd = { y: Number(m[1]), m: Number(m[2]), d: Number(m[3]) }
      return isValidYMD(ymd) ? ymd : null
    }
  }

  // 2) YYYY年M月D日
  {
    const m = s.match(/^(\d{4})年(\d{1,2})月(\d{1,2})日$/)
    if (m) {
      const ymd = { y: Number(m[1]), m: Number(m[2]), d: Number(m[3]) }
      return isValidYMD(ymd) ? ymd : null
    }
  }

  // 3) 和暦: 令和6年12月16日 / 令和元年5月1日
  {
    const m = s.match(/^(令和|平成|昭和|大正|明治)(元|\d{1,2})年(\d{1,2})月(\d{1,2})日$/)
    if (m) {
      const era = m[1]
      const eraYear = parseEraYear(m[2])
      if (!eraYear) return null
      const start = ERA_START[era]
      const y = start + eraYear - 1
      const ymd = { y, m: Number(m[3]), d: Number(m[4]) }
      return isValidYMD(ymd) ? ymd : null
    }
  }

  // 4) Abbrev: R6/12/16, H1-01-08, etc.
  {
    const m = s.match(/^([RHS TM])\s*(元|\d{1,2})[\/\-](\d{1,2})[\/\-](\d{1,2})$/i)
    if (m) {
      const eraKey = m[1].toUpperCase()
      const eraYear = parseEraYear(m[2])
      if (!eraYear) return null
      const start = ERA_START[eraKey]
      if (!start) return null
      const y = start + eraYear - 1
      const ymd = { y, m: Number(m[3]), d: Number(m[4]) }
      return isValidYMD(ymd) ? ymd : null
    }
  }

  return null
}

function pad2(n: number) {
  return String(n).padStart(2, "0")
}

// Date-only correctness for JP users: compute & format using JST explicitly.
function asUTCDate({ y, m, d }: YMD) {
  return new Date(Date.UTC(y, m - 1, d))
}

function formatWeekdayJST(dtUTC: Date) {
  return new Intl.DateTimeFormat("ja-JP", { weekday: "short", timeZone: "Asia/Tokyo" }).format(dtUTC)
}

function formatGregorianSlash(ymd: YMD) {
  return `${ymd.y}/${pad2(ymd.m)}/${pad2(ymd.d)}`
}

function formatGregorianKanji(ymd: YMD) {
  return `${ymd.y}年${ymd.m}月${ymd.d}日`
}

function formatJapaneseEra(ymd: YMD) {
  const dtUTC = asUTCDate(ymd)
  // Example: 令和6年12月16日
  return new Intl.DateTimeFormat("ja-JP-u-ca-japanese", {
    era: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    timeZone: "Asia/Tokyo",
  }).format(dtUTC)
}

async function copyToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }
  const ta = document.createElement("textarea")
  ta.value = text
  ta.setAttribute("readonly", "true")
  ta.style.position = "fixed"
  ta.style.left = "-9999px"
  document.body.appendChild(ta)
  ta.select()
  document.execCommand("copy")
  document.body.removeChild(ta)
}

export default function DateWithWeekdayClient() {
  const [input, setInput] = useState("")
  const [format, setFormat] = useState<"slash" | "kanji" | "wareki">("kanji")
  const [copyMsg, setCopyMsg] = useState<string | null>(null)

  const parsed = useMemo(() => parseDate(input), [input])

  const output = useMemo(() => {
    if (!parsed) return ""
    const dtUTC = asUTCDate(parsed)
    const wd = formatWeekdayJST(dtUTC)

    if (format === "slash") return `${formatGregorianSlash(parsed)}（${wd}）`
    if (format === "wareki") return `${formatJapaneseEra(parsed)}（${wd}）`
    return `${formatGregorianKanji(parsed)}（${wd}）`
  }, [parsed, format])

  return (
    <section className="rounded-lg border border-neutral-200 bg-white p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="text-sm font-medium text-neutral-900">入力</div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-700">
          <label className="flex items-center gap-2">
            <input type="radio" name="fmt" checked={format === "slash"} onChange={() => setFormat("slash")} />
            YYYY/MM/DD（曜）
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="fmt" checked={format === "kanji"} onChange={() => setFormat("kanji")} />
            YYYY年M月D日（曜）
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="fmt" checked={format === "wareki"} onChange={() => setFormat("wareki")} />
            和暦（曜）
          </label>
        </div>
      </div>

      <input
        className="mt-3 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:ring-2 focus:ring-neutral-200"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="例: 2025-12-16 / 2025年12月16日 / 令和7年12月16日 / R7/12/16"
        spellCheck={false}
      />

      <div className="mt-4">
        <div className="text-sm font-medium text-neutral-900">出力</div>
        <div className="mt-2 rounded-md border border-neutral-200 bg-neutral-50 p-3 text-sm text-neutral-900">
          {parsed ? output : <span className="text-neutral-500">日付を正しい形式で入力してください。</span>}
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
            onClick={() => setInput("")}
          >
            クリア
          </button>

          <button
            type="button"
            className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
            onClick={async () => {
              try {
                await copyToClipboard(output)
                setCopyMsg("コピーしました")
              } catch {
                setCopyMsg("コピーに失敗しました")
              } finally {
                window.setTimeout(() => setCopyMsg(null), 1500)
              }
            }}
            disabled={!parsed}
          >
            コピー
          </button>

          {copyMsg && <span className="text-sm text-neutral-600">{copyMsg}</span>}
        </div>
      </div>

      <p className="mt-4 text-xs text-neutral-500">
        入力例: 2025/12/16, 2025年12月16日, 令和7年12月16日, R7/12/16（曜日はJST基準で表示）。入力内容は保存されません。
      </p>
    </section>
  )
}
