'use client'

import { FadeInWhenVisible, StaggerContainer, StaggerItem } from '@/components/motion'
import { Star, Quote } from 'lucide-react'
import { testimonials, companyLogos } from '@/lib/mock-data'

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Company Logos */}
        <FadeInWhenVisible>
          <div className="text-center mb-16">
            <p className="text-sm text-muted-foreground mb-8 uppercase tracking-wider">
              Trusted by engineers from leading companies
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
              {companyLogos.map((company) => (
                <div
                  key={company}
                  className="text-xl lg:text-2xl font-semibold text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                >
                  {company}
                </div>
              ))}
            </div>
          </div>
        </FadeInWhenVisible>

        {/* Section Header */}
        <FadeInWhenVisible>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
              Loved by{' '}
              <span className="gradient-text">10,000+ engineers</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              See how PrepFlow has helped software engineers land their dream jobs at top companies.
            </p>
          </div>
        </FadeInWhenVisible>

        {/* Testimonials Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" staggerDelay={0.15}>
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.id}>
              <div className="group relative h-full rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm p-6 lg:p-8 hover:border-primary/30 hover:bg-card/50 transition-all duration-300">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-10 h-10 text-primary" />
                </div>

                {/* Stars */}
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-foreground leading-relaxed mb-6">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      {testimonial.name.split(' ').map((n) => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Stats */}
        <FadeInWhenVisible delay={0.3}>
          <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { value: '10,000+', label: 'Active Users' },
              { value: '50,000+', label: 'Interviews Completed' },
              { value: '85%', label: 'Success Rate' },
              { value: '4.9/5', label: 'User Rating' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center p-6 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm"
              >
                <div className="text-3xl lg:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  )
}
