"use client"

import { useState, useMemo } from "react"

export default function MynumberCheckClient() {
  const [value, setValue] = useState("")

  const validation = useMemo(() => {
    const cleaned = value.replace(/\s|-/g, "")
    if (cleaned.length !== 12 || !/^\d+$/.test(cleaned)) {
      return { isValid: false, message: "12桁の数字を入力してください" }
    }

    // Official Modulus 11 Check Digit Algorithm
    // P_n: digit at position n (from right, excluding check digit)
    // Q_n: weight (n <= 6 ? n + 1 : n - 5)
    let sum = 0
    for (let i = 1; i <= 11; i++) {
      const p = parseInt(cleaned[11 - i])
      const q = i <= 6 ? i + 1 : i - 5
      sum += p * q
    }

    const remainder = sum % 11
    const checkDigit = remainder <= 1 ? 0 : 11 - remainder
    const actualCheckDigit = parseInt(cleaned[11])

    if (checkDigit === actualCheckDigit) {
      return { isValid: true, message: "正しいマイナンバー形式です" }
    } else {
      return { isValid: false, message: "番号が正しくありません（チェックデジット不一致）" }
    }
  }, [value])

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-4 block text-sm font-bold text-neutral-700 italic">マイナンバーを入力 (12桁)</label>
        <input
          type="text"
          maxLength={14}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-2xl font-black tracking-widest outline-none focus:border-blue-500"
          placeholder="1234 5678 9012"
        />
      </div>

      {value.length >= 12 && (
        <div className={`rounded-2xl border-2 p-8 text-center shadow-sm ${validation.isValid ? 'border-emerald-100 bg-emerald-50' : 'border-rose-100 bg-rose-50'}`}>
          <div className={`text-sm font-bold uppercase tracking-widest mb-2 ${validation.isValid ? 'text-emerald-500' : 'text-rose-500'}`}>
            判定結果
          </div>
          <div className={`text-xl font-black ${validation.isValid ? 'text-emerald-700' : 'text-rose-700'}`}>
            {validation.message}
          </div>
        </div>
      )}

      <div className="rounded-xl bg-neutral-50 p-4 text-[10px] text-neutral-400 leading-relaxed">
        ※このツールは入力された番号の形式（チェックデジット）を数学的に検証するものであり、入力内容をサーバーへ送信・保存することはありません。実在する番号かどうかを照合するものではありません。
      </div>
    </div>
  )
}