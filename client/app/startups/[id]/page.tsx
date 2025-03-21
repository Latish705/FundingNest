"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const investmentSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
});

interface Startup {
  _id: string;
  company_name: string;
  unified_sector: string;
  business_category: string;
  business_model: string;
  investment_score: number;
  total_equity_funding: number;
  latest_post_money_valuation: number;
  latest_annual_revenue: number;
  num_funding_rounds: number;
  revenue_2020: number;
  revenue_2021: number;
  revenue_2022: number;
  revenue_2023: number;
  revenue_2024: number;
}

export default function StartupDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [startup, setStartup] = useState<Startup | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [investmentDialogOpen, setInvestmentDialogOpen] = useState(false);

  const investmentForm = useForm<z.infer<typeof investmentSchema>>({
    resolver: zodResolver(investmentSchema),
    defaultValues: {
      amount: "",
    },
  });

  useEffect(() => {
    const fetchStartup = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/startups/${params.id}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch startup details");
        }
        
        const data = await response.json();
        setStartup(data.startup);
      } catch (error: any) {
        setError(error.message || "Failed to load startup details");
      } finally {
        setLoading(false);
      }
    };
    
    if (params.id) {
      fetchStartup();
    }
  }, [params.id]);

  const handleInvestment = async (values: z.infer<typeof investmentSchema>) => {
    try {
      const response = await fetch("/api/investments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startupId: startup?._id,
          amount: parseFloat(values.amount),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to make investment");
      }

      toast.success("Investment submitted successfully");
      setInvestmentDialogOpen(false);
      investmentForm.reset();
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500 p-4">{error}</div>
        <Button onClick={() => router.back()} className="mt-4">Go Back</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button onClick={() => router.back()} className="mb-6">Go Back</Button>
      
      {startup && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">{startup.company_name}</h1>
            <Button onClick={() => setInvestmentDialogOpen(true)}>Invest Now</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2"><strong>Sector:</strong> {startup.unified_sector}</p>
                <p className="mb-2"><strong>Category:</strong> {startup.business_category}</p>
                <p className="mb-2"><strong>Business Model:</strong> {startup.business_model}</p>
                <p><strong>Investment Score:</strong> {startup.investment_score}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Financial Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2"><strong>Total Equity Funding:</strong> ${startup.total_equity_funding?.toLocaleString() || 0}</p>
                <p className="mb-2"><strong>Latest Valuation:</strong> ${startup.latest_post_money_valuation?.toLocaleString() || 0}</p>
                <p className="mb-2"><strong>Latest Annual Revenue:</strong> ${startup.latest_annual_revenue?.toLocaleString() || 0}</p>
                <p><strong>Funding Rounds:</strong> {startup.num_funding_rounds}</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Revenue History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <p className="font-semibold">2020</p>
                  <p>${startup.revenue_2020?.toLocaleString() || 0}</p>
                </div>
                <div>
                  <p className="font-semibold">2021</p>
                  <p>${startup.revenue_2021?.toLocaleString() || 0}</p>
                </div>
                <div>
                  <p className="font-semibold">2022</p>
                  <p>${startup.revenue_2022?.toLocaleString() || 0}</p>
                </div>
                <div>
                  <p className="font-semibold">2023</p>
                  <p>${startup.revenue_2023?.toLocaleString() || 0}</p>
                </div>
                <div>
                  <p className="font-semibold">2024</p>
                  <p>${startup.revenue_2024?.toLocaleString() || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Dialog open={investmentDialogOpen} onOpenChange={setInvestmentDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invest in {startup.company_name}</DialogTitle>
              </DialogHeader>
              <Form {...investmentForm}>
                <form onSubmit={investmentForm.handleSubmit(handleInvestment)} className="space-y-4">
                  <FormField
                    control={investmentForm.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Investment Amount ($)</FormLabel>
                        <FormControl>
                          <Input placeholder="10000" type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit">Submit Investment</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}