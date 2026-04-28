---
title: "We forked opencode. Here's what we changed."
description: "Running opencode in serve mode across 10+ repos daily. We kept hitting the same UX gaps and reliability bugs. At some point we stopped filing issues and started shipping patches."
date: "2026-04-03"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - engineering
  - opencode
  - devex
published: true
---

We use [opencode](https://github.com/anomalyco/opencode) and OpenAI Codex CLI as daily coding agents. Not experiments — actual tools we ship code with. At some point we stopped filing GitHub issues and started maintaining a fork.

This is a writeup of what annoyed us enough to patch.

---

## Why opencode specifically

The short version: it doesn't lock you in. You can point it at Claude, GPT-5, Gemini, DeepSeek, or a local model, and switch without touching your workflow. That matters when pricing shifts mid-sprint. We've swapped providers three times in a month without changing a single prompt or config file beyond `~/.opencode/config.json`.

The other thing is `opencode serve`. It runs a web server with a full UI. We check running sessions and approve tool permissions from a phone over Tailscale. That sounds like a gimmick until you're traveling and need to unblock an overnight agent run at 11pm.

It's also MIT licensed and written in TypeScript, so when something breaks we can actually read the source and fix it instead of filing an issue and waiting.

---

## The UX thing that broke first: finding sessions

The sidebar in upstream opencode is per-directory. You open a folder, you see its sessions. Fine for a single repo. We're usually running agents across 3–4 repos simultaneously plus whatever worktrees are active from overnight runs.

Every morning the workflow was: open repo 1, scroll through sessions, remember what you were doing. Switch to repo 2, repeat. There's no global view.

We added a `/recent` page. It calls a new API endpoint (`/global/session/list`) and shows all sessions sorted by last update time, grouped into Today / Yesterday / Previous 7 Days / by month. Sessions from git worktrees show with their worktree path. Fork sessions (when you branch a session into a sub-agent) are indented under their parent.

The thing that made it actually useful: diff stats. The session summary includes lines added/deleted from the last git diff, so you can immediately tell which sessions produced code and which ones just spun.

```
Today
  Implement OAuth token refresh    packages/api    2h ago    +89 -12
  Fix race in websocket handler    packages/ws     4h ago    +14 -3
Yesterday
  Add browser MCP tool             tools/browser   1d ago    +312 -0
  Debug session memory leak        packages/core   1d ago    +28 -91
```

There's also a search box that filters across all sessions with 300ms debounce. Useful when you remember a session title but not which repo it was in.

---

## Spinners that never stop

Restart opencode while an agent is mid-generation and the session shows "Thinking..." forever afterward. We had 35 sessions in this state after a crash.

The issue is a missing `time.completed` timestamp on assistant messages. When opencode shuts down mid-stream, the message row exists in the database but never gets its completion time. On the next load, the frontend sees an assistant message with no end time and assumes it's still generating.

The fix is a startup recovery pass:

```typescript
// Session.recover() — runs once at startup
for (const session of sessions) {
  for (const msg of session.messages) {
    if (msg.role !== "assistant") continue
    for (const part of msg.parts) {
      if (part.type === "text" && !part.time?.completed) {
        // set completed = last update time so frontend knows it's done
        await db.update(part).set({ time: { ...part.time, completed: part.time.updated } })
      }
      if (part.type === "tool-invocation" && part.state === "running") {
        await db.update(part).set({ state: "error" })
      }
    }
  }
}
```

That handles the database side. But there was a second issue: even with clean database state, the frontend `pending` memo in `message-timeline.tsx` would still show the spinner because it checked message timestamps before the session status SSE had settled. The fix is a short-circuit at the top of the memo:

```typescript
const pending = createMemo(() => {
  if (sessionStatus().type === "idle") return undefined  // trust the live status
  return messages().findLast(
    (m) => m.role === "assistant" && !m.parts.find((p) => p.type === "text" && p.time?.completed)
  )
})
```

One note: `sessionStatus` memo must be defined before `pending` in the component. Solid.js memos track dependencies by execution order and this bit us when we initially had them reversed.

---

## 387 sessions disappeared

This one was our fault. opencode has a `sweepIdle()` function that archives sessions inactive beyond a threshold. The upstream default is 30 minutes. We were experimenting with the sweep logic and forgot to change the default before restarting the server.

Everything that hadn't been touched in the last 30 minutes — which was almost everything — got archived. Sessions don't show in the sidebar when archived. Looked like they were gone.

They weren't. A direct SQL query unarchived them:

```sql
UPDATE session SET archived_at = NULL WHERE archived_at IS NOT NULL;
```

We changed the default to 3 days and added an env var:

```bash
export OPENCODE_SESSION_IDLE_MS=259200000  # 3 days, 0 to disable
```

30 minutes might make sense as a timeout when you're actively using opencode as a TUI tool. In serve mode running background agents it's a disaster.

---

## The chrome-devtools-mcp memory thing

Not an opencode bug exactly, but relevant if you're running browser automation through MCP.

`chrome-devtools-mcp --autoConnect` spawns a Node.js process with a V8 inspector. That process grows. We measured ~13 MB/min under normal agent load. After a few hours it was over 1.6 GB RSS. Combined with multiple opencode sessions holding message history in memory, we hit swap exhaustion and got a kernel panic at 07:33 UTC one morning.

We switched to [Vibe Browser](https://vibebrowser.app) for browser automation. The difference in architecture: `chrome-devtools-mcp` is a standalone server process that stays running. Vibe Browser is a browser extension — it routes agent tool calls through the extension rather than a long-lived server process. No persistent V8 heap accumulation.

Filed upstream issue: [ChromeDevTools/chrome-devtools-mcp#1192](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/1192).

---

## What we don't touch

We rebase onto upstream regularly. The streaming layer, provider integrations, model support — upstream moves fast on these and we don't want to maintain divergence there. Our patches are in the session lifecycle and UI layer. Lower surface area, easier to rebase.

The fork is [github.com/dzianisv/opencode](https://github.com/dzianisv/opencode), `dev` branch. Published to npm as `@vibetechnologies/opencode` for internal use. MIT licensed, copy whatever's useful.

---

*We build [Vibe Browser](https://vibebrowser.app). The opencode web UI + Vibe Browser is how we ship code from a phone.*
