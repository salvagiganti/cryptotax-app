"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { TaxReport, ReportFormData, ReportStatus, ReportCalculation } from "@/types/report";

type ActionResult<T = unknown> = {
  success: boolean;
  error?: string;
  data?: T;
};

export async function generateReport(
  year: number,
  options: ReportFormData['include_options']
): Promise<ActionResult<TaxReport>> {
  try {
    const supabase = createSupabaseServerClient();
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return { success: false, error: "Not authenticated" };
    }

    // Check if report already exists for this year
    const { data: existingReport } = await supabase
      .from("tax_reports")
      .select("id")
      .eq("user_id", user.id)
      .eq("year", year)
      .single();

    if (existingReport) {
      return { success: false, error: "Report already exists for this year" };
    }

    // Create report with processing status
    const { data: report, error: createError } = await supabase
      .from("tax_reports")
      .insert({
        user_id: user.id,
        year,
        status: ReportStatus.PROCESSING,
      })
      .select()
      .single();

    if (createError) return { success: false, error: createError.message };

    // Calculate gains/losses (simplified FIFO implementation)
    const calculation = await calculateGainsLosses(user.id, year, options);
    
    // Update report with results
    const { data: updatedReport, error: updateError } = await supabase
      .from("tax_reports")
      .update({
        status: ReportStatus.COMPLETED,
        total_gains: calculation.total_gains,
        total_losses: calculation.total_losses,
        completed_at: new Date().toISOString(),
      })
      .eq("id", report.id)
      .select()
      .single();

    if (updateError) return { success: false, error: updateError.message };
    
    return { success: true, data: updatedReport };
  } catch (e: any) {
    return { success: false, error: e?.message ?? "Unknown error" };
  }
}

async function calculateGainsLosses(
  userId: string,
  year: number,
  options: ReportFormData['include_options']
): Promise<ReportCalculation> {
  const supabase = createSupabaseServerClient();
  
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31, 23, 59, 59);

  // Get all transactions for the year
  const { data: transactions } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .gte("date", startDate.toISOString())
    .lte("date", endDate.toISOString())
    .order("date", { ascending: true });

  if (!transactions || transactions.length === 0) {
    return {
      total_gains: 0,
      total_losses: 0,
      net_gain_loss: 0,
      transaction_count: 0,
      taxable_events: 0,
      details: {
        buy_transactions: 0,
        sell_transactions: 0,
        trade_transactions: 0,
        income_transactions: 0,
        expense_transactions: 0,
      },
    };
  }

  // Simplified calculation (FIFO basis)
  let totalGains = 0;
  let totalLosses = 0;
  const holdings = new Map<string, Array<{ amount: number; price: number; date: string }>>();
  
  for (const tx of transactions) {
    const asset = tx.crypto_currency;
    const amount = tx.crypto_amount;
    const price = tx.fiat_amount;
    
    if (!holdings.has(asset)) {
      holdings.set(asset, []);
    }
    
    const assetHoldings = holdings.get(asset)!;
    
    if (tx.type === 'buy') {
      assetHoldings.push({ amount, price, date: tx.date });
    } else if (tx.type === 'sell') {
      let remainingToSell = amount;
      while (remainingToSell > 0 && assetHoldings.length > 0) {
        const holding = assetHoldings[0];
        const sellAmount = Math.min(remainingToSell, holding.amount);
        
        const costBasis = holding.price * sellAmount;
        const proceeds = price * sellAmount;
        const gainLoss = proceeds - costBasis;
        
        if (gainLoss > 0) {
          totalGains += gainLoss;
        } else {
          totalLosses += Math.abs(gainLoss);
        }
        
        holding.amount -= sellAmount;
        remainingToSell -= sellAmount;
        
        if (holding.amount <= 0) {
          assetHoldings.shift();
        }
      }
    }
  }

  const transactionCount = transactions.length;
  const details = {
    buy_transactions: transactions.filter(t => t.type === 'buy').length,
    sell_transactions: transactions.filter(t => t.type === 'sell').length,
    trade_transactions: transactions.filter(t => t.type === 'trade').length,
    income_transactions: transactions.filter(t => t.type === 'income').length,
    expense_transactions: transactions.filter(t => t.type === 'expense').length,
  };

  return {
    total_gains: totalGains,
    total_losses: totalLosses,
    net_gain_loss: totalGains - totalLosses,
    transaction_count: transactionCount,
    taxable_events: details.sell_transactions + details.trade_transactions,
    details,
  };
}

export async function getReports(): Promise<ActionResult<TaxReport[]>> {
  try {
    const supabase = createSupabaseServerClient();
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return { success: false, error: "Not authenticated" };
    }

    // Get user's reports
    const { data: reports, error } = await supabase
      .from("tax_reports")
      .select("*")
      .eq("user_id", user.id)
      .order("year", { ascending: false });

    if (error) return { success: false, error: error.message };
    
    // Convert date strings to Date objects
    const formattedReports = reports.map(r => ({
      ...r,
      created_at: new Date(r.created_at),
      completed_at: r.completed_at ? new Date(r.completed_at) : undefined,
    }));
    
    return { success: true, data: formattedReports };
  } catch (e: any) {
    return { success: false, error: e?.message ?? "Unknown error" };
  }
}

export async function updateReportStatus(id: string, status: ReportStatus): Promise<ActionResult<TaxReport>> {
  try {
    const supabase = createSupabaseServerClient();
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return { success: false, error: "Not authenticated" };
    }

    // Update report status (RLS ensures user can only update their own)
    const { data: report, error } = await supabase
      .from("tax_reports")
      .update({ status })
      .eq("id", id)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) return { success: false, error: error.message };
    
    return { success: true, data: report };
  } catch (e: any) {
    return { success: false, error: e?.message ?? "Unknown error" };
  }
}

export async function deleteReport(id: string): Promise<ActionResult> {
  try {
    const supabase = createSupabaseServerClient();
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return { success: false, error: "Not authenticated" };
    }

    // Delete report (RLS ensures user can only delete their own)
    const { error } = await supabase
      .from("tax_reports")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) return { success: false, error: error.message };
    
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e?.message ?? "Unknown error" };
  }
}

export async function downloadReport(id: string, format: 'pdf' | 'csv'): Promise<ActionResult<{ url: string }>> {
  try {
    const supabase = createSupabaseServerClient();
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return { success: false, error: "Not authenticated" };
    }

    // Get report
    const { data: report, error: reportError } = await supabase
      .from("tax_reports")
      .select("*")
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    if (reportError || !report) {
      return { success: false, error: "Report not found" };
    }

    // For now, return a placeholder URL
    // In a real implementation, you would generate the actual PDF/CSV
    const mockUrl = `/api/reports/${id}/download?format=${format}`;
    
    return { success: true, data: { url: mockUrl } };
  } catch (e: any) {
    return { success: false, error: e?.message ?? "Unknown error" };
  }
}
