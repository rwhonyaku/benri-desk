"use client"

import { useEffect, useMemo, useRef, useState } from "react"

type ZipCloudResult = {
  zipcode: string
  prefcode: string
  address1: string
  address2: string
  address3: string
  kana1: string
  kana2: string
  kana3: string
}

type ApiOk = {
  ok: true
  zipcode: string
  upstream: { message: string | null; results: ZipCloudResult[] | null; status: number }
}

type ApiErr = { ok: false; error: string; message: string }

function formatZip(digits: string) {
  const d = digits.replace(/[^\d]/g, "").slice(0, 7)
  if (d.length <= 3) return d
  return `${d.slice(0, 3)}-${d.slice(3)}`
}

export default function ZipcodeToAddressClient() {
  const [zipInput, setZipInput] = useState("")
  const digits = useMemo(() => zipInput.replace(/[^\d]/g, "").slice(0, 7), [zipInput])

  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [results, setResults] = useState<ZipCloudResult[] | null>(null)
  const [copyMsg, setCopyMsg] = useState<string | null>(null)

  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    setErrorMsg(null)
    setResults(null)

    if (digits.length < 7) {
      setStatus("idle")
      return
    }

    const t = window.setTimeout(async () => {
      abortRef.current?.abort()
      const ac = new AbortController()
      abortRef.current = ac

      setStatus("loading")

      try {
        const res = await fetch(`/api/zipcode?zipcode=${digits}`, { signal: ac.signal })
        const json = (await res.json()) as ApiOk | ApiErr

        if (!res.ok || !("ok" in json) || json.ok === false) {
          setStatus("error")
          setErrorMsg(("message" in json && json.message) || "検索に失敗しました。")
          return
        }

        const upstream = json.upstream
        if (upstream.status !== 200) {
          setStatus("error")
          setErrorMsg(upstream.message || "検索に失敗しました。")
          return
        }

        setStatus("done")
        setResults(upstream.results || [])
      } catch (e: any) {
        if (e?.name === "AbortError") return
        setStatus("error")
        setErrorMsg("ネットワークエラーが発生しました。")
      }
    }, 250)

    return () => window.clearTimeout(t)
  }, [digits])

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopyMsg(`${type}をコピーしました`)
    } catch {
      setCopyMsg("失敗")
    } finally {
      setTimeout(() => setCopyMsg(null), 1500)
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1 space-y-2">
            <label className="px-1 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              郵便番号 (7桁)
            </label>
            <div className="relative">
              <input
                className="w-full rounded-xl border-2 border-neutral-100 bg-neutral-50 px-4 py-3 text-2xl font-bold tracking-widest text-neutral-800 outline-none transition-all placeholder:text-neutral-200 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                value={zipInput}
                onChange={(e) => setZipInput(formatZip(e.target.value))}
                placeholder="000-0000"
                inputMode="numeric"
                spellCheck={false}
              />
              {status === "loading" && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              setZipInput("")
              setStatus("idle")
            }}
            className="h-[56px] rounded-xl border border-neutral-200 bg-white px-6 text-sm font-bold text-neutral-500 transition-all hover:bg-neutral-50 hover:text-rose-500 active:scale-95"
          >
            クリア
          </button>
        </div>
        <p className="mt-3 text-[11px] font-medium text-neutral-400">
          ハイフンは自動で挿入されます。7桁入力すると自動で住所を検索します。
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500">検索結果</h3>
          {copyMsg && (
            <span className="animate-in fade-in slide-in-from-right-2 text-[10px] font-bold text-emerald-600">
              {copyMsg}
            </span>
          )}
        </div>

        {status === "idle" && (
          <div className="flex h-32 flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-100 text-neutral-300">
            <span className="text-2xl">📮</span>
            <p className="text-xs font-medium">郵便番号を入力してください</p>
          </div>
        )}

        {status === "error" && (
          <div className="rounded-xl border border-rose-100 bg-rose-50 p-4 text-center">
            <p className="text-sm font-bold text-rose-600">{errorMsg}</p>
          </div>
        )}

        {status === "done" && results && results.length === 0 && (
          <div className="rounded-xl border border-amber-100 bg-amber-50 p-4 text-center">
            <p className="text-sm font-bold text-amber-600">該当する住所が見つかりませんでした。</p>
          </div>
        )}

        {status === "done" && results && results.length > 0 && (
          <div className="grid gap-3">
            {results.map((r, idx) => {
              const address = `${r.address1}${r.address2}${r.address3}`
              const kana = `${r.kana1}${r.kana2}${r.kana3}`
              return (
                <div
                  key={`${r.zipcode}-${idx}`}
                  className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-white p-5 transition-all hover:border-blue-200 hover:shadow-md"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-lg font-bold tracking-tight text-neutral-800">{address}</div>
                      <div className="text-xs font-medium text-neutral-400">{kana}</div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleCopy(address, "住所")}
                        className="rounded-lg bg-neutral-900 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-neutral-800 active:scale-95"
                      >
                        住所をコピー
                      </button>
                      <button
                        onClick={() => handleCopy(kana, "カナ")}
                        className="rounded-lg border border-neutral-200 bg-white px-4 py-2 text-xs font-bold text-neutral-600 transition-all hover:bg-neutral-50 active:scale-95"
                      >
                        カナ
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="rounded-lg border border-blue-100/50 bg-blue-50/50 p-4 text-center">
        <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400 leading-loose">
          ZipCloud API を利用
        </p>
      </div>
    </div>
  )
}
