---
title: "GPT-5.4 Support Is Live in Vibe — and Kimi-K2.5 Is Now in the Free Tier"
description: "Vibe now supports GPT-5.4 for higher-confidence browser work and adds Kimi-K2.5 to the free tier for fast, tool-heavy agentic workflows."
date: "2026-03-15"
author: "Vibe Product Team"
tags:
  - product-update
  - gpt-5.4
  - kimi-k2.5
  - model-routing
  - agentic-web
published: true
---

Today we shipped two model updates in Vibe:

1. **GPT-5.4 support** for users who want stronger reasoning and more reliable step selection on messy browser tasks.
2. **Kimi-K2.5 in the free tier** so more users can try serious agentic web workflows without immediately paying frontier-model prices.

This is part of the product direction we keep leaning into: **the browser operator layer should stay model-flexible**.

## Why GPT-5.4 matters in Vibe

Some web tasks are not hard because they need one clever answer. They are hard because they need a long chain of correct micro-decisions:

- which tab or section matters
- which control is actually interactive
- when to ask for confirmation instead of guessing
- how to recover when the page changes shape mid-run

That is where higher-end reasoning models help.

GPT-5.4 is a strong fit for:

- multi-step browser tasks with ambiguous UI states
- workflows where a bad click is expensive
- tasks that benefit from better planning before acting
- runs where users want fewer retries and less babysitting

In practice, this is the model we expect many users to prefer when the workflow is high-stakes and the cost of a wrong action is higher than the cost of a better model.

## Why we added Kimi-K2.5 to the free tier

We also wanted a **fast, capable, lower-cost option** for agentic browsing.

Kimi-K2.5 stood out because the public technical material points to a model that is unusually focused on **tool use, coding, and agentic search workflows**, not just static chat.

From Moonshot AI's public materials, Kimi-K2.5 is positioned as a native multimodal agentic model with:

- a **256K context window**
- an **agent swarm** mode that can coordinate up to **100 sub-agents**
- support for up to **1,500 tool calls** in parallel workflows
- a claim of up to **4.5x lower execution time** versus a single-agent setup on complex tasks

Those are exactly the kinds of traits we care about for browser automation: long context, strong tool behavior, and decent speed under multi-step workloads.

## How good is Kimi-K2.5 for agentic web tasks?

Short version: **promising enough that it belongs in the product, especially as a free-tier option**.

The public benchmark story is strong:

- On the Kimi-K2.5 model card, Moonshot reports **50.2 on HLE-Full with tools**
- **78.4 on BrowseComp (Agent Swarm)**
- **85.0 on LiveCodeBench**
- **76.8 on SWE-Bench Verified**

None of those numbers guarantee perfect browser execution in the wild, but they do suggest Kimi-K2.5 is not just a cheap fallback model. It looks genuinely competitive for tool-heavy tasks and coding-adjacent workflows.

For web tasks specifically, the BrowseComp and tool-augmented scores are the most interesting signals. They suggest Kimi-K2.5 is worth using when the job looks like:

- research across many pages
- extraction plus summarization
- multi-step browsing with tool calls
- broad workflow exploration where speed and cost matter

## How quick is it?

There are two different meanings of "quick" here:

### 1) Agent workflow speed

Moonshot's own launch material says Kimi-K2.5 can reduce execution time by up to **4.5x** versus a single-agent setup by breaking tasks into a coordinated swarm. If that translates cleanly to real tool stacks, that is a meaningful advantage for web research and multi-page agent flows.

### 2) Raw serving speed

Serving speed depends on the provider, but public infrastructure partners are clearly optimizing for Kimi. Fireworks claims up to **200 tokens/sec** on its Kimi-K2.5 endpoint. That is not a universal model guarantee, but it is a good sign that the ecosystem expects Kimi to be used in latency-sensitive workflows.

Our practical read is:

- **GPT-5.4** is the better default when accuracy and judgment matter most.
- **Kimi-K2.5** is a strong option when you want lower-cost experimentation, fast tool-heavy runs, or a free-tier model that is still meaningfully agentic.

## Our current recommendation

If you are choosing between the two inside Vibe today:

- Use **GPT-5.4** for brittle, high-value browser workflows where you want better decision quality.
- Use **Kimi-K2.5** when you want a fast, capable model for research, coding-adjacent browsing, and general agentic web tasks without burning premium credits.

That is exactly why we wanted both in the stack.

## Why this matters for Vibe

We do not think the future of browser agents belongs to a single model vendor.

Different workflows want different tradeoffs:

- best possible reasoning
- lowest possible latency
- lower cost at higher volume
- open-ish model options
- better coding and tool-use bias

Adding GPT-5.4 and Kimi-K2.5 moves Vibe further toward that model-routing future.

## Try it

If you are already using Vibe, you can now:

- pick **GPT-5.4** when the task needs more judgment
- use **Kimi-K2.5** in the **free tier**
- compare outcomes on the same workflow and see which tradeoff fits your stack

This is the right way to evaluate browser agents anyway: not by vibes, but by repeated workflows.

## References

- Moonshot AI: Kimi K2.5 launch  
  https://www.kimi.com/blog/kimi-k2-5.html
- Hugging Face model card: `moonshotai/Kimi-K2.5`  
  https://huggingface.co/moonshotai/Kimi-K2.5
- Fireworks: Kimi K2.5 launch and serving-speed notes  
  https://fireworks.ai/blog/kimi-k2p5

---

We will keep expanding model coverage, but the core product principle stays the same: **users should be able to choose the right model for the workflow, not the model a browser product picked for them**.
