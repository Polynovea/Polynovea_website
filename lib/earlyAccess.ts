import { createClient } from "@supabase/supabase-js";

export const EARLY_ACCESS_TABLE = "early_access_waitlist";
export const EARLY_ACCESS_PRODUCT = "infrakinetic";
export const ACTIVE_WAITLIST_STATUSES = [
  "waitlisted",
  "reviewing",
  "qualified",
  "invited",
  "onboarding",
  "active",
] as const;

export function isEarlyAccessConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function getEarlyAccessSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("Early Access datastore is not configured");
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export async function getPublicEarlyAccessCount(): Promise<number | null> {
  if (!isEarlyAccessConfigured()) return null;

  try {
    const supabase = getEarlyAccessSupabase();
    const { data, error } = await supabase
      .from("early_access_public_counts")
      .select("count")
      .eq("product", EARLY_ACCESS_PRODUCT)
      .maybeSingle();

    if (error) {
      console.error("Early Access count query failed:", error.message);
      return null;
    }

    return Number(data?.count ?? 0);
  } catch (error) {
    console.error("Early Access count query failed unexpectedly:", error);
    return null;
  }
}

export function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export function normalizeCompany(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}
