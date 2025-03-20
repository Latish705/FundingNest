"use client";

import { useState } from "react";
import { Table } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Types for the data structure
interface CompanyData {
  company_name: string;
  unified_sector: string;
  business_category: string;
  investment_score: number;
  investment_profile: string;
  latest_post_money_valuation: number;
  latest_annual_revenue: number;
  total_equity_funding: number;
  net_profit_cagr_5_years: number;
  revenue_growth: number;
  profit_margin: number;
  investor_score: number;
  tracxn_score: number;
}

interface QueryResponse {
  result_path: string;
  session_id: string;
  structured_query: string;
  results: CompanyData[];
}

interface QueryRequest {
  query: string;
  session_id?: string;
}

// Default query example
const defaultQuery = `i want companies with profit more than 4% in past 5 years`;

export default function Home() {
  const [query, setQuery] = useState<string>(defaultQuery);
  const [tableData, setTableData] = useState<CompanyData[]>([]);
  const [structuredQuery, setStructuredQuery] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const formatValue = (value: any): string => {
    if (typeof value === "number") {
      // Format as currency if it's a valuation or funding amount
      if (value > 10000) {
        return `$${(value / 1000000).toFixed(2)}M`;
      }
      // Format as percentage if it's a ratio or score
      if (value <= 100 && value >= -100) {
        return `${value.toFixed(2)}%`;
      }
      return value.toLocaleString();
    }
    return value?.toString() || "";
  };

  const runQuery = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8000/run_pandas_query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: query,
          session_id: "string",
        } as QueryRequest),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data: QueryResponse = await response.json();
      setStructuredQuery(data.structured_query);
      setTableData(data.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Query Section */}
      <div className="mb-8 bg-card p-6 rounded-lg shadow-lg">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Investment Query</h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Enter your investment criteria in natural language</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full min-h-[100px] p-3 rounded-md border border-input bg-background text-sm"
            placeholder="Enter your query here..."
          />

          <div className="flex items-center gap-4">
            <Button
              onClick={runQuery}
              disabled={isLoading}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isLoading ? "Processing..." : "Run Query"}
            </Button>
          </div>
        </div>

        {/* Structured Query Display */}
        {structuredQuery && (
          <div className="mt-4 p-4 bg-muted/50 rounded-md">
            <p className="text-sm font-medium mb-2">Structured Query:</p>
            <code className="text-sm bg-muted p-2 rounded block">
              {structuredQuery}
            </code>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mt-4 p-4 bg-destructive/10 text-destructive rounded-md">
            {error}
          </div>
        )}
      </div>

      {/* Results Section */}
      <div className="bg-card rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="text-lg font-medium">
            Results ({tableData.length} companies found)
          </h3>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <thead>
              <tr className="bg-muted/50">
                <th className="p-3 text-left font-medium">No.</th>
                {tableData.length > 0 &&
                  Object.keys(tableData[0]).map((header) => (
                    <th
                      key={header}
                      className="p-3 text-left font-medium whitespace-nowrap"
                    >
                      {header
                        .split("_")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-background" : "bg-muted/30"}
                >
                  <td className="p-3">{index + 1}</td>
                  {Object.values(row).map((value, colIndex) => (
                    <td key={colIndex} className="p-3 whitespace-nowrap">
                      {formatValue(value)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
