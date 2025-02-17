"use client"

import { Line, LineChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatNumber } from "@/lib/utils"

type DataItem = {
  year: number
  [key: string]: number
}

type Props = {
  data: DataItem[]
  asset: string
}

export function InfrastructureTrendChart({ data, asset }: Props) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{asset} Infrastructure Trend</CardTitle>
        <CardDescription>Value trends over time for different municipality types</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis tickFormatter={(value) => `${formatNumber(value)}`} />
            <Tooltip formatter={(value) => formatNumber(Number(value))} />
            <Legend />
            <Line type="monotone" dataKey="Large urban" stroke="#8884d8" />
            <Line type="monotone" dataKey="Medium urban" stroke="#82ca9d" />
            <Line type="monotone" dataKey="Small urban" stroke="#ffc658" />
            <Line type="monotone" dataKey="Rural" stroke="#ff7300" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

