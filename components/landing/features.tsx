'use client'

import { FadeInWhenVisible, StaggerContainer, StaggerItem } from '@/components/motion'
import {
  Brain,
  Mic,
  LineChart,
  Clock,
  Target,
  Code,
  MessageSquare,
  Sparkles,
  Users,
  Shield,
  Zap,
  BookOpen,
} from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI-Generated Questions',
    description: 'Smart algorithms generate role-specific interview questions based on your target position and experience level.',
  },
  {
    icon: Mic,
    title: 'Voice & Text Modes',
    description: 'Practice with voice recordings for realistic simulation or text input for detailed written responses.',
  },
  {
    icon: Zap,
    title: 'Instant AI Feedback',
    description: 'Get comprehensive feedback on your answers within seconds, including suggestions for improvement.',
  },
  {
    icon: LineChart,
    title: 'Performance Analytics',
    description: 'Track your progress over time with detailed analytics, skill breakdowns, and improvement trends.',
  },
  {
    icon: Clock,
    title: 'Interview History',
    description: 'Access all your past interviews, review answers, and compare performance across sessions.',
  },
  {
    icon: Target,
    title: 'Role-Specific Practice',
    description: 'Tailored interviews for Frontend, Backend, Full-Stack, DevOps, ML/AI, and more specialized roles.',
  },
]

const interviewTypes = [
  {
    icon: Code,
    title: 'Technical',
    description: 'Coding challenges, language-specific questions, and technical deep-dives.',
    color: 'from-primary to-primary/50',
  },
  {
    icon: MessageSquare,
    title: 'Behavioral',
    description: 'STAR method questions, leadership scenarios, and conflict resolution.',
    color: 'from-chart-2 to-chart-2/50',
  },
  {
    icon: Users,
    title: 'System Design',
    description: 'Architecture discussions, scalability patterns, and distributed systems.',
    color: 'from-chart-3 to-chart-3/50',
  },
  {
    icon: BookOpen,
    title: 'DSA',
    description: 'Data structures, algorithms, complexity analysis, and optimization.',
    color: 'from-chart-4 to-chart-4/50',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeInWhenVisible>
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Powerful Features</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
              Everything you need to{' '}
              <span className="gradient-text">master interviews</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Our AI-powered platform provides comprehensive tools to help you practice, improve, and succeed in your technical interviews.
            </p>
          </div>
        </FadeInWhenVisible>

        {/* Features Grid */}
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" staggerDelay={0.1}>
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <div className="group relative h-full rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm p-6 lg:p-8 hover:border-primary/30 hover:bg-card/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Interview Types */}
        <FadeInWhenVisible delay={0.2}>
          <div className="mt-24 lg:mt-32">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Practice every interview type
              </h3>
              <p className="mt-4 text-muted-foreground">
                From technical coding rounds to behavioral assessments, we have you covered.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {interviewTypes.map((type, index) => (
                <FadeInWhenVisible key={type.title} delay={0.1 * index}>
                  <div className="group relative rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm p-6 hover:border-primary/30 transition-all duration-300 overflow-hidden">
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                    
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${type.color} flex items-center justify-center mb-4`}>
                      <type.icon className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-base font-semibold text-foreground mb-2">{type.title}</h4>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                  </div>
                </FadeInWhenVisible>
              ))}
            </div>
          </div>
        </FadeInWhenVisible>

        {/* AI Showcase */}
        <FadeInWhenVisible delay={0.3}>
          <div className="mt-24 lg:mt-32 rounded-3xl border border-border/50 bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-xl p-8 lg:p-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-chart-2/10 border border-chart-2/20 text-sm text-chart-2 mb-4">
                  <Shield className="w-4 h-4" />
                  <span>Enterprise Ready</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                  AI that understands technical interviews
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Our AI has been trained on thousands of real interview scenarios from top tech companies. It understands context, asks relevant follow-ups, and provides actionable feedback.
                </p>
                <ul className="space-y-3">
                  {[
                    'Contextual follow-up questions',
                    'Real-time answer evaluation',
                    'Personalized improvement suggestions',
                    'Industry-standard scoring rubrics',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                      </div>
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative">
                {/* Mock Interview Preview */}
                <div className="rounded-xl border border-border/50 bg-card/80 backdrop-blur-xl p-6 shadow-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">AI Interviewer</div>
                      <div className="text-xs text-muted-foreground">Technical Round</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="rounded-lg bg-muted/50 p-4">
                      <p className="text-sm text-foreground">
                        Can you explain the difference between useMemo and useCallback in React? When would you use each?
                      </p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-chart-3/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-medium text-chart-3">AC</span>
                      </div>
                      <div className="rounded-lg bg-primary/10 border border-primary/20 p-4 flex-1">
                        <p className="text-sm text-foreground">
                          useMemo memoizes a computed value, while useCallback memoizes a function reference. I would use useMemo for expensive calculations...
                        </p>
                        <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-green-400" />
                            <span>Clear explanation</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-green-400" />
                            <span>Good examples</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  )
}
