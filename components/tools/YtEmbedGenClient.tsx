"use client"

import { useState, useMemo } from "react"

export default function YtEmbedGenClient() {
  const [url, setUrl] = useState("")
  const [width, setWidth] = useState(560)
  const [height, setHeight] = useState(315)

  const embedCode = useMemo(() => {
    if (!url) return ""
    
    // Extract Video ID
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    const videoId = (match && match[2].length === 11) ? match[2] : null

    if (!videoId) return "無効なURLです"

    return `<iframe width="${width}" height="${height}" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
  }, [url, width, height])

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm space-y-4">
        <div>
          <label className="mb-1 block text-sm font-bold text-neutral-700 italic">YouTubeのURL</label>
          <input 
            type="text" 
            value={url} 
            onChange={e => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full rounded border border-neutral-300 p-3 font-mono text-sm outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-xs font-bold text-neutral-400 uppercase">幅 (px)</label>
            <input type="number" value={width} onChange={e => setWidth(Number(e.target.value))} className="w-full border-b py-2 font-bold outline-none" />
          </div>
          <div className="flex-1">
            <label className="text-xs font-bold text-neutral-400 uppercase">高さ (px)</label>
            <input type="number" value={height} onChange={e => setHeight(Number(e.target.value))} className="w-full border-b py-2 font-bold outline-none" />
          </div>
        </div>
      </div>

      {embedCode && (
        <div className="rounded-xl border border-neutral-200 bg-neutral-900 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">埋め込みコード</span>
            <button 
              onClick={() => navigator.clipboard.writeText(embedCode)}
              className="text-xs font-bold text-blue-400 hover:text-blue-300"
            >
              コピー
            </button>
          </div>
          <pre className="whitespace-pre-wrap break-all font-mono text-xs text-emerald-400">
            {embedCode}
          </pre>
        </div>
      )}
    </div>
  )
}