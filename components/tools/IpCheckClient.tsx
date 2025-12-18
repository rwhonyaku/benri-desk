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

async function copyToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }
  const ta = document.createElement("textarea")
  ta.value = text
  ta.setAttribute("readonly", "true")
  ta.style.position = "fixed"
  ta.style.left = "-9999px"
  document.body.appendChild(ta)
  ta.select()
  document.execCommand("copy")
  document.body.removeChild(ta)
}

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
        setErrorMsg(("message" in json && json.message) || "取得に失敗しました。")
        return
      }

      setStatus("done")
      setData(json)
    } catch {
      setStatus("error")
      setErrorMsg("取得に失敗しました。")
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="rounded-lg border border-neutral-200 bg-white p-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="text-sm font-medium text-neutral-900">現在のIPアドレス</div>
        <button
          type="button"
          className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
          onClick={load}
        >
          再取得
        </button>
      </div>

      {status === "loading" && (
        <div className="mt-3 rounded-md border border-neutral-200 bg-neutral-50 p-3 text-sm text-neutral-600">
          取得中…
        </div>
      )}

      {status === "error" && (
        <div className="mt-3 rounded-md border border-neutral-200 bg-neutral-50 p-3 text-sm text-neutral-700">
          {errorMsg}
        </div>
      )}

      {status === "done" && data && (
        <>
          <div className="mt-4 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
            <div className="text-xs text-neutral-500">IPアドレス</div>
            <div className="mt-1 text-2xl font-semibold text-neutral-900 break-all">{data.ip || "—"}</div>

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                onClick={async () => {
                  if (!data.ip) return
                  try {
                    await copyToClipboard(data.ip)
                    setCopyMsg("コピーしました")
                  } catch {
                    setCopyMsg("コピーに失敗しました")
                  } finally {
                    window.setTimeout(() => setCopyMsg(null), 1500)
                  }
                }}
                disabled={!data.ip}
              >
                IPをコピー
              </button>

              {copyMsg && <span className="text-sm text-neutral-600">{copyMsg}</span>}
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-md border border-neutral-200 bg-white p-3">
              <div className="text-xs text-neutral-500">国コード（推定）</div>
              <div className="mt-1 text-sm text-neutral-900">{data.loc || "—"}</div>
            </div>
            <div className="rounded-md border border-neutral-200 bg-white p-3">
              <div className="text-xs text-neutral-500">接続方式</div>
              <div className="mt-1 text-sm text-neutral-900">
                {data.tls ? `TLS ${data.tls}` : "—"} / {data.http ? `HTTP ${data.http}` : "—"}
              </div>
            </div>
          </div>

          <details className="mt-4 rounded-md border border-neutral-200 bg-white p-3">
            <summary className="cursor-pointer text-sm text-neutral-700">詳細（技術情報）</summary>
            <pre className="mt-2 overflow-auto rounded-md bg-neutral-50 p-3 text-xs text-neutral-800">
{Object.entries(data.raw)
  .map(([k, v]) => `${k}=${v}`)
  .join("\n")}
            </pre>
          </details>

          <p className="mt-4 text-xs text-neutral-500">
            注: 表示されるのはアクセス元としてサーバーに見えているIPです。入力内容は保存されません。
          </p>
        </>
      )}
    </section>
  )
}
