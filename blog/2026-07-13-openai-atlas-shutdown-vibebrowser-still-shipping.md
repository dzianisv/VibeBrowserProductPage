---
title: "OpenAI Atlas Is Shutting Down. VibeBrowser Is Still Shipping."
description: "OpenAI is sunsetting standalone ChatGPT Atlas after less than nine months. VibeBrowser keeps shipping as an extension that attaches to your own browser."
date: "2026-07-13"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - openai-atlas
  - ai-browsers
  - browser-automation
  - architecture
  - vibebrowser
published: true
---

OpenAI is shutting down Atlas. We are not.

That's the short version. The rest is a timeline, two redirects, and one lesson about where AI belongs.

## The timeline

| Milestone | Detail |
|---|---|
| Oct 21, 2025 | [Atlas launches](https://techcrunch.com/2025/10/21/openai-launches-an-ai-powered-browser-chatgpt-atlas/) as OpenAI's standalone AI browser |
| Jul 9, 2026 | [TechCrunch reports](https://techcrunch.com/2026/07/09/openai-is-shutting-down-atlas-but-its-ai-browser-ambitions-are-still-growing/) OpenAI is sunsetting it |
| Lifespan | Less than 9 months as a standalone product |
| Replaced by | 3 places: a Chrome extension, a browser inside the ChatGPT desktop app, and a cloud browser |

## Two redirects and a headstone

As of July 13, 2026, [openai.com/atlas/](https://openai.com/atlas/) tells the whole story by itself. Visit it and you land on chatgpt.com/atlas/, which sends you again to the generic chatgpt.com/download/ page — no mention of Atlas anywhere. A pair of HTTP redirects, doing the work of an obituary. Rest in redirects.

## To be fair to OpenAI

Shutting down the standalone browser is not the same as giving up on browser agents. OpenAI is folding Atlas's features into three places people already use: a ChatGPT extension for Chrome, a beefed-up browser inside the ChatGPT desktop app, and a cloud browser that runs tasks on OpenAI's own servers. The bet: the browser is a feature, not the destination.

## Bring the AI to the browser, not the other way around

Asking people to switch their whole browser is a big ask — new bookmarks, new logins, new habits. OpenAI ended up spreading Atlas across three destinations. Vibe just plugs into the browser you already have.

```
OpenAI: one browser splits into three
+-----------------+
|      Atlas      |
|  (own browser)  |
+-----------------+
         |
         +--> Chrome extension
         +--> ChatGPT desktop app browser
         +--> Cloud browser (OpenAI's servers)

Vibe: no new browser, one path
+------------+ --> +------------+ --> +------------+ --> +------------+
|  Existing  |     |    Vibe    |     |   Model    |     |  Browser   |
|   Chrome   |     | extension  |     | you choose |     |   action   |
+------------+ --> +------------+ --> +------------+ --> +------------+
```

Same idea, two different paths: OpenAI added new destinations, Vibe never left the one you already use.

## Pick your own model

Vibe is model-agnostic: point it at Google/Gemini, Azure and OpenAI-compatible providers, Anthropic via Claude Code OAuth, GitHub Copilot OAuth, OpenRouter, a local Chrome built-in model (Gemini Nano), or local Ollama. It also speaks MCP (Model Context Protocol), so its relay can multiplex several agents into one browser session instead of fighting over tabs.

## Keeping long tasks reliable

Long-running tasks fail in boring ways: a model stalls, a step needs a retry, the agent repeats itself. Vibe handles that with retries and timeouts, compaction when context gets heavy, doom-loop detection, a capped reflection budget, and a watchdog for stalled responses.

## The honest limits

Vibe is a permission-heavy extension, not a walled garden. It needs broad page access and debugger access to do its job. It can't open internal browser pages or local `file://` links, and hard or unclear tasks can still finish unfinished. Be skeptical of any tool that claims full autonomy with zero permissions.

## Five questions for any AI browser

| Ask | Why it matters |
|---|---|
| Can I choose my model and provider? | Avoids lock-in to one vendor's price or roadmap |
| Does it use my existing browser and logins? | No migration, no new habits |
| Can I see what it did, and recover from failure? | Trust needs visibility, not just output |
| Does it speak open standards like MCP? | Fits into tools you already use |
| Is it honest about the access it needs? | Real permissions beat vague promises |

## Try it, or don't

For more detail, [read the deeper comparison](/blog/agentic-browsers-atlas-comet-composite-vs-vibebrowser), check the [MCP setup](https://www.vibebrowser.app/mcp), the [privacy page](/privacy), or the [full comparison](https://www.vibebrowser.app/compare) — or just grab the [Chrome Web Store](https://chromewebstore.google.com/detail/vibe-ai-browser-co-pilot/djodpgokbmobeclicaicnnidccoinado) listing. Your bookmarks stay put.
