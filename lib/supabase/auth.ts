// Authentication utilities and helpers
// These functions handle user session management and auth state

import { createClient } from './client'
import { createServerSupabaseClient } from './server'

// ============================================
// CLIENT-SIDE AUTH
// ============================================

export async function getCurrentUser() {
  try {
    const supabase = createClient()
    const { data, error } = await supabase.auth.getUser()

    if (error || !data?.user) {
      return null
    }

    return data.user
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

export async function getCurrentSession() {
  try {
    const supabase = createClient()
    const { data, error } = await supabase.auth.getSession()

    if (error || !data?.session) {
      return null
    }

    return data.session
  } catch (error) {
    console.error('Error getting session:', error)
    return null
  }
}

// ============================================
// SERVER-SIDE AUTH
// ============================================

export async function getServerUser() {
  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase.auth.getUser()

    if (error || !data?.user) {
      return null
    }

    return data.user
  } catch (error) {
    console.error('Error getting server user:', error)
    return null
  }
}

// ============================================
// PROFILE MANAGEMENT
// ============================================

export async function getUserProfile(userId: string) {
  try {
    const supabase = await createServerSupabaseClient()

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching profile:', error)
    return null
  }
}

export async function updateUserProfile(
  userId: string,
  updates: Record<string, unknown>
) {
  try {
    const supabase = await createServerSupabaseClient()

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error updating profile:', error)
    return { success: false, error }
  }
}

// ============================================
// AUTH CHECKS
// ============================================

export async function requireAuth() {
  const user = await getServerUser()
  if (!user) {
    throw new Error('Unauthorized: No user session found')
  }
  return user
}
