'use client'

import { useState, useEffect, useRef } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface DisplayLine {
  id: number
  kind: 'prompt' | 'output' | 'md' | 'info'
  text: string
}

type Step =
  | { kind: 'type'; text: string }
  | { kind: 'output'; text: string; lineKind?: DisplayLine['kind'] }
  | { kind: 'pause'; ms: number }

// ─── Scripts ─────────────────────────────────────────────────────────────────

const SCRIPTS: Record<'local' | 'cloud', Step[]> = {
  local: [
    { kind: 'output', text: '# Local mode — control your own Chrome', lineKind: 'info' },
    { kind: 'pause', ms: 400 },
    { kind: 'type', text: 'npx @vibebrowser/mcp' },
    { kind: 'output', text: '✓ Relay daemon started\n✓ Extension connected — session local-1, 4 tabs open' },
    { kind: 'pause', ms: 600 },
    { kind: 'type', text: 'vibebrowser-cli navigate https://mail.google.com' },
    { kind: 'output', text: '✓ Navigated  ·  already logged in as alice@example.com' },
    { kind: 'pause', ms: 400 },
    { kind: 'type', text: 'vibebrowser-cli snapshot' },
    {
      kind: 'output',
      lineKind: 'md',
      text: '# Gmail — Inbox\n\n**12 unread messages**\n\n- **Alice Chen** · Meeting tomorrow 10am · 9:41am\n- **GitHub** · PR #42 approved and merged · 8:30am\n- **Stripe** · Invoice #1042 paid · Yesterday\n\n[Compose]  [Inbox 12]  [Sent]',
    },
    { kind: 'output', text: '  → 1.1 KB markdown  (raw HTML was 412 KB — 99.7% smaller)', lineKind: 'info' },
    { kind: 'pause', ms: 2800 },
  ],
  cloud: [
    { kind: 'output', text: '# Cloud mode — cloud IP, always-on, no local machine needed', lineKind: 'info' },
    { kind: 'pause', ms: 400 },
    { kind: 'type', text: 'npx @vibebrowser/mcp --remote f8a2-91cd-4b3e' },
    {
      kind: 'output',
      text: '✓ Connected to VibeBrowser Cloud\n✓ Session f8a2-91cd  ·  IP 45.91.12.34 (us-east-1)\n✓ Pre-authenticated — 2 accounts ready',
    },
    { kind: 'pause', ms: 600 },
    { kind: 'type', text: 'vibebrowser-cli navigate https://github.com/notifications' },
    { kind: 'output', text: '✓ Navigated  ·  logged in as @whoisdzianis' },
    { kind: 'pause', ms: 400 },
    { kind: 'type', text: 'vibebrowser-cli snapshot' },
    {
      kind: 'output',
      lineKind: 'md',
      text: '# GitHub Notifications\n\n**3 unread**\n\n- **[vibe-mcp]** PR #42 merged by @alice — 2h ago\n- **[extension]** Issue #18: Add proxy support — 5h ago\n- **[anthropics/sdk]** You were mentioned — 1d ago\n\n[Mark all read]  [Filter ▾]',
    },
    { kind: 'output', text: '  → 890 B markdown  (raw HTML was 178 KB — 99.5% smaller)', lineKind: 'info' },
    { kind: 'pause', ms: 2800 },
  ],
}

const CHAR_MS = 30

// ─── Sub-components ───────────────────────────────────────────────────────────

