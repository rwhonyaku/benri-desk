"use client"

import { useState, useMemo } from "react"

export default function TaxCalcClient() {
  const [amount, setAmount] = useState<number | "">(1000)
  const [mode, setMode] = useState<'ex' | 'in'>('ex') // exclusive or inclusive

  const result = useMemo(() => {
    if (amount === "" || amount <= 0) return null
    
    if (mode === 'ex') {
      return {
        tax10: Math.floor(amount * 0.1),
        total10: Math.floor(amount * 1.1),
        tax8: Math.floor(amount * 0.08),
        total8: Math.floor(amount * 1.08),
      }
    } else {
      return {
        tax10: Math.floor(amount - amount / 1.1),
        base10: Math.ceil(amount / 1.1),
        tax8: Math.floor(amount - amount / 1.08),
        base8: Math.ceil(amount / 1.08),
      }
    }
  }, [amount, mode])

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex gap-2">
          <button 
            onClick={() => setMode('ex')}
            className={`flex-1 rounded-md py-2 text-xs font-bold transition-all ${mode === 'ex' ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'}`}
          >
            税抜から計算
          </button>
          <button 
            onClick={() => setMode('in')}
            className={`flex-1 rounded-md py-2 text-xs font-bold transition-all ${mode === 'in' ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'}`}
          >
            税込から計算
          </button>
        </div>

        <label className="mb-2 block text-sm font-bold text-neutral-700 italic">金額を入力</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
            className="flex-1 rounded-lg border border-neutral-300 px-4 py-3 text-2xl font-black text-neutral-900 outline-none focus:border-blue-500"
          />
          <span className="text-xl font-bold text-neutral-400">円</span>
        </div>
      </div>

      {result && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-2">標準税率 10%</div>
            <div className="space-y-1">
              <div className="text-2xl font-black text-neutral-900">
                {mode === 'ex' ? result.total10?.toLocaleString() : result.base10?.toLocaleString()}
                <span className="ml-1 text-sm text-neutral-400">円</span>
              </div>
              <div className="text-xs font-bold text-neutral-400 italic">税額: {result.tax10.toLocaleString()}円</div>
            </div>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-2">軽減税率 8%</div>
            <div className="space-y-1">
              <div className="text-2xl font-black text-neutral-900">
                {mode === 'ex' ? result.total8?.toLocaleString() : result.base8?.toLocaleString()}
                <span className="ml-1 text-sm text-neutral-400">円</span>
              </div>
              <div className="text-xs font-bold text-neutral-400 italic">税額: {result.tax8.toLocaleString()}円</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}