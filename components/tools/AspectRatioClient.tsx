"use client"

import { useState, useMemo } from "react"

export default function AspectRatioClient() {
  const [w, setW] = useState<number>(1920)
  const [h, setH] = useState<number>(1080)

  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))

  const ratio = useMemo(() => {
    if (!w || !h) return "0:0"
    const common = gcd(w, h)
    return `${w / common}:${h / common}`
  }, [w, h])

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-4 block text-sm font-bold text-neutral-700 italic">サイズを入力 (px)</label>
        <div className="flex items-center gap-4">
          <input
            type="number"
            value={w}
            onChange={(e) => setW(Number(e.target.value))}
            className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-xl font-black outline-none focus:border-blue-500"
            placeholder="横幅"
          />
          <span className="font-bold text-neutral-300">×</span>
          <input
            type="number"
            value={h}
            onChange={(e) => setH(Number(e.target.value))}
            className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-xl font-black outline-none focus:border-blue-500"
            placeholder="高さ"
          />
        </div>
      </div>

      <div className="rounded-2xl border-2 border-neutral-100 bg-white p-8 text-center shadow-sm">
        <div className="text-sm font-bold text-neutral-400 uppercase tracking-widest">アスペクト比</div>
        <div className="mt-2 text-5xl font-black text-neutral-900">{ratio}</div>
      </div>
    </div>
  )
}