'use client'

import Link from 'next/link'
import { FadeInWhenVisible, StaggerContainer, StaggerItem } from '@/components/motion'
import { Button } from '@/components/ui/button'
import { Check, Sparkles } from 'lucide-react'
import { pricingPlans } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeInWhenVisible>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Simple Pricing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
              Choose your{' '}
              <span className="gradient-text">perfect plan</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Start free and upgrade when you need more. No hidden fees, cancel anytime.
            </p>
          </div>
        </FadeInWhenVisible>

        {/* Pricing Cards */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto" staggerDelay={0.15}>
          {pricingPlans.map((plan) => (
            <StaggerItem key={plan.id}>
              <div
                className={cn(
                  'relative h-full rounded-2xl border backdrop-blur-sm p-6 lg:p-8 transition-all duration-300',
                  plan.popular
                    ? 'border-primary/50 bg-card/50 scale-[1.02] shadow-2xl shadow-primary/10'
                    : 'border-border/50 bg-card/30 hover:border-primary/30'
                )}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="px-4 py-1 rounded-full bg-gradient-to-r from-primary to-chart-2 text-xs font-medium text-white">
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">
                      ${plan.price}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-muted-foreground">/month</span>
                    )}
                  </div>
                </div>

                {/* CTA Button */}
                <Link href={plan.id === 'team' ? '#' : '/signup'} className="block mb-6">
                  <Button
                    className={cn(
                      'w-full',
                      plan.popular
                        ? 'bg-primary hover:bg-primary/90'
                        : 'bg-secondary hover:bg-secondary/80'
                    )}
                  >
                    {plan.cta}
                  </Button>
                </Link>

                {/* Features */}
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-green-400" />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Enterprise CTA */}
        <FadeInWhenVisible delay={0.4}>
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">
              Need a custom solution for your organization?
            </p>
            <Button variant="outline" size="lg">
              Contact Enterprise Sales
            </Button>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  )
}
