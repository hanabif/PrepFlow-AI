// Analytics Service
// Handles aggregation and calculation of user performance metrics
// Used for dashboard charts, trends, and insights

import { createServerSupabaseClient } from '@/lib/supabase/server'
import type { Analytics, Interview } from '@/types/database'

// ============================================
// GET USER ANALYTICS SUMMARY
// ============================================

export async function getUserAnalytics(userId: string): Promise<Analytics | null> {
  const supabase = await createServerSupabaseClient()

  try {
    const { data, error } = await supabase
      .from('analytics')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error) return null
    return data
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return null
  }
}

// ============================================
// GET SCORE HISTORY FOR CHARTS
// ============================================

export async function getScoreHistory(userId: string) {
  const supabase = await createServerSupabaseClient()

  try {
    const { data: interviews, error } = await supabase
      .from('interviews')
      .select('overall_score, created_at')
      .eq('user_id', userId)
      .eq('status', 'completed')
      .order('created_at', { ascending: true })

    if (error) throw error

    // Format for Recharts line chart
    return (interviews || []).map((i) => ({
      date: new Date(i.created_at).toLocaleDateString(),
      score: i.overall_score || 0,
    }))
  } catch (error) {
    console.error('Error fetching score history:', error)
    return []
  }
}

// ============================================
// GET SKILL BREAKDOWN
// ============================================

export async function getSkillBreakdown(userId: string) {
  const supabase = await createServerSupabaseClient()

  try {
    const { data: interviews, error } = await supabase
      .from('interviews')
      .select(
        'communication_score, technical_score, confidence_score, problem_solving_score'
      )
      .eq('user_id', userId)
      .eq('status', 'completed')

    if (error) throw error

    if (!interviews || interviews.length === 0) {
      return {
        communication: 0,
        technical: 0,
        confidence: 0,
        problemSolving: 0,
      }
    }

    const avgCommunication =
      interviews.reduce((sum, i) => sum + (i.communication_score || 0), 0) /
      interviews.length
    const avgTechnical =
      interviews.reduce((sum, i) => sum + (i.technical_score || 0), 0) /
      interviews.length
    const avgConfidence =
      interviews.reduce((sum, i) => sum + (i.confidence_score || 0), 0) /
      interviews.length
    const avgProblemSolving =
      interviews.reduce((sum, i) => sum + (i.problem_solving_score || 0), 0) /
      interviews.length

    return {
      communication: Math.round(avgCommunication),
      technical: Math.round(avgTechnical),
      confidence: Math.round(avgConfidence),
      problemSolving: Math.round(avgProblemSolving),
    }
  } catch (error) {
    console.error('Error fetching skill breakdown:', error)
    return {
      communication: 0,
      technical: 0,
      confidence: 0,
      problemSolving: 0,
    }
  }
}

// ============================================
// GET INTERVIEW TYPE BREAKDOWN
// ============================================

export async function getInterviewTypeBreakdown(userId: string) {
  const supabase = await createServerSupabaseClient()

  try {
    const { data: interviews, error } = await supabase
      .from('interviews')
      .select('interview_type, overall_score')
      .eq('user_id', userId)
      .eq('status', 'completed')

    if (error) throw error

    if (!interviews) return {}

    const breakdown: Record<string, number> = {}
    interviews.forEach((i) => {
      if (!breakdown[i.interview_type]) {
        breakdown[i.interview_type] = []
      }
      breakdown[i.interview_type].push(i.overall_score || 0)
    })

    const result: Record<string, number> = {}
    Object.entries(breakdown).forEach(([type, scores]) => {
      result[type] = Math.round(
        (scores as number[]).reduce((a, b) => a + b, 0) / scores.length
      )
    })

    return result
  } catch (error) {
    console.error('Error fetching interview type breakdown:', error)
    return {}
  }
}

// ============================================
// GET PERFORMANCE TREND
// ============================================

