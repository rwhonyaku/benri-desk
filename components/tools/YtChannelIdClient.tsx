"use client"

import { useMemo, useState } from "react"
import { getYouTubeChannelInfo } from "@/lib/youtubeUtils"

export default function YtChannelIdClient() {
  const [url, setUrl] = useState("")

  const result = useMemo(() => getYouTubeChannelInfo(url), [url])

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-2 block text-sm font-bold italic text-neutral-700">YouTubeチャンネルURL</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://www.youtube.com/channel/UC..."
          className="w-full rounded border border-neutral-300 p-3 font-mono text-sm outline-none focus:border-blue-500"
        />
      </div>

      {url && result.channelId && (
        <div className="rounded-2xl border border-neutral-100 bg-neutral-50 p-8 text-center">
          <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
            チャンネルID
          </div>
          <div className="break-all font-mono text-2xl font-black tracking-wide text-neutral-900">
            {result.channelId}
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(result.channelId)}
            className="mt-6 text-xs font-bold text-blue-600 hover:underline"
          >
            IDをコピーする
          </button>
        </div>
      )}

      {url && !result.channelId && result.handle && (
        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6 text-center">
          <div className="text-sm font-bold text-amber-800">{result.handle}</div>
          <p className="mt-2 text-xs font-medium text-amber-700">
            @ハンドルからチャンネルIDを取得するにはYouTube側の確認が必要です。このツールではURLに含まれるIDのみ抽出します。
          </p>
        </div>
      )}

      {url && !result.channelId && !result.handle && (
        <div className="p-4 text-center text-xs font-bold text-rose-500">
          チャンネルIDを取得できませんでした
        </div>
      )}
    </div>
  )
}
