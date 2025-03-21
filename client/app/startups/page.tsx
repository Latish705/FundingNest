"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Search } from "lucide-react";
import Link from "next/link";

interface Startup {
  _id: string;
  company_name: string;
  unified_sector: string;
  total_equity_funding: number;
  latest_post_money_valuation: number;
  latest_annual_revenue: number;
}

export default function StartupsPage() {
  const router = useRouter();
  const [startups, setStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/startups");
        
        if (!response.ok) {
          throw new Error("Failed to fetch startups");
        }
        
        const data = await response.json();
        setStartups(data.startups);
      } catch (error: any) {
        setError(error.message || "Failed to load startups");
      } finally {
        setLoading(false);
      }
    };
    
    fetchStartups();
  }, []);

  const filteredStartups = startups.filter(startup => 
    startup.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    startup.unified_sector.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Startups</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search startups..."
              className="w-[250px] pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500 p-4">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStartups.map((startup) => (
            <Link key={startup._id} href={`/startups/${startup._id}`}>
              <Card className="h-full hover:bg-gray-50 transition-colors cursor-pointer">
                <CardHeader>
                  <CardTitle>{startup.company_name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-2">Sector: {startup.unified_sector}</p>
                  <p className="text-sm mb-2">Funding: ${startup.total_equity_funding?.toLocaleString() || 0}</p>
                  <p className="text-sm mb-2">Valuation: ${startup.latest_post_money_valuation?.toLocaleString() || 0}</p>
                  <p className="text-sm">Revenue: ${startup.latest_annual_revenue?.toLocaleString() || 0}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}