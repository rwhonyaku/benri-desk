"use client"

import { useState, useMemo } from "react"

export default function HolidayListClient() {
  const [year, setYear] = useState(new Date().getFullYear())

  // Note: For a production app, consider using the 'holiday-jp' package or 
  // Google Calendar API. This is a logic-based representation of major Japanese holidays.
  const holidays = useMemo(() => {
    return [
      { date: `${year}-01-01`, name: "元日" },
      { date: `${year}-01-12`, name: "成人の日" },
      { date: `${year}-02-11`, name: "建国記念の日" },
      { date: `${year}-02-23`, name: "天皇誕生日" },
      { date: `${year}-03-20`, name: "春分の日" },
      { date: `${year}-04-29`, name: "昭和の日" },
      { date: `${year}-05-03`, name: "憲法記念日" },
      { date: `${year}-05-04`, name: "みどりの日" },
      { date: `${year}-05-05`, name: "こどもの日" },
      { date: `${year}-07-20`, name: "海の日" },
      { date: `${year}-08-11`, name: "山の日" },
      { date: `${year}-09-21`, name: "敬老の日" },
      { date: `${year}-09-22`, name: "秋分の日" },
      { date: `${year}-10-12`, name: "スポーツの日" },
      { date: `${year}-11-03`, name: "文化の日" },
      { date: `${year}-11-23`, name: "勤労感謝の日" },
    ].sort((a, b) => a.date.localeCompare(b.date))
  }, [year])

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm flex items-center justify-between">
        <button 
          onClick={() => setYear(year - 1)}
          className="p-2 hover:bg-neutral-100 rounded-full text-neutral-400"
        >
          ←
        </button>
        <div className="text-2xl font-black text-neutral-900">{year}年 <span className="text-sm font-normal text-neutral-400">祝日一覧</span></div>
        <button 
          onClick={() => setYear(year + 1)}
          className="p-2 hover:bg-neutral-100 rounded-full text-neutral-400"
        >
          →
        </button>
      </div>

      <div className="rounded-2xl border border-neutral-100 bg-white overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-50">
              <th className="px-6 py-3 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">日付</th>
              <th className="px-6 py-3 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">祝日名</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-50">
            {holidays.map((h, idx) => (
              <tr key={idx} className="hover:bg-neutral-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-mono font-bold text-neutral-600">
                  {h.date.replace(/-/g, '/')}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-block rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-600">
                    {h.name}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <p className="text-center text-[10px] text-neutral-400 italic">
        ※振替休日やハッピーマンデー制度により、実際の日程は前後する場合があります。
      </p>
    </div>
  )
}