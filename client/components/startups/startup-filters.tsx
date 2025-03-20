"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

interface StartupFiltersProps {
  className?: string
}

export function StartupFilters({ className }: StartupFiltersProps) {
  const [fundingRange, setFundingRange] = useState([0, 10])

  return (
    <div className={cn("space-y-6", className)}>
      <div>
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Sector</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="All sectors" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All sectors</SelectItem>
                <SelectItem value="ai">Artificial Intelligence</SelectItem>
                <SelectItem value="cleantech">Clean Technology</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="fintech">Fintech</SelectItem>
                <SelectItem value="ecommerce">E-commerce</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Stage</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="All stages" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All stages</SelectItem>
                <SelectItem value="seed">Seed</SelectItem>
                <SelectItem value="series-a">Series A</SelectItem>
                <SelectItem value="series-b">Series B</SelectItem>
                <SelectItem value="series-c">Series C</SelectItem>
                <SelectItem value="growth">Growth</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Funding Range (in millions)</Label>
            <div className="pt-2">
              <Slider
                value={fundingRange}
                onValueChange={setFundingRange}
                max={10}
                step={0.1}
                className="mb-2"
              />
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  value={fundingRange[0]}
                  onChange={(e) => setFundingRange([Number(e.target.value), fundingRange[1]])}
                  className="h-8"
                />
                <span>to</span>
                <Input
                  type="number"
                  value={fundingRange[1]}
                  onChange={(e) => setFundingRange([fundingRange[0], Number(e.target.value)])}
                  className="h-8"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Location</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="All locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All locations</SelectItem>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="eu">Europe</SelectItem>
                <SelectItem value="asia">Asia</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4">
            <Button className="w-full">Apply Filters</Button>
          </div>
        </div>
      </div>
    </div>
  )
}