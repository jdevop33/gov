'use client'

import React from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

// Create Material UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#036'
    },
    secondary: {
      main: '#C63527'
    }
  },
  typography: {
    fontFamily: 'var(--font-sans)',
  },
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}