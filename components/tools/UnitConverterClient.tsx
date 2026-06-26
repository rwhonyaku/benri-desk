"use client"

import { useMemo, useState } from "react"

type CategoryKey =
  | "length"
  | "weight"
  | "temperature"
  | "area"
  | "volume"
  | "speed"
  | "pressure"
  | "energy"
  | "power"
  | "data"
  | "cooking"
type UnitDefinition = {
  label: string
  toBase: (value: number) => number
  fromBase: (value: number) => number
}
type CategoryDefinition = {
  label: string
  defaultUnit: string
  units: Record<string, UnitDefinition>
}

const linearUnit = (label: string, factor: number): UnitDefinition => ({
  label,
  toBase: (value) => value * factor,
  fromBase: (value) => value / factor,
})

const categories: Record<CategoryKey, CategoryDefinition> = {
  length: {
    label: "長さ",
    defaultUnit: "m",
    units: {
      mm: linearUnit("ミリメートル", 0.001),
      cm: linearUnit("センチメートル", 0.01),
      m: linearUnit("メートル", 1),
      km: linearUnit("キロメートル", 1000),
      in: linearUnit("インチ", 0.0254),
      ft: linearUnit("フィート", 0.3048),
      yd: linearUnit("ヤード", 0.9144),
      mi: linearUnit("マイル", 1609.344),
    },
  },
  weight: {
    label: "重さ",
    defaultUnit: "kg",
    units: {
      mg: linearUnit("ミリグラム", 0.001),
      g: linearUnit("グラム", 1),
      kg: linearUnit("キログラム", 1000),
      t: linearUnit("トン", 1000000),
      oz: linearUnit("オンス", 28.349523125),
      lb: linearUnit("ポンド", 453.59237),
    },
  },
  temperature: {
    label: "温度",
    defaultUnit: "c",
    units: {
      c: {
        label: "摂氏",
        toBase: (value) => value,
        fromBase: (value) => value,
      },
      f: {
        label: "華氏",
        toBase: (value) => (value - 32) * 5 / 9,
        fromBase: (value) => value * 9 / 5 + 32,
      },
      k: {
        label: "ケルビン",
        toBase: (value) => value - 273.15,
        fromBase: (value) => value + 273.15,
      },
    },
  },
  area: {
    label: "面積",
    defaultUnit: "m2",
    units: {
      mm2: linearUnit("平方ミリメートル", 0.000001),
      cm2: linearUnit("平方センチメートル", 0.0001),
      m2: linearUnit("平方メートル", 1),
      km2: linearUnit("平方キロメートル", 1000000),
      a: linearUnit("アール", 100),
      ha: linearUnit("ヘクタール", 10000),
      in2: linearUnit("平方インチ", 0.00064516),
      ft2: linearUnit("平方フィート", 0.09290304),
    },
  },
  volume: {
    label: "体積",
    defaultUnit: "l",
    units: {
      ml: linearUnit("ミリリットル", 0.001),
      l: linearUnit("リットル", 1),
      m3: linearUnit("立方メートル", 1000),
      floz: linearUnit("液量オンス", 0.0295735295625),
      pt: linearUnit("パイント", 0.473176473),
      qt: linearUnit("クォート", 0.946352946),
      gal: linearUnit("ガロン", 3.785411784),
    },
  },
  speed: {
    label: "速度",
    defaultUnit: "kmh",
    units: {
      ms: linearUnit("メートル毎秒", 1),
      kmh: linearUnit("キロメートル毎時", 0.2777777777777778),
      mph: linearUnit("マイル毎時", 0.44704),
      knot: linearUnit("ノット", 0.5144444444444445),
      fts: linearUnit("フィート毎秒", 0.3048),
    },
  },
  pressure: {
    label: "圧力",
    defaultUnit: "pa",
    units: {
      pa: linearUnit("パスカル", 1),
      kpa: linearUnit("キロパスカル", 1000),
      mpa: linearUnit("メガパスカル", 1000000),
      bar: linearUnit("バール", 100000),
      atm: linearUnit("気圧", 101325),
      psi: linearUnit("psi", 6894.757293168),
      mmhg: linearUnit("mmHg", 133.322387415),
    },
  },
  energy: {
    label: "エネルギー",
    defaultUnit: "j",
    units: {
      j: linearUnit("ジュール", 1),
      kj: linearUnit("キロジュール", 1000),
      cal: linearUnit("カロリー", 4.184),
      kcal: linearUnit("キロカロリー", 4184),
      wh: linearUnit("ワット時", 3600),
      kwh: linearUnit("キロワット時", 3600000),
    },
  },
  power: {
    label: "仕事率",
    defaultUnit: "w",
    units: {
      w: linearUnit("ワット", 1),
      kw: linearUnit("キロワット", 1000),
      mw: linearUnit("メガワット", 1000000),
      ps: linearUnit("仏馬力", 735.49875),
      hp: linearUnit("英馬力", 745.6998715822702),
    },
  },
  data: {
    label: "データ容量",
    defaultUnit: "mb",
    units: {
      b: linearUnit("バイト", 1),
      kb: linearUnit("キロバイト", 1000),
      mb: linearUnit("メガバイト", 1000000),
      gb: linearUnit("ギガバイト", 1000000000),
      tb: linearUnit("テラバイト", 1000000000000),
      kib: linearUnit("キビバイト", 1024),
      mib: linearUnit("メビバイト", 1048576),
      gib: linearUnit("ギビバイト", 1073741824),
    },
  },
  cooking: {
    label: "料理",
    defaultUnit: "tbsp",
    units: {
      ml: linearUnit("ミリリットル", 1),
      tsp: linearUnit("小さじ", 5),
      tbsp: linearUnit("大さじ", 15),
      cup: linearUnit("カップ", 200),
      gou: linearUnit("合", 180),
      l: linearUnit("リットル", 1000),
    },
  },
}

