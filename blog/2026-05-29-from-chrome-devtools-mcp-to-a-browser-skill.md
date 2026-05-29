---
title: "From chrome-devtools-mcp to a browser skill: what broke and what we built"
description: "We forked Google's chrome-devtools-mcp to share one real Chrome across several AI agents. It crashed on memory, raced on connections, and shipped broken builds. Here is why we dropped the MCP server and rebuilt the part we needed as a small browser skill."
date: "2026-05-29"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - AI browser automation
  - chrome-devtools-mcp
  - MCP
  - agent skills
  - OpenCode
  - Claude Code
  - browser agents
published: true
---

We wanted our AI coding agents to drive the *real* Chrome on the machine — the one already logged into Play Console, GitHub, and the staging dashboard — and we wanted several agents to share that one browser at the same time.

Most tools don't do this. Headless Playwright launches a throwaway browser with no logins. Cloud browsers are isolated and signed out. We needed agents acting inside the user's real, authenticated Chrome, together.

We started by forking Google's [`chrome-devtools-mcp`](https://github.com/ChromeDevTools/chrome-devtools-mcp), an MCP server (MCP = Model Context Protocol, the standard agents use to call tools). Three months later we deleted that approach. Here is what broke and what we replaced it with.

## What we added to the fork

Upstream is one agent, one browser, one process. We needed many agents on one browser, so we built:

- A local always-on service that owns the browser connection.
- An HTTP transport so any agent could connect to `localhost:9333` instead of starting its own server.
- Session management: one shared browser, tool calls serialized, idle sessions reaped.

On paper, done. In practice, every week was another bug in code we didn't own and couldn't shrink.

## The build passed and shipped broken code

The build used TypeScript's incremental cache, which tracks source changes but not whether the compiled output still exists. Bundle once, and the next build would exit `0` while shipping a build missing a required module. The service then crash-looped for hours with "module not found" while the build reported success. A green exit code that means nothing is worse than a red one.

## Two agents, two permission dialogs

The whole point of a shared service is that all agents reuse one connection to Chrome over CDP (Chrome DevTools Protocol). But the connect code was upstream single-client logic: check "is there a connection?", then connect — with an `await` in between. When two agents started at the same moment, both saw "no connection" and both connected.

Chrome shows an "Allow remote debugging?" prompt on every new connection. So starting two agents at once produced two prompts and two connections. The shared-browser feature un-shared itself under the exact case it existed for.

## It ran out of memory and dropped sessions

This is the one that ended it. Each session builds its own copy of the DevTools frontend, and the bundle drags in an 8 MB Lighthouse blob. Under a few concurrent sessions the process passed its heap limit and died with `JavaScript heap out of memory`. The service auto-restarts, so every agent's session dropped mid-task, silently. An agent halfway through a Play Console flow would just watch the browser die. In a status report that becomes one line: "chrome-devtools too unstable for that step."

We fixed each bug in our fork. Fixing them is what taught us the real problem.

## The real problem was the shape, not the bugs

`chrome-devtools-mcp` is a good tool for one agent that needs deep DevTools, tracing, and Lighthouse. That is a heavy design: it pulls in the entire DevTools frontend, and it was never meant to be a shared, always-on, multi-agent service.

We were spending most of our time bending a large codebase we didn't control into a use case it wasn't built for. The part we actually needed — a persistent, shared connection to the real Chrome that several agents can use — was maybe 5% of what we were carrying.

So we wrote that 5%.

## What we built instead: a browser skill

The replacement lives in [github.com/dzianisv/skills](https://github.com/dzianisv/skills) as the `my-browser` skill. It is not a server. It's a skill — a `SKILL.md` plus a few hundred lines of TypeScript:

- A persistent gateway that holds one connection to the user's real Chrome.
- A thin client the agent calls per command: `navigate`, `get_text`, `screenshot`, `eval`, `list_pages`, `new_page`, `insert_text`, `key_press`.

It uses Chrome 144+ autoConnect, so there's no debug-port flag and no second browser. You click "Allow" once. The gateway runs as one background daemon that is never restarted per agent — the client checks if it's already running and only starts it if not. That single rule removes the repeated prompts and the dropped sessions from the server version.

Because it's a skill, not a server, any agent runtime can use it — Claude Code, OpenCode, Codex, or anything that reads the [Agent Skill](https://agentskills.io/specification) format. Nothing to install, no port, no daemon to babysit beyond the one gateway.

## Server vs skill

| | MCP server fork | `my-browser` skill |
|---|---|---|
| Code we maintain | full DevTools frontend + Lighthouse | a few hundred lines |
| Memory | per-session DevTools universe; OOM under load | one gateway, one connection |
| Concurrency | HTTP sessions + mutex + reaper, with races | one shared daemon, nothing to multiplex |
| Install | service, port, config per environment | drop a folder in the skills directory |
| Agent support | per-runtime MCP setup | any Agent Skill runtime |

## What we'd tell you

If you're forking a big tool and patching it weekly to fit a job it wasn't built for, count how much of it you actually use. If it's a small fraction, writing that fraction yourself can be cheaper than owning the bugs in the rest.

This is the path we take with VibeBrowser: give agents the real, logged-in browser through the smallest control layer that works — local when it should be local — instead of a heavy server in the middle. For sharing one Chrome across agents, a skill turned out to be the right size.
