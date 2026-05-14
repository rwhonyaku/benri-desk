"use client"

import { useState } from "react"

export default function DnsLookupClient() {
  const [domain, setDomain] = useState("")

  const handleLookup = () => {
    // Client-side can only realistically link to external lookup tools 
    // or call an API you'd have to build.
    window.open(`https://toolbox.googleapps.com/apps/dig/#A/${domain}`, "_blank")
  }

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-4 block text-sm font-bold text-neutral-700 italic">ドメイン名を入力</label>
        <input
          type="text"
          className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-lg font-bold text-neutral-900 outline-none focus:border-blue-500"
          placeholder="example.com"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        />
        <button
          onClick={handleLookup}
          className="mt-4 w-full rounded-md bg-neutral-800 py-3 text-sm font-bold text-white hover:bg-neutral-900"
        >
          DNSレコードを確認 (外部サイト)
        </button>
      </div>
      <p className="text-center text-[10px] text-neutral-400">
        Google Admin Toolboxを使用してAレコード等の詳細を表示します。
      </p>
    </div>
  )
}