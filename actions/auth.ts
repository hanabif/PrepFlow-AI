'use server'

// Authentication Server Actions
// Handle sign up, login, logout, and profile management

import { createClient } from '@/lib/supabase/client'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { getServerUser } from '@/lib/supabase/auth'
import type { ApiResponse } from '@/types/database'

// ============================================
// SIGN UP ACTION
// ============================================

export async function signUpAction(input: {
  email: string
  password: string
  fullName: string
}): Promise<
  ApiResponse<{
    userId: string
    email: string
  }>
> {
  try {
    const supabase = createClient()

    // Sign up with email/password
    const { data, error } = await supabase.auth.signUp({
      email: input.email,
      password: input.password,
      options: {
        data: {
          full_name: input.fullName,
        },
      },
    })

    if (error) throw error
    if (!data.user) throw new Error('User creation failed')

    // Create profile record
    const serverSupabase = await createServerSupabaseClient()
    const { error: profileError } = await serverSupabase
      .from('profiles')
      .insert({
        id: data.user.id,
        email: input.email,
        full_name: input.fullName,
      })

    if (profileError) throw profileError

    // Create analytics record
    await serverSupabase.from('analytics').insert({
      user_id: data.user.id,
      total_interviews: 0,
      current_streak: 0,
    })

    return {
      data: {
        userId: data.user.id,
        email: data.user.email || '',
      },
      error: null,
      success: true,
    }
  } catch (error) {
    console.error('[Server Action Error] signUpAction:', error)
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Failed to sign up',
      success: false,
    }
  }
}

// ============================================
// LOGIN ACTION
// ============================================

export async function loginAction(input: {
  email: string
  password: string
}): Promise<
  ApiResponse<{
    userId: string
    email: string
  }>
> {
  try {
    const supabase = createClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email: input.email,
      password: input.password,
    })

    if (error) throw error
    if (!data.user) throw new Error('Login failed')

    return {
      data: {
        userId: data.user.id,
        email: data.user.email || '',
      },
      error: null,
      success: true,
    }
  } catch (error) {
    console.error('[Server Action Error] loginAction:', error)
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Failed to log in',
      success: false,
    }
  }
}

// ============================================
// LOGOUT ACTION
// ============================================

export async function logoutAction(): Promise<ApiResponse<null>> {
  try {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()

    if (error) throw error

    return {
      data: null,
      error: null,
      success: true,
    }
  } catch (error) {
    console.error('[Server Action Error] logoutAction:', error)
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Failed to log out',
      success: false,
    }
  }
}

// ============================================
// GET CURRENT USER ACTION
// ============================================

export async function getCurrentUserAction(): Promise<
  ApiResponse<{
    userId: string
    email: string
    fullName: string | null
  }>
> {
  try {
    const user = await getServerUser()

    if (!user) {
      return {
        data: null,
        error: 'Not authenticated',
        success: false,
      }
    }

    return {
      data: {
        userId: user.id,
        email: user.email || '',
        fullName: user.user_metadata?.full_name || null,
      },
      error: null,
      success: true,
    }
  } catch (error) {
    console.error('[Server Action Error] getCurrentUserAction:', error)
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Failed to get current user',
      success: false,
    }
  }
}

// ============================================
// RESET PASSWORD ACTION
// ============================================

export async function resetPasswordAction(email: string): Promise<
  ApiResponse<{
    message: string
  }>
> {
  try {
    const supabase = createClient()

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
    })

    if (error) throw error

    return {
      data: {
        message: 'Password reset email sent. Check your inbox.',
      },
      error: null,
      success: true,
    }
  } catch (error) {
    console.error('[Server Action Error] resetPasswordAction:', error)
    return {
      data: null,
      error:
        error instanceof Error ? error.message : 'Failed to reset password',
      success: false,
    }
  }
}

// ============================================
// UPDATE PROFILE ACTION
// ============================================

export async function updateProfileAction(input: {
  fullName?: string
  bio?: string
  avatarUrl?: string
  githubUrl?: string
  linkedinUrl?: string
  twitterUrl?: string
  websiteUrl?: string
}): Promise<
  ApiResponse<{
    message: string
  }>
> {
  try {
    const user = await getServerUser()
    if (!user) throw new Error('Not authenticated')

    const supabase = await createServerSupabaseClient()

    const { error } = await supabase
      .from('profiles')
      .update(input)
      .eq('id', user.id)

    if (error) throw error

    return {
      data: {
        message: 'Profile updated successfully',
      },
      error: null,
      success: true,
    }
  } catch (error) {
    console.error('[Server Action Error] updateProfileAction:', error)
    return {
      data: null,
      error:
        error instanceof Error ? error.message : 'Failed to update profile',
      success: false,
    }
  }
}
