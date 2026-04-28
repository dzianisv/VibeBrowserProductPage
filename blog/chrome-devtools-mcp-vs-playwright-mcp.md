---
title: "chrome-devtools-mcp vs playwright-mcp: Which Control Stack Is Better for Agents?"
description: "A code-level comparison of Chrome DevTools MCP and Playwright MCP: click, type, snapshot APIs, existing-browser attachment, and why VibeBrowser Co-Pilot can still be the better agent runtime."
date: "2026-03-24"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - MCP
  - Browser Automation
  - Chrome DevTools MCP
  - Playwright MCP
  - AI Agents
  - VibeBrowser
published: true
---

If you are evaluating browser-control MCP servers for an agent, the biggest mistake is treating **chrome-devtools-mcp** and **playwright-mcp** as if they solve the same problem in the same way.

They do not.

At a high level:

- **Chrome DevTools MCP** is a **Chrome-attached DevTools/CDP server** built around Puppeteer and Chrome's debugging surface.
- **Playwright MCP** is a **Playwright tool server** with two distinct operating modes: it can launch its own browser context, or it can connect to an existing browser through a **browser extension bridge**.
- For pure **page interaction reliability**, Playwright's action model is generally stronger.
- For **attach-to-my-already-running-Chrome** behavior, `chrome-devtools-mcp --autoConnect` is still the more direct mechanism.
- For a production AI browser assistant, **VibeBrowser Co-Pilot** can still be the more practical architecture because it is purpose-built for agents rather than exposing generic automation primitives and raw snapshots.

This post is based on a code review of both repositories plus the shipped package behavior of `@playwright/mcp`.

## The short answer

If your question is **"which one is the more effective low-level page-control surface for an agent?"**, the answer is usually **Playwright MCP**.

If your question is **"which one already supports the exact same style of existing-profile auto-attach as `chrome-devtools-mcp --autoConnect`?"**, the answer is **Chrome DevTools MCP**.

If your question is **"should we replace our OpenCode config with Playwright MCP today because it supports `--autoConnect`?"**, my answer is **no**.

Playwright MCP has a credible **existing-browser** story, but it is **not the same as `--autoConnect`**. Its public path is `--extension`, plus an optional `PLAYWRIGHT_MCP_EXTENSION_TOKEN` to bypass repeated approval prompts. That is good, but it is a different UX and a different trust model.

## Architecture: how they connect to the browser

### chrome-devtools-mcp: direct Chrome attachment through Puppeteer

