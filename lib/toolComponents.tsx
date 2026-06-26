import dynamic from 'next/dynamic'
import type { ComponentType } from "react"

// We use ComponentType<any> to satisfy the dynamic loader's type requirements
export const toolComponents: Record<string, ComponentType<any>> = {
  // ① テキスト・文字ツール
  "kaigyo-cleaner": dynamic(() => import("@/components/tools/KaigyoCleanerClient")),
  "whitespace-cleaner": dynamic(() => import("@/components/tools/WhitespaceCleanerClient")),
  "zenkaku-hankaku": dynamic(() => import("@/components/tools/ZenkakuHankakuClient")),
  "kana-converter": dynamic(() => import("@/components/tools/KanaConverterClient")),
  "romaji-converter": dynamic(() => import("@/components/tools/RomajiConverterClient")),
  "case-converter": dynamic(() => import("@/components/tools/CaseConverterClient")),
  "mojisuu-count": dynamic(() => import("@/components/tools/MojisuuCountClient")),
  "line-count": dynamic(() => import("@/components/tools/LineCountClient")),
  "char-frequency": dynamic(() => import("@/components/tools/CharFrequencyClient")),
  "duplicate-line-remover": dynamic(() => import("@/components/tools/DuplicateLineRemoverClient")),
  "line-sort": dynamic(() => import("@/components/tools/LineSortClient")),
  "prefix-remover": dynamic(() => import("@/components/tools/PrefixRemoverClient")),
  "suffix-remover": dynamic(() => import("@/components/tools/SuffixRemoverClient")),
  "line-numbering": dynamic(() => import("@/components/tools/LineNumberingClient")),
  "newline-code-converter": dynamic(() => import("@/components/tools/NewlineCodeConverterClient")),
  "text-diff": dynamic(() => import("@/components/tools/TextDiffClient")),

  // ② 日付・時間・営業日
  "date-with-weekday": dynamic(() => import("@/components/tools/DateWithWeekdayClient")),
  "wareki-to-seireki": dynamic(() => import("@/components/tools/WarekiToSeirekiClient")),
  "seireki-to-wareki": dynamic(() => import("@/components/tools/SeirekiToWarekiClient")),
  "age-calculator": dynamic(() => import("@/components/tools/AgeCalculatorClient")),
  "date-diff": dynamic(() => import("@/components/tools/DateDiffClient")),
  "working-days-count": dynamic(() => import("@/components/tools/WorkingDaysCountClient")),
  "bank-business-day": dynamic(() => import("@/components/tools/BankBusinessDayClient")),
  "next-business-day": dynamic(() => import("@/components/tools/NextBusinessDayClient")),
  "payment-due-date": dynamic(() => import("@/components/tools/PaymentDueDateClient")),
  "work-duration": dynamic(() => import("@/components/tools/WorkDurationClient")),
  "last-day-of-month": dynamic(() => import("@/components/tools/LastDayOfMonthClient")),
  "week-number": dynamic(() => import("@/components/tools/WeekNumberClient")),
  "fiscal-year-calculator": dynamic(() => import("@/components/tools/FiscalYearCalculatorClient")),
  "timezone-converter": dynamic(() => import("@/components/tools/TimezoneConverterClient")),
  "iso-date-converter": dynamic(() => import("@/components/tools/IsoDateConverterClient")),

  // ③ Web・IT 基本ツール
  "ip-check": dynamic(() => import("@/components/tools/IpCheckClient")),
  "http-headers": dynamic(() => import("@/components/tools/HttpHeadersClient")),
  "user-agent": dynamic(() => import("@/components/tools/UserAgentClient")),
  "url-encode": dynamic(() => import("@/components/tools/UrlEncodeClient")),
  "base64-encode": dynamic(() => import("@/components/tools/Base64EncodeClient")),
  "uuid-generator": dynamic(() => import("@/components/tools/UuidGeneratorClient")),
  "query-parser": dynamic(() => import("@/components/tools/QueryParserClient")),
  "mime-type-checker": dynamic(() => import("@/components/tools/MimeTypeCheckerClient")),
  "dns-lookup": dynamic(() => import("@/components/tools/DnsLookupClient")),
  "char-code-checker": dynamic(() => import("@/components/tools/CharCodeCheckerClient")),

  // ④ CSV・データ処理
  "csv-column-extract": dynamic(() => import("@/components/tools/CsvColumnExtractClient")),
  "csv-row-count": dynamic(() => import("@/components/tools/CsvRowCountClient")),
  "csv-duplicate-remover": dynamic(() => import("@/components/tools/CsvDuplicateRemoverClient")),
  "csv-empty-line-cleaner": dynamic(() => import("@/components/tools/CsvEmptyLineCleanerClient")),
  "csv-header-remover": dynamic(() => import("@/components/tools/CsvHeaderRemoverClient")),
  "tsv-csv-converter": dynamic(() => import("@/components/tools/TsvCsvConverterClient")),
  "csv-formatter": dynamic(() => import("@/components/tools/CsvFormatterClient")),
  "csv-sort": dynamic(() => import("@/components/tools/CsvSortClient")),
  "csv-quote-escape": dynamic(() => import("@/components/tools/CsvQuoteEscapeClient")),
  "csv-transpose": dynamic(() => import("@/components/tools/CsvTransposeClient")),
  "csv-column-swap": dynamic(() => import("@/components/tools/CsvColumnSwapClient")),
  "csv-merge": dynamic(() => import("@/components/tools/CsvMergeClient")),
  "csv-split": dynamic(() => import("@/components/tools/CsvSplitClient")),
  "json-csv-converter": dynamic(() => import("@/components/tools/JsonCsvConverterClient")),

  // ⑤ 計算・変換ツール
  "unit-converter": dynamic(() => import("@/components/tools/UnitConverterClient")),
  "time-unit-converter": dynamic(() => import("@/components/tools/TimeUnitConverterClient")),
  "file-size-converter": dynamic(() => import("@/components/tools/FileSizeConverterClient")),
  "tax-calc": dynamic(() => import("@/components/tools/TaxCalcClient")),
  "discount-calc": dynamic(() => import("@/components/tools/DiscountCalcClient")),
  "percentage-diff": dynamic(() => import("@/components/tools/PercentageDiffClient")),

  // ⑥ 日本向け実務ツール
  "zipcode-to-address": dynamic(() => import("@/components/tools/ZipcodeToAddressClient")),
  "zipcode-format-check": dynamic(() => import("@/components/tools/ZipcodeFormatCheckClient")),
  "phone-format-check": dynamic(() => import("@/components/tools/PhoneFormatCheckClient")),
  "mynumber-check": dynamic(() => import("@/components/tools/MynumberCheckClient")),
  "password-len-check": dynamic(() => import("@/components/tools/PasswordLenCheckClient")),
  "holiday-list": dynamic(() => import("@/components/tools/HolidayListClient")),

  // ⑦ 時間系シンプル
  "simple-timer": dynamic(() => import("@/components/tools/SimpleTimerClient")),
  "stopwatch": dynamic(() => import("@/components/tools/StopwatchClient")),

  // ⑧ YouTube補助
  "yt-thumb-download": dynamic(() => import("@/components/tools/YtThumbDownloadClient")),
  "yt-url-shorten": dynamic(() => import("@/components/tools/YtUrlShortenClient")),
  "yt-video-id": dynamic(() => import("@/components/tools/YtVideoIdClient")),
  "yt-embed-gen": dynamic(() => import("@/components/tools/YtEmbedGenClient")),
  "yt-timestamp-generator": dynamic(() => import("@/components/tools/YtTimestampGeneratorClient")),
  "yt-playlist-id": dynamic(() => import("@/components/tools/YtPlaylistIdClient")),
  "yt-channel-id": dynamic(() => import("@/components/tools/YtChannelIdClient")),
}
