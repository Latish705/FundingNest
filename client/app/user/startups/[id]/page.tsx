"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { StartupTeam } from "@/components/startups/startup-team"
import { StartupFinancials } from "@/components/startups/startup-financials"
import { StartupDocuments } from "@/components/startups/startup-documents"
import { InvestmentModal } from "@/components/startups/investment-modal"

const startupData = {
  id: "techvision-ai",
  name: "TechVision AI",
  description: "AI-powered computer vision solutions for manufacturing and quality control",
  longDescription: `TechVision AI is revolutionizing the manufacturing industry with its cutting-edge computer vision technology. Our AI-powered solution helps manufacturers improve quality control, reduce waste, and increase efficiency by up to 40%.

We combine advanced machine learning algorithms with high-precision cameras to detect defects and anomalies in real-time, allowing manufacturers to address issues before they become costly problems.`,
  sector: "Artificial Intelligence",
  fundingGoal: 2000000,
  currentFunding: 1500000,
  valuation: "$10M",
  growth: "+125%",
  image: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=64&h=64&fit=crop&crop=faces",
  tags: ["AI", "Manufacturing", "Computer Vision"],
  location: "San Francisco, CA",
  founded: "2021",
  employees: "15-30",
  stage: "Series A",
  website: "https://techvision-ai.com",
}

export default function StartupPage() {
  const params = useParams()
  const [isInvestModalOpen, setIsInvestModalOpen] = useState(false)

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={startupData.image} alt={startupData.name} />
                <AvatarFallback>{startupData.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{startupData.name}</h1>
                <p className="text-muted-foreground">{startupData.sector}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="outline" onClick={() => window.open(startupData.website, "_blank")}>
                Visit Website
              </Button>
              <Button onClick={() => setIsInvestModalOpen(true)}>
                Invest Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-line">{startupData.longDescription}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {startupData.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Facts</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm text-muted-foreground">Location</dt>
                <dd>{startupData.location}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Founded</dt>
                <dd>{startupData.founded}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Employees</dt>
                <dd>{startupData.employees}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Stage</dt>
                <dd>{startupData.stage}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Valuation</dt>
                <dd>{startupData.valuation}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Growth</dt>
                <dd className="text-green-600">{startupData.growth}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Funding Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                ${(startupData.currentFunding / 1000000).toFixed(1)}M raised of ${(startupData.fundingGoal / 1000000).toFixed(1)}M goal
              </span>
              <span className="font-medium">
                {Math.round((startupData.currentFunding / startupData.fundingGoal) * 100)}%
              </span>
            </div>
            <Progress value={(startupData.currentFunding / startupData.fundingGoal) * 100} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="team" className="space-y-4">
        <TabsList>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        <TabsContent value="team">
          <StartupTeam />
        </TabsContent>
        <TabsContent value="financials">
          <StartupFinancials />
        </TabsContent>
        <TabsContent value="documents">
          <StartupDocuments />
        </TabsContent>
      </Tabs>

      <InvestmentModal
        open={isInvestModalOpen}
        onOpenChange={setIsInvestModalOpen}
        startup={startupData}
      />
    </div>
  )
}