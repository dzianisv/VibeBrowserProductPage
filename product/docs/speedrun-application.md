# Vibe Browser - a16z Speedrun Application (SR007)

## Application Responses

---

### What does your company do? (One sentence)

Vibe Browser is an AI browser agent that autonomously executes web tasks - research, outreach, form filling - using any AI model while running 100% private on your device.

---

### What are you building? (Detailed description)

We're building an autonomous browser co-pilot that doesn't just answer questions - it acts. Users describe tasks in plain English ("find 10 SaaS companies hiring in Seattle", "draft LinkedIn outreach to these leads", "compare flights to NYC") and Vibe executes multi-step workflows across any website.

**What makes us different:**

1. **True local AI**: Gemini Nano runs entirely on-device. Your browsing data never leaves your machine. No other browser agent offers this.

2. **Model freedom**: GPT, Claude, Gemini, Grok, DeepSeek - switch anytime. No vendor lock-in like OpenAI Operator (OpenAI only) or Manus (Manus only).

3. **Chrome extension**: Works on any Chrome browser. Competitors require browser forks that break existing workflows.

4. **User stays in control**: Every action is visible. Critical actions require approval. The AI does the clicking - you make the decisions.

---

### Why are you the right team to build this?

**Dzianis Vashchuk (Founder)** built exactly this problem at Coinbase. For 3.5 years, he developed LLM agent tooling for Coinbase's on-call engineers - integrating AI with Databricks, Datadog, GitHub, and Jira. Before that, he shipped distributed systems at BitTorrent. He knows browser automation failure modes intimately: race conditions, flaky selectors, state management across tabs.

The insight came from watching engineers spend hours on repetitive web tasks that required human judgment but not human clicking. The solution needed to be private (enterprise data), flexible (different AI providers), and work everywhere (any website).

**Team composition:**
- Dzianis (Founder): Full-stack, 10+ years, ex-Coinbase/BitTorrent
- Dzmitry Dalenka (ML Engineer): Model optimization, fine-tuning
- Dzmitry Kastsenich (Software Engineer): Extension architecture

All three work full-time on Vibe. We've known each other for years and have shipped production software together before.

---

### What is your unique insight about this market?

**The secret**: Browser AI agents will be commoditized by whoever wins the privacy battle.

Everyone is building cloud-based agents because it's easier. But the best browser automation requires accessing logged-in accounts - Gmail, LinkedIn, bank accounts, CRMs. Users won't give that access to a cloud service that logs their data.

Chrome's Gemini Nano (shipped in 2024) changes everything. For the first time, capable AI runs 100% locally in the browser. We're building on this before OpenAI or Anthropic can react. They're locked into cloud-first architectures.

**Market validation of the problem:**
- Manus: $100M+ ARR in <1 year, acquired by Meta for $2B
- OpenAI Operator: Launched as flagship product
- Perplexity Comet: Major investment

But all are cloud-only, single-model. The privacy-first, model-agnostic player hasn't emerged yet.

---

### What have you learned from talking to users?

We've talked to 50+ potential users across sales, recruiting, and research roles. Key learnings:

1. **Privacy is non-negotiable for power users.** A sales director at a Series B startup said: "I'd love to automate LinkedIn outreach, but I can't let a third party access my account. Compliance would kill it."

2. **Model preference varies wildly.** Some users swear by Claude for writing, GPT for reasoning, Gemini for speed. Forcing one model kills adoption.

3. **The last mile is approval, not execution.** Users don't want fully autonomous agents. They want to review outreach messages before sending, check bookings before confirming. The agent should do the work, the human should make the call.

4. **Existing tools break constantly.** Every sales person we talked to had tried and abandoned 2-3 LinkedIn automation tools. They break after every LinkedIn update. Our DOM analysis approach is more resilient.

---

### What traction do you have?

- **Live product**: Released on Chrome Web Store, working demos
- **Paying users**: Early customers acquired through direct outreach
- **Waitlist**: ~300 signups at vibebrowser.app
- **Demo workflows**: LinkedIn outreach, Gmail management, Calendar automation, Research synthesis
- **Burn**: $5-10k/month (bootstrapped)

---

### What will you build in the next 3 months?

**Month 1: Reliability**
- Improve agent success rate from 70% to 90% on core workflows
- Better error recovery and retry logic
- User feedback loop for failed tasks

