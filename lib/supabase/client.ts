// Browser-side Supabase client
// Use this for browser-side operations with anon key
// Does NOT have access to service role key

import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/supabase'

let supabaseClient: ReturnType<typeof createBrowserClient<Database>> | null = null

export function createClient() {
  // If running in build time or env vars not available, return a safe client
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    // Return a minimal client for build time - won't be used in browser anyway
    return createBrowserClient<Database>(
      'https://placeholder.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc5MjI2MDB9.placeholder'
    )
  }

  // Reuse client on the browser
  if (!supabaseClient && typeof window !== 'undefined') {
    supabaseClient = createBrowserClient<Database>(url, key)
  }

  return supabaseClient || createBrowserClient<Database>(url, key)
}

