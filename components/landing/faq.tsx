'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeInWhenVisible } from '@/components/motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { faqs } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

function FAQItem({ question, answer, isOpen, onToggle }: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-border/50 last:border-b-0">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-5 text-left"
      >
        <span className="text-base font-medium text-foreground pr-4">{question}</span>
        <ChevronDown
          className={cn(
            'w-5 h-5 text-muted-foreground transition-transform duration-200 flex-shrink-0',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-muted-foreground leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeInWhenVisible>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary mb-6">
              <HelpCircle className="w-4 h-4" />
              <span>FAQ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Frequently asked questions
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Everything you need to know about PrepFlow.
            </p>
          </div>
        </FadeInWhenVisible>

        {/* FAQ List */}
        <FadeInWhenVisible delay={0.2}>
          <div className="rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm p-6 lg:p-8">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </FadeInWhenVisible>

        {/* Contact CTA */}
        <FadeInWhenVisible delay={0.3}>
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-2">Still have questions?</p>
            <a href="mailto:support@prepflow.ai" className="text-primary hover:underline">
              Contact our support team
            </a>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  )
}
