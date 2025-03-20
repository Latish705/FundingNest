"use client";

import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { DollarSign, TrendingUp, PieChart as PieChartIcon, Activity } from "lucide-react";

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
  return (
    <div className="p-6 space-y-6">
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

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Current Investments</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Startup</th>
                <th className="text-left py-3 px-4">Investment Date</th>
                <th className="text-right py-3 px-4">Amount</th>
                <th className="text-right py-3 px-4">Current Value</th>
                <th className="text-right py-3 px-4">ROI</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4">TechVision AI</td>
                <td className="py-3 px-4">Jan 15, 2024</td>
                <td className="text-right py-3 px-4">$25,000</td>
                <td className="text-right py-3 px-4">$28,750</td>
                <td className="text-right py-3 px-4 text-green-600">+15%</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">HealthTech Solutions</td>
                <td className="py-3 px-4">Dec 1, 2023</td>
                <td className="text-right py-3 px-4">$30,000</td>
                <td className="text-right py-3 px-4">$34,500</td>
                <td className="text-right py-3 px-4 text-green-600">+15%</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Green Energy Corp</td>
                <td className="py-3 px-4">Feb 1, 2024</td>
                <td className="text-right py-3 px-4">$20,000</td>
                <td className="text-right py-3 px-4">$19,800</td>
                <td className="text-right py-3 px-4 text-red-600">-1%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}