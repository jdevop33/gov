"use client"

import { Line, LineChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatNumber } from "@/lib/utils"

type DataItem = {
  year: number
  [key: string]: number
}

type Props = {
  data: DataItem[]
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export function AssetTrendLineChart({ data }: Props) {
  if (!data || data.length === 0) {
    return null // Don't render the component if data is not available
  }

  const assets = Object.keys(data[0]).filter((key) => key !== "year")

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Asset Trends Over Time</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis tickFormatter={(value) => `${formatNumber(value)}`} />
            <Tooltip formatter={(value) => formatNumber(Number(value))} />
            <Legend />
            {assets.map((asset, index) => (
              <Line
                key={asset}
                type="monotone"
                dataKey={asset}
                stroke={COLORS[index % COLORS.length]}
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

