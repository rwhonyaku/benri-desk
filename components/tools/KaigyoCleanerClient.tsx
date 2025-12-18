"use client"

import { useMemo, useState } from "react"

function normalizeNewlines(s: string) {
  // Convert CRLF/CR to LF for consistent processing
  return s.replace(/\r\n?/g, "\n")
}

function applyKaigyoCleaner(
  input: string,
  opts: { removeAllNewlines: boolean; collapseBlankLines: boolean; trimLineEnds: boolean }
) {
  let s = normalizeNewlines(input)

  if (opts.trimLineEnds) {
    s = s
      .split("\n")
      .map((line) => line.replace(/[ \t]+$/g, ""))
      .join("\n")
  }

  if (opts.removeAllNewlines) {
    // Remove all line breaks (common “改行削除” intent)
    // Keep other whitespace as-is.
    s = s.replace(/\n/g, "")
  } else if (opts.collapseBlankLines) {
    // Convert 2+ newlines to a single newline
    s = s.replace(/\n{2,}/g, "\n")
  }

  return s
}

async function copyToClipboard(text: string) {
  // Primary: Clipboard API
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }

  // Fallback
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

export default function KaigyoCleanerClient() {
  const [input, setInput] = useState("")
  const [removeAllNewlines, setRemoveAllNewlines] = useState(true)
  const [collapseBlankLines, setCollapseBlankLines] = useState(false)
  const [trimLineEnds, setTrimLineEnds] = useState(true)
  const [copyMsg, setCopyMsg] = useState<string | null>(null)

  const output = useMemo(
    () =>
      applyKaigyoCleaner(input, {
        removeAllNewlines,
        collapseBlankLines,
        trimLineEnds,
      }),
    [input, removeAllNewlines, collapseBlankLines, trimLineEnds]
  )

  const inputStats = useMemo(() => {
    const s = normalizeNewlines(input)
    const lines = s.length === 0 ? 0 : s.split("\n").length
    return { chars: input.length, lines }
  }, [input])

  const outputStats = useMemo(() => {
    const s = normalizeNewlines(output)
    const lines = s.length === 0 ? 0 : s.split("\n").length
    return { chars: output.length, lines }
  }, [output])

  return (
    <section className="rounded-lg border border-neutral-200 bg-white p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="text-sm font-medium text-neutral-900">オプション</div>
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
          <label className="flex items-center gap-2 text-sm text-neutral-700">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={removeAllNewlines}
              onChange={(e) => {
                const v = e.target.checked
                setRemoveAllNewlines(v)
                // Mutually exclusive with collapseBlankLines
                if (v) setCollapseBlankLines(false)
              }}
            />
            改行をすべて削除する
          </label>

          <label className="flex items-center gap-2 text-sm text-neutral-700">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={collapseBlankLines}
              onChange={(e) => {
                const v = e.target.checked
                setCollapseBlankLines(v)
                // Mutually exclusive with removeAllNewlines
                if (v) setRemoveAllNewlines(false)
              }}
            />
            空行（連続改行）を1行にまとめる
          </label>

          <label className="flex items-center gap-2 text-sm text-neutral-700">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={trimLineEnds}
              onChange={(e) => setTrimLineEnds(e.target.checked)}
            />
            行末の空白を削除
          </label>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <div className="flex items-baseline justify-between">
            <div className="text-sm font-medium text-neutral-900">入力</div>
            <div className="text-xs text-neutral-500">
              {inputStats.chars.toLocaleString()} 文字 / {inputStats.lines.toLocaleString()} 行
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
          </div>
        </div>

        <div>
          <div className="flex items-baseline justify-between">
            <div className="text-sm font-medium text-neutral-900">出力</div>
            <div className="text-xs text-neutral-500">
              {outputStats.chars.toLocaleString()} 文字 / {outputStats.lines.toLocaleString()} 行
            </div>
          </div>

          <textarea
            className="mt-2 h-56 w-full rounded-md border border-neutral-200 bg-neutral-50 p-3 text-sm leading-6 text-neutral-900 outline-none"
            value={output}
            readOnly
            spellCheck={false}
          />

          <div className="mt-2 flex flex-wrap items-center gap-2">
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
              disabled={output.length === 0}
            >
              コピー
            </button>

            {copyMsg && <span className="text-sm text-neutral-600">{copyMsg}</span>}
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs text-neutral-500">
        入力内容は保存されません。処理はこのブラウザ内で完結します。
      </p>
    </section>
  )
}
