"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Props = {
  years: number[]
  assets: string[]
  municipalityTypes: string[]
  geoLocations: string[]
  onYearChange: (year: number) => void
  onAssetChange: (asset: string) => void
  onMunicipalityTypeChange: (type: string) => void
  onGeoLocationChange: (location: string) => void
}

export function Filters({
  years,
  assets,
  municipalityTypes,
  geoLocations,
  onYearChange,
  onAssetChange,
  onMunicipalityTypeChange,
  onGeoLocationChange,
}: Props) {
  const [selectedYear, setSelectedYear] = useState<string>("")
  const [selectedAsset, setSelectedAsset] = useState<string>("")
  const [selectedMunicipalityType, setSelectedMunicipalityType] = useState<string>("All")
  const [selectedGeoLocation, setSelectedGeoLocation] = useState<string>("All")
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false)

  useEffect(() => {
    if (years.length > 0) {
      setSelectedYear(years[0].toString())
    }
    if (assets.length > 0) {
      setSelectedAsset(assets[0])
    }
  }, [years, assets])

  const handleYearChange = (value: string) => {
    setSelectedYear(value)
    onYearChange(Number(value))
  }

  const handleAssetChange = (value: string) => {
    setSelectedAsset(value)
    onAssetChange(value)
  }

  const handleMunicipalityTypeChange = (value: string) => {
    setSelectedMunicipalityType(value)
    onMunicipalityTypeChange(value)
  }

  const handleGeoLocationChange = (value: string) => {
    setSelectedGeoLocation(value)
    onGeoLocationChange(value)
  }

  if (!years.length || !assets.length) {
    return null // Don't render the component if data is not available
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Primary Filters - Always Visible */}
        <div className="flex-1 space-y-2">
          <Label htmlFor="year" className="text-xs text-muted-foreground uppercase tracking-wider">
            Fiscal Year
          </Label>
          <Select onValueChange={handleYearChange} value={selectedYear}>
            <SelectTrigger id="year" className="w-full bg-background">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex-1 space-y-2">
          <Label htmlFor="asset" className="text-xs text-muted-foreground uppercase tracking-wider">
            Asset Category
          </Label>
          <Select onValueChange={handleAssetChange} value={selectedAsset}>
            <SelectTrigger id="asset" className="w-full bg-background">
              <SelectValue placeholder="Select asset type" />
            </SelectTrigger>
            <SelectContent>
              {assets.map((asset) => (
                <SelectItem key={asset} value={asset}>
                  {asset}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Toggle Button for Advanced Filters */}
        <div className="flex items-end">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="py-2 px-4 text-sm font-medium text-primary hover:text-primary/90 focus:outline-none"
          >
            {showAdvanced ? "Hide Filters" : "Advanced Filters"}
          </button>
        </div>
      </div>
      
      {/* Advanced Filters - Conditionally Visible */}
      {showAdvanced && (
        <div className="pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="municipalityType" className="text-xs text-muted-foreground uppercase tracking-wider">
              Municipality Size
            </Label>
            <Select onValueChange={handleMunicipalityTypeChange} value={selectedMunicipalityType}>
              <SelectTrigger id="municipalityType" className="w-full bg-background">
                <SelectValue placeholder="Select municipality type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Sizes</SelectItem>
                {municipalityTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="geoLocation" className="text-xs text-muted-foreground uppercase tracking-wider">
              Geographic Region
            </Label>
            <Select onValueChange={handleGeoLocationChange} value={selectedGeoLocation}>
              <SelectTrigger id="geoLocation" className="w-full bg-background">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Regions</SelectItem>
                {geoLocations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  )
}

