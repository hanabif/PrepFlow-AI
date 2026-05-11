// OpenAI Integration Service
// Handles AI-powered interview generation, evaluation, and feedback
// ⚠️  THIS FILE USES OPENAI_API_KEY - MUST ONLY RUN ON SERVER

// TODO: When integrating with real OpenAI:
// 1. Install: npm install openai
// 2. Set OPENAI_API_KEY in .env.local
// 3. Replace mock implementations below

import type {
  Interview,
  InterviewQuestion,
  InterviewReport,
} from '@/types/database'

interface GenerateQuestionsInput {
  role: string
  experienceLevel: string
  interviewType: string
  difficulty: string
}

interface GenerateQuestionsOutput {
  questions: Array<{
    question_number: number
    question_text: string
  }>
}

interface EvaluateAnswerInput {
  question: string
  answer: string
  interviewType: string
}

interface EvaluateAnswerOutput {
  score: number
  communication_score: number
  technical_score: number
  feedback: string
}

interface GenerateSummaryInput {
  interview: Interview
  questions: InterviewQuestion[]
}

interface GenerateSummaryOutput {
  summary: string
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
}

// ============================================
// GENERATE INTERVIEW QUESTIONS
// ============================================
// Input: Interview configuration
// Output: Array of interview questions

export async function generateInterviewQuestions(
  input: GenerateQuestionsInput
): Promise<GenerateQuestionsOutput> {
  // TODO: Replace with real OpenAI call
  // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  // 
  // const response = await openai.chat.completions.create({
  //   model: 'gpt-4',
  //   messages: [{
  //     role: 'user',
  //     content: `Generate 5 interview questions for...`
  //   }],
  //   temperature: 0.7,
  // })

  console.log('[MOCK] Generating questions for:', input.role)

  // Mock implementation - returns realistic questions
  const questionSets: Record<string, string[]> = {
    frontend: [
      'Explain how React hooks work and when you would use them.',
      'What is the difference between CSS Grid and Flexbox? When would you use each?',
      'How would you optimize a slow React component?',
      'Describe a complex state management scenario you solved.',
      'Walk me through building a responsive design from scratch.',
    ],
    backend: [
      'Design a REST API for a social media platform.',
      'How do you handle database transactions and ensure ACID compliance?',
      'Explain horizontal vs vertical scaling. Which would you choose and why?',
      'How do you implement caching strategies in a backend system?',
      'Walk through optimizing a slow database query.',
    ],
    fullstack: [
      'Design the architecture for a real-time chat application.',
      'How would you handle authentication across frontend and backend?',
      'Explain your approach to deploying a full-stack application.',
      'How do you manage state between client and server?',
      'Walk me through scaling a monolithic application.',
    ],
  }

  const questions = questionSets[input.role.toLowerCase()] || questionSets.frontend

  return {
    questions: questions.slice(0, 5).map((text, index) => ({
      question_number: index + 1,
      question_text: text,
    })),
  }
}

// ============================================
// EVALUATE INTERVIEW ANSWER
// ============================================
// Input: Question + User's answer
// Output: Score and feedback

export async function evaluateInterviewAnswer(
  input: EvaluateAnswerInput
): Promise<EvaluateAnswerOutput> {
  // TODO: Replace with real OpenAI call
  // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  //
  // const response = await openai.chat.completions.create({
  //   model: 'gpt-4',
  //   messages: [{
  //     role: 'user',
  //     content: `Evaluate this interview answer...`
  //   }],
  //   response_format: { type: 'json_object' }
  // })

  console.log('[MOCK] Evaluating answer for question:', input.question.slice(0, 50))

  // Mock scoring logic based on answer length and quality indicators
  const answerLength = input.answer.length
  const hasExamples = input.answer.toLowerCase().includes('example')
  const hasChallenges = input.answer.toLowerCase().includes('challenge')
  const hasTradeoffs = input.answer.toLowerCase().includes('trade-off')

  let baseScore = Math.min(
    100,
    Math.floor(30 + (answerLength / 500) * 40)
  )

  if (hasExamples) baseScore += 10
  if (hasChallenges) baseScore += 10
  if (hasTradeoffs) baseScore += 10

  return {
    score: Math.min(100, Math.max(0, baseScore)),
    communication_score: Math.floor(Math.random() * 30 + 60),
    technical_score: Math.floor(Math.random() * 30 + 60),
    feedback: `Good explanation of ${input.question.split(' ').slice(0, 3).join(' ')}. ${
      hasExamples ? 'You provided good examples. ' : ''
    }${hasChallenges ? 'You mentioned real challenges. ' : ''}Consider going deeper into edge cases.`,
  }
}

// ============================================
// GENERATE INTERVIEW REPORT
// ============================================
// Input: All interview data
// Output: Comprehensive performance report

export async function generateInterviewReport(
  input: GenerateSummaryInput
): Promise<GenerateSummaryOutput> {
  // TODO: Replace with real OpenAI call
  // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  //
  // const allFeedback = input.questions.map(q => q.ai_feedback).join('\n')
  // const response = await openai.chat.completions.create({...})

  console.log('[MOCK] Generating report for interview:', input.interview.id)

  const avgScore =
    input.questions.reduce((sum, q) => sum + (q.score || 0), 0) /
    (input.questions.length || 1)

  const roleSpecificTips: Record<string, string[]> = {
    frontend: [
      'Study advanced React patterns like compound components',
      'Practice CSS Grid layouts and responsive design',
      'Learn about performance optimization techniques',
    ],
    backend: [
      'Deep dive into database optimization and indexing',
      'Study distributed systems and scaling patterns',
      'Learn API design best practices',
    ],
    fullstack: [
      'Practice full system design interviews',
      'Study DevOps and deployment strategies',
      'Learn about monitoring and observability',
    ],
  }

  return {
    summary: `You demonstrated solid ${input.interview.role} skills with an overall score of ${Math.round(avgScore)}/100. Your communication was clear, and you provided thoughtful answers with relevant examples.`,
    strengths: [
      'Clear communication and structured thinking',
      'Provided real-world examples and scenarios',
      'Showed awareness of trade-offs and limitations',
    ],
    weaknesses: [
      'Could dive deeper into edge cases',
      'Consider mentioning performance implications',
      'More detail on testing strategies would help',
    ],
    recommendations:
      roleSpecificTips[input.interview.role.toLowerCase()] ||
      roleSpecificTips.fullstack,
  }
}

// ============================================
// HELPER: CHECK API KEY
// ============================================

export function validateOpenAIKey(): boolean {
  if (!process.env.OPENAI_API_KEY) {
    console.warn(
      '⚠️  OPENAI_API_KEY not set. Using mock implementations. Set it in .env.local to use real AI.'
    )
    return false
  }
  return true
}
