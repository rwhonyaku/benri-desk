import { NextResponse } from "next/server"

export const runtime = "nodejs"

export async function GET(req: Request) {
  const h = new Headers(req.headers)

  // Remove obvious sensitive/huge ones (still keep it useful)
  h.delete("cookie")
  h.delete("authorization")

  const entries = Array.from(h.entries())
    .map(([k, v]) => [k.toLowerCase(), v] as const)
    .sort((a, b) => a[0].localeCompare(b[0]))

  return NextResponse.json(
    {
      ok: true,
      headers: entries.map(([key, value]) => ({ key, value })),
      count: entries.length,
    },
    {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    }
  )
}
