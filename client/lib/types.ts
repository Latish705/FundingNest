import { z } from "zod";

export const companyDetailsSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  companyId: z.string().min(1, "Company ID is required"),
  unifiedSector: z.string().min(1, "Unified sector is required"),
  businessCategory: z.string().min(1, "Business category is required"),
  investmentScore: z.number().min(0).max(100),
  investmentProfile: z.string().min(1, "Investment profile is required"),
  tracxnScore: z.number().min(0).max(100),
});

export const financialMetricsSchema = z.object({
  totalEquityFunding: z.number().min(0),
  latestPostMoneyValuation: z.number().min(0),
  latestAnnualRevenue: z.number().min(0),
  numberOfFundingRounds: z.number().min(0),
  rollingAverageRevenue1_3: z.number().min(0),
  rollingAverageRevenue3_5: z.number().min(0),
  rollingAverageNetProfit1_3: z.number(),
  netProfitCAGR5: z.number(),
  rollingAverageEBITDA1_3: z.number(),
  rollingAverageEBITDA3_5: z.number(),
  investorScore: z.number().min(0).max(100),
  fundingEfficiency: z.number(),
  revenueMultiple: z.number(),
  fundingPerRound: z.number().min(0),
  revenueGrowth: z.number(),
  profitMargin: z.number(),
  investmentCluster: z.string(),
});

export const categoriesSchema = z.object({
  category1: z.string().min(1, "Category 1 is required"),
  category2: z.string().min(1, "Category 2 is required"),
  sector1: z.string().min(1, "Sector 1 is required"),
  sector2: z.string().min(1, "Sector 2 is required"),
  sector3: z.string().min(1, "Sector 3 is required"),
  sector4: z.string().min(1, "Sector 4 is required"),
  sector5: z.string().min(1, "Sector 5 is required"),
});

export const yearlyDataSchema = z.object({
  year: z.number().min(1900).max(2100),
  incomeStatementRevenue: z.number(),
  ratiosEBITDAMargin: z.number(),
  ratiosNetProfitMargin: z.number(),
  summaryEBITDA: z.number(),
  summaryNetProfit: z.number(),
  summaryRevenue: z.number(),
  EBITDA: z.number(),
  netProfit: z.number(),
  revenue: z.number(),
  valuation: z.number().min(0),
});

export const startupFormSchema = z.object({
  companyDetails: companyDetailsSchema,
  financialMetrics: financialMetricsSchema,
  categories: categoriesSchema,
  yearlyData: z.array(yearlyDataSchema),
});

export type StartupFormData = z.infer<typeof startupFormSchema>;
