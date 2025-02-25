'use client'

import { useState } from 'react'
import Layout from "@/components/Layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function ToolPage() {
  const [formData, setFormData] = useState({
    municipality: '',
    population: '',
    budget: '',
    currentDebt: '',
    assetValue: '',
    annualRevenue: '',
    infrastructureDeficit: '',
    riskLevel: 'medium'
  })
  
  const [showResults, setShowResults] = useState(false)
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowResults(true)
  }
  
  const handleRiskChange = (level: string) => {
    setFormData(prev => ({ ...prev, riskLevel: level }))
  }
  
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Infrastructure Planning Tool</h1>
          <p className="text-muted-foreground mt-1">
            Calculate optimal infrastructure funding strategies based on your municipality's profile
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">Financial Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="municipality">Municipality Name</Label>
                      <input
                        id="municipality"
                        name="municipality"
                        value={formData.municipality}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-border rounded-md bg-background"
                        placeholder="e.g. Victoria"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="population">Population</Label>
                      <input
                        id="population"
                        name="population"
                        type="number"
                        value={formData.population}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-border rounded-md bg-background"
                        placeholder="e.g. 85000"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="budget">Annual Operating Budget ($)</Label>
                      <input
                        id="budget"
                        name="budget"
                        type="number"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-border rounded-md bg-background"
                        placeholder="e.g. 250000000"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="currentDebt">Current Infrastructure Debt ($)</Label>
                      <input
                        id="currentDebt"
                        name="currentDebt"
                        type="number"
                        value={formData.currentDebt}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-border rounded-md bg-background"
                        placeholder="e.g. 75000000"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="assetValue">Total Asset Value ($)</Label>
                      <input
                        id="assetValue"
                        name="assetValue"
                        type="number"
                        value={formData.assetValue}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-border rounded-md bg-background"
                        placeholder="e.g. 1500000000"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="annualRevenue">Annual Revenue ($)</Label>
                      <input
                        id="annualRevenue"
                        name="annualRevenue"
                        type="number"
                        value={formData.annualRevenue}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-border rounded-md bg-background"
                        placeholder="e.g. 300000000"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="infrastructureDeficit">Infrastructure Deficit ($)</Label>
                      <input
                        id="infrastructureDeficit"
                        name="infrastructureDeficit"
                        type="number"
                        value={formData.infrastructureDeficit}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-border rounded-md bg-background"
                        placeholder="e.g. 120000000"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Risk Tolerance</Label>
                      <div className="flex gap-2">
                        <Button 
                          type="button"
                          variant={formData.riskLevel === 'low' ? 'default' : 'outline'}
                          onClick={() => handleRiskChange('low')}
                          className="flex-1"
                        >
                          Low
                        </Button>
                        <Button 
                          type="button"
                          variant={formData.riskLevel === 'medium' ? 'default' : 'outline'}
                          onClick={() => handleRiskChange('medium')}
                          className="flex-1"
                        >
                          Medium
                        </Button>
                        <Button 
                          type="button"
                          variant={formData.riskLevel === 'high' ? 'default' : 'outline'}
                          onClick={() => handleRiskChange('high')}
                          className="flex-1"
                        >
                          High
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="w-full md:w-auto">
                      Calculate Recommendations
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-xl font-bold">BC Infrastructure Targets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium text-sm">Annual Renewal Investment</h3>
                  <div className="p-2 bg-muted/30 rounded-md flex justify-between items-center">
                    <span className="text-xs">Target</span>
                    <span className="text-sm font-mono font-medium">1.5-2.5% of asset value</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium text-sm">Reserve Fund</h3>
                  <div className="p-2 bg-muted/30 rounded-md flex justify-between items-center">
                    <span className="text-xs">Target</span>
                    <span className="text-sm font-mono font-medium">20-30% of replacement cost</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium text-sm">Debt Servicing</h3>
                  <div className="p-2 bg-muted/30 rounded-md flex justify-between items-center">
                    <span className="text-xs">BC Limit</span>
                    <span className="text-sm font-mono font-medium">25% of revenue</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium text-sm">Asset Management Plan</h3>
                  <div className="p-2 bg-muted/30 rounded-md flex justify-between items-center">
                    <span className="text-xs">Best Practice</span>
                    <span className="text-sm font-mono font-medium">20+ year horizon</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {showResults && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Funding Strategy Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
                    <h3 className="font-bold text-primary mb-2">Reserve Fund Strategy</h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        Based on your infrastructure deficit of <span className="font-mono font-medium">${
                          parseInt(formData.infrastructureDeficit).toLocaleString()
                        }</span>, we recommend:
                      </p>
                      <ul className="space-y-1 list-disc pl-4">
                        <li>Annual contribution of <span className="font-mono font-medium">${
                          Math.round(parseInt(formData.assetValue || '0') * 0.02).toLocaleString()
                        }</span> (2% of asset value)</li>
                        <li>Target reserve balance of <span className="font-mono font-medium">${
                          Math.round(parseInt(formData.assetValue || '0') * 0.25).toLocaleString()
                        }</span></li>
                        <li>Establish separate reserves by asset class</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-secondary/10 rounded-lg border border-secondary/30">
                    <h3 className="font-bold text-secondary mb-2">Debt Management</h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        Your current debt-to-revenue ratio is <span className="font-mono font-medium">{
                          Math.round((parseInt(formData.currentDebt || '0') / parseInt(formData.annualRevenue || '1')) * 100)
                        }%</span>. We recommend:
                      </p>
                      <ul className="space-y-1 list-disc pl-4">
                        <li>Maximum new debt capacity of <span className="font-mono font-medium">${
                          Math.round((parseInt(formData.annualRevenue || '0') * 0.8) - parseInt(formData.currentDebt || '0')).toLocaleString()
                        }</span></li>
                        <li>Annual debt service maximum of <span className="font-mono font-medium">${
                          Math.round(parseInt(formData.annualRevenue || '0') * 0.15).toLocaleString()
                        }</span></li>
                        <li>Focus debt on long-lived assets (30+ years)</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-accent/10 rounded-lg border border-accent/30">
                    <h3 className="font-bold text-accent mb-2">Revenue Strategy</h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        For a population of <span className="font-mono font-medium">{
                          parseInt(formData.population).toLocaleString()
                        }</span>, we recommend:
                      </p>
                      <ul className="space-y-1 list-disc pl-4">
                        <li>Dedicated infrastructure levy of <span className="font-mono font-medium">1.5%</span> annually</li>
                        <li>User fees targeting <span className="font-mono font-medium">100%</span> cost recovery for water utilities</li>
                        <li>Development cost charges updated every <span className="font-mono font-medium">3-5</span> years</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-muted rounded-lg border border-border">
                  <h3 className="font-medium mb-2">20-Year Infrastructure Funding Plan</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      Based on your risk tolerance level of <span className="font-medium">{formData.riskLevel}</span> and an infrastructure deficit of <span className="font-mono font-medium">${
                        parseInt(formData.infrastructureDeficit).toLocaleString()
                      }</span>, we recommend the following funding mix:
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <div className="p-2 bg-background rounded-md">
                        <div className="text-xs text-muted-foreground">Pay-as-you-go Funding</div>
                        <div className="text-lg font-mono font-medium">{
                          formData.riskLevel === 'low' ? '60%' : formData.riskLevel === 'medium' ? '50%' : '40%'
                        }</div>
                      </div>
                      <div className="p-2 bg-background rounded-md">
                        <div className="text-xs text-muted-foreground">Debt Financing</div>
                        <div className="text-lg font-mono font-medium">{
                          formData.riskLevel === 'low' ? '20%' : formData.riskLevel === 'medium' ? '30%' : '40%'
                        }</div>
                      </div>
                      <div className="p-2 bg-background rounded-md">
                        <div className="text-xs text-muted-foreground">Grants & Subsidies</div>
                        <div className="text-lg font-mono font-medium">{
                          formData.riskLevel === 'low' ? '15%' : formData.riskLevel === 'medium' ? '15%' : '15%'
                        }</div>
                      </div>
                      <div className="p-2 bg-background rounded-md">
                        <div className="text-xs text-muted-foreground">Other Sources</div>
                        <div className="text-lg font-mono font-medium">{
                          formData.riskLevel === 'low' ? '5%' : formData.riskLevel === 'medium' ? '5%' : '5%'
                        }</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  )
}