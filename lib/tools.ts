// lib/tools.ts
export type Tool = {
  slug: string
  titleJa: string
  descriptionJa: string
  category: "text" | "date" | "network" | "dev" | "calc" | "other"
  relatedSlugs: string[]
}

export const tools: Tool[] = [
  {
    slug: "kaigyo-cleaner",
    titleJa: "改行クリーナー（改行削除）",
    descriptionJa: "文章内の不要な改行を一括で削除します。入力内容は保存されません。",
    category: "text",
    relatedSlugs: ["trim-whitespace", "remove-duplicate-lines", "line-count"],
  },
  {
    slug: "zenkaku-hankaku",
    titleJa: "全角⇄半角変換（英数字・カタカナ・記号）",
    descriptionJa: "英数字・カタカナ・記号の全角/半角を相互変換します。入力内容は保存されません。",
    category: "text",
    relatedSlugs: ["kaigyo-cleaner", "trim-whitespace", "remove-duplicate-lines"],
  },
  {
    slug: "mojisuu-count",
    titleJa: "文字数カウント（全角・バイト・行数）",
    descriptionJa: "テキストの文字数（全角/半角目安）・バイト数（UTF-8）・行数を表示します。入力内容は保存されません。",
    category: "text",
    relatedSlugs: ["kaigyo-cleaner", "trim-whitespace", "line-count", "remove-duplicate-lines"],
  },
  {
    slug: "date-with-weekday",
    titleJa: "曜日付き日付変換（和暦対応）",
    descriptionJa: "日付を入力すると曜日付きで表示します（西暦・和暦対応）。入力内容は保存されません。",
    category: "date",
    relatedSlugs: ["mojisuu-count", "kaigyo-cleaner"],
  },
  {
    slug: "zipcode-to-address",
    titleJa: "郵便番号→住所（簡易）",
    descriptionJa: "郵便番号（7桁）から住所を検索します。入力内容は保存されません。",
    category: "other",
    relatedSlugs: ["date-with-weekday", "zenkaku-hankaku", "mojisuu-count"],
  },
  {
    slug: "bank-business-day",
    titleJa: "銀行営業日チェッカー（祝日対応）",
    descriptionJa: "指定日が銀行営業日かどうか（平日・祝日・年末年始）を判定します。入力内容は保存されません。",
    category: "date",
    relatedSlugs: ["date-with-weekday", "business-day-count", "date-diff-days"],
  },
  {
    slug: "regex-tester",
    titleJa: "正規表現テスター（日本語UI）",
    descriptionJa: "正規表現を入力してマッチ結果・グループ・置換結果を確認できます。入力内容は保存されません。",
    category: "dev",
    relatedSlugs: ["url-encode-decode", "json-format", "http-headers"],
  },
  {
    slug: "ip-check",
    titleJa: "IPアドレス確認",
    descriptionJa: "現在のグローバルIPアドレス（IPv4/IPv6）と簡易情報を表示します。入力内容は保存されません。",
    category: "dev",
    relatedSlugs: ["http-headers", "regex-tester"],
  },
  {
    slug: "http-headers",
    titleJa: "HTTPヘッダー表示",
    descriptionJa: "このページへのリクエストで送信されたHTTPヘッダーを表示します。入力内容は保存されません。",
    category: "dev",
    relatedSlugs: ["ip-check", "regex-tester"],
  },
  {
    slug: "whitespace-cleaner",
    titleJa: "空白削除（前後／全体）",
    descriptionJa: "テキストの前後または全文から空白（全角・半角・改行）を削除します。",
    category: "text",
    relatedSlugs: ["kaigyo-cleaner", "line-count"],
  },
  {
    slug: "line-count",
    titleJa: "行数カウント",
    descriptionJa: "テキストの行数をカウントします（空行を含む／除外の切替対応）。",
    category: "text",
    relatedSlugs: ["mojisuu-count", "kaigyo-cleaner", "whitespace-cleaner"],
  },
  {
    slug: "tab-space",
    titleJa: "タブ⇄スペース変換",
    descriptionJa: "タブをスペース（2/4/8）に変換、または指定幅のスペースをタブに変換します。",
    category: "text",
    relatedSlugs: ["whitespace-cleaner", "kaigyo-cleaner", "line-count"],
  },


  // Next tools will be added strictly top-to-bottom later.
]

export function getTool(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug)
}
