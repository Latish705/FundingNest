"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { StartupGrid } from "@/components/startups/startup-grid"
import { StartupList } from "@/components/startups/startup-list"
import { StartupFilters } from "@/components/startups/startup-filters"
import { LayoutGrid, List, Search } from "lucide-react"

export default function StartupsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-8 mt-6 ml-6 mr-6">
      <div className="flex  flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">Discover Startups</h1>
        <div className="flex items-center gap-4">
          <div className="relative flex-1 md:w-[300px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search startups..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center  gap-2 border rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <StartupFilters className="lg:col-span-1" />
        <div className="lg:col-span-3">
          {viewMode === "grid" ? <StartupGrid /> : <StartupList />}
        </div>
      </div>
    </div>
  )
}