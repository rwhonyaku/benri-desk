export function normalizeNewlines(text: string) {
  return text.replace(/\r\n?/g, "\n")
}

export function parseDelimitedRows(input: string, delimiter = ",") {
  const text = normalizeNewlines(input)
  const rows: string[][] = []
  let row: string[] = []
  let cell = ""
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    const next = text[i + 1]

    if (char === "\"") {
      if (inQuotes && next === "\"") {
        cell += "\""
        i++
      } else {
        inQuotes = !inQuotes
      }
      continue
    }

    if (!inQuotes && char === delimiter) {
      row.push(cell)
      cell = ""
      continue
    }

    if (!inQuotes && char === "\n") {
      row.push(cell)
      rows.push(row)
      row = []
      cell = ""
      continue
    }

    cell += char
  }

  row.push(cell)
  rows.push(row)

  return rows.filter((items) => !(items.length === 1 && items[0] === ""))
}

export function formatDelimitedCell(value: string, delimiter = ",") {
  const needsQuotes =
    value.includes(delimiter) ||
    value.includes("\"") ||
    value.includes("\n") ||
    value.includes("\r")

  if (!needsQuotes) return value
  return `"${value.replace(/"/g, "\"\"")}"`
}

export function stringifyDelimitedRows(rows: string[][], delimiter = ",") {
  return rows
    .map((row) => row.map((cell) => formatDelimitedCell(cell, delimiter)).join(delimiter))
    .join("\n")
}

export function transposeRows(rows: string[][]) {
  const width = Math.max(0, ...rows.map((row) => row.length))

  return Array.from({ length: width }, (_, columnIndex) =>
    rows.map((row) => row[columnIndex] ?? "")
  )
}
