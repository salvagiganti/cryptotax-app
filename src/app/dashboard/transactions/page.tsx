import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddTransactionDialog } from "@/components/dashboard/AddTransactionDialog";
import { Plus, Edit, Trash2 } from "lucide-react";
import { getTransactions } from "@/app/actions/transactions";
import { TransactionType, COMMON_CRYPTOS } from "@/types/transaction";
import { format } from "date-fns";

export default async function TransactionsPage() {
  const result = await getTransactions();
  const transactions = result.success ? result.data || [] : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">
            Manage your cryptocurrency transactions
          </p>
        </div>
        <AddTransactionDialog>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </AddTransactionDialog>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 rounded-lg border p-4">
        <div className="flex-1 min-w-[200px]">
          <label className="text-sm font-medium mb-2 block">Date From</label>
          <Input type="date" placeholder="Start date" />
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="text-sm font-medium mb-2 block">Date To</label>
          <Input type="date" placeholder="End date" />
        </div>
        <div className="flex-1 min-w-[150px]">
          <label className="text-sm font-medium mb-2 block">Type</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value={TransactionType.BUY}>Buy</SelectItem>
              <SelectItem value={TransactionType.SELL}>Sell</SelectItem>
              <SelectItem value={TransactionType.TRADE}>Trade</SelectItem>
              <SelectItem value={TransactionType.INCOME}>Income</SelectItem>
              <SelectItem value={TransactionType.EXPENSE}>Expense</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1 min-w-[150px]">
          <label className="text-sm font-medium mb-2 block">Asset</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="All assets" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All assets</SelectItem>
              {COMMON_CRYPTOS.map((crypto) => (
                <SelectItem key={crypto} value={crypto}>
                  {crypto}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="rounded-lg border">
        {transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-center space-y-4">
              <div className="text-muted-foreground">
                <svg
                  className="mx-auto h-12 w-12 text-muted-foreground/50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium">No transactions yet</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Get started by adding your first cryptocurrency transaction.
              </p>
              <AddTransactionDialog>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Transaction
                </Button>
              </AddTransactionDialog>
            </div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Asset</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Price (EUR)</TableHead>
                <TableHead>Total Value</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {format(new Date(transaction.date), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        transaction.type === TransactionType.BUY
                          ? "bg-green-100 text-green-800"
                          : transaction.type === TransactionType.SELL
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </TableCell>
                  <TableCell className="font-mono">{transaction.crypto_currency}</TableCell>
                  <TableCell className="font-mono">
                    {transaction.crypto_amount.toFixed(8)}
                  </TableCell>
                  <TableCell className="font-mono">
                    €{transaction.fiat_amount.toFixed(2)}
                  </TableCell>
                  <TableCell className="font-mono">
                    €{(transaction.crypto_amount * transaction.fiat_amount).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
