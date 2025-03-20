"use client"

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
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
    name: "TechVision AI",
    sector: "Artificial Intelligence",
    funding: "$2M",
    valuation: "$10M",
    growth: "+125%",
    image: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=64&h=64&fit=crop&crop=faces"
  },
  {
    name: "GreenEnergy Solutions",
    sector: "Clean Energy",
    funding: "$5M",
    valuation: "$25M",
    growth: "+85%",
    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=64&h=64&fit=crop&crop=faces"
  },
  {
    name: "HealthTech Pro",
    sector: "Healthcare",
    funding: "$3M",
    valuation: "$15M",
    growth: "+95%",
    image: "https://images.unsplash.com/photo-1624397640148-949b1732bb0a?w=64&h=64&fit=crop&crop=faces"
  },
]

export function TrendingStartups() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Startup</TableHead>
          <TableHead>Sector</TableHead>
          <TableHead>Funding Goal</TableHead>
          <TableHead>Valuation</TableHead>
          <TableHead>Growth</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {startups.map((startup) => (
          <TableRow key={startup.name}>
            <TableCell className="font-medium">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={startup.image} alt={startup.name} />
                  <AvatarFallback>{startup.name[0]}</AvatarFallback>
                </Avatar>
                {startup.name}
              </div>
            </TableCell>
            <TableCell>{startup.sector}</TableCell>
            <TableCell>{startup.funding}</TableCell>
            <TableCell>{startup.valuation}</TableCell>
            <TableCell className="text-green-600">{startup.growth}</TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/startups/${startup.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  View Details
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}