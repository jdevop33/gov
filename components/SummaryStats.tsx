import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatNumber } from "@/lib/utils"

type Props = {
  totalAssets: number
  totalMunicipalities: number
  latestYear: number
}

export function SummaryStats({ totalAssets, totalMunicipalities, latestYear }: Props) {
  // Calculate per capita metrics that would be helpful for CFOs
  const averageAssetValue = totalMunicipalities > 0 ? totalAssets / totalMunicipalities : 0
  
  return (
    <Card className="col-span-1 lg:col-span-1 h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">Financial Summary</CardTitle>
        <p className="text-sm text-muted-foreground">BC Municipal Infrastructure Statistics</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Total Infrastructure Value</p>
              <p className="text-xl font-mono font-semibold">${(totalAssets / 1000).toFixed(2)}B</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Municipal Count</p>
              <p className="text-xl font-mono font-semibold">{formatNumber(totalMunicipalities)}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Per Municipality Average</p>
              <p className="text-xl font-mono font-semibold">${(averageAssetValue).toFixed(2)}M</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Data Year</p>
              <p className="text-xl font-mono font-semibold">{latestYear}</p>
            </div>
          </div>
          
          <div className="pt-4 mt-4 border-t border-border">
            <div className="flex flex-col space-y-2">
              <div className="text-xs font-semibold text-muted-foreground">Percentage of Infrastructure by Type</div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs">Public Transit</span>
                  <span className="text-xs font-medium">25%</span>
                </div>
                <div className="w-full bg-secondary/20 rounded-full h-1.5">
                  <div className="bg-secondary h-1.5 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs">Green Infrastructure</span>
                  <span className="text-xs font-medium">20%</span>
                </div>
                <div className="w-full bg-accent/20 rounded-full h-1.5">
                  <div className="bg-accent h-1.5 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs">Social Infrastructure</span>
                  <span className="text-xs font-medium">30%</span>
                </div>
                <div className="w-full bg-primary/20 rounded-full h-1.5">
                  <div className="bg-primary h-1.5 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

