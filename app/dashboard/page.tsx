'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion'
import {
  TrendingUp,
  Flame,
  Target,
  Clock,
  ArrowRight,
  Brain,
  Lightbulb,
  AlertTriangle,
  PlayCircle,
  ChevronRight,
  Loader2,
} from 'lucide-react'
import {
  mockUser,
  mockInterviewHistory,
  mockSkillScores,
  mockWeeklyProgress,
  mockRecommendations,
} from '@/lib/mock-data'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts'
import { createClient } from '@/lib/supabase/client'
import { getUserProfile } from '@/lib/supabase/auth'

const statCards = [
  {
    label: 'Overall Score',
    value: mockUser.averageScore,
    suffix: '/100',
    change: '+12%',
    changeType: 'positive' as const,
    icon: Target,
    color: 'from-primary to-primary/50',
  },
  {
    label: 'Current Streak',
    value: mockUser.currentStreak,
    suffix: ' days',
    change: 'Keep it up!',
    changeType: 'neutral' as const,
    icon: Flame,
    color: 'from-orange-500 to-orange-500/50',
  },
  {
    label: 'Interviews Completed',
    value: mockUser.interviewsCompleted,
    suffix: '',
    change: '+5 this week',
    changeType: 'positive' as const,
    icon: Clock,
    color: 'from-chart-2 to-chart-2/50',
  },
  {
    label: 'Improvement Rate',
    value: 15,
    suffix: '%',
    change: 'vs last month',
    changeType: 'positive' as const,
    icon: TrendingUp,
    color: 'from-green-500 to-green-500/50',
  },
]

export default function DashboardPage() {
  const [userName, setUserName] = useState(mockUser.name.split(' ')[0])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const fullName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'
          setUserName(fullName.split(' ')[0])
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [])

  return (
    <div className="space-y-8">
      {/* Header */}
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </span>
              ) : (
                `Welcome back, ${userName}`
              )}
            </h1>
            <p className="text-muted-foreground mt-1">
              Here&apos;s your interview preparation progress
            </p>
          </div>
          <Link href="/dashboard/interview">
            <Button className="bg-primary hover:bg-primary/90 gap-2">
              <PlayCircle className="w-4 h-4" />
              Start Interview
            </Button>
          </Link>
        </div>
      </FadeIn>

      {/* Stats Cards */}
      <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6" staggerDelay={0.1}>
        {statCards.map((stat) => (
          <StaggerItem key={stat.label}>
            <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-5 hover:border-primary/30 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground mt-1">
                    {stat.value}
                    <span className="text-lg text-muted-foreground">{stat.suffix}</span>
                  </p>
                  <p
                    className={`text-sm mt-1 ${
                      stat.changeType === 'positive'
                        ? 'text-green-400'
                        : stat.changeType === 'negative'
                        ? 'text-red-400'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {stat.change}
                  </p>
                </div>
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <FadeIn delay={0.2} className="lg:col-span-2">
          <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Performance Trend</h2>
                <p className="text-sm text-muted-foreground">Your interview scores this week</p>
              </div>
              <select className="px-3 py-1.5 rounded-lg bg-muted border border-border text-sm text-foreground">
                <option>This Week</option>
                <option>This Month</option>
                <option>This Year</option>
              </select>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockWeeklyProgress}>
                  <defs>
                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="day"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    domain={[60, 100]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#scoreGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </FadeIn>

        {/* Skill Breakdown */}
        <FadeIn delay={0.3}>
          <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">Skill Breakdown</h2>
              <Link href="/dashboard/analytics" className="text-sm text-primary hover:underline">
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {mockSkillScores.slice(0, 5).map((skill) => (
                <div key={skill.skill} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{skill.skill}</span>
                    <span className="text-foreground font-medium">{skill.score}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.score}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full rounded-full bg-primary"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Second Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Interviews */}
        <FadeIn delay={0.4}>
          <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">Recent Interviews</h2>
              <Link href="/dashboard/history" className="text-sm text-primary hover:underline flex items-center gap-1">
                View all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {mockInterviewHistory.slice(0, 4).map((interview) => (
                <Link
                  key={interview.id}
                  href={`/dashboard/feedback/${interview.id}`}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      interview.type === 'Technical' ? 'bg-primary/20' :
                      interview.type === 'Behavioral' ? 'bg-chart-2/20' :
                      interview.type === 'System Design' ? 'bg-chart-3/20' :
                      'bg-chart-4/20'
                    }`}>
                      <Brain className={`w-5 h-5 ${
                        interview.type === 'Technical' ? 'text-primary' :
                        interview.type === 'Behavioral' ? 'text-chart-2' :
                        interview.type === 'System Design' ? 'text-chart-3' :
                        'text-chart-4'
                      }`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{interview.type}</p>
                      <p className="text-xs text-muted-foreground">{interview.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`text-sm font-semibold ${
                      interview.score >= 85 ? 'text-green-400' :
                      interview.score >= 70 ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {interview.score}/100
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* AI Recommendations */}
        <FadeIn delay={0.5}>
          <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-400" />
                <h2 className="text-lg font-semibold text-foreground">AI Recommendations</h2>
              </div>
            </div>
            <div className="space-y-4">
              {mockRecommendations.map((rec) => (
                <div
                  key={rec.id}
                  className={`p-4 rounded-lg border ${
                    rec.priority === 'high' ? 'border-red-500/30 bg-red-500/5' :
                    rec.priority === 'medium' ? 'border-yellow-500/30 bg-yellow-500/5' :
                    'border-green-500/30 bg-green-500/5'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      rec.priority === 'high' ? 'bg-red-500/20' :
                      rec.priority === 'medium' ? 'bg-yellow-500/20' :
                      'bg-green-500/20'
                    }`}>
                      <AlertTriangle className={`w-3 h-3 ${
                        rec.priority === 'high' ? 'text-red-400' :
                        rec.priority === 'medium' ? 'text-yellow-400' :
                        'text-green-400'
                      }`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{rec.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{rec.description}</p>
                      <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground mt-2">
                        {rec.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Quick Start Section */}
      <FadeIn delay={0.6}>
        <div className="rounded-xl border border-border bg-gradient-to-r from-primary/10 via-transparent to-chart-2/10 p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Ready for your next interview?</h2>
              <p className="text-muted-foreground mt-1">
                Practice makes perfect. Start a new interview session and improve your skills.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/dashboard/interview?type=technical">
                <Button variant="outline" className="gap-2">
                  Technical
                </Button>
              </Link>
              <Link href="/dashboard/interview?type=behavioral">
                <Button variant="outline" className="gap-2">
                  Behavioral
                </Button>
              </Link>
              <Link href="/dashboard/interview?type=system-design">
                <Button variant="outline" className="gap-2">
                  System Design
                </Button>
              </Link>
              <Link href="/dashboard/interview">
                <Button className="bg-primary hover:bg-primary/90 gap-2">
                  Custom Interview
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  )
}
