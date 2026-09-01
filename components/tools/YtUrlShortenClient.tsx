"use client"

import { useMemo, useState } from "react"
import { getYouTubeVideoId } from "@/lib/youtubeUtils"

export default function YtUrlShortenClient() {
  const [url, setUrl] = useState("")
  const [copied, setCopied] = useState(false)

  const shortened = useMemo(() => {
    if (!url) return ""
    
    const videoId = getYouTubeVideoId(url)

    if (!videoId) return "無効なURLです"

    return `https://youtu.be/${videoId}`
  }, [url])

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label htmlFor="youtube-url" className="mb-2 block text-sm font-bold text-neutral-700">YouTube動画URL</label>
        <input
          id="youtube-url"
          type="text" 
          value={url} 
          onChange={e => setUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=1s..."
          className="w-full rounded border border-neutral-300 p-3 font-mono text-sm outline-none focus:border-amber-700"
        />
        <p className="mt-2 text-xs leading-5 text-neutral-500">通常URL・youtu.be・埋め込み・Shorts・ライブURLに対応しています。</p>
      </div>

      {url && shortened && shortened !== "無効なURLです" && (
        <div className="rounded-2xl border-2 border-emerald-100 bg-white p-8 text-center shadow-sm">
          <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-2">短縮済みURL</div>
          <div className="mb-6 select-all break-all font-mono text-xl font-black text-emerald-600 bg-emerald-50 p-4 rounded-lg">
            {shortened}
          </div>
          <button
            onClick={async () => {
              await navigator.clipboard.writeText(shortened)
              setCopied(true)
              window.setTimeout(() => setCopied(false), 1600)
            }}
            className="rounded-full bg-amber-800 px-8 py-2 text-sm font-bold text-white transition-colors hover:bg-amber-900"
          >
            {copied ? "コピーしました" : "URLをコピー"}
          </button>
        </div>
      )}

      {url && shortened === "無効なURLです" && (
        <div className="text-center p-4 text-rose-500 text-xs font-bold">
          正しいYouTubeのURLを入力してください
        </div>
      )}
    </div>
  )
}
