'use client'

import Layout from "@/components/Layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function StrategiesPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Fiscal Strategies for BC Municipalities</h1>
          <p className="text-muted-foreground mt-1">
            Financial planning approaches for sustainable infrastructure management
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Funding Strategies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h3 className="font-medium text-lg">Property Taxes</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full w-5 h-5 bg-primary/10 flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Dedicated infrastructure levies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full w-5 h-5 bg-primary/10 flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Local area service rates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full w-5 h-5 bg-primary/10 flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Phased-in increases</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium text-lg">User Fees</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full w-5 h-5 bg-primary/10 flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Full-cost recovery models</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full w-5 h-5 bg-primary/10 flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Consumption-based charges</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full w-5 h-5 bg-primary/10 flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Tiered pricing structures</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium text-lg">Development Contributions</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full w-5 h-5 bg-primary/10 flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Development cost charges</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full w-5 h-5 bg-primary/10 flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Community amenity contributions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full w-5 h-5 bg-primary/10 flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Density bonusing</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Reserve Fund Strategies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-muted/30 rounded-lg border border-border">
                  <h3 className="font-medium mb-3">Capital Reserve Funds</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    A strategic approach to setting aside funds for future infrastructure replacement and renewal needs.
                  </p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Recommended minimum contribution:</span>
                      <span className="font-mono font-medium">1.5-2.5% of asset value</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Target reserve level:</span>
                      <span className="font-mono font-medium">20-30% of replacement costs</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Funding source:</span>
                      <span className="font-mono font-medium">Annual tax levy</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-muted/30 rounded-lg border border-border">
                  <h3 className="font-medium mb-3">Asset Renewal Funds</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Dedicated funds for maintaining and extending the useful life of existing infrastructure assets.
                  </p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Recommended contribution:</span>
                      <span className="font-mono font-medium">2-3% of annual budget</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Allocation approach:</span>
                      <span className="font-mono font-medium">Asset class specific</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Review frequency:</span>
                      <span className="font-mono font-medium">Annual</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Debt Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Debt is an important tool for infrastructure financing, especially for long-lived assets. 
                  The guidelines below help ensure sustainable debt levels.
                </p>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="pb-2 text-left font-medium">Metric</th>
                        <th className="pb-2 text-left font-medium">Conservative</th>
                        <th className="pb-2 text-left font-medium">Moderate</th>
                        <th className="pb-2 text-left font-medium">Aggressive</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="py-2">Debt-to-Revenue Ratio</td>
                        <td className="py-2 font-mono">&lt; 50%</td>
                        <td className="py-2 font-mono">50-100%</td>
                        <td className="py-2 font-mono">&gt; 100%</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2">Debt Service-to-Revenue Ratio</td>
                        <td className="py-2 font-mono">&lt; 10%</td>
                        <td className="py-2 font-mono">10-15%</td>
                        <td className="py-2 font-mono">&gt; 15%</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2">Debt per Capita</td>
                        <td className="py-2 font-mono">&lt; $1,000</td>
                        <td className="py-2 font-mono">$1,000-$2,000</td>
                        <td className="py-2 font-mono">&gt; $2,000</td>
                      </tr>
                      <tr>
                        <td className="py-2">Debt Structure</td>
                        <td className="py-2 font-mono">Fixed Rate</td>
                        <td className="py-2 font-mono">Mixed</td>
                        <td className="py-2 font-mono">Variable Rate</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="p-3 bg-accent/10 text-accent-foreground rounded-lg text-sm">
                  <strong>Note:</strong> The Municipal Liabilities Regulation caps servicing costs at 25% of revenue.
                  Most BC municipalities maintain levels well below this maximum threshold.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}