---
title: "AI Browser Automation Without the Headless Playwright Auth Pain"
description: "Login walls, 2FA, and expiring sessions break most headless Playwright and Puppeteer scripts. Skip the auth plumbing entirely by driving your already-authenticated Chrome. Here's why, and how."
date: "2026-07-23"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - "Browser Automation"
  - "Playwright"
  - "Puppeteer"
  - "Authentication"
  - "AI Agents"
  - "Chrome Extension"
published: true
---

Most browser automation dies at the login screen. Your Playwright or Puppeteer script works great on a public page, then you point it at something behind a password and 2FA, and now you're maintaining a login flow instead of doing the actual task.

If the automation runs on *your* machine for *your* accounts, there's a shortcut worth knowing: don't automate login at all. Drive the browser that's already logged in.

## Why headless auth is a tax you keep paying

Headless Playwright and Puppeteer start from a blank profile. To reach anything gated, you end up building — and re-building — some version of this:

- **Login scripting.** Fill email, fill password, submit. Fine until the form changes or adds a bot check.
- **2FA handling.** TOTP codes, SMS, or push approval. Now your script needs access to a secret store or a phone.
- **Session persistence.** Save `storageState`, reload it next run, hope it hasn't expired. It expires.
- **Bot detection.** Fresh headless fingerprints get flagged. You add stealth plugins and residential proxies and the arms race is on.

None of this is your real problem. Your real problem was "read the invoice total" or "check the deploy status." The auth plumbing is pure overhead — and it's the part that breaks at 2am.

## The shortcut: use the session you already have

You're already logged into these sites in Chrome. The cookies are valid. The 2FA already happened. If your automation runs inside that browser, every auth problem above disappears.

That's the model Vibe uses. It's a Chrome extension with an AI agent in the side panel, and it acts inside your real, logged-in session:

- No login script — you're already logged in.
- No 2FA handling — the session is already established.
- No `storageState` juggling — it's the live profile.
- No bot-detection cat-and-mouse — it's a real browser with a real history.

The agent navigates, clicks, extracts data, and fills forms. Actions you can't undo are left for your approval instead of firing automatically.

## When headless is still the right tool

This isn't "never use Playwright." Headless is correct when:

- You run in **CI** and need a clean, reproducible, isolated browser per run.
- You're testing a **logged-out** flow, or signup itself.
- You need **many parallel** browsers on a server.
- You want a **deterministic** script pinned to exact selectors.

Use headless there. But for the large category of "automate a thing across sites I'm logged into, from my own machine," fighting auth in a blank browser is the wrong trade.

| Situation | Headless Playwright/Puppeteer | Your authenticated Chrome (Vibe) |
|---|---|---|
| Behind login + 2FA | Script it, store secrets, maintain it | Already authenticated |
| Session expiry | Re-auth logic, `storageState` refresh | Live profile, no expiry juggling |
| Bot detection | Stealth plugins, proxies | Real browser, real fingerprint |
| CI / parallel runs | Strong fit | Not the target use case |
| Logged-out / signup flows | Strong fit | Use headless |

## What it looks like in practice

Instead of a 120-line login-plus-scrape script, the task is a sentence:

- "Download this month's invoices from the billing portal."
- "Read the top unresolved tickets and summarize them."
- "Fill this vendor form with our company details." (You approve the submit.)

Model-agnostic, too — point Vibe at Azure OpenAI, GitHub Copilot, OpenRouter, Grok, DeepSeek, or a local Ollama model. And if you want a coding agent to drive the same authenticated browser, Vibe [runs as an MCP server](/mcp) so Claude Code, Cursor, and Codex can use it as a tool. Prefer a scriptable terminal entry point? There's a [CLI](/cli).

## FAQ

**Can I automate a site behind 2FA without scripting the login?**
Yes, if you're already logged in on that browser. Vibe acts inside your live Chrome session, so the 2FA that already happened still counts — there's no login step to automate.

**Is this a replacement for Playwright?**
No. It's better for automating tasks across sites you're logged into from your own machine. Playwright and Puppeteer remain the right choice for CI, isolated test runs, and logged-out flows.

**Does it get flagged as a bot?**
It's your actual browser with real history and a real fingerprint, so it doesn't present like a fresh headless instance. There's no stealth-plugin arms race.

**What runs the automation?**
An AI agent in the Chrome side panel, model-agnostic across Azure OpenAI, GitHub Copilot, OpenRouter, Grok, DeepSeek, Gemini Nano, and Ollama. Irreversible actions wait for your approval.

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type": "Question", "name": "Can I automate a site behind 2FA without scripting the login?", "acceptedAnswer": {"@type": "Answer", "text": "Yes, if you are already logged in on that browser. Vibe acts inside your live Chrome session, so the 2FA that already happened still counts and there is no login step to automate."}},
    {"@type": "Question", "name": "Is authenticated-browser automation a replacement for Playwright?", "acceptedAnswer": {"@type": "Answer", "text": "No. It is better for automating tasks across sites you are logged into from your own machine. Playwright and Puppeteer remain the right choice for CI, isolated test runs, and logged-out flows."}},
    {"@type": "Question", "name": "Does driving my real browser get flagged as a bot?", "acceptedAnswer": {"@type": "Answer", "text": "It is your actual browser with real history and a real fingerprint, so it does not present like a fresh headless instance, and there is no stealth-plugin arms race."}},
    {"@type": "Question", "name": "What runs the automation?", "acceptedAnswer": {"@type": "Answer", "text": "An AI agent in the Chrome side panel, model-agnostic across Azure OpenAI, GitHub Copilot, OpenRouter, Grok, DeepSeek, Gemini Nano, and Ollama. Irreversible actions wait for user approval."}}
  ]
}
</script>

## Try it

Stop rebuilding login flows. Automate inside the browser that's already authenticated. Install Vibe: [vibebrowser.app/install](https://www.vibebrowser.app/install?utm_source=blog-ai-browser-automation-without-playwright-auth-pain).
