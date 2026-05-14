"use client"

import { useMemo, useState } from "react"

function getDisplayLabel(char: string) {
  if (char === " ") return "半角スペース"
  if (char === "　") return "全角スペース"
  if (char === "\n") return "改行"
  if (char === "\t") return "タブ"
  return char
}

export default function CharFrequencyClient() {
  const [text, setText] = useState("")

  const frequency = useMemo(() => {
    if (!text) return []

    const map = new Map<string, number>()
    for (const char of text) {
      map.set(char, (map.get(char) ?? 0) + 1)
    }

    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([char, count]) => ({
        char,
        label: getDisplayLabel(char),
        count,
      }))
  }, [text])

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-2 block text-sm font-bold italic text-neutral-700">解析するテキスト</label>
        <textarea
          className="h-40 w-full rounded-lg border border-neutral-300 p-4 text-neutral-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="文字の出現頻度を分析します..."
        />
      </div>

      {frequency.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {frequency.map((item) => (
            <div
              key={item.char}
              className="flex items-center justify-between rounded-lg border border-neutral-100 bg-white p-3 shadow-sm"
            >
              <span className="text-lg font-bold text-blue-600">{item.label}</span>
              <span className="text-sm font-black text-neutral-900">
                {item.count}
                <span className="ml-0.5 text-[10px] text-neutral-400">回</span>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
