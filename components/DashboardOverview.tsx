import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatNumber } from "@/lib/utils"

type Props = {
  totalInvestment: number
  publicTransitInvestment: number
  greenInfrastructureInvestment: number
  socialInfrastructureInvestment: number
  ruralNorthernInvestment: number
  tradeTransportationInvestment: number
}

export function DashboardOverview({
  totalInvestment,
  publicTransitInvestment,
  greenInfrastructureInvestment,
  socialInfrastructureInvestment,
  ruralNorthernInvestment,
  tradeTransportationInvestment,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${formatNumber(totalInvestment)} billion</div>
          <p className="text-xs text-muted-foreground">Over 12 years</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Public Transit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${formatNumber(publicTransitInvestment)} billion</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Green Infrastructure</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${formatNumber(greenInfrastructureInvestment)} billion</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Social Infrastructure</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${formatNumber(socialInfrastructureInvestment)} billion</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Rural and Northern Communities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${formatNumber(ruralNorthernInvestment)} billion</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Trade and Transportation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${formatNumber(tradeTransportationInvestment)} billion</div>
        </CardContent>
      </Card>
    </div>
  )
}

