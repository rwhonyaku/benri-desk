"use client"

import { useState, useMemo } from "react"

export default function CalorieCalculatorClient() {
  const [age, setAge] = useState<number | "">(30)
  const [gender, setGender] = useState<'m' | 'f'>('m')
  const [height, setHeight] = useState<number | "">(170)
  const [weight, setWeight] = useState<number | "">(65)

  const bmr = useMemo(() => {
    if (!age || !height || !weight) return null
    // Mifflin-St Jeor Equation
    let val = (10 * Number(weight)) + (6.25 * Number(height)) - (5 * Number(age))
    val = gender === 'm' ? val + 5 : val - 161
    return Math.floor(val)
  }, [age, gender, height, weight])

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex gap-2 mb-2">
          <button 
            onClick={() => setGender('m')}
            className={`flex-1 py-2 rounded font-bold text-xs transition-all ${gender === 'm' ? 'bg-blue-600 text-white' : 'bg-neutral-100 text-neutral-400'}`}
          >
            男性
          </button>
          <button 
            onClick={() => setGender('f')}
            className={`flex-1 py-2 rounded font-bold text-xs transition-all ${gender === 'f' ? 'bg-rose-500 text-white' : 'bg-neutral-100 text-neutral-400'}`}
          >
            女性
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-[10px] font-bold text-neutral-400">年齢</label>
            <input type="number" value={age} onChange={e => setAge(Number(e.target.value))} className="w-full border-b py-1 font-bold outline-none focus:border-blue-500"/>
          </div>
          <div>
            <label className="text-[10px] font-bold text-neutral-400">身長(cm)</label>
            <input type="number" value={height} onChange={e => setHeight(Number(e.target.value))} className="w-full border-b py-1 font-bold outline-none focus:border-blue-500"/>
          </div>
          <div>
            <label className="text-[10px] font-bold text-neutral-400">体重(kg)</label>
            <input type="number" value={weight} onChange={e => setWeight(Number(e.target.value))} className="w-full border-b py-1 font-bold outline-none focus:border-blue-500"/>
          </div>
        </div>
      </div>

      {bmr && (
        <div className="rounded-2xl border-2 border-emerald-100 bg-emerald-50 p-8 text-center shadow-sm">
          <div className="text-sm font-bold text-emerald-500 uppercase tracking-widest mb-2">推定基礎代謝量 (BMR)</div>
          <div className="text-5xl font-black text-emerald-700">
            {bmr.toLocaleString()}<span className="ml-2 text-2xl">kcal</span>
          </div>
          <p className="mt-4 text-[10px] text-neutral-400 italic">※安静時に消費される1日あたりのエネルギー量です</p>
        </div>
      )}
    </div>
  )
}