"use client"

import { Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatNumber } from "@/lib/utils"

type DataItem = {
  name: string
  value: number
}

type Props = {
  data: DataItem[]
  asset: string
}

export function InfrastructurePieChart({ data, asset }: Props) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{asset} Infrastructure Distribution</CardTitle>
        <CardDescription>Distribution across municipality types</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            />
            <Tooltip formatter={(value) => formatNumber(Number(value))} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

