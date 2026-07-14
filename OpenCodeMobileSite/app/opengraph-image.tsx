import { ImageResponse } from 'next/og'

export const alt = 'OpenCode Mobile — Android app, iOS coming soon'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'flex-start',
          background: '#000000',
          color: '#f1ecec',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'sans-serif',
          height: '100%',
          justifyContent: 'space-between',
          padding: '72px 84px',
          width: '100%',
        }}
      >
        <div style={{ display: 'flex', fontSize: 30, fontWeight: 700 }}>
          opencode<span style={{ color: '#8e8b8b', fontWeight: 400 }}>/mobile</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>
            AI coding on Android.
          </div>
          <div style={{ color: '#8e8b8b', display: 'flex', fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>
            iOS next.
          </div>
        </div>
        <div style={{ color: '#8e8b8b', display: 'flex', fontSize: 28 }}>
          Open source · Join the iOS waitlist
        </div>
      </div>
    ),
    size,
  )
}
