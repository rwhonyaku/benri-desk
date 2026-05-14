"use client"

import { useMemo, useState } from "react"
import { isJpHoliday } from "@/lib/jpHolidays"

export default function WorkingDaysCountClient() {
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0])
  const [endDate, setEndDate] = useState(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  )

  const stats = useMemo(() => {
    if (!startDate || !endDate) return null

    let start = new Date(startDate)
    let end = new Date(endDate)

    const isReversed = start > end
    if (isReversed) {
      const temp = start
      start = end
      end = temp
    }

    let totalDays = 0
    let workingDays = 0
    let nonWorkingDays = 0

    const current = new Date(start)
    while (current <= end) {
      totalDays++

      const year = current.getFullYear()
      const month = current.getMonth() + 1
      const day = current.getDate()
      const dayOfWeek = current.getDay()
      const weekend = dayOfWeek === 0 || dayOfWeek === 6
      const holiday = isJpHoliday({ y: year, m: month, d: day })

      if (weekend || holiday) {
        nonWorkingDays++
      } else {
        workingDays++
      }

      current.setDate(current.getDate() + 1)
    }

    return { totalDays, workingDays, nonWorkingDays, isReversed }
  }, [startDate, endDate])

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="space-y-4 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-xs font-bold uppercase text-neutral-400">開始日</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded border border-neutral-300 p-2 font-bold outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold uppercase text-neutral-400">終了日</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full rounded border border-neutral-300 p-2 font-bold outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {stats && (
        <div className="grid grid-cols-1 gap-4">
          <div className="rounded-2xl border-2 border-blue-100 bg-blue-50 p-8 text-center shadow-sm">
            <div className="mb-1 text-sm font-bold uppercase tracking-widest text-blue-500">
              営業日数 (平日)
            </div>
            <div className="text-6xl font-black text-blue-700">
              {stats.workingDays}
              <span className="ml-1 text-xl">日</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-neutral-50 p-4 text-center">
              <div className="text-[10px] font-bold uppercase text-neutral-400">総日数</div>
              <div className="text-xl font-bold text-neutral-700">{stats.totalDays}日</div>
            </div>
            <div className="rounded-xl bg-neutral-50 p-4 text-center">
              <div className="text-[10px] font-bold uppercase text-neutral-400">土日祝</div>
              <div className="text-xl font-bold text-rose-400">{stats.nonWorkingDays}日</div>
            </div>
          </div>

          {stats.isReversed && (
            <p className="text-center text-[10px] font-bold italic text-rose-500">
              ※開始日と終了日が逆転しています。期間として計算しました。
            </p>
          )}
        </div>
      )}
    </div>
  )
}
