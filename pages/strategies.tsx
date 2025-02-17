import type React from "react"
import { Typography, Box, List, ListItem, ListItemIcon, ListItemText, Button } from "@mui/material"
import { AttachMoney, TrendingUp, Gavel, School } from "@mui/icons-material"
import Layout from "../components/Layout"
import Link from "next/link"

const strategies = [
  {
    title: "Increase Annual Funding",
    description: "Gradually increase property taxes or utility fees to close the funding gap over time.",
    icon: <AttachMoney />,
  },
  {
    title: "Optimize Asset Management",
    description:
      "Implement better maintenance practices to extend the useful life of assets and reduce long-term costs.",
    icon: <TrendingUp />,
  },
  {
    title: "Explore Alternative Funding Sources",
    description: "Investigate grants, public-private partnerships, or other innovative funding mechanisms.",
    icon: <Gavel />,
  },
  {
    title: "Improve Financial Planning",
    description:
      "Enhance budgeting processes and implement long-term financial forecasting to better anticipate and plan for future needs.",
    icon: <School />,
  },
]

const Strategies: React.FC = () => {
  return (
    <Layout>
      <Typography variant="h4" component="h1" gutterBottom>
        Strategies to Close the Funding Gap
      </Typography>
      <Typography variant="body1" paragraph>
        Based on the results from the planning tool, consider implementing one or more of the following strategies to
        improve your municipality's long-term financial sustainability:
      </Typography>
      <List>
        {strategies.map((strategy, index) => (
          <ListItem key={index}>
            <ListItemIcon>{strategy.icon}</ListItemIcon>
            <ListItemText primary={strategy.title} secondary={strategy.description} />
          </ListItem>
        ))}
      </List>
      <Typography variant="body1" sx={{ mt: 4 }}>
        Remember, the best approach often involves a combination of these strategies tailored to your municipality's
        specific needs and circumstances.
      </Typography>
      <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
        <Link href="/tool" passHref>
          <Button variant="outlined" color="primary">
            Back to Planning Tool
          </Button>
        </Link>
        <Link href="/" passHref>
          <Button variant="contained" color="primary">
            Start Over
          </Button>
        </Link>
      </Box>
    </Layout>
  )
}

export default Strategies

