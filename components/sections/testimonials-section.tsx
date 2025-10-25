'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

export function TestimonialsSection() {
  const t = useTranslations('testimonials')

  const testimonials = [
    {
      quote: t('items.0.quote'),
      author: t('items.0.author'),
      company: t('items.0.company'),
      result: t('items.0.result'),
    },
    {
      quote: t('items.1.quote'),
      author: t('items.1.author'),
      company: t('items.1.company'),
      result: t('items.1.result'),
    },
    {
      quote: t('items.2.quote'),
      author: t('items.2.author'),
      company: t('items.2.company'),
      result: t('items.2.result'),
    },
  ]

  return (
    <section className="relative overflow-hidden bg-[color:var(--panel)] py-20 md:py-28">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="mx-auto mb-16 max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-4 text-center font-bold tracking-tight">
            {t('title')}
          </h2>
          <p className="copy-20 text-[color:var(--fg-subtle)]">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="card flex flex-col gap-6 p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Quote Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--brand-soft)]">
                <Quote className="h-6 w-6 text-[color:var(--brand)]" />
              </div>

              {/* Quote */}
              <blockquote className="flex-grow text-base leading-relaxed text-[color:var(--fg)]">
                "{testimonial.quote}"
              </blockquote>

              {/* Result Badge */}
              <div className="rounded-lg bg-[color:var(--accent-soft)] px-4 py-2">
                <p className="text-sm font-semibold text-[color:var(--fg)]">
                  ✨ {testimonial.result}
                </p>
              </div>

              {/* Author */}
              <div className="border-t border-[color:var(--border)] pt-4">
                <p className="font-semibold text-[color:var(--fg)]">
                  {testimonial.author}
                </p>
                <p className="text-sm text-[color:var(--fg-muted)]">
                  {testimonial.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
