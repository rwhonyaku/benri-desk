"use client"

import { useState } from "react"

export default function UuidGeneratorClient() {
  const [uuid, setUuid] = useState(() => crypto.randomUUID())

  const generate = () => setUuid(crypto.randomUUID())

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-2xl border-2 border-neutral-100 bg-white p-8 text-center shadow-sm">
        <label className="mb-6 block text-sm font-bold text-neutral-400 uppercase tracking-widest italic">UUID (v4)</label>
        
        <div className="mb-8 select-all font-mono text-2xl font-black text-neutral-900 break-all bg-neutral-50 p-4 rounded-lg border border-dashed border-neutral-300">
          {uuid}
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigator.clipboard.writeText(uuid)}
            className="w-full rounded-xl bg-blue-600 py-4 text-sm font-bold text-white hover:bg-blue-700 active:scale-95 transition-all"
          >
            コピーする
          </button>
          <button
            onClick={generate}
            className="w-full rounded-xl border border-neutral-200 py-4 text-sm font-bold text-neutral-600 hover:bg-neutral-50 active:scale-95 transition-all"
          >
            新しく生成する
          </button>
        </div>
      </div>
    </div>
  )
}