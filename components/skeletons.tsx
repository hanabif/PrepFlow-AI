'use client';

import { motion } from 'framer-motion';

export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-10 w-64 bg-border/50 rounded-lg animate-pulse" />
        <div className="h-4 w-96 bg-border/50 rounded animate-pulse" />
      </div>

      {/* Stats grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            className="p-6 rounded-xl border border-border bg-accent/20 space-y-3"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="h-4 w-24 bg-border/50 rounded animate-pulse" />
            <div className="h-8 w-16 bg-border/50 rounded animate-pulse" />
            <div className="h-2 w-full bg-border/50 rounded-full animate-pulse" />
          </motion.div>
        ))}
      </div>

      {/* Chart skeleton */}
      <div className="p-6 rounded-xl border border-border bg-accent/20 space-y-4">
        <div className="h-6 w-32 bg-border/50 rounded animate-pulse" />
        <div className="h-64 w-full bg-border/20 rounded-lg animate-pulse" />
      </div>
    </div>
  );
}

export function InterviewSessionSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header with timer */}
      <div className="flex items-center justify-between">
        <div className="space-y-2 flex-1">
          <div className="h-4 w-32 bg-border/50 rounded animate-pulse" />
          <div className="h-6 w-full bg-border/50 rounded animate-pulse" />
        </div>
        <div className="h-8 w-20 bg-border/50 rounded animate-pulse" />
      </div>

      {/* Question section */}
      <div className="space-y-4">
        <div className="h-32 w-full bg-border/50 rounded-lg animate-pulse" />
      </div>

      {/* Answer input */}
      <div className="space-y-2">
        <div className="h-4 w-32 bg-border/50 rounded animate-pulse" />
        <div className="h-64 w-full bg-border/50 rounded-lg animate-pulse" />
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="p-6 rounded-xl border border-border bg-accent/20 space-y-4">
      <div className="h-6 w-32 bg-border/50 rounded animate-pulse" />
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-4 w-full bg-border/50 rounded animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export function ListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="p-4 rounded-lg border border-border bg-accent/20 space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 space-y-2">
              <div className="h-4 w-48 bg-border/50 rounded animate-pulse" />
              <div className="h-3 w-64 bg-border/50 rounded animate-pulse" />
            </div>
            <div className="h-8 w-12 bg-border/50 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="p-6 rounded-xl border border-border bg-accent/20 space-y-4">
      <div className="h-6 w-40 bg-border/50 rounded animate-pulse" />
      <div className="h-64 w-full bg-border/30 rounded-lg animate-pulse" />
    </div>
  );
}
