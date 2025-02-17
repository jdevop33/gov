"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
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
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="year">Select Year</Label>
            <Select onValueChange={handleYearChange} value={selectedYear}>
              <SelectTrigger id="year">
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
          <div className="space-y-2">
            <Label htmlFor="asset">Select Asset Type</Label>
            <Select onValueChange={handleAssetChange} value={selectedAsset}>
              <SelectTrigger id="asset">
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
          <div className="space-y-2">
            <Label htmlFor="municipalityType">Select Municipality Type</Label>
            <Select onValueChange={handleMunicipalityTypeChange} value={selectedMunicipalityType}>
              <SelectTrigger id="municipalityType">
                <SelectValue placeholder="Select municipality type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                {municipalityTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="geoLocation">Select Geographic Location</Label>
            <Select onValueChange={handleGeoLocationChange} value={selectedGeoLocation}>
              <SelectTrigger id="geoLocation">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                {geoLocations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

