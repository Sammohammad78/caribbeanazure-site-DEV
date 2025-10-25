import { NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = contactSchema.parse(body)

    // Send email via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        await resend.emails.send({
          from: 'Caribbean Azure <onboarding@resend.dev>', // Use verified domain in production
          to: 'info@caribbeanazure.com',
          replyTo: data.email,
          subject: `Nieuw contactformulier bericht van ${data.name}`,
          html: `
            <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #0F5E9C; border-bottom: 2px solid #4BA3F7; padding-bottom: 12px;">
                Nieuwe contactaanvraag
              </h2>

              <div style="margin: 24px 0; padding: 20px; background: #F7F7F5; border-radius: 12px;">
                <p style="margin: 8px 0;"><strong>Naam:</strong> ${data.name}</p>
                <p style="margin: 8px 0;"><strong>E-mail:</strong> <a href="mailto:${data.email}" style="color: #0F5E9C;">${data.email}</a></p>
                ${data.phone ? `<p style="margin: 8px 0;"><strong>Telefoon:</strong> ${data.phone}</p>` : ''}
              </div>

              <div style="margin: 24px 0;">
                <p style="margin-bottom: 8px;"><strong>Bericht:</strong></p>
                <div style="padding: 16px; background: white; border-left: 4px solid #4BA3F7; border-radius: 4px;">
                  ${data.message.replace(/\n/g, '<br>')}
                </div>
              </div>

              <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #E3E3E3; color: #6B7280; font-size: 14px;">
                <p>Verzonden via caribbeanazure.com contactformulier</p>
              </div>
            </div>
          `,
        })

        console.log('Contact form email sent successfully:', { name: data.name, email: data.email })
      } catch (emailError) {
        console.error('Failed to send email via Resend:', emailError)
        // Continue anyway to not block the user
      }
    } else {
      console.log('Resend API key not configured. Contact form submission:', data)
    }

    return NextResponse.json(
      { success: true, message: 'Bericht succesvol verzonden' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid form data', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
