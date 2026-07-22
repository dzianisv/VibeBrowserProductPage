import { ImageResponse } from 'next/og'

export const alt = 'Vibe Browser for Agents - MCP over stdio (Local)'
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
          background: 'linear-gradient(135deg, #0a0a0a 0%, #14231a 50%, #0a0a0a 100%)',
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
            backgroundImage: 'linear-gradient(rgba(129, 201, 149, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(129, 201, 149, 0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Top badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(129, 201, 149, 0.1)',
            border: '1px solid rgba(129, 201, 149, 0.2)',
            borderRadius: '20px',
            padding: '8px 20px',
            marginBottom: '32px',
          }}
        >
          <span style={{ color: '#81c995', fontSize: '18px', fontWeight: 600 }}>
            Vibe Browser for Agents
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
            MCP over stdio
          </span>
          <span
            style={{
              fontSize: '56px',
              fontWeight: 400,
              color: '#81c995',
              textAlign: 'center',
              lineHeight: 1.2,
            }}
          >
            Runs on your machine
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
          Local process · No Vibe internet relay · Bridge stays on your machine
        </span>

        {/* Agent badges */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginTop: '40px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {['Claude Code', 'Cursor', 'VS Code', 'OpenCode', 'Windsurf', 'Gemini'].map((agent) => (
            <div
              key={agent}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '6px 16px',
                color: '#9aa0a6',
                fontSize: '16px',
              }}
            >
              {agent}
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
          <span style={{ color: '#9aa0a6', fontSize: '16px' }}>vibebrowser.app/mcp-stdio</span>
          <span style={{ color: '#3c4043' }}>|</span>
          <span style={{ color: '#81c995', fontSize: '16px', fontFamily: 'monospace' }}>vibebrowser-mcp</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
