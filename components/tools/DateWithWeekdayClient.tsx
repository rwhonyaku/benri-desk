"use client"

import { useMemo, useState } from "react"

type YMD = { y: number; m: number; d: number }

const ERA_START: Record<string, number> = {
  "令和": 2019, "平成": 1989, "昭和": 1926, "大正": 1912, "明治": 1868,
  "R": 2019, "H": 1989, "S": 1926, "T": 1912, "M": 1868,
}

// --- Logic Helpers ---
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

  // 1) ISO / Slant
  const m1 = s.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/)
  if (m1) {
    const ymd = { y: Number(m1[1]), m: Number(m1[2]), d: Number(m1[3]) }
    return isValidYMD(ymd) ? ymd : null
  }

  // 2) Kanji
  const m2 = s.match(/^(\d{4})年(\d{1,2})月(\d{1,2})日$/)
  if (m2) {
    const ymd = { y: Number(m2[1]), m: Number(m2[2]), d: Number(m2[3]) }
    return isValidYMD(ymd) ? ymd : null
  }

  // 3) Full Wareki
  const m3 = s.match(/^(令和|平成|昭和|大正|明治)(元|\d{1,2})年(\d{1,2})月(\d{1,2})日$/)
  if (m3) {
    const eraYear = parseEraYear(m3[2])
    if (!eraYear) return null
    const y = ERA_START[m3[1]] + eraYear - 1
    const ymd = { y, m: Number(m3[3]), d: Number(m3[4]) }
    return isValidYMD(ymd) ? ymd : null
  }

  // 4) Abbrev Wareki
  const m4 = s.match(/^([RHS TM])\s*(元|\d{1,2})[\/\-](\d{1,2})[\/\-](\d{1,2})$/i)
  if (m4) {
    const eraKey = m4[1].toUpperCase().trim()
    const eraYear = parseEraYear(m4[2])
    const start = ERA_START[eraKey]
    if (!eraYear || !start) return null
    const y = start + eraYear - 1
    const ymd = { y, m: Number(m4[3]), d: Number(m4[4]) }
    return isValidYMD(ymd) ? ymd : null
  }

  return null
}

function pad2(n: number) { return String(n).padStart(2, "0") }

function formatWeekdayJST(ymd: YMD) {
  const dt = new Date(Date.UTC(ymd.y, ymd.m - 1, ymd.d, 3, 0, 0))
  return new Intl.DateTimeFormat("ja-JP", { weekday: "short", timeZone: "Asia/Tokyo" }).format(dt)
}

function formatJapaneseEra(ymd: YMD) {
  const dt = new Date(Date.UTC(ymd.y, ymd.m - 1, ymd.d, 3, 0, 0))
  return new Intl.DateTimeFormat("ja-JP-u-ca-japanese", {
    era: "long", year: "numeric", month: "numeric", day: "numeric", timeZone: "Asia/Tokyo",
  }).format(dt)
}

export default function DateWithWeekdayClient() {
  const [input, setInput] = useState("")
  const [format, setFormat] = useState<"slash" | "kanji" | "wareki">("kanji")
  const [copyMsg, setCopyMsg] = useState<string | null>(null)

  const parsed = useMemo(() => parseDate(input), [input])

  const output = useMemo(() => {
    if (!parsed) return ""
    const wd = formatWeekdayJST(parsed)
    if (format === "slash") return `${parsed.y}/${pad2(parsed.m)}/${pad2(parsed.d)}（${wd}）`
    if (format === "wareki") return `${formatJapaneseEra(parsed)}（${wd}）`
    return `${parsed.y}年${parsed.m}月${parsed.d}日（${wd}）`
  }, [parsed, format])

  const handleCopy = async () => {
    if (!output) return
    try {
      await navigator.clipboard.writeText(output)
      setCopyMsg("コピーしました")
    } catch {
      setCopyMsg("失敗")
    } finally {
      setTimeout(() => setCopyMsg(null), 1500)
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        {/* Settings Header */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-neutral-50 pb-4">
          <div className="text-sm font-bold text-neutral-800">出力形式の選択</div>
          <div className="flex flex-wrap gap-2">
            {[
              { id: "slash", label: "スラッシュ" },
              { id: "kanji", label: "日本語表記" },
              { id: "wareki", label: "和暦表記" }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFormat(f.id as any)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  format === f.id 
                    ? "bg-neutral-900 text-white" 
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="space-y-2">
          <div className="flex justify-between items-end px-1">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Date Input</label>
            <button onClick={() => setInput("")} className="text-xs text-rose-500 hover:underline">クリア</button>
          </div>
          <input
            className="w-full rounded-lg border border-neutral-300 bg-neutral-50 px-4 py-3 text-lg font-medium text-neutral-900 transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="例: R7/12/16 や 2025-12-16"
            spellCheck={false}
          />
        </div>

        {/* Output Area */}
        <div className="mt-8 space-y-2">
          <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider px-1">Formatted Result</label>
          <div className={`relative flex items-center min-h-[4rem] w-full rounded-lg border-2 border-dashed px-4 py-3 transition-all ${
            parsed ? "border-emerald-200 bg-emerald-50/30" : "border-neutral-200 bg-neutral-50/50"
          }`}>
            <div className={`text-xl font-bold ${parsed ? "text-neutral-900" : "text-neutral-400 italic"}`}>
              {parsed ? output : "入力を待機中..."}
            </div>
            
            {parsed && (
              <button
                onClick={handleCopy}
                className="ml-auto flex items-center gap-1 rounded-md bg-white px-3 py-1.5 text-xs font-bold text-neutral-700 shadow-sm border border-neutral-200 hover:bg-neutral-50"
              >
                {copyMsg || "コピー"}
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 border-t border-neutral-100 pt-4 text-[11px] text-neutral-400">
          <span className="font-bold text-neutral-500">対応形式:</span>
          <span>西暦 (2025/12/16)</span>
          <span>和暦 (令和7年12月16日)</span>
          <span>略称 (R7/12/16)</span>
        </div>
      </div>
    </div>
  )
}