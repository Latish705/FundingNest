"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import PageTitle from "@/components/ui/PageTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { BackendUrl } from "@/utils/contants";

const StartupCreatePage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    company_name: "",
    unified_sector: "",
    business_category: "",
    investment_score: "",
    investment_profile: "",
    tracxn_score: "",
    total_equity_funding: "",
    latest_post_money_valuation: "",
    latest_annual_revenue: "",
    num_funding_rounds: "",
    investor_score: "",
    funding_efficiency: "",
    revenue_multiple: "",
    funding_per_round: "",
    revenue_growth: "",
    profit_margin: "",
    investment_cluster: "",
    data_source: "",
    categories: "",
    business_model: "",
    sectors: "",
    revenue_2020: "",
    revenue_2021: "",
    revenue_2022: "",
    revenue_2023: "",
    revenue_2024: "",
    ebitda_2020: "",
    ebitda_2021: "",
    ebitda_2022: "",
    ebitda_2023: "",
    netprofit_2020: "",
    netprofit_2021: "",
    netprofit_2022: "",
    netprofit_2023: "",
    valuation_2020: "",
    valuation_2021: "",
    valuation_2022: "",
    valuation_2023: "",
    valuation_2024: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.company_name) {
      toast.error("Company name is required!");
      return;
    }

    setIsLoading(true);

    try {
      // First create the local API route
      const response = await fetch("/api/startups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create startup");
      }

      toast.success("Startup created successfully");
      router.push("/startups"); // Redirect to startup list page
    } catch (err: any) {
      console.error("Error creating startup:", err);
      toast.error(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PageTitle title="Add New Startup" />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Input label="Company Name *" name="company_name" value={formData.company_name} onChange={handleChange} required />
              <Input label="Sector" name="unified_sector" value={formData.unified_sector} onChange={handleChange} />
              <Input label="Business Category" name="business_category" value={formData.business_category} onChange={handleChange} />
              <Input label="Business Model" name="business_model" value={formData.business_model} onChange={handleChange} />
              <Input label="Categories" name="categories" value={formData.categories} onChange={handleChange} />
              <Input label="Data Source" name="data_source" value={formData.data_source} onChange={handleChange} />
            </div>
          </CardContent>
        </Card>

        {/* Investment Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Investment Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Input label="Investment Score" name="investment_score" type="number" value={formData.investment_score} onChange={handleChange} />
              <Input label="Investment Profile" name="investment_profile" value={formData.investment_profile} onChange={handleChange} />
              <Input label="Tracxn Score" name="tracxn_score" type="number" value={formData.tracxn_score} onChange={handleChange} />
              <Input label="Total Equity Funding" name="total_equity_funding" type="number" value={formData.total_equity_funding} onChange={handleChange} />
              <Input label="Latest Post-Money Valuation" name="latest_post_money_valuation" type="number" value={formData.latest_post_money_valuation} onChange={handleChange} />
              <Input label="Latest Annual Revenue" name="latest_annual_revenue" type="number" value={formData.latest_annual_revenue} onChange={handleChange} />
              <Input label="Number of Funding Rounds" name="num_funding_rounds" type="number" value={formData.num_funding_rounds} onChange={handleChange} />
            </div>
          </CardContent>
        </Card>

        {/* Financial Data */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Data (2020-2024)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[2020, 2021, 2022, 2023, 2024].map((year) => (
                <Input 
                  key={`revenue-${year}`} 
                  label={`Revenue ${year}`} 
                  name={`revenue_${year}`} 
                  type="number" 
                  value={formData[`revenue_${year}` as keyof typeof formData]} 
                  onChange={handleChange} 
                />
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {[2020, 2021, 2022, 2023].map((year) => (
                <Input 
                  key={`ebitda-${year}`} 
                  label={`EBITDA ${year}`} 
                  name={`ebitda_${year}`} 
                  type="number" 
                  value={formData[`ebitda_${year}` as keyof typeof formData]} 
                  onChange={handleChange} 
                />
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
              {[2020, 2021, 2022, 2023, 2024].map((year) => (
                <Input 
                  key={`netprofit-${year}`} 
                  label={`Net Profit ${year}`} 
                  name={`netprofit_${year}`} 
                  type="number" 
                  value={formData[`netprofit_${year}` as keyof typeof formData]} 
                  onChange={handleChange} 
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Startup"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StartupCreatePage;
