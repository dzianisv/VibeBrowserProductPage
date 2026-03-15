---
title: "Vibe Engineering: Testing an Agentic AI Browser Auto-Pilot with a Three-Stage Verification Strategy"
description: "How Vibe tests browser agents in practice: OCR-backed extractor validation, deterministic mock LLM workflows, and real-model integration tests against live sites."
date: "2025-10-07"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - engineering
  - testing
  - ai-agent
  - browser-automation
  - ocr
  - llm
published: true
---

Testing an AI-powered browser automation agent at [vibebrowser.app](https://vibebrowser.app/) is not like testing a normal web app.

Traditional software tends to be deterministic: give it the same input, and you usually get the same output. Agentic browser systems are different. They operate on live sites, react to changing layouts, depend on browser APIs, and route decisions through LLMs that can vary from run to run. That means a test strategy built around only unit tests or DOM assertions is not enough.

What worked for us was a three-stage testing pyramid that balances speed, cost, and real-world confidence:

1. **Foundation: page extraction with OCR verification**
2. **Middle layer: mock LLM server testing**
3. **Top layer: real LLM integration tests**

## The testing pyramid

| Stage | What it validates | Why it matters |
| --- | --- | --- |
| Page extraction + OCR | Whether we capture what is actually visible on the page | DOM-only tests can lie when content is hidden, off-screen, or rendered incorrectly |
| Mock LLM workflow tests | Whether the extension, tool loop, and agent flow work end to end | Fast, deterministic, and cheap enough to run often |
| Real LLM integration tests | Whether prompts, tool calling, and live browsing work against real APIs and sites | Final proof that production behavior matches expectations |

The important part is not just having three layers. It is using each one for the thing it is best at.

## Stage 1: page extraction testing with OCR verification

**Primary file:** `tests/page-extraction.test.js`

The first question we ask is simple: when Vibe reads a web page, does it actually capture the content the user can see?

That sounds obvious, but it is surprisingly easy to get wrong. A DOM-based extractor can look perfect in tests while still missing content that is visually rendered to the user. You can also get false confidence from HTML assertions when text is hidden, overlapped, white-on-white, or loaded in a way that does not match the extractor's assumptions.

### Why OCR matters

We use OCR as a visual ground truth.

The test flow takes a screenshot of the rendered page, runs OCR on the image, and compares that OCR output to the extractor result. That gives us a stronger guarantee than checking the DOM alone:

- the extractor captures what the user actually sees
- critical text is not silently dropped
- indexed elements line up with visual rendering

### We test two extraction paths

We validate both of the core extraction strategies:

```javascript
const markdownResult = await page.evaluate(() => {
  const extractor = new MarkdownPageExtractor()
  return extractor.extractContent({
    showHighlights: false,
    maxElements: 1000,
  })
})

const htmlResult = await page.evaluate(() => {
  const extractor = new HtmlPageExtractor()
  return extractor.extractIndexedHtml({
    maxElements: 1000,
  })
})
```

That split matters because a browser agent needs both high-level readable content and structured, index-addressable HTML for automation.

### OCR validation with a baseline

OCR is not perfect, so we do not treat it as infallible. We first compare OCR against the page's raw HTML to estimate OCR quality, then require the extractor to match that baseline within a narrow tolerance.

```javascript
const ocrText = await extractTextFromScreenshot(screenshotPath)

const baselineMatchStats = calculateOCRMatch(ocrText, htmlText)

const markdownMatchStats = calculateOCRMatch(ocrText, markdownResult.content)
const requiredPercentage = Math.max(90.0, baselineMatchStats.matchPercentage - 1.5)

if (markdownMatchStats.matchPercentage < requiredPercentage) {
  throw new Error('Extractor failing to capture visible content')
}
```

This approach gives us two protections at once:

- an absolute floor (`>= 90%`)
- a relative floor tied to OCR quality on that page

### Fuzzy matching is required

OCR introduces character errors, dropped punctuation, and spacing noise. So we do fuzzy matching with a small Levenshtein tolerance instead of insisting on exact string equality.

```javascript
function calculateOCRMatch(ocrText, markdownText) {
  const ocrWords = ocrText.split(/\s+/).filter((word) => word.length >= 3)
  const mdWordsArray = markdownText.split(/\s+/)
  const mdWordsSet = new Set(mdWordsArray)

  let exactMatches = 0
  let fuzzyMatches = 0

  for (const word of ocrWords) {
    if (mdWordsSet.has(word)) {
      exactMatches++
    } else {
      const match = findBestMatch(word, mdWordsArray, 2)
      if (match) fuzzyMatches++
    }
  }

  const totalWords = ocrWords.length
  const matchPercentage = ((exactMatches + fuzzyMatches) / totalWords) * 100

  return { matchPercentage, exactMatches, fuzzyMatches, totalWords }
}
```

That catches the errors you expect from OCR without lowering the bar so far that extraction bugs get a free pass.

### Coverage

We run this against both reference pages and live sites:

- static pages with known screenshots
- real websites like Wikipedia and other production pages

That lets us catch regressions in both the extractor logic and the rendering assumptions behind it.

## Stage 2: mock LLM server testing

**Primary files:** `tests/extension.mock.test.js` and `tests/utils/mock-llm-test-server.js`

Once extraction is reliable, the next question is: can the extension and tool loop complete a browser task end to end?

This is where mock LLM testing earns its keep.

Testing everything with real models is too slow, too expensive, and too noisy for fast iteration. So we built a deterministic mock server that speaks the same OpenAI-style API contract the extension expects, but returns scripted responses instantly.

### Why mock the model

Real LLM tests are:

- **expensive**
- **slow**
- **non-deterministic**

Mock tests give us:

- consistent tool-call sequences
- instant feedback
- reproducible failures
- CI-friendly execution

### The mock server behaves like a state machine

The mock server follows a simple phase-based model of the agent loop:

```javascript
const testState = {
  phase: 'initial',
  messageCount: 0,
  toolCallsExecuted: [],
}

app.post('/v1/chat/completions', (req, res) => {
  const { messages } = req.body
  const userMessage = messages?.find((message) => message.role === 'user')?.content || ''

  if (testState.phase === 'initial' && userMessage.includes('test')) {
    testState.phase = 'navigated'
    return res.json({
      choices: [
        {
          message: {
            role: 'assistant',
            content: "Let's test it",
            tool_calls: [
              {
                function: {
                  name: 'navigate_to_url',
                  arguments: JSON.stringify({ url: `http://localhost:${PORT}/test-page` }),
                },
              },
            ],
          },
        },
      ],
    })
  }
})
```

That lets us verify the control loop, tool execution, and UI behavior without paying for real API calls.

### Parallel-safe test infrastructure

The tests run with dynamic port allocation so concurrent runs do not step on each other:

```javascript
async function findAvailablePort(startPort) {
  return new Promise((resolve, reject) => {
    const server = createServer()

    server.listen(startPort, () => {
      const port = server.address().port
      server.close(() => resolve(port))
    })

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        findAvailablePort(startPort + 1).then(resolve).catch(reject)
      } else {
        reject(err)
      }
    })
  })
}
```

That sounds mundane, but it matters. Browser automation tests leak state easily. Port conflicts and half-cleaned mock servers are a common source of flaky failures.

### We verify behavior at multiple levels

The extension tests do not stop at "the assistant said it succeeded."

We verify:

- the extension settings page was configured
- the home page triggered the agent
- the Chrome sidepanel opened correctly
- the target page actually changed state
- screenshots show the expected UI updates

For example, after the mock server instructs the agent to fill and select form values, we assert the real DOM state:

```javascript
const formValues = await testPage.evaluate(() => {
  const input = document.getElementById('destinationInput')
  const select = document.getElementById('classDropdown')

  return {
    inputValue: input?.value || '',
    selectedClass: select?.value || '',
  }
})

