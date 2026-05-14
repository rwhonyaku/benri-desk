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

function isHalfWidthChar(char: string) {
  const code = char.codePointAt(0) ?? 0
  return code <= 0x7f || (code >= 0xff61 && code <= 0xff9f)
}

function widthEquivalents(s: string) {
  let halfWidth = 0
  let fullWidth = 0

  for (const char of s) {
    if (isHalfWidthChar(char)) {
      halfWidth++
    } else {
      fullWidth++
    }
  }

  const zenkakuEq = fullWidth + halfWidth / 2
  const hankakuEq = halfWidth + fullWidth * 2
  return { halfWidth, fullWidth, zenkakuEq, hankakuEq }
}

function utf8ByteLength(s: string) {
  return new TextEncoder().encode(s).length
}

export default function MojisuuCountClient() {
  const [input, setInput] = useState("")
  const [includeNewlines, setIncludeNewlines] = useState(true)
  const [copyMsg, setCopyMsg] = useState<string | null>(null)

  const counts = useMemo(() => {
    const textForCharCount = includeNewlines ? input : normalizeNewlines(input).replace(/\n/g, "")
    const totalChars = Array.from(textForCharCount).length
    const bytes = utf8ByteLength(textForCharCount)
    const lines = countLines(input)
    const eq = widthEquivalents(textForCharCount)

    return {
      totalChars,
      bytes,
      lines,
      halfWidth: eq.halfWidth,
      fullWidth: eq.fullWidth,
      zenkakuEq: eq.zenkakuEq,
      hankakuEq: eq.hankakuEq,
    }
  }, [input, includeNewlines])

  const copyResults = async () => {
    const z = Number.isInteger(counts.zenkakuEq) ? counts.zenkakuEq : counts.zenkakuEq.toFixed(1)
    const summary = [
      `【文字数カウント結果】`,
      `文字数: ${counts.totalChars.toLocaleString()}`,
      `全角換算: ${z}`,
      `バイト数 (UTF-8): ${counts.bytes.toLocaleString()}`,
      `行数: ${counts.lines.toLocaleString()}`,
    ].join("\n")

    try {
      await navigator.clipboard.writeText(summary)
      setCopyMsg("コピーしました！")
    } catch {
      setCopyMsg("コピー失敗")
    } finally {
      setTimeout(() => setCopyMsg(null), 2000)
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <label className="text-sm font-bold text-neutral-700">テキスト入力</label>
          <div className="flex gap-4">
            <label className="flex cursor-pointer items-center gap-2 text-xs text-neutral-600 hover:text-neutral-900">
              <input
                type="checkbox"
                className="h-3.5 w-3.5 rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                checked={includeNewlines}
                onChange={(e) => setIncludeNewlines(e.target.checked)}
              />
              改行を含める
            </label>
            <button onClick={() => setInput("")} className="text-xs font-medium text-rose-600 hover:underline">
              クリア
            </button>
          </div>
        </div>

        <textarea
          className="h-64 w-full rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-sm leading-relaxed text-neutral-900 outline-none transition-all focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ここに文章を貼り付けてください..."
          spellCheck={false}
        />

        <button
          onClick={copyResults}
          disabled={!input}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-900 py-3 text-sm font-bold text-white transition-all hover:bg-neutral-800 disabled:opacity-30"
        >
          {copyMsg || "結果をクリップボードにコピー"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
          <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">総文字数</div>
          <div className="mt-1 text-2xl font-black text-neutral-900">{counts.totalChars.toLocaleString()}</div>
          <div className="text-[10px] text-neutral-500">文字数</div>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
          <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">全角換算</div>
          <div className="mt-1 text-2xl font-black text-blue-600">
            {Number.isInteger(counts.zenkakuEq) ? counts.zenkakuEq : counts.zenkakuEq.toFixed(1)}
          </div>
          <div className="text-[10px] text-neutral-500">全角相当</div>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
          <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">バイト数</div>
          <div className="mt-1 text-2xl font-black text-neutral-900">{counts.bytes.toLocaleString()}</div>
          <div className="text-[10px] text-neutral-500">UTF-8バイト</div>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
          <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">行数</div>
          <div className="mt-1 text-2xl font-black text-neutral-900">{counts.lines.toLocaleString()}</div>
          <div className="text-[10px] text-neutral-500">改行区切り</div>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-lg bg-neutral-100 px-4 py-3 text-[11px] text-neutral-500">
        <span>
          詳細内訳: 全角文字 {counts.fullWidth.toLocaleString()} / 半角文字 {counts.halfWidth.toLocaleString()}
        </span>
        <span className="hidden italic md:inline">文字数・バイト数をブラウザ内で集計</span>
      </div>
    </div>
  )
}
