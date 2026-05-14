"use client"

import { useState, useMemo } from "react"

export default function QueryParserClient() {
  const [urlInput, setUrlInput] = useState("")

  const params = useMemo(() => {
    try {
      const url = new URL(urlInput)
      const entries: [string, string][] = []
      url.searchParams.forEach((value, key) => {
        entries.push([key, value])
      })
      return { host: url.hostname, pathname: url.pathname, entries }
    } catch {
      return null
    }
  }, [urlInput])

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-2 block text-sm font-bold text-neutral-700 italic">解析するURLを入力</label>
        <input
          type="text"
          className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm text-neutral-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
          placeholder="https://example.com/page?id=123&category=web"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />
      </div>

      {params && (
        <div className="rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
          <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200">
            <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">基本情報</div>
            <div className="text-sm font-bold text-neutral-700 truncate">{params.host}{params.pathname}</div>
          </div>
          <div className="p-6">
            <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-4">クエリパラメータ</div>
            {params.entries.length > 0 ? (
              <div className="space-y-3">
                {params.entries.map(([key, value], idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-2 border-b border-neutral-50 pb-2">
                    <span className="w-full sm:w-1/3 text-xs font-black text-blue-600 truncate">{key}</span>
                    <span className="flex-1 text-sm font-medium text-neutral-800 break-all bg-neutral-50 px-2 py-1 rounded">{value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-neutral-400">パラメータは見つかりませんでした</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}