The core browser connection path in Chrome DevTools MCP is implemented in [`src/browser.ts`](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/9a47b657d7b17b9bc64508530c93d55e8033e2a6/src/browser.ts#L46-L134).

A few details matter:

- It builds Puppeteer `connect()` options.
- It supports `browserURL`, `wsEndpoint`, and `userDataDir`/channel-based connection modes.
- In the `userDataDir` path it reads `DevToolsActivePort`, constructs a local WebSocket URL, and then calls `puppeteer.connect(...)`.
- That is the implementation detail behind `--autoConnect`.

In other words, `chrome-devtools-mcp --autoConnect` is not magic. It is essentially **"discover the debug socket for a running Chrome profile, then attach Puppeteer to it."**

That is a very direct model, and for some workflows it is exactly what you want.

### playwright-mcp: Playwright runtime, plus optional extension bridge

The public `playwright-mcp` repository is thinner than it first appears. The package entrypoint [`packages/playwright-mcp/index.js`](https://github.com/microsoft/playwright-mcp/blob/eed21856dcf0defa23394909e27125311fed246f/packages/playwright-mcp/index.js#L1-L19) simply re-exports `createConnection` from `playwright-core/lib/tools/exports`, and [`packages/playwright-mcp/package.json`](https://github.com/microsoft/playwright-mcp/blob/eed21856dcf0defa23394909e27125311fed246f/packages/playwright-mcp/package.json#L1-L34) pins the actual runtime to `playwright-core@1.59.0-alpha-1773608981000`.

That matters because the repository docs and tests tell you the public contract, but the real implementation is shipped from the Playwright package.

Publicly documented behavior splits into two paths:

1. **Default / persistent profile mode**: Playwright MCP launches its own persistent browser context.
2. **Extension mode**: Playwright MCP connects to an existing Chrome/Edge session through the Playwright MCP Bridge extension using `--extension`.

The extension setup is documented in [`packages/extension/README.md`](https://github.com/microsoft/playwright-mcp/blob/eed21856dcf0defa23394909e27125311fed246f/packages/extension/README.md#L1-L68).

The important part is what it does **not** document: there is **no `--autoConnect` flag** that mirrors Chrome DevTools MCP's `userDataDir` + `DevToolsActivePort` behavior.

## What API actually clicks, types, and snapshots the page?

This is the most important technical question for agent builders, because the answer tells you how "native" the page interactions really are.

## chrome-devtools-mcp action API

Chrome DevTools MCP exposes a DevTools-style tool surface built around **snapshot IDs (`uid`)**.

### Click

The `click` tool is defined in [`src/tools/input.ts`](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/9a47b657d7b17b9bc64508530c93d55e8033e2a6/src/tools/input.ts#L45-L84).

The implementation flow is:

1. Resolve a `uid` from the current text snapshot.
2. Convert that to an element handle.
3. Call `handle.asLocator().click(...)`.

So even though the server is branded around DevTools, the actual click path is still **Puppeteer Locator click**, not raw DOM `element.click()` and not a hand-rolled CDP mouse event in the normal case.

That is a good thing.

### Fill / type

The single-field `fill` path is implemented in [`src/tools/input.ts`](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/9a47b657d7b17b9bc64508530c93d55e8033e2a6/src/tools/input.ts#L193-L251).

The normal path is:

- resolve the `uid`
- inspect the accessibility node
- if the node is effectively a select/combobox, handle it specially
- otherwise call `handle.asLocator().fill(value)`

For pure keyboard typing, `type_text` uses [`page.pptrPage.keyboard.type(...)`](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/9a47b657d7b17b9bc64508530c93d55e8033e2a6/src/tools/input.ts#L253-L278), and `press_key` uses [`page.pptrPage.keyboard.press(...)`](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/9a47b657d7b17b9bc64508530c93d55e8033e2a6/src/tools/input.ts#L401-L438).

So the interaction stack is:

- **click/fill** -> Puppeteer Locator APIs
- **keyboard** -> Puppeteer keyboard APIs
- **element identity** -> snapshot `uid`

### Snapshot

The snapshot pipeline is the most distinctive part of Chrome DevTools MCP.

The public `take_snapshot` tool is in [`src/tools/snapshot.ts`](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/9a47b657d7b17b9bc64508530c93d55e8033e2a6/src/tools/snapshot.ts#L12-L41), but the important implementation is in [`src/McpContext.ts`](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/9a47b657d7b17b9bc64508530c93d55e8033e2a6/src/McpContext.ts#L729-L806).

That code calls `page.pptrPage.accessibility.snapshot(...)`, walks the accessibility tree, assigns MCP-specific IDs, and stores a per-page text snapshot.

So the real snapshot model is:

- **source**: Puppeteer accessibility tree
- **representation**: custom text snapshot with generated `uid`s
- **interaction**: tools consume those `uid`s later

That is not "raw DOM" and not a literal screenshot-driven workflow. It is an **accessibility-tree-backed control plane**.

## playwright-mcp action API

Playwright MCP exposes a more Playwright-native tool surface:

- `browser_click`
- `browser_fill_form`
- `browser_type`
- `browser_press_key`
- `browser_snapshot`

Those tools are documented in [`README.md`](https://github.com/microsoft/playwright-mcp/blob/eed21856dcf0defa23394909e27125311fed246f/README.md#L793-L803), [`README.md`](https://github.com/microsoft/playwright-mcp/blob/eed21856dcf0defa23394909e27125311fed246f/README.md#L861-L866), and [`README.md`](https://github.com/microsoft/playwright-mcp/blob/eed21856dcf0defa23394909e27125311fed246f/README.md#L958-L992).

### Click

The cleanest public proof of the click API is actually the test suite.

In [`packages/playwright-mcp/tests/click.spec.ts`](https://github.com/microsoft/playwright-mcp/blob/eed21856dcf0defa23394909e27125311fed246f/packages/playwright-mcp/tests/click.spec.ts#L19-L48), the `browser_click` test asserts that clicking a snapshot ref produces generated Playwright code:

```ts
await page.getByRole('button', { name: 'Submit' }).click();
```

That is a stronger semantic contract than "click the thing with snapshot uid X". It means the tool system is generating or resolving down to a **Playwright locator action**, which is generally the most robust mainstream browser-automation click primitive available today.

### Type / fill

Publicly, Playwright MCP separates:

- `browser_fill_form` for multiple fields
- `browser_type` for editable text input
- `browser_press_key` for explicit key presses

Its README documents `browser_type` as typing into an editable element, with an optional `slowly` mode and optional submit behavior, and `browser_fill_form` as a multi-field form primitive. See [`README.md`](https://github.com/microsoft/playwright-mcp/blob/eed21856dcf0defa23394909e27125311fed246f/README.md#L861-L866) and [`README.md`](https://github.com/microsoft/playwright-mcp/blob/eed21856dcf0defa23394909e27125311fed246f/README.md#L982-L992).

That API is more explicitly oriented around **user intent** than Chrome DevTools MCP's more DevTools-like tool naming.

### Snapshot

Playwright MCP's `browser_snapshot` is also described as an **accessibility snapshot**, not a screenshot. The README is explicit: [`browser_snapshot`](https://github.com/microsoft/playwright-mcp/blob/eed21856dcf0defa23394909e27125311fed246f/README.md#L958-L964) is "better than screenshot" for actions, while `browser_take_screenshot` is explicitly not meant to drive actions.

So on snapshots, the two systems are actually more similar than many people assume:

- **Chrome DevTools MCP** -> accessibility snapshot rendered into a custom text format with `uid`
- **Playwright MCP** -> accessibility snapshot rendered into a Playwright MCP ref format

The deeper difference is not **A11y vs non-A11y**. The deeper difference is **how much the agent is forced into each runtime's custom control model**.

## Does Playwright MCP support `--autoConnect` like Chrome DevTools MCP?

Short answer: **no, not in the same way**.

### What Chrome DevTools MCP supports

Chrome DevTools MCP publicly documents `--autoConnect`, and its README says the server will connect to the default running Chrome profile if Chrome is already open. See [`README.md`](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/9a47b657d7b17b9bc64508530c93d55e8033e2a6/README.md#L472-L675).

That matches the code path in `src/browser.ts`: read `DevToolsActivePort`, construct the WebSocket endpoint, and attach via Puppeteer.

### What Playwright MCP supports instead

Playwright MCP publicly supports three attachment-style stories:

1. **`--extension`** to connect through the Playwright MCP Bridge extension to an existing browser. See [`packages/extension/README.md`](https://github.com/microsoft/playwright-mcp/blob/eed21856dcf0defa23394909e27125311fed246f/packages/extension/README.md#L17-L33).
2. **`PLAYWRIGHT_MCP_EXTENSION_TOKEN`** to bypass repeated approval dialogs for that extension connection. See [`packages/extension/README.md`](https://github.com/microsoft/playwright-mcp/blob/eed21856dcf0defa23394909e27125311fed246f/packages/extension/README.md#L41-L68).
3. **`--cdp-endpoint`** to connect to an explicit CDP endpoint rather than discover one automatically. That is documented in the main README options table.

That third point is the nuance that gets missed in a lot of comparisons.

If Chrome already has remote debugging enabled and is exposing CDP on something like `http://127.0.0.1:9222`, then **Playwright MCP can connect to that browser**. The missing feature is not CDP support. The missing feature is **auto-discovery**.

In other words:

- **Playwright MCP supports manual CDP attach** via `--cdp-endpoint`
- **Chrome DevTools MCP supports auto-discovery and attach** via `--autoConnect`

Those are not equivalent UX paths.

| Mode | Server | Existing browser? | Needs manual endpoint? | Needs extension? | Auto-discovers running Chrome? |
| --- | --- | --- | --- | --- | --- |
| `--autoConnect` | Chrome DevTools MCP | Yes | No | No | Yes |
| `--cdp-endpoint http://127.0.0.1:9222` | Playwright MCP | Yes | Yes | No | No |
| `--extension` | Playwright MCP | Yes | No | Yes | No |


This also means `chrome://inspect/#remote-debugging` is only part of the story. That page tells you remote debugging is enabled, but for Playwright MCP you still need the **actual CDP endpoint**, not the inspect page itself. Practically, that means passing the endpoint directly, for example:

```bash
npx @playwright/mcp@latest --cdp-endpoint http://127.0.0.1:9222
```

So the correct statement is:

> Playwright MCP can attach to an already-CDP-enabled Chrome, but it does not currently offer Chrome DevTools MCP-style automatic discovery of that running browser.

What it does **not** publicly expose is a Chrome DevTools MCP-style flag that says:

> "Find the running Chrome profile automatically and attach to it without an extension, by reading the profile's DevTools port metadata."

So if your internal requirement is literally **"must support `--autoConnect` behavior"**, then Playwright MCP does **not** currently satisfy that requirement.

It does support **auto-approved extension attachment**, which is useful, but that is not the same as direct profile auto-discovery.

## Which one is more effective for an agent controlling real websites?

For page control, I would separate **transport** from **interaction semantics**.

### Interaction semantics: Playwright MCP is better

On interaction semantics alone, Playwright MCP is usually the stronger agent substrate.

Why:

- Its public tool surface is closer to actual web-intent primitives.
- Its click path is visibly Playwright-locator-oriented rather than DevTools-panel-oriented.
- Its docs and tests are more explicit about `ref` -> semantic action generation.
- It supports a richer automation vocabulary without forcing the agent to think like a DevTools inspector.

If I were building a generic browser agent and only cared about **robustness of click/type/select/hover/drag/wait**, I would usually choose the **Playwright action model** over a DevTools-first API.

### Existing everyday browser attachment: Chrome DevTools MCP is more direct

If I specifically care about **"attach to the Chrome I'm already using"**, Chrome DevTools MCP still has the cleaner story because `--autoConnect` is built for exactly that.

Playwright MCP can still attach to an existing browser in two ways, but both are more explicit than `--autoConnect`:

- manual CDP endpoint via `--cdp-endpoint`
- extension install
- tab selection / connection approval
- optional auth token for auto-approval

That is a workable existing-browser flow, but it is not as simple or direct as Chrome DevTools MCP's current `--autoConnect` path because the user or config still has to provide either the CDP endpoint or the extension-based bridge.

## Why VibeBrowser Co-Pilot can still be the better choice

This is where the comparison changes.

If you are evaluating **which MCP is the better generic browser automation substrate**, the Playwright answer is compelling.

If you are evaluating **which product is the better AI browser co-pilot**, the answer can still be **VibeBrowser**.

Why, technically:

### 1. VibeBrowser is optimized for agent context, not just browser control

The problem with both Chrome DevTools MCP and Playwright MCP is that they still think primarily in terms of **automation tools**.

VibeBrowser Co-Pilot is optimized around **agent-comprehensible page state** and **task completion**.

Our `/mcp` docs already explain the core difference: instead of making the model repeatedly request raw page snapshots and then juggle `uid` or `ref` identifiers, Vibe can deliver **clean markdown-indexed page content** with lower token overhead and lower context pollution.

That matters more than people think. A browser agent usually fails because it loses the page in context, not because the browser cannot physically click.

### 2. VibeBrowser avoids the worst CDP ergonomics

Chrome DevTools MCP is tightly coupled to DevTools attachment semantics.

Playwright MCP's default mode launches a separate automation browser, and its existing-browser mode still needs the Playwright bridge extension.

VibeBrowser's extension-native model is closer to what an assistant product actually wants:

- operate in the user's normal browser environment
- avoid separate automation-browser mental models
- reduce state mismatch between what the user sees and what the agent sees

### 3. VibeBrowser is not just browser control

An assistant product wins by integrating **workflow surfaces**, not by exposing one more generic `click` primitive.

VibeBrowser's architecture can compound browser control with:

- multi-agent coordination
- credential handling / vault workflows
- Gmail / Calendar / workspace actions
- product-specific orchestration instead of one isolated page session

That is where a browser co-pilot starts to diverge from a plain automation server.

## Final conclusion

Here is the practical conclusion I would use for engineering decisions:

### If you want the better raw interaction model for agents

Choose **Playwright MCP**.

Its tool vocabulary, Playwright-native action semantics, and public evidence of locator-based actions make it the more effective general-purpose control surface.

### If you need the exact current `--autoConnect` behavior

Choose **Chrome DevTools MCP**.

It already has that exact feature shape, and Playwright MCP does not currently expose a direct equivalent.

### If you are choosing what should power a real AI browser co-pilot product

Choose **VibeBrowser Co-Pilot**.

The winner at product level is not the project with the prettiest low-level click primitive. It is the one that gives the agent the cleanest state representation, the lowest operational friction, and the best path to complete user work across websites and tools.

## What we should do in OpenCode

For OpenCode specifically, I would **not replace the current setup with `playwright-mcp` right now**.

Reason:

- it does **not** provide direct `--autoConnect` parity
- if we know and control a fixed CDP endpoint, `playwright-mcp --cdp-endpoint ...` is viable, but that is still manual endpoint configuration rather than automatic running-browser discovery
- the existing-browser story requires the Playwright bridge extension, not automatic profile discovery
- we already have `playwriter` and `vibe-browser` in the toolchain for stronger browser-agent workflows

What I *would* consider later is an **opt-in experimental `playwright-mcp --extension` entry**, but only if we want to standardize on the Playwright MCP Bridge extension and distribute the extension-token setup across the team.

That is a different decision from "replace `chrome-devtools-mcp --autoConnect` today."

## Code references

### Chrome DevTools MCP

- Browser attach and `DevToolsActivePort` auto-connect: [`src/browser.ts`](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/9a47b657d7b17b9bc64508530c93d55e8033e2a6/src/browser.ts#L46-L134)
- Click tool: [`src/tools/input.ts`](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/9a47b657d7b17b9bc64508530c93d55e8033e2a6/src/tools/input.ts#L45-L84)
- Fill tool: [`src/tools/input.ts`](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/9a47b657d7b17b9bc64508530c93d55e8033e2a6/src/tools/input.ts#L193-L251)
- Keyboard typing: [`src/tools/input.ts`](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/9a47b657d7b17b9bc64508530c93d55e8033e2a6/src/tools/input.ts#L253-L278)
- Key press: [`src/tools/input.ts`](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/9a47b657d7b17b9bc64508530c93d55e8033e2a6/src/tools/input.ts#L401-L438)
- Snapshot creation: [`src/McpContext.ts`](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/9a47b657d7b17b9bc64508530c93d55e8033e2a6/src/McpContext.ts#L729-L806)
- Snapshot tool entrypoint: [`src/tools/snapshot.ts`](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/9a47b657d7b17b9bc64508530c93d55e8033e2a6/src/tools/snapshot.ts#L12-L41)
- Public `--autoConnect` docs: [`README.md`](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/9a47b657d7b17b9bc64508530c93d55e8033e2a6/README.md#L472-L675)

### Playwright MCP

- Thin package entrypoint: [`packages/playwright-mcp/index.js`](https://github.com/microsoft/playwright-mcp/blob/eed21856dcf0defa23394909e27125311fed246f/packages/playwright-mcp/index.js#L1-L19)
- Runtime package dependency: [`packages/playwright-mcp/package.json`](https://github.com/microsoft/playwright-mcp/blob/eed21856dcf0defa23394909e27125311fed246f/packages/playwright-mcp/package.json#L1-L34)
- Tool list: [`packages/playwright-mcp/tests/capabilities.spec.ts`](https://github.com/microsoft/playwright-mcp/blob/eed21856dcf0defa23394909e27125311fed246f/packages/playwright-mcp/tests/capabilities.spec.ts#L19-L43)
- Click test proving generated Playwright locator action: [`packages/playwright-mcp/tests/click.spec.ts`](https://github.com/microsoft/playwright-mcp/blob/eed21856dcf0defa23394909e27125311fed246f/packages/playwright-mcp/tests/click.spec.ts#L19-L48)
- Public tool docs for click/fill/type/snapshot: [`README.md`](https://github.com/microsoft/playwright-mcp/blob/eed21856dcf0defa23394909e27125311fed246f/README.md#L793-L803), [`README.md`](https://github.com/microsoft/playwright-mcp/blob/eed21856dcf0defa23394909e27125311fed246f/README.md#L861-L866), [`README.md`](https://github.com/microsoft/playwright-mcp/blob/eed21856dcf0defa23394909e27125311fed246f/README.md#L958-L992)
- Existing-browser extension mode and token-based auto-approval: [`packages/extension/README.md`](https://github.com/microsoft/playwright-mcp/blob/eed21856dcf0defa23394909e27125311fed246f/packages/extension/README.md#L17-L68)

### Note on the shipped implementation

The public `playwright-mcp` repository exposes the contract, but the shipped implementation lives in the pinned `playwright-core` package. In the currently published package, the MCP runtime is implemented under paths such as:

- `playwright-core/lib/tools/mcp/browserFactory.js`
- `playwright-core/lib/tools/mcp/extensionContextFactory.js`
- `playwright-core/lib/tools/mcp/cdpRelay.js`

That is where the launch-persistent-context path, the extension CDP relay, and the final `connectOverCDP(...)` bridge are implemented.
