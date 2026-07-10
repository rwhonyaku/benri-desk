import { NextResponse } from "next/server"

export const runtime = "nodejs"

export async function GET() {
  // Use Cloudflare trace as a simple, reliable source for IP seen by edge.
  // If it fails, return an error; no retries (keep it boring).
  const res = await fetch("https://www.cloudflare.com/cdn-cgi/trace", { cache: "no-store" })

  if (!res.ok) {
    return NextResponse.json(
      { ok: false, error: "UPSTREAM_ERROR", message: "取得に失敗しました。" },
      { status: 502 }
    )
  }

  const text = await res.text()
  // Format: key=value per line
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean)
  const map: Record<string, string> = {}
  for (const line of lines) {
    const idx = line.indexOf("=")
    if (idx === -1) continue
    const k = line.slice(0, idx)
    const v = line.slice(idx + 1)
    map[k] = v
  }

  return NextResponse.json(
    {
      ok: true,
      ip: map.ip ?? "",
      loc: map.loc ?? "",
      colo: map.colo ?? "",
      http: map.http ?? "",
      tls: map.tls ?? "",
      // Keep raw available for debugging, but still small.
      raw: map,
    },
    {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    }
  )
}
