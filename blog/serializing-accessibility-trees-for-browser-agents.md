---
title: "How Browser Agents Should Serialize Accessibility Trees"
description: "A practical comparison of raw CDP accessibility trees, markdown-style page summaries, Chrome DevTools MCP, Playwriter, and the serialization choices behind VibeBrowser."
date: "2026-05-17"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - engineering
  - browser-agents
  - accessibility
  - mcp
  - ai-browser-automation
published: true
---

Browser agents do not act on screenshots alone. To click links, fill inputs, compare prices, summarize forms, or navigate complex web apps, they need a text representation of the page that preserves both **meaning** and **actionability**.

The browser already exposes a useful data source for this: the accessibility tree. Chrome's DevTools Protocol can return a tree of roles, names, states, and backend node ids. The hard part is not getting the tree. The hard part is deciding how to serialize it for an LLM.

If the serialization is too raw, the model wastes context on implementation detail. If it is too pretty, the model loses the structure it needs to reason correctly. If it flattens interactive elements, the agent may see the text but lose the reference needed to click it.

This post explains the tradeoff, compares the approaches used by Chrome DevTools MCP and Playwriter, and describes why VibeBrowser follows the same principle while keeping its own implementation.

## The Problem: Text Is Not Enough

Consider a simple table:

```text
Name    Price
Apple   $1
Orange  $2
```

A bad serializer can flatten the accessibility tree into this:

```text
Name
Price
Apple
$1
Orange
$2
```

All the words are present, but the relationships are gone. The model can no longer reliably tell that Apple costs $1 and Orange costs $2.

A better serializer keeps the semantic tree:

```text
- table
  - row
    - columnheader "Name"
    - columnheader "Price"
  - row
    - cell "Apple"
    - cell "$1"
  - row
    - cell "Orange"
    - cell "$2"
```

This is not "special table rendering." It is just preserving the accessibility semantics Chrome already gave us.

The same issue appears outside tables. Lists, forms, dialogs, navigation landmarks, tab lists, and grids all carry meaning through hierarchy. A browser agent needs that hierarchy.

## Raw CDP JSON Is Also Not the Answer

Chrome DevTools Protocol can return `Accessibility.getFullAXTree`. That response is useful for software, but it is not ideal as direct LLM context.

Raw CDP includes implementation-heavy fields: node ids, child id arrays, ignored flags, property wrappers, backend ids, value objects, and browser-specific details. The model does not need most of that. It needs a compact view like:

```text
- navigation
  - link "Docs" uid=A1
  - link "Pricing" uid=A2
- main
  - heading "Plans"
  - button "Upgrade" uid=A3
```

That representation keeps the important parts:

- role
- accessible name
- hierarchy
- state when useful
- stable action reference

It drops the protocol noise.

## What Chrome DevTools MCP Does

[Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp) uses Puppeteer's accessibility snapshot API:

```ts
page.accessibility.snapshot({
  includeIframes: true,
  interestingOnly: !verbose,
})
```

It then assigns a `uid` to nodes and recursively formats the tree as indented text. The shape is simple:

```text
uid=1_0 WebArea "Page Title"
  uid=1_1 navigation "Main"
    uid=1_2 link "Home"
  uid=1_3 table
    uid=1_4 row
      uid=1_5 cell "Apple"
```

The important design choice is that it does not have a markdown table renderer, a special list renderer, or a subtree-to-text flattener. It serializes the tree uniformly.

That makes the output slightly less pretty than handwritten markdown, but much more robust. The model sees the role tree, and the tool layer can map `uid` back to nodes.

## What Playwriter Does

