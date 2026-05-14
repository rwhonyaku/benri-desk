"use client"

import { useState } from "react"

const MIME_MAP: Record<string, string> = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".zip": "application/zip",
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
  ".csv": "text/csv",
  ".txt": "text/plain",
}

export default function MimeTypeCheckerClient() {
  const [ext, setExt] = useState("")

  const lookup = ext.startsWith(".") ? ext.toLowerCase() : `.${ext.toLowerCase()}`
  const result = MIME_MAP[lookup]

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-4 block text-sm font-bold text-neutral-700 italic">拡張子を入力 (例: png, json)</label>
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 rounded-lg border border-neutral-300 px-4 py-3 text-xl font-black text-neutral-900 outline-none focus:border-blue-500"
            value={ext}
            onChange={(e) => setExt(e.target.value)}
            placeholder="pdf"
          />
        </div>
      </div>

      {ext && (
        <div className="rounded-2xl border-2 border-neutral-100 bg-white p-8 text-center shadow-sm">
          <div className="mb-2 text-sm font-bold tracking-widest text-neutral-400 uppercase">MIME Type</div>
          <div className="text-3xl font-black text-neutral-900">
            {result || "不明なタイプ"}
          </div>
          {result && (
            <button
              onClick={() => navigator.clipboard.writeText(result)}
              className="mt-6 text-xs font-bold text-blue-500 hover:underline"
            >
              コピーする
            </button>
          )}
        </div>
      )}
    </div>
  )
}