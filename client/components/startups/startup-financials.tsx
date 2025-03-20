"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const revenueData = [
  { month: "Jan", revenue: 120000 },
  { month: "Feb", revenue: 145000 },
  { month: "Mar", revenue: 205000 },
  { month: "Apr", revenue: 250000 },
  { month: "May", revenue: 320000 },
  { month: "Jun", revenue: 480000 },
]

const metrics = [
  {
    label: "Monthly Revenue",
    value: "$480,000",
    change: "+45%",
  },
  {
    label: "Monthly Active Users",
    value: "12,500",
    change: "+32%",
  },
  {
    label: "Customer Acquisition Cost",
    value: "$125",
    change: "-12%",
  },
  {
    label: "Gross Margin",
    value: "68%",
    change: "+5%",
  },
]

export function StartupFinancials() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className={`text-xs ${metric.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                {metric.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <XAxis
                  dataKey="month"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}