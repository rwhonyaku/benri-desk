"use client"

import { useMemo, useState } from "react"

type MatchRow = {
  index: number
  match: string
  groups: string[]
}

function safeSlice(s: string, max: number) {
  return s.length > max ? s.slice(0, max) : s
}

function escapeRegExpLiteral(s: string) {
  // for displaying only; not used for compiling
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function buildHighlightedHTML(text: string, ranges: Array<{ start: number; end: number }>) {
  // ranges must be non-overlapping and sorted
  let out = ""
  let pos = 0
  for (const r of ranges) {
    out += escapeHtml(text.slice(pos, r.start))
    out += `<mark class="rounded bg-yellow-200 px-0.5">${escapeHtml(text.slice(r.start, r.end))}</mark>`
    pos = r.end
  }
  out += escapeHtml(text.slice(pos))
  return out
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
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

export default function RegexTesterClient() {
  const [pattern, setPattern] = useState("")
  const [flags, setFlags] = useState("g")
  const [text, setText] = useState("")
  const [replaceMode, setReplaceMode] = useState(false)
  const [replacement, setReplacement] = useState("")
  const [copyMsg, setCopyMsg] = useState<string | null>(null)

  // Guard rails (keeps UI responsive)
  const patternSafe = safeSlice(pattern, 300)
  const flagsSafe = safeSlice(flags, 6).replace(/[^gimsuyd]/g, "")
  const textSafe = safeSlice(text, 20000)
  const replacementSafe = safeSlice(replacement, 2000)

  const compiled = useMemo(() => {
    try {
      const re = new RegExp(patternSafe, flagsSafe || "")
      return { ok: true as const, re }
    } catch (e: any) {
      return { ok: false as const, error: e?.message ?? "正規表現が無効です。" }
    }
  }, [patternSafe, flagsSafe])

  const analysis = useMemo(() => {
    if (!compiled.ok) {
      return {
        ok: false as const,
        error: compiled.error,
        matches: [] as MatchRow[],
        highlightedHTML: escapeHtml(textSafe),
        replaceResult: "",
        matchCount: 0,
      }
    }

    const re = compiled.re
    const matches: MatchRow[] = []
    const ranges: Array<{ start: number; end: number }> = []

    // Avoid infinite loops for zero-length matches with /g
    const global = re.global

    if (global) re.lastIndex = 0

    // Collect matches (limit to keep UI fast)
    const MAX_MATCHES = 200
    let guard = 0

    while (true) {
      if (matches.length >= MAX_MATCHES) break
      if (guard++ > 5000) break

      const m = re.exec(textSafe)
      if (!m) break

      const idx = m.index ?? 0
      const whole = m[0] ?? ""
      matches.push({
        index: idx,
        match: whole,
        groups: m.slice(1).map((g) => (g === undefined ? "" : String(g))),
      })

      if (whole.length > 0) {
        ranges.push({ start: idx, end: idx + whole.length })
      }

      // zero-length match + /g would loop forever unless we advance
      if (global && whole.length === 0) {
        re.lastIndex = (re.lastIndex ?? idx) + 1
      }

      if (!global) break
    }

    // Sort/merge ranges to be safe
    ranges.sort((a, b) => a.start - b.start)
    const merged: Array<{ start: number; end: number }> = []
    for (const r of ranges) {
      const last = merged[merged.length - 1]
      if (!last || r.start > last.end) merged.push({ ...r })
      else last.end = Math.max(last.end, r.end)
    }

    const highlightedHTML = buildHighlightedHTML(textSafe, merged)

    let replaceResult = ""
    if (replaceMode) {
      try {
        // Ensure /g not required; replace() respects global automatically if regex has g
        replaceResult = textSafe.replace(re, replacementSafe)
      } catch (e: any) {
        replaceResult = `（置換エラー）${e?.message ?? ""}`
      }
    }

    return {
      ok: true as const,
      error: "",
      matches,
      highlightedHTML,
      replaceResult,
      matchCount: matches.length,
    }
  }, [compiled, textSafe, replaceMode, replacementSafe])

  const regexDisplay = useMemo(() => {
    const f = flagsSafe || ""
    return `/${patternSafe || escapeRegExpLiteral("（未入力）")}/${f}`
  }, [patternSafe, flagsSafe])

  return (
    <section className="rounded-lg border border-neutral-200 bg-white p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="text-sm font-medium text-neutral-900">正規表現</div>
        <div className="text-xs text-neutral-500">入力内容は保存されません</div>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-3">
        <div className="md:col-span-2">
          <label className="text-xs text-neutral-500">パターン</label>
          <input
            className="mt-1 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:ring-2 focus:ring-neutral-200"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="例: ^[A-Za-z0-9_]+$"
            spellCheck={false}
          />
        </div>

        <div>
          <label className="text-xs text-neutral-500">フラグ</label>
          <input
            className="mt-1 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:ring-2 focus:ring-neutral-200"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            placeholder="例: gmi"
            spellCheck={false}
          />
          <div className="mt-1 text-[11px] text-neutral-500">使用可: g i m s u y d</div>
        </div>
      </div>

      <div className="mt-2 text-xs text-neutral-600">
        現在: <span className="font-mono">{regexDisplay}</span>
      </div>

      {!analysis.ok && (
        <div className="mt-3 rounded-md border border-neutral-200 bg-neutral-50 p-3 text-sm text-neutral-700">
          エラー: {analysis.error}
        </div>
      )}

      <div className="mt-5">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-neutral-900">テスト文字列</div>
          <div className="text-xs text-neutral-500">最大 20,000 文字（表示・処理負荷対策）</div>
        </div>

        <textarea
          className="mt-2 h-56 w-full rounded-md border border-neutral-200 bg-white p-3 text-sm leading-6 text-neutral-900 outline-none focus:ring-2 focus:ring-neutral-200"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="ここにテスト対象の文字列を貼り付けてください。"
          spellCheck={false}
        />

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
            onClick={() => setText("")}
          >
            クリア
          </button>

          <label className="ml-2 flex items-center gap-2 text-sm text-neutral-700">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={replaceMode}
              onChange={(e) => setReplaceMode(e.target.checked)}
            />
            置換モード
          </label>

          {copyMsg && <span className="text-sm text-neutral-600">{copyMsg}</span>}
        </div>
      </div>

      {replaceMode && (
        <div className="mt-4">
          <div className="text-sm font-medium text-neutral-900">置換文字列</div>
          <input
            className="mt-2 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:ring-2 focus:ring-neutral-200"
            value={replacement}
            onChange={(e) => setReplacement(e.target.value)}
            placeholder="例: $1"
            spellCheck={false}
          />
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
              onClick={async () => {
                try {
                  await copyToClipboard(analysis.replaceResult)
                  setCopyMsg("置換結果をコピーしました")
                } catch {
                  setCopyMsg("コピーに失敗しました")
                } finally {
                  window.setTimeout(() => setCopyMsg(null), 1500)
                }
              }}
              disabled={!compiled.ok || textSafe.length === 0}
            >
              置換結果をコピー
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-neutral-900">マッチ一覧</div>
            <div className="text-xs text-neutral-500">件数: {analysis.matchCount.toLocaleString()}（最大200）</div>
          </div>

          {compiled.ok && analysis.matchCount === 0 && (
            <div className="mt-2 text-sm text-neutral-700">マッチはありません。</div>
          )}

          {compiled.ok && analysis.matchCount > 0 && (
            <div className="mt-3 space-y-3">
              {analysis.matches.map((m, i) => (
                <div key={`${m.index}-${i}`} className="rounded-md border border-neutral-200 bg-white p-3">
                  <div className="text-xs text-neutral-500">#{i + 1} / index {m.index}</div>
                  <div className="mt-1 font-mono text-sm text-neutral-900 break-words">{m.match}</div>

                  {m.groups.length > 0 && (
                    <div className="mt-2">
                      <div className="text-xs text-neutral-500">グループ</div>
                      <ul className="mt-1 space-y-1">
                        {m.groups.map((g, gi) => (
                          <li key={gi} className="font-mono text-xs text-neutral-800 break-words">
                            ${gi + 1}: {g}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
          <div className="text-sm font-medium text-neutral-900">ハイライト表示</div>
          <div className="mt-2 rounded-md border border-neutral-200 bg-white p-3 text-sm leading-6 text-neutral-900">
            <div
              className="whitespace-pre-wrap break-words"
              dangerouslySetInnerHTML={{ __html: analysis.highlightedHTML }}
            />
          </div>

          {replaceMode && (
            <>
              <div className="mt-4 text-sm font-medium text-neutral-900">置換結果</div>
              <textarea
                className="mt-2 h-40 w-full rounded-md border border-neutral-200 bg-white p-3 text-sm leading-6 text-neutral-900 outline-none"
                value={analysis.replaceResult}
                readOnly
                spellCheck={false}
              />
            </>
          )}

          <div className="mt-3 text-xs text-neutral-500">
            注: 複雑な正規表現はブラウザが重くなる場合があります。必要なら入力文字数を減らしてください。
          </div>
        </div>
      </div>
    </section>
  )
}
