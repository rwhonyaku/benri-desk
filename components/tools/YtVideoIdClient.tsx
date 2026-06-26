"use client"

import { useMemo, useState } from "react"
import { getYouTubeVideoId } from "@/lib/youtubeUtils"

export default function YtVideoIdClient() {
  const [url, setUrl] = useState("")

  const videoId = useMemo(() => {
    if (!url) return ""
    return getYouTubeVideoId(url) || "取得できませんでした"
  }, [url])

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-2 block text-sm font-bold italic text-neutral-700">YouTubeのURLを入力</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
          className="w-full rounded border border-neutral-300 p-3 font-mono text-sm outline-none focus:border-blue-500"
        />
      </div>

      {url && (
        <div className="rounded-2xl border border-neutral-100 bg-neutral-50 p-8 text-center">
          <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-neutral-400">動画ID</div>
          <div
            className={`font-mono text-4xl font-black tracking-wider ${
              videoId === "取得できませんでした" ? "text-rose-400" : "text-neutral-900"
            }`}
          >
            {videoId}
          </div>
          {videoId !== "取得できませんでした" && (
            <button onClick={() => navigator.clipboard.writeText(videoId)} className="mt-6 text-xs font-bold text-blue-600 hover:underline">
              IDをコピーする
            </button>
          )}
        </div>
      )}
    </div>
  )
}
