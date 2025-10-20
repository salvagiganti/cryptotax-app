"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  UserProfile,
  TaxSettings,
  TaxSettingsSchema,
  APIConnection,
  WalletConnection,
  ExchangeType,
  Blockchain,
  HardwareWallet
} from "@/types/settings";

type ActionResult<T = unknown> = {
  success: boolean;
  error?: string;
  data?: T;
};

export async function updateProfile(userId: string, data: { full_name: string }): Promise<ActionResult<UserProfile>> {
  try {
    const supabase = createSupabaseServerClient();
    
    const { data: profile, error } = await supabase
      .from("profiles")
      .update({ full_name: data.full_name })
      .eq("id", userId)
      .select()
      .single();

    if (error) return { success: false, error: error.message };
    
    return { success: true, data: profile };
  } catch (e: any) {
    return { success: false, error: e?.message ?? "Unknown error" };
  }
}

export async function updateTaxSettings(userId: string, data: TaxSettings): Promise<ActionResult<TaxSettings>> {
  try {
    const parsed = TaxSettingsSchema.safeParse(data);
    if (!parsed.success) {
      const { formErrors, fieldErrors } = parsed.error.flatten();
      const fieldErrorMessages = Object.values(fieldErrors)
        .flat()
        .filter(Boolean) as string[];
      const message = [...formErrors, ...fieldErrorMessages].join(", ");
      return {
        success: false,
        error: message || "Invalid tax settings",
      };
    }

    const supabase = createSupabaseServerClient();

    const { data: profile, error } = await supabase
      .from("profiles")
      .update({
        tax_settings: parsed.data,
      })
      .eq("id", userId)
      .select("tax_settings")
      .single();

    if (error) return { success: false, error: error.message };

    return {
      success: true,
      data: (profile?.tax_settings as TaxSettings) ?? parsed.data,
    };
  } catch (e: any) {
    return { success: false, error: e?.message ?? "Unknown error" };
  }
}

export async function connectExchange(
  userId: string, 
  exchange: ExchangeType, 
  credentials: { api_key: string; api_secret: string }
): Promise<ActionResult<APIConnection>> {
  try {
    const supabase = createSupabaseServerClient();
    
    // TODO: Implement real exchange API integration
    // - Create api_connections table in Supabase
    // - Store encrypted API credentials
    // - Implement real API calls to exchanges
    // - Add proper error handling for API failures
    // - Implement rate limiting for API calls
    const mockConnection: APIConnection = {
      id: "mock-id",
      exchange,
      api_key: credentials.api_key,
      api_secret: credentials.api_secret,
      is_connected: true,
      connected_at: new Date(),
      last_sync: new Date(),
    };
    
    return { success: true, data: mockConnection };
  } catch (e: any) {
    return { success: false, error: e?.message ?? "Unknown error" };
  }
}

export async function disconnectExchange(userId: string, exchangeId: string): Promise<ActionResult> {
  try {
    const supabase = createSupabaseServerClient();
    
    // In a real implementation, you would delete from api_connections table
    // For now, we'll mock the response
    
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e?.message ?? "Unknown error" };
  }
}

export async function addWallet(
  userId: string, 
  address: string, 
  blockchain: Blockchain, 
  label?: string
): Promise<ActionResult<WalletConnection>> {
  try {
    const supabase = createSupabaseServerClient();
    
    // In a real implementation, you would store these in a wallet_connections table
    const mockWallet: WalletConnection = {
      id: "mock-wallet-id",
      user_id: userId,
      address,
      blockchain,
      label,
      wallet_type: "software" as any,
      is_connected: true,
      connected_at: new Date(),
      auto_sync: true,
    };
    
    return { success: true, data: mockWallet };
  } catch (e: any) {
    return { success: false, error: e?.message ?? "Unknown error" };
  }
}

export async function removeWallet(userId: string, walletId: string): Promise<ActionResult> {
  try {
    const supabase = createSupabaseServerClient();
    
    // In a real implementation, you would delete from wallet_connections table
    
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e?.message ?? "Unknown error" };
  }
}

export async function syncWalletTransactions(userId: string, walletId: string): Promise<ActionResult> {
  try {
    const supabase = createSupabaseServerClient();
    
    // In a real implementation, you would:
    // 1. Get wallet connection details
    // 2. Fetch transactions from blockchain APIs
    // 3. Parse and store transactions
    // 4. Update last_sync timestamp
    
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e?.message ?? "Unknown error" };
  }
}

export async function connectHardwareWallet(
  userId: string, 
  wallet: HardwareWallet
): Promise<ActionResult> {
  try {
    const supabase = createSupabaseServerClient();
    
    // In a real implementation, you would:
    // 1. Connect to hardware wallet via USB/WebUSB
    // 2. Verify wallet connection
    // 3. Store connection status
    
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e?.message ?? "Unknown error" };
  }
}

export async function disconnectHardwareWallet(
  userId: string, 
  wallet: HardwareWallet
): Promise<ActionResult> {
  try {
    const supabase = createSupabaseServerClient();
    
    // In a real implementation, you would:
    // 1. Disconnect hardware wallet
    // 2. Update connection status
    
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e?.message ?? "Unknown error" };
  }
}

export async function exportData(userId: string): Promise<ActionResult<{ url: string }>> {
  try {
    const supabase = createSupabaseServerClient();
    
    // Get all user data
    const [transactionsResult, reportsResult, profileResult] = await Promise.all([
      supabase.from("transactions").select("*").eq("user_id", userId),
      supabase.from("tax_reports").select("*").eq("user_id", userId),
      supabase.from("profiles").select("*").eq("id", userId).single(),
    ]);

    const exportData = {
      profile: profileResult.data,
      transactions: transactionsResult.data || [],
      reports: reportsResult.data || [],
      exported_at: new Date().toISOString(),
    };

    // In a real implementation, you would:
    // 1. Generate a secure download URL
    // 2. Store the export file temporarily
    // 3. Return the download URL
    
    const mockUrl = `/api/export/${userId}/download`;
    
    return { success: true, data: { url: mockUrl } };
  } catch (e: any) {
    return { success: false, error: e?.message ?? "Unknown error" };
  }
}

export async function importTransactions(userId: string, file: File): Promise<ActionResult> {
  try {
    const supabase = createSupabaseServerClient();
    
    // In a real implementation, you would:
    // 1. Parse the uploaded file (CSV/JSON)
    // 2. Validate transaction data
    // 3. Insert transactions into database
    // 4. Handle duplicates and errors
    
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e?.message ?? "Unknown error" };
  }
}

export async function deleteAllData(userId: string): Promise<ActionResult> {
  try {
    const supabase = createSupabaseServerClient();
    
    // Delete all user data
    const [transactionsResult, reportsResult] = await Promise.all([
      supabase.from("transactions").delete().eq("user_id", userId),
      supabase.from("tax_reports").delete().eq("user_id", userId),
    ]);

    if (transactionsResult.error) return { success: false, error: transactionsResult.error.message };
    if (reportsResult.error) return { success: false, error: reportsResult.error.message };
    
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e?.message ?? "Unknown error" };
  }
}
