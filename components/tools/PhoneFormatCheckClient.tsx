"use client"

import { useState, useMemo } from "react"

export default function PhoneFormatCheckClient() {
  const [phone, setPhone] = useState("")

  const validation = useMemo(() => {
    if (!phone) return null

    // Remove hyphens and spaces
    const cleaned = phone.replace(/[\s-]/g, "")
    
    if (!/^\d+$/.test(cleaned)) {
      return { isValid: false, message: "数字のみを入力してください", type: "" }
    }

    // Japanese Phone Number Patterns
    const mobileRegex = /^(070|080|090)\d{8}$/
    const ipPhoneRegex = /^050\d{8}$/
    const landlineRegex = /^0\d{9}$/ // Basic check for 10-digit landline starting with 0
    const tollFreeRegex = /^(0120|0800)\d{6}$/

    if (mobileRegex.test(cleaned)) {
      return { isValid: true, message: "有効な携帯電話番号です", type: "携帯電話" }
    } else if (ipPhoneRegex.test(cleaned)) {
      return { isValid: true, message: "有効なIP電話番号です", type: "IP電話" }
    } else if (tollFreeRegex.test(cleaned)) {
      return { isValid: true, message: "有効なフリーダイヤルです", type: "フリーダイヤル" }
    } else if (landlineRegex.test(cleaned)) {
      return { isValid: true, message: "有効な固定電話番号の形式です", type: "固定電話" }
    } else {
      return { isValid: false, message: "無効な電話番号形式です", type: "不明" }
    }
  }, [phone])

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-2 block text-sm font-bold text-neutral-700 italic">電話番号を入力</label>
        <input
          type="text"
          className="w-full rounded-lg border border-neutral-300 p-4 font-mono text-xl tracking-wider outline-none focus:border-blue-500"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="090-1234-5678"
        />
      </div>

      {validation && (
        <div className={`rounded-2xl border-2 p-8 text-center shadow-sm ${validation.isValid ? 'border-emerald-100 bg-emerald-50' : 'border-rose-100 bg-rose-50'}`}>
          <div className={`text-sm font-bold uppercase tracking-widest mb-2 ${validation.isValid ? 'text-emerald-500' : 'text-rose-500'}`}>
            判定結果: {validation.type}
          </div>
          <div className={`text-xl font-black ${validation.isValid ? 'text-emerald-700' : 'text-rose-700'}`}>
            {validation.message}
          </div>
        </div>
      )}

      <div className="rounded-xl bg-neutral-50 p-4 text-[10px] text-neutral-400 leading-relaxed">
        ※日本の主要な電話番号形式（携帯・固定・IP・フリーダイヤル）に対応しています。
      </div>
    </div>
  )
}