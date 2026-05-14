"use client"

import { useEffect, useState } from "react"

type ApiOk = {
  ok: true
  ip: string
  loc: string
  colo: string
  http: string
  tls: string
  raw: Record<string, string>
}

type ApiErr = { ok: false; error: string; message: string }

export default function IpCheckClient() {
  const [status, setStatus] = useState<"loading" | "done" | "error">("loading")
  const [data, setData] = useState<ApiOk | null>(null)
  const [errorMsg, setErrorMsg] = useState<string>("")
  const [copyMsg, setCopyMsg] = useState<string | null>(null)

  const load = async () => {
    setStatus("loading")
    setErrorMsg("")
    setData(null)

    try {
      const res = await fetch("/api/ip", { cache: "no-store" })
      const json = (await res.json()) as ApiOk | ApiErr

      if (!res.ok || !("ok" in json) || json.ok === false) {
        setStatus("error")
        setErrorMsg(("message" in json && json.message) || "IP情報の取得に失敗しました。")
        return
      }

      setStatus("done")
      setData(json)
    } catch {
      setStatus("error")
      setErrorMsg("サーバーとの通信に失敗しました。")
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleCopy = async () => {
    if (!data?.ip) return
    try {
      await navigator.clipboard.writeText(data.ip)
      setCopyMsg("コピーしました")
    } catch {
      setCopyMsg("失敗")
    } finally {
      setTimeout(() => setCopyMsg(null), 1500)
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between border-b border-neutral-50 pb-4">
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${status === 'done' ? 'bg-blue-500 animate-pulse' : 'bg-neutral-300'}`} />
            <h2 className="text-sm font-bold text-neutral-800 tracking-tight">接続情報の確認</h2>
          </div>
          <button
            onClick={load}
            disabled={status === 'loading'}
            className="rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-xs font-bold text-neutral-600 hover:bg-neutral-50 active:bg-neutral-100 transition-all disabled:opacity-50"
          >
            {status === 'loading' ? '取得中...' : '再読み込み'}
          </button>
        </div>

        {/* IP Hero Section */}
        {status === "done" && data ? (
          <div className="rounded-2xl bg-neutral-900 p-8 text-center shadow-inner">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">Your Public IP Address</div>
            <div className="mt-3 font-mono text-3xl font-bold text-white sm:text-4xl md:text-5xl break-all">
              {data.ip || "0.0.0.0"}
            </div>
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 rounded-full bg-white/10 px-6 py-2 text-xs font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95"
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
                {copyMsg || "IPアドレスをコピー"}
              </button>
            </div>
          </div>
        ) : status === "error" ? (
          <div className="rounded-xl border border-rose-100 bg-rose-50 p-8 text-center">
            <div className="text-sm font-bold text-rose-800">{errorMsg}</div>
            <button onClick={load} className="mt-4 text-xs font-bold text-rose-600 underline">再試行する</button>
          </div>
        ) : (
          <div className="rounded-xl border border-neutral-100 bg-neutral-50 p-12 text-center animate-pulse">
            <div className="text-sm font-medium text-neutral-400">ネットワーク情報を解析しています...</div>
          </div>
        )}

        {/* Metadata Grid */}
        {status === "done" && data && (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-neutral-100 bg-neutral-50 p-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Location</div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-xl">📍</span>
                <span className="text-sm font-bold text-neutral-800">{data.loc || "Unknown"}</span>
              </div>
            </div>
            <div className="rounded-xl border border-neutral-100 bg-neutral-50 p-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Protocol Info</div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-xl">🛡️</span>
                <span className="text-sm font-bold text-neutral-800 uppercase">
                  {data.tls ? `TLS ${data.tls}` : "Plain"} / {data.http || "HTTP"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Advanced Details */}
        {status === "done" && data && (
          <div className="mt-6">
            <details className="group rounded-xl border border-neutral-200 bg-white overflow-hidden">
              <summary className="flex cursor-pointer items-center justify-between bg-neutral-50 px-4 py-3 text-xs font-bold text-neutral-600 transition-colors hover:bg-neutral-100">
                <span>技術的な詳細（RAWデータ）</span>
                <svg className="h-4 w-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="border-t border-neutral-100 p-4">
                <pre className="overflow-auto text-[10px] leading-relaxed text-neutral-700 font-mono">
                  {Object.entries(data.raw)
                    .map(([k, v]) => `${k.padEnd(15)} : ${v}`)
                    .join("\n")}
                </pre>
              </div>
            </details>
          </div>
        )}

        <div className="mt-6 border-t border-neutral-100 pt-4 text-center">
          <p className="text-[10px] text-neutral-400 leading-relaxed">
            ※表示されるIPアドレスは、当サーバーへアクセスする際に経由しているパブリックIP（グローバルIP）です。<br />
            VPNやプロキシを使用している場合は、それらのサーバーのIPが表示されます。
          </p>
        </div>
      </div>
    </div>
  )
}