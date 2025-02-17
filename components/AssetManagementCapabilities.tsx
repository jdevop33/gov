import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const capabilities = [
  "Store data in a central place",
  "Process large amounts of information",
  "Help link data across functional groups",
  "Incorporate geo-spatial data into your analysis",
  "Facilitate the modeling of different scenarios",
  "Help conduct standard asset management analysis of your data",
  "Flag events to support decision-making",
  "Present data in a way that supports decision-making",
  "Support corporate memory",
]

const limitations = [
  "Make decisions for you",
  "Define your asset management processes",
  "Collect data or keep your data up to date",
  "Ensure the quality of your data",
  "Develop an asset management plan",
  "Tell you what information is useful in your decision-making process",
  "Test the logic of your outcomes",
  "Innovate or improve your asset management practices",
  "Provide leadership on asset management in your organization",
]

export function AssetManagementCapabilities() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Asset Management Software CAN...</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            {capabilities.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Asset Management Software CANNOT...</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            {limitations.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

