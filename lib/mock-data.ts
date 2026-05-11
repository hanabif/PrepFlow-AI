// Mock data for the PrepFlow application
export const mockUser = {
  id: '1',
  name: 'Alex Chen',
  email: 'alex.chen@example.com',
  avatar: null,
  role: 'Senior Frontend Engineer',
  company: 'TechCorp',
  joinedAt: '2024-01-15',
  interviewsCompleted: 47,
  averageScore: 82,
  currentStreak: 12,
  longestStreak: 23,
}

export const mockInterviewHistory = [
  {
    id: '1',
    type: 'Technical',
    role: 'Senior Frontend Engineer',
    difficulty: 'Hard',
    score: 87,
    date: '2024-03-10',
    duration: 45,
    questionsAnswered: 8,
    strongAreas: ['React', 'TypeScript'],
    weakAreas: ['System Design'],
  },
  {
    id: '2',
    type: 'Behavioral',
    role: 'Senior Frontend Engineer',
    difficulty: 'Medium',
    score: 92,
    date: '2024-03-08',
    duration: 30,
    questionsAnswered: 6,
    strongAreas: ['Leadership', 'Communication'],
    weakAreas: ['Conflict Resolution'],
  },
  {
    id: '3',
    type: 'System Design',
    role: 'Staff Engineer',
    difficulty: 'Hard',
    score: 78,
    date: '2024-03-05',
    duration: 60,
    questionsAnswered: 4,
    strongAreas: ['Scalability'],
    weakAreas: ['Database Design', 'Caching'],
  },
  {
    id: '4',
    type: 'DSA',
    role: 'Senior Software Engineer',
    difficulty: 'Medium',
    score: 85,
    date: '2024-03-03',
    duration: 40,
    questionsAnswered: 5,
    strongAreas: ['Arrays', 'Trees'],
    weakAreas: ['Dynamic Programming'],
  },
  {
    id: '5',
    type: 'Technical',
    role: 'Frontend Engineer',
    difficulty: 'Easy',
    score: 94,
    date: '2024-03-01',
    duration: 35,
    questionsAnswered: 10,
    strongAreas: ['CSS', 'JavaScript', 'HTML'],
    weakAreas: [],
  },
]

export const mockSkillScores = [
  { skill: 'Communication', score: 85, change: 5 },
  { skill: 'Technical Knowledge', score: 78, change: 8 },
  { skill: 'Problem Solving', score: 82, change: 3 },
  { skill: 'System Design', score: 70, change: 12 },
  { skill: 'Behavioral', score: 88, change: 2 },
  { skill: 'DSA', score: 75, change: 7 },
]

export const mockWeeklyProgress = [
  { day: 'Mon', score: 75, interviews: 2 },
  { day: 'Tue', score: 78, interviews: 1 },
  { day: 'Wed', score: 82, interviews: 3 },
  { day: 'Thu', score: 80, interviews: 2 },
  { day: 'Fri', score: 85, interviews: 2 },
  { day: 'Sat', score: 88, interviews: 1 },
  { day: 'Sun', score: 87, interviews: 1 },
]

export const mockMonthlyProgress = [
  { week: 'Week 1', score: 72, interviews: 8 },
  { week: 'Week 2', score: 76, interviews: 10 },
  { week: 'Week 3', score: 80, interviews: 12 },
  { week: 'Week 4', score: 85, interviews: 14 },
]

export const mockRecommendations = [
  {
    id: '1',
    title: 'Practice Dynamic Programming',
    description: 'Your DP skills need improvement. Focus on common patterns like memoization and tabulation.',
    priority: 'high',
    category: 'DSA',
  },
  {
    id: '2',
    title: 'Review System Design Fundamentals',
    description: 'Strengthen your understanding of distributed systems, databases, and caching strategies.',
    priority: 'medium',
    category: 'System Design',
  },
  {
    id: '3',
    title: 'Improve STAR Method Usage',
    description: 'Structure your behavioral answers better using the Situation, Task, Action, Result framework.',
    priority: 'low',
    category: 'Behavioral',
  },
]

