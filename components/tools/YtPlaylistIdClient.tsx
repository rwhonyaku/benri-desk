"use client"

import { useMemo, useState } from "react"
import { getYouTubePlaylistId } from "@/lib/youtubeUtils"

export default function YtPlaylistIdClient() {
  const [url, setUrl] = useState("")

  const playlistId = useMemo(() => getYouTubePlaylistId(url), [url])

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-2 block text-sm font-bold italic text-neutral-700">YouTube再生リストのURL</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://www.youtube.com/playlist?list=..."
          className="w-full rounded border border-neutral-300 p-3 font-mono text-sm outline-none focus:border-blue-500"
        />
      </div>

      {url && (
        playlistId ? (
          <div className="rounded-2xl border border-neutral-100 bg-neutral-50 p-8 text-center">
            <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
              再生リストID
            </div>
            <div className="break-all font-mono text-2xl font-black tracking-wide text-neutral-900">
              {playlistId}
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(playlistId)}
              className="mt-6 text-xs font-bold text-blue-600 hover:underline"
            >
              IDをコピーする
            </button>
          </div>
        ) : (
          <div className="p-4 text-center text-xs font-bold text-rose-500">
            再生リストIDを取得できませんでした
          </div>
        )
      )}
    </div>
  )
}
