'use client'

import { motion } from 'framer-motion'
import { Check, Zap, Shield, Clock } from 'lucide-react'

interface Capability {
  icon: React.ComponentType<{ className?: string }>
  label: string
}

const capabilities: Capability[] = [
  { icon: Zap, label: "Snellere doorlooptijd" },
  { icon: Check, label: "Minder repetitieve taken" },
  { icon: Shield, label: "Betere foutreductie" },
  { icon: Clock, label: "Altijd inzicht in status" },
]

export function CapabilitiesStrip() {
  return (
    <motion.div
      className="flex flex-col items-center gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--fg-muted)]">
        Wat je kunt verwachten
      </div>

      {/* Desktop: Show all capabilities */}
      <div className="grid grid-cols-2 gap-4 md:flex md:items-center md:justify-center md:gap-8">
        {capabilities.map((capability, index) => {
          const Icon = capability.icon
          return (
            <motion.div
              key={capability.label}
              className="flex items-center gap-3 rounded-xl border border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_60%,transparent)] px-4 py-3 backdrop-blur-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
            >
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                <Icon className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium text-[color:var(--fg)]">{capability.label}</span>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
