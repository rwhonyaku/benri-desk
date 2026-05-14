"use client"

import { useState } from "react"

export default function PasswordGeneratorClient() {
  const [length, setLength] = useState(16)
  const [password, setPassword] = useState("")

  const generate = () => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+"
    let retVal = ""
    for (let i = 0; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    setPassword(retVal)
  }

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-4 block text-sm font-bold text-neutral-700 italic">長さ: {length}</label>
        <input 
          type="range" min="8" max="64" value={length} 
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full cursor-pointer"
        />
        <button
          onClick={generate}
          className="mt-6 w-full rounded-md bg-neutral-800 py-4 text-sm font-bold text-white hover:bg-neutral-900 active:scale-95 transition-all"
        >
          パスワードを生成
        </button>
      </div>

      {password && (
        <div className="rounded-2xl border-2 border-blue-100 bg-white p-8 text-center shadow-sm">
          <div className="mb-4 select-all break-all font-mono text-xl font-black text-blue-600 bg-neutral-50 p-4 rounded-lg">
            {password}
          </div>
          <button 
            onClick={() => navigator.clipboard.writeText(password)}
            className="text-xs font-bold text-blue-400 hover:underline"
          >
            コピーする
          </button>
        </div>
      )}
    </div>
  )
}