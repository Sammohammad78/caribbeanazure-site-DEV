'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

const contactSchema = z.object({
  name: z.string().min(2, 'Naam moet minimaal 2 karakters zijn'),
  email: z.string().email('Ongeldig emailadres'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Bericht moet minimaal 10 karakters zijn'),
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

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
            Naam *
          </label>
          <Input
            id="name"
            {...register('name')}
            placeholder="Uw naam"
            disabled={status === 'loading'}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email *
          </label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="uw.email@voorbeeld.nl"
            disabled={status === 'loading'}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">
            Telefoon (optioneel)
          </label>
          <Input
            id="phone"
            type="tel"
            {...register('phone')}
            placeholder="+31 6 1234 5678"
            disabled={status === 'loading'}
          />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium">
            Bericht *
          </label>
          <Textarea
            id="message"
            {...register('message')}
            placeholder="Vertel ons waar we u mee kunnen helpen..."
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
              Bedankt! We nemen spoedig contact op.
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="flex items-center space-x-2 rounded-lg bg-destructive/10 p-4 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <p className="text-sm font-medium">
              Er ging iets mis. Probeer het opnieuw.
            </p>
          </div>
        )}

        {/* Submit button */}
        <Button type="submit" className="w-full" disabled={status === 'loading'}>
          {status === 'loading' ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verzenden...
            </>
          ) : (
            'Verstuur'
          )}
        </Button>
      </form>
    </Card>
  )
}
