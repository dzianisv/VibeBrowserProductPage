import { ImageResponse } from "next/og"

export const alt =
  "AgentPod Mobile — your own AI coding agent on your phone. Android · BYOK · On-device"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, color: "#e8eaed" }}>
            AgentPod
          </div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, color: "#fdd663" }}>
            Mobile
          </div>
        </div>

        {/* Middle block */}
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div style={{ display: "flex", gap: 12 }}>
            {["Android", "BYOK", "On-device", "No subscription"].map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  fontSize: 22,
                  color: "#81c995",
                  border: "1px solid #2a3a2f",
                  background: "rgba(129,201,149,0.08)",
                  borderRadius: 999,
                  padding: "6px 18px",
                }}
              >
                {t}
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 18,
              fontSize: 74,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 1040,
            }}
          >
            <div style={{ display: "flex", color: "#e8eaed" }}>Your own AI coding agent,</div>
            <div style={{ display: "flex", color: "#fdd663" }}>on your phone</div>
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#9aa0a6", maxWidth: 960, lineHeight: 1.35 }}>
            Bring your own key. A real Termux Linux runtime + Node.js gateway, on-device — your key,
            your provider, no middleman.
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", fontSize: 24, color: "#9aa0a6" }}>
            agentpod.agentlabs.cc
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#5f6368" }}>
            Azure OpenAI · OpenAI · Anthropic · OpenRouter · Copilot
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
