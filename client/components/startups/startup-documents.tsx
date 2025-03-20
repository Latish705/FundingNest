"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download } from "lucide-react"

const documents = [
  {
    name: "Pitch Deck",
    type: "PDF",
    size: "2.4 MB",
    lastUpdated: "2024-03-15",
  },
  {
    name: "Financial Projections",
    type: "XLSX",
    size: "1.8 MB",
    lastUpdated: "2024-03-14",
  },
  {
    name: "Market Analysis",
    type: "PDF",
    size: "3.2 MB",
    lastUpdated: "2024-03-10",
  },
  {
    name: "Product Roadmap",
    type: "PDF",
    size: "1.5 MB",
    lastUpdated: "2024-03-08",
  },
]

export function StartupDocuments() {
  return (
    <div className="space-y-4">
      {documents.map((doc) => (
        <Card key={doc.name}>
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <FileText className="h-8 w-8 text-muted-foreground" />
              <div>
                <h4 className="font-medium">{doc.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {doc.type} • {doc.size} • Updated {doc.lastUpdated}
                </p>
              </div>
            </div>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}