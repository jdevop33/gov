'use client'

import Layout from "@/components/Layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function GuidePage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">BC Municipal Infrastructure Planning Guide</h1>
          <p className="text-muted-foreground mt-1">
            Best practices and resources for long-term capital planning
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Asset Management Framework</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert">
              <p>
                The Asset Management Framework provides a systematic approach to developing and implementing asset 
                management practices across your municipality. It includes:
              </p>
              <ul>
                <li>Asset inventory development and maintenance</li>
                <li>Condition assessment methodologies</li>
                <li>Risk assessment frameworks</li>
                <li>Lifecycle costing approaches</li>
                <li>Financial planning strategies</li>
              </ul>
              <p>
                By implementing these practices, municipalities can make informed decisions about infrastructure 
                investments and ensure long-term sustainability of essential services.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Key Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-muted/30 border border-border">
                  <h3 className="font-medium mb-1">Asset Management BC</h3>
                  <p className="text-sm text-muted-foreground">Frameworks, guidelines, and best practices</p>
                  <a href="#" className="text-primary text-sm font-medium mt-2 inline-block">View Resources</a>
                </div>
                
                <div className="p-3 rounded-lg bg-muted/30 border border-border">
                  <h3 className="font-medium mb-1">Funding Programs</h3>
                  <p className="text-sm text-muted-foreground">Provincial and federal infrastructure grants</p>
                  <a href="#" className="text-primary text-sm font-medium mt-2 inline-block">View Programs</a>
                </div>
                
                <div className="p-3 rounded-lg bg-muted/30 border border-border">
                  <h3 className="font-medium mb-1">Case Studies</h3>
                  <p className="text-sm text-muted-foreground">Success stories from BC municipalities</p>
                  <a href="#" className="text-primary text-sm font-medium mt-2 inline-block">View Case Studies</a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Planning Process</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-muted/30 rounded-lg border border-border">
                <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-full font-bold mb-3">1</div>
                <h3 className="font-medium mb-1">Asset Inventory</h3>
                <p className="text-sm text-muted-foreground">Develop a comprehensive inventory of all infrastructure assets</p>
              </div>
              
              <div className="p-4 bg-muted/30 rounded-lg border border-border">
                <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-full font-bold mb-3">2</div>
                <h3 className="font-medium mb-1">Condition Assessment</h3>
                <p className="text-sm text-muted-foreground">Evaluate the current condition of all assets</p>
              </div>
              
              <div className="p-4 bg-muted/30 rounded-lg border border-border">
                <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-full font-bold mb-3">3</div>
                <h3 className="font-medium mb-1">Risk Analysis</h3>
                <p className="text-sm text-muted-foreground">Identify critical assets and potential failure impacts</p>
              </div>
              
              <div className="p-4 bg-muted/30 rounded-lg border border-border">
                <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-full font-bold mb-3">4</div>
                <h3 className="font-medium mb-1">Lifecycle Planning</h3>
                <p className="text-sm text-muted-foreground">Develop maintenance and replacement schedules</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}