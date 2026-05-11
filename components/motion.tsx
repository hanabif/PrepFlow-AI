'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'

interface FadeInProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  direction = 'up',
  ...props
}: FadeInProps) {
  const directions = {
    up: { y: 24 },
    down: { y: -24 },
    left: { x: 24 },
    right: { x: -24 },
    none: {},
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...directions[direction],
      }}
      animate={{
        opacity: 1,
        y: 0,
        x: 0,
      }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function FadeInWhenVisible({
  children,
  delay = 0,
  duration = 0.5,
  direction = 'up',
  ...props
}: FadeInProps) {
  const directions = {
    up: { y: 24 },
    down: { y: -24 },
    left: { x: 24 },
    right: { x: -24 },
    none: {},
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...directions[direction],
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
      }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  delay?: number
  staggerDelay?: number
}

export function StaggerContainer({
  children,
  className,
  delay = 0,
  staggerDelay = 0.1,
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.21, 0.47, 0.32, 0.98],
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function ScaleIn({
  children,
  delay = 0,
  duration = 0.5,
  className,
}: {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      {children}
    </motion.div>
  )
}

export function FloatingElement({
  children,
  className,
  duration = 6,
  distance = 10,
}: {
  children: ReactNode
  className?: string
  duration?: number
  distance?: number
}) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -distance, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  )
}

export function PulseGlow({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      animate={{
        boxShadow: [
          '0 0 20px -5px rgba(139, 92, 246, 0.3)',
          '0 0 40px -5px rgba(139, 92, 246, 0.5)',
          '0 0 20px -5px rgba(139, 92, 246, 0.3)',
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  )
}

export function SlideIn({
  children,
  direction = 'left',
  delay = 0,
  className,
}: {
  children: ReactNode
  direction?: 'left' | 'right' | 'up' | 'down'
  delay?: number
  className?: string
}) {
  const directions = {
    left: { x: -100, y: 0 },
    right: { x: 100, y: 0 },
    up: { x: 0, y: -100 },
    down: { x: 0, y: 100 },
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedCounter({
  value,
  duration = 2,
  className,
}: {
  value: number
  duration?: number
  className?: string
}) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {value}
      </motion.span>
    </motion.span>
  )
}

export { motion }
