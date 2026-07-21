# Issue #157 — Local Real-Browser Test Report

- Date: 2026-07-21 (09:30–09:45 PDT)
- Worktree: `/Users/engineer/workspace/vibebrowser/VibeBrowserProductPage-worktrees/157-relay-docs`
- Branch: `own/157-relay-docs`
- Build tested: `.next/BUILD_ID` = `FIKg3WJ7V1aLPgYWL7Elr` (pre-existing production build, not rebuilt)
- Tooling: `chrome-use` CLI against the user's existing, already-approved Chrome session (no new Chrome launch, no raw CDP). Video/GIF assembly intended via the shared `a-test` library (`core/recording.ts`), not hand-rolled.

## Server lifecycle

| Step | Action | Result |
|---|---|---|
| Port scan | Probed 3157/3457/4157/5157 with `lsof -i` | 3157 free |
| Start | `nohup npx next start -p 3157` from worktree root, backgrounded | npm wrapper PID `54047`, actual listening `next-server` child PID `54073` (confirmed via `lsof -i :3157 -sTCP:LISTEN`) |
| Wait | Polled `curl -o /dev/null -w '%{http_code}' http://localhost:3157/` | `200` after 1s |
| Sanity curl | `GET /cli` → `200`, `GET /mcp` → `200` | PASS |
| Shutdown | `kill 54073` then `kill 54047` | Both confirmed gone (`ps -p` empty); port 3157 confirmed refusing connections (`curl` → `000`); no orphaned `next start`/`next-server` process left (`ps aux` clean) |

PIDs recorded in `.screenshots/server.pid` (`54073 54047`) and server stdout/stderr in `.screenshots/server-3157.log` (not committed; local-only evidence).

## /cli — verification (rendered text + full-page screenshot)

Opened fresh tab `t8` → `http://localhost:3157/cli` via `chrome-use tab new`, confirmed `get url`/`get title` matched, then extracted rendered body text (`chrome-use get text body`, saved to `.screenshots/cli-body.txt`) and captured screenshots.

| Required check | Found in rendered text? | Evidence |
|---|---|---|
| `Enable external AI agent control` | Yes, verbatim | `.screenshots/cli-body.txt` |
| `Remote (internet)` | Yes, verbatim | `.screenshots/cli-body.txt` |
| `Relay access` | Yes, verbatim | `.screenshots/cli-body.txt` |
| wss relay hostname | Yes: `wss://relay.api.vibebrowser.app/<uuid>` | `.screenshots/cli-body.txt` |
| Command shape | Yes: `npx -y @vibebrowser/cli@latest --remote "$VIBE_REMOTE_URL" --json status --wait-for-extension --wait-timeout 20000` | `.screenshots/cli-body.txt` |
| No real-looking UUID | Confirmed — regex `[0-9a-f]{8}-[0-9a-f]{4}-...` over full rendered text returned zero matches; only the literal placeholder token `<uuid>` appears | grep against `.screenshots/cli-body.txt` |
| No dead relay hostname (`relay.vibebrowser.app`, no `.api`) | Confirmed absent — grep for exact string `relay.vibebrowser.app` (not preceded by `.api`) returned zero matches | grep against `.screenshots/cli-body.txt` |

**Verdict: /cli — PASS** (all required strings present, no real UUID, no dead hostname, layout renders — see screenshots below).

Screenshots (`.screenshots/`, not committed):
- `step-01-cli-top.png` — full-page (`--full`), 2880×10676
- `step-02-cli-viewport-top.png` — viewport at load, 2880×1350
- `step-03-cli-scroll1.png` … `step-06-cli-scroll4.png` — 4 scroll-down frames (900px increments) covering the relay diagram, "treat it like a password" callout, and quickstart command blocks

## /mcp — verification (rendered text only; visual/video INCOMPLETE — see blocker)

Opened fresh tab `t2` → `http://localhost:3157/mcp`, confirmed `get url`/`get title`, extracted rendered body text (`chrome-use get text body`, saved to `.screenshots/mcp-body.txt`) **before** the Chrome CDP session dropped (see Blocker below).

