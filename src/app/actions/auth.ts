"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

type ActionResult<T = unknown> = {
  success: boolean;
  error?: string;
  data?: T;
};

export async function signUp(email: string, password: string): Promise<ActionResult> {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return { success: false, error: error.message };

    // Create profile row (best-effort; RLS ensures user-only access)
    const userId = data.user?.id;
    if (userId) {
      await supabase.from("profiles").insert({ id: userId, full_name: "" });
    }

    return { success: true, data };
  } catch (e: any) {
    return { success: false, error: e?.message ?? "Unknown error" };
  }
}

export async function signIn(email: string, password: string): Promise<ActionResult> {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { success: false, error: error.message };
    return { success: true, data };
  } catch (e: any) {
    return { success: false, error: e?.message ?? "Unknown error" };
  }
}

export async function signOut(): Promise<ActionResult> {
  try {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.auth.signOut();
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e?.message ?? "Unknown error" };
  }
}

export async function getUser(): Promise<ActionResult> {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) return { success: false, error: error.message };
    return { success: true, data: data.user };
  } catch (e: any) {
    return { success: false, error: e?.message ?? "Unknown error" };
  }
}


