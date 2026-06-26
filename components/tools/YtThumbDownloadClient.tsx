"use client"

import { useState, useMemo } from "react"
import { getYouTubeVideoId } from "@/lib/youtubeUtils"

export default function YtThumbDownloadClient() {
  const [url, setUrl] = useState("")

  const thumbs = useMemo(() => {
    if (!url) return null
    
    const videoId = getYouTubeVideoId(url)

    if (!videoId) return null

    return {
      max: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      hq: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      mq: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
    }
  }, [url])

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-2 block text-sm font-bold text-neutral-700 italic">YouTubeのURLを入力</label>
        <input 
          type="text" 
          value={url} 
          onChange={e => setUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
          className="w-full rounded border border-neutral-300 p-3 font-mono text-sm outline-none focus:border-blue-500"
        />
      </div>

      {thumbs ? (
        <div className="space-y-4">
          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
            <img src={thumbs.max} alt="Thumbnail Preview" className="w-full h-auto bg-neutral-100" />
            <div className="p-4 text-center">
              <a 
                href={thumbs.max} 
                target="_blank" 
                rel="noreferrer"
                className="inline-block w-full rounded-lg bg-neutral-900 py-3 text-sm font-bold text-white hover:bg-neutral-800"
              >
                高画質画像を保存 (1280x720)
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <a href={thumbs.hq} target="_blank" rel="noreferrer" className="block p-3 text-center rounded-xl bg-white border border-neutral-100 text-[10px] font-bold text-neutral-500 hover:text-blue-600">
              中画質 (480x360)
            </a>
            <a href={thumbs.mq} target="_blank" rel="noreferrer" className="block p-3 text-center rounded-xl bg-white border border-neutral-100 text-[10px] font-bold text-neutral-500 hover:text-blue-600">
              低画質 (320x180)
            </a>
          </div>
        </div>
      ) : url && (
        <div className="text-center p-8 text-rose-500 text-xs font-bold">有効なYouTube URLを入力してください</div>
      )}
    </div>
  )
}
