"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Transaction, TransactionFormData, TransactionFilters, TransactionType } from "@/types/transaction";

type ActionResult<T = unknown> = {
  success: boolean;
  error?: string;
  data?: T;
};

export async function createTransaction(data: TransactionFormData): Promise<ActionResult<Transaction>> {
  try {
    const supabase = createSupabaseServerClient();
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return { success: false, error: "Not authenticated" };
    }

    // Insert transaction
    const { data: transaction, error } = await supabase
      .from("transactions")
      .insert({
        user_id: user.id,
        type: data.type,
        crypto_amount: data.crypto_amount,
        crypto_currency: data.crypto_currency,
        fiat_amount: data.fiat_amount,
        fiat_currency: data.fiat_currency,
        date: data.date.toISOString(),
        exchange: data.exchange,
        notes: data.notes,
      })
      .select()
      .single();

    if (error) return { success: false, error: error.message };
    
    return { success: true, data: transaction };
  } catch (e: any) {
    return { success: false, error: e?.message ?? "Unknown error" };
  }
}

export async function updateTransaction(id: string, data: Partial<TransactionFormData>): Promise<ActionResult<Transaction>> {
  try {
    const supabase = createSupabaseServerClient();
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return { success: false, error: "Not authenticated" };
    }

    // Prepare update data
    const updateData: any = {};
    if (data.type) updateData.type = data.type;
    if (data.crypto_amount !== undefined) updateData.crypto_amount = data.crypto_amount;
    if (data.crypto_currency) updateData.crypto_currency = data.crypto_currency;
    if (data.fiat_amount !== undefined) updateData.fiat_amount = data.fiat_amount;
    if (data.fiat_currency) updateData.fiat_currency = data.fiat_currency;
    if (data.date) updateData.date = data.date.toISOString();
    if (data.exchange) updateData.exchange = data.exchange;
    if (data.notes !== undefined) updateData.notes = data.notes;

    // Update transaction (RLS ensures user can only update their own)
    const { data: transaction, error } = await supabase
      .from("transactions")
      .update(updateData)
      .eq("id", id)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) return { success: false, error: error.message };
    
    return { success: true, data: transaction };
  } catch (e: any) {
    return { success: false, error: e?.message ?? "Unknown error" };
  }
}

export async function deleteTransaction(id: string): Promise<ActionResult> {
  try {
    const supabase = createSupabaseServerClient();
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return { success: false, error: "Not authenticated" };
    }

    // Delete transaction (RLS ensures user can only delete their own)
    const { error } = await supabase
      .from("transactions")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) return { success: false, error: error.message };
    
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e?.message ?? "Unknown error" };
  }
}

export async function getTransactions(filters?: TransactionFilters): Promise<ActionResult<Transaction[]>> {
  try {
    const supabase = createSupabaseServerClient();
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return { success: false, error: "Not authenticated" };
    }

    // Build query
    let query = supabase
      .from("transactions")
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: false });

    // Apply filters
    if (filters?.dateFrom) {
      query = query.gte("date", filters.dateFrom.toISOString());
    }
    if (filters?.dateTo) {
      query = query.lte("date", filters.dateTo.toISOString());
    }
    if (filters?.type) {
      query = query.eq("type", filters.type);
    }
    if (filters?.crypto_currency) {
      query = query.eq("crypto_currency", filters.crypto_currency);
    }

    const { data: transactions, error } = await query;

    if (error) return { success: false, error: error.message };
    
    // Convert date strings to Date objects
    const formattedTransactions = transactions.map(t => ({
      ...t,
      date: new Date(t.date),
      created_at: new Date(t.created_at),
    }));
    
    return { success: true, data: formattedTransactions };
  } catch (e: any) {
    return { success: false, error: e?.message ?? "Unknown error" };
  }
}
