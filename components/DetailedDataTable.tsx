"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { formatNumber } from "@/lib/utils"

type DataItem = {
  REF_DATE: string
  GEO: string
  "Core public infrastructure assets": string
  "Type of municipality by population size": string
  UOM: string
  SCALAR_FACTOR: string
  VALUE: string
}

type Props = {
  data: DataItem[]
}

export function DetailedDataTable({ data }: Props) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(data.length / itemsPerPage)

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return data.slice(startIndex, endIndex)
  }

  return (
    <div className="w-full space-y-4">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Year</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Asset Type</TableHead>
              <TableHead>Municipality Type</TableHead>
              <TableHead>Unit of Measure</TableHead>
              <TableHead>Scalar Factor</TableHead>
              <TableHead className="text-right">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {getCurrentPageData().map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.REF_DATE}</TableCell>
                <TableCell>{item.GEO}</TableCell>
                <TableCell>{item["Core public infrastructure assets"]}</TableCell>
                <TableCell>{item["Type of municipality by population size"]}</TableCell>
                <TableCell>{item.UOM}</TableCell>
                <TableCell>{item.SCALAR_FACTOR}</TableCell>
                <TableCell className="text-right">{formatNumber(Number.parseFloat(item.VALUE))}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center">
        <div>
          Page {currentPage} of {totalPages}
        </div>
        <div className="space-x-2">
          <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Previous
          </Button>
          <Button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

