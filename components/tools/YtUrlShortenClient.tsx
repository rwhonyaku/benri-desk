"use client"

import { useState, useMemo } from "react"

export default function YtUrlShortenClient() {
  const [url, setUrl] = useState("")

  const shortened = useMemo(() => {
    if (!url) return ""
    
    // Regular expression to find YouTube Video ID
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    const videoId = (match && match[2].length === 11) ? match[2] : null

    if (!videoId) return "無効なURLです"

    return `https://youtu.be/${videoId}`
  }, [url])

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-2 block text-sm font-bold text-neutral-700 italic">長いYouTube URLを入力</label>
        <input 
          type="text" 
          value={url} 
          onChange={e => setUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=1s..."
          className="w-full rounded border border-neutral-300 p-3 font-mono text-sm outline-none focus:border-blue-500"
        />
      </div>

      {url && shortened && shortened !== "無効なURLです" && (
        <div className="rounded-2xl border-2 border-emerald-100 bg-white p-8 text-center shadow-sm">
          <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-2">短縮済みURL</div>
          <div className="mb-6 select-all break-all font-mono text-xl font-black text-emerald-600 bg-emerald-50 p-4 rounded-lg">
            {shortened}
          </div>
          <button 
            onClick={() => navigator.clipboard.writeText(shortened)}
            className="rounded-full bg-emerald-600 px-8 py-2 text-sm font-bold text-white hover:bg-emerald-700 transition-colors"
          >
            コピーする
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