const categoryKeys = Object.keys(categories) as CategoryKey[]

function formatNumber(value: number) {
  if (!Number.isFinite(value)) return "-"

  return value.toLocaleString(undefined, {
    maximumFractionDigits: 8,
  })
}

export default function UnitConverterClient() {
  const [value, setValue] = useState<number | "">(1)
  const [category, setCategory] = useState<CategoryKey>("length")
  const [unit, setUnit] = useState<string>(categories.length.defaultUnit)

  const conversions = useMemo(() => {
    if (value === "") return null
    if (category !== "temperature" && value < 0) return null

    const current = categories[category]
    const selectedUnit = current.units[unit]
    if (!selectedUnit) return null

    const baseValue = selectedUnit.toBase(Number(value))

    return Object.entries(current.units).map(([key, definition]) => ({
      key,
      label: definition.label,
      val: formatNumber(definition.fromBase(baseValue)),
    }))
  }, [value, category, unit])

  const handleCategoryChange = (nextCategory: CategoryKey) => {
    setCategory(nextCategory)
    setUnit(categories[nextCategory].defaultUnit)
  }

  const currentCategory = categories[category]

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="grid grid-cols-2 gap-2 rounded-xl bg-neutral-100 p-1 sm:grid-cols-3 lg:grid-cols-4">
        {categoryKeys.map((key) => (
          <button
            key={key}
            onClick={() => handleCategoryChange(key)}
            className={`rounded-lg px-2 py-2 text-sm font-bold transition-all ${
              category === key
                ? "bg-white text-blue-600 shadow-sm"
                : "text-neutral-400 hover:text-neutral-600"
            }`}
          >
            {categories[key].label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-4 block text-sm font-bold text-neutral-700 italic">
          値を入力して単位を選択
        </label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto]">
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value === "" ? "" : Number(e.target.value))}
            className="min-w-0 rounded-lg border border-neutral-300 px-4 py-3 text-xl font-black outline-none focus:border-blue-500"
          />
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="rounded-lg border border-neutral-300 bg-neutral-50 px-4 py-3 font-bold outline-none"
          >
            {Object.keys(currentCategory.units).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>

        {category !== "temperature" && value !== "" && value < 0 && (
          <p className="mt-3 text-xs font-bold text-rose-600">
            このカテゴリでは0以上の値を入力してください。
          </p>
        )}
      </div>

      {conversions && (
        <div className="grid grid-cols-1 gap-2">
          {conversions.map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between gap-4 rounded-xl border border-neutral-100 bg-white px-5 py-3 shadow-sm"
            >
              <span className="text-[10px] font-black uppercase text-neutral-400">
                {item.label} ({item.key})
              </span>
              <span className="text-right text-md font-black text-neutral-900">{item.val}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
