---
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
published: false
---

# I Spent 6 Hours Fighting chrome-devtools-mcp So You Don't Have To

*By Dzianis Vashchuk — https://linkedin.com/in/dzianisv*

*How a "simple" Slack configuration task turned into a deep dive through zombie processes, phantom timeouts, and the limits of CDP-based browser automation.*

---

We're building [OpenClaw Team](https://github.com/openclaw/openclaw) — a multi-agent AI system where each agent role (SoftwareEngineer, DevOps, SupportEngineer, etc.) gets its own Slack app. The task was straightforward: configure Event Subscriptions on 4 Slack apps via `api.slack.com`. Toggle a switch, paste a URL, add some events, save. A human could do it in 5 minutes per app.

I decided to automate it with `chrome-devtools-mcp` — an MCP server that wraps Chrome DevTools Protocol, giving AI agents the ability to navigate pages, click elements, and evaluate JavaScript in a real browser. What followed was a masterclass in everything that can go wrong with CDP-based browser automation.

## Issue #1: `Promise.withResolvers is not a function`

The first problem appeared immediately. `chrome-devtools-mcp` injects a helper script (`WaitForHelper.js`) into every page it instruments. That script uses `Promise.withResolvers()` — a relatively new JavaScript API (ES2024) that isn't available in all browser contexts.

```
Error: Promise.withResolvers is not a function
```

The fix was a polyfill patched into two separate locations (npx cache and global install):

```javascript
if (typeof Promise.withResolvers !== 'function') {
  Promise.withResolvers = function () {
    let resolve, reject;
    const promise = new Promise((res, rej) => { resolve = res; reject = rej; });
    return { promise, resolve, reject };
  };
}
```

**Lesson:** MCP tools that inject code into pages need to be defensive about runtime APIs. What works in Node 22 doesn't necessarily work in the Chrome page context.

## Issue #2: Zombie Processes and Port Wedging

After patching, the tool connected — once. Then it didn't. The symptoms were maddening:

- `chrome-devtools-mcp` would hang on startup
- No error messages, no timeouts, just silence
- `lsof -i :9222` showed Chrome was listening
- But connecting to the WebSocket endpoint returned nothing

The root cause: previous crashed MCP sessions left zombie `chrome-devtools-mcp` processes still holding CDP WebSocket connections to Chrome. Chrome's debug server has a limited number of concurrent debug sessions it can handle. With 3-4 zombies holding connections open, new connections simply queued forever.

```bash
$ ps aux | grep chrome-devtools
engineer  56636  ...  chrome-devtools-mcp --autoConnect
engineer  58102  ...  chrome-devtools-mcp --autoConnect
engineer  58445  ...  chrome-devtools-mcp --autoConnect
```

Every failed `evaluate_script` call, every timeout, every reconnection attempt — each one spawned a new process that never cleaned up. Kill one, another was already hanging. Kill them all, and the next MCP invocation might spawn two more before you could even debug.

**Lesson:** CDP connections are a finite resource. Any MCP server that manages browser connections MUST implement aggressive cleanup — `SIGTERM` handlers, connection timeouts, and zombie detection. Without it, you're one bad session away from a completely wedged browser.

## Issue #3: `Network.enable` Timeout of Death

Even with clean connections, `chrome-devtools-mcp` would frequently hang on heavy pages. The culprit: it calls `Network.enable` as part of its initialization sequence. On pages with heavy network activity (like `api.slack.com` with its analytics, tracking pixels, and WebSocket connections), this CDP command can take 30+ seconds to return — or never return at all.

```
Error: Network.enable timed out after 30000ms
```

Once this timeout fires, the MCP server enters a broken state. It caches the error, and every subsequent tool call fails instantly with the same error, even if the underlying issue resolved itself. The only recovery is killing the process and starting fresh.

