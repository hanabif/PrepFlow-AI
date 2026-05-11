'use client'

import Link from 'next/link'
import { FadeInWhenVisible } from '@/components/motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Twitter, Github, Linkedin } from 'lucide-react'

export function CTASection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeInWhenVisible>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Start for free</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Ready to ace your next interview?
          </h2>
          
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of engineers who have landed their dream jobs with PrepFlow. Start practicing today.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 gap-2 h-12 px-8 text-base">
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-base">
                Sign In
              </Button>
            </Link>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            No credit card required. Free plan includes 3 interviews per month.
          </p>
        </FadeInWhenVisible>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-foreground">PrepFlow</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              AI-powered interview preparation platform for software engineers.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-3">
              {['Features', 'Pricing', 'Testimonials', 'FAQ'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {['Privacy', 'Terms', 'Security', 'Cookies'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} PrepFlow. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with Next.js and AI
          </p>
        </div>
      </div>
    </footer>
  )
}