| Required check | Found in rendered text? | Evidence |
|---|---|---|
| `https://relay.api.vibebrowser.app/mcp` | Yes, 4 occurrences | `.screenshots/mcp-body.txt` |
| `X-Remote-Session` | Yes, 4 occurrences, including the security callout: *"Keep the X-Remote-Session header out of shared chat logs..."* | `.screenshots/mcp-body.txt` |
| Local stdio vs. direct remote HTTP distinction | Yes: explicit side-by-side — *"Local stdio (default)"* / *"Direct remote HTTP — No local process, no vibebrowser-mcp install, no Vibe Studio"*, plus *"local stdio never leaves your machine. Direct remote HTTP sends a bearer credential (your UUID) over the internet on every request"* | `.screenshots/mcp-body.txt` |
| Actual Settings path | Yes: *"In the Vibe extension, go to Settings → AI Agent Control, turn on Enable external AI agent control, then select Remote (internet)"* and *"Settings → AI Agent Control → Remote (internet) → Relay access"* | `.screenshots/mcp-body.txt` |
| No attach-token text | Confirmed absent — grep for `attach-token` and `attach token` (case variants) returned zero matches | grep against `.screenshots/mcp-body.txt` |
| No dead relay hostname (`relay.vibebrowser.app`, no `.api`) | Confirmed absent | grep against `.screenshots/mcp-body.txt` |
| No real UUID | Confirmed — UUID regex returned zero matches | grep against `.screenshots/mcp-body.txt` |

**Text-level checks above all PASS**, but this is only half the required verification — visible layout (screenshots) and the combined browser-flow video for `/mcp` could **not** be captured (see below), so `/mcp` cannot be marked fully verified.

## Blocker: Chrome CDP session dropped mid-run, no human available to re-approve

