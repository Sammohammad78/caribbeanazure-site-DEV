'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface TrustBarProps {
  title?: string
  logos?: {
    name: string
    width: number
    height: number
  }[]
  autoRotate?: boolean
}

export function TrustBar({
  title = "Vertrouwd door 150+ Nederlandse bedrijven",
  logos = [
    { name: "Randstad", width: 140, height: 40 },
    { name: "ABN AMRO", width: 120, height: 40 },
    { name: "CM.com", width: 100, height: 40 },
    { name: "ING", width: 80, height: 40 },
    { name: "Coolblue", width: 130, height: 40 },
    { name: "Booking.com", width: 150, height: 40 },
  ],
  autoRotate = true
}: TrustBarProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!autoRotate) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % logos.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [autoRotate, logos.length])

  return (
    <motion.div
      className="flex flex-col items-center gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--fg-muted)]">
        {title}
      </div>

      {/* Desktop: Show all logos */}
      <div className="hidden items-center justify-center gap-8 md:flex">
        {logos.map((logo, index) => (
          <motion.div
            key={logo.name}
            className="flex items-center justify-center opacity-40 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.4, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
            whileHover={{ opacity: 1, scale: 1.05 }}
          >
            <div
              className="flex items-center justify-center text-base font-bold text-[color:var(--fg-subtle)]"
              style={{ width: logo.width, height: logo.height }}
            >
              {logo.name}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile: Rotating carousel */}
      <div className="flex h-12 items-center justify-center md:hidden">
        <motion.div
          key={currentIndex}
          className="flex items-center justify-center opacity-60"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 0.6, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="flex items-center justify-center text-base font-bold text-[color:var(--fg-subtle)]"
            style={{ width: logos[currentIndex].width, height: logos[currentIndex].height }}
          >
            {logos[currentIndex].name}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
