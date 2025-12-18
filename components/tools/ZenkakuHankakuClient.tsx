"use client"

import { useMemo, useState } from "react"

type Mode = "toHankaku" | "toZenkaku"

const toHankakuMap: Record<string, string> = {
  // punctuation (common)
  "！": "!",
  "＂": '"',
  "＃": "#",
  "＄": "$",
  "％": "%",
  "＆": "&",
  "＇": "'",
  "（": "(",
  "）": ")",
  "＊": "*",
  "＋": "+",
  "，": ",",
  "－": "-",
  "．": ".",
  "／": "/",
  "：": ":",
  "；": ";",
  "＜": "<",
  "＝": "=",
  "＞": ">",
  "？": "?",
  "＠": "@",
  "［": "[",
  "＼": "\\",
  "］": "]",
  "＾": "^",
  "＿": "_",
  "｀": "`",
  "｛": "{",
  "｜": "|",
  "｝": "}",
  "～": "~",
  "　": " ", // full-width space
}

// Halfwidth katakana -> fullwidth base (minimal but practical set)
const halfKanaToFull: Record<string, string> = {
  "｡": "。",
  "｢": "「",
  "｣": "」",
  "､": "、",
  "･": "・",
  "ｦ": "ヲ",
  "ｧ": "ァ",
  "ｨ": "ィ",
  "ｩ": "ゥ",
  "ｪ": "ェ",
  "ｫ": "ォ",
  "ｬ": "ャ",
  "ｭ": "ュ",
  "ｮ": "ョ",
  "ｯ": "ッ",
  "ｰ": "ー",
  "ｱ": "ア",
  "ｲ": "イ",
  "ｳ": "ウ",
  "ｴ": "エ",
  "ｵ": "オ",
  "ｶ": "カ",
  "ｷ": "キ",
  "ｸ": "ク",
  "ｹ": "ケ",
  "ｺ": "コ",
  "ｻ": "サ",
  "ｼ": "シ",
  "ｽ": "ス",
  "ｾ": "セ",
  "ｿ": "ソ",
  "ﾀ": "タ",
  "ﾁ": "チ",
  "ﾂ": "ツ",
  "ﾃ": "テ",
  "ﾄ": "ト",
  "ﾅ": "ナ",
  "ﾆ": "ニ",
  "ﾇ": "ヌ",
  "ﾈ": "ネ",
  "ﾉ": "ノ",
  "ﾊ": "ハ",
  "ﾋ": "ヒ",
  "ﾌ": "フ",
  "ﾍ": "ヘ",
  "ﾎ": "ホ",
  "ﾏ": "マ",
  "ﾐ": "ミ",
  "ﾑ": "ム",
  "ﾒ": "メ",
  "ﾓ": "モ",
  "ﾔ": "ヤ",
  "ﾕ": "ユ",
  "ﾖ": "ヨ",
  "ﾗ": "ラ",
  "ﾘ": "リ",
  "ﾙ": "ル",
  "ﾚ": "レ",
  "ﾛ": "ロ",
  "ﾜ": "ワ",
  "ﾝ": "ン",
  "ﾞ": "゛",
  "ﾟ": "゜",
}

// Build reverse maps
const toZenkakuMap: Record<string, string> = Object.fromEntries(
  Object.entries(toHankakuMap).map(([zen, han]) => [han, zen])
)

function isAsciiLetterNumber(ch: string) {
  const code = ch.charCodeAt(0)
  return (
    (code >= 0x30 && code <= 0x39) || // 0-9
    (code >= 0x41 && code <= 0x5a) || // A-Z
    (code >= 0x61 && code <= 0x7a) // a-z
  )
}

function toHankakuAscii(ch: string) {
  const code = ch.charCodeAt(0)
  // Fullwidth ASCII range: FF01–FF5E maps to 21–7E by -0xFEE0
  if (code >= 0xff01 && code <= 0xff5e) return String.fromCharCode(code - 0xfee0)
  return ch
}

function toZenkakuAscii(ch: string) {
  const code = ch.charCodeAt(0)
  if (code >= 0x21 && code <= 0x7e) return String.fromCharCode(code + 0xfee0)
  return ch
}

