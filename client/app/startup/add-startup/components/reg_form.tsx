"use client";

import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";

interface StartupFormData {
  company_name: string;
  investment_score: number;
  investment_profile: string;
  total_equity_funding: number;
  latest_post_money_valuation: number;
  latest_annual_revenue: number;
  num_funding_rounds: number;
  rolling_average_revenue_1_3: number;
  rolling_average_revenue_3_5: number;
  rolling_average_netprofit_1_3: number;
  rolling_average_ebitda_1_3: number;
  rolling_average_ebitda_3_5: number;
  income_statement_revenue_2020: number;
  income_statement_revenue_2019: number;
  income_statement_revenue_2018: number;
  income_statement_revenue_2017: number;
  income_statement_revenue_2016: number;
  income_statement_revenue_2015: number;
  income_statement_revenue_2014: number;
  income_statement_revenue_2013: number;
  ratios_ebitda_margin_2020: number;
  ratios_ebitda_margin_2019: number;
  ratios_ebitda_margin_2018: number;
  ratios_ebitda_margin_2017: number;
  ratios_ebitda_margin_2016: number;
  ratios_ebitda_margin_2015: number;
  ratios_ebitda_margin_2014: number;
  ratios_ebitda_margin_2013: number;
  ratios_net_profit_margin_2020: number;
  ratios_net_profit_margin_2019: number;
  ratios_net_profit_margin_2018: number;
  ratios_net_profit_margin_2017: number;
  ratios_net_profit_margin_2016: number;
  ratios_net_profit_margin_2015: number;
  ratios_net_profit_margin_2014: number;
  ratios_net_profit_margin_2013: number;
  summary_ebitda_2020: number;
  summary_ebitda_2019: number;
  summary_ebitda_2018: number;
  summary_ebitda_2017: number;
  summary_ebitda_2016: number;
  summary_ebitda_2015: number;
  summary_ebitda_2014: number;
  summary_ebitda_2013: number;
  summary_net_profit_2020: number;
  summary_net_profit_2019: number;
  summary_net_profit_2018: number;
  summary_net_profit_2017: number;
  summary_net_profit_2016: number;
  summary_net_profit_2015: number;
  summary_net_profit_2014: number;
  summary_net_profit_2013: number;
  summary_revenue_2020: number;
  summary_revenue_2019: number;
  summary_revenue_2018: number;
  summary_revenue_2017: number;
  summary_revenue_2016: number;
  summary_revenue_2015: number;
  summary_revenue_2014: number;
  summary_revenue_2013: number;
  ebitda_2020: number;
  ebitda_2021: number;
  ebitda_2022: number;
  ebitda_2023: number;
  netprofit_2020: number;
  netprofit_2021: number;
  netprofit_2022: number;
  netprofit_2023: number;
  revenue_2020: number;
  revenue_2021: number;
  revenue_2022: number;
  revenue_2023: number;
  investor_score: number;
  valuation_2000: number;
  valuation_2004: number;
  valuation_2007: number;
  valuation_2008: number;
  valuation_2009: number;
  valuation_2010: number;
  valuation_2011: number;
  valuation_2012: number;
  valuation_2013: number;
  valuation_2014: number;
  valuation_2015: number;
  valuation_2016: number;
  valuation_2017: number;
  valuation_2018: number;
  valuation_2019: number;
  valuation_2020: number;
  valuation_2021: number;
  valuation_2022: number;
  valuation_2023: number;
  valuation_2024: number;
  netprofit_2024: number;
  revenue_growth: number;
  profit_margin: number;
  revenue_2024: number;
  category1: string;
  category2: string;
  sector1: string;
  sector2: string;
  sector3: string;
  sector4: string;
  sector5: string;
}

export default function StartupForm() {
  const form = useForm<StartupFormData>();
  const [formData, setFormData] = useState<StartupFormData | null>(null);

  const onSubmit = (data: StartupFormData) => {
    setFormData(data);
    // Here you can add logic to save the data to a JSON file or send it to a backend
    console.log(JSON.stringify(data, null, 2));
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 overflow-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">Startup Information</h2>
        <p className="text-sm text-slate-600">Enter all the required information</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="company_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter company name" {...field} />
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
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
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
                <Input placeholder="Enter investment profile" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="total_equity_funding"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Equity Funding</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter total equity funding"
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
          name="latest_post_money_valuation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Latest Post-Money Valuation</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter latest valuation"
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
          name="latest_annual_revenue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Latest Annual Revenue</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter latest revenue"
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
          name="num_funding_rounds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Funding Rounds</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter number of rounds"
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
          name="rolling_average_revenue_1_3"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rolling Average Revenue (1-3 years)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter rolling average revenue"
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
          name="rolling_average_revenue_3_5"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rolling Average Revenue (3-5 years)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter rolling average revenue"
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
          name="rolling_average_netprofit_1_3"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rolling Average Net Profit (1-3 years)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter rolling average net profit"
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
          name="rolling_average_ebitda_1_3"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rolling Average EBITDA (1-3 years)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter rolling average EBITDA"
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
          name="rolling_average_ebitda_3_5"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rolling Average EBITDA (3-5 years)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter rolling average EBITDA"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Add remaining fields similarly */}

        <FormField
          control={form.control}
          name="category1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category 1</FormLabel>
              <FormControl>
                <Input placeholder="Enter primary category" {...field} />
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
                <Input placeholder="Enter secondary category" {...field} />
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
              <FormLabel>Sector 1</FormLabel>
              <FormControl>
                <Input placeholder="Enter primary sector" {...field} />
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
                <Input placeholder="Enter secondary sector" {...field} />
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
                <Input placeholder="Enter tertiary sector" {...field} />
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
                <Input placeholder="Enter quaternary sector" {...field} />
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
                <Input placeholder="Enter quinary sector" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <Button type="submit" className="w-full">
        Submit
      </Button>

      {formData && (
        <Card className="mt-6 p-6">
          <h3 className="text-lg font-medium mb-4">Form Data (JSON)</h3>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </Card>
      )}
    </form>
  );
}
