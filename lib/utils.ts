import Papa from "papaparse"

export async function fetchCSVData(url: string) {
  const response = await fetch(url)
  const csvText = await response.text()
  return new Promise<any[]>((resolve, reject) => {
    Papa.parse(csvText, {
      header: true,
      complete: (results) => resolve(results.data),
      error: (error) => reject(error),
    })
  })
}

export function processData(data: any[]) {
  return data.filter((row) => row.VALUE !== "")
}

export function getUniqueValues(data: any[], key: string) {
  return Array.from(new Set(data.map((item) => item[key])))
}

export function formatNumber(num: number) {
  return num.toLocaleString("en-US", { maximumFractionDigits: 0 })
}

