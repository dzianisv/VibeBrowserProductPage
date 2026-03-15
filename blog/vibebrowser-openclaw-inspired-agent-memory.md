---
title: "How We Brought OpenClaw-Style Memory to VibeBrowser"
description: "VibeBrowser now remembers what you tell it — across sessions, across tasks. Inspired by OpenClaw's dual memory architecture, we built persistent agent memory that works inside a browser extension."
date: "2026-03-15"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - product-update
  - release-notes
  - memory
  - ai-agent
  - openclaw
  - browser-automation
  - personalization
published: true
slug: vibebrowser-openclaw-inspired-agent-memory
---

Your AI browser assistant now has a memory. Tell it your preferences, your login details, your workflow patterns — and it remembers them the next time you open your browser.

This week we shipped persistent agent memory for VibeBrowser, and we want to share how we designed it — including what we learned from studying OpenClaw's memory architecture.

## The problem: every session starts from zero

Before this update, every VibeBrowser conversation started with a blank slate. You could tell the agent "I always want dark mode" or "my company uses Jira, not GitHub Issues" — and it would forget the moment you closed the tab. For simple one-off tasks that's fine, but for anyone using VibeBrowser regularly, repeating context gets tedious fast.

We wanted the agent to accumulate knowledge over time, like a colleague who learns how you work.

## What we learned from OpenClaw

[OpenClaw](https://github.com/nichochar/openclaw) is an open-source AI coding agent with one of the best memory implementations we've seen. We studied its architecture closely before building ours.

### OpenClaw's dual memory model

OpenClaw stores memories as Markdown files on disk, split into two categories:

- **`MEMORY.md`** — a curated file of long-term facts. Think of it as a personal README: your name, your preferences, important project decisions, things the agent should always know.
- **`memory/YYYY-MM-DD.md`** — daily log files. Each day gets its own file where the agent appends session notes, discoveries, and context that might be useful later but isn't permanent.

This separation is smart. Durable facts (your preferences, account details) live in one place. Ephemeral context (what you researched today, intermediate results) lives in another. The agent searches both but treats them differently.

### OpenClaw's search: hybrid retrieval

For finding relevant memories, OpenClaw uses a sophisticated hybrid approach:

- **Vector search** with embeddings (cosine similarity) for semantic matching — finding memories that are conceptually related even if the words don't match
- **BM25/FTS5 keyword search** for exact term matching — finding memories that contain the specific words you're looking for
- **MMR (Maximum Marginal Relevance)** to merge results and reduce redundancy

The system indexes memories as chunks in a SQLite database with FTS5 full-text search and `sqlite-vec` for vector storage. It supports multiple embedding providers (OpenAI, Gemini, Voyage, Mistral, Ollama) and includes temporal decay so recent memories rank higher.

### OpenClaw's tool surface

The agent interacts with memory through two clean tools:

- **`memory_search(query, maxResults?, minScore?)`** — recall relevant snippets by semantic query
- **`memory_get(path, from?, lines?)`** — read a specific file by path and line range

Writing is done through the regular file-editing tools — the agent simply edits `MEMORY.md` or appends to the daily log file.

## How we adapted it for VibeBrowser

A browser extension is a very different environment from a CLI coding agent. We can't use the filesystem, we can't run SQLite natively, and we can't install embedding model libraries. So we kept the concepts and adapted the implementation.

### Storage: `chrome.storage.local` instead of files

Where OpenClaw writes Markdown files, we store structured entries in Chrome's local storage under the `vibe_memory` namespace. Each entry has the same dual classification:

- **`durable`** — long-term facts (equivalent to `MEMORY.md`)
- **`daily`** — session log entries (equivalent to `memory/YYYY-MM-DD.md`)

We also handle **legacy data migration** automatically. If you had memories from the old system (which used a graph-based model under `vibeAIMemories`), they're converted to the new format on first load.

### Search: keyword scoring with recency bias

Without embeddings available in the extension context, we implemented a **term-match scoring** approach:

1. Tokenize the query and each memory entry
2. Score each entry by the ratio of query terms that match (with partial/prefix matching for flexibility)
3. Apply a **recency boost** — memories from the last 7 days get a small score bonus, decaying linearly
4. Filter by minimum score threshold and return ranked results

This isn't as powerful as OpenClaw's hybrid vector + BM25 approach, but it's surprisingly effective for the typical memory sizes in a browser extension (hundreds of entries, not thousands of files). And it runs instantly with zero external dependencies.

### Tool surface: compatible naming with strong agent guidance

We matched OpenClaw's naming convention and, critically, adopted their approach of **embedding behavioral instructions directly in tool descriptions**. OpenClaw's `memory_search` description starts with "Mandatory recall step" — telling the agent this isn't optional. We did the same:

- `memory_search` description says: *"Mandatory recall step: search stored memories before answering questions about prior work, user preferences, decisions, people, accounts..."*
- `memory_write` description says: *"Call proactively when the user shares reusable personal info — don't wait to be asked."*

We also added a **Memory section to the agent's system prompt** with explicit rules:

> - **memory_search**: ALWAYS call before answering questions about user preferences, prior tasks, personal details, or anything the user previously told you.
> - **memory_write**: Proactively store user preferences, account details, addresses, recurring instructions, and important decisions.
> - Don't wait for "remember this" — if the user shares reusable personal info, store it automatically.

This is the key insight from studying OpenClaw: the tools themselves aren't enough. You need to tell the agent **when** to use them, and make recall feel mandatory rather than optional.

| Tool | What it does |
|------|-------------|
| `memory_search` | Keyword search across all memories, returns ranked snippets |
| `memory_get` | Read a specific memory entry by ID |
| `memory_write` | Store a new durable or daily memory (our addition — OpenClaw uses file tools) |
| `memory_status` | Summary: counts, top tags, storage info |
| `memory_delete` | Remove a specific memory entry |

The key addition is `memory_write` — since the agent can't edit files in a browser extension, we give it an explicit write tool. The `kind` parameter (`durable` or `daily`) maps directly to OpenClaw's two-file model.

### Exposed via MCP

All memory tools are registered in the browser tools array, which means they're automatically available through the **MCP protocol**. If you're controlling VibeBrowser from Claude, Cursor, or any other MCP client, the memory tools show up alongside navigation, clicking, and form-filling — ready to use.

## What this looks like in practice

**You:** "Remember that I prefer dark mode on all websites"
→ Agent calls `memory_write({ kind: "durable", text: "User prefers dark mode on all websites", tags: ["preference", "ui"] })`

**Next session, you:** "Set up this new site for me"
→ Agent calls `memory_search({ query: "preferences ui settings" })` → finds the dark mode preference → enables dark mode automatically

**You:** "What did I research yesterday about flights?"
→ Agent calls `memory_search({ query: "flights research" })` → finds daily log entries from yesterday's session

The agent builds up a picture of how you work, what you prefer, and what you've done — and uses that context to be more helpful over time.

## What's next for memory

This is the foundation. We're exploring:

- **Semantic search via embeddings** — using a lightweight model to enable "meaning-based" recall, not just keyword matching
- **Automatic memory extraction** — the agent notices important facts during conversations and stores them without being asked
- **Memory sharing across devices** — sync your agent's knowledge via encrypted cloud storage

For now, your VibeBrowser agent has a memory that persists, searches, and grows with you. Tell it what matters, and it won't forget.

**[Install VibeBrowser](https://vibebrowser.app)** to try agent memory today.
