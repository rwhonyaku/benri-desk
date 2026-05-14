"use client"

import { useState, useMemo } from "react"

export default function WorkDurationClient() {
  const [joinDate, setJoinDate] = useState("")

  const duration = useMemo(() => {
    if (!joinDate) return null
    const start = new Date(joinDate)
    const today = new Date()

    let years = today.getFullYear() - start.getFullYear()
    let months = today.getMonth() - start.getMonth()
    
    if (months < 0 || (months === 0 && today.getDate() < start.getDate())) {
      years--
      months += 12
    }
    
    if (today.getDate() < start.getDate()) {
      months--
    }

    return { years, months }
  }, [joinDate])

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-4 block text-sm font-bold text-neutral-700 italic">入社日・開始日を選択</label>
        <input
          type="date"
          value={joinDate}
          onChange={(e) => setJoinDate(e.target.value)}
          className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-xl font-semibold text-neutral-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
        />
      </div>

      {duration && (
        <div className="rounded-2xl border-2 border-emerald-100 bg-emerald-50 p-8 text-center shadow-sm">
          <div className="mb-2 text-sm font-bold tracking-widest text-emerald-500 uppercase">勤続期間</div>
          <div className="text-4xl font-black text-emerald-700">
            {duration.years > 0 && <>{duration.years}<span className="mr-2 text-xl">年</span></>}
            {duration.months}<span className="text-xl">ヶ月</span>
          </div>
          <p className="mt-4 text-xs text-neutral-400">※本日までの経過期間を計算しています</p>
        </div>
      )}
    </div>
  )
}