"use client"

import { useState, useMemo } from "react"

export default function UnitConverterClient() {
  const [value, setValue] = useState<number | "">(1)
  const [category, setCategory] = useState<"length" | "weight">("length")
  const [unit, setUnit] = useState<string>("m")

  const conversions = useMemo(() => {
    if (value === "" || value < 0) return null

    const data = {
      length: {
        units: { 
          mm: 0.001, cm: 0.01, m: 1, km: 1000, 
          in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.34 
        },
        labels: { 
          mm: "ミリメートル", cm: "センチメートル", m: "メートル", km: "キロメートル", 
          in: "インチ", ft: "フィート", yd: "ヤード", mi: "マイル" 
        }
      },
      weight: {
        units: { 
          g: 1, kg: 1000, t: 1000000, 
          oz: 28.3495, lb: 453.592 
        },
        labels: { 
          g: "グラム", kg: "キログラム", t: "トン", 
          oz: "オンス", lb: "ポンド" 
        }
      }
    }

    const current = data[category]
    const baseValue = Number(value) * current.units[unit as keyof typeof current.units]

    return Object.keys(current.units).map((key) => ({
      key,
      label: current.labels[key as keyof typeof current.labels],
      val: (baseValue / current.units[key as keyof typeof current.units]).toLocaleString(undefined, { maximumFractionDigits: 5 })
    }))
  }, [value, category, unit])

  const handleCategoryChange = (cat: "length" | "weight") => {
    setCategory(cat)
    setUnit(cat === "length" ? "m" : "kg")
  }

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="flex gap-2 p-1 bg-neutral-100 rounded-xl">
        <button 
          onClick={() => handleCategoryChange("length")}
          className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${category === "length" ? "bg-white shadow-sm text-blue-600" : "text-neutral-400 hover:text-neutral-600"}`}
        >
          長さ
        </button>
        <button 
          onClick={() => handleCategoryChange("weight")}
          className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${category === "weight" ? "bg-white shadow-sm text-blue-600" : "text-neutral-400 hover:text-neutral-600"}`}
        >
          重さ
        </button>
      </div>

      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-4 block text-sm font-bold text-neutral-700 italic">値を入力して単位を選択</label>
        <div className="flex gap-2">
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value === "" ? "" : Number(e.target.value))}
            className="flex-1 rounded-lg border border-neutral-300 px-4 py-3 text-xl font-black outline-none focus:border-blue-500"
          />
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="rounded-lg border border-neutral-300 bg-neutral-50 px-4 py-3 font-bold outline-none"
          >
            {category === "length" ? (
              <>
                <option value="mm">mm</option>
                <option value="cm">cm</option>
                <option value="m">m</option>
                <option value="km">km</option>
                <option value="in">in</option>
                <option value="ft">ft</option>
                <option value="yd">yd</option>
                <option value="mi">mi</option>
              </>
            ) : (
              <>
                <option value="g">g</option>
                <option value="kg">kg</option>
                <option value="t">t</option>
                <option value="oz">oz</option>
                <option value="lb">lb</option>
              </>
            )}
          </select>
        </div>
      </div>

      {conversions && (
        <div className="grid grid-cols-1 gap-2">
          {conversions.map((item) => (
            <div key={item.key} className="flex items-center justify-between rounded-xl border border-neutral-100 bg-white px-5 py-3 shadow-sm">
              <span className="text-[10px] font-black text-neutral-400 uppercase">{item.label} ({item.key})</span>
              <span className="text-md font-black text-neutral-900">{item.val}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}