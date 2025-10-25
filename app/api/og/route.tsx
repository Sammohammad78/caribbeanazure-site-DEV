import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Get dynamic parameters from query string
    const title = searchParams.get('title') || 'Slimmer werken. Minder gedoe. Meer resultaat.'
    const subtitle = searchParams.get('subtitle') || 'Caribbean Azure Automation Studio'

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundImage: 'linear-gradient(135deg, #0A2A43 0%, #0F5E9C 50%, #4BA3F7 100%)',
            padding: '80px',
          }}
        >
          {/* Background pattern overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 80% 20%, rgba(75, 163, 247, 0.3) 0%, transparent 50%)',
            }}
          />

          {/* Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              zIndex: 1,
            }}
          >
            {/* Logo/Brand */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#4BA3F7',
                  boxShadow: '0 0 24px rgba(75, 163, 247, 0.8)',
                }}
              />
              <span
                style={{
                  fontSize: '28px',
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.9)',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                {subtitle}
              </span>
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: '72px',
                fontWeight: 700,
                color: 'white',
                lineHeight: 1.1,
                margin: 0,
                maxWidth: '900px',
                letterSpacing: '-0.02em',
              }}
            >
              {title}
            </h1>

            {/* Accent bar */}
            <div
              style={{
                width: '120px',
                height: '6px',
                background: 'linear-gradient(90deg, #FFB703 0%, rgba(255, 183, 3, 0) 100%)',
                borderRadius: '3px',
                marginTop: '12px',
              }}
            />

            {/* Footer */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '32px',
                marginTop: '40px',
                fontSize: '24px',
                color: 'rgba(255, 255, 255, 0.7)',
              }}
            >
              <span>caribbeanazure.com</span>
              <div
                style={{
                  width: '2px',
                  height: '28px',
                  background: 'rgba(255, 255, 255, 0.3)',
                }}
              />
              <span>info@caribbeanazure.com</span>
            </div>
          </div>

          {/* Decorative circle */}
          <div
            style={{
              position: 'absolute',
              right: '-100px',
              bottom: '-100px',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(75, 163, 247, 0.2) 0%, transparent 70%)',
              border: '2px solid rgba(75, 163, 247, 0.3)',
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (error) {
    console.error('OG image generation error:', error)
    return new Response('Failed to generate image', { status: 500 })
  }
}
