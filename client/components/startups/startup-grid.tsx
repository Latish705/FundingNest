"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const startups = [
  {
    id: "techvision-ai",
    name: "TechVision AI",
    description: "AI-powered computer vision solutions for manufacturing and quality control",
    sector: "Artificial Intelligence",
    fundingGoal: 2000000,
    currentFunding: 1500000,
    valuation: "$10M",
    growth: "+125%",
    image: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=64&h=64&fit=crop&crop=faces",
    tags: ["AI", "Manufacturing", "Computer Vision"]
  },
  {
    id: "greenenergy-solutions",
    name: "GreenEnergy Solutions",
    description: "Innovative solar panel technology with 50% higher efficiency",
    sector: "Clean Energy",
    fundingGoal: 5000000,
    currentFunding: 2500000,
    valuation: "$25M",
    growth: "+85%",
    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=64&h=64&fit=crop&crop=faces",
    tags: ["CleanTech", "Solar", "Renewable"]
  },
  {
    id: "healthtech-pro",
    name: "HealthTech Pro",
    description: "AI-driven diagnostic tools for early disease detection",
    sector: "Healthcare",
    fundingGoal: 3000000,
    currentFunding: 1800000,
    valuation: "$15M",
    growth: "+95%",
    image: "https://images.unsplash.com/photo-1624397640148-949b1732bb0a?w=64&h=64&fit=crop&crop=faces",
    tags: ["Healthcare", "AI", "Diagnostics"]
  },
]

export function StartupGrid() {
  return (
    <div className="grid  gap-12 mr-10 md:grid-cols-2 lg:grid-cols-2">
      {startups.map((startup) => (
        <Card key={startup.id} className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={startup.image} alt={startup.name} />
                <AvatarFallback>{startup.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{startup.name}</h3>
                <p className="text-sm text-muted-foreground">{startup.sector}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-sm text-muted-foreground mb-4">
              {startup.description}
            </p>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>Funding Progress</span>
                  <span>{Math.round((startup.currentFunding / startup.fundingGoal) * 100)}%</span>
                </div>
                <Progress value={(startup.currentFunding / startup.fundingGoal) * 100} />
              </div>
              <div className="flex flex-wrap gap-2">
                {startup.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Valuation</p>
                  <p className="font-medium">{startup.valuation}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Growth</p>
                  <p className="font-medium text-green-600">{startup.growth}</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link href={`/startups/${startup.id}`}>View Details</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}