if (!formValues.inputValue.includes('Test Input Value')) {
  throw new Error(`Expected "Test Input Value", found "${formValues.inputValue}"`)
}

if (formValues.selectedClass !== 'economy') {
  throw new Error(`Expected "economy", found "${formValues.selectedClass}"`)
}
```

So the test proves both that the UI updated and that the underlying interaction actually happened.

## Stage 3: real LLM integration tests

**Primary file:** `tests/extension.test.js`

Mock testing is great for confidence in the mechanics. But it cannot tell you whether real prompts, real model behavior, and real websites still work together.

That is the job of the top layer.

### What real tests validate

Real LLM integration tests answer questions the mock layer cannot:

- does prompt engineering hold up with live model behavior?
- do tool calls come back in the right shape?
- do we handle real network delays and API failures?
- can the agent navigate external websites successfully?

The extension is configured against the real provider instead of the mock endpoint:

```javascript
if (!process.env.OPENROUTER_API_KEY) {
  throw new Error('OPENROUTER_API_KEY environment variable not set')
}

await allInputs[0].type('openrouter:gpt-oss-120b')
await allInputs[1].type(process.env.OPENROUTER_API_KEY)
```

### We test real-world browsing, not toy pages

The top layer targets live destinations, not just local fixtures:

```javascript
const testQuery =
  "Navigate to google.com, search for 'raspberry pi zero 2 w', click first link"

