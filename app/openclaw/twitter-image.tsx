import { ImageResponse } from 'next/og'

export const alt = 'Vibe Browser for OpenClaw - Real Browser CLI'
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
          background: 'radial-gradient(circle at 18% 18%, rgba(255, 77, 77, 0.22), transparent 26%), radial-gradient(circle at 78% 16%, rgba(158, 158, 255, 0.22), transparent 28%), linear-gradient(135deg, #050810 0%, #0a1020 46%, #050810 100%)',
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
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 77, 77, 0.1)',
            border: '1px solid rgba(255, 77, 77, 0.2)',
            borderRadius: '20px',
            padding: '8px 20px',
            marginBottom: '32px',
          }}
        >
          <span style={{ color: '#ff6b6b', fontSize: '18px', fontWeight: 600 }}>
            Vibe Browser for OpenClaw
          </span>
        </div>

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
              fontSize: '52px',
              fontWeight: 400,
              color: '#f0f4ff',
              textAlign: 'center',
              lineHeight: 1.2,
            }}
          >
            Real Browser CLI
          </span>
          <span
            style={{
              fontSize: '52px',
              fontWeight: 400,
              color: '#9e9eff',
              textAlign: 'center',
              lineHeight: 1.2,
            }}
          >
            for OpenClaw Flows
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '24px',
            marginTop: '36px',
            color: '#c4cbe0',
            fontSize: '20px',
          }}
        >
          <span>vibebrowser-cli</span>
          <span style={{ color: 'rgba(136, 146, 176, 0.45)' }}>|</span>
          <span>Remote relay</span>
          <span style={{ color: 'rgba(136, 146, 176, 0.45)' }}>|</span>
          <span>Logged-in session</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
