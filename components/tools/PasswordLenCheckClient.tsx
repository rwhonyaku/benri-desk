"use client"

import { useState, useMemo } from "react"

export default function PasswordLenCheckClient() {
  const [password, setPassword] = useState("")

  const analysis = useMemo(() => {
    if (!password) return null

    const len = password.length
    const hasUpper = /[A-Z]/.test(password)
    const hasLower = /[a-z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSymbol = /[^A-Za-z0-9]/.test(password)

    let score = 0
    if (len >= 8) score++
    if (len >= 12) score++
    if (hasUpper && hasLower) score++
    if (hasNumber) score++
    if (hasSymbol) score++

    let strength = ""
    let color = ""
    if (score <= 2) { strength = "弱い"; color = "bg-rose-500" }
    else if (score <= 4) { strength = "普通"; color = "bg-amber-500" }
    else { strength = "強い"; color = "bg-emerald-500" }

    return { len, hasUpper, hasLower, hasNumber, hasSymbol, strength, color, score }
  }, [password])

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-2 block text-sm font-bold text-neutral-700 italic">パスワードを入力</label>
        <input
          type="text"
          className="w-full rounded-lg border border-neutral-300 p-4 font-mono text-lg outline-none focus:border-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワードを入力してください..."
        />
      </div>

      {analysis && (
        <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm space-y-6">
          <div className="text-center">
            <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">現在の強度</div>
            <div className={`inline-block px-4 py-1 rounded-full text-white text-xs font-bold ${analysis.color}`}>
              {analysis.strength}
            </div>
            <div className="mt-2 text-4xl font-black text-neutral-900">{analysis.len}<span className="text-sm ml-1 text-neutral-400">文字</span></div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-bold">
            <div className={`p-3 rounded-lg border ${analysis.hasUpper ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-neutral-100 bg-neutral-50 text-neutral-300'}`}>大文字 (A-Z)</div>
            <div className={`p-3 rounded-lg border ${analysis.hasLower ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-neutral-100 bg-neutral-50 text-neutral-300'}`}>小文字 (a-z)</div>
            <div className={`p-3 rounded-lg border ${analysis.hasNumber ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-neutral-100 bg-neutral-50 text-neutral-300'}`}>数字 (0-9)</div>
            <div className={`p-3 rounded-lg border ${analysis.hasSymbol ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-neutral-100 bg-neutral-50 text-neutral-300'}`}>記号 (!@#など)</div>
          </div>
        </div>
      )}
    </div>
  )
}