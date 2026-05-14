"use client"

import { useMemo, useState } from "react"

function normalizeNewlines(s: string) {
  return s.replace(/\r\n?/g, "\n")
}

function applyKaigyoCleaner(
  input: string,
  opts: { removeAllNewlines: boolean; collapseBlankLines: boolean; trimLineEnds: boolean }
) {
  let s = normalizeNewlines(input)

  if (opts.trimLineEnds) {
    s = s.split("\n").map((line) => line.replace(/[ \t]+$/g, "")).join("\n")
  }

  if (opts.removeAllNewlines) {
    s = s.replace(/\n/g, "")
  } else if (opts.collapseBlankLines) {
    s = s.replace(/\n{2,}/g, "\n")
  }

  return s
}

export default function KaigyoCleanerClient() {
  const [input, setInput] = useState("")
  const [removeAllNewlines, setRemoveAllNewlines] = useState(true)
  const [collapseBlankLines, setCollapseBlankLines] = useState(false)
  const [trimLineEnds, setTrimLineEnds] = useState(true)
  const [copyMsg, setCopyMsg] = useState<string | null>(null)

  const output = useMemo(
    () => applyKaigyoCleaner(input, { removeAllNewlines, collapseBlankLines, trimLineEnds }),
    [input, removeAllNewlines, collapseBlankLines, trimLineEnds]
  )

  const stats = useMemo(() => {
    const getStats = (text: string) => {
      const s = normalizeNewlines(text)
      return {
        chars: text.length,
        lines: text.length === 0 ? 0 : s.split("\n").length
      }
    }
    return { in: getStats(input), out: getStats(output) }
  }, [input, output])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output)
      setCopyMsg("コピーしました！")
    } catch {
      setCopyMsg("失敗")
    } finally {
      setTimeout(() => setCopyMsg(null), 2000)
    }
  }

  return (
    <div className="space-y-6">
      {/* Options Panel */}
      <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
        <div className="mb-4 text-xs font-bold uppercase tracking-wider text-neutral-400 px-1">Cleaning Options</div>
        <div className="flex flex-wrap gap-4">
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-100 bg-neutral-50 px-4 py-2 transition-colors hover:bg-neutral-100">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
              checked={removeAllNewlines}
              onChange={(e) => {
                setRemoveAllNewlines(e.target.checked)
                if (e.target.checked) setCollapseBlankLines(false)
              }}
            />
            <span className="text-sm font-medium text-neutral-700">改行をすべて削除</span>
          </label>

          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-100 bg-neutral-50 px-4 py-2 transition-colors hover:bg-neutral-100">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
              checked={collapseBlankLines}
              onChange={(e) => {
                setCollapseBlankLines(e.target.checked)
                if (e.target.checked) setRemoveAllNewlines(false)
              }}
            />
            <span className="text-sm font-medium text-neutral-700">空行を1行に集約</span>
          </label>

          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-100 bg-neutral-50 px-4 py-2 transition-colors hover:bg-neutral-100">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
              checked={trimLineEnds}
              onChange={(e) => setTrimLineEnds(e.target.checked)}
            />
            <span className="text-sm font-medium text-neutral-700">行末の空白を削除</span>
          </label>
        </div>
      </div>

      {/* Workspace */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-sm font-bold text-neutral-800">入力</span>
            <div className="flex gap-2">
              <span className="rounded bg-neutral-100 px-2 py-0.5 text-[10px] font-bold text-neutral-500">
                {stats.in.chars}文字 / {stats.in.lines}行
              </span>
              <button onClick={() => setInput("")} className="text-[10px] font-bold text-rose-500 hover:underline">Clear</button>
            </div>
          </div>
          <textarea
            className="h-80 w-full rounded-xl border border-neutral-200 bg-white p-4 text-sm leading-relaxed text-neutral-800 outline-none transition-all focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="テキストをここに入力または貼り付け..."
            spellCheck={false}
          />
        </div>

        {/* Output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-sm font-bold text-neutral-800">出力結果</span>
            <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-600">
              {stats.out.chars}文字 / {stats.out.lines}行
            </span>
          </div>
          <div className="relative group">
            <textarea
              className="h-80 w-full rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm leading-relaxed text-neutral-600 outline-none resize-none"
              value={output}
              readOnly
              spellCheck={false}
            />
            {output && (
              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                {copyMsg && <span className="text-xs font-bold text-emerald-600 animate-fade-in">{copyMsg}</span>}
                <button
                  onClick={handleCopy}
                  className="rounded-lg bg-neutral-900 px-4 py-2 text-xs font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
                >
                  結果をコピー
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-blue-50/50 p-4 text-[11px] leading-relaxed text-blue-800/70 border border-blue-100">
        <strong>💡 ヒント:</strong> PDFからコピーした文章の改行を整える場合は「改行をすべて削除」を、ブログの下書きを整理する場合は「空行を1行に集約」をご利用ください。
      </div>
    </div>
  )
}