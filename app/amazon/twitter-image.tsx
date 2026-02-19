import { ImageResponse } from 'next/og'

export const alt = 'Vibe Co-Pilot for Amazon Sellers - AI FBA Automation'
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
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d1810 50%, #1a1a1a 100%)',
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
        {/* Amazon orange accent */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(180deg, rgba(255, 153, 0, 0.05) 0%, transparent 30%, transparent 70%, rgba(255, 153, 0, 0.05) 100%)',
          }}
        />

        {/* Top badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 153, 0, 0.15)',
            border: '1px solid rgba(255, 153, 0, 0.3)',
            borderRadius: '20px',
            padding: '8px 20px',
            marginBottom: '32px',
          }}
        >
          <span style={{ color: '#FF9900', fontSize: '18px', fontWeight: 600 }}>
            Amazon FBA Automation
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
              color: '#ffffff',
              textAlign: 'center',
              lineHeight: 1.2,
            }}
          >
            Scale Your Amazon Business
          </span>
          <span
            style={{
              fontSize: '56px',
              fontWeight: 400,
              color: '#FF9900',
              textAlign: 'center',
              lineHeight: 1.2,
            }}
          >
            Without the Burnout
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
          AI-powered inventory, listings, PPC, repricing & customer service
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
          {['Inventory Forecasting', 'Listing SEO', 'PPC Automation', 'Dynamic Repricing'].map((feature) => (
            <div
              key={feature}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '6px 16px',
                color: '#9aa0a6',
                fontSize: '16px',
              }}
            >
              {feature}
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
          <span style={{ color: '#5f6368', fontSize: '16px' }}>vibebrowser.app/amazon</span>
          <span style={{ color: '#3c4043' }}>|</span>
          <span style={{ color: '#FF9900', fontSize: '16px', fontFamily: 'monospace' }}>Vibe Co-Pilot</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
