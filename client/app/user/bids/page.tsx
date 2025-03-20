"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, TrendingUp, Users, DollarSign } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useRouter } from "next/navigation";

// Mock data for the bid timeline
const bidTimelineData = [
  { time: "0h", amount: 150000 },
  { time: "1h", amount: 200000 },
  { time: "2h", amount: 250000 },
  { time: "3h", amount: 400000 },
  { time: "4h", amount: 450000 },
  { time: "5h", amount: 500000 },
  { time: "6h", amount: 750000 },
];

export default function BidsPage() {
  const router = useRouter();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Investment Opportunities</h1>
        <Button onClick={() => router.push("/bids/create")}>Create New Bid</Button>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Bid Timeline</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={bidTimelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="time" 
                label={{ value: 'Time', position: 'bottom' }}
              />
              <YAxis 
                label={{ 
                  value: 'Bid Amount ($)', 
                  angle: -90, 
                  position: 'left' 
                }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip 
                formatter={(value) => [`$${value.toLocaleString()}`, 'Bid Amount']}
              />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">Active Bids</TabsTrigger>
          <TabsTrigger value="my-bids">My Bids</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">TechVision AI Series A</h3>
                <p className="text-sm text-muted-foreground">AI-powered business analytics platform</p>
              </div>
              <Badge>Active</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Target Amount</p>
                  <p className="font-semibold">$2,000,000</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Current Investors</p>
                  <p className="font-semibold">12</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Minimum Investment</p>
                  <p className="font-semibold">$25,000</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Time Remaining</p>
                  <p className="font-semibold">5 days</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>75% Complete</span>
              </div>
              <Progress value={75} />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline">Learn More</Button>
              <Button>Place Bid</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="my-bids" className="space-y-4">
          <Card className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">HealthTech Solutions Series B</h3>
                <p className="text-sm text-muted-foreground">Digital health platform</p>
              </div>
              <Badge variant="outline">Pending</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Your Bid</p>
                  <p className="font-semibold">$50,000</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Bids</p>
                  <p className="font-semibold">8</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Submitted</p>
                  <p className="font-semibold">2 days ago</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline">View Details</Button>
              <Button variant="destructive">Cancel Bid</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">EcoEnergy Ventures</h3>
                <p className="text-sm text-muted-foreground">Renewable energy solutions</p>
              </div>
              <Badge variant="secondary">Completed</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Final Amount</p>
                  <p className="font-semibold">$1,500,000</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Investors</p>
                  <p className="font-semibold">15</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">ROI</p>
                  <p className="font-semibold text-green-600">+22%</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="font-semibold">3 months ago</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button variant="outline">View Report</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}