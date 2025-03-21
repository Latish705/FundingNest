"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { DollarSign, TrendingUp, PieChart as PieChartIcon, Activity } from "lucide-react";

interface Investment {
  _id: string;
  investmentAmount: number;
  equity: number;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  startup: {
    _id: string;
    company_name: string;
    unified_sector: string;
  };
}

const performanceData = [
  { month: 'Jan', value: 4000 },
  { month: 'Feb', value: 3000 },
  { month: 'Mar', value: 5000 },
  { month: 'Apr', value: 4500 },
  { month: 'May', value: 6000 },
  { month: 'Jun', value: 5500 },
];

const sectorData = [
  { name: 'Technology', value: 400 },
  { name: 'Healthcare', value: 300 },
  { name: 'Finance', value: 300 },
  { name: 'Consumer', value: 200 },
];

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

export default function PortfolioPage() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/investments");
        
        if (!response.ok) {
          throw new Error("Failed to fetch investments");
        }
        
        const data = await response.json();
        setInvestments(data.investments);
      } catch (error: any) {
        setError(error.message || "Failed to load investments");
      } finally {
        setLoading(false);
      }
    };
    
    fetchInvestments();
  }, []);

  const totalInvested = investments.reduce(
    (sum, investment) => sum + (investment.investmentAmount || 0),
    0
  );

  const approvedInvestments = investments.filter(
    (investment) => investment.status === 'approved'
  );

  const pendingInvestments = investments.filter(
    (investment) => investment.status === 'pending'
  );

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold">My Portfolio</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalInvested.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedInvestments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Investments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingInvestments.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-primary" />
            <h3 className="text-sm font-medium">Total Invested</h3>
          </div>
          <p className="text-2xl font-bold mt-2">$125,000</p>
          <p className="text-sm text-muted-foreground">+12.5% from last month</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="text-sm font-medium">ROI</h3>
          </div>
          <p className="text-2xl font-bold mt-2">18.2%</p>
          <p className="text-sm text-muted-foreground">Annual return</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <PieChartIcon className="h-5 w-5 text-primary" />
            <h3 className="text-sm font-medium">Active Investments</h3>
          </div>
          <p className="text-2xl font-bold mt-2">8</p>
          <p className="text-sm text-muted-foreground">Across 5 sectors</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-primary" />
            <h3 className="text-sm font-medium">Open Bids</h3>
          </div>
          <p className="text-2xl font-bold mt-2">3</p>
          <p className="text-sm text-muted-foreground">2 pending approval</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Portfolio Performance</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Sector Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sectorData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Investments</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center text-red-500 p-4">{error}</div>
          ) : investments.length === 0 ? (
            <div className="text-center p-4">
              <p>You haven't made any investments yet.</p>
              <Link href="/startups" className="text-blue-500 hover:underline">
                Browse startups to invest
              </Link>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Startup</TableHead>
                  <TableHead>Sector</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Equity %</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {investments.map((investment) => (
                  <TableRow key={investment._id}>
                    <TableCell className="font-medium">
                      <Link href={`/startups/${investment.startup._id}`} className="hover:underline">
                        {investment.startup.company_name}
                      </Link>
                    </TableCell>
                    <TableCell>{investment.startup.unified_sector}</TableCell>
                    <TableCell>${investment.investmentAmount.toLocaleString()}</TableCell>
                    <TableCell>{investment.equity}%</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          investment.status === 'approved'
                            ? 'success'
                            : investment.status === 'rejected'
                            ? 'destructive'
                            : 'default'
                        }
                      >
                        {investment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(investment.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}