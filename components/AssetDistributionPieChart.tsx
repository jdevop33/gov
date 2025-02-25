"use client"

import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatNumber } from "@/lib/utils"

interface DataItem {
  [key: string]: string | number;
}

type Props = {
  data: DataItem[]
}

// BC Government focused color palette - accessible and distinct
const COLORS = [
  "hsl(var(--chart-1))", // Blue - Primary
  "hsl(var(--chart-2))", // Green - Growth
  "hsl(var(--chart-3))", // Red - Critical
  "hsl(var(--chart-4))", // Orange - Secondary
  "hsl(var(--chart-5))"  // Purple - Tertiary
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover/95 backdrop-blur-sm p-3 rounded-lg shadow-md border border-border">
        <p className="font-medium text-sm">{payload[0].name}</p>
        <p className="text-sm font-mono">${formatNumber(Number(payload[0].value))} million</p>
        <p className="text-xs text-muted-foreground">{(payload[0].payload.percent * 100).toFixed(1)}% of total</p>
      </div>
    );
  }
  return null;
};

export function AssetDistributionPieChart({ data }: Props) {
  // Calculate percentages for each item
  const total = data.reduce((sum, item) => sum + (Number(item.value) || 0), 0)
  const dataWithPercent = data.map(item => ({
    ...item,
    percent: total > 0 ? Number(item.value) / total : 0
  }))
  
  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">Asset Distribution</CardTitle>
        <p className="text-sm text-muted-foreground">Infrastructure investment by category</p>
      </CardHeader>
      <CardContent className="pt-4">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={dataWithPercent}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              cornerRadius={3}
              stroke="transparent"
            >
              {dataWithPercent.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                  className="drop-shadow-sm hover:opacity-90 transition-opacity"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              layout="vertical" 
              verticalAlign="middle" 
              align="right"
              formatter={(value, entry, index) => (
                <span className="text-xs font-medium">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Financial Summary Below Chart */}
        <div className="mt-2 pt-4 border-t border-border grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Total Value</p>
            <p className="text-lg font-mono font-medium">${formatNumber(total)}M</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Asset Categories</p>
            <p className="text-lg font-mono font-medium">{data.length}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

