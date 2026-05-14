"use client"

import { useState, useEffect } from "react"

export default function ColorConverterClient() {
  const [hex, setHex] = useState("#3b82f6")
  const [rgb, setRgb] = useState("59, 130, 246")

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null
  }

  const handleHexChange = (val: string) => {
    setHex(val)
    const converted = hexToRgb(val)
    if (converted) setRgb(converted)
  }

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
        <div 
          className="mx-auto mb-8 h-32 w-32 rounded-2xl shadow-inner border border-neutral-100" 
          style={{ backgroundColor: hex }}
        />
        
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-[10px] font-bold text-neutral-400 uppercase tracking-widest italic">Hex Code</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={hex}
                onChange={(e) => handleHexChange(e.target.value)}
                className="flex-1 rounded-lg border border-neutral-300 px-4 py-2 font-mono text-lg font-bold outline-none focus:border-blue-500"
              />
              <input 
                type="color" 
                value={hex} 
                onChange={(e) => handleHexChange(e.target.value)}
                className="h-11 w-11 cursor-pointer rounded border-0 bg-transparent"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-[10px] font-bold text-neutral-400 uppercase tracking-widest italic">RGB</label>
            <input
              type="text"
              readOnly
              value={rgb}
              className="w-full rounded-lg border border-neutral-100 bg-neutral-50 px-4 py-2 font-mono text-lg font-bold text-neutral-500 outline-none"
            />
          </div>
        </div>

        <button
          onClick={() => navigator.clipboard.writeText(hex)}
          className="mt-6 w-full text-xs font-bold text-blue-600 hover:underline"
        >
          Hexコードをコピー
        </button>
      </div>
    </div>
  )
}