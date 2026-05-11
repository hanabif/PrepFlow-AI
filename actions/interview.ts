'use server'

// Server Actions for Interview Flow
// These are executed on the server and handle all business logic
// They validate authentication and perform database operations

import { requireAuth } from '@/lib/supabase/auth'
import {
  createInterviewSession,
  submitInterviewAnswer,
  completeInterview,
  getInterviewSession,
} from '@/services/interview'
import { getUserAnalytics, getScoreHistory } from '@/services/analytics'
import type { ApiResponse } from '@/types/database'

// ============================================
// START INTERVIEW ACTION
// ============================================

export async function startInterviewAction(input: {
  role: string
  interviewType: string
  difficulty: string
  duration: number
  experienceLevel: string
}): Promise<
  ApiResponse<{
    interviewId: string
    questions: Array<{
      id: string
      questionNumber: number
      questionText: string
    }>
  }>
> {
  try {
    // Validate user is authenticated
    const user = await requireAuth()

    // Start interview session
    const { interview, questions } = await createInterviewSession(
      user.id,
      input
    )

    return {
      data: {
        interviewId: interview.id,
        questions: questions.map((q) => ({
          id: q.id,
          questionNumber: q.question_number,
          questionText: q.question_text,
        })),
      },
      error: null,
      success: true,
    }
  } catch (error) {
    console.error('[Server Action Error] startInterviewAction:', error)
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Failed to start interview',
      success: false,
    }
  }
}

// ============================================
// SUBMIT ANSWER ACTION
// ============================================

export async function submitAnswerAction(
  questionId: string,
  answerText: string
): Promise<
  ApiResponse<{
    score: number
    feedback: string
  }>
> {
  try {
    // Validate user is authenticated
    await requireAuth()

    // Submit answer
    const { question } = await submitInterviewAnswer(questionId, answerText)

    return {
      data: {
        score: question.score || 0,
        feedback: question.ai_feedback || '',
      },
      error: null,
      success: true,
    }
  } catch (error) {
    console.error('[Server Action Error] submitAnswerAction:', error)
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Failed to submit answer',
      success: false,
    }
  }
}

// ============================================
// COMPLETE INTERVIEW ACTION
// ============================================

export async function completeInterviewAction(
  interviewId: string
): Promise<
  ApiResponse<{
    overallScore: number
    summary: string
    strengths: string[]
    weaknesses: string[]
    recommendations: string[]
  }>
> {
  try {
    // Validate user is authenticated
    await requireAuth()

    // Complete interview
    const { interview, report } = await completeInterview(interviewId)

    return {
      data: {
        overallScore: interview.overall_score || 0,
        summary: report.summary,
        strengths: report.strengths,
        weaknesses: report.weaknesses,
        recommendations: report.recommendations,
      },
      error: null,
      success: true,
    }
  } catch (error) {
    console.error('[Server Action Error] completeInterviewAction:', error)
    return {
      data: null,
      error:
        error instanceof Error ? error.message : 'Failed to complete interview',
      success: false,
    }
  }
}

// ============================================
// FETCH INTERVIEW DETAILS ACTION
// ============================================

export async function fetchInterviewAction(
  interviewId: string
): Promise<
  ApiResponse<{
    interview: {
      id: string
      role: string
      interviewType: string
      difficulty: string
      status: string
      overallScore: number | null
    }
    questions: Array<{
      id: string
      questionNumber: number
      questionText: string
      answerText: string | null
      feedback: string | null
      score: number | null
    }>
  }>
> {
  try {
    // Validate user is authenticated
    await requireAuth()

    // Fetch interview session
    const { interview, questions } = await getInterviewSession(interviewId)

    return {
      data: {
        interview: {
          id: interview.id,
          role: interview.role,
          interviewType: interview.interview_type,
          difficulty: interview.difficulty,
          status: interview.status,
          overallScore: interview.overall_score,
        },
        questions: questions.map((q) => ({
          id: q.id,
          questionNumber: q.question_number,
          questionText: q.question_text,
          answerText: q.answer_text,
          feedback: q.ai_feedback,
          score: q.score,
        })),
      },
      error: null,
      success: true,
    }
  } catch (error) {
    console.error('[Server Action Error] fetchInterviewAction:', error)
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Failed to fetch interview',
      success: false,
    }
  }
}

// ============================================
// FETCH ANALYTICS ACTION
// ============================================

export async function fetchAnalyticsAction(): Promise<
  ApiResponse<{
    totalInterviews: number
    averageScore: number | null
    currentStreak: number
    scoreHistory: Array<{ date: string; score: number }>
  }>
> {
  try {
    // Validate user is authenticated
    const user = await requireAuth()

    // Fetch analytics
    const analytics = await getUserAnalytics(user.id)
    const scoreHistory = await getScoreHistory(user.id)

    return {
      data: {
        totalInterviews: analytics?.total_interviews || 0,
        averageScore: analytics?.average_score || null,
        currentStreak: analytics?.current_streak || 0,
        scoreHistory,
      },
      error: null,
      success: true,
    }
  } catch (error) {
    console.error('[Server Action Error] fetchAnalyticsAction:', error)
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Failed to fetch analytics',
      success: false,
    }
  }
}
