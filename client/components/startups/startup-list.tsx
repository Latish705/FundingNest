"use client"

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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

export function StartupList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Startup</TableHead>
          <TableHead>Sector</TableHead>
          <TableHead>Funding Progress</TableHead>
          <TableHead>Valuation</TableHead>
          <TableHead>Growth</TableHead>
          <TableHead>Tags</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {startups.map((startup) => (
          <TableRow key={startup.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={startup.image} alt={startup.name} />
                  <AvatarFallback>{startup.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{startup.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {startup.description}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>{startup.sector}</TableCell>
            <TableCell>
              <div className="w-[160px]">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>{Math.round((startup.currentFunding / startup.fundingGoal) * 100)}%</span>
                  <span>${(startup.currentFunding / 1000000).toFixed(1)}M / ${(startup.fundingGoal / 1000000).toFixed(1)}M</span>
                </div>
                <Progress value={(startup.currentFunding / startup.fundingGoal) * 100} />
              </div>
            </TableCell>
            <TableCell>{startup.valuation}</TableCell>
            <TableCell className="text-green-600">{startup.growth}</TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {startup.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/startups/${startup.id}`}>View Details</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}