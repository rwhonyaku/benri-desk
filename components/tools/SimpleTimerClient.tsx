"use client"

import { useState, useEffect, useRef } from "react"

export default function SimpleTimerClient() {
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [inputMinutes, setInputMinutes] = useState(3)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isActive && secondsLeft > 0) {
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => prev - 1)
      }, 1000)
    } else if (secondsLeft === 0) {
      setIsActive(false)
      if (timerRef.current) clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isActive, secondsLeft])

  const startTimer = () => {
    if (secondsLeft === 0) setSecondsLeft(inputMinutes * 60)
    setIsActive(true)
  }

  const pauseTimer = () => setIsActive(false)
  
  const resetTimer = () => {
    setIsActive(false)
    setSecondsLeft(0)
  }

  const setPreset = (min: number) => {
    setIsActive(false)
    setInputMinutes(min)
    setSecondsLeft(min * 60)
  }

  const formatTime = (totalSeconds: number) => {
    const min = Math.floor(totalSeconds / 60)
    const sec = totalSeconds % 60
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  }

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-3xl border-4 border-neutral-100 bg-white p-10 text-center shadow-sm">
        <div className="mb-8 font-mono text-8xl font-black tabular-nums text-neutral-900">
          {formatTime(secondsLeft || inputMinutes * 60)}
        </div>

        <div className="mb-8 flex justify-center gap-2">
          {[3, 5, 10].map((m) => (
            <button
              key={m}
              onClick={() => setPreset(m)}
              className="rounded-full bg-neutral-100 px-4 py-2 text-xs font-bold text-neutral-600 hover:bg-neutral-200 transition-colors"
            >
              {m}分
            </button>
          ))}
        </div>
        
        <div className="flex gap-4">
          {!isActive ? (
            <button
              onClick={startTimer}
              className="flex-1 rounded-2xl bg-emerald-500 py-5 text-lg font-black text-white shadow-lg shadow-emerald-100 hover:bg-emerald-600 active:scale-95 transition-all"
            >
              スタート
            </button>
          ) : (
            <button
              onClick={pauseTimer}
              className="flex-1 rounded-2xl bg-amber-500 py-5 text-lg font-black text-white shadow-lg shadow-amber-100 hover:bg-amber-600 active:scale-95 transition-all"
            >
              一時停止
            </button>
          )}
          <button
            onClick={resetTimer}
            className="flex-1 rounded-2xl bg-neutral-100 py-5 text-lg font-black text-neutral-400 hover:bg-neutral-200 active:scale-95 transition-all"
          >
            リセット
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-2 block text-center text-xs font-bold text-neutral-400 uppercase tracking-widest">カスタム設定 (分)</label>
        <input 
          type="number" 
          value={inputMinutes}
          onChange={(e) => setInputMinutes(Number(e.target.value))}
          className="w-full text-center text-3xl font-black outline-none"
          min="1"
        />
      </div>
    </div>
  )
}