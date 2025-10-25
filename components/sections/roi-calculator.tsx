'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CardPremium, CardPremiumHeader, CardPremiumTitle, CardPremiumDescription, CardPremiumContent } from '@/components/ui/card-premium'
import { MagneticButton } from '@/components/ui/button-magnetic'
import { Calculator, TrendingUp, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export function ROICalculator() {
  const locale = useLocale()
  const [teamSize, setTeamSize] = useState(10)
  const [hoursPerWeek, setHoursPerWeek] = useState(20)
  const [hourlyRate, setHourlyRate] = useState(50)

  // Calculations
  const yearlyWaste = teamSize * hoursPerWeek * hourlyRate * 48 // 48 work weeks
  const automationSavings = yearlyWaste * 0.6 // 60% reduction
  const implementationCost = 5000 + (teamSize * 200)
  const roi = ((automationSavings - implementationCost) / implementationCost) * 100
  const paybackMonths = Math.ceil((implementationCost / (automationSavings / 12)))
  const monthlySavings = automationSavings / 12

  // Graph data (24 months)
  const graphData = Array.from({ length: 24 }, (_, month) => ({
    month: month + 1,
    cumulative: Math.min((monthlySavings * (month + 1)) - implementationCost, automationSavings * 2),
    investment: month === 0 ? -implementationCost : 0
  }))

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('nl-NL', {
      maximumFractionDigits: 0
    }).format(value)
  }

  return (
    <section id="roi-calculator" className="section-padding-y scroll-mt-20">
      <div className="container-custom">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-[color:color-mix(in_oklab,var(--brand)_20%,transparent)] bg-[color:color-mix(in_oklab,var(--brand-soft)_40%,transparent)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--brand)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Calculator className="size-4" />
            ROI Calculator
          </motion.div>

          <motion.h2
            className="mt-6 text-balance text-4xl font-bold tracking-tight md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Wat levert automatisering jou op?
          </motion.h2>

          <motion.p
            className="mt-4 text-lg text-[color:var(--fg-subtle)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Bereken in 60 seconden hoeveel tijd en geld je bespaart met automation
          </motion.p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">

          {/* Left: Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <CardPremium glow>
              <CardPremiumHeader>
                <CardPremiumTitle>Je situatie</CardPremiumTitle>
                <CardPremiumDescription>
                  Pas de schuifjes aan naar je huidige situatie
                </CardPremiumDescription>
              </CardPremiumHeader>

              <CardPremiumContent className="space-y-8">
                {/* Team Size */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <label className="text-sm font-semibold text-body">
                      Teamgrootte
                    </label>
                    <span className="text-2xl font-bold text-[color:var(--brand)]">
                      {teamSize}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={teamSize}
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[color:var(--brand)] [&::-webkit-slider-thumb]:shadow-[0_4px_16px_color-mix(in_oklab,var(--brand)_40%,transparent)] [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
                  />
                  <div className="mt-2 flex justify-between text-xs text-[color:var(--fg-muted)]">
                    <span>1 persoon</span>
                    <span>50+ mensen</span>
                  </div>
                </div>

                {/* Hours per Week */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <label className="text-sm font-semibold text-body">
                      Uren handmatig werk per week
                    </label>
                    <span className="text-2xl font-bold text-[color:var(--brand)]">
                      {hoursPerWeek}h
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="40"
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[color:var(--brand)] [&::-webkit-slider-thumb]:shadow-[0_4px_16px_color-mix(in_oklab,var(--brand)_40%,transparent)] [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
                  />
                  <div className="mt-2 flex justify-between text-xs text-[color:var(--fg-muted)]">
                    <span>5 uur/week</span>
                    <span>40 uur/week</span>
                  </div>
                </div>

                {/* Hourly Rate */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <label className="text-sm font-semibold text-body">
                      Gemiddeld uurtarief
                    </label>
                    <span className="text-2xl font-bold text-[color:var(--brand)]">
                      €{hourlyRate}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="25"
                    max="150"
                    step="5"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[color:var(--brand)] [&::-webkit-slider-thumb]:shadow-[0_4px_16px_color-mix(in_oklab,var(--brand)_40%,transparent)] [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
                  />
                  <div className="mt-2 flex justify-between text-xs text-[color:var(--fg-muted)]">
                    <span>€25/uur</span>
                    <span>€150/uur</span>
                  </div>
                </div>
              </CardPremiumContent>
            </CardPremium>
          </motion.div>

          {/* Right: Results + Graph */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {/* Results Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <CardPremium className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                    <TrendingUp className="size-6" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--fg-muted)]">
                      Jaarlijkse besparing
                    </p>
                    <p className="mt-2 text-3xl font-bold text-body">
                      {formatCurrency(automationSavings)}
                    </p>
                  </div>
                </div>
              </CardPremium>

              <CardPremium className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--accent-soft)_65%,transparent)] text-[color:var(--accent)]">
                    <Calculator className="size-6" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--fg-muted)]">
                      ROI (eerste jaar)
                    </p>
                    <p className="mt-2 text-3xl font-bold text-body">
                      {formatNumber(roi)}%
                    </p>
                  </div>
                </div>
              </CardPremium>

              <CardPremium className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                    <Clock className="size-6" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--fg-muted)]">
                      Terugverdiend in
                    </p>
                    <p className="mt-2 text-3xl font-bold text-body">
                      {paybackMonths} maanden
                    </p>
                  </div>
                </div>
              </CardPremium>

              <CardPremium className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--accent-soft)_65%,transparent)] text-[color:var(--accent)]">
                    <TrendingUp className="size-6" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--fg-muted)]">
                      Investering
                    </p>
                    <p className="mt-2 text-3xl font-bold text-body">
                      {formatCurrency(implementationCost)}
                    </p>
                  </div>
                </div>
              </CardPremium>
            </div>

            {/* Graph */}
            <CardPremium className="p-6">
              <h3 className="mb-4 text-lg font-semibold text-body">
                Cumulatieve besparing (24 maanden)
              </h3>
              <div className="h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={graphData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="color-mix(in oklab, var(--fg) 8%, transparent)" />
                    <XAxis
                      dataKey="month"
                      label={{ value: 'Maanden', position: 'insideBottom', offset: -5 }}
                      stroke="var(--fg-muted)"
                      tick={{ fill: 'var(--fg-subtle)', fontSize: 12 }}
                    />
                    <YAxis
                      tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
                      stroke="var(--fg-muted)"
                      tick={{ fill: 'var(--fg-subtle)', fontSize: 12 }}
                    />
                    <Tooltip
                      formatter={(value: number) => formatCurrency(value)}
                      labelFormatter={(label) => `Maand ${label}`}
                      contentStyle={{
                        backgroundColor: 'var(--panel)',
                        border: '1px solid color-mix(in oklab, var(--fg) 12%, transparent)',
                        borderRadius: '12px',
                        padding: '12px'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="cumulative"
                      stroke="var(--brand)"
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-4 text-sm text-[color:var(--fg-subtle)]">
                Breakeven punt na <span className="font-semibold text-[color:var(--brand)]">{paybackMonths} maanden</span>.
                Totale besparing na 2 jaar: <span className="font-semibold text-[color:var(--brand)]">{formatCurrency(automationSavings * 2)}</span>
              </p>
            </CardPremium>

            {/* CTA */}
            <div className="text-center">
              <Link href={`/${locale}/contact?roi=${Math.round(roi)}&savings=${Math.round(automationSavings)}`}>
                <MagneticButton className="w-full min-w-[280px]">
                  Ontvang je persoonlijke blueprint
                  <ArrowRight className="size-5" />
                </MagneticButton>
              </Link>
              <p className="mt-3 text-sm text-[color:var(--fg-muted)]">
                Vrijblijvend gesprek · Reactie binnen 24 uur
              </p>
            </div>
          </motion.div>

        </div>

        {/* Disclaimer */}
        <div className="mx-auto mt-8 max-w-3xl text-center">
          <p className="text-sm text-[color:var(--fg-muted)]">
            <strong>Let op:</strong> De berekening is een voorbeeld en geen garantie.
            Werkelijke resultaten variëren per proces en organisatie.
          </p>
        </div>
      </div>
    </section>
  )
}
