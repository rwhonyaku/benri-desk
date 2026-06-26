export function getYouTubeVideoId(input: string) {
  const text = input.trim()
  if (!text) return ""

  try {
    const url = new URL(text)
    const host = url.hostname.replace(/^www\./, "")

    if (host === "youtu.be") {
      return url.pathname.split("/").filter(Boolean)[0] ?? ""
    }

    if (host === "youtube.com" || host === "m.youtube.com" || host === "music.youtube.com") {
      if (url.pathname === "/watch") return url.searchParams.get("v") ?? ""
      const parts = url.pathname.split("/").filter(Boolean)
      if (["embed", "shorts", "live"].includes(parts[0])) return parts[1] ?? ""
    }
  } catch {
    const match = text.match(/(?:youtu\.be\/|v=|embed\/|shorts\/|live\/)([a-zA-Z0-9_-]{11})/)
    return match?.[1] ?? ""
  }

  return ""
}

export function getYouTubePlaylistId(input: string) {
  const text = input.trim()
  if (!text) return ""

  try {
    const url = new URL(text)
    return url.searchParams.get("list") ?? ""
  } catch {
    const match = text.match(/[?&]list=([a-zA-Z0-9_-]+)/)
    return match?.[1] ?? ""
  }
}

export function getYouTubeChannelInfo(input: string) {
  const text = input.trim()
  if (!text) return { channelId: "", handle: "" }

  try {
    const url = new URL(text)
    const parts = url.pathname.split("/").filter(Boolean)

    if (parts[0] === "channel" && parts[1]) {
      return { channelId: parts[1], handle: "" }
    }

    if (parts[0]?.startsWith("@")) {
      return { channelId: "", handle: parts[0] }
    }
  } catch {
    if (text.startsWith("@")) return { channelId: "", handle: text.split(/[/?#]/)[0] }
    const match = text.match(/youtube\.com\/channel\/([a-zA-Z0-9_-]+)/)
    if (match) return { channelId: match[1], handle: "" }
  }

  return { channelId: "", handle: "" }
}