export const mockInterviewQuestions = {
  technical: [
    {
      id: '1',
      question: 'Explain the difference between useMemo and useCallback in React. When would you use each?',
      category: 'React',
      difficulty: 'Medium',
    },
    {
      id: '2',
      question: 'How would you implement a custom hook for handling form state with validation?',
      category: 'React',
      difficulty: 'Medium',
    },
    {
      id: '3',
      question: 'Describe the event loop in JavaScript and how it handles asynchronous operations.',
      category: 'JavaScript',
      difficulty: 'Hard',
    },
    {
      id: '4',
      question: 'What are the key differences between TypeScript interfaces and types? Give examples.',
      category: 'TypeScript',
      difficulty: 'Medium',
    },
    {
      id: '5',
      question: 'Explain the Virtual DOM and how React uses it to optimize rendering performance.',
      category: 'React',
      difficulty: 'Easy',
    },
  ],
  behavioral: [
    {
      id: '1',
      question: 'Tell me about a time when you had to deal with a difficult team member. How did you handle the situation?',
      category: 'Teamwork',
      difficulty: 'Medium',
    },
    {
      id: '2',
      question: 'Describe a situation where you had to meet a tight deadline. What was your approach?',
      category: 'Time Management',
      difficulty: 'Easy',
    },
    {
      id: '3',
      question: 'Give an example of when you had to learn a new technology quickly. What was your learning process?',
      category: 'Adaptability',
      difficulty: 'Easy',
    },
  ],
  systemDesign: [
    {
      id: '1',
      question: 'Design a URL shortener like bit.ly. What are the key components and trade-offs?',
      category: 'System Design',
      difficulty: 'Medium',
    },
    {
      id: '2',
      question: 'How would you design a real-time collaborative document editor like Google Docs?',
      category: 'System Design',
      difficulty: 'Hard',
    },
    {
      id: '3',
      question: 'Design a notification system that can handle millions of users.',
      category: 'System Design',
      difficulty: 'Hard',
    },
  ],
  dsa: [
    {
      id: '1',
      question: 'Given an array of integers, find two numbers such that they add up to a specific target. Explain your approach.',
      category: 'Arrays',
      difficulty: 'Easy',
    },
    {
      id: '2',
      question: 'Implement a LRU (Least Recently Used) cache. What data structures would you use and why?',
      category: 'Data Structures',
      difficulty: 'Medium',
    },
    {
      id: '3',
      question: 'Given a binary tree, find the maximum path sum. The path may start and end at any node.',
      category: 'Trees',
      difficulty: 'Hard',
    },
  ],
}

export const mockFeedback = {
  overallScore: 85,
  communication: {
    score: 88,
    feedback: 'Excellent articulation of technical concepts. You explained complex ideas clearly and concisely.',
    strengths: ['Clear explanations', 'Good use of examples', 'Confident delivery'],
    improvements: ['Could pause more between sections', 'Consider summarizing key points'],
  },
  technicalKnowledge: {
    score: 82,
    feedback: 'Strong understanding of React fundamentals and modern JavaScript. Some gaps in advanced optimization techniques.',
    strengths: ['React hooks mastery', 'TypeScript proficiency', 'Good debugging approach'],
    improvements: ['Deepen knowledge of performance optimization', 'Study more design patterns'],
  },
  problemSolving: {
    score: 84,
    feedback: 'Good systematic approach to problem-solving. You broke down complex problems effectively.',
    strengths: ['Logical thinking', 'Edge case consideration', 'Clean code structure'],
    improvements: ['Consider time complexity earlier', 'Practice more algorithm patterns'],
  },
  confidence: {
    score: 86,
    feedback: 'You maintained composure throughout the interview and handled pressure well.',
    strengths: ['Calm under pressure', 'Professional demeanor', 'Good recovery from mistakes'],
    improvements: ['Trust your instincts more', 'Be more assertive with your solutions'],
  },
  summary: 'Overall, this was a strong interview performance. Your technical foundation is solid, and your communication skills are excellent. Focus on deepening your knowledge of system design patterns and advanced algorithms to reach the next level.',
  recommendations: [
    'Practice LeetCode medium difficulty problems daily',
    'Read "Designing Data-Intensive Applications" for system design',
    'Record yourself answering questions to improve delivery',
    'Study common behavioral question frameworks like STAR',
  ],
}

