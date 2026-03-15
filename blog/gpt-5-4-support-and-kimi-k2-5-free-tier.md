---
title: "GPT-5.4 Support Is Live in Vibe — and Kimi-K2.5 Is Now in the Free Tier"
description: "Vibe now supports GPT-5.4 for higher-confidence browser work and adds Kimi-K2.5 to the free tier for fast, tool-heavy agentic workflows."
date: "2026-03-15"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
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

Short version: **promising enough that it belongs in the product, especially as a free-tier option** — and the public BrowseComp data puts it in the top open-weight cluster rather than in a runaway lead.

## BrowseComp is the browser benchmark we care about most

As of **March 15, 2026**, BrowseComp is one of the best public sanity checks for browser-adjacent agent work. The benchmark includes **1,266 questions** that require agents to persistently navigate the web and find concise, verifiable answers, rather than just recall memorized facts.

That is why it matters more to us than a generic static QA benchmark when we decide which models belong in Vibe.

## BrowseComp leaderboard: GPT-5.4, Kimi-K2.5, and the open-weight field

On the public BrowseComp leaderboard, **GPT-5.4** is clearly ahead of **Kimi-K2.5**. But the more relevant comparison for a free-tier model is where Kimi lands against the other strong open-weight entrants.

| Model | Public BrowseComp score | Weight status | What it suggests for Vibe |
| --- | ---: | --- | --- |
| GPT-5.4 | **0.827** | Proprietary | Stronger choice when a browser run is expensive to get wrong. |
| MiniMax M2.5 | **0.763** | Open-weight | Currently the highest-scoring open-weight peer in this set, with an explicit tool-use and search focus. |
| GLM-5 | **0.759** | Open-weight | Slightly ahead of Kimi on public BrowseComp, with positioning centered on agentic engineering. |
| Kimi-K2.5 | **0.749** | Open-weight | Top-tier open-weight result. Moonshot also reports **74.9** with context management and **78.4** in Agent Swarm mode on its own eval setup. |
| Qwen3.5-397B-A17B | **0.690** | Open-weight | Capable, but materially behind Kimi on this benchmark. |

That table changes the story a bit. **Kimi-K2.5 is not the single highest-scoring open-weight model on BrowseComp today.** But it is firmly in the top cluster: within **0.014** of MiniMax M2.5 and **0.010** of GLM-5, while staying comfortably ahead of Qwen3.5-397B-A17B.

For Vibe, that matters because Kimi's differentiator is not just raw leaderboard placement. Moonshot is explicitly optimizing for **long-context, tool-heavy, multi-agent execution**. Its public materials emphasize a **256K context window**, up to **100 sub-agents**, and up to **1,500 tool calls** in swarm mode. That is unusually aligned with browser tasks that fan out across many pages, tabs, and search branches.

The broader benchmark story is still strong:

- On the Kimi-K2.5 model card, Moonshot reports **50.2 on HLE-Full with tools**
- **85.0 on LiveCodeBench**
- **76.8 on SWE-Bench Verified**

None of those numbers guarantee perfect browser execution in the wild, but they do suggest Kimi-K2.5 is not just a cheap fallback model. It looks genuinely competitive for tool-heavy tasks and coding-adjacent workflows.

For web tasks specifically, the BrowseComp results are the most interesting signal. They suggest Kimi-K2.5 is worth using when the job looks like:

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

- OpenAI / BrowseComp paper  
  https://arxiv.org/abs/2504.12516
- BrowseComp public leaderboard  
  https://llm-stats.com/benchmarks/browsecomp
- Moonshot AI: Kimi K2.5 launch  
  https://www.kimi.com/blog/kimi-k2-5.html
- Hugging Face model card: `moonshotai/Kimi-K2.5`  
  https://huggingface.co/moonshotai/Kimi-K2.5
- MiniMax: MiniMax-M2.5 launch  
  https://www.minimax.io/news/minimax-m25
- Z.AI developer docs: GLM-5  
  https://docs.z.ai/guides/llm/glm-5
- Qwen3.5 official repository  
  https://github.com/QwenLM/Qwen3.5
- Hugging Face model card: `Qwen/Qwen3.5-397B-A17B`  
  https://huggingface.co/Qwen/Qwen3.5-397B-A17B
- Fireworks: Kimi K2.5 launch and serving-speed notes  
  https://fireworks.ai/blog/kimi-k2p5

---

We will keep expanding model coverage, but the core product principle stays the same: **users should be able to choose the right model for the workflow, not the model a browser product picked for them**.
