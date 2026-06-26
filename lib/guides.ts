export type GuideLink = {
  href: string
  label: string
  description?: string
}

export type GuideFaq = {
  question: string
  answer: string
}

export type GuideSection = {
  heading: string
  body?: string[]
  list?: string[]
  code?: string
  codeColumns?: {
    label: string
    code: string
  }[]
  table?: {
    headers: string[]
    rows: string[][]
  }
  subsections?: {
    heading: string
    body?: string[]
    list?: string[]
    code?: string
  }[]
}

export type Guide = {
  slug: string
  title: string
  description: string
  categoryHref: string
  categoryLabel: string
  lead: string[]
  sections: GuideSection[]
  faqs: GuideFaq[]
  relatedTools: GuideLink[]
  relatedGuides: GuideLink[]
  relatedResources?: GuideLink[]
}

export const guides: Guide[] = [
  {
    slug: "business-day-meaning",
    title: "営業日とは？平日・稼働日との違いをわかりやすく解説",
    description:
      "営業日・平日・稼働日の違いや、土日祝を除いた営業日の数え方をわかりやすく解説します。",
    categoryHref: "/#date",
    categoryLabel: "日付・時間・営業日",
    lead: [
      "営業日とは、会社や銀行などが通常どおり業務を行っている日のことです。一般的には土曜日・日曜日・祝日を除いた日を指しますが、業種や会社によって定義が異なる場合があります。",
      "営業日数を確認したい場合は、当サイトの営業日カウントを使えば、期間を指定して簡単に計算できます。",
    ],
    sections: [
      {
        heading: "営業日とは",
        body: [
          "営業日とは、企業や店舗、金融機関などが通常営業している日のことです。",
          "例えば銀行では、土曜日・日曜日・祝日は営業日に含まれません。そのため、振込や各種手続きは翌営業日に処理されることがあります。",
          "一方、飲食店や小売店などは土日も営業している場合が多く、それぞれの営業日に従って運営されています。",
        ],
      },
      {
        heading: "平日との違い",
        body: [
          "「平日」と「営業日」は似ていますが、同じ意味ではありません。",
          "平日は、月曜日から金曜日を指すことが一般的です。ただし、祝日を含むかどうかは文脈によって異なります。",
          "営業日は、実際に営業している日を指します。一般的には土日・祝日を除くことが多いですが、業種によって異なります。",
          "例えば、月曜日が祝日の場合、その日は平日ではありますが、多くの銀行では営業日にはなりません。",
        ],
      },
      {
        heading: "稼働日との違い",
        body: [
          "「稼働日」は、社員や設備が実際に動いている日を指します。",
          "営業日はお客様への対応を行う日ですが、稼働日は社内業務のみを行う日を含むことがあります。",
          "そのため、営業日と稼働日は必ずしも一致しません。",
        ],
      },
      {
        heading: "営業日が重要になる場面",
        body: ["営業日はさまざまな場面で使われます。"],
        list: [
          "銀行振込の反映予定日",
          "商品の発送予定日",
          "納期の計算",
          "契約書の期限",
          "サポート窓口の対応日",
        ],
        subsections: [
          {
            heading: "「○営業日以内」の数え方",
            body: [
              "「○営業日以内」と書かれている場合は、土日や祝日を除いて数える必要があります。",
            ],
          },
        ],
      },
      {
        heading: "よくある例",
        subsections: [
          {
            heading: "3営業日後はいつ？",
            body: ["例えば金曜日に手続きを行った場合、次のように数えます。"],
            list: [
              "土曜日：含まない",
              "日曜日：含まない",
              "月曜日（祝日）：含まない",
              "火曜日：1営業日",
              "水曜日：2営業日",
              "木曜日：3営業日",
            ],
          },
        ],
        body: ["この場合、3営業日後は木曜日になります。"],
      },
      {
        heading: "営業日数を簡単に計算する方法",
        body: [
          "土日や祝日を手作業で数えると間違えやすくなります。",
          "当サイトの営業日カウントでは、開始日と終了日を入力するだけで、営業日数を簡単に計算できます。",
          "銀行の振込日を確認したい場合は、銀行営業日チェッカーもご利用ください。",
        ],
      },
      {
        heading: "まとめ",
        body: [
          "営業日は「実際に業務を行う日」を意味し、一般的には土日・祝日を除いた日を指します。ただし、業種によって定義は異なるため、重要な手続きでは営業日の数え方を確認することが大切です。",
          "営業日数をすぐに確認したい場合は、当サイトの営業日カウントや銀行営業日チェッカーをご利用ください。",
        ],
      },
    ],
    faqs: [
      {
        question: "営業日に祝日は含まれますか？",
        answer: "一般的には含まれません。",
      },
      {
        question: "土曜日は営業日ですか？",
        answer: "銀行では通常営業日ではありません。ただし、業種によっては営業日となる場合があります。",
      },
      {
        question: "「○営業日以内」は当日を含みますか？",
        answer:
          "一律ではありません。例えば「3営業日以内に発送」と書かれていても、注文日を含めて数える場合と、翌営業日から数える場合の両方があります。そのため、同じ「3営業日以内」という表現でも、発送日が1日変わることがあります。重要な手続きや納期の場合は、各サービスの案内を確認しましょう。",
      },
      {
        question: "銀行営業日と会社の営業日は同じですか？",
        answer:
          "必ずしも同じではありません。銀行は日本の祝日や年末年始などに合わせて営業日が決まっています。",
      },
    ],
    relatedTools: [
      {
        href: "/tools/working-days-count",
        label: "営業日カウント",
        description: "土日祝を除いた営業日数を計算できます。",
      },
      {
        href: "/tools/bank-business-day",
        label: "銀行営業日チェッカー",
        description: "指定日が銀行営業日か確認できます。",
      },
      {
        href: "/tools/next-business-day",
        label: "翌営業日計算",
        description: "土日祝を除いた次の営業日を確認できます。",
      },
      {
        href: "/tools/payment-due-date",
        label: "支払期日計算",
        description: "支払サイトと土日祝調整で期日を確認できます。",
      },
      {
        href: "/tools/holiday-list",
        label: "日本の祝日確認",
        description: "指定日の祝日判定と年別一覧を確認できます。",
      },
    ],
    relatedGuides: [],
  },
  {
    slug: "csv-tsv-difference",
    title: "CSVとTSVの違いとは？どちらを使うべきかをわかりやすく解説",
    description:
      "CSVとTSVの違いや、カンマ区切りとタブ区切りの使い分けをわかりやすく解説します。",
    categoryHref: "/#dev",
    categoryLabel: "CSV・データ処理",
    lead: [
      "CSVとTSVは、どちらも表形式のデータを保存・交換するためのファイル形式です。違いは、各項目を区切る文字にあります。",
    ],
    sections: [
      {
        heading: "CSVとTSVの基本",
        list: ["CSV：カンマ（,）で区切る", "TSV：タブ文字で区切る"],
        body: [
          "見た目は似ていますが、用途や扱いやすさには違いがあります。",
          "CSVとTSVを相互に変換したい場合は、当サイトのTSV⇄CSV変換ツールをご利用ください。",
        ],
      },
      {
        heading: "CSVとは",
        body: [
          "CSV（Comma-Separated Values）は、各項目をカンマで区切って保存するファイル形式です。",
          "例えば、次のような形式です。",
        ],
        code: "名前,年齢,都道府県\n山田太郎,35,東京都\n佐藤花子,28,大阪府",
        subsections: [
          {
            heading: "よく使われる場面",
            body: [
              "ExcelやGoogleスプレッドシート、多くの業務システムで利用されています。",
            ],
          },
        ],
      },
      {
        heading: "TSVとは",
        body: [
          "TSV（Tab-Separated Values）は、各項目をタブ文字で区切る形式です。",
          "見た目では分かりにくいですが、実際にはカンマではなくタブが入っています。",
        ],
        code: "名前\t年齢\t都道府県\n山田太郎\t35\t東京都\n佐藤花子\t28\t大阪府",
      },
      {
        heading: "CSVとTSVの違い",
        table: {
          headers: ["項目", "CSV", "TSV"],
          rows: [
            ["区切り文字", "カンマ（,）", "タブ"],
            ["拡張子", ".csv", ".tsv"],
            ["Excel対応", "○", "○"],
            ["カンマを含むデータ", "引用符（\"）が必要", "そのまま扱いやすい"],
          ],
        },
      },
      {
        heading: "どちらを使えばいい？",
        body: [
          "一般的にはCSVが最も広く使われています。",
          "ただし、データの中にカンマが多く含まれる場合は、TSVの方が扱いやすいことがあります。",
          "例えば住所や説明文などでは、次のようにカンマを含むことがあります。",
        ],
        code: "東京都, 新宿区",
        subsections: [
          {
            heading: "カンマを含むデータの扱い",
            body: [
              "CSVでは引用符などの処理が必要になりますが、TSVではそのまま扱えるケースが多くあります。",
            ],
          },
        ],
      },
      {
        heading: "CSVをTSVへ変換する場面",
        body: ["次のような場面では変換が必要になることがあります。"],
        list: [
          "システムがTSVのみ対応している",
          "Excelで開いたCSVを加工したい",
          "データベースへインポートする",
          "プログラム間でデータを受け渡す",
        ],
      },
      {
        heading: "実際の変換例",
        body: [
          "同じ表データでも、CSVではカンマ、TSVではタブ文字で項目を区切ります。",
        ],
        codeColumns: [
          {
            label: "CSV形式",
            code: "名前,年齢,都道府県\n山田太郎,35,東京都\n佐藤花子,28,大阪府",
          },
          {
            label: "TSV形式",
            code: "名前\t年齢\t都道府県\n山田太郎\t35\t東京都\n佐藤花子\t28\t大阪府",
          },
        ],
      },
      {
        heading: "まとめ",
        body: [
          "CSVとTSVはどちらも表形式データを扱うための代表的な形式です。",
          "違いは主に区切り文字にあり、CSVはカンマ区切り、TSVはタブ区切りです。",
          "用途に応じて使い分けることで、データの受け渡しや編集がスムーズになります。",
          "CSVとTSVをすばやく変換したい場合は、当サイトのTSV⇄CSV変換ツールをご利用ください。",
        ],
      },
    ],
    faqs: [
      {
        question: "CSVとExcelファイル（.xlsx）は同じですか？",
        answer:
          "違います。CSVは文字だけで構成されたシンプルなファイルです。一方、Excelファイル（.xlsx）は書式や数式、複数シートなどを保存できます。",
      },
      {
        question: "CSVはExcelで開けますか？",
        answer:
          "はい。多くの場合、そのままExcelで開くことができます。ただし、文字コードによっては文字化けすることがあります。",
      },
      {
        question: "TSVはExcelで開けますか？",
        answer: "はい。Excelではタブ区切りのデータも読み込めます。",
      },
      {
        question: "CSVとTSVは相互に変換できますか？",
        answer:
          "できます。区切り文字を変換することで、CSVからTSV、TSVからCSVへ簡単に変換できます。当サイトのTSV⇄CSV変換ツールをご利用ください。",
      },
    ],
    relatedTools: [
      {
        href: "/tools/tsv-csv-converter",
        label: "TSV⇄CSV変換",
        description: "タブ区切りとカンマ区切りを相互変換できます。",
      },
      {
        href: "/tools/csv-formatter",
        label: "CSV整形ツール",
        description: "引用符や改行をそろえてCSVを整形できます。",
      },
      {
        href: "/tools/csv-row-count",
        label: "CSV行数カウント",
        description: "CSVファイルのデータ行数を確認できます。",
      },
      {
        href: "/tools/csv-column-extract",
        label: "CSV列抽出ツール",
        description: "必要な列だけを取り出せます。",
      },
      {
        href: "/tools/csv-merge",
        label: "CSV結合",
        description: "2つのCSVを1つにまとめられます。",
      },
      {
        href: "/tools/csv-split",
        label: "CSV分割",
        description: "CSVを指定行数ごとに分割できます。",
      },
      {
        href: "/tools/csv-quote-escape",
        label: "CSV引用符エスケープ",
        description: "カンマやダブルクォートをCSV向けに変換できます。",
      },
      {
        href: "/tools/json-csv-converter",
        label: "JSON⇄CSV変換",
        description: "JSON配列とCSVを相互に変換できます。",
      },
    ],
    relatedGuides: [
      {
        href: "/guides/character-encoding-meaning",
        label: "文字コードとは？UTF-8・Shift_JIS・Unicodeの違い",
        description: "CSVで文字化けが起こる理由を確認できます。",
      },
    ],
  },
  {
    slug: "zenkaku-hankaku-difference",
    title: "全角・半角とは？違いと使い分けをわかりやすく解説",
    description:
      "全角・半角の違いや、英数字・記号・日本語入力での使い分けをわかりやすく解説します。",
    categoryHref: "/#text",
    categoryLabel: "テキスト・文字ツール",
    lead: [
      "全角と半角は、日本語を入力するときによく使われる文字の形式です。",
      "見た目が似ていても、文字数の数え方やシステムでの扱われ方が異なるため、入力ミスや文字化けの原因になることがあります。",
      "全角・半角をすばやく変換したい場合は、当サイトの全角⇄半角変換ツールをご利用ください。",
    ],
    sections: [
      {
        heading: "全角とは？",
        body: [
          "全角文字は、日本語を表示することを前提とした幅の広い文字です。",
          "例えば次のような文字は全角です。",
        ],
        list: ["あいうえお", "アイウエオ", "ＡＢＣ", "１２３", "（）", "，。", "＠"],
        subsections: [
          {
            heading: "日本語文書での使われ方",
            body: [
              "一般的な日本語の文章では、漢字・ひらがな・カタカナは全角で入力されます。",
            ],
          },
        ],
      },
      {
        heading: "半角とは？",
        body: [
          "半角文字は、主に英数字やプログラム、Webサービスなどで使われる文字形式です。",
          "例えば、次のような文字は半角です。",
        ],
        list: ["ABC", "123", "()", ", .", "@"],
        subsections: [
          {
            heading: "英数字での使われ方",
            body: ["英語圏では半角が標準です。"],
          },
        ],
      },
      {
        heading: "全角と半角の違い",
        table: {
          headers: ["項目", "全角", "半角"],
          rows: [
            ["表示幅", "広い", "狭い"],
            ["日本語", "○", "一部のみ"],
            ["英数字", "使用可", "使用可"],
            ["一般的な用途", "日本語文書", "Web・システム・プログラム"],
          ],
        },
      },
      {
        heading: "なぜ使い分けが必要なの？",
        body: ["サービスによっては入力ルールが決まっています。例えば、次のように指定されることがあります。"],
        list: [
          "電話番号は半角数字",
          "メールアドレスは半角英数字",
          "郵便番号は半角数字",
          "氏名は全角",
        ],
        subsections: [
          {
            heading: "入力エラーの原因になることがある",
            body: [
              "指定された形式で入力しないと、エラーになることがあります。",
            ],
          },
        ],
      },
      {
        heading: "翻訳やソフトウェア開発でも重要",
        body: [
          "全角・半角の違いは、フォーム入力だけでなく、翻訳やソフトウェアのローカライズでも重要です。",
          "例えば、仕様で「半角英数字のみ」「全角カタカナを使用」と決められている場合、それに従わないと表示崩れや入力エラーの原因になることがあります。",
          "ローカライズ品質の確認が必要な場合は、全角・半角や日本語特有の表記ルールをチェックできるツールも活用すると便利です。",
        ],
      },
      {
        heading: "よくある例",
        body: [
          "例えば、次の2つは見た目が似ていますが、コンピューターでは異なる文字として扱われます。",
        ],
        codeColumns: [
          {
            label: "全角",
            code: "ＡＢＣ１２３",
          },
          {
            label: "半角",
            code: "ABC123",
          },
        ],
      },
      {
        heading: "全角・半角は文字数にも影響する？",
        body: [
          "文字数そのものは、全角・半角どちらも通常は1文字として数えられます。",
          "ただし、バイト数、システム上の文字数制限、古いシステムでは扱いが異なることがあります。",
          "文字数やバイト数を確認したい場合は、当サイトの文字数カウントをご利用ください。",
        ],
      },
      {
        heading: "まとめ",
        body: [
          "全角と半角は、日本語入力では基本となる文字形式です。",
          "日本語の文章では全角が一般的で、英数字やメールアドレスなどは半角が一般的です。",
          "サービスによって指定が異なるため、入力ルールを確認することが重要です。",
          "全角・半角をすばやく変換したい場合は、当サイトの全角⇄半角変換ツールをご利用ください。",
          "文字数やバイト数も確認したい場合は、文字数カウントもあわせてご利用ください。",
        ],
      },
    ],
    faqs: [
      {
        question: "全角英数字と半角英数字は何が違いますか？",
        answer:
          "見た目は似ていますが、別の文字です。Webサービスやシステムでは半角英数字が指定されることが多くあります。",
      },
      {
        question: "メールアドレスは全角で入力できますか？",
        answer: "通常はできません。メールアドレスは半角英数字で入力します。",
      },
      {
        question: "パスワードは全角でも使えますか？",
        answer:
          "サービスによります。半角のみ対応しているサービスもあるため、案内を確認しましょう。",
      },
      {
        question: "全角と半角はどちらが正しいですか？",
        answer:
          "どちらが正しいというものではありません。用途や入力ルールに合わせて使い分けることが大切です。",
      },
    ],
    relatedTools: [
      {
        href: "/tools/zenkaku-hankaku",
        label: "全角⇄半角変換",
        description: "英数字・カタカナ・記号の全角と半角を相互変換できます。",
      },
      {
        href: "/tools/mojisuu-count",
        label: "文字数カウント",
        description: "全角・半角・バイト数をまとめて確認できます。",
      },
      {
        href: "/tools/kana-converter",
        label: "ひらがな⇄カタカナ変換",
        description: "ひらがなとカタカナを相互に変換できます。",
      },
    ],
    relatedGuides: [
      {
        href: "/guides/character-encoding-meaning",
        label: "文字コードとは？UTF-8・Shift_JIS・Unicodeの違い",
        description: "文字の扱われ方や文字化けの基本を確認できます。",
      },
    ],
    relatedResources: [
      {
        href: "/tools/zenkaku-hankaku",
        label: "全角⇄半角変換（Benri Desk）",
      },
      {
        href: "/tools/mojisuu-count",
        label: "文字数カウント（Benri Desk）",
      },
      {
        href: "https://localeqa.com/ja",
        label: "LocaleQA（翻訳・ローカライズ向け日本語ルールチェック）",
      },
    ],
  },
  {
    slug: "character-encoding-meaning",
    title: "文字コードとは？UTF-8・Shift_JIS・Unicodeの違いをわかりやすく解説",
    description:
      "文字コードの基本と、UTF-8・Shift_JIS・Unicodeの違い、文字化けが起こる理由をわかりやすく解説します。",
    categoryHref: "/#network",
    categoryLabel: "Web・IT 基本ツール",
    lead: [
      "文字コードとは、文字をコンピューターで保存・表示・送受信するためのルールです。",
      "普段は意識することが少ないですが、文字コードが一致していないと「文字化け」が発生することがあります。",
      "文字コードを確認したい場合は、当サイトの文字コード確認ツールをご利用ください。",
    ],
    sections: [
      {
        heading: "文字コードとは？",
        body: [
          "コンピューターは文字をそのまま保存しているわけではありません。",
          "「あ」「A」「1」などの文字は、それぞれ決められた数値として保存されています。",
          "その対応ルールを「文字コード」と呼びます。",
          "文字コードが異なる環境でファイルを開くと、本来の文字を正しく表示できず、文字化けの原因になります。",
        ],
      },
      {
        heading: "Unicodeとは？",
        body: [
          "Unicodeは、世界中の文字を共通のルールで扱うための文字体系です。",
          "日本語だけでなく、次のような多くの文字を統一的に扱えるよう設計されています。",
        ],
        list: ["英語", "中国語", "韓国語", "絵文字", "数学記号"],
        subsections: [
          {
            heading: "現在の標準的な文字体系",
            body: [
              "現在では、多くのOSやWebサービスでUnicodeが採用されています。",
            ],
          },
        ],
      },
      {
        heading: "UTF-8とは？",
        body: [
          "UTF-8は、Unicodeを保存する代表的な方式の一つです。",
          "現在のWebサイトでは最も広く利用されており、多くのブラウザやプログラミング言語で標準的に使われています。",
          "UTF-8の主な特徴は、次のとおりです。",
        ],
        list: [
          "世界中の文字を扱える",
          "英数字は効率よく保存できる",
          "Webとの相性が良い",
        ],
        subsections: [
          {
            heading: "新しいWebサイトやシステムで使われる形式",
            body: [
              "現在新しく作成するWebサイトやシステムでは、UTF-8が採用されることが一般的です。",
            ],
          },
        ],
      },
      {
        heading: "Shift_JISとは？",
        body: [
          "Shift_JISは、日本で長く利用されてきた文字コードです。",
          "古いWindowsアプリケーションや業務システム、CSVファイルなどでは、現在でもShift_JISが使われていることがあります。",
          "そのため、次のような場面では、UTF-8ではなくShift_JISが必要になるケースがあります。",
        ],
        list: [
          "古い業務システム",
          "既存の社内システム",
          "一部のCSVデータ",
        ],
      },
      {
        heading: "UTF-8とShift_JISの違い",
        table: {
          headers: ["項目", "UTF-8", "Shift_JIS"],
          rows: [
            ["日本語", "○", "○"],
            ["世界中の文字", "◎", "△"],
            ["絵文字", "○", "×"],
            ["Webサイト", "◎", "△"],
            ["古いWindowsシステム", "△", "◎"],
          ],
        },
      },
      {
        heading: "なぜ文字化けが起こるの？",
        body: [
          "最も多い原因は、保存時と読み込み時で文字コードが異なることです。",
          "例えば、次のような場合は本来の文字を正しく解釈できず、文字化けが発生することがあります。",
        ],
        list: [
          "UTF-8で保存したCSVをShift_JISとして読み込む",
          "Shift_JISのファイルをUTF-8として開く",
        ],
      },
      {
        heading: "よくある場面",
        body: ["文字コードを意識する場面には次のようなものがあります。"],
        list: [
          "CSVファイルの読み込み・書き出し",
          "Excelとのデータ受け渡し",
          "Webサイト制作",
          "プログラミング",
          "システム間のデータ連携",
        ],
        subsections: [
          {
            heading: "CSVで起こりやすい文字化け",
            body: [
              "特にCSVファイルでは、文字コードの違いが原因で文字化けするケースが少なくありません。",
            ],
          },
        ],
      },
      {
        heading: "まとめ",
        body: [
          "文字コードは、コンピューターが文字を扱うための重要な仕組みです。",
          "現在のWebではUTF-8が標準ですが、日本の古いシステムやCSVファイルではShift_JISが使われることもあります。",
          "文字化けを防ぐためには、保存時と読み込み時の文字コードを揃えることが大切です。",
          "CSVやテキストデータを扱う際は、必要に応じて当サイトの文字コード確認ツールもご活用ください。",
        ],
      },
    ],
    faqs: [
      {
        question: "UTF-8とUnicodeは同じですか？",
        answer:
          "違います。Unicodeは文字体系であり、UTF-8はUnicodeを保存するための方式の一つです。",
      },
      {
        question: "Shift_JISは古いので使わない方がいいですか？",
        answer:
          "新しいWebサイトやシステムではUTF-8が一般的です。ただし、既存の業務システムではShift_JISが必要な場合もあるため、用途に応じて使い分けることが重要です。",
      },
      {
        question: "CSVで文字化けするのはなぜですか？",
        answer:
          "CSVそのものではなく、保存されている文字コードが原因であることが多くあります。UTF-8とShift_JISの違いを確認することで解決できる場合があります。",
      },
      {
        question: "文字コードを確認する方法はありますか？",
        answer:
          "はい。当サイトの文字コード確認ツールを利用すると、文字コードを簡単に確認できます。",
      },
    ],
    relatedTools: [
      {
        href: "/tools/char-code-checker",
        label: "文字コード確認",
        description: "UTF-8やSJISなどのエンコードを確認できます。",
      },
      {
        href: "/tools/tsv-csv-converter",
        label: "TSV⇄CSV変換",
        description: "CSVとTSVを相互に変換できます。",
      },
      {
        href: "/tools/mime-type-checker",
        label: "MIMEタイプ確認",
        description: "拡張子から適切なMIMEタイプを確認できます。",
      },
    ],
    relatedGuides: [
      {
        href: "/guides/csv-tsv-difference",
        label: "CSVとTSVの違い",
        description: "カンマ区切りとタブ区切りの違いを確認できます。",
      },
      {
        href: "/guides/zenkaku-hankaku-difference",
        label: "全角・半角の違い",
        description: "日本語入力で起こりやすい文字形式の違いを確認できます。",
      },
    ],
  },
  {
    slug: "unit-conversion-meaning",
    title: "単位換算とは？よく使う長さ・重さ・温度の単位をわかりやすく解説",
    description:
      "単位換算の基本と、長さ・重さ・温度・面積・体積・速度・圧力・エネルギーなどの違いや換算例をわかりやすく解説します。",
    categoryHref: "/#calc",
    categoryLabel: "計算・変換ツール",
    lead: [
      "単位換算とは、ある単位で表された数値を、別の単位へ変換することです。",
      "cmをmに変換する、kgをlb（ポンド）に変換する、時間を分や秒に変換するといった場面で利用されます。",
      "単位をすばやく換算したい場合は、当サイトの単位換算ツールをご利用ください。",
    ],
    sections: [
      {
        heading: "単位換算とは？",
        body: [
          "単位換算とは、数量そのものは変えずに、表し方だけを変更することです。",
          "例えば、100cmと1mはどちらも同じ長さを表しています。",
          "単位が変わっても、実際の長さや重さは変わりません。",
        ],
      },
      {
        heading: "よく使われる長さの単位",
        body: ["長さでは、次のような単位がよく使われます。"],
        table: {
          headers: ["単位", "意味"],
          rows: [
            ["mm", "ミリメートル"],
            ["cm", "センチメートル"],
            ["m", "メートル"],
            ["km", "キロメートル"],
            ["inch", "インチ"],
            ["ft", "フィート"],
          ],
        },
        subsections: [
          {
            heading: "長さの換算例",
            list: ["10mm = 1cm", "100cm = 1m", "1,000m = 1km"],
          },
        ],
      },
      {
        heading: "よく使われる重さの単位",
        body: ["重さでは、次のような単位がよく使われます。"],
        table: {
          headers: ["単位", "意味"],
          rows: [
            ["mg", "ミリグラム"],
            ["g", "グラム"],
            ["kg", "キログラム"],
            ["t", "トン"],
            ["lb", "ポンド"],
          ],
        },
        subsections: [
          {
            heading: "ポンドが使われる場面",
            body: [
              "海外ではポンド（lb）が使われることも多くあります。",
            ],
          },
        ],
      },
      {
        heading: "よく使われる時間の単位",
        body: ["時間では、秒・分・時間・日の換算がよく行われます。"],
        list: ["60秒 = 1分", "60分 = 1時間", "24時間 = 1日"],
      },
      {
        heading: "温度・面積・体積・速度の単位",
        body: [
          "日常や仕事では、長さや重さ以外にも温度・面積・体積・速度の換算が必要になることがあります。",
        ],
        table: {
          headers: ["種類", "よく使う単位"],
          rows: [
            ["温度", "摂氏（℃）、華氏（°F）、ケルビン（K）"],
            ["面積", "平方メートル、ヘクタール、平方フィート"],
            ["体積", "ml、L、立方メートル、カップ、ガロン"],
            ["速度", "m/s、km/h、mph、ノット"],
          ],
        },
      },
      {
        heading: "圧力・エネルギー・データ容量の単位",
        body: [
          "技術資料や家電、ファイルサイズの確認では、圧力・エネルギー・仕事率・データ容量の単位もよく使われます。",
        ],
        table: {
          headers: ["種類", "よく使う単位"],
          rows: [
            ["圧力", "Pa、kPa、MPa、bar、atm、psi"],
            ["エネルギー", "J、kJ、cal、kcal、Wh、kWh"],
            ["仕事率", "W、kW、MW、馬力"],
            ["データ容量", "B、KB、MB、GB、KiB、MiB"],
          ],
        },
      },
      {
        heading: "料理で使う単位",
        body: [
          "料理では、小さじ・大さじ・カップなどの換算が必要になることがあります。",
          "日本のレシピでは、小さじ1は5ml、大さじ1は15ml、1カップは200mlとして扱われることが一般的です。",
        ],
      },
      {
        heading: "なぜ単位換算が必要なの？",
        body: ["単位換算はさまざまな場面で利用されます。例えば、次のような場面です。"],
        list: [
          "海外の商品サイズを確認する",
          "身長や体重を海外表記へ換算する",
          "DIYや工作",
          "料理やレシピ",
          "学校の勉強",
          "仕事で資料を作成する",
        ],
      },
      {
        heading: "よくある例",
        codeColumns: [
          {
            label: "身長を換算する",
            code: "170cm\n↓\n1.7m",
          },
          {
            label: "重さを換算する",
            code: "5kg\n↓\n約11.02lb",
          },
          {
            label: "時間を換算する",
            code: "90分\n↓\n1時間30分",
          },
          {
            label: "温度を換算する",
            code: "25℃\n↓\n77°F",
          },
          {
            label: "データ容量を換算する",
            code: "1,024MB\n↓\n1.024GB",
          },
          {
            label: "料理の量を換算する",
            code: "大さじ2\n↓\n30ml",
          },
        ],
      },
      {
        heading: "まとめ",
        body: [
          "単位換算は、長さ・重さ・温度・面積・体積・速度・圧力・エネルギーなどを用途に応じて別の単位へ変換することです。",
          "海外の商品や仕事、勉強など、さまざまな場面で役立ちます。",
          "手計算が難しい場合は、当サイトの単位換算ツールをご利用ください。",
        ],
      },
    ],
    faqs: [
      {
        question: "単位換算で数値が変わるのはなぜですか？",
        answer:
          "単位の大きさが異なるためです。数量そのものは変わらず、表し方だけが変わります。",
      },
      {
        question: "ポンド（lb）は日本でも使いますか？",
        answer:
          "日本ではkgが一般的ですが、海外の商品やスポーツ、航空業界などではポンドが使われることがあります。",
      },
      {
        question: "cmとmmはどう違いますか？",
        answer: "1cmは10mmです。つまり、mmの方がより細かい単位になります。",
      },
      {
        question: "単位換算を手計算しなくてもできますか？",
        answer:
          "はい。当サイトの単位換算ツールでは、長さ・重さ・温度・面積・体積・速度などを簡単に換算できます。",
      },
    ],
    relatedTools: [
      {
        href: "/tools/unit-converter",
        label: "単位換算",
        description: "長さや重さの単位を相互変換できます。",
      },
      {
        href: "/tools/time-unit-converter",
        label: "秒⇄分⇄時間変換",
        description: "時間の単位を細かく換算できます。",
      },
      {
        href: "/tools/file-size-converter",
        label: "ファイルサイズ換算",
        description: "KB・MB・GBの単位を変換できます。",
      },
    ],
    relatedGuides: [
      {
        href: "/guides/character-encoding-meaning",
        label: "文字コードとは？UTF-8・Shift_JIS・Unicodeの違い",
        description: "テキストやCSVの扱いで必要になる基本を確認できます。",
      },
    ],
  },
]

export function getGuide(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug)
}

export function getGuidesForToolSlug(toolSlug: string): GuideLink[] {
  const toolPath = `/tools/${toolSlug}`

  return guides
    .filter((guide) => guide.relatedTools.some((tool) => tool.href === toolPath))
    .map((guide) => ({
      href: `/guides/${guide.slug}`,
      label: guide.title,
      description: guide.description,
    }))
}
