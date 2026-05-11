'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion'
import {
  Code,
  MessageSquare,
  Users,
  BookOpen,
  Mic,
  MessageCircle,
  Clock,
  Target,
  Zap,
  ChevronRight,
  CheckCircle,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const interviewTypes = [
  {
    id: 'technical',
    icon: Code,
    title: 'Technical',
    description: 'Coding challenges and language-specific questions',
    color: 'from-primary to-primary/50',
    duration: '30-45 min',
    questions: '5-8 questions',
  },
  {
    id: 'behavioral',
    icon: MessageSquare,
    title: 'Behavioral',
    description: 'Leadership, teamwork, and conflict resolution',
    color: 'from-chart-2 to-chart-2/50',
    duration: '25-35 min',
    questions: '4-6 questions',
  },
  {
    id: 'system-design',
    icon: Users,
    title: 'System Design',
    description: 'Architecture and scalability discussions',
    color: 'from-chart-3 to-chart-3/50',
    duration: '45-60 min',
    questions: '2-3 questions',
  },
  {
    id: 'dsa',
    icon: BookOpen,
    title: 'DSA',
    description: 'Data structures and algorithms',
    color: 'from-chart-4 to-chart-4/50',
    duration: '40-50 min',
    questions: '3-5 questions',
  },
]

const roles = [
  'Frontend Engineer',
  'Backend Engineer',
  'Full Stack Engineer',
  'DevOps Engineer',
  'Data Engineer',
  'ML Engineer',
  'Mobile Developer',
  'Staff Engineer',
]

const experienceLevels = [
  { id: 'junior', label: 'Junior', years: '0-2 years' },
  { id: 'mid', label: 'Mid-Level', years: '2-5 years' },
  { id: 'senior', label: 'Senior', years: '5-8 years' },
  { id: 'staff', label: 'Staff+', years: '8+ years' },
]

const difficulties = [
  { id: 'easy', label: 'Easy', description: 'Great for practice' },
  { id: 'medium', label: 'Medium', description: 'Industry standard' },
  { id: 'hard', label: 'Hard', description: 'FAANG level' },
]

const techStacks = [
  'React', 'TypeScript', 'Node.js', 'Python', 'Go', 'Java',
  'AWS', 'Docker', 'Kubernetes', 'GraphQL', 'PostgreSQL', 'MongoDB',
]

export default function InterviewSetupPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [config, setConfig] = useState({
    type: '',
    role: '',
    experience: '',
    difficulty: 'medium',
    mode: 'text',
    duration: 30,
    techStack: [] as string[],
  })

  const handleTypeSelect = (typeId: string) => {
    setConfig({ ...config, type: typeId })
  }

  const handleTechStackToggle = (tech: string) => {
    const newStack = config.techStack.includes(tech)
      ? config.techStack.filter((t) => t !== tech)
      : [...config.techStack, tech]
    setConfig({ ...config, techStack: newStack })
  }

  const handleStartInterview = () => {
    router.push(`/dashboard/interview/session?type=${config.type}`)
  }

  const canProceed = () => {
    if (step === 1) return config.type !== ''
    if (step === 2) return config.role !== '' && config.experience !== ''
    if (step === 3) return true
    return true
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <FadeIn>
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Configure Your Interview</h1>
          <p className="text-muted-foreground mt-1">
            Customize your mock interview experience
          </p>
        </div>
      </FadeIn>

      {/* Progress Steps */}
      <FadeIn delay={0.1}>
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all',
                  s < step
                    ? 'bg-primary text-primary-foreground'
                    : s === step
                    ? 'bg-primary/20 text-primary border-2 border-primary'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                {s < step ? <CheckCircle className="w-5 h-5" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={cn(
                    'w-20 sm:w-32 h-1 mx-2',
                    s < step ? 'bg-primary' : 'bg-muted'
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {/* Step 1: Interview Type */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground">Select Interview Type</h2>
              <p className="text-sm text-muted-foreground">Choose the type of interview you want to practice</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {interviewTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleTypeSelect(type.id)}
                  className={cn(
                    'relative p-5 rounded-xl border text-left transition-all',
                    config.type === type.id
                      ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                      : 'border-border bg-card/50 hover:border-primary/30'
                  )}
                >
                  {config.type === type.id && (
                    <div className="absolute top-3 right-3">
                      <CheckCircle className="w-5 h-5 text-primary" />
                    </div>
                  )}
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${type.color} flex items-center justify-center mb-4`}>
                    <type.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-1">{type.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{type.description}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {type.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      {type.questions}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Role & Experience */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-8">
              {/* Role Selection */}
              <div>
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-foreground">Select Your Target Role</h2>
                  <p className="text-sm text-muted-foreground">Questions will be tailored to this role</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {roles.map((role) => (
                    <button
                      key={role}
                      onClick={() => setConfig({ ...config, role })}
                      className={cn(
                        'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                        config.role === role
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      )}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Experience Level */}
              <div>
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-foreground">Experience Level</h2>
                  <p className="text-sm text-muted-foreground">Difficulty will adjust accordingly</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {experienceLevels.map((level) => (
                    <button
                      key={level.id}
                      onClick={() => setConfig({ ...config, experience: level.id })}
                      className={cn(
                        'p-4 rounded-xl border text-left transition-all',
                        config.experience === level.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border bg-card/50 hover:border-primary/30'
                      )}
                    >
                      <p className="text-sm font-semibold text-foreground">{level.label}</p>
                      <p className="text-xs text-muted-foreground">{level.years}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Advanced Settings */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-8">
              {/* Interview Mode */}
              <div>
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-foreground">Interview Mode</h2>
                  <p className="text-sm text-muted-foreground">Choose how you want to respond</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => setConfig({ ...config, mode: 'text' })}
                    className={cn(
                      'p-5 rounded-xl border text-left transition-all',
                      config.mode === 'text'
                        ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                        : 'border-border bg-card/50 hover:border-primary/30'
                    )}
                  >
                    <div className="w-10 h-10 rounded-lg bg-chart-2/20 flex items-center justify-center mb-3">
                      <MessageCircle className="w-5 h-5 text-chart-2" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground">Text Mode</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Type your answers for detailed, structured responses
                    </p>
                  </button>
                  <button
                    onClick={() => setConfig({ ...config, mode: 'voice' })}
                    className={cn(
                      'p-5 rounded-xl border text-left transition-all',
                      config.mode === 'voice'
                        ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                        : 'border-border bg-card/50 hover:border-primary/30'
                    )}
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mb-3">
                      <Mic className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground">Voice Mode</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Speak your answers for realistic interview simulation
                    </p>
                  </button>
                </div>
              </div>

              {/* Difficulty */}
              <div>
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-foreground">Difficulty Level</h2>
                  <p className="text-sm text-muted-foreground">Adjust the challenge level</p>
                </div>
                <div className="flex gap-3">
                  {difficulties.map((diff) => (
                    <button
                      key={diff.id}
                      onClick={() => setConfig({ ...config, difficulty: diff.id })}
                      className={cn(
                        'flex-1 p-4 rounded-xl border text-center transition-all',
                        config.difficulty === diff.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border bg-card/50 hover:border-primary/30'
                      )}
                    >
                      <p className="text-sm font-semibold text-foreground">{diff.label}</p>
                      <p className="text-xs text-muted-foreground">{diff.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tech Stack Tags */}
              <div>
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-foreground">Focus Areas (Optional)</h2>
                  <p className="text-sm text-muted-foreground">Select technologies to focus on</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {techStacks.map((tech) => (
                    <button
                      key={tech}
                      onClick={() => handleTechStackToggle(tech)}
                      className={cn(
                        'px-3 py-1.5 rounded-lg text-sm transition-all',
                        config.techStack.includes(tech)
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      )}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div>
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-foreground">Duration</h2>
                  <p className="text-sm text-muted-foreground">Set your interview time limit</p>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="15"
                    max="60"
                    step="5"
                    value={config.duration}
                    onChange={(e) => setConfig({ ...config, duration: parseInt(e.target.value) })}
                    className="flex-1 accent-primary"
                  />
                  <span className="text-sm font-medium text-foreground w-20 text-right">
                    {config.duration} minutes
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <FadeIn delay={0.3}>
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
          <Button
            variant="outline"
            onClick={() => setStep(step - 1)}
            disabled={step === 1}
          >
            Back
          </Button>

          {step < 3 ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="bg-primary hover:bg-primary/90 gap-2"
            >
              Continue
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleStartInterview}
              className="bg-primary hover:bg-primary/90 gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Start Interview
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </FadeIn>

      {/* Summary Card */}
      {(config.type || config.role) && (
        <FadeIn delay={0.4}>
          <div className="mt-8 p-5 rounded-xl border border-border bg-card/50">
            <h3 className="text-sm font-semibold text-foreground mb-3">Interview Summary</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              {config.type && (
                <div>
                  <p className="text-muted-foreground">Type</p>
                  <p className="font-medium text-foreground capitalize">{config.type.replace('-', ' ')}</p>
                </div>
              )}
              {config.role && (
                <div>
                  <p className="text-muted-foreground">Role</p>
                  <p className="font-medium text-foreground">{config.role}</p>
                </div>
              )}
              {config.experience && (
                <div>
                  <p className="text-muted-foreground">Experience</p>
                  <p className="font-medium text-foreground capitalize">{config.experience}</p>
                </div>
              )}
              <div>
                <p className="text-muted-foreground">Duration</p>
                <p className="font-medium text-foreground">{config.duration} min</p>
              </div>
            </div>
          </div>
        </FadeIn>
      )}
    </div>
  )
}
