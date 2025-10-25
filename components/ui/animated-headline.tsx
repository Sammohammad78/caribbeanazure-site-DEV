'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface HeadlineVariant {
  metric: string
  text: string
  color?: string
}

interface AnimatedHeadlineProps {
  variants: HeadlineVariant[]
  interval?: number
  className?: string
}

export function AnimatedHeadline({
  variants,
  interval = 3500,
  className = ""
}: AnimatedHeadlineProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % variants.length)
    }, interval)

    return () => clearInterval(timer)
  }, [variants.length, interval])

  const current = variants[currentIndex]

  return (
    <div className={`text-balance font-bold tracking-tight ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="inline-flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3"
        >
          <span
            className="inline-block text-5xl font-bold sm:text-6xl lg:text-7xl"
            style={{
              background: current.color || 'linear-gradient(135deg, var(--brand) 0%, var(--accent) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            {current.metric}
          </span>
          <span className="text-3xl sm:text-4xl lg:text-5xl">
            {current.text}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Progress dots */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {variants.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'w-8 bg-[color:var(--brand)]'
                : 'w-2 bg-[color:color-mix(in_oklab,var(--fg)_20%,transparent)] hover:bg-[color:color-mix(in_oklab,var(--fg)_40%,transparent)]'
            }`}
            aria-label={`Go to headline ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
