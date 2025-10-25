/**
 * Lead Capture API Endpoint
 * Validates input, creates ClickUp task, sends Resend confirmation email
 * Rate-limited to prevent spam
 */

import { NextRequest, NextResponse } from 'next/server'
import type { RoiInputs } from '@/components/roi/types'

interface LeadRequest {
  // Contact info
  name: string
  email: string
  phone?: string
  company?: string
  message?: string

  // ROI calculator data (optional)
  roiInputs?: RoiInputs
  annualSavings?: number

  // Source tracking
  source?: string // 'roi_calculator' | 'contact_form' | 'prijzen_page'
  page?: string
}

interface LeadResponse {
  success: boolean
  message: string
  leadId?: string
}

// Simple in-memory rate limit (use Redis in production)
const rateLimitMap = new Map<string, number[]>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX = 3 // 3 requests per minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const requests = rateLimitMap.get(ip) || []

  // Remove old requests outside window
  const recentRequests = requests.filter((time) => now - time < RATE_LIMIT_WINDOW)

  if (recentRequests.length >= RATE_LIMIT_MAX) {
    return false
  }

  recentRequests.push(now)
  rateLimitMap.set(ip, recentRequests)
  return true
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validatePhone(phone?: string): boolean {
  if (!phone) return true // Optional
  const phoneRegex = /^[\d\s\+\-\(\)]{8,}$/
  return phoneRegex.test(phone)
}

function sanitizeInput(input: string): string {
  return input.trim().slice(0, 500) // Max 500 chars
}

async function createClickUpTask(lead: LeadRequest): Promise<string> {
  // TODO: Implement ClickUp API integration
  // const CLICKUP_API_KEY = process.env.CLICKUP_API_KEY
  // const CLICKUP_LIST_ID = process.env.CLICKUP_LIST_ID

  // Example structure:
  // const response = await fetch(`https://api.clickup.com/api/v2/list/${CLICKUP_LIST_ID}/task`, {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': CLICKUP_API_KEY!,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     name: `Lead: ${lead.name} - ${lead.company || 'No company'}`,
  //     description: `
  //       Email: ${lead.email}
  //       Phone: ${lead.phone || 'N/A'}
  //       Source: ${lead.source || 'Unknown'}
  //       Message: ${lead.message || 'N/A'}
  //       ${lead.annualSavings ? `ROI: €${lead.annualSavings.toLocaleString('nl-NL')}/year` : ''}
  //     `,
  //     tags: [lead.source || 'website', 'lead'],
  //     priority: 3,
  //     status: 'to do',
  //   }),
  // })

  // const data = await response.json()
  // return data.id

  // Stub for now
  console.log('ClickUp task would be created:', lead)
  return `STUB-${Date.now()}`
}

async function sendConfirmationEmail(lead: LeadRequest): Promise<void> {
  // TODO: Implement Resend integration
  // const RESEND_API_KEY = process.env.RESEND_API_KEY

  // Example structure:
  // await fetch('https://api.resend.com/emails', {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Bearer ${RESEND_API_KEY}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     from: 'Caribbean Azure <info@caribbeanazure.com>',
  //     to: lead.email,
  //     subject: 'Bedankt voor je aanvraag - Caribbean Azure',
  //     html: `
  //       <h1>Bedankt voor je aanvraag, ${lead.name}</h1>
  //       <p>We hebben je bericht ontvangen en nemen binnen 24 uur contact met je op.</p>
  //       ${lead.annualSavings ? `<p>Op basis van je ROI-berekening kan je team mogelijk <strong>€${lead.annualSavings.toLocaleString('nl-NL')}</strong> per jaar besparen.</p>` : ''}
  //       <p>Met vriendelijke groet,<br/>Team Caribbean Azure</p>
  //     `,
  //   }),
  // })

  // Stub for now
  console.log('Confirmation email would be sent to:', lead.email)
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, message: 'Te veel verzoeken. Probeer het over een minuut opnieuw.' },
        { status: 429 }
      )
    }

    // Parse body
    const body: LeadRequest = await request.json()

    // Validate required fields
    if (!body.name || body.name.length < 2) {
      return NextResponse.json(
        { success: false, message: 'Naam is verplicht (minimaal 2 tekens)' },
        { status: 400 }
      )
    }

    if (!body.email || !validateEmail(body.email)) {
      return NextResponse.json(
        { success: false, message: 'Geldig e-mailadres is verplicht' },
        { status: 400 }
      )
    }

    if (!validatePhone(body.phone)) {
      return NextResponse.json(
        { success: false, message: 'Ongeldig telefoonnummer' },
        { status: 400 }
      )
    }

    // Sanitize inputs
    const sanitizedLead: LeadRequest = {
      name: sanitizeInput(body.name),
      email: sanitizeInput(body.email),
      phone: body.phone ? sanitizeInput(body.phone) : undefined,
      company: body.company ? sanitizeInput(body.company) : undefined,
      message: body.message ? sanitizeInput(body.message) : undefined,
      roiInputs: body.roiInputs,
      annualSavings: body.annualSavings,
      source: body.source || 'unknown',
      page: body.page,
    }

    // Create ClickUp task
    const taskId = await createClickUpTask(sanitizedLead)

    // Send confirmation email
    await sendConfirmationEmail(sanitizedLead)

    // Log (PII-safe: no email/phone)
    console.log(`Lead created: ${taskId}`, {
      source: sanitizedLead.source,
      hasROI: !!sanitizedLead.annualSavings,
      timestamp: new Date().toISOString(),
    })

    // Track analytics event (server-side)
    // TODO: Send to Plausible or analytics service
    // await fetch('https://plausible.io/api/event', { ... })

    return NextResponse.json({
      success: true,
      message: 'Bedankt! We nemen binnen 24 uur contact met je op.',
      leadId: taskId,
    })
  } catch (error) {
    console.error('Lead API error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Er ging iets mis. Probeer het opnieuw of neem direct contact op via info@caribbeanazure.com',
      },
      { status: 500 }
    )
  }
}

// OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
