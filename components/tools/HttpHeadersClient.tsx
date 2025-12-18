"use client"

import { useEffect, useMemo, useState } from "react"

type Row = { key: string; value: string }
type ApiOk = { ok: true; headers: Row[]; count: number }
type ApiErr = { ok: false; message?: string }

async function copyToClipboard(text: string) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text)
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
        setErrorMsg(("message" in json && json.message) || "取得に失敗しました。")
        return
      }
      setRows(json.headers)
      setStatus("done")
    } catch {
      setStatus("error")
      setErrorMsg("取得に失敗しました。")
    }
  }

  useEffect(() => {
    load()
  }, [])

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return rows
    return rows.filter((r) => r.key.includes(s) || r.value.toLowerCase().includes(s))
  }, [rows, q])

  const asText = useMemo(() => filtered.map((r) => `${r.key}: ${r.value}`).join("\n"), [filtered])

  return (
    <section className="rounded-lg border border-neutral-200 bg-white p-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="text-sm font-medium text-neutral-900">HTTPヘッダー</div>
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
            onClick={load}
          >
            再取得
          </button>
          <button
            type="button"
            className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
            onClick={async () => {
              try {
                await copyToClipboard(asText)
                setCopyMsg("コピーしました")
              } catch {
                setCopyMsg("コピーに失敗しました")
              } finally {
                window.setTimeout(() => setCopyMsg(null), 1500)
              }
            }}
            disabled={filtered.length === 0}
          >
            表示中をコピー
          </button>
        </div>
      </div>

      <input
        className="mt-3 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:ring-2 focus:ring-neutral-200"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="フィルター（例: user-agent / accept）"
        spellCheck={false}
      />

      {copyMsg && <div className="mt-2 text-sm text-neutral-600">{copyMsg}</div>}

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

      {status === "done" && (
        <div className="mt-4 rounded-lg border border-neutral-200 bg-neutral-50 p-3">
          <div className="mb-2 text-xs text-neutral-500">
            表示: {filtered.length.toLocaleString()} 件
          </div>
          <div className="overflow-auto rounded-md bg-white">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-white">
                <tr className="border-b border-neutral-200">
                  <th className="w-1/3 px-3 py-2 text-left font-medium text-neutral-700">キー</th>
                  <th className="px-3 py-2 text-left font-medium text-neutral-700">値</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr key={`${r.key}-${i}`} className="border-b border-neutral-100">
                    <td className="px-3 py-2 font-mono text-xs text-neutral-800 break-all">{r.key}</td>
                    <td className="px-3 py-2 font-mono text-xs text-neutral-800 break-all">{r.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-xs text-neutral-500">
            注: Cookie / Authorization は表示しません。入力内容は保存されません。
          </p>
        </div>
      )}
    </section>
  )
}
