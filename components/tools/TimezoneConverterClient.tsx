"use client"

import { useState, useMemo } from "react"

export default function TimezoneConverterClient() {
  const [jstDate, setJstDate] = useState("")
  const [jstTime, setJstTime] = useState("12:00")

  const conversion = useMemo(() => {
    if (!jstDate || !jstTime) return null
    const dt = new Date(`${jstDate}T${jstTime}:00+09:00`)
    
    return {
      utc: dt.toISOString().replace('T', ' ').substring(0, 16),
      jst: `${jstDate} ${jstTime}`
    }
  }, [jstDate, jstTime])

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-4 block text-sm font-bold text-neutral-700 italic">日本時間 (JST) を入力</label>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="date"
            value={jstDate}
            onChange={(e) => setJstDate(e.target.value)}
            className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-bold outline-none focus:border-blue-500"
          />
          <input
            type="time"
            value={jstTime}
            onChange={(e) => setJstTime(e.target.value)}
            className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-bold outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {conversion && (
        <div className="space-y-4">
          <div className="rounded-xl border border-neutral-100 bg-white p-6 shadow-sm">
            <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">世界標準時 (UTC)</div>
            <div className="mt-1 text-2xl font-black text-blue-600">{conversion.utc}</div>
          </div>
          <div className="rounded-xl border border-neutral-100 bg-white p-6 shadow-sm">
            <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">日本標準時 (JST)</div>
            <div className="mt-1 text-2xl font-black text-neutral-900">{conversion.jst}</div>
          </div>
        </div>
      )}
    </div>
  )
}