export async function getPerformanceTrend(
  userId: string,
  days: number = 30
) {
  const supabase = await createServerSupabaseClient()

  try {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)

    const { data: interviews, error } = await supabase
      .from('interviews')
      .select('overall_score, created_at, interview_type')
      .eq('user_id', userId)
      .eq('status', 'completed')
      .gte('created_at', cutoffDate.toISOString())
      .order('created_at', { ascending: true })

    if (error) throw error

    return {
      interviews: interviews || [],
      trend:
        interviews && interviews.length > 1
          ? interviews[interviews.length - 1].overall_score! -
            interviews[0].overall_score!
          : 0,
      count: interviews?.length || 0,
    }
  } catch (error) {
    console.error('Error fetching performance trend:', error)
    return { interviews: [], trend: 0, count: 0 }
  }
}

// ============================================
// GET WEAK TOPICS
// ============================================

export async function getWeakTopics(userId: string) {
  const supabase = await createServerSupabaseClient()

  try {
    const { data: questions, error } = await supabase
      .from('interview_questions')
      .select(
        `
        question_text,
        score,
        interview_id,
        interviews(role)
      `
      )
      .eq('interviews.user_id', userId)
      .lt('score', 60) // Scores below 60
      .order('score', { ascending: true })
      .limit(5)

    if (error) throw error

    return (questions || []).map((q) => ({
      question: q.question_text.substring(0, 50) + '...',
      score: q.score,
      role: (q.interviews as any)?.role,
    }))
  } catch (error) {
    console.error('Error fetching weak topics:', error)
    return []
  }
}

// ============================================
// GET INTERVIEW STREAK
// ============================================

export async function getInterviewStreak(userId: string): Promise<number> {
  const supabase = await createServerSupabaseClient()

  try {
    const { data: interviews, error } = await supabase
      .from('interviews')
      .select('created_at')
      .eq('user_id', userId)
      .eq('status', 'completed')
      .order('created_at', { ascending: false })

    if (error) throw error
    if (!interviews || interviews.length === 0) return 0

    // Calculate streak based on consecutive days with interviews
    let streak = 1
    let currentDate = new Date(interviews[0].created_at)

    for (let i = 1; i < interviews.length; i++) {
      const nextDate = new Date(interviews[i].created_at)
      const daysDiff = Math.floor(
        (currentDate.getTime() - nextDate.getTime()) / (1000 * 60 * 60 * 24)
      )

      if (daysDiff === 1) {
        streak++
        currentDate = nextDate
      } else {
        break
      }
    }

    return streak
  } catch (error) {
    console.error('Error calculating streak:', error)
    return 0
  }
}

// ============================================
// GET COMPLETION HEATMAP DATA
// ============================================

export async function getCompletionHeatmap(userId: string) {
  const supabase = await createServerSupabaseClient()

  try {
    const { data: interviews, error } = await supabase
      .from('interviews')
      .select('created_at')
      .eq('user_id', userId)
      .eq('status', 'completed')

    if (error) throw error

    // Count interviews per date
    const heatmapData: Record<string, number> = {}
    ;(interviews || []).forEach((i) => {
      const date = new Date(i.created_at).toISOString().split('T')[0]
      heatmapData[date] = (heatmapData[date] || 0) + 1
    })

    return Object.entries(heatmapData).map(([date, count]) => ({
      date,
      count,
    }))
  } catch (error) {
    console.error('Error fetching heatmap data:', error)
    return []
  }
}

// ============================================
// GET LEARNING RECOMMENDATIONS
// ============================================

export async function getLearningRecommendations(userId: string): Promise<string[]> {
  const supabase = await createServerSupabaseClient()

  try {
    const { data: reports, error } = await supabase
      .from('interview_reports')
      .select('recommendations')
      .eq(
        'interview_id',
        supabase
          .from('interviews')
          .select('id')
          .eq('user_id', userId)
      )
      .limit(5)

    if (error) throw error

    // Collect unique recommendations
    const uniqueRecommendations = new Set<string>()
    ;(reports || []).forEach((r) => {
      if (r.recommendations) {
        r.recommendations.forEach((rec: string) => {
          uniqueRecommendations.add(rec)
        })
      }
    })

    return Array.from(uniqueRecommendations).slice(0, 5)
  } catch (error) {
    console.error('Error fetching recommendations:', error)
    return []
  }
}
