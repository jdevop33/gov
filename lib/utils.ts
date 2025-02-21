import Papa from "papaparse"

interface CSVRow {
  VALUE: string;
  [key: string]: string;
}

export async function fetchCSVData(url: string) {
  const response = await fetch(url)
  const csvText = await response.text()
  return new Promise<CSVRow[]>((resolve, reject) => {
    Papa.parse<CSVRow>(csvText, {
      header: true,
      complete: (results: Papa.ParseResult<CSVRow>): void => resolve(results.data),
      error: (error: Error): void => reject(error),
    })
  })
}

export function processData(data: CSVRow[]) {
  return data.filter((row) => row.VALUE !== "")
}

export function getUniqueValues<T extends { [key: string]: unknown }>(data: T[], key: string) {
  return Array.from(new Set(data.map((item) => item[key])))
}

export function formatNumber(num: number) {
  return num.toLocaleString("en-US", { maximumFractionDigits: 0 })
}

