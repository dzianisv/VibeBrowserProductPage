import { ImageResponse } from 'next/og'

export const alt = 'Vibe Browser AI Employees - Autonomous Digital Workers'
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
          background: 'radial-gradient(circle at 18% 18%, rgba(138, 180, 248, 0.22), transparent 26%), radial-gradient(circle at 78% 16%, rgba(129, 201, 149, 0.22), transparent 28%), linear-gradient(135deg, #0a0a0a 0%, #111111 46%, #0a0a0a 100%)',
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
            background: 'rgba(138, 180, 248, 0.1)',
            border: '1px solid rgba(138, 180, 248, 0.2)',
            borderRadius: '20px',
            padding: '8px 20px',
            marginBottom: '32px',
          }}
        >
          <span style={{ color: '#8ab4f8', fontSize: '18px', fontWeight: 600 }}>
            AI Employee Platform
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
              fontSize: '56px',
              fontWeight: 400,
              color: '#f0f4ff',
              textAlign: 'center',
              lineHeight: 1.2,
            }}
          >
            Hire Your
          </span>
          <span
            style={{
              fontSize: '56px',
              fontWeight: 400,
              color: '#8ab4f8',
              textAlign: 'center',
              lineHeight: 1.2,
            }}
          >
            AI Employee
          </span>
        </div>

        <span
          style={{
            fontSize: '22px',
            color: '#9aa0a6',
            marginTop: '24px',
            textAlign: 'center',
            maxWidth: '820px',
          }}
        >
          Real role · Real browser access · Real tools · Works while you sleep
        </span>
      </div>
    ),
    {
      ...size,
    }
  )
}
