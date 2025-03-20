"use client";

import { Card } from "@/components/ui/card";
import {
  BarChart,
  DollarSign,
  Users,
  TrendingUp,
} from "lucide-react";

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Bids",
      value: "12",
      icon: BarChart,
      trend: "+8.2%",
      description: "vs last month",
    },
    {
      title: "Total Value",
      value: "$284.5K",
      icon: DollarSign,
      trend: "+5.4%",
      description: "vs last month",
    },
    {
      title: "Interested Investors",
      value: "24",
      icon: Users,
      trend: "+12.5%",
      description: "vs last month",
    },
    {
      title: "Valuation",
      value: "$2.4M",
      icon: TrendingUp,
      trend: "+2.1%",
      description: "vs last month",
    },
  ];

  return (
    <div className="dark space-y-6 bg-gray-50 dark:bg-gray-900 p-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Dashboard Overview
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Monitor your startup's performance and bids
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="p-6 bg-white dark:bg-gray-800 shadow-md"
          >
            <div className="flex items-center">
              <div className="p-2 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <stat.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <p className="mt-4 text-sm font-medium text-gray-500 dark:text-gray-400">
              {stat.title}
            </p>
            <div className="flex items-baseline mt-1">
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {stat.value}
              </p>
              <p className="ml-2 text-sm font-medium text-green-600 dark:text-green-400">
                {stat.trend}
              </p>
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {stat.description}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