I tried the `--no-category-network` flag (doesn't exist), `--protocolTimeout` (not a valid option), and `--wsEndpoint` (ignored). None worked.

**Lesson:** CDP initialization should be non-blocking and fault-tolerant. `Network.enable` is not required for `Runtime.evaluate` — the two most-used MCP operations (evaluate scripts and take screenshots) don't need network instrumentation at all.

## Issue #4: Chrome's Permission Popup Nobody Sees

Here's a subtle one. When `chrome-devtools-mcp` connects via `--autoConnect`, Chrome shows a small permission dialog: *"An extension is trying to debug this browser."* If you don't notice it (because you're staring at your terminal waiting for the MCP to respond), the connection hangs indefinitely.

There's no timeout. No error. No log message. Just silence.

I discovered this after 45 minutes of debugging connection issues, when the user casually mentioned "oh, it was asking me something, I just didn't notice." The permission popup was hidden behind other windows.

**Lesson:** Browser automation tools need to handle the "user must approve" case explicitly — with clear messaging, timeouts, and recovery paths. Silent hangs are the worst possible failure mode.

## Issue #5: Accessibility Tree Limitations

After finally getting a stable connection, I discovered that `chrome-devtools-mcp`'s primary interaction model — clicking elements by their accessibility tree UID — doesn't work with Slack's custom UI components.

Slack's "Add Bot User Event" dropdown uses a custom `lazy_filter_select` widget. The dropdown items render as `StaticText` nodes in the accessibility tree, which `chrome-devtools-mcp` cannot target with its `click` tool. You can see them in the tree, but clicking their UID does nothing.

```
StaticText "app_mention"    ← visible in a11y tree
                             ← but click(uid) is a no-op
```

This pushed me into `evaluate_script` territory — injecting raw JavaScript to interact with the page. Which led to the next discovery.

## Issue #6: `.click()` Is Not a Click

The most insidious issue. Using `element.click()` or `element.dispatchEvent(new MouseEvent('click'))` on Slack's dropdown items *appeared* to work. The events showed up in the UI. The list updated. Everything looked correct.

But when you hit Save, nothing happened. The Save button stayed disabled.

Slack's `lazy_filter_select` widget tracks form "dirty" state through a chain of event listeners attached to `mousedown` → `mouseup` → `click` — and those listeners check `clientX`/`clientY` coordinates from the event. A synthetic `.click()` with no coordinates doesn't trigger the dirty-state tracker.

The fix required simulating the full mouse event sequence with actual coordinates from `getBoundingClientRect()`:

```javascript
const rect = item.getBoundingClientRect();
const opts = {
  bubbles: true, cancelable: true,
  clientX: rect.x + rect.width / 2,
  clientY: rect.y + rect.height / 2,
  button: 0
};
item.dispatchEvent(new MouseEvent('mousedown', opts));
item.dispatchEvent(new MouseEvent('mouseup', opts));
item.dispatchEvent(new MouseEvent('click', opts));
```

This took 3 hours to figure out. The changes would appear in the UI, I'd click Save, see "Success!", reload the page — and the events were gone. Over and over.

**Lesson:** Web apps don't just listen for `click`. They listen for the full pointer lifecycle. Any browser automation tool that abstracts away mouse events into a simple "click" is lying to you about how reliable that click actually is.

## The Fix: Switching to Playwriter

After ~6 hours of fighting chrome-devtools-mcp across multiple sessions, we switched to [Playwriter](https://github.com/remorses/playwriter) — an MCP server built on Playwright that controls the browser through an extension rather than the debug protocol.

The difference was night and day:

| | chrome-devtools-mcp | Playwriter |
|---|---|---|
| Connection | CDP WebSocket (fragile) | Extension relay (stable) |
| Zombie processes | Constant problem | Never happened |
| Heavy pages | Hangs on `Network.enable` | No issue |
| Permission prompts | Silent hang | One-time extension click |
| Custom dropdowns | Needs raw JS hacks | Playwright locators work |
| Reliability | ~30% success rate | ~95% success rate |

With Playwriter, the entire 4-app configuration took about 20 minutes. No zombie processes. No timeouts. No mysterious hangs. Playwright's `locator()`, `evaluate()`, and `snapshot()` APIs are mature, battle-tested, and designed for exactly this kind of web automation.

## Takeaways for MCP Tool Authors

1. **Clean up after yourself.** Implement `SIGTERM`/`SIGINT` handlers. Close WebSocket connections on exit. Don't leave zombie processes.

2. **Don't block on optional CDP domains.** `Network.enable` is not required for basic page interaction. Make it opt-in, not a boot dependency.

3. **Surface permission requirements.** If the browser needs user approval, tell the user. Don't just hang.

4. **Synthetic clicks aren't real clicks.** If you're abstracting mouse interactions, simulate the full event chain (`mousedown` → `mouseup` → `click`) with coordinates. Otherwise you'll break on any app that tracks pointer state.

5. **Cache invalidation matters.** If a CDP command times out once, don't cache that failure forever. Allow retries.

6. **Test on heavy pages.** `api.slack.com`, `console.cloud.google.com`, `portal.azure.com` — these are where your users actually need automation. If your tool only works on simple pages, it's a demo, not a product.

## Final Score

- **Time spent debugging chrome-devtools-mcp:** ~6 hours across 3 sessions
- **Time spent completing the task with Playwriter:** ~20 minutes
- **Zombie processes killed:** 7
- **Pages that hung on `Network.enable`:** Lost count
- **Times Save button silently ate my changes:** 4

The right tool matters. And sometimes the right tool is the one that doesn't fight you at every step.

## Update: `chrome-devtools-mcp` Also Leaks Memory (2026-03-15)

Months later, we found another critical issue with `chrome-devtools-mcp` — one that crashes entire machines.

While running `opencode serve` overnight with `chrome-devtools-mcp` as an MCP server, we observed the `--autoConnect` process growing from ~100 MB to **1,661 MB in under 2 hours** — a leak rate of roughly 13 MB/min. Left running overnight, the process tree hit **8,472 MB**, exhausted swap, and triggered a macOS kernel watchdog panic at 07:33.

The panic log confirms:

```
watchdog timeout: no checkins from watchdogd in 90 seconds
Compressor Info: LOW swap space
```

The leak is in `chrome-devtools-mcp` itself. opencode's root process was only ~1.7 GB — over 6 GB was in MCP child processes, dominated by `chrome-devtools-mcp`.

This adds a seventh issue to the list above:

**Issue #7: Unbounded Memory Growth in `--autoConnect` Mode**

The `--autoConnect` mode appears to accumulate internal state without bound. Even when no browser automation is actively happening, the process continues to grow. Combined with the zombie process issue (#2), this means a single forgotten `chrome-devtools-mcp` instance can take down a workstation overnight.

**Updated lesson:** MCP servers must not only clean up processes on exit — they must also be memory-safe during idle periods. Any MCP host should implement idle disposal as a safety net, because relying on third-party MCP servers to manage their own memory is not safe.

Full investigation and patches documented on [anomalyco/opencode#16697](https://github.com/anomalyco/opencode/issues/16697).

---

*This post documents real issues encountered while building [OpenClaw Team](https://github.com/openclaw/openclaw), a multi-agent AI platform. The chrome-devtools-mcp issues were reported upstream. Playwriter is maintained by [remorses](https://github.com/remorses/playwriter).*
