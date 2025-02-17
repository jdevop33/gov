"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { formatNumber } from "@/lib/utils"

type ComparisonData = {
  type: string
  [key: string]: number | string
}

type Props = {
  data: any[]
  years: number[]
  assets: string[]
}

export function ComparisonView({ data, years, assets }: Props) {
  const [year1, setYear1] = useState(years[0])
  const [year2, setYear2] = useState(years[1] || years[0])
  const [asset, setAsset] = useState(assets[0])

  const getDataForYear = (year: number) => {
    return data
      .filter((item) => Number.parseInt(item.REF_DATE) === year && item["Core public infrastructure assets"] === asset)
      .reduce((acc: ComparisonData[], curr) => {
        const type = curr["Type of municipality by population size"]
        const value = Number.parseFloat(curr.VALUE)
        acc.push({ type, [year.toString()]: value })
        return acc
      }, [])
  }

  const comparisonData = getDataForYear(year1).map((item) => ({
    ...item,
    [year2.toString()]: getDataForYear(year2).find((y2Item) => y2Item.type === item.type)?.[year2.toString()] || 0,
  }))

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Comparison View</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <Select onValueChange={(value) => setYear1(Number.parseInt(value))} defaultValue={year1.toString()}>
            <SelectTrigger>
              <SelectValue placeholder="Select year 1" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setYear2(Number.parseInt(value))} defaultValue={year2.toString()}>
            <SelectTrigger>
              <SelectValue placeholder="Select year 2" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={setAsset} defaultValue={asset}>
            <SelectTrigger>
              <SelectValue placeholder="Select asset" />
            </SelectTrigger>
            <SelectContent>
              {assets.map((assetType) => (
                <SelectItem key={assetType} value={assetType}>
                  {assetType}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis tickFormatter={(value) => `${formatNumber(value)}`} />
            <Tooltip formatter={(value) => formatNumber(Number(value))} />
            <Legend />
            <Bar dataKey={year1.toString()} fill="#8884d8" />
            <Bar dataKey={year2.toString()} fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

