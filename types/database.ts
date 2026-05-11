// Production-ready TypeScript types for PrepFlow database schema
// These correspond to Supabase PostgreSQL tables

// ============================================
// USER PROFILES
// ============================================
export interface Profile {
  id: string // UUID from auth.users
  full_name: string | null
  email: string
  avatar_url: string | null
  bio: string | null
  github_url: string | null
  linkedin_url: string | null
  twitter_url: string | null
  website_url: string | null
  preferred_roles: string[] // JSON array
  created_at: string
  updated_at: string
}

export type ProfileInsert = Omit<Profile, 'id' | 'created_at' | 'updated_at'>
export type ProfileUpdate = Partial<ProfileInsert>

// ============================================
// INTERVIEWS
// ============================================
export interface Interview {
  id: string
  user_id: string
  role: string // 'frontend', 'backend', 'fullstack', etc.
  interview_type: string // 'technical', 'behavioral', 'system_design'
  difficulty: string // 'beginner', 'intermediate', 'advanced'
  duration: number // minutes
  status: 'started' | 'in_progress' | 'completed' | 'failed'
  overall_score: number | null // 0-100
  communication_score: number | null
  technical_score: number | null
  confidence_score: number | null
  problem_solving_score: number | null
  created_at: string
  completed_at: string | null
  updated_at: string
}

export type InterviewInsert = Omit<
  Interview,
  'id' | 'created_at' | 'completed_at' | 'updated_at'
>
export type InterviewUpdate = Partial<
  Omit<Interview, 'id' | 'user_id' | 'created_at'>
>

// ============================================
// INTERVIEW QUESTIONS
// ============================================
export interface InterviewQuestion {
  id: string
  interview_id: string
  question_number: number
  question_text: string
  answer_text: string | null
  ai_feedback: string | null
  score: number | null // 0-100
  communication_score: number | null
  technical_score: number | null
  created_at: string
  updated_at: string
}

export type InterviewQuestionInsert = Omit<
  InterviewQuestion,
  'id' | 'created_at' | 'updated_at'
>
export type InterviewQuestionUpdate = Partial<
  Omit<InterviewQuestion, 'id' | 'interview_id' | 'question_number'>
>

// ============================================
// INTERVIEW REPORTS
// ============================================
export interface InterviewReport {
  id: string
  interview_id: string
  summary: string
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
  learning_resources: string[] | null
  created_at: string
  updated_at: string
}

export type InterviewReportInsert = Omit<
  InterviewReport,
  'id' | 'created_at' | 'updated_at'
>

// ============================================
// ANALYTICS
// ============================================
export interface Analytics {
  id: string
  user_id: string
  total_interviews: number
  average_score: number | null
  communication_avg: number | null
  technical_avg: number | null
  confidence_avg: number | null
  problem_solving_avg: number | null
  current_streak: number
  last_interview_date: string | null
  created_at: string
  updated_at: string
}

export type AnalyticsInsert = Omit<Analytics, 'id' | 'created_at' | 'updated_at'>
export type AnalyticsUpdate = Partial<
  Omit<Analytics, 'id' | 'user_id' | 'created_at'>
>

// ============================================
// API RESPONSES
// ============================================
export interface ApiResponse<T> {
  data: T | null
  error: string | null
  success: boolean
}

export interface ApiErrorResponse {
  error: string
  code: string
  details?: unknown
}
