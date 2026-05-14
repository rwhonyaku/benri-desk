"use client"

import { useState, useMemo } from "react"

export default function BmiCalculatorClient() {
  const [height, setHeight] = useState<number | "">(170)
  const [weight, setWeight] = useState<number | "">(60)

  const stats = useMemo(() => {
    if (!height || !weight) return null
    const hMeter = Number(height) / 100
    const bmi = Number(weight) / (hMeter * hMeter)
    
    let status = ""
    let color = ""
    if (bmi < 18.5) { status = "低体重 (痩せ型)"; color = "text-blue-500" }
    else if (bmi < 25) { status = "普通体重"; color = "text-emerald-500" }
    else if (bmi < 30) { status = "肥満 (1度)"; color = "text-orange-500" }
    else { status = "肥満 (2度以上)"; color = "text-rose-500" }

    const idealWeight = (hMeter * hMeter * 22).toFixed(1)
    
    return { bmi: bmi.toFixed(1), status, color, idealWeight }
  }, [height, weight])

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm space-y-4">
        <div>
          <label className="mb-1 block text-sm font-bold text-neutral-700 italic">身長 (cm)</label>
          <input 
            type="number" 
            value={height} 
            onChange={e => setHeight(e.target.value === "" ? "" : Number(e.target.value))} 
            className="w-full rounded border border-neutral-300 p-3 font-black text-xl outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-bold text-neutral-700 italic">体重 (kg)</label>
          <input 
            type="number" 
            value={weight} 
            onChange={e => setWeight(e.target.value === "" ? "" : Number(e.target.value))} 
            className="w-full rounded border border-neutral-300 p-3 font-black text-xl outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {stats && (
        <div className="space-y-4">
          <div className="rounded-2xl border-2 border-neutral-100 bg-white p-8 text-center shadow-sm">
            <div className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-2">あなたのBMI</div>
            <div className="text-6xl font-black text-neutral-900">{stats.bmi}</div>
            <div className={`mt-4 text-lg font-bold ${stats.color}`}>{stats.status}</div>
          </div>
          
          <div className="rounded-xl bg-neutral-50 p-4 text-center">
            <span className="text-sm font-bold text-neutral-500 italic">適正体重の目安: </span>
            <span className="text-lg font-black text-neutral-700">{stats.idealWeight}kg</span>
          </div>
        </div>
      )}
    </div>
  )
}