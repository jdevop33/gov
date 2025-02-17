import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Municipality Infrastructure Benchmarks",
  description: "Visualizing top-performing municipalities' infrastructure data",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col`}>{children}</body>
    </html>
  )
}