**Month 2: Growth**
- Workflow templates for common tasks (LinkedIn prospecting, competitive research)
- User-shared workflow library
- Chrome Web Store optimization for organic discovery

**Month 3: Monetization**
- Pro tier launch ($25/month)
- Usage-based pricing for heavy users
- Team features for shared workflows

**Key metric**: 100 active weekly users by end of program.

---

### How will you make money?

**Pricing tiers:**
- **Free**: Unlimited local AI (Gemini Nano), basic cloud models
- **Pro ($25/mo)**: Premium cloud models (GPT-5.1, Claude, Grok-4)
- **Max ($99/mo)**: Full reasoning models (GPT-5.2, DeepSeek-R1)

**Unit economics**: Cloud AI costs ~$0.01/query. At $25/month for ~100 queries, 3x+ margin on Pro tier.

**Long-term**: Enterprise tier with SSO, audit logs, custom model deployment, and TEE (Trusted Execution Environment) for cryptographic privacy guarantees.

---

### Who are your competitors and why will you win?

| | Vibe | OpenAI Operator | Manus | Perplexity Comet |
|---|---|---|---|---|
| Local AI | Yes (Gemini Nano) | No | No | No |
| Model choice | Any | OpenAI only | Manus only | Perplexity only |
| Works as extension | Yes | Browser fork | Extension | Browser fork |
| Free tier | Unlimited | $20/mo min | Limited | TBD |

**Why we win:**

1. **Privacy moat**: Enterprises with compliance requirements can't use cloud-only solutions. We're the only option for sensitive workflows.

2. **Platform approach**: We're not selling an AI model - we're selling AI-agnostic infrastructure. As models commoditize, we become more valuable.

3. **Distribution**: Chrome extension = instant install in existing browser. No download, no friction. Competitors requiring browser forks face massive adoption hurdles.

**Why competitors struggle:**

- **OpenAI Operator**: Locked to OpenAI models. When Claude beats GPT at a task, users leave.
- **Manus**: Acquired by Meta, will be absorbed into Meta's walled garden.
- **Perplexity Comet**: Search-first, not action-first. Different use case.

---

### What do you want from speedrun?

1. **Go-to-market expertise**: We're engineers who built a working product. We need help with positioning, pricing, and early customer acquisition.

2. **Fundraising guidance**: Planning to raise seed round post-Demo Day. Need help with pitch refinement and investor introductions.

3. **Peer network**: Other founders building in AI, browser infrastructure, or B2B SaaS - for feedback, partnerships, and customer intros.

---

### Links

- **Website**: https://vibebrowser.app
- **Chrome Web Store**: Live extension
- **Demo video**: https://www.vibebrowser.app/linkedin-warm-outreach-demo.mp4
- **Pitch deck**: https://pitch.vibebrowser.app/pitch.pdf
- **Founder LinkedIn**: https://linkedin.com/in/dzianisv
- **Company LinkedIn**: https://linkedin.com/company/vibebrowser

---

## Video Script (1 minute)

"Hi, I'm Dzianis, founder of Vibe Browser.

Knowledge workers spend 28% of their week on repetitive browser tasks - researching leads, filling forms, comparing options across tabs. AI chatbots answer questions, but you still do all the clicking.

Vibe is different. It acts.

[Demo: typing 'Find 10 SaaS companies hiring engineers in Seattle']

One command. Vibe searches, filters, extracts, compiles. You review.

What makes us unique: true local AI. Gemini Nano runs 100% on your device. Your data never leaves your browser. Plus, use any AI model - GPT, Claude, Gemini - no lock-in.

We're live on Chrome Web Store with paying users. Before this, I spent 3.5 years at Coinbase building LLM agent tooling. I know exactly how hard this is - and exactly how to solve it.

Manus just sold for $2B. But they're cloud-only. We're building the privacy-first alternative.

We're raising pre-seed to get to 1,000 active users and launch enterprise. Let's talk."

---

## Checklist Before Submitting

- [ ] LinkedIn profiles updated with recent work and clear descriptions
- [ ] Pitch deck is 7-10 slides max
- [ ] Demo video is <2 minutes, shows real product
- [ ] All links tested and working
- [ ] No typos (run through spell check)
- [ ] Traction and differentiation front-and-center
- [ ] Team credentials highlighted early
