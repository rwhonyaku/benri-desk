// lib/tools.ts

export type ToolCategory = "text" | "date" | "network" | "dev" | "calc" | "other" | "time" | "youtube"

export type Tool = {
  slug: string
  titleJa: string
  pageTitleJa?: string
  descriptionJa: string
  introLines?: string[]
  category: ToolCategory
  relatedSlugs: string[]
  articleHtml?: string
}

export const categoryMeta: Record<ToolCategory, { labelJa: string; href: string }> = {
  text: { labelJa: "テキスト・文字ツール", href: "/#text" },
  date: { labelJa: "日付・時間・営業日", href: "/#date" },
  network: { labelJa: "Web・IT 基本ツール", href: "/#network" },
  dev: { labelJa: "CSV・データ処理", href: "/#dev" },
  calc: { labelJa: "計算・変換ツール", href: "/#calc" },
  other: { labelJa: "日本向け実務ツール", href: "/#other" },
  time: { labelJa: "時間系シンプル", href: "/#time" },
  youtube: { labelJa: "YouTube補助", href: "/#youtube" },
}

export const tools: Tool[] = [
  // ① テキスト・文字ツール (16)
  { 
    slug: "kaigyo-cleaner", 
    titleJa: "改行クリーナー（改行削除）", 
    descriptionJa: "文章内の不要な改行を一括で削除します。", 
    category: "text", 
    relatedSlugs: ["whitespace-cleaner"],
    articleHtml: `
      <h3>不自然な改行をワンクリックで解消</h3>
      <p>PDF資料やメールの引用文をコピーした際、行ごとに意図しない改行が入ってしまうことがあります。このツールは、それらの改行を一括で削除し、自然な一続きの文章に整形します。</p>
      <p><strong>主な利用シーン：</strong>翻訳ツール（DeepL等）にかける前の文章整形、OCR読み取りテキストの修正、SNS投稿時のレイアウト調整など。ブラウザ内のみで処理されるため、機密情報の入力も安心です。</p>
    `
  },
  { 
    slug: "whitespace-cleaner", 
    titleJa: "空白削除（前後／全体）", 
    descriptionJa: "テキストの前後または全文から空白を削除します。", 
    category: "text", 
    relatedSlugs: ["kaigyo-cleaner"],
    articleHtml: `
      <h3>スペースの混在をきれいにクレンジング</h3>
      <p>全角スペース、半角スペース、タブ文字などが混ざったテキストから、不要な余白を取り除きます。データのクレンジングや、フォーム入力時のバリデーションエラー対策に最適です。</p>
      <p>「前後の空白のみ削除（トリム）」と「すべての空白を削除」の2パターンを選択でき、用途に合わせて柔軟にテキストを加工できます。</p>
    `
  },
  { 
    slug: "zenkaku-hankaku", 
    titleJa: "全角⇄半角変換", 
    pageTitleJa: "全角⇄半角変換｜英数字・カナ・記号をすばやく変換",
    descriptionJa: "英数字・カタカナ・記号の全角/半角を相互変換します。", 
    introLines: [
      "英数字・カタカナ・記号の全角と半角をまとめて変換できるツールです。",
      "フォーム入力前の整形や、社内システムの表記ルール合わせに使えます。",
      "住所の番地だけ半角にしたいときや、フリガナを全角にそろえたいときに便利です。",
    ],
    category: "text", 
    relatedSlugs: ["kana-converter", "mojisuu-count", "whitespace-cleaner"],
    articleHtml: `
      <h3>日本の商習慣に合わせたデータ整形</h3>
      <p>「住所の番地は半角で」「氏名フリガナは全角で」といった、日本独自の入力ルールに対応するための変換ツールです。英数字、カタカナ、記号をそれぞれ個別に指定して変換できます。</p>
    `
  },
  { slug: "kana-converter", titleJa: "ひらがな⇄カタカナ変換", descriptionJa: "ひらがなとカタカナを相互に変換します。", category: "text", relatedSlugs: ["zenkaku-hankaku"] },
  { slug: "romaji-converter", titleJa: "カタカナ⇄ローマ字変換", descriptionJa: "カタカナをローマ字表記に変換して表示します。", category: "text", relatedSlugs: ["kana-converter"] },
  { slug: "case-converter", titleJa: "大文字⇄小文字変換（英字）", descriptionJa: "アルファベットの大文字と小文字を変換します。", category: "text", relatedSlugs: ["zenkaku-hankaku"] },
  {
    slug: "mojisuu-count",
    titleJa: "文字数カウント",
    pageTitleJa: "文字数カウント｜全角・半角・バイト数をまとめて確認",
    descriptionJa: "全角・半角・バイト数をリアルタイムに計測します。",
    introLines: [
      "入力した文章の文字数を、全角・半角・バイト数つきで確認できるツールです。",
      "原稿の文字数調整や、フォームの入力上限チェックに使えます。",
      "たとえば応募文を貼り付ければ、500文字以内に収まっているかすぐ確認できます。",
    ],
    category: "text",
    relatedSlugs: ["line-count", "char-frequency", "zenkaku-hankaku"],
  },
  { slug: "line-count", titleJa: "行数カウント", descriptionJa: "テキストの行数をカウントします。", category: "text", relatedSlugs: ["mojisuu-count"] },
  { slug: "char-frequency", titleJa: "文字出現回数カウント", descriptionJa: "どの文字が何回使われているかを集計します。", category: "text", relatedSlugs: ["mojisuu-count"] },
  { slug: "duplicate-line-remover", titleJa: "テキスト重複行削除", descriptionJa: "重複している行を一括で削除します。", category: "text", relatedSlugs: ["line-sort"] },
  { slug: "line-sort", titleJa: "行並び替え（昇順／降順）", descriptionJa: "テキストを行単位でアルファベット・五十音順に整列します。", category: "text", relatedSlugs: ["duplicate-line-remover"] },
  { slug: "prefix-remover", titleJa: "行頭文字削除", descriptionJa: "各行の先頭から指定した文字数分を削除します。", category: "text", relatedSlugs: ["suffix-remover"] },
  { slug: "suffix-remover", titleJa: "行末文字削除", descriptionJa: "各行の末尾から指定した文字数分を削除します。", category: "text", relatedSlugs: ["prefix-remover"] },
  { slug: "line-numbering", titleJa: "連番付与（行頭／行末）", descriptionJa: "各行に1, 2, 3...と連番を付与します。", category: "text", relatedSlugs: ["line-count"] },
  { slug: "newline-code-converter", titleJa: "改行コード変換（LF/CRLF）", descriptionJa: "OSによる改行コードの違いを変換します。", category: "text", relatedSlugs: ["kaigyo-cleaner"] },
  { slug: "text-diff", titleJa: "テキスト差分比較（簡易）", descriptionJa: "2つの文章を比較して違いを表示します。", category: "text", relatedSlugs: ["kaigyo-cleaner"] },

  // ② 日付・時間・営業日 (12)
  { slug: "date-with-weekday", titleJa: "曜日付き日付変換", descriptionJa: "日付を入力すると曜日と和暦を表示します。", category: "date", relatedSlugs: ["wareki-to-seireki"] },
  { slug: "wareki-to-seireki", titleJa: "和暦→西暦変換", descriptionJa: "令和・平成などの和暦を西暦に変換します。", category: "date", relatedSlugs: ["seireki-to-wareki"] },
  { slug: "seireki-to-wareki", titleJa: "西暦→和暦変換", descriptionJa: "西暦を日本の和暦に変換します。", category: "date", relatedSlugs: ["wareki-to-seireki"] },
  { 
    slug: "age-calculator", 
    titleJa: "年齢計算", 
    descriptionJa: "生年月日から現在の年齢と経過日数を計算します。", 
    category: "date", 
    relatedSlugs: ["date-diff"],
    articleHtml: `
      <h3>誕生日から正確な年齢と日数を算出</h3>
      <p>生年月日を入力するだけで、現在の満年齢、次回の誕生日までの日数、生まれてから今日までの通算日数を計算します。履歴書の記入や、保険の手続き、記念日の確認にご活用ください。</p>
    `
  },
  { slug: "date-diff", titleJa: "日付差分計算（日数）", descriptionJa: "2つの日付の間の日数を計算します。", category: "date", relatedSlugs: ["working-days-count"] },
  { 
    slug: "working-days-count", 
    titleJa: "営業日カウント", 
    pageTitleJa: "営業日カウント｜土日祝を除いた日数を簡単計算",
    descriptionJa: "土日祝を除いた営業日数を計算します。", 
    introLines: [
      "開始日と終了日から、土日祝を除いた営業日数だけを数えるツールです。",
      "納期確認、申請処理の目安、社内スケジュール調整で使えます。",
      "たとえば4月1日から4月10日までの実働日数を知りたいときに便利です。",
    ],
    category: "date", 
    relatedSlugs: ["bank-business-day", "date-diff", "holiday-list"],
    articleHtml: `
      <h3>プロジェクト管理に必須の営業日計算</h3>
      <p>日本の祝日設定に基づき、2つの日付の間にある「営業日（平日）」のみをカウントします。納期までの実働日数の確認や、スケジュール立案に役立ちます。</p>
    `
  },
  {
    slug: "bank-business-day",
    titleJa: "銀行営業日チェッカー",
    pageTitleJa: "銀行営業日チェッカー｜振込日・反映日の目安確認に",
    descriptionJa: "指定日が銀行の窓口営業日か判定します。",
    introLines: [
      "指定した日付が、銀行の窓口営業日にあたるかを確認できるツールです。",
      "振込予定日や着金見込み日の確認前に使うと便利です。",
      "たとえば月末が土日祝に重なるとき、前後の営業日確認に役立ちます。",
    ],
    category: "date",
    relatedSlugs: ["working-days-count", "holiday-list", "date-with-weekday"],
  },
  { slug: "work-duration", titleJa: "勤務日数計算", descriptionJa: "入社日から今日までの合計勤務日数を算出します。", category: "date", relatedSlugs: ["age-calculator"] },
  { slug: "last-day-of-month", titleJa: "月末日取得ツール", descriptionJa: "指定した年月の最終日を求めます。", category: "date", relatedSlugs: ["date-with-weekday"] },
  { slug: "week-number", titleJa: "指定日が第何週か表示", descriptionJa: "その日が月の第何月曜日などを判定します。", category: "date", relatedSlugs: ["date-with-weekday"] },
  { slug: "timezone-converter", titleJa: "タイムゾーン変換（JST/UTC）", descriptionJa: "日本時間と世界標準時を相互変換します。", category: "date", relatedSlugs: ["iso-date-converter"] },
  { slug: "iso-date-converter", titleJa: "ISO日付フォーマット変換", descriptionJa: "日付をISO 8601形式等に整えます。", category: "date", relatedSlugs: ["timezone-converter"] },

  // ③ Web・IT 基本ツール (10)
  { 
    slug: "ip-check", 
    titleJa: "IPアドレス確認", 
    descriptionJa: "現在のグローバルIPアドレスを表示します。", 
    category: "network", 
    relatedSlugs: ["http-headers"],
    articleHtml: `
      <h3>あなたの接続情報を瞬時に確認</h3>
      <p>現在インターネットに接続しているグローバルIPアドレス、ホスト名、および使用中のブラウザ情報を表示します。リモートワークのアクセス制限設定や、ネットワークトラブルの診断にご利用ください。</p>
    `
  },
  { slug: "http-headers", titleJa: "HTTPヘッダー表示", descriptionJa: "送信されているリクエストヘッダーを確認します。", category: "network", relatedSlugs: ["user-agent"] },
  { slug: "user-agent", titleJa: "User-Agent確認", descriptionJa: "ブラウザのユーザーエージェントを表示します。", category: "network", relatedSlugs: ["ip-check"] },
  { slug: "url-encode", titleJa: "URLエンコード／デコード", descriptionJa: "URLに使用できない文字を変換・復元します。", category: "network", relatedSlugs: ["base64-encode"] },
  { slug: "base64-encode", titleJa: "Base64エンコード／デコード", descriptionJa: "データをBase64形式に変換・復元します。", category: "network", relatedSlugs: ["url-encode"] },
  { slug: "uuid-generator", titleJa: "UUID生成（v4）", descriptionJa: "一意の識別子（UUID v4）を生成します。", category: "network", relatedSlugs: ["query-parser"] },
  { slug: "query-parser", titleJa: "クエリパラメータ分解", descriptionJa: "URLのパラメータをリスト形式で表示します。", category: "network", relatedSlugs: ["url-encode"] },
  { slug: "mime-type-checker", titleJa: "MIMEタイプ確認", descriptionJa: "拡張子から適切なMIMEタイプを調べます。", category: "network", relatedSlugs: ["char-code-checker"] },
  { slug: "dns-lookup", titleJa: "DNSレコード確認", descriptionJa: "ドメインの公開情報を確認します。", category: "network", relatedSlugs: ["ip-check"] },
  { slug: "char-code-checker", titleJa: "文字コード確認", descriptionJa: "UTF-8やSJISなどのエンコードを確認します。", category: "network", relatedSlugs: ["mime-type-checker"] },

  // ④ CSV・データ処理 (6)
  { slug: "csv-column-extract", titleJa: "CSV列抽出ツール", descriptionJa: "CSVから特定の列だけを取り出します。", category: "dev", relatedSlugs: ["csv-row-count"] },
  { slug: "csv-row-count", titleJa: "CSV行数カウント", descriptionJa: "CSVファイルのデータ行数を計測します。", category: "dev", relatedSlugs: ["csv-duplicate-remover"] },
  { slug: "csv-duplicate-remover", titleJa: "CSV重複行削除", descriptionJa: "CSV内の重複データを整理します。", category: "dev", relatedSlugs: ["csv-column-extract"] },
  { slug: "csv-empty-line-cleaner", titleJa: "CSV空白行削除", descriptionJa: "データのない空行を除去します。", category: "dev", relatedSlugs: ["csv-header-remover"] },
  { slug: "csv-header-remover", titleJa: "CSVヘッダー削除", descriptionJa: "1行目の見出し行を削除します。", category: "dev", relatedSlugs: ["csv-column-extract"] },
  { slug: "tsv-csv-converter", titleJa: "TSV⇄CSV変換", descriptionJa: "タブ区切りとカンマ区切りを相互変換します。", category: "dev", relatedSlugs: ["csv-column-extract"] },

  // ⑤ 計算・変換ツール (6)
  { 
    slug: "tax-calc", 
    titleJa: "消費税計算", 
    descriptionJa: "内税・外税を瞬時に計算します。", 
    category: "calc", 
    relatedSlugs: ["discount-calc"],
    articleHtml: `
      <h3>軽減税率にも対応した税込・税抜計算</h3>
      <p>標準税率10%と軽減税率8%を切り替えて計算できます。税込金額から本体価格を算出する「内税計算」にも対応しており、レシートの確認や見積書作成に便利です。</p>
    `
  },
  {
    slug: "unit-converter",
    titleJa: "単位変換",
    pageTitleJa: "単位変換｜cm・kg・インチなどを簡単に変換",
    descriptionJa: "長さや重さの単位を相互変換します。",
    introLines: [
      "長さや重さなどの単位を簡単に変換できます。",
      "cm・kg・インチなど、よく使う単位にすばやく対応しています。",
      "例：100cm → m、kg → lb などをその場で確認できます。",
    ],
    category: "calc",
    relatedSlugs: ["time-unit-converter", "file-size-converter"],
  },
  { slug: "time-unit-converter", titleJa: "秒⇄分⇄時間変換", descriptionJa: "時間の単位を細かく換算します。", category: "calc", relatedSlugs: ["unit-converter"] },
  { slug: "file-size-converter", titleJa: "ファイルサイズ換算", descriptionJa: "KB/MB/GBの単位を変換します。", category: "calc", relatedSlugs: ["unit-converter"] },
  { slug: "discount-calc", titleJa: "割引率計算", descriptionJa: "〇％OFFの価格を計算します。", category: "calc", relatedSlugs: ["percentage-diff"] },
  { slug: "percentage-diff", titleJa: "パーセンテージ差分計算", descriptionJa: "増減率（前年比など）を算出します。", category: "calc", relatedSlugs: ["tax-calc"] },

  // ⑥ 日本向け実務ツール (6)
  { 
    slug: "zipcode-to-address", 
    titleJa: "郵便番号→住所（簡易）", 
    descriptionJa: "郵便番号から住所を検索します。", 
    category: "other", 
    relatedSlugs: ["zipcode-format-check"],
    articleHtml: `
      <h3>日本の住所入力をスムーズに</h3>
      <p>7桁の郵便番号を入力するだけで、該当する都道府県と市区町村を自動的に表示します。最新の郵便番号データに基づき、正確な住所情報を引き出します。</p>
    `
  },
  { slug: "zipcode-format-check", titleJa: "郵便番号形式チェック", descriptionJa: "入力された値が郵便番号として正しいか判定します。", category: "other", relatedSlugs: ["zipcode-to-address"] },
  { slug: "phone-format-check", titleJa: "電話番号形式チェック", descriptionJa: "日本の電話番号形式に合致するか判定します。", category: "other", relatedSlugs: ["zipcode-format-check"] },
  { slug: "mynumber-check", titleJa: "マイナンバー桁数チェック", descriptionJa: "桁数と構成が形式的に正しいか確認します。", category: "other", relatedSlugs: ["phone-format-check"] },
  { slug: "password-len-check", titleJa: "パスワード文字数チェック", descriptionJa: "パスワードの長さと強度を判定します。", category: "other", relatedSlugs: ["mynumber-check"] },
  { slug: "holiday-list", titleJa: "祝日一覧表示", descriptionJa: "指定した年の日本の祝日を表示します。", category: "other", relatedSlugs: ["bank-business-day"] },

  // ⑦ 時間系シンプル (2)
  { slug: "simple-timer", titleJa: "簡易タイマー", descriptionJa: "シンプルなキッチンタイマーです。", category: "time", relatedSlugs: ["stopwatch"] },
  { slug: "stopwatch", titleJa: "ストップウォッチ", descriptionJa: "経過時間を計測するシンプルなストップウォッチです。", category: "time", relatedSlugs: ["simple-timer"] },

  // ⑧ YouTube補助 (4)
  { slug: "yt-thumb-download", titleJa: "YouTubeサムネイル取得", descriptionJa: "動画URLからサムネイル画像を抽出します。", category: "youtube", relatedSlugs: ["yt-url-shorten"] },
  { slug: "yt-url-shorten", titleJa: "YouTube URL短縮", descriptionJa: "長いURLを短い形式に整えます。", category: "youtube", relatedSlugs: ["yt-video-id"] },
  { slug: "yt-video-id", titleJa: "YouTube動画ID確認", descriptionJa: "URLから動画固有のIDを抽出します。", category: "youtube", relatedSlugs: ["yt-embed-gen"] },
  { slug: "yt-embed-gen", titleJa: "YouTube埋め込みコード生成", descriptionJa: "ブログ等に貼る埋め込み用HTMLを作成します。", category: "youtube", relatedSlugs: ["yt-thumb-download"] },
]

export function getTool(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug)
}
