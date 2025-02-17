"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatNumber } from "@/lib/utils"

type DataItem = {
  name: string
  value: number
}

type Props = {
  data: DataItem[]
}

export function GeoDistributionChart({ data }: Props) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Geographic Distribution of Infrastructure Assets</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" tickFormatter={(value) => `${formatNumber(value)}`} />
            <YAxis dataKey="name" type="category" width={120} />
            <Tooltip formatter={(value) => formatNumber(Number(value))} />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" name="Asset Value" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

