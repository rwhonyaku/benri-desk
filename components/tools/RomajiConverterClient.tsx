"use client"

import { useState } from "react"

export default function RomajiConverterClient() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")

  const kanaToRomajiMap: Record<string, string> = {
    'ア': 'a', 'イ': 'i', 'ウ': 'u', 'エ': 'e', 'オ': 'o',
    'カ': 'ka', 'キ': 'ki', 'ク': 'ku', 'ケ': 'ke', 'コ': 'ko',
    'サ': 'sa', 'シ': 'shi', 'ス': 'su', 'セ': 'se', 'ソ': 'so',
    'タ': 'ta', 'チ': 'chi', 'ツ': 'tsu', 'テ': 'te', 'ト': 'to',
    'ナ': 'na', 'ニ': 'ni', 'ヌ': 'nu', 'ネ': 'ne', 'ノ': 'no',
    'ハ': 'ha', 'ヒ': 'hi', 'フ': 'fu', 'ヘ': 'he', 'ホ': 'ho',
    'マ': 'ma', 'ミ': 'mi', 'ム': 'mu', 'メ': 'me', 'モ': 'mo',
    'ヤ': 'ya', 'ユ': 'yu', 'ヨ': 'yo',
    'ラ': 'ra', 'リ': 'ri', 'ル': 'ru', 'レ': 're', 'ロ': 'ro',
    'ワ': 'wa', 'ヲ': 'wo', 'ン': 'n',
    'ガ': 'ga', 'ギ': 'gi', 'グ': 'gu', 'ゲ': 'ge', 'ゴ': 'go',
    'ザ': 'za', 'ジ': 'ji', 'ズ': 'zu', 'ゼ': 'ze', 'ゾ': 'zo',
    'ダ': 'da', 'ヂ': 'ji', 'ヅ': 'zu', 'デ': 'de', 'ド': 'do',
    'バ': 'ba', 'ビ': 'bi', 'ブ': 'bu', 'ベ': 'be', 'ボ': 'bo',
    'パ': 'pa', 'ピ': 'pi', 'プ': 'pu', 'ペ': 'pe', 'ポ': 'po',
    'キャ': 'kya', 'キュ': 'kyu', 'キョ': 'kyo',
    'シャ': 'sha', 'シュ': 'shu', 'ショ': 'sho',
    'チャ': 'cha', 'チュ': 'chu', 'チョ': 'cho',
    'ニャ': 'nya', 'ニュ': 'nyu', 'ニョ': 'nyo',
    'ヒャ': 'hya', 'ヒュ': 'hyu', 'ヒョ': 'hyo',
    'ミャ': 'mya', 'ミュ': 'myu', 'ミョ': 'myo',
    'リャ': 'rya', 'リュ': 'ryu', 'リョ': 'ryo',
    'ギャ': 'gya', 'ギュ': 'gyu', 'ギョ': 'gyo',
    'ジャ': 'ja', 'ジュ': 'ju', 'ジョ': 'jo',
    'ビャ': 'bya', 'ビュ': 'byu', 'ビョ': 'byo',
    'ピャ': 'pya', 'ピュ': 'pyu', 'ピョ': 'pyo',
    'ッ': 't', 'ー': '-'
  }

  const handleConvert = () => {
    let result = input
      .replace(/[ァ-ン]/g, (s) => String.fromCharCode(s.charCodeAt(0) + 0x60)) // Convert small kana to large if needed
      .replace(/ッ(?=[カキクケコサシスセソタチツテトハヒフヘホマミムメモガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ])/g, (match, next) => {
        return "" // Handle Sokuon logic here if you want complexity, simple 't' for now
      })

    const sortedKeys = Object.keys(kanaToRomajiMap).sort((a, b) => b.length - a.length)
    let converted = ""
    let i = 0
    while (i < input.length) {
      let found = false
      for (const key of sortedKeys) {
        if (input.substring(i, i + key.length) === key) {
          converted += kanaToRomajiMap[key]
          i += key.length
          found = true
          break
        }
      }
      if (!found) {
        converted += input[i]
        i++
      }
    }
    setOutput(converted)
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-2 block text-sm font-bold text-neutral-700 italic">Input Katakana</label>
        <textarea
          className="h-40 w-full rounded-lg border border-neutral-300 p-4 text-neutral-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
          placeholder="カタカナを入力してください..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="mt-4 flex gap-2">
          <button
            onClick={handleConvert}
            className="flex-1 rounded-md bg-blue-600 py-2.5 text-sm font-bold text-white hover:bg-blue-700 active:bg-blue-800 transition-all"
          >
            ローマ字に変換
          </button>
          <button
            onClick={() => { setInput(""); setOutput(""); }}
            className="rounded-md border border-neutral-200 px-6 py-2.5 text-sm font-medium hover:bg-neutral-50"
          >
            クリア
          </button>
        </div>
      </div>

      {output && (
        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6">
          <label className="mb-2 block text-sm font-bold text-neutral-700 italic">Result</label>
          <div className="text-2xl font-bold text-neutral-900 break-all">
            {output}
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(output)}
            className="mt-4 text-xs font-bold text-blue-600 hover:underline"
          >
            結果をコピーする
          </button>
        </div>
      )}
    </div>
  )
}