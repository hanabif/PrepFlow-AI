import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-chart-2/20" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-chart-2/30 rounded-full blur-[80px]" />
        
        {/* Content */}
        <div className="relative flex flex-col justify-between p-12 w-full">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-semibold text-foreground">PrepFlow</span>
          </Link>
          
          <div className="max-w-md">
            <h1 className="text-4xl font-bold text-foreground mb-6">
              Master your tech interviews with AI
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Practice realistic mock interviews, get instant feedback, and track your improvement. Join 10,000+ engineers who landed their dream jobs.
            </p>
            
            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-2">
                {['A', 'B', 'C', 'D', 'E'].map((letter) => (
                  <div
                    key={letter}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-chart-2/80 border-2 border-background flex items-center justify-center text-sm font-medium text-white"
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">10,000+</span> engineers trust PrepFlow
              </div>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} PrepFlow. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8">
            <Link href="/" className="flex items-center gap-2 justify-center">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-semibold text-foreground">PrepFlow</span>
            </Link>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  )
}
