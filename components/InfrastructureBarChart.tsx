"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, TooltipProps } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatNumber } from "@/lib/utils"

type DataItem = {
  type: string
  [key: string]: number | string
}

type Props = {
  data: DataItem[]
  asset: string
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border rounded shadow">
        <p className="font-bold">{label}</p>
        <p>{`${payload[0].name}: ${formatNumber(Number(payload[0].value))}`}</p>
        <p className="text-sm text-gray-500">Click for more details</p>
      </div>
    )
  }

  return null
}

export function InfrastructureBarChart({ data, asset }: Props) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{asset} by Municipality Type</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis tickFormatter={(value) => `${formatNumber(value)}`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey={asset} fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

