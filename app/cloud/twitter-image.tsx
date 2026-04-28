import { ImageResponse } from 'next/og'

export const alt = 'VibeBrowser Cloud | Agentic Browser Infrastructure'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0d0d1a 0%, #1a0a2e 50%, #0d0d1a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
          position: 'relative',
        }}
      >
        {/* Subtle grid pattern overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'linear-gradient(rgba(167, 139, 250, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(167, 139, 250, 0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Top badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(167, 139, 250, 0.1)',
            border: '1px solid rgba(167, 139, 250, 0.2)',
            borderRadius: '20px',
            padding: '8px 20px',
            marginBottom: '32px',
          }}
        >
          <span style={{ color: '#a78bfa', fontSize: '18px', fontWeight: 600 }}>
            VibeBrowser Cloud
          </span>
        </div>

        {/* Main title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            style={{
              fontSize: '56px',
              fontWeight: 400,
              color: '#e8eaed',
              textAlign: 'center',
              lineHeight: 1.2,
            }}
          >
            Chrome-DevTools MCP
          </span>
          <span
            style={{
              fontSize: '56px',
              fontWeight: 400,
              color: '#a78bfa',
              textAlign: 'center',
              lineHeight: 1.2,
            }}
          >
            in the Cloud
          </span>
        </div>

        {/* Subtitle */}
        <span
          style={{
            fontSize: '22px',
            color: '#9aa0a6',
            marginTop: '24px',
            textAlign: 'center',
            maxWidth: '800px',
          }}
        >
          Global regions · Secure sessions · Open source CLI
        </span>

        {/* Feature pills */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginTop: '40px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {['US Region', 'EU Region', 'Asia Region', 'Token Auth', 'Open Source'].map((pill) => (
            <div
              key={pill}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '6px 16px',
                color: '#9aa0a6',
                fontSize: '16px',
              }}
            >
              {pill}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span style={{ color: '#5f6368', fontSize: '16px' }}>vibebrowser.app/cloud</span>
          <span style={{ color: '#3c4043' }}>|</span>
          <span style={{ color: '#a78bfa', fontSize: '16px' }}>agentic infrastructure</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
