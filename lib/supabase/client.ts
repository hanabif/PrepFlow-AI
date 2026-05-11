// Browser-side Supabase client
// Use this for browser-side operations with anon key
// Does NOT have access to service role key

import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/supabase'

let supabaseClient: ReturnType<typeof createBrowserClient<Database>> | null = null

export function createClient() {
  // NEXT_PUBLIC_ vars are inlined at build time, so we use them directly
  // They will be undefined only if not set in the environment
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  // Reuse client on the browser for consistency
  if (!supabaseClient && typeof window !== 'undefined') {
    supabaseClient = createBrowserClient<Database>(url, key)
  }

  return supabaseClient || createBrowserClient<Database>(url, key)
}

