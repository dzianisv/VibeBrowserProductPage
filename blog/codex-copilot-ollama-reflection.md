---
title: "Our Codex Fork Now Supports GitHub Copilot, Ollama, and a Reflection Layer"
description: "Recent work in our team's custom Codex fork made the local coding stack more flexible with first-class GitHub Copilot login, safer Ollama model discovery, and an experimental reflection loop that can retry incomplete work."
date: "2026-03-15"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - engineering
  - codex
  - github-copilot
  - ollama
  - reflection
  - local-coding-tools
published: true
---

Good local coding tools should do two things well:

1. let you bring the model providers you actually use, and
2. recover when the first answer is not good enough.

Recent work in our team's custom `codex` fork improved both.

This is not outside commentary on somebody else's stack. It is our own work on a `codex` fork we use day to day, because we want to keep improving the coding tools we rely on ourselves.

The most interesting March 2026 changes are not cosmetic. They pushed our `codex` fork toward a more practical day-to-day local stack:

- GitHub Copilot became a real provider with built-in login
- Ollama support got more honest and reliable
- an experimental reflection layer can judge incomplete work and push the agent to try again

That combination matters because local coding tools are only useful if they are flexible on provider choice and stubborn enough to catch weak first passes.

## GitHub Copilot became a first-class provider

The biggest usability win is that GitHub Copilot support is no longer something users have to fake through generic OpenAI-compatible config.

Recent `codex` commits added:

- a built-in `github-copilot` provider
- device-code login via `codex login --github-copilot`
- token persistence after login
- provider-aware model discovery from the Copilot `/models` endpoint

That changes the experience in a meaningful way.

If you already use GitHub Copilot, `codex` can now plug into that ecosystem directly instead of forcing you to start with a completely separate provider setup.

## The model picker got better, not just broader

The Copilot work also fixed a couple of subtle product issues that matter in practice.

One commit removed the `Openai-Intent` header from the `/models` listing request because it was filtering out parts of the available model set. Another added fallback behavior when a selected Copilot model is unsupported or unavailable, so sessions fail soft instead of getting stuck on a bad choice.

That is the right kind of product hardening:

- discover the real available models
- do not depend on stale bundled assumptions
- keep the session working even when a specific model disappears or lacks support for the current API path

For developers, that means the `/model` picker becomes much more trustworthy.

## Ollama support got more honest

Local-model support is only good if it reflects what is actually installed on your machine.

Recent `codex` work made Ollama handling better in three ways:

- fetch local models from `/v1/models`
- fall back to Ollama `/api/tags` when needed
- stop leaking bundled GPT-style defaults into an Ollama session when discovery fails

That last fix is especially important.

Showing remote bundled models in a local Ollama workflow is confusing because it suggests options the local runtime may not actually have. The newer behavior is stricter and better: if local discovery fails, `codex` clears the catalog instead of pretending the default cloud models still make sense.

There is also filtering for picker-disabled models, which makes the UI cleaner and reduces dead-end model choices.

## The reflection layer is the "work harder and smarter" feature

The most ambitious recent change is the reflection layer.

It is explicitly marked **experimental**, but the idea is strong: after the agent finishes a task, a judge model can evaluate whether the work is actually complete. If the verdict says the answer is incomplete, `codex` feeds that feedback back into the loop and tries again.

The current reflection flow is:

1. execute the task with tools
2. collect the original request, recent tool calls, and final response
3. ask the judge model for a structured verdict
4. retry with feedback if the task is incomplete
5. stop after a configurable number of attempts

This is the cleanest "make the agent work harder" mechanism in the recent `codex` repo work.

It is also not buried in a hidden branch of the runtime. The feature now has:

- config support
- protocol-level verdict events
- UI rendering for verdict feedback
- persisted enable/disable state through the TUI

That means reflection is becoming a real product surface, not just a lab experiment inside core logic.

## Why this matters beyond the feature flag

The point of reflection is not that every answer needs a second model forever.

The point is that local coding tools need a principled way to distinguish:

- "the model responded"
- from "the task was actually completed"

Those are not the same thing.

The sample evaluation in the reflection docs shows the shape of the benefit: one comparison moved from `2/3` tasks passed without reflection to `3/3` with reflection. That is not enough to claim broad benchmark superiority, but it is enough to show why this design direction is promising.

## Why these three improvements fit together

The Copilot, Ollama, and reflection work all push the same core idea:

- provider flexibility for people who already live in GitHub Copilot
- better local-model realism for people running Ollama
- a retry-and-verdict loop for cases where the first pass is not enough

Together, that makes `codex` more practical for real project work.

It also makes the stack more adaptable:

- cloud-backed when you want managed models
- local when you want OSS models on your own machine
- stricter about validating whether the work is actually done

That is a much better story than a local coding agent that only works well with one provider and only gives you one shot.

## One caveat to keep honest

The reflection layer is not default-on general availability yet.

The repo and docs are explicit that it is **experimental**. Model availability also still depends on what the configured provider actually returns, especially on the Copilot side.

So the strongest honest summary is this:

`codex` is getting better at provider flexibility and second-pass task verification, but some of the most interesting parts are still in active rollout.

## Why we are building this ourselves

We are investing in this direction because local coding tools are converging on the same shape:

- multiple providers
- optional local-model backends
- richer runtime events
- more explicit evaluation loops

That is exactly the stack you want if the goal is not just "generate code," but "keep working until the task is actually complete."

That is also why our team keeps working on this custom `codex` fork directly. We build and improve the coding tools we use ourselves, so better provider support, more honest local-model handling, and stronger verification loops are not abstract roadmap ideas for us. They directly shape how we ship.

## References

- `feat: github copilot model discovery and reflection toggle persistence`  
  https://github.com/dzianisv/codex/commit/41a47906c259e67cbf391d7888793f76c33198fd
- `fix: strip Openai-Intent header from /models request to show all Copilot models`  
  https://github.com/dzianisv/codex/commit/da95e6cbda21ceca8d490bda5277915390e6641f
- `fix: fallback unsupported copilot models in CLI`  
  https://github.com/dzianisv/codex/commit/0e20550daf471ed82fcc425008aebd72b747c63e
- `Fix Copilot localhost model discovery and in-session switch coverage`  
  https://github.com/dzianisv/codex/commit/515d7ad7bcb544e1693a04a86df65164086d78ed
- `fix: filter picker-disabled models and refresh ollama catalogs`  
  https://github.com/dzianisv/codex/commit/3c3395e6238da87f422e50b8cfc095d935c5708d
- `fix(ollama): prevent bundled model fallback on discovery failure`  
  https://github.com/dzianisv/codex/commit/3e01ad6ccdfd46e0e1eeeafcb0111a70b8859e41
- `feat: experimental reflection enable/disable and verdict pipeline`  
  https://github.com/dzianisv/codex/commit/08e9a1ee58ea103a946e2dee0277624093cb71dc
- `Reflection Layer` docs  
  https://github.com/dzianisv/codex/blob/main/docs/reflection.md
