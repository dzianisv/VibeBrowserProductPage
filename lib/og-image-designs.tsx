import type { ReactElement } from 'react'
import { renderBlogIndexSocialImage } from '@/lib/blog-social-image'

type OgImageDesign = () => ReactElement

export const ogImageDesigns: Record<string, OgImageDesign> = {
  amazon: () => (
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
  mcp: () => (
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
          Control Your Browser from
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
          Any AI Agent
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
        Hosted · Streamable HTTP · No local process
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
        {['Claude Code', 'Codex CLI', 'Copilot', 'Cursor', 'OpenCode'].map((agent) => (
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
        <span style={{ color: '#9aa0a6', fontSize: '16px' }}>vibebrowser.app/mcp</span>
        <span style={{ color: '#3c4043' }}>|</span>
        <span style={{ color: '#81c995', fontSize: '16px', fontFamily: 'monospace' }}>relay.api.vibebrowser.app</span>
      </div>
    </div>
  ),
  'mcp-twitter': () => (
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
        <span>Hosted</span>
        <span style={{ color: '#3c4043' }}>|</span>
        <span>Streamable HTTP</span>
        <span style={{ color: '#3c4043' }}>|</span>
        <span>No local process</span>
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
        <span style={{ color: '#81c995', fontSize: '16px', fontFamily: 'monospace' }}>relay.api.vibebrowser.app</span>
      </div>
    </div>
  ),
  'mcp-stdio': () => (
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
  'mcp-stdio-twitter': () => (
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
            fontSize: '52px',
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
            fontSize: '52px',
            fontWeight: 400,
            color: '#81c995',
            textAlign: 'center',
            lineHeight: 1.2,
          }}
        >
          Runs on your machine
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
        <span>Local process</span>
        <span style={{ color: '#3c4043' }}>|</span>
        <span>No internet relay</span>
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
        <span style={{ color: '#81c995', fontSize: '16px', fontFamily: 'monospace' }}>vibebrowser-mcp</span>
      </div>
    </div>
  ),
  openclaw: () => (
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
            fontSize: '56px',
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
            fontSize: '56px',
            fontWeight: 400,
            color: '#9e9eff',
            textAlign: 'center',
            lineHeight: 1.2,
          }}
        >
          for OpenClaw Flows
        </span>
      </div>

      <span
        style={{
          fontSize: '22px',
          color: '#c4cbe0',
          marginTop: '24px',
          textAlign: 'center',
          maxWidth: '820px',
        }}
      >
        vibebrowser-cli | remote relay | logged-in browser session
      </span>
    </div>
  ),
  'openclaw-twitter': () => (
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
  ollama: () => (
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
  blog: () => renderBlogIndexSocialImage(),
}
