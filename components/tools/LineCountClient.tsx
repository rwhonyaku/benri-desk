"use client"

import { useMemo, useState } from "react"

export default function LineCountClient() {
  const [text, setText] = useState("")
  const [ignoreEmpty, setIgnoreEmpty] = useState(false)

  const lineCount = useMemo(() => {
    if (text.length === 0) return 0
    const lines = text.replace(/\r\n?/g, "\n").split("\n")
    if (!ignoreEmpty) return lines.length
    return lines.filter((line) => line.trim().length > 0).length
  }, [text, ignoreEmpty])

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-col gap-3 border-b border-neutral-50 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="text-sm font-bold text-neutral-800">テキスト入力</label>

          <div className="flex items-center gap-4">
            <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-neutral-600 transition-colors hover:text-neutral-900">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                checked={ignoreEmpty}
                onChange={(e) => setIgnoreEmpty(e.target.checked)}
              />
              空行を除外してカウント
            </label>
            <button onClick={() => setText("")} className="text-xs font-bold text-rose-500 hover:underline">
              クリア
            </button>
          </div>
        </div>

        <textarea
          className="h-64 w-full rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-sm leading-relaxed text-neutral-800 outline-none transition-all focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="ここにテキストを貼り付けてください..."
          spellCheck={false}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border-2 border-blue-100 bg-blue-50/50 p-6 text-center shadow-sm">
          <div className="text-[10px] font-black uppercase tracking-widest text-blue-400">総行数</div>
          <div className="mt-2 text-4xl font-black text-blue-900">
            {lineCount.toLocaleString()}
            <span className="ml-1 text-sm font-bold text-blue-500">行</span>
          </div>
        </div>

        <div className="flex flex-col justify-center rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="mb-2 flex items-center justify-between border-b border-neutral-50 pb-2 text-xs">
            <span className="font-bold uppercase text-neutral-400">状態</span>
            <span className="font-medium text-neutral-400">自動カウント中</span>
          </div>
          <p className="text-[11px] italic leading-relaxed text-neutral-500">
            {ignoreEmpty
              ? "※現在は「空白のみの行」をカウントから除外しています。"
              : "※改行のみの行も1行としてカウントされます。"}
          </p>
        </div>
      </div>

      <div className="rounded-lg bg-neutral-100 px-4 py-3 text-center text-[10px] tracking-tighter text-neutral-400">
        データ処理はブラウザ内で実行されます。
      </div>
    </div>
  )
}
