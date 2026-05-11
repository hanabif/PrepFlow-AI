y engineers -- PrepFlow Database Schema Migration
-- Production-ready PostgreSQL schema for Supabase
-- Run this in Supabase SQL editor: https://app.supabase.com/sql
-- 
-- This schema includes:
-- - User profiles
-- - Interview sessions
-- - Interview questions and answers
-- - Performance analytics
-- - Row-level security policies

-- ============================================
-- PROFILES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  website_url TEXT,
  preferred_roles TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ============================================
-- INTERVIEWS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS interviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  interview_type TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  duration INTEGER NOT NULL,
  status TEXT DEFAULT 'started' CHECK (status IN ('started', 'in_progress', 'completed', 'failed')),
  overall_score SMALLINT CHECK (overall_score IS NULL OR (overall_score >= 0 AND overall_score <= 100)),
  communication_score SMALLINT CHECK (communication_score IS NULL OR (communication_score >= 0 AND communication_score <= 100)),
  technical_score SMALLINT CHECK (technical_score IS NULL OR (technical_score >= 0 AND technical_score <= 100)),
  confidence_score SMALLINT CHECK (confidence_score IS NULL OR (confidence_score >= 0 AND confidence_score <= 100)),
  problem_solving_score SMALLINT CHECK (problem_solving_score IS NULL OR (problem_solving_score >= 0 AND problem_solving_score <= 100)),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ============================================
-- INTERVIEW QUESTIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS interview_questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  interview_id UUID NOT NULL REFERENCES interviews(id) ON DELETE CASCADE,
  question_number INTEGER NOT NULL,
  question_text TEXT NOT NULL,
  answer_text TEXT,
  ai_feedback TEXT,
  score SMALLINT CHECK (score IS NULL OR (score >= 0 AND score <= 100)),
  communication_score SMALLINT,
  technical_score SMALLINT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(interview_id, question_number)
);

-- ============================================
-- INTERVIEW REPORTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS interview_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  interview_id UUID NOT NULL UNIQUE REFERENCES interviews(id) ON DELETE CASCADE,
  summary TEXT NOT NULL,
  strengths TEXT[],
  weaknesses TEXT[],
  recommendations TEXT[],
  learning_resources TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ============================================
-- ANALYTICS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  total_interviews INTEGER DEFAULT 0,
  average_score DECIMAL(5, 2),
  communication_avg DECIMAL(5, 2),
  technical_avg DECIMAL(5, 2),
  confidence_avg DECIMAL(5, 2),
  problem_solving_avg DECIMAL(5, 2),
  current_streak INTEGER DEFAULT 0,
  last_interview_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_interviews_user_id ON interviews(user_id);
CREATE INDEX IF NOT EXISTS idx_interviews_created_at ON interviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_interview_questions_interview_id ON interview_questions(interview_id);
CREATE INDEX IF NOT EXISTS idx_analytics_user_id ON analytics(user_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can only view/edit their own profile
CREATE POLICY "users_can_read_own_profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "users_can_update_own_profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "users_can_insert_profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Interviews: Users can only view/edit their own interviews
CREATE POLICY "users_can_read_own_interviews" ON interviews
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "users_can_insert_interviews" ON interviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_can_update_own_interviews" ON interviews
  FOR UPDATE USING (auth.uid() = user_id);

-- Interview Questions: Users can only access their own interview questions
CREATE POLICY "users_can_read_own_interview_questions" ON interview_questions
  FOR SELECT USING (
    interview_id IN (
      SELECT id FROM interviews WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "users_can_update_own_interview_questions" ON interview_questions
  FOR UPDATE USING (
    interview_id IN (
      SELECT id FROM interviews WHERE user_id = auth.uid()
    )
  );

-- Interview Reports: Users can only view their own reports
CREATE POLICY "users_can_read_own_reports" ON interview_reports
  FOR SELECT USING (
    interview_id IN (
      SELECT id FROM interviews WHERE user_id = auth.uid()
    )
  );

-- Analytics: Users can only view their own analytics
CREATE POLICY "users_can_read_own_analytics" ON analytics
  FOR SELECT USING (auth.uid() = user_id);

-- ============================================
-- TRIGGERS FOR AUTO-UPDATED TIMESTAMPS
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_interviews_updated_at BEFORE UPDATE ON interviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_interview_questions_updated_at BEFORE UPDATE ON interview_questions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_interview_reports_updated_at BEFORE UPDATE ON interview_reports
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_analytics_updated_at BEFORE UPDATE ON analytics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- MIGRATION COMPLETE
-- ============================================
-- Tables created:
-- ✅ profiles
-- ✅ interviews
-- ✅ interview_questions
-- ✅ interview_reports
-- ✅ analytics
--
-- Security:
-- ✅ RLS policies enabled
-- ✅ Foreign keys configured
-- ✅ Indexes created
-- ✅ Auto-update triggers
