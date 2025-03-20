"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"

const formSchema = z.object({
  amount: z.string().min(1, "Investment amount is required"),
  terms: z.boolean().refine((val) => val, "You must accept the terms"),
})

interface InvestmentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  startup: {
    name: string
    valuation: string
  }
}

export function InvestmentModal({ open, onOpenChange, startup }: InvestmentModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      terms: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true)
      // Here you would make an API call to process the investment
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
      toast.success("Investment submitted successfully!")
      onOpenChange(false)
      form.reset()
    } catch (error) {
      toast.error("Failed to submit investment")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invest in {startup.name}</DialogTitle>
          <DialogDescription>
            Current valuation: {startup.valuation}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Investment Amount ($)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="10000"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Minimum investment: $10,000
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I acknowledge the risks involved in startup investments
                    </FormLabel>
                    <FormDescription>
                      By checking this box, you confirm that you understand
                      the high-risk nature of startup investments.
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "Processing..." : "Submit Investment"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}