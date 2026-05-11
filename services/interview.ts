// Interview Service
// Orchestrates the complete interview lifecycle:
// 1. Create interview
// 2. Generate questions
// 3. Process answers
// 4. Calculate scores
// 5. Generate report

import { createServerSupabaseClient } from '@/lib/supabase/server'
import {
  generateInterviewQuestions,
  evaluateInterviewAnswer,
  generateInterviewReport,
} from '@/lib/openai/service'
import type {
  Interview,
  InterviewQuestion,
  InterviewReport,
  InterviewInsert,
} from '@/types/database'

// ============================================
// CREATE INTERVIEW SESSION
// ============================================

export async function createInterviewSession(
  userId: string,
  input: {
    role: string
    interviewType: string
    difficulty: string
    duration: number
    experienceLevel: string
  }
): Promise<{ interview: Interview; questions: InterviewQuestion[] }> {
  const supabase = await createServerSupabaseClient()

  try {
    // 1. Create interview record
    const interviewData: InterviewInsert = {
      user_id: userId,
      role: input.role,
      interview_type: input.interviewType,
      difficulty: input.difficulty,
      duration: input.duration,
      status: 'started',
    }

    const { data: interview, error: interviewError } = await supabase
      .from('interviews')
      .insert([interviewData])
      .select()
      .single()

    if (interviewError) throw interviewError

    // 2. Generate questions using AI
    const questionResult = await generateInterviewQuestions({
      role: input.role,
      experienceLevel: input.experienceLevel,
      interviewType: input.interviewType,
      difficulty: input.difficulty,
    })

    // 3. Save questions to database
    const questionsToInsert = questionResult.questions.map((q) => ({
      interview_id: interview.id,
      question_number: q.question_number,
      question_text: q.question_text,
      answer_text: null,
      ai_feedback: null,
      score: null,
    }))

    const { data: questions, error: questionsError } = await supabase
      .from('interview_questions')
      .insert(questionsToInsert)
      .select()

    if (questionsError) throw questionsError

    return {
      interview,
      questions: questions || [],
    }
  } catch (error) {
    console.error('Error creating interview:', error)
    throw error
  }
}

// ============================================
// SUBMIT INTERVIEW ANSWER
// ============================================

export async function submitInterviewAnswer(
  questionId: string,
  answerText: string
): Promise<{ question: InterviewQuestion; score: number }> {
  const supabase = await createServerSupabaseClient()

  try {
    // 1. Get question details
    const { data: question, error: fetchError } = await supabase
      .from('interview_questions')
      .select('*')
      .eq('id', questionId)
      .single()

    if (fetchError) throw fetchError

    // 2. Evaluate answer using AI
    const evaluation = await evaluateInterviewAnswer({
      question: question.question_text,
      answer: answerText,
      interviewType: 'technical', // TODO: Get from interview context
    })

    // 3. Save answer and feedback
    const { data: updatedQuestion, error: updateError } = await supabase
      .from('interview_questions')
      .update({
        answer_text: answerText,
        ai_feedback: evaluation.feedback,
        score: evaluation.score,
        communication_score: evaluation.communication_score,
        technical_score: evaluation.technical_score,
      })
      .eq('id', questionId)
      .select()
      .single()

    if (updateError) throw updateError

    return {
      question: updatedQuestion,
      score: evaluation.score,
    }
  } catch (error) {
    console.error('Error submitting answer:', error)
    throw error
  }
}

// ============================================
// COMPLETE INTERVIEW
// ============================================

