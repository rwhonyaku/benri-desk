"use client"

import { useState, useRef } from "react"

export default function ImageConverterClient() {
  const [image, setImage] = useState<string | null>(null)
  const [format, setFormat] = useState("image/jpeg")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => setImage(event.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleDownload = () => {
    const canvas = canvasRef.current
    const img = document.getElementById("source-img") as HTMLImageElement
    if (canvas && img) {
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext("2d")
      ctx?.drawImage(img, 0, 0)
      const dataUrl = canvas.toDataURL(format)
      const link = document.createElement("a")
      link.download = `converted-image.${format.split("/")[1]}`
      link.href = dataUrl
      link.click()
    }
  }

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="mb-4 block text-sm font-bold text-neutral-700 italic text-right">画像をアップロード</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange}
          className="w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      {image && (
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm text-center">
          <img id="source-img" src={image} alt="Preview" className="mx-auto mb-6 max-h-64 rounded-lg object-contain" />
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-xs font-bold text-neutral-500">変換先:</span>
            <select 
              value={format} 
              onChange={(e) => setFormat(e.target.value)}
              className="rounded border border-neutral-300 px-3 py-1 text-sm font-bold outline-none"
            >
              <option value="image/jpeg">JPG</option>
              <option value="image/png">PNG</option>
              <option value="image/webp">WebP</option>
            </select>
          </div>

          <button
            onClick={handleDownload}
            className="w-full rounded-md bg-blue-600 py-3 text-sm font-bold text-white hover:bg-blue-700 active:scale-95 transition-all"
          >
            変換して保存
          </button>
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}
    </div>
  )
}