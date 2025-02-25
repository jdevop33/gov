"use client"

import { Line, LineChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, Area, AreaChart, ReferenceLine } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatNumber } from "@/lib/utils"

type DataItem = {
  year: number
  [key: string]: number
}

type Props = {
  data: DataItem[]
}

// BC Government focused color palette
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
        <p className="font-medium mb-1">Fiscal Year: {label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex justify-between items-center gap-4 text-sm">
            <span style={{ color: entry.color }}>{entry.name}:</span>
            <span className="font-mono">${formatNumber(entry.value)}M</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function AssetTrendLineChart({ data }: Props) {
  if (!data || data.length === 0) {
    return null // Don't render the component if data is not available
  }

  const assets = Object.keys(data[0]).filter((key) => key !== "year")
  
  // Sort data by year - ascending for proper trend visualization
  const sortedData = [...data].sort((a, b) => a.year - b.year);
  
  // Calculate year-over-year growth rate
  const firstYearValue = sortedData[0]?.value || 0;
  const lastYearValue = sortedData[sortedData.length - 1]?.value || 0;
  const growthRate = firstYearValue !== 0 
    ? ((lastYearValue - firstYearValue) / firstYearValue * 100).toFixed(1)
    : "0";
  
  // Find the min and max values for axis scaling
  const allValues = sortedData.flatMap(item => 
    Object.entries(item)
      .filter(([key]) => key !== 'year')
      .map(([_, value]) => Number(value))
  );
  
  const maxValue = Math.max(...allValues) * 1.1; // Add 10% padding
  const hasGrowth = Number(growthRate) > 0;

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">Asset Value Trends</CardTitle>
            <p className="text-sm text-muted-foreground">Infrastructure value over time</p>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${hasGrowth ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
            {hasGrowth ? '↑' : '↓'} {Math.abs(Number(growthRate))}% change
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={sortedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS[0]} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={COLORS[0]} stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
            <XAxis 
              dataKey="year" 
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tickFormatter={(value) => `$${formatNumber(value)}M`} 
              axisLine={false}
              tickLine={false}
              width={80}
              domain={[0, maxValue]}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={firstYearValue} stroke="#666" strokeDasharray="3 3" />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={COLORS[0]} 
              fillOpacity={1} 
              fill="url(#colorValue)" 
              strokeWidth={2} 
            />
            {assets.map((asset, index) => (
              asset !== 'value' && (
                <Line
                  key={asset}
                  type="monotone"
                  dataKey={asset}
                  name={asset}
                  stroke={COLORS[(index + 1) % COLORS.length]}
                  strokeWidth={2}
                  dot={{ stroke: COLORS[(index + 1) % COLORS.length], strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: COLORS[(index + 1) % COLORS.length], strokeWidth: 2 }}
                />
              )
            ))}
          </AreaChart>
        </ResponsiveContainer>
        
        {/* Financial Trend Analysis */}
        <div className="mt-2 pt-4 border-t border-border">
          <div className="flex justify-between text-xs text-muted-foreground">
            <div>Starting value: <span className="font-mono font-medium">${formatNumber(firstYearValue)}M</span></div>
            <div>Current value: <span className="font-mono font-medium">${formatNumber(lastYearValue)}M</span></div>
            <div>
              Change: <span className={`font-mono font-medium ${hasGrowth ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                ${formatNumber(Math.abs(lastYearValue - firstYearValue))}M
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

