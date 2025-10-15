"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { generateReport } from "@/app/actions/reports";
import { ReportFormData, ReportType, REPORT_YEARS } from "@/types/report";
import { toast } from "sonner";
import { FileText } from "lucide-react";

const formSchema = z.object({
  year: z.number().min(2020, "Year must be 2020 or later"),
  report_type: z.nativeEnum(ReportType),
  include_options: z.object({
    staking_rewards: z.boolean().default(false),
    airdrops: z.boolean().default(false),
    defi_transactions: z.boolean().default(false),
  }),
});

type FormValues = z.infer<typeof formSchema>;

export interface GenerateReportDialogProps {
  children: React.ReactNode;
}

export function GenerateReportDialog({ children }: GenerateReportDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      year: new Date().getFullYear(),
      report_type: ReportType.ANNUAL_SUMMARY,
      include_options: {
        staking_rewards: false,
        airdrops: false,
        defi_transactions: false,
      },
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      const result = await generateReport(values.year, values.include_options);
      
      if (result.success) {
        toast.success("Tax report generated successfully");
        form.reset();
        setOpen(false);
        // Refresh the page to show new report
        window.location.reload();
      } else {
        toast.error(result.error ?? "Failed to generate report");
      }
    } catch (error) {
      toast.error("Failed to generate report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Generate Tax Report
          </DialogTitle>
          <DialogDescription>
            Create a tax report for the selected year. This will calculate your gains and losses.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tax Year</FormLabel>
                  <Select 
                    onValueChange={(value) => field.onChange(parseInt(value))} 
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tax year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {REPORT_YEARS.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="report_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Report Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={ReportType.ANNUAL_SUMMARY}>
                        Annual Summary
                      </SelectItem>
                      <SelectItem value={ReportType.DETAILED_TRANSACTION_LOG}>
                        Detailed Transaction Log
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormLabel>Include Options</FormLabel>
              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="include_options.staking_rewards"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal">
                          Staking rewards
                        </FormLabel>
                        <p className="text-xs text-muted-foreground">
                          Include staking rewards in calculations
                        </p>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="include_options.airdrops"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal">
                          Airdrops
                        </FormLabel>
                        <p className="text-xs text-muted-foreground">
                          Include airdrop distributions
                        </p>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="include_options.defi_transactions"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal">
                          DeFi transactions
                        </FormLabel>
                        <p className="text-xs text-muted-foreground">
                          Include DeFi protocol interactions
                        </p>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Generating..." : "Generate Report"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