export async function completeInterview(
  interviewId: string
): Promise<{ interview: Interview; report: InterviewReport }> {
  const supabase = await createServerSupabaseClient()

  try {
    // 1. Fetch interview and all questions
    const { data: interview, error: interviewError } = await supabase
      .from('interviews')
      .select('*')
      .eq('id', interviewId)
      .single()

    if (interviewError) throw interviewError

    const { data: questions, error: questionsError } = await supabase
      .from('interview_questions')
      .select('*')
      .eq('interview_id', interviewId)

    if (questionsError) throw questionsError

    // 2. Calculate average scores
    const scores = questions
      .filter((q) => q.score !== null)
      .map((q) => q.score as number)

    const avgScore =
      scores.length > 0
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        : 0

    const communicationScores = questions
      .filter((q) => q.communication_score !== null)
      .map((q) => q.communication_score as number)
    const avgCommunication =
      communicationScores.length > 0
        ? Math.round(
            communicationScores.reduce((a, b) => a + b, 0) /
              communicationScores.length
          )
        : 0

    const technicalScores = questions
      .filter((q) => q.technical_score !== null)
      .map((q) => q.technical_score as number)
    const avgTechnical =
      technicalScores.length > 0
        ? Math.round(
            technicalScores.reduce((a, b) => a + b, 0) /
              technicalScores.length
          )
        : 0

    // 3. Generate report using AI
    const reportData = await generateInterviewReport({
      interview,
      questions: questions || [],
    })

    // 4. Update interview with scores
    const { data: updatedInterview, error: updateError } = await supabase
      .from('interviews')
      .update({
        status: 'completed',
        overall_score: avgScore,
        communication_score: avgCommunication,
        technical_score: avgTechnical,
        completed_at: new Date().toISOString(),
      })
      .eq('id', interviewId)
      .select()
      .single()

    if (updateError) throw updateError

    // 5. Save report
    const { data: report, error: reportError } = await supabase
      .from('interview_reports')
      .insert([
        {
          interview_id: interviewId,
          summary: reportData.summary,
          strengths: reportData.strengths,
          weaknesses: reportData.weaknesses,
          recommendations: reportData.recommendations,
        },
      ])
      .select()
      .single()

    if (reportError) throw reportError

    // 6. Update user analytics
    await updateUserAnalytics(interview.user_id)

    return {
      interview: updatedInterview,
      report,
    }
  } catch (error) {
    console.error('Error completing interview:', error)
    throw error
  }
}

// ============================================
// UPDATE USER ANALYTICS
// ============================================

async function updateUserAnalytics(userId: string): Promise<void> {
  const supabase = await createServerSupabaseClient()

  try {
    // Fetch all completed interviews for user
    const { data: interviews, error: fetchError } = await supabase
      .from('interviews')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'completed')

    if (fetchError) throw fetchError

    if (!interviews || interviews.length === 0) return

    // Calculate aggregate metrics
    const scores = interviews
      .filter((i) => i.overall_score !== null)
      .map((i) => i.overall_score as number)
    const avgScore =
      scores.length > 0
        ? parseFloat((scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2))
        : 0

    const communicationScores = interviews
      .filter((i) => i.communication_score !== null)
      .map((i) => i.communication_score as number)
    const avgCommunication =
      communicationScores.length > 0
        ? parseFloat(
            (
              communicationScores.reduce((a, b) => a + b, 0) /
              communicationScores.length
            ).toFixed(2)
          )
        : 0

    const technicalScores = interviews
      .filter((i) => i.technical_score !== null)
      .map((i) => i.technical_score as number)
    const avgTechnical =
      technicalScores.length > 0
        ? parseFloat(
            (
              technicalScores.reduce((a, b) => a + b, 0) /
              technicalScores.length
            ).toFixed(2)
          )
        : 0

    // Update or create analytics record
    const { error: analyticsError } = await supabase
      .from('analytics')
      .upsert(
        {
          user_id: userId,
          total_interviews: interviews.length,
          average_score: avgScore,
          communication_avg: avgCommunication,
          technical_avg: avgTechnical,
          last_interview_date: interviews[0]?.created_at,
        },
        { onConflict: 'user_id' }
      )

    if (analyticsError) throw analyticsError
  } catch (error) {
    console.error('Error updating analytics:', error)
    // Don't throw - analytics update failure shouldn't fail the main operation
  }
}

// ============================================
// FETCH INTERVIEW SESSION
// ============================================

export async function getInterviewSession(interviewId: string) {
  const supabase = await createServerSupabaseClient()

  try {
    const { data: interview, error: interviewError } = await supabase
      .from('interviews')
      .select('*')
      .eq('id', interviewId)
      .single()

    if (interviewError) throw interviewError

    const { data: questions, error: questionsError } = await supabase
      .from('interview_questions')
      .select('*')
      .eq('interview_id', interviewId)
      .order('question_number')

    if (questionsError) throw questionsError

    return {
      interview,
      questions: questions || [],
    }
  } catch (error) {
    console.error('Error fetching interview:', error)
    throw error
  }
}
