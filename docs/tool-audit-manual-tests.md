# Benri-Desk Manual Tool Audit

## Scope
- Prioritize correctness checks for the current high-value tools.
- Use these cases when validating behavior after small production-safe fixes.

## TSV⇄CSV変換
- TSV入力:
  - `名前\t年齢\n山田\t30`
  - 期待結果: `名前,年齢\n山田,30`
- CSV入力:
  - `name,city\nsato,tokyo`
  - 期待結果: `name\tcity\nsato\ttokyo`
- quoted comma:
  - `"姓,名",住所`
  - TSV変換後も1列目が分割されない
- empty lines:
  - `a\tb\n\nc\td`
  - 空行が勝手に削除されない

## 営業日カウント
- `2026-05-01` から `2026-05-06`
  - 期待結果: 営業日数 `1日`
  - 理由: 5/2-5/3 土日、5/4-5/6 祝日扱い
- `2026-05-11` から `2026-05-11`
  - 期待結果: 営業日数 `1日`
- 開始日 > 終了日
  - 期待結果: 逆順でも期間として計算され、注意文が表示される

## 銀行営業日チェッカー
- `2026-05-05`
  - 期待結果: `銀行休業日`
- `2026-05-07`
  - 期待結果: `銀行営業日`
- 前の日 / 次の日
  - 期待結果: 日付が1日ずつ前後する
- visible UI
  - 期待結果: 英語ラベルが出ない

## 単位変換
- `100 cm` 相当
  - 期待結果: `1 m`
- `1 kg`
  - 期待結果: `2.20462 lb` 前後
- `1 in`
  - 期待結果: `2.54 cm`
- `1.5 kg`
  - 期待結果: 小数変換が崩れない
- 空入力
  - 期待結果: クラッシュしない

## 文字出現回数カウント
- `ああAＡ`
  - 期待結果: `あ=2`, `A=1`, `Ａ=1`
- `a a`
  - 期待結果: 半角スペースも別項目として表示される
- `あ\nあ`
  - 期待結果: 改行も別項目として表示される
- 空入力
  - 期待結果: クラッシュしない

## ファイルサイズ換算
- `1024 KB`
  - 期待結果: `1 MB`
- `1.5 GB`
  - 期待結果: `1536 MB`
- `0.5 MB`
  - 期待結果: `512 KB`

## 郵便番号→住所
- `100-0001`
  - 期待結果: `東京都千代田区千代田` が返る
- `123`
  - 期待結果: 自動検索せず、エラー表示も不自然でない
- visible UI
  - 期待結果: 英語見出しが出ない

## YouTube URL短縮 / 動画ID系
- `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
  - 期待結果: 短縮URLと動画IDを正しく取得
- `https://youtu.be/dQw4w9WgXcQ`
  - 期待結果: 正しく取得
- `https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=30s`
  - 期待結果: `dQw4w9WgXcQ` を維持
- `https://example.com/video`
  - 期待結果: 無効URLとして安全に扱う
