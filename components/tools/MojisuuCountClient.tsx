"use client"

import { useMemo, useState } from "react"

function normalizeNewlines(s: string) {
  return s.replace(/\r\n?/g, "\n")
}

function countLines(s: string) {
  const n = normalizeNewlines(s)
  if (n.length === 0) return 0
  return n.split("\n").length
}

// Rough “zenkaku count” heuristic often used in JP utilities:
// - ASCII (code <= 0x7f) counts as 0.5
// - everything else counts as 1
// Display as: 全角換算 = (nonAscii + ascii/2)
// Also show: 半角換算 = ascii + nonAscii*2
function zenkakuHankakuEquivalents(s: string) {
  let ascii = 0
  let nonAscii = 0

  // for..of iterates by Unicode codepoints (handles surrogate pairs)
  for (const ch of s) {
    const code = ch.codePointAt(0) ?? 0
    if (code <= 0x7f) ascii++
    else nonAscii++
  }

  const zenkakuEq = nonAscii + ascii / 2
  const hankakuEq = ascii + nonAscii * 2

  return { ascii, nonAscii, zenkakuEq, hankakuEq }
}

function utf8ByteLength(s: string) {
  return new TextEncoder().encode(s).length
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

export default function MojisuuCountClient() {
  const [input, setInput] = useState("")
  const [includeNewlines, setIncludeNewlines] = useState(true)
  const [copyMsg, setCopyMsg] = useState<string | null>(null)

  const counts = useMemo(() => {
    const textForCharCount = includeNewlines ? input : normalizeNewlines(input).replace(/\n/g, "")
    const totalChars = Array.from(textForCharCount).length
    const bytes = utf8ByteLength(textForCharCount)
    const lines = countLines(input) // lines should always be based on original input

    const eq = zenkakuHankakuEquivalents(textForCharCount)

    return {
      totalChars,
      bytes,
      lines,
      ascii: eq.ascii,
      nonAscii: eq.nonAscii,
      zenkakuEq: eq.zenkakuEq,
      hankakuEq: eq.hankakuEq,
    }
  }, [input, includeNewlines])

  const summaryText = useMemo(() => {
    // For copying as a quick report
    const z = Number.isInteger(counts.zenkakuEq) ? counts.zenkakuEq : counts.zenkakuEq.toFixed(1)
    return [
      `文字数: ${counts.totalChars}`,
      `全角換算: ${z}`,
      `UTF-8バイト: ${counts.bytes}`,
      `行数: ${counts.lines}`,
    ].join("\n")
  }, [counts])

  return (
    <section className="rounded-lg border border-neutral-200 bg-white p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="text-sm font-medium text-neutral-900">カウント設定</div>

        <label className="flex items-center gap-2 text-sm text-neutral-700">
          <input
            type="checkbox"
            className="h-4 w-4"
            checked={includeNewlines}
            onChange={(e) => setIncludeNewlines(e.target.checked)}
          />
          改行を文字数に含める
        </label>
      </div>

      <div className="mt-4">
        <div className="flex items-baseline justify-between">
          <div className="text-sm font-medium text-neutral-900">入力</div>
          <div className="text-xs text-neutral-500">
            行数 {counts.lines.toLocaleString()}
          </div>
        </div>

        <textarea
          className="mt-2 h-56 w-full rounded-md border border-neutral-200 bg-white p-3 text-sm leading-6 text-neutral-900 outline-none focus:ring-2 focus:ring-neutral-200"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ここにテキストを貼り付けてください。"
          spellCheck={false}
        />

        <div className="mt-2 flex gap-2">
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
                await copyToClipboard(summaryText)
                setCopyMsg("結果をコピーしました")
              } catch {
                setCopyMsg("コピーに失敗しました")
              } finally {
                window.setTimeout(() => setCopyMsg(null), 1500)
              }
            }}
            disabled={input.length === 0}
          >
            結果をコピー
          </button>

          {copyMsg && <span className="text-sm text-neutral-600">{copyMsg}</span>}
        </div>
      </div>

      <div className="mt-6 grid gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-4 md:grid-cols-2">
        <div>
          <div className="text-xs text-neutral-500">文字数</div>
          <div className="mt-1 text-2xl font-semibold text-neutral-900">
            {counts.totalChars.toLocaleString()}
          </div>
        </div>

        <div>
          <div className="text-xs text-neutral-500">UTF-8 バイト数</div>
          <div className="mt-1 text-2xl font-semibold text-neutral-900">
            {counts.bytes.toLocaleString()}
          </div>
        </div>

        <div>
          <div className="text-xs text-neutral-500">全角換算（目安）</div>
          <div className="mt-1 text-2xl font-semibold text-neutral-900">
            {Number.isInteger(counts.zenkakuEq) ? counts.zenkakuEq : counts.zenkakuEq.toFixed(1)}
          </div>
          <div className="mt-1 text-xs text-neutral-500">
            内訳: 非ASCII {counts.nonAscii.toLocaleString()} / ASCII {counts.ascii.toLocaleString()}
          </div>
        </div>

        <div>
          <div className="text-xs text-neutral-500">半角換算（目安）</div>
          <div className="mt-1 text-2xl font-semibold text-neutral-900">
            {counts.hankakuEq.toLocaleString()}
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="text-xs text-neutral-500">行数</div>
          <div className="mt-1 text-2xl font-semibold text-neutral-900">
            {counts.lines.toLocaleString()}
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs text-neutral-500">
        注: 「全角/半角換算」は一般的な目安です（ASCII=0.5、非ASCII=1として換算）。入力内容は保存されません。
      </p>
    </section>
  )
}
