"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"

interface LayoutProps {
  children: React.ReactNode
}

const navItems = [
  { title: "Home", path: "/" },
  { title: "Guide", path: "/guide" },
  { title: "Planning Tool", path: "/tool" },
  { title: "Strategies", path: "/strategies" },
]

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Long-Term Financial Plan Guide
      </Typography>
      <List>
        {navItems.map((item) => (
          <Link href={item.path} key={item.title} passHref>
            <ListItem button component="a">
              <ListItemText primary={item.title} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Long-Term Financial Plan Guide
          </Typography>
          {!isMobile &&
            navItems.map((item) => (
              <Link href={item.path} key={item.title} passHref>
                <Typography
                  component="a"
                  sx={{ color: "white", marginLeft: 2, cursor: "pointer", textDecoration: "none" }}
                >
                  {item.title}
                </Typography>
              </Link>
            ))}
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        {children}
      </Container>
      <Box component="footer" sx={{ py: 3, px: 2, mt: "auto", backgroundColor: "background.paper" }}>
        <Container maxWidth="sm">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Long-Term Financial Plan Guide
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}

export default Layout

