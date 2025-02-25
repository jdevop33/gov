"use client"

import { useState, useEffect } from "react"
import { Filters } from "@/components/Filters"
import { getData } from "@/lib/getData"
import Layout from "@/components/Layout"

interface MunicipalityData {
  REF_DATE: string;
  "Type of municipality by population size": string;
  GEO: string;
  "Core public infrastructure assets": string;
  VALUE: number;
}

interface TrendDataPoint {
  year: number;
  value: number;
  assetType: string;
  [key: string]: number | string; // Only allow number or string values
}
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
  const [data, setData] = useState<MunicipalityData[]>([])
  const [years, setYears] = useState<number[]>([])
  const [assets, setAssets] = useState<string[]>([])
  const [geoLocations, setGeoLocations] = useState<string[]>([])
  const [municipalityTypes, setMunicipalityTypes] = useState<string[]>([])
  const [latestYear, setLatestYear] = useState(0)
  const [totalAssets, setTotalAssets] = useState(0)
  const [totalMunicipalities, setTotalMunicipalities] = useState(0)
  const [assetTotals, setAssetTotals] = useState<{ name: string; value: number; }[]>([])
  const [trendData, setTrendData] = useState<TrendDataPoint[]>([])
  const [geoDistribution, setGeoDistribution] = useState<{ name: string; value: number; }[]>([])
  const [municipalityTypeDistribution, setMunicipalityTypeDistribution] = useState<{ name: string; value: number; }[]>([])
  const [selectedYear, setSelectedYear] = useState(0)
  const [selectedAsset, setSelectedAsset] = useState("")
  const [selectedMunicipalityType, setSelectedMunicipalityType] = useState("All")
  const [selectedGeoLocation, setSelectedGeoLocation] = useState("All")
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const fetchedData = await getData()
        setData(fetchedData.data)
        setYears(fetchedData.years)
        setAssets(fetchedData.assets)
        setMunicipalityTypes(fetchedData.municipalityTypes)
        setGeoLocations(fetchedData.geoLocations)
        setLatestYear(fetchedData.latestYear)
        setTotalAssets(fetchedData.totalAssets)
        setTotalMunicipalities(fetchedData.data.length)
        setAssetTotals(fetchedData.assetTotals)
        setTrendData(fetchedData.trendData)
        setGeoDistribution(fetchedData.geoDistribution)
        setMunicipalityTypeDistribution(fetchedData.municipalityTypeDistribution)
        setSelectedYear(fetchedData.years[0])
        setSelectedAsset(fetchedData.assets[0])
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
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

  const filteredData = data.filter((item: MunicipalityData) => {
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

  // Calculate some financial metrics for CFOs
  const assetGrowthRate = trendData.length > 1 
    ? ((trendData[0].value - trendData[trendData.length-1].value) / trendData[trendData.length-1].value * 100).toFixed(1)
    : "0";
  
  const avgAssetValue = totalMunicipalities > 0 
    ? (totalAssets / totalMunicipalities).toFixed(2)
    : "0";

  // Loading indicator handled in the return statement

  const dashboard = (
    <div className="flex flex-col space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">BC Municipality Infrastructure Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Financial insights and infrastructure analysis for municipal decision makers
        </p>
      </div>
      
      {/* Filters and Controls */}
      <div className="sticky top-16 z-[5] -mx-4 px-4 py-3 bg-background/95 backdrop-blur-sm border-b border-border">
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
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-dashboard flex flex-col">
          <span className="text-sm font-medium text-muted-foreground">Total Assets Value</span>
          <span className="text-2xl font-bold finance-value mt-1">${(totalAssets / 1000).toFixed(1)}B</span>
          <span className={`text-xs mt-1 ${Number(assetGrowthRate) > 0 ? 'trend-positive' : 'trend-negative'}`}>
            {Number(assetGrowthRate) > 0 ? '↑' : '↓'} {Math.abs(Number(assetGrowthRate))}% since {years[years.length-1]}
          </span>
        </div>
        <div className="card-dashboard flex flex-col">
          <span className="text-sm font-medium text-muted-foreground">Municipalities</span>
          <span className="text-2xl font-bold finance-value mt-1">{totalMunicipalities}</span>
          <span className="text-xs mt-1 trend-neutral">As of {latestYear}</span>
        </div>
        <div className="card-dashboard flex flex-col">
          <span className="text-sm font-medium text-muted-foreground">Average Asset Value</span>
          <span className="text-2xl font-bold finance-value mt-1">${avgAssetValue}M</span>
          <span className="text-xs mt-1 trend-neutral">Per municipality</span>
        </div>
        <div className="card-dashboard flex flex-col">
          <span className="text-sm font-medium text-muted-foreground">Asset Types</span>
          <span className="text-2xl font-bold finance-value mt-1">{assets.length}</span>
          <span className="text-xs mt-1 trend-neutral">Infrastructure categories</span>
        </div>
      </div>

      {/* Dashboard Tabs */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="flex border-b border-border">
          <button 
            onClick={() => setActiveTab('overview')} 
            className={`px-4 py-3 text-sm font-medium ${activeTab === 'overview' 
              ? 'bg-background border-b-2 border-primary text-primary' 
              : 'text-muted-foreground hover:text-foreground'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('analysis')} 
            className={`px-4 py-3 text-sm font-medium ${activeTab === 'analysis' 
              ? 'bg-background border-b-2 border-primary text-primary' 
              : 'text-muted-foreground hover:text-foreground'}`}
          >
            Financial Analysis
          </button>
          <button 
            onClick={() => setActiveTab('planning')} 
            className={`px-4 py-3 text-sm font-medium ${activeTab === 'planning' 
              ? 'bg-background border-b-2 border-primary text-primary' 
              : 'text-muted-foreground hover:text-foreground'}`}
          >
            Planning Tools
          </button>
          <button 
            onClick={() => setActiveTab('detailed')} 
            className={`px-4 py-3 text-sm font-medium ${activeTab === 'detailed' 
              ? 'bg-background border-b-2 border-primary text-primary' 
              : 'text-muted-foreground hover:text-foreground'}`}
          >
            Detailed Data
          </button>
        </div>
        
        {/* Tab Content */}
        <div className="p-4">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Overview Tab */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <SummaryStats 
                  totalAssets={totalAssets} 
                  totalMunicipalities={totalMunicipalities} 
                  latestYear={latestYear} 
                />
                <AssetDistributionPieChart data={assetTotals} />
                <AssetTrendLineChart data={trendData.map(({year, value}) => ({year, value}))} />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GeoDistributionChart data={geoDistribution} />
                <MunicipalityTypeChart data={municipalityTypeDistribution} />
              </div>
            </div>
          )}
          
          {activeTab === 'analysis' && (
            <div className="space-y-6">
              {/* Financial Analysis Tab */}
              <h3 className="text-lg font-medium">Infrastructure Investment Analysis</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <InfrastructureTrendChart 
                  data={trendData.map(({year, value}) => ({year, value}))} 
                  asset={selectedAsset} 
                />
                <InvestmentBreakdownChart data={assetTotals} />
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                <InfrastructureBarChart 
                  data={filteredData.map(item => ({
                    ...item,
                    type: item["Core public infrastructure assets"]
                  }))} 
                  asset={"VALUE"} 
                />
              </div>
              
              <ComparisonView data={data} years={years} assets={assets} />
              
              <DashboardOverview
                totalInvestment={100}
                publicTransitInvestment={25}
                greenInfrastructureInvestment={20}
                socialInfrastructureInvestment={30}
                ruralNorthernInvestment={15}
                tradeTransportationInvestment={10}
              />
            </div>
          )}
          
          {activeTab === 'planning' && (
            <div className="space-y-6">
              {/* Planning Tools Tab */}
              <h3 className="text-lg font-medium">Asset Management Planning</h3>
              <div className="grid grid-cols-1 gap-6">
                <AssetManagementCapabilities />
                <AssetManagementQuestionnaire />
                <PlanningTool />
                <InfrastructurePieChart data={municipalityTypeDistribution} asset={"VALUE"} />
              </div>
            </div>
          )}
          
          {activeTab === 'detailed' && (
            <div className="space-y-6">
              {/* Detailed Data Tab */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Detailed Infrastructure Data</h3>
                <ExportData data={filteredData} filename="municipality_data.csv" />
              </div>
              <DetailedDataTable 
                data={filteredData.map(item => ({ 
                  ...item, 
                  UOM: 'dollars', 
                  SCALAR_FACTOR: 'millions', 
                  VALUE: item.VALUE.toString() 
                }))} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
  
  return (
    <Layout>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : dashboard}
    </Layout>
  )
}

