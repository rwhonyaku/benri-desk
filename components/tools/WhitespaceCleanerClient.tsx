"use client"

import { useMemo, useState } from "react"

export default function WhitespaceCleanerClient() {
  const [text, setText] = useState("")
  const [mode, setMode] = useState<"trim" | "all">("trim")
  const [copyMsg, setCopyMsg] = useState<string | null>(null)

  const result = useMemo(() => {
    if (mode === "trim") {
      return text.trim()
    }
    // Removes: Half-width space, Full-width (Zen-kaku) space, Newlines, Tabs
    return text.replace(/[\s\u3000]+/g, "")
  }, [text, mode])

  const handleCopy = async () => {
    if (!result) return
    try {
      await navigator.clipboard.writeText(result)
      setCopyMsg("コピーしました")
    } catch {
      setCopyMsg("コピー失敗")
    } finally {
      setTimeout(() => setCopyMsg(null), 1500)
    }
  }

  return (
    <div className="space-y-6">
      {/* Configuration Header */}
      <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-sm font-bold text-neutral-800 tracking-tight">空白・改行のクリーニング</h2>
            <p className="text-[10px] text-neutral-400 uppercase font-bold tracking-widest">Whitespace Cleaner</p>
          </div>

          <div className="flex gap-1 rounded-lg bg-neutral-100 p-1">
            <button
              onClick={() => setMode("trim")}
              className={`rounded-md px-4 py-1.5 text-xs font-bold transition-all ${
                mode === "trim" ? "bg-white text-blue-600 shadow-sm" : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              前後のみ削除
            </button>
            <button
              onClick={() => setMode("all")}
              className={`rounded-md px-4 py-1.5 text-xs font-bold transition-all ${
                mode === "all" ? "bg-white text-blue-600 shadow-sm" : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              すべて削除
            </button>
          </div>
        </div>
      </div>

      {/* Editor Workspace */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Input Area */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-tighter">Input Source</span>
            <button 
              onClick={() => setText("")}
              className="text-[10px] font-bold text-rose-500 hover:underline uppercase transition-opacity hover:opacity-80"
            >
              Clear
            </button>
          </div>
          <textarea
            className="h-64 w-full rounded-xl border border-neutral-200 bg-white p-4 text-sm leading-relaxed text-neutral-800 outline-none transition-all focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="テキストを入力または貼り付けてください..."
            spellCheck={false}
          />
        </div>

        {/* Output Area */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-tighter">Result</span>
            {copyMsg && <span className="text-[10px] font-bold text-emerald-600 animate-in fade-in slide-in-from-right-2">{copyMsg}</span>}
          </div>
          <div className="relative group h-full">
            <textarea
              className="h-64 w-full rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm leading-relaxed text-neutral-600 outline-none resize-none font-mono"
              value={result}
              readOnly
              spellCheck={false}
              placeholder="変換結果がここに表示されます"
            />
            {result && (
              <button
                onClick={handleCopy}
                className="absolute bottom-4 right-4 rounded-lg bg-neutral-900 px-5 py-2 text-xs font-bold text-white shadow-lg transition-all hover:bg-neutral-800 active:scale-95"
              >
                結果をコピー
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mode Documentation */}
      <div className="rounded-lg bg-blue-50/50 p-4 border border-blue-100/50">
        <p className="text-[11px] leading-relaxed text-blue-800/70">
          <strong>💡 ヒント:</strong> 
          {mode === "trim" 
            ? " 「前後のみ削除」は、文章の最初と最後にある不要な空白や改行を消去します。文中のスペースは維持されます。" 
            : " 「すべて削除」は、全角スペース・半角スペース・タブ・改行を完全に排除します。IDやコードの整形に最適です。"}
        </p>
      </div>
    </div>
  )
}