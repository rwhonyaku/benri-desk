"use client"

import { useEffect, useState } from "react"

export default function UserAgentClient() {
  const [ua, setUa] = useState("")

  useEffect(() => {
    setUa(navigator.userAgent)
  }, [])

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-2xl border-2 border-neutral-100 bg-white p-8 shadow-sm">
        <div className="mb-4 text-center">
          <label className="text-sm font-bold text-neutral-400 uppercase tracking-widest italic">
            あなたのユーザーエージェント
          </label>
        </div>
        
        <div className="rounded-xl bg-neutral-50 p-6 border border-neutral-200">
          <p className="break-all font-mono text-sm leading-relaxed text-neutral-800">
            {ua || "読み込み中..."}
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => navigator.clipboard.writeText(ua)}
            className="rounded-full bg-blue-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all"
          >
            コピーする
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-4 text-[11px] text-neutral-400 leading-relaxed">
        ※ユーザーエージェントは、ブラウザの種類、バージョン、OSなどの情報を含んでいます。
      </div>
    </div>
  )
}