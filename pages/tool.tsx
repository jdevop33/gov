import type React from "react"
import { Typography, Box, Button } from "@mui/material"
import Layout from "../components/Layout"
import PlanningTool from "../components/PlanningTool"
import Link from "next/link"

const Tool: React.FC = () => {
  return (
    <Layout>
      <Typography variant="h4" component="h1" gutterBottom>
        Long-Term Financial Planning Tool
      </Typography>
      <Typography variant="body1" paragraph>
        Use this advanced tool to start your long-term financial planning for asset management. Enter your total asset
        value, current annual funding, and adjust other parameters to get a comprehensive estimate of your funding gap.
      </Typography>
      <Typography variant="body1" paragraph>
        If you need help understanding any of the concepts, please refer back to the guide.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <PlanningTool />
      </Box>
      <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
        <Link href="/guide" passHref>
          <Button variant="outlined" color="primary">
            Back to Guide
          </Button>
        </Link>
        <Link href="/strategies" passHref>
          <Button variant="contained" color="primary">
            Explore Strategies
          </Button>
        </Link>
      </Box>
    </Layout>
  )
}

export default Tool