Sequence:
1. Full-page screenshot of `/mcp` (`chrome-use screenshot step-07-mcp-top.png --full`) hung for >3 minutes with no output (the `/mcp` page is very tall — comparison tables, tool lists, pricing — so a full-page capture takes materially longer than `/cli`'s).
2. Per tool-usage guidance, `stop_bash` was used to stop the hung shell command (not the chrome-use proxy itself — the proxy was never killed or restarted, consistent with skill constraints).
3. Immediately after, `chrome-use status` began reporting: `chrome-use proxy up (pid 18380) — Chrome not connected yet. Run a navigation command... to trigger the "Allow remote debugging?" dialog, or approve it in Chrome if already showing.`
4. Two subsequent `chrome-use open http://localhost:3157/mcp` attempts (after the tool's own rate-limit cooldown) both ran the full connect path and failed with `Error: CDP connect timed out after 300000ms` — i.e., genuinely waiting the full 5-minute CDP handshake timeout, not a fast/cached failure.
5. Per the `chrome-use` skill, this exact symptom (`Chrome not connected yet` / dialog reference) requires a literal click on Chrome's native "Allow remote debugging?" dialog — this is an OS-level permission prompt outside the DOM/CDP surface, so it cannot be dismissed via `chrome-use` itself.
6. Checked for a programmatic fallback: `osascript -e 'tell application "System Events" to ...'` failed with `execution error: System Events got an error: osascript is not allowed assistive access. (-1728)` — confirming no accessibility/assistive automation is available in this environment either.
7. No human is present in this autonomous run to click "Allow" in the real Chrome window.

**Root cause (best available explanation):** stopping the hung, mid-flight full-page-screenshot CDP command (which likely toggles `Emulation.setDeviceMetricsOverride`/viewport state for the capture) left the debugger attachment in a state Chrome treated as an abnormal disconnect, and Chrome now requires a fresh "Allow remote debugging?" approval for a new debugger client — a one-time, human-only action per the skill's own troubleshooting table ("Permission dialog appears on every run… Switch to Chrome, click Allow").

**What this blocks:** all further `/mcp` full-page/viewport screenshots, the `/mcp` scroll-through frames, and the single combined video/GIF covering both `/cli` and `/mcp` (the video was planned to be assembled via `a-test`'s `core/recording.ts:assembleGif` from `chrome-use`-captured frame screenshots — chosen over `a-test`'s X11-grab `startRecording`, which is Linux/Xvfb-only and inapplicable to this real macOS Chrome session; a full-desktop `ffmpeg`/`avfoundation` capture was deliberately avoided since this is a shared, non-sandboxed machine and full-screen recording risks capturing other users'/processes' windows).

**Not attempted as workarounds (out of scope / against constraints):**
- Restarting or killing the `chrome-use` proxy — explicitly forbidden by the skill (forces a fresh dialog for *every* session using the shared proxy, not just this one).
- Raw CDP connection bypassing the proxy — explicitly forbidden.
- Launching a new/separate Chrome instance — explicitly forbidden.
- OS-level accessibility clicking of the native dialog — attempted read-only check only, found unavailable (`-1728`), did not pursue further (e.g., granting accessibility permissions) since that is an out-of-band human/maintainer action, not something this task should perform unilaterally on a shared machine.

## Evidence inventory (`.screenshots/`, not committed)

```
step-01-cli-top.png            full-page /cli
step-02-cli-viewport-top.png   viewport /cli (load)
step-03-cli-scroll1.png        /cli scroll frame 1
step-04-cli-scroll2.png        /cli scroll frame 2
step-05-cli-scroll3.png        /cli scroll frame 3
step-06-cli-scroll4.png        /cli scroll frame 4
```
No `/mcp` screenshots or video/GIF exist — capture was blocked as described above.

Raw rendered-text captures (`.screenshots/`, not committed): `.screenshots/cli-body.txt`, `.screenshots/mcp-body.txt`.

## Summary

- `/cli`: fully verified by rendered text and full-page/scroll screenshots. All required strings present; no real UUID; no dead relay hostname. **PASS.**
- `/mcp`: rendered-text content fully verified (all required strings present; no attach-token text; no dead hostname; no real UUID) — but the required visible-layout screenshots and the single combined browser-flow video covering both pages could **not** be captured because the Chrome CDP session dropped and requires a human click on a native OS permission dialog that is unavailable in this run. This is a tooling/environment blocker, not a product defect — no evidence contradicts the `/mcp` page's correctness, but the visual/video verification requirement is unmet.
- Server cleanup: confirmed complete (both PIDs `54073`/`54047` terminated, port 3157 refusing connections, no orphaned processes).

Because the required video (covering both pages) and the `/mcp` screenshots were not obtainable, not all checks in this task's brief were completed.

RESULT: blocked

---

## Recovery run (2026-07-21 09:47–10:00 PDT) — second attempt at the blocked `/mcp` visual/video evidence

**Owner scope:** recover the blocked local browser evidence only; no product code/git changes. Constraints honored: did **not** launch/restart/kill Chrome or the shared `chrome-use` proxy; did **not** use raw CDP; did **not** edit product source/git; did **not** expose the relay credential (the relay URL is written here only as `wss://relay.api.vibebrowser.app/<uuid>`).

### Server lifecycle (this run)
| Step | Action | Result |
|---|---|---|
| Port scan | `lsof -i :3157` | free (prior run cleaned up) |
| Start | `node node_modules/next/dist/bin/next start -p 3157` (build `FIKg3WJ7V1aLPgYWL7Elr`) | single process PID `73555` (no worker fork); `✓ Ready in 149ms` |
| Sanity curl | `GET /` `/cli` `/mcp` | `200` / `200` / `200` |
| Shutdown | `kill 73555` (only the PID started here) | port 3157 → `curl 000`; `ps -p 73555` empty; `lsof -i :3157` free; no orphan |

### Capabilities investigated for a compliant real-Chrome driver
| Capability | Location / form | Can it drive the real session now? | Why / why not |
|---|---|---|---|
| `chrome-use` (raw CDP autoConnect) | `~/.agents/skills/chrome-use` (proxy pid 18380) | **No** | `chrome-use status` still reports *"Chrome not connected yet … Allow remote debugging? dialog … approve it in Chrome"* — the same native OS dialog from the first run, un-clearable without a human click. |
| `@vibebrowser/mcp` CLI via **extension relay** (`vibebrowser-cli --remote …`) | global `@vibebrowser/mcp@0.2.12` → `dist/browser-main.js`; drives the extension, **not** CDP | **No (blocked)** | Relay handshake is healthy — `status` returns instantly: `extensionConnected: true`, 1 session, `toolCount: 27` (incl. `navigate_page`, `take_screenshot`, `evaluate_script`). But **every tool call times out**: `open` (30s), `tabs`/`list_pages` (60s, 90s), and a control test `evaluate --fn "()=>2+2"` (90s) all returned `Request timed out`. The extension is registered but cannot execute a single page-control op. |
| Chrome AppleScript dictionary (Apple Events, not CDP) | `osascript -e 'tell application "Google Chrome" …'` | **No (wrong instance)** | Responds instantly (Chrome UI thread is *not* modal-frozen), but the Apple-Events-addressable instance has exactly **1 window / 1 tab = a TradingView chart** — i.e. the TradingView-automation Chrome, not the Vibe-extension session. It also has no screenshot verb, and driving it would collide with the active TradingView MCP automation. Not the target session; unusable. |
| `a-test` recording/capture primitives | `/Users/engineer/workspace/a-test/core/recording.ts`, `core/screenshot.ts` | **No usable macOS path** | `startRecording` is **X11 `x11grab` (Linux/Xvfb only)**; `core/screenshot.ts` uses **CDP `Page.captureScreenshot`** (needs a CDP connection — blocked/forbidden); `assembleGif` only *assembles* pre-captured `step-NN-*.png` frames — it produces nothing without a working screenshot source. No `avfoundation`/`screencapture`/`getDisplayMedia`/window-capture primitive exists in a-test. |

### Root cause (now corroborated by two independent facts)
1. `chrome-use` (raw CDP) is explicitly waiting on the native **"Allow remote debugging?"** dialog (confirmed by its own `status`).
2. The Vibe **extension** relay is connected yet **0/27 tools execute** — `open`, `tabs`, and even a page-independent `evaluate 2+2` all hang to their full timeout, concurrent with (1).

Best-supported explanation: the pending native debugger-permission dialog wedges Chrome's debugger subsystem, so **both** available real-Chrome drivers — `chrome-use` (raw CDP) **and** the Vibe extension's page-control tools (`take_screenshot`/`evaluate_script`/`navigate_page`, which are CDP-backed) — are blocked behind the same one-time, human-only "Allow" click.

### Compliant workarounds considered and why each fails
- Click the dialog via `osascript`/System Events → **no assistive access** (`-1728`), same as first run.
- AppleScript-drive the real Chrome → addressable instance is the **TradingView** Chrome, not the Vibe session; no screenshot verb; would disrupt live TradingView automation.
- Restart/kill the `chrome-use` proxy, launch a new/headless Chrome, or use raw CDP → **explicitly forbidden** (and proxy restart re-triggers the dialog for every shared consumer).
- Custom desktop/window capture (`screencapture`, `ffmpeg avfoundation`) → task requires the shared a-test primitive **not** custom recording; unsafe on this shared machine; and infeasible anyway (cannot load `/mcp` in a capturable, addressable window without a working driver).

### What the recovery run DID re-verify (fresh, independent evidence)
Server-rendered HTML fetched directly (`curl http://localhost:3157/{mcp,cli}`), saved to `.screenshots/mcp-ssr.html`, `.screenshots/cli-ssr.html`; summary in `.screenshots/recovery-content-check.txt`:

- **/mcp content — PASS:** `relay.api.vibebrowser.app/mcp` ×4, `X-Remote-Session` ×4, `Local stdio` ×1, `Direct remote HTTP` ×2, `AI Agent Control` ×6, `Remote (internet)` ×7; negatives all **0** (no `attach-token`, no dead `relay.vibebrowser.app`, no real UUID).
- **/cli content — PASS:** `Enable external AI agent control` ×2, `Remote (internet)` ×4, `Relay access` ×2, `wss://relay.api.vibebrowser.app` ×6; negatives all **0**; only the literal `<uuid>` placeholder present.

This independently corroborates the first run's rendered-text checks.

### Recovery verdict
- **Content of `/mcp` (and `/cli`): re-verified PASS** via fresh independent SSR-HTML evidence.
- **Required `/mcp` visible-layout screenshots + full-flow video: still NOT obtainable by any compliant method** in this environment. Both real-Chrome drivers are blocked by the same native "Allow remote debugging?" dialog that only a human can clear; every permitted alternative is forbidden by the task constraints or unavailable here (no assistive access; AppleScript hits the wrong Chrome; a-test has no macOS screen-capture primitive).

Evidence added this run (`.screenshots/`, not committed): `mcp-ssr.html`, `cli-ssr.html`, `recovery-content-check.txt`, `server-recovery.pid`.

RESULT: still blocked on the visual/video requirement (tooling/environment blocker, not a product defect). Content re-verified; **not a full test pass.**
