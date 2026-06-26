"use client"

import { useMemo, useState } from "react"
import { getYouTubeVideoId } from "@/lib/youtubeUtils"

function toSeconds(hours: number, minutes: number, seconds: number) {
  return Math.max(0, hours * 3600 + minutes * 60 + seconds)
}

export default function YtTimestampGeneratorClient() {
  const [url, setUrl] = useState("")
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(1)
  const [seconds, setSeconds] = useState(30)

  const result = useMemo(() => {
    const videoId = getYouTubeVideoId(url)
    const totalSeconds = toSeconds(hours, minutes, seconds)
    if (!videoId) return { videoId: "", totalSeconds, url: "" }
    return {
      videoId,
      totalSeconds,
      url: `https://youtu.be/${videoId}?t=${totalSeconds}`,
    }
  }, [url, hours, minutes, seconds])

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="space-y-5 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div>
          <label className="mb-2 block text-sm font-bold italic text-neutral-700">YouTubeのURL</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full rounded border border-neutral-300 p-3 font-mono text-sm outline-none focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-bold uppercase text-neutral-400">時</label>
            <input
              type="number"
              min="0"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="w-full rounded border border-neutral-300 px-3 py-2 font-bold outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase text-neutral-400">分</label>
            <input
              type="number"
              min="0"
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
              className="w-full rounded border border-neutral-300 px-3 py-2 font-bold outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase text-neutral-400">秒</label>
            <input
              type="number"
              min="0"
              value={seconds}
              onChange={(e) => setSeconds(Number(e.target.value))}
              className="w-full rounded border border-neutral-300 px-3 py-2 font-bold outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {url && (
        result.url ? (
          <div className="rounded-2xl border-2 border-red-100 bg-white p-8 text-center shadow-sm">
            <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-red-500">
              タイムスタンプ付きURL
            </div>
            <div className="mb-6 break-all rounded-lg bg-red-50 p-4 font-mono text-sm font-black text-red-700">
              {result.url}
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(result.url)}
              className="rounded-full bg-neutral-900 px-8 py-2 text-sm font-bold text-white hover:bg-neutral-800"
            >
              コピーする
            </button>
          </div>
        ) : (
          <div className="p-4 text-center text-xs font-bold text-rose-500">
            正しいYouTubeの動画URLを入力してください
          </div>
        )
      )}
    </div>
  )
}
