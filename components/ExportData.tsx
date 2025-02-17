"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

type Props = {
  data: any[]
  filename: string
}

export function ExportData({ data, filename }: Props) {
  const exportToCSV = () => {
    const headers = Object.keys(data[0])
    const csvContent = [
      headers.join(","),
      ...data.map((row) => headers.map((fieldName) => JSON.stringify(row[fieldName])).join(",")),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", filename)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <Button onClick={exportToCSV} className="flex items-center gap-2">
      <Download className="h-4 w-4" />
      Export Data
    </Button>
  )
}

