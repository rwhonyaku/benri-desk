"use client"

import { useMemo, useState } from "react"

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
  const parts = input.split(/(\r?\n)/)
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i]
    if (p === "\n" || p === "\r\n") continue
    parts[i] = mode === "tabToSpace" ? tabToSpacesLine(p, w) : leadingSpacesToTabsLine(p, w)
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

  const handleCopy = async () => {
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
      {/* Control Panel */}
      <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Conversion Mode</span>
            <div className="flex gap-1 rounded-lg bg-neutral-100 p-1">
              <button
                onClick={() => setMode("tabToSpace")}
                className={`rounded-md px-4 py-1.5 text-xs font-bold transition-all ${
                  mode === "tabToSpace" ? "bg-white text-blue-600 shadow-sm" : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                タブ → スペース
              </button>
              <button
                onClick={() => setMode("spaceToTab")}
                className={`rounded-md px-4 py-1.5 text-xs font-bold transition-all ${
                  mode === "spaceToTab" ? "bg-white text-blue-600 shadow-sm" : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                スペース → タブ
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Indent Width</span>
            <div className="flex items-center gap-3">
              {[2, 4, 8].map((w) => (
                <button
                  key={w}
                  onClick={() => setTabWidth(w as 2 | 4 | 8)}
                  className={`flex h-8 w-10 items-center justify-center rounded-md border text-xs font-bold transition-all ${
                    tabWidth === w
                      ? "border-blue-200 bg-blue-50 text-blue-600 ring-2 ring-blue-100"
                      : "border-neutral-200 bg-white text-neutral-500 hover:border-neutral-300"
                  }`}
                >
                  {w}
                </button>
              ))}
              <span className="text-xs text-neutral-400 font-medium">spaces</span>
            </div>
          </div>
        </div>
      </div>

      {/* Workspace */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-neutral-800 uppercase tracking-tight">Source Code</span>
            <button onClick={() => setInput("")} className="text-[10px] font-bold text-rose-500 hover:underline uppercase">Clear</button>
          </div>
          <textarea
            className="h-80 w-full rounded-xl border border-neutral-200 bg-white p-4 font-mono text-sm leading-relaxed text-neutral-800 outline-none transition-all focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="ここにコードを貼り付けてください..."
            spellCheck={false}
          />
        </div>

        {/* Output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-neutral-800 uppercase tracking-tight">Converted Result</span>
            {copyMsg && <span className="text-[10px] font-bold text-emerald-600 animate-fade-in">{copyMsg}</span>}
          </div>
          <div className="relative group h-full">
            <textarea
              className="h-80 w-full rounded-xl border border-neutral-200 bg-neutral-900 p-4 font-mono text-sm leading-relaxed text-neutral-300 outline-none resize-none"
              value={output}
              readOnly
              spellCheck={false}
            />
            {output && (
              <button
                onClick={handleCopy}
                className="absolute bottom-4 right-4 rounded-lg bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-95 border border-white/10"
              >
                結果をコピー
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="rounded-xl border border-blue-50 bg-blue-50/50 p-4">
        <div className="flex gap-3">
          <span className="text-lg">💡</span>
          <div className="space-y-1">
            <p className="text-xs font-bold text-blue-900">変換のルール</p>
            <p className="text-[11px] leading-relaxed text-blue-800/70">
              {mode === "tabToSpace" 
                ? "タブ文字を現在の幅設定に合わせて動的にスペースへ変換します。列の位置関係を崩しません。" 
                : "先頭の連続するスペースのみをタブ文字に変換します。コード内の文字列などに含まれるスペースは維持されるため安全です。"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}