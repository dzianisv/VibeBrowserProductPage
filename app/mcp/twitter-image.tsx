import { ImageResponse } from 'next/og'

export const alt = 'Vibe MCP Server - Browser Automation for AI Agents'
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
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)',
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
        {/* Top badge */}
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
            Vibe MCP Server
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
              fontSize: '52px',
              fontWeight: 400,
              color: '#e8eaed',
              textAlign: 'center',
              lineHeight: 1.2,
            }}
          >
            Control Your Browser from
          </span>
          <span
            style={{
              fontSize: '52px',
              fontWeight: 400,
              color: '#8ab4f8',
              textAlign: 'center',
              lineHeight: 1.2,
            }}
          >
            Any AI Agent
          </span>
        </div>

        {/* Key features */}
        <div
          style={{
            display: 'flex',
            gap: '24px',
            marginTop: '36px',
            color: '#9aa0a6',
            fontSize: '20px',
          }}
        >
          <span>Multi-agent</span>
          <span style={{ color: '#3c4043' }}>|</span>
          <span>25+ tools</span>
          <span style={{ color: '#3c4043' }}>|</span>
          <span>Open source MCP</span>
        </div>

        {/* Bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span style={{ color: '#81c995', fontSize: '16px', fontFamily: 'monospace' }}>npx @vibebrowser/mcp</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