const externalPage = pages.find((page) => {
  const url = page.url()
  return !url.includes('chrome-extension://') && url.startsWith('http')
})

if (!externalPage) {
  throw new Error('Agent did not navigate to any external page')
}
```

This is where production reality shows up: CAPTCHAs, changing layouts, anti-bot behavior, slow sites, and unexpected navigation paths.

### Graceful degradation matters

Real tests do not require a fairy-tale success path every time. They also verify that the agent fails in understandable, inspectable ways.

For example, the OCR assertions accept meaningful completion or failure states such as:

- successful fill or completion
- explicit failure
- CAPTCHA or verification challenge

That matters because real-world browser agents live in messy environments. You do not want a test suite that hides every partial failure behind brittle exact-match expectations.

## What we learned

### 1) OCR is the closest thing we have to ground truth

DOM assertions are necessary, but not sufficient.

They can pass even when:

- content is hidden with CSS
- text is off-screen
- rendering is incomplete
- a page looks wrong to the user

OCR gives us a user-visible check instead of only an implementation-visible check.

### 2) Screenshot everything

Every important phase should leave behind evidence:

- screenshots
- OCR text
- extracted content
- DOM snapshots
- console logs

When tests fail, that evidence is the difference between guessing and knowing.

### 3) Mock and real tests are both necessary

Mock tests are the fast loop.

Real tests are the truth loop.

If you skip mock testing, iteration becomes too slow. If you skip real testing, you will ship prompt and integration failures that the mock layer can never catch.

### 4) Cleanup is part of the test design

Browser automation leaks resources constantly: browsers, mock servers, OCR workers, temporary files. Cleanup has to be explicit and defensive:

```javascript
async function cleanup() {
  if (browser) {
    await browser.close()
  }

  if (mockServer && !mockServer.killed) {
    mockServer.kill('SIGKILL')
  }

  await cleanupOCR()
  cleanupPerformed = true
}

process.on('SIGINT', async () => await cleanup())
process.on('SIGTERM', async () => await cleanup())
process.on('uncaughtException', async () => await cleanup())
process.on('unhandledRejection', async () => await cleanup())
```

Without that, you end up debugging the test harness instead of the product.

## Running the suite

The three layers can be run independently:

```bash
# Stage 1: Page extraction verification
node tests/page-extraction.test.js

# Stage 2: Mock LLM workflow testing
node tests/extension.mock.test.js

# Stage 3: Real LLM integration (requires API key)
export $(< .env)
node tests/extension.test.js
```

That separation is useful operationally too. Engineers can run fast checks during development, then escalate to slower and more expensive validation as confidence grows.

## The broader point

Testing AI browser agents requires a different mindset from testing standard web apps.

You are not just validating code paths. You are validating:

- extraction quality
- browser API behavior
- tool execution
- prompt effectiveness
- model behavior
- live-site resilience

That is why our testing strategy is evidence-driven instead of assumption-driven.

The core rule is simple:

**Do not trust the DOM alone. Verify what the user actually sees, then verify what the agent actually did.**

That is the foundation of how we test Vibe today.

---

Originally published on Medium:  
https://medium.com/@dzianisv/vibe-engineering-testing-an-agentic-ai-browser-auto-pilot-a-three-stage-verification-strategy-946c07963d0b
