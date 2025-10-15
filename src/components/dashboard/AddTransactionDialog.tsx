"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { createTransaction } from "@/app/actions/transactions";
import { TransactionFormData, TransactionType, COMMON_CRYPTOS } from "@/types/transaction";
import { toast } from "sonner";

const formSchema = z.object({
  type: z.nativeEnum(TransactionType),
  crypto_currency: z.string().min(1, "Asset is required"),
  crypto_amount: z.number().positive("Amount must be positive"),
  fiat_amount: z.number().positive("Price must be positive"),
  fiat_currency: z.string().default("EUR"),
  date: z.date(),
  exchange: z.string().min(1, "Exchange is required"),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export interface AddTransactionDialogProps {
  children: React.ReactNode;
}

export function AddTransactionDialog({ children }: AddTransactionDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: TransactionType.BUY,
      crypto_currency: "",
      crypto_amount: 0,
      fiat_amount: 0,
      fiat_currency: "EUR",
      date: new Date(),
      exchange: "",
      notes: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      const result = await createTransaction(values);
      
      if (result.success) {
        toast.success("Transaction added successfully");
        form.reset();
        setOpen(false);
        // Refresh the page to show new transaction
        window.location.reload();
      } else {
        toast.error(result.error ?? "Failed to add transaction");
      }
    } catch (error) {
      toast.error("Failed to add transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription>
            Add a new cryptocurrency transaction to your portfolio.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={TransactionType.BUY}>Buy</SelectItem>
                        <SelectItem value={TransactionType.SELL}>Sell</SelectItem>
                        <SelectItem value={TransactionType.TRADE}>Trade</SelectItem>
                        <SelectItem value={TransactionType.INCOME}>Income</SelectItem>
                        <SelectItem value={TransactionType.EXPENSE}>Expense</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="crypto_currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asset</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select asset" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {COMMON_CRYPTOS.map((crypto) => (
                          <SelectItem key={crypto} value={crypto}>
                            {crypto}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="crypto_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="any"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fiat_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price per unit (EUR)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="any"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="exchange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exchange/Wallet</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Binance, Coinbase" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date & Time</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      {...field}
                      value={format(field.value, "yyyy-MM-dd'T'HH:mm")}
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add any additional notes..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Adding..." : "Add Transaction"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
