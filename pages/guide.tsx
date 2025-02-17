import type React from "react"
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Layout from "../components/Layout"
import Link from "next/link"

const GuideContent = [
  {
    title: "Module One: Introductions",
    content: [
      "Purpose of this Guide: Empower professionals to develop long-term, sustainable funding for public assets.",
      "Public Assets – Duty of Stewardship: Local governments own approximately 60% of public infrastructure.",
      "Asset Management BC Framework: A systemic approach for local governments to move toward service, asset, and financial sustainability.",
      "Sustainable Funding: The choice to fund infrastructure replacement over the lifetime of assets.",
      "Atelophobia – The Imperfection Principal: Don't let fear of imperfection prevent long-term financial planning.",
    ],
  },
  {
    title: "Module Two: Data Collections",
    content: [
      "Infrastructure Material: Crucial for determining forecasted infrastructure replacement years.",
      "Infrastructure Size, Location, and Acquisition Year: Used for estimating replacement costs.",
      "Costing Information: Sources include recent capital projects, engineering firms, quantity surveyors, and software.",
      "Estimated Useful Lives: Requires local professional judgement and distinguishing between physical life and estimated useful life.",
      "Funding Levels: Determine existing infrastructure funding levels in cooperation with your finance department.",
      "Condition Assessments: Valuable for determining and validating useful life assumptions.",
    ],
  },
  {
    title: "Module Three: Core Calculations",
    content: [
      "Replacement Costs: Often follows a five-step classification system for capital project costing.",
      "Sustainable Annual Funding: Calculated by dividing an asset's replacement cost by its useful life.",
      "Annual Funding Gap: The difference between sustainable annual funding and actual annual funding.",
      "Asset Consumption: Demonstrates how close an asset is to its replacement date.",
      "Accumulated Infrastructure Funding Gap: A measure of the underfunded consumption throughout the history of owned assets.",
    ],
  },
  {
    title: "Module Four: Modelling",
    content: [
      "Spending Forecasts Modelling: Recommended forecasting horizon of 100 years to capture full life-cycle costs.",
      "Componentized Assets: Include detailed forecasts for assets like buildings and roads with multiple components.",
      "Reserve Forecasts: Model reserve balances to ensure funds are available for infrastructure replacement.",
      "Investment Returns & Debt Servicing: Consider potential investment returns and debt servicing costs when evaluating funding options.",
      "100-Year Funding Gap: Demonstrates the unsustainability of current funding levels over a long-term horizon.",
    ],
  },
  {
    title: "Module Five: Developing Funding Options",
    content: [
      "Property Taxation and Utility Fees: Determine tax increase options to close the annual funding gap.",
      "Non-Market Change Revenue: Consider using revenue from newly developed properties to help close the funding gap.",
      "Grants from Senior Level of Government: Dedicate stable, predictable funding for infrastructure replacement.",
      "Casino Revenue, Lease Revenue, and Other: Consider dedicating surplus revenues to fund capital maintenance and replacement costs.",
    ],
  },
  {
    title: "Module Six: Sensitivity Analysis",
    content: [
      "Purpose: Validate broad findings and conclusions by varying key assumptions.",
      "Key Variables: Include useful/physical lives, unit rates, investment returns, and debt interest.",
      "Process: Model optimistic and conservative assumptions for key variables.",
      "Importance: Ensures that overall conclusions remain valid even with imperfect predictions.",
    ],
  },
  {
    title: "Module Seven: Communicating Findings",
    content: [
      "Communications Plan: Include timelines, resources, strategies, and materials.",
      "News Release: Craft a compelling headline and lead paragraph, include relevant quotes.",
      "Executive Summary: Outline key findings, purpose of the plan, and recommendations.",
      "Key Recommendations: Include funding increases and policy recommendations.",
      "Other Materials: Develop key messages, Q&As, social media content, and consider creating a short video.",
    ],
  },
]

const Guide: React.FC = () => {
  return (
    <Layout>
      <Typography variant="h4" component="h1" gutterBottom>
        Long-Term Financial Plan Guide
      </Typography>
      <Typography variant="body1" paragraph>
        This comprehensive guide will walk you through the key concepts and best practices in long-term financial
        planning for asset management. Expand each module to learn more about its contents.
      </Typography>
      <Box sx={{ mt: 2 }}>
        {GuideContent.map((module, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{module.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {module.content.map((item, itemIndex) => (
                  <ListItem key={itemIndex}>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
        <Link href="/" passHref>
          <Button variant="outlined" color="primary">
            Back to Home
          </Button>
        </Link>
        <Link href="/tool" passHref>
          <Button variant="contained" color="primary">
            Proceed to Planning Tool
          </Button>
        </Link>
      </Box>
    </Layout>
  )
}

export default Guide

