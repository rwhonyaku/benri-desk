"use client"

import { useState, useMemo } from "react"

export default function TextDiffClient() {
  const [textA, setTextA] = useState("")
  const [textB, setTextB] = useState("")

  const diffResult = useMemo(() => {
    if (!textA && !textB) return null
    const linesA = textA.split("\n")
    const linesB = textB.split("\n")
    const maxLines = Math.max(linesA.length, linesB.length)
    
    const diffs = []
    for (let i = 0; i < maxLines; i++) {
      const lineA = linesA[i] || ""
      const lineB = linesB[i] || ""
      diffs.push({
        lineA,
        lineB,
        isDifferent: lineA !== lineB
      })
    }
    return diffs
  }, [textA, textB])

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
          <label className="mb-2 block text-xs font-bold text-neutral-400 uppercase italic">Text A (Original)</label>
          <textarea
            className="h-48 w-full rounded-lg border border-neutral-200 p-3 text-sm outline-none focus:border-blue-500"
            value={textA}
            onChange={(e) => setTextA(e.target.value)}
          />
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
          <label className="mb-2 block text-xs font-bold text-neutral-400 uppercase italic">Text B (Modified)</label>
          <textarea
            className="h-48 w-full rounded-lg border border-neutral-200 p-3 text-sm outline-none focus:border-blue-500"
            value={textB}
            onChange={(e) => setTextB(e.target.value)}
          />
        </div>
      </div>

      {diffResult && (
        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm overflow-hidden">
          <label className="mb-4 block text-sm font-bold text-neutral-700 italic">Comparison Result</label>
          <div className="space-y-1 font-mono text-xs">
            {diffResult.map((diff, idx) => (
              <div key={idx} className={`flex gap-2 p-1 rounded ${diff.isDifferent ? 'bg-amber-50' : ''}`}>
                <div className="w-6 flex-shrink-0 text-neutral-300 text-right selection:bg-transparent">{idx + 1}</div>
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div className={diff.isDifferent && diff.lineA ? "text-rose-600 bg-rose-50 px-1" : "text-neutral-600 px-1"}>
                    {diff.lineA || <span className="text-neutral-200 italic">empty</span>}
                  </div>
                  <div className={diff.isDifferent && diff.lineB ? "text-emerald-600 bg-emerald-50 px-1" : "text-neutral-600 px-1"}>
                    {diff.lineB || <span className="text-neutral-200 italic">empty</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}