export const mockHeatmapData = Array.from({ length: 365 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() - (365 - i))
  return {
    date: date.toISOString().split('T')[0],
    count: Math.random() > 0.3 ? Math.floor(Math.random() * 4) + 1 : 0,
  }
})

export const mockRadarData = [
  { subject: 'Communication', score: 88, fullMark: 100 },
  { subject: 'Technical', score: 82, fullMark: 100 },
  { subject: 'Problem Solving', score: 84, fullMark: 100 },
  { subject: 'System Design', score: 70, fullMark: 100 },
  { subject: 'Behavioral', score: 90, fullMark: 100 },
  { subject: 'DSA', score: 75, fullMark: 100 },
]

export const testimonials = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Software Engineer at Google',
    avatar: null,
    content: 'PrepFlow helped me land my dream job at Google. The AI feedback was incredibly detailed and helped me identify blind spots I never knew I had.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Senior Developer at Meta',
    avatar: null,
    content: 'The realistic interview simulations prepared me for anything. I felt confident walking into my interviews because I had practiced with PrepFlow.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Frontend Lead at Stripe',
    avatar: null,
    content: 'The analytics helped me track my progress over time. I could see exactly where I was improving and where I needed more practice.',
    rating: 5,
  },
]

export const pricingPlans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    description: 'Perfect for getting started',
    features: [
      '3 AI mock interviews per month',
      'Basic feedback reports',
      'Interview history (last 7 days)',
      'Community support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 29,
    description: 'For serious job seekers',
    features: [
      'Unlimited AI mock interviews',
      'Detailed AI feedback & analysis',
      'Voice interview mode',
      'Full interview history',
      'Performance analytics',
      'Priority support',
      'Custom interview scenarios',
    ],
    cta: 'Start Pro Trial',
    popular: true,
  },
  {
    id: 'team',
    name: 'Team',
    price: 99,
    description: 'For bootcamps & teams',
    features: [
      'Everything in Pro',
      'Up to 10 team members',
      'Team analytics dashboard',
      'Custom question banks',
      'API access',
      'Dedicated support',
      'White-label options',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
]

export const faqs = [
  {
    question: 'How does the AI interview simulation work?',
    answer: 'Our AI uses advanced language models to simulate realistic interview scenarios. It asks contextual follow-up questions, evaluates your responses in real-time, and provides detailed feedback on your technical accuracy, communication style, and problem-solving approach.',
  },
  {
    question: 'What types of interviews can I practice?',
    answer: 'PrepFlow supports Technical interviews (coding, frontend, backend), Behavioral interviews, System Design interviews, and Data Structures & Algorithms (DSA) interviews. You can customize the difficulty level and role-specific questions.',
  },
  {
    question: 'How accurate is the AI feedback?',
    answer: 'Our AI feedback system has been trained on thousands of real interview scenarios and validated by industry professionals. While no AI is perfect, our feedback accuracy rate exceeds 90% when compared to human interviewer assessments.',
  },
  {
    question: 'Can I practice voice interviews?',
    answer: 'Yes! Pro users can practice with voice interviews where you speak your answers just like a real interview. The AI analyzes both the content and delivery of your responses.',
  },
  {
    question: 'Is my interview data private?',
    answer: 'Absolutely. All your interview data is encrypted and stored securely. We never share your responses or analytics with third parties. You can delete your data at any time from your account settings.',
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel your subscription at any time with no questions asked. You will continue to have access until the end of your current billing period.',
  },
]

export const companyLogos = [
  'Google',
  'Meta',
  'Amazon',
  'Microsoft',
  'Apple',
  'Netflix',
  'Stripe',
  'Airbnb',
]
