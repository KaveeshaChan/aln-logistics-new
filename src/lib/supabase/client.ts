import { createClient } from "@supabase/supabase-js";

/**
 * This is a static export with no server, so the browser talks to Supabase
 * directly using the public anon key — access control is enforced by the
 * Row Level Security policies in database/schema.sql, not by hiding this key.
 * NEXT_PUBLIC_* vars are inlined into the JS bundle at `next build` time, so
 * they must be present in `.env.local` (or the CI environment) before
 * building — see .env.local.example.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Copy .env.local.example to .env.local and fill in your Supabase project's values."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