function TerminalLine({ line }: { line: DisplayLine }) {
  if (line.kind === 'prompt') {
    return (
      <div className="flex gap-2 text-emerald-400">
        <span className="text-slate-600 select-none shrink-0">$</span>
        <span>{line.text}</span>
      </div>
    )
  }

  if (line.kind === 'md') {
    return (
      <div className="relative mt-2 mb-1 rounded-lg bg-purple-950/50 border border-purple-700/40 px-3 pt-4 pb-2.5 text-xs leading-relaxed">
        <span className="absolute -top-2.5 right-2 bg-purple-600 text-white text-[10px] px-2 py-0.5 rounded-full font-sans font-semibold tracking-wide">
          markdown
        </span>
        {line.text.split('\n').map((l, i) => (
          <div
            key={i}
            className={
              l.startsWith('#')
                ? 'font-bold text-purple-100 text-sm mb-1'
                : l.startsWith('**') && l.endsWith('**')
                ? 'font-semibold text-purple-200 mt-1'
                : l.startsWith('-')
                ? 'text-purple-300/90 pl-1'
                : l.startsWith('[')
                ? 'text-blue-400/80 mt-1'
                : 'text-purple-300/70'
            }
          >
            {l || '\u00a0'}
          </div>
        ))}
      </div>
    )
  }

  if (line.kind === 'info') {
    return (
      <div className="text-slate-500 italic text-xs mt-1">
        {line.text.split('\n').map((l, i) => (
          <div key={i}>{l || '\u00a0'}</div>
        ))}
      </div>
    )
  }

  // output
  return (
    <div className="text-slate-300 text-xs leading-relaxed">
      {line.text.split('\n').map((l, i) => (
        <div key={i} className={l.startsWith('✓') ? 'text-emerald-400/90' : ''}>
          {l || '\u00a0'}
        </div>
      ))}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function CliDemo() {
  const [mode, setMode] = useState<'local' | 'cloud'>('cloud')
  const [displayed, setDisplayed] = useState<DisplayLine[]>([])
  const [typing, setTyping] = useState('')
  const [cursorOn, setCursorOn] = useState(true)
  const endRef = useRef<HTMLDivElement>(null)
  const lineId = useRef(0)
  const nextId = () => ++lineId.current

  // Cursor blink
  useEffect(() => {
    const t = setInterval(() => setCursorOn((v) => !v), 530)
    return () => clearInterval(t)
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [displayed, typing])

  // Animation player
  useEffect(() => {
    let active = true
    let timerId: ReturnType<typeof setTimeout>

    const delay = (ms: number) =>
      new Promise<void>((resolve) => {
        timerId = setTimeout(resolve, ms)
      })

    async function play() {
      setDisplayed([])
      setTyping('')

      while (active) {
        for (const step of SCRIPTS[mode]) {
          if (!active) return

          if (step.kind === 'pause') {
            await delay(step.ms)
          } else if (step.kind === 'output') {
            if (!active) return
            setDisplayed((prev) => [
              ...prev,
              { id: nextId(), kind: step.lineKind ?? 'output', text: step.text },
            ])
            await delay(60)
          } else if (step.kind === 'type') {
            for (let i = 0; i <= step.text.length; i++) {
              if (!active) return
              setTyping(step.text.slice(0, i))
              await delay(CHAR_MS)
            }
            if (!active) return
            setDisplayed((prev) => [
              ...prev,
              { id: nextId(), kind: 'prompt', text: step.text },
            ])
            setTyping('')
            await delay(200)
          }
        }

        if (!active) return
        await delay(1200)
        setDisplayed([])
        setTyping('')
        await delay(400)
      }
    }

    play()

    return () => {
      active = false
      clearTimeout(timerId)
    }
  }, [mode])

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-700/60 shadow-2xl bg-slate-950 font-mono text-sm select-none">
      {/* Title bar */}
      <div className="flex items-center gap-1.5 px-4 py-3 bg-slate-900 border-b border-slate-800">
        <div className="w-3 h-3 rounded-full bg-red-500/75" />
        <div className="w-3 h-3 rounded-full bg-amber-500/75" />
        <div className="w-3 h-3 rounded-full bg-emerald-500/75" />
        <span className="text-slate-500 text-xs ml-3 flex-1">vibebrowser-cli</span>
        {/* Mode tabs */}
        <div className="flex rounded-md border border-slate-700 overflow-hidden text-xs">
          <button
            onClick={() => setMode('local')}
            className={`px-3 py-1 transition-colors ${
              mode === 'local'
                ? 'bg-purple-600 text-white'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            Local
          </button>
          <button
            onClick={() => setMode('cloud')}
            className={`px-3 py-1 transition-colors border-l border-slate-700 ${
              mode === 'cloud'
                ? 'bg-purple-600 text-white'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            ☁ Cloud
          </button>
        </div>
      </div>

      {/* Terminal body */}
      <div className="p-5 h-72 overflow-y-auto space-y-0.5 [scrollbar-width:none]">
        {displayed.map((line) => (
          <TerminalLine key={line.id} line={line} />
        ))}

        {/* Typing line */}
        <div className="flex items-center gap-2 text-emerald-400 min-h-[1.25rem] text-xs">
          <span className="text-slate-600 select-none shrink-0">$</span>
          <span>{typing}</span>
          <span
            className={`inline-block w-[7px] h-[14px] bg-emerald-400 transition-opacity duration-100 ${
              cursorOn ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        <div ref={endRef} />
      </div>

      {/* Footer badge */}
      <div className="px-5 py-2.5 bg-slate-900/60 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-500">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        Snapshot output is{' '}
        <span className="text-purple-400 font-semibold">markdown</span>
        {' '}— compact, structured, perfect for agent context windows
      </div>
    </div>
  )
}
