'use client'

import { useState, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

type ContactFormData = {
  name: string
  email: string
  phone?: string
  message: string
}

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const t = useTranslations('common.contactForm')

  // Create schema with translated error messages
  const contactSchema = useMemo(() => z.object({
    name: z.string().min(2, t('fields.name.required')),
    email: z.string().email(t('fields.email.invalid')),
    phone: z.string().optional(),
    message: z.string().min(10, t('fields.message.required')),
  }), [t])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Failed to send message')

      setStatus('success')
      reset()

      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            {t('fields.name.label')} {t('requiredField')}
          </label>
          <Input
            id="name"
            {...register('name')}
            placeholder={t('fields.name.placeholder')}
            disabled={status === 'loading'}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            {t('fields.email.label')} {t('requiredField')}
          </label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder={t('fields.email.placeholder')}
            disabled={status === 'loading'}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">
            {t('fields.phone.label')}
          </label>
          <Input
            id="phone"
            type="tel"
            {...register('phone')}
            placeholder={t('fields.phone.placeholder')}
            disabled={status === 'loading'}
          />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium">
            {t('fields.message.label')} {t('requiredField')}
          </label>
          <Textarea
            id="message"
            {...register('message')}
            placeholder={t('fields.message.placeholder')}
            rows={6}
            disabled={status === 'loading'}
          />
          {errors.message && (
            <p className="text-sm text-destructive">{errors.message.message}</p>
          )}
        </div>

        {/* Status messages */}
        {status === 'success' && (
          <div className="flex items-center space-x-2 rounded-lg bg-accent/10 p-4 text-accent">
            <CheckCircle2 className="h-5 w-5" />
            <p className="text-sm font-medium">
              {t('status.success')}
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="flex items-center space-x-2 rounded-lg bg-destructive/10 p-4 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <p className="text-sm font-medium">
              {t('status.error')}
            </p>
          </div>
        )}

        {/* Submit button */}
        <Button type="submit" className="w-full" disabled={status === 'loading'}>
          {status === 'loading' ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t('status.sending')}
            </>
          ) : (
            t('submit')
          )}
        </Button>
      </form>
    </Card>
  )
}
