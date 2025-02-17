"use client"

import type React from "react"
import { useState } from "react"
import { TextField, Button, Typography, Box, Paper, Grid, Slider, useMediaQuery, useTheme } from "@mui/material"
import FundingGapChart from "./FundingGapChart"

const PlanningTool: React.FC = () => {
  const [totalAssets, setTotalAssets] = useState("")
  const [annualFunding, setAnnualFunding] = useState("")
  const [usefulLife, setUsefulLife] = useState(50)
  const [investmentReturn, setInvestmentReturn] = useState(2)
  const [result, setResult] = useState<string | null>(null)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const calculateFundingGap = () => {
    const assets = Number.parseFloat(totalAssets)
    const funding = Number.parseFloat(annualFunding)

    if (isNaN(assets) || isNaN(funding)) {
      setResult("Please enter valid numbers for Total Asset Value and Current Annual Funding")
      return
    }

    const sustainableFunding = assets / usefulLife
    const fundingGap = sustainableFunding - funding

    // Calculate the impact of investment returns
    const annualContribution = funding
    let totalWithReturns = 0
    for (let i = 0; i < usefulLife; i++) {
      totalWithReturns = (totalWithReturns + annualContribution) * (1 + investmentReturn / 100)
    }
    const fundingGapWithReturns = assets - totalWithReturns

    setResult(`Based on your inputs:
      Estimated sustainable annual funding: $${sustainableFunding.toFixed(2)}
      Current annual funding: $${funding.toFixed(2)}
      Estimated annual funding gap: $${fundingGap.toFixed(2)}

      Impact of investment returns:
      Total funding after ${usefulLife} years with ${investmentReturn}% return: $${totalWithReturns.toFixed(2)}
      Funding gap considering investment returns: $${fundingGapWithReturns.toFixed(2)}

      To close the funding gap, consider:
      1. Increasing annual funding
      2. Extending the useful life of assets through better maintenance
      3. Exploring additional funding sources as outlined in Module Five of the guide`)
  }

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Advanced Planning Tool
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Total Asset Value"
            type="number"
            value={totalAssets}
            onChange={(e) => setTotalAssets(e.target.value)}
            InputProps={{ startAdornment: "$" }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Current Annual Funding"
            type="number"
            value={annualFunding}
            onChange={(e) => setAnnualFunding(e.target.value)}
            InputProps={{ startAdornment: "$" }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography gutterBottom>Average Useful Life of Assets (years)</Typography>
          <Slider
            value={usefulLife}
            onChange={(_, newValue) => setUsefulLife(newValue as number)}
            min={10}
            max={100}
            valueLabelDisplay="auto"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography gutterBottom>Expected Investment Return (%)</Typography>
          <Slider
            value={investmentReturn}
            onChange={(_, newValue) => setInvestmentReturn(newValue as number)}
            min={0}
            max={10}
            step={0.1}
            valueLabelDisplay="auto"
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={calculateFundingGap} fullWidth>
            Calculate Funding Gap
          </Button>
        </Grid>
      </Grid>
      {result && (
        <Box sx={{ mt: 2 }}>
          <Typography
            variant="body1"
            component="pre"
            sx={{ whiteSpace: "pre-wrap", fontSize: isMobile ? "0.8rem" : "1rem" }}
          >
            {result}
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Funding Gap Visualization
            </Typography>
            <FundingGapChart
              totalAssets={Number.parseFloat(totalAssets)}
              annualFunding={Number.parseFloat(annualFunding)}
              usefulLife={usefulLife}
              investmentReturn={investmentReturn}
            />
          </Box>
        </Box>
      )}
    </Paper>
  )
}

export default PlanningTool

