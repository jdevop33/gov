"use client"

import { useState, useEffect } from "react"
import { Filters } from "@/components/Filters"
import { getData } from "@/lib/getData"
import { AssetDistributionPieChart } from "@/components/AssetDistributionPieChart"
import { AssetTrendLineChart } from "@/components/AssetTrendLineChart"
import { ComparisonView } from "@/components/ComparisonView"
import { DetailedDataTable } from "@/components/DetailedDataTable"
import { DashboardOverview } from "@/components/DashboardOverview"
import { GeoDistributionChart } from "@/components/GeoDistributionChart"
import { InfrastructureBarChart } from "@/components/InfrastructureBarChart"
import { InfrastructurePieChart } from "@/components/InfrastructurePieChart"
import { InfrastructureTrendChart } from "@/components/InfrastructureTrendChart"
import { InvestmentBreakdownChart } from "@/components/InvestmentBreakdownChart"
import { MunicipalityTypeChart } from "@/components/MunicipalityTypeChart"
import { SummaryStats } from "@/components/SummaryStats"
import { AssetManagementCapabilities } from "@/components/AssetManagementCapabilities"
import { AssetManagementQuestionnaire } from "@/components/AssetManagementQuestionnaire"
import { ExportData } from "@/components/ExportData"
import PlanningTool from "@/components/PlanningTool"

export default function Page() {
  const [data, setData] = useState([])
  const [years, setYears] = useState<number[]>([])
  const [assets, setAssets] = useState<string[]>([])
  const [municipalityTypes, setMunicipalityTypes] = useState<string[]>([])
  const [geoLocations, setGeoLocations] = useState<string[]>([])
  const [latestYear, setLatestYear] = useState(0)
  const [defaultAsset, setDefaultAsset] = useState("")
  const [totalAssets, setTotalAssets] = useState(0)
  const [totalMunicipalities, setTotalMunicipalities] = useState(0)
  const [assetTotals, setAssetTotals] = useState([])
  const [trendData, setTrendData] = useState<any[]>([])
  const [geoDistribution, setGeoDistribution] = useState([])
  const [municipalityTypeDistribution, setMunicipalityTypeDistribution] = useState([])
  const [selectedYear, setSelectedYear] = useState(0)
  const [selectedAsset, setSelectedAsset] = useState("")
  const [selectedMunicipalityType, setSelectedMunicipalityType] = useState("All")
  const [selectedGeoLocation, setSelectedGeoLocation] = useState("All")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getData()
        setData(fetchedData.data)
        setYears(fetchedData.years)
        setAssets(fetchedData.assets)
        setMunicipalityTypes(fetchedData.municipalityTypes)
        setGeoLocations(fetchedData.geoLocations)
        setLatestYear(fetchedData.latestYear)
        setDefaultAsset(fetchedData.defaultAsset)
        setTotalAssets(fetchedData.totalAssets)
        setTotalMunicipalities(fetchedData.totalMunicipalities)
        setAssetTotals(fetchedData.assetTotals)
        setTrendData(fetchedData.trendData)
        setGeoDistribution(fetchedData.geoDistribution)
        setMunicipalityTypeDistribution(fetchedData.municipalityTypeDistribution)
        setSelectedYear(fetchedData.years[0])
        setSelectedAsset(fetchedData.assets[0])
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchData()
  }, [])

  const handleYearChange = (year: number) => {
    setSelectedYear(year)
  }

  const handleAssetChange = (asset: string) => {
    setSelectedAsset(asset)
  }

  const handleMunicipalityTypeChange = (type: string) => {
    setSelectedMunicipalityType(type)
  }

  const handleGeoLocationChange = (location: string) => {
    setSelectedGeoLocation(location)
  }

  const filteredData = data.filter((item: any) => {
    if (selectedYear === 0) return true
    if (
      selectedMunicipalityType !== "All" &&
      item["Type of municipality by population size"] !== selectedMunicipalityType
    )
      return false
    if (selectedGeoLocation !== "All" && item.GEO !== selectedGeoLocation) return false
    return (
      Number.parseInt(item.REF_DATE) === selectedYear && item["Core public infrastructure assets"] === selectedAsset
    )
  })

  return (
    <main className="flex flex-col gap-4 p-4">
      <Filters
        years={years}
        assets={assets}
        municipalityTypes={municipalityTypes}
        geoLocations={geoLocations}
        onYearChange={handleYearChange}
        onAssetChange={handleAssetChange}
        onMunicipalityTypeChange={handleMunicipalityTypeChange}
        onGeoLocationChange={handleGeoLocationChange}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SummaryStats totalAssets={totalAssets} totalMunicipalities={totalMunicipalities} latestYear={latestYear} />
        <AssetDistributionPieChart data={assetTotals} />
        <AssetTrendLineChart data={trendData} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GeoDistributionChart data={geoDistribution} />
        <MunicipalityTypeChart data={municipalityTypeDistribution} />
      </div>
      <ComparisonView data={data} years={years} assets={assets} />
      <InfrastructureBarChart data={filteredData} asset={"VALUE"} />
      <InfrastructureTrendChart data={trendData} asset={selectedAsset} />
      <InfrastructurePieChart data={municipalityTypeDistribution} asset={"VALUE"} />
      <DetailedDataTable data={filteredData} />
      <ExportData data={filteredData} filename="municipality_data.csv" />
      <AssetManagementQuestionnaire />
      <AssetManagementCapabilities />
      <PlanningTool />
      <DashboardOverview
        totalInvestment={100}
        publicTransitInvestment={25}
        greenInfrastructureInvestment={20}
        socialInfrastructureInvestment={30}
        ruralNorthernInvestment={15}
        tradeTransportationInvestment={10}
      />
      <InvestmentBreakdownChart data={assetTotals} />
    </main>
  )
}

