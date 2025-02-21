import { fetchCSVData, processData, getUniqueValues } from "./utils"

interface YearData {
  year: number;
  [key: string]: number;
}

const CSV_URL = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/34100269-TZn55QAO1VlA4KQSWKHvzNdRyZWQGa.csv"

export async function getData() {
  const rawData = await fetchCSVData(CSV_URL)
  const processedData = processData(rawData)

  const years = getUniqueValues(processedData, "REF_DATE")
    .map(Number)
    .sort((a, b) => b - a)
  const assets = getUniqueValues(processedData, "Core public infrastructure assets") as string[]
  const municipalityTypes = getUniqueValues(processedData, "Type of municipality by population size")
  const geoLocations = getUniqueValues(processedData, "GEO")
  const latestYear = years[0]
  const defaultAsset = assets[0]

  const totalAssets = processedData
    .filter((item) => Number.parseInt(item.REF_DATE) === latestYear)
    .reduce((sum, item) => sum + Number.parseFloat(item.VALUE), 0)

  const totalMunicipalities = municipalityTypes.length

  const assetTotals = assets.map((asset) => ({
    name: asset,
    value: processedData
      .filter((item) => Number.parseInt(item.REF_DATE) === latestYear && item["Core public infrastructure assets"] === asset)
      .reduce((sum, item) => sum + Number.parseFloat(item.VALUE), 0),
  }))

  const trendData = years.map((year) => {
    const yearData: YearData = { year }
    assets.forEach((asset: string) => {
      yearData[asset] = processedData
        .filter(
          (item) => Number.parseInt(item.REF_DATE) === year && item["Core public infrastructure assets"] === asset,
        )
        .reduce((sum, item) => sum + Number.parseFloat(item.VALUE), 0)
    })
    return yearData
  })

  const geoDistribution = geoLocations.map((geo) => ({
    name: geo,
    value: processedData
      .filter((item) => Number.parseInt(item.REF_DATE) === latestYear && item.GEO === geo)
      .reduce((sum, item) => sum + Number.parseFloat(item.VALUE), 0),
  }))

  const municipalityTypeDistribution = municipalityTypes.map((type) => ({
    name: type,
    value: processedData
      .filter(
        (item) =>
          Number.parseInt(item.REF_DATE) === latestYear && item["Type of municipality by population size"] === type,
      )
      .reduce((sum, item) => sum + Number.parseFloat(item.VALUE), 0),
  }))

  return {
    data: processedData,
    years,
    assets,
    municipalityTypes,
    geoLocations,
    latestYear,
    defaultAsset,
    totalAssets,
    totalMunicipalities,
    assetTotals,
    trendData,
    geoDistribution,
    municipalityTypeDistribution,
  }
}

