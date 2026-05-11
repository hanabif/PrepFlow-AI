// Auto-generated Supabase types
// Update by running: npx supabase gen types typescript --project-id <project-id> > types/supabase.ts
// This ensures your TypeScript types match your actual database schema

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          email: string
          avatar_url: string | null
          bio: string | null
          github_url: string | null
          linkedin_url: string | null
          twitter_url: string | null
          website_url: string | null
          preferred_roles: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          full_name?: string | null
          email: string
          avatar_url?: string | null
          bio?: string | null
          github_url?: string | null
          linkedin_url?: string | null
          twitter_url?: string | null
          website_url?: string | null
          preferred_roles?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          email?: string
          avatar_url?: string | null
          bio?: string | null
          github_url?: string | null
          linkedin_url?: string | null
          twitter_url?: string | null
          website_url?: string | null
          preferred_roles?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      interviews: {
        Row: {
          id: string
          user_id: string
          role: string
          interview_type: string
          difficulty: string
          duration: number
          status: string
          overall_score: number | null
          communication_score: number | null
          technical_score: number | null
          confidence_score: number | null
          problem_solving_score: number | null
          created_at: string
          completed_at: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          role: string
          interview_type: string
          difficulty: string
          duration: number
          status?: string
          overall_score?: number | null
          communication_score?: number | null
          technical_score?: number | null
          confidence_score?: number | null
          problem_solving_score?: number | null
          created_at?: string
          completed_at?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          role?: string
          interview_type?: string
          difficulty?: string
          duration?: number
          status?: string
          overall_score?: number | null
          communication_score?: number | null
          technical_score?: number | null
          confidence_score?: number | null
          problem_solving_score?: number | null
          created_at?: string
          completed_at?: string | null
          updated_at?: string
        }
      }
      interview_questions: {
        Row: {
          id: string
          interview_id: string
          question_number: number
          question_text: string
          answer_text: string | null
          ai_feedback: string | null
          score: number | null
          communication_score: number | null
          technical_score: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          interview_id: string
          question_number: number
          question_text: string
          answer_text?: string | null
          ai_feedback?: string | null
          score?: number | null
          communication_score?: number | null
          technical_score?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          interview_id?: string
          question_number?: number
          question_text?: string
          answer_text?: string | null
          ai_feedback?: string | null
          score?: number | null
          communication_score?: number | null
          technical_score?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      interview_reports: {
        Row: {
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
        Insert: {
          id?: string
          interview_id: string
          summary: string
          strengths: string[]
          weaknesses: string[]
          recommendations: string[]
          learning_resources?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          interview_id?: string
          summary?: string
          strengths?: string[]
          weaknesses?: string[]
          recommendations?: string[]
          learning_resources?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      analytics: {
        Row: {
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
        Insert: {
          id?: string
          user_id: string
          total_interviews?: number
          average_score?: number | null
          communication_avg?: number | null
          technical_avg?: number | null
          confidence_avg?: number | null
          problem_solving_avg?: number | null
          current_streak?: number
          last_interview_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          total_interviews?: number
          average_score?: number | null
          communication_avg?: number | null
          technical_avg?: number | null
          confidence_avg?: number | null
          problem_solving_avg?: number | null
          current_streak?: number
          last_interview_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}
