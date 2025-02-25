import React from "react"
import { Inter, Roboto_Mono } from "next/font/google"
import "./globals.css"
import ClientLayout from "@/components/ClientLayout"

// Primary font for text
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
})

// Monospace font for data and numbers
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
})

export const metadata = {
  title: "BC Municipality Infrastructure Dashboard",
  description: "Financial insights and infrastructure benchmarks for BC municipal managers and CFOs",
  keywords: "BC municipality, infrastructure, financial planning, asset management, municipal finance",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.variable} ${robotoMono.variable} font-sans bg-background text-foreground antialiased min-h-screen flex flex-col`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}

