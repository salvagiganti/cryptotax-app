"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TaxSettings, TaxCalculationMethod, TaxYearStart, COUNTRIES } from "@/types/settings";
import { toast } from "sonner";

const taxSchema = z.object({
  tax_residency_country: z.string().min(1, "Country is required"),
  calculation_method: z.nativeEnum(TaxCalculationMethod),
  tax_year_start: z.nativeEnum(TaxYearStart),
  include_options: z.object({
    staking_rewards: z.boolean().default(false),
    airdrops: z.boolean().default(false),
    hard_forks: z.boolean().default(false),
  }),
});

type TaxFormValues = z.infer<typeof taxSchema>;

export interface TaxTabProps {
  taxSettings?: TaxSettings;
  onUpdateTaxSettings?: (data: TaxFormValues) => Promise<void>;
}

export function TaxTab({ taxSettings, onUpdateTaxSettings }: TaxTabProps) {
  const [loading, setLoading] = React.useState(false);

  const form = useForm<TaxFormValues>({
    resolver: zodResolver(taxSchema),
    defaultValues: {
      tax_residency_country: taxSettings?.tax_residency_country || "DE",
      calculation_method: taxSettings?.calculation_method || TaxCalculationMethod.FIFO,
      tax_year_start: taxSettings?.tax_year_start || TaxYearStart.JANUARY_1,
      include_options: {
        staking_rewards: taxSettings?.include_options.staking_rewards || false,
        airdrops: taxSettings?.include_options.airdrops || false,
        hard_forks: taxSettings?.include_options.hard_forks || false,
      },
    },
  });

  const onSubmit = async (values: TaxFormValues) => {
    try {
      setLoading(true);
      if (onUpdateTaxSettings) {
        await onUpdateTaxSettings(values);
        toast.success("Tax settings updated successfully");
      } else {
        // Mock update for demo
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success("Tax settings updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update tax settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tax Configuration</CardTitle>
          <CardDescription>
            Configure your tax calculation preferences and residency settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="tax_residency_country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax Residency Country</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {COUNTRIES.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            {country.name}
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
                name="calculation_method"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Calculation Method</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select calculation method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={TaxCalculationMethod.FIFO}>
                          FIFO (First In, First Out)
                        </SelectItem>
                        <SelectItem value={TaxCalculationMethod.LIFO}>
                          LIFO (Last In, First Out)
                        </SelectItem>
                        <SelectItem value={TaxCalculationMethod.AVERAGE_COST}>
                          Average Cost
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tax_year_start"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax Year Start</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select tax year start" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={TaxYearStart.JANUARY_1}>
                          January 1st
                        </SelectItem>
                        <SelectItem value={TaxYearStart.APRIL_1}>
                          April 1st
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <FormLabel>Include in Taxable Events</FormLabel>
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
                            Include staking rewards as taxable income
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
                            Include airdrop distributions as taxable income
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="include_options.hard_forks"
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
                            Hard forks
                          </FormLabel>
                          <p className="text-xs text-muted-foreground">
                            Include hard fork distributions as taxable income
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save Tax Settings"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
