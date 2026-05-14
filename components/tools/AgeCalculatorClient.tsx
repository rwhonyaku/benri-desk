"use client"

import { useState, useMemo } from "react"

export default function AgeCalculatorClient() {
  const [birthday, setBirthday] = useState("")

  const stats = useMemo(() => {
    if (!birthday) return null
    const birthDate = new Date(birthday)
    const today = new Date()
    
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    const diffTime = Math.abs(today.getTime() - birthDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return { age, diffDays }
  }, [birthday])

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-4 block text-sm font-bold text-neutral-700 italic">生年月日を選択</label>
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-xl font-semibold text-neutral-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
        />
      </div>

      {stats && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-sm">
            <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest">現在の年齢</div>
            <div className="mt-2 text-4xl font-black text-neutral-900">
              {stats.age}<span className="ml-1 text-sm text-neutral-500 font-bold">歳</span>
            </div>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-sm">
            <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest">生まれてからの日数</div>
            <div className="mt-2 text-4xl font-black text-neutral-900">
              {stats.diffDays.toLocaleString()}<span className="ml-1 text-sm text-neutral-500 font-bold">日</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}