[Playwriter](https://github.com/remorses/playwriter) is closer to raw CDP. It calls `Accessibility.getFullAXTree`, builds a tree from CDP `childIds`, filters it, and serializes the result recursively.

Its core choices are instructive:

- Keep context roles such as `navigation`, `main`, `form`, `list`, `table`, `row`, and `cell`.
- Treat wrapper roles such as `generic`, `group`, `none`, and `presentation` as noise unless they matter.
- Assign refs to interactive nodes.
- Render the output as an indented tree.

The resulting snapshot looks like this:

```text
- main:
  - heading "Settings"
  - form:
    - textbox "Email"
    - button "Save"
  - table:
    - row:
      - cell "Current plan"
      - cell "Pro"
```

Again, there is no markdown table special case. Structure comes from the accessibility tree itself.

## Is There a Standard Format?

There is no formal standard for accessibility tree serialization in browser automation. Each major tool has converged on a similar principle — indented semantic tree, interactive refs, wrapper collapse — but with different syntax and ref contracts.

Playwright's ARIA snapshot format has become the closest thing to a de facto standard, driven by adoption volume:

| Format | Used by | Syntax |
|--------|---------|--------|
| Playwright ARIA snapshot | Playwright MCP, Playwright test assertions | `- role "name" [state]:` (YAML-like, indented) |
| Chrome DevTools MCP | Google's official DevTools MCP | `role "name" [ref=X]` (indented plain text) |
| VibeBrowser markdown hybrid | VibeBrowser | Markdown + `uid=AN` refs, collapsed wrappers |

Playwright's format is widely seen in training data — test files, documentation, GitHub issues — which means LLMs tend to parse it reliably. Chrome DevTools MCP takes a similar approach with a slightly different ref syntax. VibeBrowser's format is more compact: it collapses non-interactive wrappers, uses markdown syntax for headings and checkboxes, and inlines hrefs on links — optimized for LLM context efficiency rather than strict tree fidelity.

The key convergence across all three: **preserve structure, surface states, keep refs visible**.

## The Bug Class We Wanted to Avoid

In VibeBrowser, the risky pattern was not recursion. Recursion is good. The risky pattern was **specialized renderers that flattened subtrees**.

For example, a markdown table renderer might convert this tree:

```text
table
  row
    cell
      link "Open invoice" uid=A7
```

into this pretty markdown:

```markdown
| Open invoice |
```

That is human-readable, but the action reference is gone. The agent sees "Open invoice" but no longer has `uid=A7`, so it cannot click it.

The same bug can happen with headings, buttons, links, or list items if a renderer says: "I already collected the text, so I do not need to traverse children." That assumption breaks on real websites, where interactive elements are often nested inside wrappers, headings, cells, and components.

The safe rule is simple:

> Never flatten an accessibility subtree in a way that can discard an interactive reference.

## VibeBrowser's Current Direction

VibeBrowser now follows the same principle as Chrome DevTools MCP and Playwriter: **uniform recursive serialization**.

The serializer should:

- recursively walk the accessibility tree
- collapse noisy wrappers like `generic`, `group`, `none`, and `presentation`
- emit meaningful semantic roles like `table`, `row`, `cell`, `list`, `form`, `navigation`, and `dialog`
- always preserve visible refs for interactive nodes
- avoid custom renderers that turn subtrees into plain text

That gives us output closer to this:

```text
- navigation
  - link "Home" uid=A0
  - link "Docs" uid=A1
- main
  - heading "Invoices"
  - table
    - row
      - columnheader "Date"
      - columnheader "Action"
    - row
      - cell "May 17"
      - cell
        - link "Open invoice" uid=A2
```

This is less polished than a markdown article summary, but it is much better for browser automation. It keeps the model grounded in page semantics and keeps actions addressable.

## Why Not Just Reuse Playwriter?

Playwriter's approach is good. We should learn from it. But directly reusing it is not the right move for VibeBrowser.

There are several reasons.

### 1. Different Runtime

Playwriter is built around Playwright pages, locators, and CDP sessions. VibeBrowser runs inside a Chrome extension service worker and interacts with the user's actual browser tabs through extension APIs and CDP.

That difference matters. A Playwright locator is not the same abstraction as a Chrome extension `tabId` plus `backendDOMNodeId`. Vibe needs references that survive inside our extension cache and route through our existing `click`, `fill`, and `typein_secret` tools.

### 2. Different Ref Contract

Playwriter can generate refs from test ids, ids, role selectors, and Playwright locators. VibeBrowser already has an A-ref contract (`uid=A0`, `uid=A1`, etc.) backed by compact extraction and cached `backendDOMNodeId`s.

If we dropped in Playwriter's ref model, we would have to rewrite a large part of our interaction layer. The serializer is not standalone; it is coupled to how actions resolve targets.

### 3. Different Security Requirements

VibeBrowser has credential tooling and password redaction requirements. Page extraction cannot accidentally leak secret field values into model context. Our serializer has to integrate with those product-specific safeguards.

Playwriter does not carry our exact credential manager, redaction, and extension storage constraints.

### 4. Different Product Goal

Playwriter is a general browser automation toolkit. VibeBrowser is an AI browser co-pilot running in a user's daily browser environment. We need extraction that works across normal websites, background tabs, side panel workflows, cached page state, selected text, Google Docs, and extension-specific tools.

The high-level algorithm transfers. The implementation details do not transfer cleanly.

### 5. We Need a Smaller Surface Area

The best lesson from Playwriter is not "copy the code." It is "keep the serializer boring."

For VibeBrowser, boring means:

- one recursive walker
- a short set of roles to skip as wrappers
- a short set of roles to keep as semantic context
- visible A-refs for actionable nodes
- no markdown table renderer
- no `collectText()` shortcut that consumes children

That is smaller than adopting another project's full snapshot, locator, DOM indexing, label overlay, and selector system.

## The Practical Rule

When serializing accessibility trees for browser agents, the rule is:

> Preserve the tree enough for reasoning, preserve refs enough for action, and remove only the protocol noise.

Do not send raw CDP JSON.

Do not flatten everything into text.

Do not invent special markdown renderers that can drop refs.

Use a uniform, indented semantic tree. That is the common thread across Chrome DevTools MCP, Playwriter, and VibeBrowser's current direction.

The details differ by runtime. The principle does not.
