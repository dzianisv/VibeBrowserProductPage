import { ImageResponse } from 'next/og'

export const alt = 'Vibe Browser + Ollama - Private Local AI'
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
        {/* Subtle grid pattern overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'linear-gradient(rgba(138, 180, 248, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(138, 180, 248, 0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

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
            Self-Hosted Models
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
            Run Vibe Browser with
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
            100% Private, Local AI
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
          Zero data leaves your machine | Offline automation | Free forever
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
          {['Qwen 3.5', 'Llama 3.1', 'DeepSeek R1', 'Gemma 3', 'SmolLM 2'].map((model) => (
            <div
              key={model}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '6px 16px',
                color: '#9aa0a6',
                fontSize: '16px',
              }}
            >
              {model}
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
          <span style={{ color: '#5f6368', fontSize: '16px' }}>vibebrowser.app/providers/ollama</span>
          <span style={{ color: '#3c4043' }}>|</span>
          <span style={{ color: '#81c995', fontSize: '16px', fontFamily: 'monospace' }}>ollama pull qwen3.5</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
