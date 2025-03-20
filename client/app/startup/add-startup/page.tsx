"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { StartupFormData, startupFormSchema } from "@/lib/types";
import { BackendUrl } from "@/utils/contants";

const steps = [
  { id: 1, name: "Company Details" },
  { id: 2, name: "Financial Metrics" },
  { id: 3, name: "Categories" },
  { id: 4, name: "Yearly Data" },
];

// Array of years for dynamic field generation
const years = ["2018", "2019", "2020", "2021", "2022", "2023", "2024"];

export default function AddStartupPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<StartupFormData>({
    resolver: zodResolver(startupFormSchema),
    defaultValues: {
      company_name: "",
      investment_profile: "",
      unified_sector: "",
      business_category: "",
      investment_score: 0,
      revenue_growth: 0,
      profit_margin: 0,
      total_equity_funding: 0,
      latest_post_money_valuation: 0,
      latest_annual_revenue: 0,
      num_funding_rounds: 0,
      category1: "",
      category2: "",
      sector1: "",
      sector2: "",
      sector3: "",
      sector4: "",
      sector5: "",
      rolling_average_revenue_1_3: 0,
      rolling_average_revenue_3_5: 0,
      rolling_average_netprofit_1_3: 0,
      rolling_average_ebitda_1_3: 0,
      rolling_average_ebitda_3_5: 0,
    },
    mode: "onChange",
  });

  const { trigger, getValues } = form;

  // Handle step navigation with validation for the current step only
  const handleNext = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);

    // Only validate the fields that are shown in the current step
    const isValid = await trigger(fieldsToValidate as any);

    if (isValid) {
      setCurrentStep(Math.min(steps.length, currentStep + 1));
    } else {
      toast.error("Please complete all required fields");
    }
  };

  const handlePrevious = () => {
    setCurrentStep(Math.max(1, currentStep - 1));
  };

  // Get fields to validate for each step - simplified validation requirements
  const getFieldsForStep = (step: number): Array<keyof StartupFormData> => {
    switch (step) {
      case 1:
        return ["company_name"];
      case 2:
        return ["total_equity_funding", "latest_annual_revenue"];
      case 3:
        return ["category1", "sector1"];
      case 4:
        // For yearly data, we'll only require current year fields
        return ["revenue_2023", "ebitda_2023"];
      default:
        return [];
    }
  };

  const onSubmit = async (data: StartupFormData) => {
    try {
      setIsSubmitting(true);

      // Transform the form data into the structure expected by the API
      const transformedData = {
        company_name: data.company_name,
        unifiedSector: data.unified_sector || "Tech",
        revenue: data.latest_annual_revenue,

        // Transform yearly data into arrays with value and date
        ebitas: years
          .map((year) => {
            const fieldName = `ebitda_${year}` as keyof StartupFormData;
            const value = data[fieldName];
            return value
              ? { value: Number(value), date: `${year}-01-01` }
              : null;
          })
          .filter(Boolean),

        revenues: years
          .map((year) => {
            const fieldName = `revenue_${year}` as keyof StartupFormData;
            const value = data[fieldName];
            return value
              ? { value: Number(value), date: `${year}-01-01` }
              : null;
          })
          .filter(Boolean),

        netProfits: years
          .map((year) => {
            const fieldName = `netprofit_${year}` as keyof StartupFormData;
            const value = data[fieldName];
            return value
              ? { value: Number(value), date: `${year}-01-01` }
              : null;
          })
          .filter(Boolean),

        // Other arrays
        categories: [
          data.category1
            ? {
                value: data.category1,
                date: new Date().toISOString().split("T")[0],
              }
            : null,
          data.category2
            ? {
                value: data.category2,
                date: new Date().toISOString().split("T")[0],
              }
            : null,
        ].filter(Boolean),

        sectors: [
          data.sector1
            ? {
                value: data.sector1,
                date: new Date().toISOString().split("T")[0],
              }
            : null,
          data.sector2
            ? {
                value: data.sector2,
                date: new Date().toISOString().split("T")[0],
              }
            : null,
          data.sector3
            ? {
                value: data.sector3,
                date: new Date().toISOString().split("T")[0],
              }
            : null,
          data.sector4
            ? {
                value: data.sector4,
                date: new Date().toISOString().split("T")[0],
              }
            : null,
          data.sector5
            ? {
                value: data.sector5,
                date: new Date().toISOString().split("T")[0],
              }
            : null,
        ].filter(Boolean),

        // Scalar values
        investmentScore: data.investment_score,
        investmentProfile: data.investment_profile || "Growth",
        totalEquityFunding: data.total_equity_funding,
        lastPostMoneyValuation: data.latest_post_money_valuation,
        lastAnnualRevenue: data.latest_annual_revenue,
        numberOfFundingRounds: data.num_funding_rounds,
        revenueGrowth: data.revenue_growth,
        profitMargin: data.profit_margin,

        // Rolling averages
        rollingAverageRevenues: [
          data.rolling_average_revenue_1_3
            ? { value: data.rolling_average_revenue_1_3, date: "2023-01-01" }
            : null,
          data.rolling_average_revenue_3_5
            ? { value: data.rolling_average_revenue_3_5, date: "2021-01-01" }
            : null,
        ].filter(Boolean),

        rollingAverageNetProfits: [
          data.rolling_average_netprofit_1_3
            ? { value: data.rolling_average_netprofit_1_3, date: "2023-01-01" }
            : null,
        ].filter(Boolean),

        rollingAverageEBITDAs: [
          data.rolling_average_ebitda_1_3
            ? { value: data.rolling_average_ebitda_1_3, date: "2023-01-01" }
            : null,
          data.rolling_average_ebitda_3_5
            ? { value: data.rolling_average_ebitda_3_5, date: "2021-01-01" }
            : null,
        ].filter(Boolean),
      };

      const response = await fetch(`${BackendUrl}/api/startup/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transformedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit startup data");
      }

      toast.success("Startup added successfully!");
      form.reset();
      setCurrentStep(1);
    } catch (error: any) {
      toast.error(error.message || "Failed to add startup");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = (currentStep / steps.length) * 100;

  // Render yearly data fields dynamically
  const renderYearlyDataFields = () => {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {years.map((year) => (
          <div key={year} className="space-y-4 border p-4 rounded-lg">
            <h3 className="font-medium text-center border-b pb-2">
              Year {year}
            </h3>

            <FormField
              control={form.control}
              name={`revenue_${year}` as any}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Revenue {year}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter revenue"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`ebitda_${year}` as any}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>EBITDA {year}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter EBITDA"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`netprofit_${year}` as any}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Net Profit {year}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter net profit"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Add New Startup
          </h1>
          <p className="text-slate-600">
            Complete the form below to add a new startup to the platform
          </p>
        </div>

        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2 text-sm text-slate-600">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`${
                  currentStep >= step.id
                    ? "text-blue-600 font-medium"
                    : "text-slate-400"
                }`}
              >
                {step.name}
              </div>
            ))}
          </div>
        </div>

        <Card className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {currentStep === 1 && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="company_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter company name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="investment_profile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Investment Profile</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter investment profile"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="investment_score"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Investment Score (0-100)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            placeholder="Enter investment score"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="unified_sector"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unified Sector</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="E.g., Tech, Healthcare"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {currentStep === 2 && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="total_equity_funding"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Equity Funding *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter total equity funding"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="latest_post_money_valuation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Latest Post-Money Valuation</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter latest valuation"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="latest_annual_revenue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Latest Annual Revenue *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter latest revenue"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="num_funding_rounds"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Funding Rounds</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter number of rounds"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="rolling_average_revenue_1_3"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Rolling Average Revenue (1-3 years)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter rolling average revenue"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="rolling_average_revenue_3_5"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Rolling Average Revenue (3-5 years)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter rolling average revenue"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {currentStep === 3 && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="category1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category 1 *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter primary category"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category 2</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter secondary category"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sector1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sector 1 *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter primary sector"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sector2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sector 2</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter secondary sector"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sector3"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sector 3</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter tertiary sector"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sector4"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sector 4</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter quaternary sector"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sector5"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sector 5</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter quinary sector"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {currentStep === 4 && renderYearlyDataFields()}

              <div className="flex justify-between mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                {currentStep < steps.length ? (
                  <Button type="button" onClick={handleNext}>
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
