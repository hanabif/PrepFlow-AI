'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FadeIn, FloatingElement } from '@/components/motion'
import { ArrowRight, Play, TrendingUp, Target, Zap, Star } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orb */}
        <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] opacity-60" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-chart-2/20 rounded-full blur-[100px] opacity-40" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <FadeIn delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary mb-6">
                <Zap className="w-4 h-4" />
                <span>AI-Powered Interview Prep</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
                <span className="text-foreground">Ace your next</span>
                <br />
                <span className="gradient-text">tech interview.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Practice realistic AI mock interviews, get instant detailed feedback, and track your improvement over time. Land your dream job at top tech companies.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/signup">
                  <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground gap-2 h-12 px-6 text-base">
                    Start Practicing Free
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto gap-2 h-12 px-6 text-base border-border/50 hover:bg-muted/50"
                >
                  <Play className="w-4 h-4" />
                  Watch Demo
                </Button>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <div className="mt-10 flex items-center gap-6 justify-center lg:justify-start text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/80 to-chart-2/80 border-2 border-background flex items-center justify-center text-[10px] font-medium text-white"
                      >
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <span>10,000+ engineers</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  ))}
                  <span className="ml-1">4.9/5</span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Content - Dashboard Preview */}
          <FadeIn delay={0.3} direction="left">
            <div className="relative">
              {/* Main Dashboard Card */}
              <div className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6 shadow-2xl">
                {/* Top bar */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  <div className="flex-1 mx-4 h-6 rounded-md bg-muted/50" />
                </div>

                {/* Score Card */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="col-span-2 rounded-xl bg-gradient-to-br from-primary/20 to-chart-2/20 border border-primary/20 p-4">
                    <div className="text-sm text-muted-foreground mb-1">Overall Score</div>
                    <div className="text-4xl font-bold text-foreground">87<span className="text-lg text-primary">/100</span></div>
                    <div className="flex items-center gap-1 mt-2 text-sm text-green-400">
                      <TrendingUp className="w-4 h-4" />
                      <span>+12% this week</span>
                    </div>
                  </div>
                  <div className="rounded-xl bg-muted/30 border border-border/50 p-4">
                    <div className="text-sm text-muted-foreground mb-1">Streak</div>
                    <div className="text-3xl font-bold text-foreground">12</div>
                    <div className="text-xs text-muted-foreground mt-1">days</div>
                  </div>
                </div>

                {/* Progress bars */}
                <div className="space-y-3">
                  {[
                    { label: 'Technical', value: 85, color: 'bg-primary' },
                    { label: 'Behavioral', value: 92, color: 'bg-chart-2' },
                    { label: 'System Design', value: 70, color: 'bg-chart-3' },
                  ].map((item) => (
                    <div key={item.label} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="text-foreground font-medium">{item.value}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${item.color} transition-all duration-1000`}
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating Cards */}
              <FloatingElement className="absolute -top-6 -right-6 z-10" duration={5} distance={8}>
                <div className="rounded-xl bg-card/90 backdrop-blur-xl border border-border/50 p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Target className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Interview Score</div>
                      <div className="text-lg font-semibold text-foreground">92/100</div>
                    </div>
                  </div>
                </div>
              </FloatingElement>

              <FloatingElement className="absolute -bottom-4 -left-6 z-10" duration={6} distance={10}>
                <div className="rounded-xl bg-card/90 backdrop-blur-xl border border-border/50 p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">AI Feedback</div>
                      <div className="text-sm font-medium text-foreground">Excellent clarity!</div>
                    </div>
                  </div>
                </div>
              </FloatingElement>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
