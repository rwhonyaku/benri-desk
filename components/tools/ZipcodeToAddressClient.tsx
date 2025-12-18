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

    if (digits.length === 0) {
      setStatus("idle")
      return
    }

    if (digits.length < 7) {
      setStatus("idle")
      return
    }

    // Debounce + cancel previous
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

        if (!upstream.results || upstream.results.length === 0) {
          setStatus("done")
          setResults([])
          return
        }

        setStatus("done")
        setResults(upstream.results)
      } catch (e: any) {
        if (e?.name === "AbortError") return
        setStatus("error")
        setErrorMsg("検索に失敗しました。")
      }
    }, 250)

    return () => window.clearTimeout(t)
  }, [digits])

  const firstAddress = useMemo(() => {
    if (!results || results.length === 0) return ""
    const r = results[0]
    return `${r.address1}${r.address2}${r.address3}`
  }, [results])

  return (
    <section className="rounded-lg border border-neutral-200 bg-white p-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="text-sm font-medium text-neutral-900">郵便番号</div>
        <div className="text-xs text-neutral-500">7桁入力で自動検索</div>
      </div>

      <input
        className="mt-2 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:ring-2 focus:ring-neutral-200"
        value={zipInput}
        onChange={(e) => setZipInput(formatZip(e.target.value))}
        placeholder="例: 100-0001"
        inputMode="numeric"
        spellCheck={false}
      />

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
          onClick={() => {
            setZipInput("")
            setResults(null)
            setErrorMsg(null)
            setStatus("idle")
          }}
        >
          クリア
        </button>

        <button
          type="button"
          className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
          onClick={async () => {
            if (!firstAddress) return
            try {
              await copyToClipboard(firstAddress)
              setCopyMsg("住所をコピーしました")
            } catch {
              setCopyMsg("コピーに失敗しました")
            } finally {
              window.setTimeout(() => setCopyMsg(null), 1500)
            }
          }}
          disabled={!firstAddress}
        >
          先頭結果をコピー
        </button>

        {copyMsg && <span className="text-sm text-neutral-600">{copyMsg}</span>}
      </div>

      <div className="mt-4">
        <div className="text-sm font-medium text-neutral-900">結果</div>

        {status === "idle" && (
          <div className="mt-2 rounded-md border border-neutral-200 bg-neutral-50 p-3 text-sm text-neutral-600">
            郵便番号（7桁）を入力してください。
          </div>
        )}

        {status === "loading" && (
          <div className="mt-2 rounded-md border border-neutral-200 bg-neutral-50 p-3 text-sm text-neutral-600">
            検索中…
          </div>
        )}

        {status === "error" && (
          <div className="mt-2 rounded-md border border-neutral-200 bg-neutral-50 p-3 text-sm text-neutral-700">
            {errorMsg || "検索に失敗しました。"}
          </div>
        )}

        {status === "done" && results && results.length === 0 && (
          <div className="mt-2 rounded-md border border-neutral-200 bg-neutral-50 p-3 text-sm text-neutral-700">
            該当する住所が見つかりませんでした。
          </div>
        )}

        {status === "done" && results && results.length > 0 && (
          <ul className="mt-2 space-y-2">
            {results.map((r, idx) => {
              const address = `${r.address1}${r.address2}${r.address3}`
              const kana = `${r.kana1}${r.kana2}${r.kana3}`
              return (
                <li key={`${r.zipcode}-${idx}`} className="rounded-md border border-neutral-200 bg-white p-3">
                  <div className="text-sm font-medium text-neutral-900">{address}</div>
                  <div className="mt-1 text-sm text-neutral-600">{kana}</div>
                  <div className="mt-2 flex gap-2">
                    <button
                      type="button"
                      className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                      onClick={async () => {
                        try {
                          await copyToClipboard(address)
                          setCopyMsg("住所をコピーしました")
                        } catch {
                          setCopyMsg("コピーに失敗しました")
                        } finally {
                          window.setTimeout(() => setCopyMsg(null), 1500)
                        }
                      }}
                    >
                      住所をコピー
                    </button>

                    <button
                      type="button"
                      className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                      onClick={async () => {
                        try {
                          await copyToClipboard(kana)
                          setCopyMsg("カナをコピーしました")
                        } catch {
                          setCopyMsg("コピーに失敗しました")
                        } finally {
                          window.setTimeout(() => setCopyMsg(null), 1500)
                        }
                      }}
                    >
                      カナをコピー
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      <p className="mt-4 text-xs text-neutral-500">入力内容は保存されません。</p>
    </section>
  )
}
