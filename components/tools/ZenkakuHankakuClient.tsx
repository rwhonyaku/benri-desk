"use client"

import { useMemo, useState } from "react"

type Mode = "toHankaku" | "toZenkaku"

const toHankakuMap: Record<string, string> = {
  "！": "!", "＂": '"', "＃": "#", "＄": "$", "％": "%", "＆": "&", "＇": "'", "（": "(", "）": ")",
  "＊": "*", "＋": "+", "，": ",", "－": "-", "．": ".", "／": "/", "：": ":", "；": ";", "＜": "<",
  "＝": "=", "＞": ">", "？": "?", "＠": "@", "［": "[", "＼": "\\", "］": "]", "＾": "^", "＿": "_",
  "｀": "`", "｛": "{", "｜": "|", "｝": "}", "～": "~", "　": " "
}

const halfKanaToFull: Record<string, string> = {
  "｡": "。", "｢": "「", "｣": "」", "､": "、", "･": "・", "ｦ": "ヲ", "ｧ": "ァ", "ｨ": "ィ", "ｩ": "ゥ",
  "ｪ": "ェ", "ｫ": "ォ", "ｬ": "ャ", "ｭ": "ュ", "ｮ": "ョ", "ｯ": "ッ", "ｰ": "ー", "ｱ": "ア", "ｲ": "イ",
  "ｳ": "ウ", "ｴ": "エ", "ｵ": "オ", "ｶ": "カ", "ｷ": "キ", "ｸ": "ク", "ｹ": "ケ", "ｺ": "コ", "ｻ": "サ",
  "ｼ": "シ", "ｽ": "ス", "ｾ": "セ", "ｿ": "ソ", "ﾀ": "タ", "ﾁ": "チ", "ﾂ": "ツ", "ﾃ": "テ", "ﾄ": "ト",
  "ﾅ": "ナ", "ﾆ": "ニ", "ﾇ": "ヌ", "ﾈ": "ネ", "ﾉ": "ノ", "ﾊ": "ハ", "ﾋ": "ヒ", "ﾌ": "フ", "ﾍ": "ヘ",
  "ﾎ": "ホ", "ﾏ": "マ", "ﾐ": "ミ", "ﾑ": "ム", "ﾒ": "メ", "ﾓ": "モ", "ﾔ": "ヤ", "ﾕ": "ユ", "ﾖ": "ヨ",
  "ﾗ": "ラ", "ﾘ": "リ", "ﾙ": "ル", "ﾚ": "レ", "ﾛ": "ロ", "ﾜ": "ワ", "ﾝ": "ン", "ﾞ": "゛", "ﾟ": "゜",
}

const toZenkakuMap: Record<string, string> = Object.fromEntries(
  Object.entries(toHankakuMap).map(([zen, han]) => [han, zen])
)

function isAsciiLetterNumber(ch: string) {
  const code = ch.charCodeAt(0)
  return (code >= 0x30 && code <= 0x39) || (code >= 0x41 && code <= 0x5a) || (code >= 0x61 && code <= 0x7a)
}

function normalize(input: string, mode: Mode, opts: { alnum: boolean; kana: boolean; symbols: boolean }) {
  let out = ""
  for (let i = 0; i < input.length; i++) {
    const ch = input[i]
    if (mode === "toHankaku") {
      if (opts.symbols && ch === "　") { out += " "; continue; }
      if (opts.alnum) {
        const code = ch.charCodeAt(0)
        if (code >= 0xff01 && code <= 0xff5e) {
          const conv = String.fromCharCode(code - 0xfee0)
          if (isAsciiLetterNumber(conv)) { out += conv; continue; }
        }
      }
      if (opts.symbols && toHankakuMap[ch]) { out += toHankakuMap[ch]; continue; }
      if (opts.kana) { out += ch.normalize("NFKC"); continue; }
      out += ch
    } else {
      if (opts.kana) {
        const next = input[i + 1]
        const base = halfKanaToFull[ch]
        if (base) {
          if (next === "ﾞ" || next === "ﾟ") {
            out += (base + halfKanaToFull[next]).normalize("NFC")
            i++; continue
          }
          out += base; continue
        }
      }
      if (opts.alnum && isAsciiLetterNumber(ch)) {
        out += String.fromCharCode(ch.charCodeAt(0) + 0xfee0); continue
      }
      if (opts.symbols) {
        if (ch === " ") { out += "　"; continue; }
        if (toZenkakuMap[ch]) { out += toZenkakuMap[ch]; continue; }
      }
      out += ch
    }
  }
  return out
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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output)
      setCopyMsg("コピーしました")
    } catch {
      setCopyMsg("失敗")
    } finally {
      setTimeout(() => setCopyMsg(null), 1500)
    }
  }

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">変換モード</span>
            <div className="flex gap-1 rounded-lg bg-neutral-100 p-1 w-fit">
              <button
                onClick={() => setMode("toHankaku")}
                className={`rounded-md px-6 py-2 text-xs font-bold transition-all ${
                  mode === "toHankaku" ? "bg-white text-blue-600 shadow-sm" : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                全角 → 半角
              </button>
              <button
                onClick={() => setMode("toZenkaku")}
                className={`rounded-md px-6 py-2 text-xs font-bold transition-all ${
                  mode === "toZenkaku" ? "bg-white text-blue-600 shadow-sm" : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                半角 → 全角
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">対象オプション</span>
            <div className="flex flex-wrap gap-4">
              {[
                { label: "英数字", state: alnum, set: setAlnum },
                { label: "カタカナ", state: kana, set: setKana },
                { label: "記号・スペース", state: symbols, set: setSymbols },
              ].map((opt) => (
                <label key={opt.label} className="flex cursor-pointer items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-50 has-[:checked]:border-blue-200 has-[:checked]:bg-blue-50 has-[:checked]:text-blue-700">
                  <input type="checkbox" className="hidden" checked={opt.state} onChange={(e) => opt.set(e.target.checked)} />
                  {opt.state ? "✓ " : "+ "} {opt.label}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Editor Workspace */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-neutral-800 uppercase tracking-tight">変換前テキスト</span>
            <button onClick={() => setInput("")} className="text-[10px] font-bold text-rose-500 hover:underline uppercase">Clear</button>
          </div>
          <textarea
            className="h-80 w-full rounded-xl border border-neutral-200 bg-white p-4 text-sm leading-relaxed text-neutral-800 outline-none transition-all focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="ここに変換したいテキストを入力してください..."
            spellCheck={false}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-neutral-800 uppercase tracking-tight">変換後テキスト</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-neutral-400 font-mono">{output.length} chars</span>
              {copyMsg && <span className="text-[10px] font-bold text-emerald-600 animate-in fade-in slide-in-from-right-2">{copyMsg}</span>}
            </div>
          </div>
          <div className="relative group h-full">
            <textarea
              className="h-80 w-full rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm leading-relaxed text-neutral-600 outline-none resize-none font-sans"
              value={output}
              readOnly
              spellCheck={false}
              placeholder="変換結果がここに表示されます"
            />
            {output && (
              <button
                onClick={handleCopy}
                className="absolute bottom-4 right-4 rounded-lg bg-neutral-900 px-5 py-2 text-xs font-bold text-white shadow-lg transition-all hover:bg-neutral-800 active:scale-95"
              >
                結果をコピー
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-neutral-100 px-4 py-3 text-[10px] text-neutral-400 text-center uppercase tracking-tighter">
        Data processing is performed locally in your browser. Original text is never stored.
      </div>
    </div>
  )
}