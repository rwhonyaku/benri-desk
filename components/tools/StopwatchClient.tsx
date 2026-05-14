"use client"

import { useState, useRef, useEffect } from "react"

export default function StopwatchClient() {
  const [time, setTime] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const toggle = () => {
    if (isActive) {
      if (timerRef.current) clearInterval(timerRef.current)
    } else {
      const startTime = Date.now() - time
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTime)
      }, 10)
    }
    setIsActive(!isActive)
  }

  const reset = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    setTime(0)
    setIsActive(false)
  }

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    const centiseconds = Math.floor((ms % 1000) / 10)
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`
  }

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-3xl border-4 border-neutral-100 bg-white p-12 text-center shadow-sm">
        <div className="mb-10 font-mono text-7xl font-black tracking-tighter text-neutral-900">
          {formatTime(time)}
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={toggle}
            className={`flex-1 rounded-2xl py-5 text-lg font-black transition-all active:scale-95 ${isActive ? 'bg-rose-100 text-rose-600 hover:bg-rose-200' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-100'}`}
          >
            {isActive ? 'ストップ' : 'スタート'}
          </button>
          <button
            onClick={reset}
            className="flex-1 rounded-2xl bg-neutral-100 py-5 text-lg font-black text-neutral-400 hover:bg-neutral-200 active:scale-95 transition-all"
          >
            リセット
          </button>
        </div>
      </div>
    </div>
  )
}