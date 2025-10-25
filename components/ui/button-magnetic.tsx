'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  strength?: number
  children: React.ReactNode
}

export const MagneticButton = React.forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ children, strength = 0.15, className, ...props }, ref) => {
    const [offset, setOffset] = React.useState({ x: 0, y: 0 })
    const buttonRef = React.useRef<HTMLDivElement>(null)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!buttonRef.current) return

      const rect = buttonRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distanceX = e.clientX - centerX
      const distanceY = e.clientY - centerY
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

      // Only apply magnet effect within 100px radius
      if (distance < 100) {
        setOffset({
          x: distanceX * strength,
          y: distanceY * strength,
        })
      } else {
        setOffset({ x: 0, y: 0 })
      }
    }

    const handleMouseLeave = () => {
      setOffset({ x: 0, y: 0 })
    }

    return (
      <motion.div
        ref={buttonRef}
        className="inline-block"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          x: offset.x,
          y: offset.y,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
      >
        <button
          ref={ref}
          className={cn(
            "relative inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200",
            "bg-[color:var(--brand)] text-white hover:bg-[color:var(--brand-600)] active:scale-95",
            "shadow-[0_4px_16px_color-mix(in_oklab,var(--brand)_25%,transparent)]",
            "hover:shadow-[0_8px_24px_color-mix(in_oklab,var(--brand)_35%,transparent)]",
            className
          )}
          {...props}
        >
          {children}
        </button>
      </motion.div>
    )
  }
)

MagneticButton.displayName = 'MagneticButton'
