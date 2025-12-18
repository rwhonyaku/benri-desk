import { NextResponse } from "next/server"

export const runtime = "nodejs"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const zipcodeRaw = (searchParams.get("zipcode") ?? "").trim()
  const zipcode = zipcodeRaw.replace(/[^\d]/g, "")

  if (!/^\d{7}$/.test(zipcode)) {
    return NextResponse.json(
      { ok: false, error: "ZIPCODE_INVALID", message: "郵便番号は7桁の数字で入力してください。" },
      { status: 400 }
    )
  }

  const url = `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipcode}`

  const res = await fetch(url, { cache: "no-store" })
  const data = await res.json().catch(() => null)

  if (!data || typeof data !== "object") {
    return NextResponse.json(
      { ok: false, error: "UPSTREAM_INVALID", message: "取得に失敗しました。" },
      { status: 502 }
    )
  }

  // ZipCloud returns: { message, results, status }
  return NextResponse.json(
    { ok: true, zipcode, upstream: data },
    {
      status: 200,
      headers: {
        // Lightweight caching on the edge/browser side is fine; data rarely changes.
        "Cache-Control": "public, max-age=300",
      },
    }
  )
}
