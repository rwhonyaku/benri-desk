"use client"

import { useState, useMemo } from "react"

export default function ZipcodeFormatCheckClient() {
  const [zip, setZip] = useState("")

  const validation = useMemo(() => {
    if (!zip) return null

    // Remove hyphen if present
    const cleaned = zip.replace(/-/g, "")
    
    // Check if it's exactly 7 digits
    const isSevenDigits = /^\d{7}$/.test(cleaned)
    
    // Japanese zip codes don't start with 00 (Reserved/Unused in many cases)
    // and have specific ranges, but a 7-digit check is the standard format check.
    if (isSevenDigits) {
      const formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`
      return { 
        isValid: true, 
        message: "正しい形式です", 
        formatted 
      }
    } else {
      return { 
        isValid: false, 
        message: "7桁の数字を入力してください（ハイフンは自動処理されます）", 
        formatted: null 
      }
    }
  }, [zip])

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-2 block text-sm font-bold text-neutral-700 italic">郵便番号を入力</label>
        <input
          type="text"
          maxLength={8}
          className="w-full rounded-lg border border-neutral-300 p-4 font-mono text-2xl tracking-[0.2em] outline-none focus:border-blue-500"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          placeholder="123-4567"
        />
      </div>

      {validation && (
        <div className={`rounded-2xl border-2 p-8 text-center shadow-sm ${validation.isValid ? 'border-emerald-100 bg-emerald-50' : 'border-rose-100 bg-rose-50'}`}>
          <div className={`text-sm font-bold uppercase tracking-widest mb-2 ${validation.isValid ? 'text-emerald-500' : 'text-rose-500'}`}>
            判定結果
          </div>
          <div className={`text-xl font-black ${validation.isValid ? 'text-emerald-700' : 'text-rose-700'}`}>
            {validation.message}
          </div>
          {validation.isValid && (
            <div className="mt-4 text-sm text-neutral-500">
              推奨表記: <span className="font-mono font-bold">{validation.formatted}</span>
            </div>
          )}
        </div>
      )}

      <div className="rounded-xl bg-neutral-50 p-4 text-[10px] text-neutral-400 leading-relaxed">
        ※このツールは番号の「形式」を検証します。その郵便番号が実在するかどうかを確認するには「郵便番号住所検索」ツールを使用してください。
      </div>
    </div>
  )
}