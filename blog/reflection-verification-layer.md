---
title: "Reflection: A Completion Verification Layer for Autonomous AI Coding Agents"
description: "AI coding agents routinely stop before their work is done. Reflection is a plugin that injects structured self-assessment and verification loops after every agent turn, transforming unreliable sessions into bounded, verifiable workflows."
date: "2026-03-03"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
aliases:
  - reflection-completion-verification-layer
  - vibe-engineering-reflection
tags:
  - engineering
  - vibe-coding
  - openai-codex
  - open-code
  - ai
  - reflection
published: true
---

*Why the reflection layer is the reason I only use open-source coding agents.*

![Reflection - A Completion Verification Layer](/images/blog/reflection-layer-hero.jpeg)

## Abstract

AI coding agents routinely stop before their work is done. They claim success without running tests, merge code without verifying CI, or get stuck in planning loops without producing a single edit. Closed-source agents offer no mechanism to fix this — you get what the vendor ships, and you wait for their next release. Open-source agents like [OpenCode](https://opencode.ai) and [Codex](https://github.com/openai/codex) are different: they expose the hooks, events, and session lifecycle that make it possible to build verification layers on top. [**Reflection**](https://github.com/dzianisv/opencode-plugins/blob/main/reflection-3.ts) is a plugin for OpenCode that exploits this openness by injecting a structured self-assessment and verification loop after every agent turn. When the agent goes idle, Reflection inspects the session history, builds a task context, requests a structured self-assessment, evaluates it against workflow gates (tests, builds, PRs, CI), and — if the task is incomplete — pushes the agent to continue with targeted feedback. We describe the system design, the evaluation methodology we developed to validate it, and why this kind of infrastructure is only possible when the agent runtime is open.

## 1. Why Open-Source Coding Agents

I work with OpenCode and Codex. Nothing else. Not because they are the most polished or the most marketed, but because they are the only agents where I can change what happens after the model speaks.

Every coding agent has the same core problem: the model generates plausible output and then stops. Sometimes the output is correct. Sometimes it is incomplete. Sometimes it is wrong. The difference between a useful agent and a frustrating one is not the model — it is what happens in that gap between "the model produced text" and "the task is actually done."

Closed-source agents (Cursor, Windsurf, Copilot Workspace) treat this gap as a product decision. They ship their own heuristics, their own retry logic, their own definition of "done." If their definition does not match yours, you file a feature request and wait. You cannot hook into the session lifecycle. You cannot intercept the idle event. You cannot inject a verification prompt. You cannot route feedback to a different model. You are a consumer of someone else's quality threshold.

Open-source agents treat this gap as an extension point. OpenCode fires a `session.idle` event with the full message history. It exposes `session.chat` for injecting messages, `session.create` for spawning ephemeral sessions, `session.delete` for cleanup. It lets plugins read tool call history, detect command patterns, and write verdict files that other plugins consume. Codex similarly exposes its execution model for external orchestration.

This is not a philosophical preference. It is an engineering requirement. The reflection layer described in this paper — 1,800 lines of loop detection, workflow gate verification, escalating feedback, cross-model review, and structured evaluation — exists because the runtime let me build it. None of it would be possible on a closed platform. Every hour I spend improving Reflection-3 compounds into every future session across every project. On a closed platform, that same hour would be spent adapting my workflow to someone else's constraints.

The rest of this paper describes what that reflection layer does, how it is evaluated, and why it matters for anyone who takes agent-assisted development seriously.

## 2. Problem Statement

Large language models are strong code generators but unreliable task completers. In a typical session, the agent might:

- **Stop prematurely** after editing a file, without running tests or creating a pull request.
- **Fall into a planning loop** — reading files, running `git status`, and writing todo lists indefinitely without producing code.
- **Fall into an action loop** — repeatedly re-running a failing test or deployment without changing the underlying code.
- **Claim completion** without evidence, using phrases like "the fix is ready" when no build or test command was executed.
- **Skip required workflow steps** like creating a PR, verifying CI checks, or running local tests after the latest changes.
- **Push directly to main/master**, bypassing the pull request workflow entirely.

These failure modes are silent. The user, trusting the agent's claim, moves on — only to discover later that tests were never run, the PR was never created, or the code doesn't even compile. In agentic workflows where the human is not watching every step, this is a critical reliability gap.

## 3. Design Principles

Reflection-3 is designed around three principles:

1. **Evidence over claims.** The agent must produce structured evidence of its work (test commands, PR URLs, CI status). Verbal assertions like "done" or "verified" are insufficient.
2. **Workflow gates, not style checks.** The plugin enforces objective process requirements — tests ran and passed, PR exists, CI is green — not subjective quality judgments about the code itself.
3. **Escalating feedback, not infinite loops.** The plugin provides increasingly direct feedback across a bounded number of attempts (default: 3), then yields control back to the user rather than looping forever.

## 4. System Architecture

### 4.1 Trigger and Guard Phase

Reflection-3 hooks into OpenCode's `session.idle` event, which fires whenever the agent finishes producing output. Before running any analysis, several guard checks prevent unnecessary or harmful reflection:

- **Judge/classifier session detection**: Sessions created by the plugin itself (for self-assessment, judging, or routing classification) are skipped to prevent recursive reflection.
- **Plan mode detection**: Sessions where the user explicitly requested a plan (not implementation) are skipped.
- **Abort detection**: When the user presses ESC to cancel, a brief race window (`ABORT_RACE_DELAY = 1500ms`) allows the `session.error` event to arrive before reflection starts. Sessions aborted within a 10-second cooldown window are skipped.
- **Deduplication**: Each user message is tracked by a signature. If reflection already ran for a given user message in a given session, it is not repeated.

### 4.2 Task Context Construction

The plugin builds a `TaskContext` object by scanning the full message history:

- **Task type inference**: A heuristic classifier categorizes the task as `coding`, `docs`, `research`, `ops`, or `other` based on keyword patterns in user messages and agent responses. This determines which workflow gates apply.
- **Repository signal detection**: The plugin reads `package.json` to determine if `test` and `build` scripts exist, and checks for `test/` or `tests/` directories.
- **Tool command extraction**: All bash commands from the session are extracted and analyzed. The plugin detects test commands (`npm test`, `pytest`, `go test`, `cargo test`), build commands, `gh pr` invocations, `git push` commands, and more.
- **Workflow requirement derivation**: Based on the task type and repository signals, the plugin determines which gates are required: local tests, build verification, PR creation, CI checks.

### 4.3 Self-Assessment

Rather than prompting the active agent session (which would pollute its context with JSON-format instructions), Reflection-3 creates an **ephemeral session** and sends a structured self-assessment prompt. The prompt includes:

- The task summary and detected type
- Workflow requirements (which gates must be satisfied)
- Recent tool commands and signals
- The agent's last response
- The current attempt count (for escalation context)

The self-assessment prompt asks the model to return a JSON object with fields including:

- `status`: complete, in_progress, blocked, stuck, or waiting_for_user
- `confidence`: numeric confidence score
- `evidence.tests`: whether tests ran, results, whether they ran after the latest changes, exact commands
- `evidence.build`: whether the build ran and its results
- `evidence.pr`: whether a PR was created, URL, CI status, whether CI was checked
- `remaining_work`, `next_steps`, `needs_user_action`
- `stuck` flag and `alternate_approach`

The ephemeral session is deleted after the response is received.

### 4.4 Evaluation Engine

If the JSON parses successfully, `evaluateSelfAssessment()` applies deterministic workflow gate checks against the structured evidence:

1. **Test verification**: If tests are required, the assessment must show `tests.ran === true`, `results === "pass"`, `ran_after_changes === true`, and must not be skipped for reasons like "flaky" or "not important".
2. **Local test command matching**: If local tests are required, the exact commands listed in the assessment must match commands actually executed in the session (cross-referenced against the extracted tool commands).
3. **Build verification**: If a build is required, `build.ran === true` and `results === "pass"`.
4. **PR and CI verification**: If a PR is required, the assessment must show the PR was created, provide a URL, and confirm CI checks passed. The plugin also cross-references against detected `gh pr` signals in the command history.
5. **Direct push detection**: If `git push` to `main` or `master` was detected, the task is flagged as requiring a PR instead.
6. **Stuck detection**: If the agent reports being stuck, it is prompted to rethink its approach.

If JSON parsing fails, the plugin falls back to a **judge session** — a separate LLM call that analyzes the raw self-assessment text and returns a structured verdict.

### 4.5 Human Action Classification

A critical distinction in the evaluation is between items that **require human action** (OAuth consent, 2FA codes, API key retrieval from dashboards) and items the **agent should handle itself** (running commands, editing files, creating PRs). The plugin uses pattern matching to classify each "needs user action" item:

- Items matching human-only patterns (auth, login, credentials, upload) and NOT matching agent-action patterns are classified as human-only.
- If only human-only items remain, the plugin shows a toast notification and does **not** push the agent to continue.
- If agent-actionable items remain (even alongside human-only items), the plugin pushes feedback.

### 4.6 Loop Detection

Two distinct loop detectors run before feedback injection:

**Planning Loop Detector**: Fires when the agent has made many tool calls (>= 8) but the ratio of write operations to total operations is below 10%. This catches the common pattern where the agent reads files, checks git status, creates todo lists, and researches endlessly without writing any code. When detected for coding tasks, the feedback is an explicit "STOP: Planning Loop Detected" message instructing the agent to start implementing.

**Action Loop Detector**: Fires when the same commands are repeated 3+ times and repeated commands constitute >= 60% of all commands. This catches the pattern where the agent re-runs failing tests or deployments without changing the code that caused the failure.

### 4.7 Feedback and Routing

When the task is determined incomplete, the plugin constructs escalating feedback:

- **Attempts 1-2**: Structured feedback with missing items and next actions.
- **Attempt 3 (final)**: Direct warning that this is the last attempt, instructing the agent to either complete the work or explain what is blocking it.

Optionally, the feedback can be **model-routed**: a lightweight LLM classifier categorizes the task as `backend`, `architecture`, `frontend`, or `default`, and the feedback prompt is sent with a model override matching the task category. This allows routing architecture problems to Claude, backend tasks to GPT, and frontend work to Gemini.

### 4.8 Cross-Model Architecture

The logical extension of self-reflection is **cross-model review**. No matter how rigorous the prompt, a model reviewing its own work shares the same tokenizer biases, reasoning blind spots, and context window limitations as the "author" model. True reliability requires an adversarial or orthogonal review process.

We are currently prototyping a `CrossReview` plugin architecture that implements a "Committee of Agents":

1. **Author (Claude-4.6-Opus):** Responsible for architecture, implementation, and initial self-assessment.
2. **Reviewer (GPT-5.3-Codex):** A distinct model that receives the diff and the task description. Its prompt is optimized for logic verification and edge-case detection. It does not see the Author's reasoning chain, only the output.
3. **Auditor (MiniMax-M2.5):** A specialized, high-context model focused purely on security (e.g., secret leaks, injection vulnerabilities) and specification compliance.

```typescript
interface ReviewSession {
  role: 'author' | 'reviewer' | 'auditor';
  modelId: string;
  verdict?: ReviewVerdict;
}

class CrossReviewOrchestrator {
  async runReview(task: Task, diff: string): Promise<Consensus> {
    // 1. Author (already done in main session)
    const authorVerdict = await this.getSelfAssessment(task);

    // 2. Spawn Reviewer (GPT-5.3)
    const reviewerSession = await this.sessionManager.create({
      model: 'gpt-5.3-codex',
      systemPrompt: PROMPTS.CODE_REVIEWER
    });
    const reviewerVerdict = await reviewerSession.analyze(diff);

    // 3. Spawn Auditor (MiniMax-M2.5)
    const auditorSession = await this.sessionManager.create({
      model: 'minimax-m2.5',
      systemPrompt: PROMPTS.SECURITY_AUDITOR
    });
    const auditorVerdict = await auditorSession.analyze(diff);

    // 4. Synthesize
    return this.consensusEngine.merge([
      authorVerdict,
      reviewerVerdict,
      auditorVerdict
    ]);
  }
}
```

If the Reviewer or Auditor dissents (e.g., Claude thinks it's done, but MiniMax finds a regex DoS vulnerability), the plugin injects the dissenting opinion back into the Author's session as a high-priority "Code Review Comment," blocking completion until resolved. This mirrors a human engineering team's workflow: code is not merged until independent reviewers approve.

### 4.9 Artifacts

Every reflection run produces two artifact files:

- **`verdict_<session>.json`**: A compact signal file (complete/incomplete, severity) consumed by downstream plugins (TTS reads it to decide whether to speak, Telegram reads it to gate notifications).
- **`<session>_<timestamp>.json`**: A full analysis record including task summary, self-assessment text, evaluation analysis, cross-review results, and routing decisions.

## 5. Evaluation Methodology

Validating a reflection system is challenging because the ground truth ("was the task really complete?") is subjective and context-dependent. We developed a multi-layered evaluation strategy combining unit tests, prompt evaluations (evals), and end-to-end integration tests.

### 5.1 Unit Tests

The unit test suite covers the deterministic components of the system:

- **Task type inference**: Validates that `inferTaskType` correctly categorizes mixed signals.
- **Self-assessment parsing**: Tests JSON extraction from model output, handling of malformed JSON, edge cases with missing fields.
- **Workflow gate evaluation**: Tests every gate independently — missing tests, failing tests, skipped tests, missing PR, unchecked CI, direct push to main, etc.
- **Human action classification**: Tests the boundary between human-only actions (OAuth, 2FA) and agent-executable actions.
- **Planning loop detection**: Tests the read/write ratio calculation across various tool call distributions.
- **Action loop detection**: Tests command repetition counting and threshold evaluation.
- **Abort race condition**: Simulates the timing race between `session.idle` and `session.error` events.
- **Error resilience**: Tests that `promptAsync` failures, session deletion during reflection, and other error conditions are handled gracefully.
- **Escalating feedback**: Tests that feedback messages become progressively more direct.

### 5.2 Prompt Evaluations (Promptfoo)

The most novel aspect of our evaluation is the use of [Promptfoo](https://promptfoo.dev) to systematically test the LLM judge's accuracy. We maintain four evaluation suites:

**Judge Accuracy Evaluation (30 test cases)** — Tests the judge prompt against 30 carefully constructed scenarios including true positives (should be complete), true negatives (should be incomplete), and edge cases (human action required, task deviation, multi-verification tasks).

**Stuck Detection Evaluation (16 test cases)** — Tests whether the model correctly classifies session state as `genuinely_stuck`, `waiting_for_user`, `working`, or `complete`.

**Post-Compression Nudge Evaluation (14 test cases)** — Tests the correct action after context window compression.

**Agent Evaluation Benchmark (10 test cases)** — A holistic 0-5 scoring rubric evaluating overall agent task performance.

### 5.3 CI Integration

Evaluations run automatically via GitHub Actions on every PR that touches `reflection-3.ts` or `evals/**`. The workflow runs all four eval suites, uploads JSON results as artifacts, posts a summary comment on the PR, and generates a step summary for the Actions UI.

### 5.4 End-to-End Tests

Full E2E tests start an actual OpenCode server with the reflection plugin loaded, send real tasks, and verify that reflection triggers after the agent goes idle, self-assessment is requested and received, workflow gates are evaluated, feedback is injected when appropriate, and verdict signals are written to disk.

## 6. Impact on Developer Experience

### Reduced Silent Failures

Before Reflection-3, the most common failure mode was the agent stopping after partial work and the user not noticing. The plugin transforms this into an explicit feedback loop: if tests weren't run, the agent is told to run them. If the PR wasn't created, the agent is told to create one.

### Enforced Workflow Discipline

Many organizations have workflow requirements that developers follow habitually but agents ignore: run tests after changes, create PRs instead of pushing to main, verify CI before claiming completion. Reflection-3 makes these requirements machine-enforceable.

### Planning Loop Intervention

A particularly frustrating failure mode is the agent that endlessly reads files and plans without writing code. The planning loop detector catches this pattern and produces a pointed intervention: "You have been reading files, checking git status, and creating todo lists without writing any code. Start coding NOW. No more planning."

### Bounded Autonomy

The escalating feedback mechanism with a maximum attempt count (default: 3) provides bounded autonomy. The agent gets multiple chances to complete its work, with increasingly direct guidance, but the system never loops forever.

### Cross-Plugin Integration

The verdict signal files enable downstream plugins to make reflection-aware decisions. The TTS plugin reads the verdict to decide whether to speak the completion message. The Telegram plugin reads the verdict to gate notifications.

## 7. Limitations and Future Work

**Context cost.** Running self-assessment in an ephemeral session adds latency and token cost. The assessment prompt can be 2000-4000 tokens. For fast, simple tasks, this overhead may not be justified.

**Heuristic task typing.** The task type classifier uses regex patterns, which can misclassify ambiguous tasks. An LLM-based classifier would be more accurate but adds latency.

**Single-turn assessment.** The self-assessment evaluates a single point in time. It does not track whether the agent made progress between attempts.

**Model dependence.** The quality of self-assessment depends on the model's ability to introspect on its own work accurately. Weaker models are excluded from assessment duties, but even strong models can confabulate evidence.

## 8. Conclusion

Reflection-3 addresses a practical gap in autonomous AI coding: the distance between generating code and completing a task. By combining structured self-assessment, deterministic workflow gate evaluation, loop detection, and escalating feedback, the plugin transforms unreliable agent sessions into bounded, verifiable workflows.

But the deeper point is this: Reflection-3 exists because OpenCode is open. The plugin hooks into `session.idle`, creates ephemeral sessions, injects feedback, reads tool history, and writes verdict signals that other plugins consume. None of these extension points exist in closed-source agents. The entire verification layer is user-authored infrastructure that compounds over time.

This is why I use open-source coding agents exclusively. Not because the models are better — they are the same models. Not because the UI is better — it is a terminal. Because the runtime is mine. I can verify what the agent claims. I can enforce what the agent skips. I can detect when the agent is stuck and intervene with precision.

The agents that win will not be the ones with the best chat interface. They will be the ones that let their users build the verification and orchestration layers that the models themselves cannot provide.

*Reflection-3 is an open-source plugin for the OpenCode CLI. We use it in our development cycles at [vibebrowser.app/aboutus](https://vibebrowser.app/aboutus).*
