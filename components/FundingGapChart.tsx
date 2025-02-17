import type React from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useMediaQuery, useTheme } from "@mui/material"

interface FundingGapChartProps {
  totalAssets: number
  annualFunding: number
  usefulLife: number
  investmentReturn: number
}

const FundingGapChart: React.FC<FundingGapChartProps> = ({
  totalAssets,
  annualFunding,
  usefulLife,
  investmentReturn,
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const data = []
  let cumulativeFunding = 0
  let cumulativeSustainable = 0
  const sustainableAnnual = totalAssets / usefulLife

  for (let year = 0; year <= usefulLife; year++) {
    cumulativeFunding = (cumulativeFunding + annualFunding) * (1 + investmentReturn / 100)
    cumulativeSustainable += sustainableAnnual
    data.push({
      year,
      current: cumulativeFunding,
      sustainable: cumulativeSustainable,
    })
  }

  return (
    <ResponsiveContainer width="100%" height={isMobile ? 300 : 400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="year"
          label={{ value: "Years", position: "insideBottom", offset: -5 }}
          tick={isMobile ? { fontSize: 10 } : {}}
        />
        <YAxis
          label={{ value: "Cumulative Funding ($)", angle: -90, position: "insideLeft" }}
          tick={isMobile ? { fontSize: 10 } : {}}
        />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="current" stroke="#8884d8" name="Current Funding" />
        <Line type="monotone" dataKey="sustainable" stroke="#82ca9d" name="Sustainable Funding" />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default FundingGapChart

