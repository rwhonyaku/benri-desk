"use client"

import { useEffect, useMemo, useState } from "react"

type Row = { key: string; value: string }
type ApiOk = { ok: true; headers: Row[]; count: number }
type ApiErr = { ok: false; message?: string }

export default function HttpHeadersClient() {
  const [status, setStatus] = useState<"loading" | "done" | "error">("loading")
  const [rows, setRows] = useState<Row[]>([])
  const [errorMsg, setErrorMsg] = useState("")
  const [q, setQ] = useState("")
  const [copyMsg, setCopyMsg] = useState<string | null>(null)

  const load = async () => {
    setStatus("loading")
    setErrorMsg("")
    try {
      const res = await fetch("/api/headers", { cache: "no-store" })
      const json = (await res.json()) as ApiOk | ApiErr
      if (!res.ok || !("ok" in json) || json.ok !== true) {
        setStatus("error")
        setErrorMsg(("message" in json && json.message) || "ヘッダー情報の取得に失敗しました。")
        return
      }
      setRows(json.headers)
      setStatus("done")
    } catch {
      setStatus("error")
      setErrorMsg("ネットワークエラーにより取得できませんでした。")
    }
  }

  useEffect(() => {
    load()
  }, [])

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return rows
    return rows.filter((r) => r.key.toLowerCase().includes(s) || r.value.toLowerCase().includes(s))
  }, [rows, q])

  const asText = useMemo(() => filtered.map((r) => `${r.key}: ${r.value}`).join("\n"), [filtered])

  const handleCopy = async () => {
    if (filtered.length === 0) return
    try {
      await navigator.clipboard.writeText(asText)
      setCopyMsg("コピーしました")
    } catch {
      setCopyMsg("コピー失敗")
    } finally {
      setTimeout(() => setCopyMsg(null), 1500)
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
        {/* Header Actions */}
        <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-neutral-50 pb-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${status === 'done' ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
              <span className={`relative inline-flex h-2 w-2 rounded-full ${status === 'done' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
            </span>
            <div className="text-sm font-bold text-neutral-800">現在のリクエストヘッダー</div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={load}
              className="rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-xs font-bold text-neutral-600 hover:bg-neutral-50 active:bg-neutral-100 transition-colors"
            >
              再取得
            </button>
            <button
              onClick={handleCopy}
              disabled={filtered.length === 0}
              className="rounded-md bg-neutral-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-neutral-800 disabled:opacity-20 transition-all"
            >
              {copyMsg || "表示中をコピー"}
            </button>
          </div>
        </div>

        {/* Filter Input */}
        <div className="relative mb-4">
          <input
            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2.5 pl-10 text-sm text-neutral-900 outline-none transition-all focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="キー名や値で絞り込む..."
            spellCheck={false}
          />
          <svg className="absolute left-3 top-3 h-4 w-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* State Management */}
        {status === "loading" && (
          <div className="flex items-center justify-center py-12">
            <div className="text-sm text-neutral-400 animate-pulse font-medium">デバッグ情報を解析中...</div>
          </div>
        )}

        {status === "error" && (
          <div className="rounded-lg bg-rose-50 p-4 text-sm font-medium text-rose-700 border border-rose-100">
            {errorMsg}
          </div>
        )}

        {status === "done" && (
          <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
            <div className="max-h-[500px] overflow-auto">
              <table className="w-full border-collapse text-left text-xs">
                <thead className="sticky top-0 z-10 bg-neutral-100 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                  <tr>
                    <th className="px-4 py-3 border-b border-neutral-200">Header Key</th>
                    <th className="px-4 py-3 border-b border-neutral-200">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 font-mono">
                  {filtered.length > 0 ? (
                    filtered.map((r, i) => (
                      <tr key={`${r.key}-${i}`} className="hover:bg-blue-50/30 transition-colors">
                        <td className="px-4 py-3 font-semibold text-blue-700 break-all w-1/3 leading-relaxed">
                          {r.key}
                        </td>
                        <td className="px-4 py-3 text-neutral-600 break-all leading-relaxed">
                          {r.value}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2} className="px-4 py-8 text-center text-neutral-400 italic">
                        一致するヘッダーが見つかりませんでした
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="bg-neutral-50 border-t border-neutral-200 px-4 py-2 flex justify-between items-center">
              <span className="text-[10px] text-neutral-500 font-medium">Total: {filtered.length} items</span>
              <span className="text-[10px] text-neutral-400 uppercase tracking-tighter">Read Only View</span>
            </div>
          </div>
        )}

        <div className="mt-4 flex items-start gap-2 rounded-md bg-amber-50 p-3 text-[11px] leading-relaxed text-amber-800 border border-amber-100">
          <svg className="mt-0.5 h-3 w-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            セキュリティ保護のため <strong>Cookie / Authorization / Proxy</strong> 等の機密ヘッダーはマスクまたは非表示になっています。
          </div>
        </div>
      </div>
    </div>
  )
}