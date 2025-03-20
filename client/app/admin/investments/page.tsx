"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  DollarSign,
  Filter,
  PieChart,
  Search,
  TrendingUp,
} from "lucide-react";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import { format } from "date-fns";

// Mock data - would be replaced with actual API calls
const fetchInvestments = async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    recent: [
      {
        id: 1,
        startup: "EcoTech Solutions",
        investor: "Angel Ventures",
        amount: 250000,
        date: "2023-05-15",
        status: "completed",
      },
      {
        id: 2,
        startup: "MediHealth AI",
        investor: "TechFund Capital",
        amount: 500000,
        date: "2023-05-14",
        status: "pending",
      },
      {
        id: 3,
        startup: "BlockSecure",
        investor: "Innovation Partners",
        amount: 180000,
        date: "2023-05-13",
        status: "completed",
      },
      {
        id: 4,
        startup: "SmartCity Labs",
        investor: "Future Ventures",
        amount: 750000,
        date: "2023-05-12",
        status: "pending",
      },
      {
        id: 5,
        startup: "CloudNative Solutions",
        investor: "Growth Capital",
        amount: 320000,
        date: "2023-05-11",
        status: "completed",
      },
    ],
    stats: {
      totalInvestment: 14750000,
      averageRound: 325000,
      activeDeals: 8,
      monthlyGrowth: 12.5,
    },
    chartData: {
      monthly: [
        { month: "Jan", amount: 1200000 },
        { month: "Feb", amount: 1450000 },
        { month: "Mar", amount: 1300000 },
        { month: "Apr", amount: 1600000 },
        { month: "May", amount: 1950000 },
      ],
      sectors: [
        { sector: "FinTech", value: 30 },
        { sector: "HealthTech", value: 25 },
        { sector: "CleanTech", value: 15 },
        { sector: "EdTech", value: 10 },
        { sector: "AI/ML", value: 20 },
      ],
      stages: [
        { stage: "Seed", value: 45 },
        { stage: "Series A", value: 30 },
        { stage: "Series B", value: 15 },
        { stage: "Series C", value: 10 },
      ],
    },
  };
};

const InvestmentsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["investments"],
    queryFn: fetchInvestments,
  });

  const chartConfig = {
    FinTech: { color: "#8B5CF6" },
    HealthTech: { color: "#D946EF" },
    CleanTech: { color: "#0EA5E9" },
    EdTech: { color: "#F97316" },
    "AI/ML": { color: "#6366F1" },
    Seed: { color: "#10B981" },
    "Series A": { color: "#F59E0B" },
    "Series B": { color: "#EC4899" },
    "Series C": { color: "#6366F1" },
  };

  const formatCurrency = (amount: any) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="text-center text-destructive">
            Error loading investment data. Please try again later.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="container py-6 space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Investments Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor and track all investment activities across the platform
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search investments..."
              className="w-full md:w-[250px] pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <>
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))}
          </>
        ) : (
          <>
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">
                  Total Investment
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data
                    ? formatCurrency(data.stats.totalInvestment)
                    : "Loading..."}
                </div>
                <p className="text-xs text-muted-foreground">
                  +{data?.stats?.monthlyGrowth ?? 0}% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">
                  Average Round Size
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data
                    ? formatCurrency(data.stats.averageRound)
                    : "Loading..."}
                </div>
                <p className="text-xs text-muted-foreground">
                  Across all startups
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">
                  Active Deals
                </CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data?.stats.activeDeals}
                </div>
                <p className="text-xs text-muted-foreground">
                  Currently in progress
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">
                  Monthly Growth
                </CardTitle>
                <ArrowUpIcon className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data?.stats.monthlyGrowth}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Compared to April
                </p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Charts & Tables */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          {isLoading ? (
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-1/4" />
              </CardHeader>
              <CardContent className="h-[350px] flex items-center justify-center">
                <Skeleton className="h-full w-full rounded-md" />
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Investment Trends</CardTitle>
                <CardDescription>
                  Monthly investment flow across the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveLine
                      data={[
                        {
                          id: "Investments",
                          data:
                            data?.chartData?.monthly?.map((item) => ({
                              x: item.month,
                              y: item.amount,
                            })) || [], // Provide empty array fallback
                        },
                      ]}
                      margin={{ top: 20, right: 20, bottom: 50, left: 70 }}
                      xScale={{ type: "point" }}
                      yScale={{
                        type: "linear",
                        min: "auto",
                        max: "auto",
                      }}
                      curve="cardinal"
                      axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Month",
                        legendOffset: 36,
                        legendPosition: "middle",
                      }}
                      axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        format: (value: any) => `$${value / 1000}k`,
                        legend: "Amount",
                        legendOffset: -50,
                        legendPosition: "middle",
                      }}
                      enablePointLabel={true}
                      colors={["#8B5CF6"]}
                      pointSize={10}
                      pointColor={{ from: "color", modifiers: [] }}
                      pointBorderWidth={2}
                      pointBorderColor={{ from: "color", modifiers: [] }}
                      enableArea={true}
                      areaOpacity={0.1}
                      useMesh={true}
                    />
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isLoading ? (
              <>
                <Card>
                  <CardHeader>
                    <Skeleton className="h-6 w-1/3" />
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <Skeleton className="h-full w-full rounded-md" />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Skeleton className="h-6 w-1/3" />
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <Skeleton className="h-full w-full rounded-md" />
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Investment by Sector</CardTitle>
                    <CardDescription>
                      Distribution across industry sectors
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ChartContainer config={chartConfig}>
                        <ResponsivePie
                          data={
                            data?.chartData?.sectors?.map((item) => ({
                              id: item.sector,
                              label: item.sector,
                              value: item.value,
                            })) || []
                          } // Provide empty array fallback
                          margin={{ top: 20, right: 20, bottom: 80, left: 20 }}
                          innerRadius={0.5}
                          padAngle={0.7}
                          cornerRadius={3}
                          activeOuterRadiusOffset={8}
                          colors={[
                            chartConfig.FinTech.color,
                            chartConfig.HealthTech.color,
                            chartConfig.CleanTech.color,
                            chartConfig.EdTech.color,
                            chartConfig["AI/ML"].color,
                          ]}
                          borderWidth={1}
                          borderColor={{
                            from: "color",
                            modifiers: [["darker", 0.2]],
                          }}
                          arcLinkLabelsSkipAngle={10}
                          arcLinkLabelsTextColor="var(--foreground)"
                          arcLinkLabelsThickness={2}
                          arcLinkLabelsColor={{ from: "color" }}
                          arcLabelsSkipAngle={10}
                          arcLabelsTextColor="white"
                          legends={[
                            {
                              anchor: "bottom",
                              direction: "row",
                              justify: false,
                              translateX: 0,
                              translateY: 56,
                              itemsSpacing: 0,
                              itemWidth: 100,
                              itemHeight: 18,
                              itemTextColor: "var(--foreground)",
                              itemDirection: "left-to-right",
                              itemOpacity: 1,
                              symbolSize: 18,
                              symbolShape: "circle",
                            },
                          ]}
                        />
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Investment by Stage</CardTitle>
                    <CardDescription>
                      Distribution by funding stages
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ChartContainer config={chartConfig}>
                        <ResponsiveBar
                          data={
                            data?.chartData.stages.map((item) => ({
                              stage: item.stage,
                              value: item.value,
                            })) || []
                          } // Provide empty array fallback
                          keys={["value"]}
                          indexBy="stage"
                          margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
                          padding={0.3}
                          valueScale={{ type: "linear" }}
                          indexScale={{ type: "band", round: true }}
                          colors={[
                            chartConfig.Seed.color,
                            chartConfig["Series A"].color,
                            chartConfig["Series B"].color,
                            chartConfig["Series C"].color,
                          ]}
                          colorBy="indexValue"
                          borderColor={{
                            from: "color",
                            modifiers: [["darker", 1.6]],
                          }}
                          axisTop={null}
                          axisRight={null}
                          axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: "Stage",
                            legendPosition: "middle",
                            legendOffset: 32,
                          }}
                          axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: "Percentage (%)",
                            legendPosition: "middle",
                            legendOffset: -40,
                          }}
                          labelSkipWidth={12}
                          labelSkipHeight={12}
                          labelTextColor={{
                            from: "color",
                            modifiers: [["darker", 1.6]],
                          }}
                          role="application"
                        />
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Investments</CardTitle>
              <CardDescription>
                Latest investment transactions across the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Startup</TableHead>
                      <TableHead>Investor</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.recent
                      ?.filter(
                        (inv) =>
                          inv.startup
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                          inv.investor
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                      )
                      .map((investment) => (
                        <TableRow key={investment.id}>
                          <TableCell className="font-medium">
                            {investment.startup}
                          </TableCell>
                          <TableCell>{investment.investor}</TableCell>
                          <TableCell>
                            {formatCurrency(investment.amount)}
                          </TableCell>
                          <TableCell>
                            {new Date(investment.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                investment.status === "completed"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                              }`}
                            >
                              {investment.status === "completed"
                                ? "Completed"
                                : "Pending"}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    {data?.recent?.filter(
                      (inv) =>
                        inv.startup
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        inv.investor
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                    ).length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="text-center h-24 text-muted-foreground"
                        >
                          No matching investments found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Investment Analytics</CardTitle>
              <CardDescription>
                Detailed analysis of funding patterns and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Top Investors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm">Angel Ventures</span>
                        <span className="text-sm font-medium">$2.1M</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-sm">TechFund Capital</span>
                        <span className="text-sm font-medium">$1.8M</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-sm">Innovation Partners</span>
                        <span className="text-sm font-medium">$1.5M</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">
                      Top Funded Startups
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm">SmartCity Labs</span>
                        <span className="text-sm font-medium">$3.2M</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-sm">MediHealth AI</span>
                        <span className="text-sm font-medium">$2.7M</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-sm">EcoTech Solutions</span>
                        <span className="text-sm font-medium">$2.1M</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">
                      Funding Success Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">FinTech</span>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: "78%" }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm">HealthTech</span>
                      <span className="text-sm font-medium">65%</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: "65%" }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm">AI/ML</span>
                      <span className="text-sm font-medium">83%</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: "83%" }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InvestmentsPage;
