"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import PageTitle from "@/components/ui/PageTitle";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    // Financial data
    income_statement_revenue_2020: "",
    income_statement_revenue_2019: "",
    income_statement_revenue_2018: "",
    income_statement_revenue_2017: "",
    income_statement_revenue_2016: "",
    income_statement_revenue_2015: "",
    income_statement_revenue_2014: "",
    income_statement_revenue_2013: "",
    ratios_ebitda_margin_2020: "",
    ratios_ebitda_margin_2019: "",
    ratios_ebitda_margin_2018: "",
    ratios_ebitda_margin_2017: "",
    ratios_ebitda_margin_2016: "",
    ratios_ebitda_margin_2015: "",
    ratios_ebitda_margin_2014: "",
    ratios_ebitda_margin_2013: "",
    ratios_net_profit_margin_2020: "",
    ratios_net_profit_margin_2019: "",
    ratios_net_profit_margin_2018: "",
    ratios_net_profit_margin_2017: "",
    ratios_net_profit_margin_2016: "",
    ratios_net_profit_margin_2015: "",
    ratios_net_profit_margin_2014: "",
    ratios_net_profit_margin_2013: "",
    summary_ebitda_2020: "",
    summary_ebitda_2019: "",
    summary_ebitda_2018: "",
    summary_ebitda_2017: "",
    summary_ebitda_2016: "",
    summary_ebitda_2015: "",
    summary_ebitda_2014: "",
    summary_ebitda_2013: "",
    summary_net_profit_2020: "",
    summary_net_profit_2019: "",
    summary_net_profit_2018: "",
    summary_net_profit_2017: "",
    summary_net_profit_2016: "",
    summary_net_profit_2015: "",
    summary_net_profit_2014: "",
    summary_net_profit_2013: "",
    summary_revenue_2020: "",
    summary_revenue_2019: "",
    summary_revenue_2018: "",
    summary_revenue_2017: "",
    summary_revenue_2016: "",
    summary_revenue_2015: "",
    summary_revenue_2014: "",
    summary_revenue_2013: "",
    ebitda_2020: "",
    ebitda_2021: "",
    ebitda_2022: "",
    ebitda_2023: "",
    netprofit_2020: "",
    netprofit_2021: "",
    netprofit_2022: "",
    netprofit_2023: "",
    revenue_2020: "",
    revenue_2021: "",
    revenue_2022: "",
    revenue_2023: "",
    valuation_2020: "",
    valuation_2021: "",
    valuation_2022: "",
    valuation_2023: "",
    valuation_2024: "",
    netprofit_2024: "",
    revenue_2024: "",
    rolling_average_revenue_1_3: "",
    rolling_average_revenue_3_5: "",
    rolling_average_netprofit_1_3: "",
    rolling_average_ebitda_1_3: "",
    rolling_average_ebitda_3_5: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
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
      router.push("/startups"); // Redirect to startups list page
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
        <Card title="Basic Information">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input
              label="Company Name"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              required
            />
            <Input
              label="Sector"
              name="unified_sector"
              value={formData.unified_sector}
              onChange={handleChange}
            />
            <Input
              label="Business Category"
              name="business_category"
              value={formData.business_category}
              onChange={handleChange}
            />
            <Input
              label="Business Model"
              name="business_model"
              value={formData.business_model}
              onChange={handleChange}
            />
            <Input
              label="Categories"
              name="categories"
              value={formData.categories}
              onChange={handleChange}
            />
            <Input
              label="Data Source"
              name="data_source"
              value={formData.data_source}
              onChange={handleChange}
            />
          </div>
        </Card>

        <Card title="Investment Metrics">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input
              label="Investment Score"
              name="investment_score"
              type="number"
              value={formData.investment_score}
              onChange={handleChange}
            />
            <Input
              label="Investment Profile"
              name="investment_profile"
              value={formData.investment_profile}
              onChange={handleChange}
            />
            <Input
              label="Tracxn Score"
              name="tracxn_score"
              type="number"
              value={formData.tracxn_score}
              onChange={handleChange}
            />
            <Input
              label="Total Equity Funding"
              name="total_equity_funding"
              type="number"
              value={formData.total_equity_funding}
              onChange={handleChange}
            />
            <Input
              label="Latest Post-Money Valuation"
              name="latest_post_money_valuation"
              type="number"
              value={formData.latest_post_money_valuation}
              onChange={handleChange}
            />
            <Input
              label="Latest Annual Revenue"
              name="latest_annual_revenue"
              type="number"
              value={formData.latest_annual_revenue}
              onChange={handleChange}
            />
            <Input
              label="Number of Funding Rounds"
              name="num_funding_rounds"
              type="number"
              value={formData.num_funding_rounds}
              onChange={handleChange}
            />
            <Input
              name="investor_score"
              type="number"
              value={formData.investor_score}
              onChange={handleChange}
            />
            <Input
              label="Funding Efficiency"
              name="funding_efficiency"
              type="number"
              value={formData.funding_efficiency}
              onChange={handleChange}
            />
          </div>
        </Card>

        <Card title="Financial Data (2020-2024)">
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Revenue</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[2020, 2021, 2022, 2023, 2024].map((year) => (
                <Input
                  key={`revenue-${year}`}
                  label={`${year}`}
                  name={`revenue_${year}`}
                  type="number"
                  value={(formData as any)[`revenue_${year}`]}
                  onChange={handleChange}
                />
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">EBITDA</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[2020, 2021, 2022, 2023].map((year) => (
                <Input
                  key={`ebitda-${year}`}
                  name={`ebitda_${year}`}
                  type="number"
                  value={(formData as any)[`ebitda_${year}`]}
                  onChange={handleChange}
                />
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Net Profit</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[2020, 2021, 2022, 2023, 2024].map((year) => (
                <Input
                  key={`netprofit-${year}`}
                  name={`netprofit_${year}`}
                  type="number"
                  value={(formData as any)[`netprofit_${year}`]}
                  onChange={handleChange}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Valuation</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[2020, 2021, 2022, 2023, 2024].map((year) => (
                <Input
                  key={`valuation-${year}`}
                  name={`valuation_${year}`}
                  type="number"
                  value={(formData as any)[`valuation_${year}`]}
                  onChange={handleChange}
                />
              ))}
            </div>
          </div>
        </Card>

        <Card title="Rolling Averages">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input
              name="rolling_average_revenue_1_3"
              type="number"
              value={formData.rolling_average_revenue_1_3}
              onChange={handleChange}
            />
            <Input
              name="rolling_average_revenue_3_5"
              type="number"
              value={formData.rolling_average_revenue_3_5}
              onChange={handleChange}
            />
            <Input
              name="rolling_average_netprofit_1_3"
              type="number"
              value={formData.rolling_average_netprofit_1_3}
              onChange={handleChange}
            />
            <Input
              name="rolling_average_ebitda_1_3"
              type="number"
              value={formData.rolling_average_ebitda_1_3}
              onChange={handleChange}
            />
            <Input
              name="rolling_average_ebitda_3_5"
              type="number"
              value={formData.rolling_average_ebitda_3_5}
              onChange={handleChange}
            />
          </div>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" isLoading={isLoading} loadingText="Creating...">
            Create Startup
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StartupCreatePage;