function normalize(input: string, mode: Mode, opts: { alnum: boolean; kana: boolean; symbols: boolean }) {
  // Note: we do NOT touch hiragana/kanji.
  let out = ""
  const s = input

  for (let i = 0; i < s.length; i++) {
    const ch = s[i]

    if (mode === "toHankaku") {
      // Halfwidth space conversion: include under symbols
      if (opts.symbols && ch === "　") {
        out += " "
        continue
      }

      // Fullwidth alnum
      if (opts.alnum) {
        const conv = toHankakuAscii(ch)
        if (conv !== ch && isAsciiLetterNumber(conv)) {
          out += conv
          continue
        }
      }

      // Fullwidth punctuation/symbols
      if (opts.symbols && toHankakuMap[ch]) {
        out += toHankakuMap[ch]
        continue
      }

      // Katakana: use Unicode normalization for the heavy lifting
      // NFKC converts fullwidth forms and compatibility kana.
      if (opts.kana) {
        const nfkc = ch.normalize("NFKC")
        out += nfkc
        continue
      }

      out += ch
    } else {
      // toZenkaku
      // Halfwidth katakana -> fullwidth (handle dakuten combos like ｶﾞ)
      if (opts.kana) {
        const next = s[i + 1]
        const base = halfKanaToFull[ch]
        if (base) {
          if (next === "ﾞ" || next === "ﾟ") {
            const mark = halfKanaToFull[next] // ゛ or ゜
            // Combine using NFC to get e.g. ガ
            out += (base + mark).normalize("NFC")
            i++
            continue
          }
          out += base
          continue
        }
      }

      // ASCII alnum to fullwidth
      if (opts.alnum && isAsciiLetterNumber(ch)) {
        out += toZenkakuAscii(ch)
        continue
      }

      // ASCII punctuation/symbols + space
      if (opts.symbols) {
        if (ch === " ") {
          out += "　"
          continue
        }
        if (toZenkakuMap[ch]) {
          out += toZenkakuMap[ch]
          continue
        }
      }

      out += ch
    }
  }

  return out
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

export default function ZenkakuHankakuClient() {
  const [input, setInput] = useState("")
  const [mode, setMode] = useState<Mode>("toHankaku")
  const [alnum, setAlnum] = useState(true)
  const [kana, setKana] = useState(true)
  const [symbols, setSymbols] = useState(true)
  const [copyMsg, setCopyMsg] = useState<string | null>(null)

  const output = useMemo(
    () => normalize(input, mode, { alnum, kana, symbols }),
    [input, mode, alnum, kana, symbols]
  )

  const stats = useMemo(() => {
    const inChars = input.length
    const outChars = output.length
    return { inChars, outChars }
  }, [input, output])

  return (
    <section className="rounded-lg border border-neutral-200 bg-white p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="text-sm font-medium text-neutral-900">変換</div>

        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
          <label className="flex items-center gap-2 text-sm text-neutral-700">
            <input
              type="radio"
              name="mode"
              checked={mode === "toHankaku"}
              onChange={() => setMode("toHankaku")}
            />
            全角 → 半角
          </label>
          <label className="flex items-center gap-2 text-sm text-neutral-700">
            <input
              type="radio"
              name="mode"
              checked={mode === "toZenkaku"}
              onChange={() => setMode("toZenkaku")}
            />
            半角 → 全角
          </label>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm text-neutral-700">
          <input type="checkbox" className="h-4 w-4" checked={alnum} onChange={(e) => setAlnum(e.target.checked)} />
          英数字
        </label>
        <label className="flex items-center gap-2 text-sm text-neutral-700">
          <input type="checkbox" className="h-4 w-4" checked={kana} onChange={(e) => setKana(e.target.checked)} />
          カタカナ
        </label>
        <label className="flex items-center gap-2 text-sm text-neutral-700">
          <input type="checkbox" className="h-4 w-4" checked={symbols} onChange={(e) => setSymbols(e.target.checked)} />
          記号・スペース
        </label>
        <div className="ml-auto text-xs text-neutral-500">
          入力 {stats.inChars.toLocaleString()} 文字 / 出力 {stats.outChars.toLocaleString()} 文字
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <div className="text-sm font-medium text-neutral-900">入力</div>
          <textarea
            className="mt-2 h-56 w-full rounded-md border border-neutral-200 bg-white p-3 text-sm leading-6 text-neutral-900 outline-none focus:ring-2 focus:ring-neutral-200"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="ここにテキストを貼り付けてください。"
            spellCheck={false}
          />
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
              onClick={() => setInput("")}
            >
              クリア
            </button>
          </div>
        </div>

        <div>
          <div className="text-sm font-medium text-neutral-900">出力</div>
          <textarea
            className="mt-2 h-56 w-full rounded-md border border-neutral-200 bg-neutral-50 p-3 text-sm leading-6 text-neutral-900 outline-none"
            value={output}
            readOnly
            spellCheck={false}
          />
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
              onClick={async () => {
                try {
                  await copyToClipboard(output)
                  setCopyMsg("コピーしました")
                } catch {
                  setCopyMsg("コピーに失敗しました")
                } finally {
                  window.setTimeout(() => setCopyMsg(null), 1500)
                }
              }}
              disabled={output.length === 0}
            >
              コピー
            </button>
            {copyMsg && <span className="text-sm text-neutral-600">{copyMsg}</span>}
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs text-neutral-500">入力内容は保存されません。処理はこのブラウザ内で完結します。</p>
    </section>
  )
}
