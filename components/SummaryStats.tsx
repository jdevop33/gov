import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatNumber } from "@/lib/utils"

type Props = {
  totalAssets: number
  totalMunicipalities: number
  latestYear: number
}

export function SummaryStats({ totalAssets, totalMunicipalities, latestYear }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatNumber(totalAssets)}</div>
          <p className="text-xs text-muted-foreground">Across all municipalities</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Municipalities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatNumber(totalMunicipalities)}</div>
          <p className="text-xs text-muted-foreground">Included in the dataset</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Latest Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{latestYear}</div>
          <p className="text-xs text-muted-foreground">Most recent year in the dataset</p>
        </CardContent>
      </Card>
    </div>
  )
}

