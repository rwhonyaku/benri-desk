"use client"

import { useMemo, useState } from "react"

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

function tabToSpacesLine(line: string, tabWidth: number) {
  let col = 0
  let out = ""
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === "\t") {
      const add = tabWidth - (col % tabWidth)
      out += " ".repeat(add)
      col += add
    } else {
      out += ch
      col += 1
    }
  }
  return out
}

// Convert ONLY leading indentation spaces to tabs (safer and expected for code)
function leadingSpacesToTabsLine(line: string, tabWidth: number) {
  let i = 0
  while (i < line.length && line[i] === " ") i++
  const indent = line.slice(0, i)
  const rest = line.slice(i)

  const tabs = Math.floor(indent.length / tabWidth)
  const rem = indent.length % tabWidth
  return "\t".repeat(tabs) + " ".repeat(rem) + rest
}

function convert(input: string, mode: "tabToSpace" | "spaceToTab", tabWidth: number) {
  const w = Math.max(1, Math.floor(tabWidth))
  // Preserve original newlines (LF/CRLF) by splitting with capture
  const parts = input.split(/(\r?\n)/)
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i]
    if (p === "\n" || p === "\r\n") continue
    parts[i] =
      mode === "tabToSpace" ? tabToSpacesLine(p, w) : leadingSpacesToTabsLine(p, w)
  }
  return parts.join("")
}

export default function TabSpaceConverterClient() {
  const [input, setInput] = useState("")
  const [mode, setMode] = useState<"tabToSpace" | "spaceToTab">("tabToSpace")
  const [tabWidth, setTabWidth] = useState<2 | 4 | 8>(4)
  const [copyMsg, setCopyMsg] = useState<string | null>(null)

  const output = useMemo(() => {
    if (!input) return ""
    return convert(input, mode, tabWidth)
  }, [input, mode, tabWidth])

  return (
    <section className="rounded-lg border border-neutral-200 bg-white p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="text-sm font-medium text-neutral-900">設定</div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-700">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="mode"
              checked={mode === "tabToSpace"}
              onChange={() => setMode("tabToSpace")}
            />
            タブ → スペース
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="mode"
              checked={mode === "spaceToTab"}
              onChange={() => setMode("spaceToTab")}
            />
            スペース → タブ（先頭インデントのみ）
          </label>

          <div className="flex items-center gap-2">
            <span>幅</span>
            <select
              value={tabWidth}
              onChange={(e) => setTabWidth(Number(e.target.value) as 2 | 4 | 8)}
              className="rounded-md border border-neutral-200 bg-white px-2 py-1 text-sm text-neutral-900 outline-none focus:ring-2 focus:ring-neutral-200"
            >
              <option value={2}>2</option>
              <option value={4}>4</option>
              <option value={8}>8</option>
            </select>
            <span>スペース</span>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <div className="text-sm font-medium text-neutral-900">入力</div>
          <textarea
            className="mt-2 h-56 w-full resize-y rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:ring-2 focus:ring-neutral-200"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="ここにテキストを貼り付け"
            spellCheck={false}
          />
        </div>

        <div>
          <div className="text-sm font-medium text-neutral-900">出力</div>
          <textarea
            className="mt-2 h-56 w-full resize-y rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 outline-none"
            value={output}
            readOnly
            spellCheck={false}
          />
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
          onClick={() => {
            setInput("")
            setCopyMsg(null)
          }}
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
          disabled={!output}
        >
          コピー
        </button>

        {copyMsg && <span className="text-sm text-neutral-600">{copyMsg}</span>}
      </div>

      <p className="mt-4 text-xs text-neutral-500">
        タブは列位置に合わせてスペース展開します。スペース→タブは安全のため先頭インデントのみ変換します。入力内容は保存されません。
      </p>
    </section>
  )
}
