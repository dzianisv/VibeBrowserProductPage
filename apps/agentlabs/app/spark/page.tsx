"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Terminal,
  FileCode2,
  Github,
  Cpu,
  Zap,
  Search,
  GitBranch,
  Layers,
  CheckCircle2,
  Code2,
} from "lucide-react"

const AUTOPILOT_CODE = `# Fix a bug, end-to-end
bun spark.ts --autopilot "the login form shows a 500 on submit, investigate and fix"`

const INTERACTIVE_CODE = `# Start interactive session
bun spark.ts

# Pass a goal as argument
bun spark.ts "add pagination to the users API"`

const SANDBOX_CODE = `# Isolated Docker sandbox — project mounted, no side-effects
bun spark.ts --sandbox "refactor the auth module to use JWT"`

const SKILL_CODE = `# Drop a skill file anywhere under ~/.agents/skills/
cat ~/.agents/skills/deploy/SKILL.md
# → The agent loads it automatically via LoadSkill tool`

type Tab = "interactive" | "autopilot" | "sandbox" | "skills"

const TOOLS = [
  {
    name: "ReadFile",
    desc: "Read files with offset + limit. Never loads more than needed.",
    color: "text-[#81c995]",
    bg: "bg-[#81c995]/10",
  },
  {
    name: "WriteFile",
    desc: "Full write or surgical patch mode. Targeted string replacement inside a file.",
    color: "text-[#81c995]",
    bg: "bg-[#81c995]/10",
  },
  {
    name: "Bash",
    desc: "Run any shell command with configurable timeout. Build, test, deploy.",
    color: "text-[#4fc3f7]",
    bg: "bg-[#4fc3f7]/10",
  },
  {
    name: "Eval",
    desc: "JS/TS REPL — execute code in-process and get the result back.",
    color: "text-[#4fc3f7]",
    bg: "bg-[#4fc3f7]/10",
  },
  {
    name: "Glob",
    desc: "Fast file pattern matching. Respects .gitignore.",
    color: "text-[#c58af9]",
    bg: "bg-[#c58af9]/10",
  },
  {
    name: "Grep",
    desc: "Regex search across the codebase with file + line results.",
    color: "text-[#c58af9]",
    bg: "bg-[#c58af9]/10",
  },
  {
    name: "FindSymbol",
    desc: "Jump to any function, class, or variable definition instantly.",
    color: "text-[#fdd663]",
    bg: "bg-[#fdd663]/10",
  },
  {
    name: "Task",
    desc: "Spawn concurrent subagents. Fan out work, collect results in parallel.",
    color: "text-[#fdd663]",
    bg: "bg-[#fdd663]/10",
  },
]

export default function SparkPage() {
  const [activeTab, setActiveTab] = useState<Tab>("autopilot")

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-[#e8eaed]">
      {/* Header */}
      <header className="border-b border-[#3c4043] bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="font-semibold text-lg tracking-tight text-[#e8eaed]">Spark</span>
          <div className="flex items-center gap-3">
            <Button
              asChild
              className="bg-[#81c995] hover:bg-[#6db882] text-[#0a0a0a] text-sm font-medium"
              size="sm"
            >
              <a
                href="https://github.com/dzianisv/spark"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Spark
              </a>
            </Button>
            <a
              href="https://github.com/dzianisv/spark"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9aa0a6] hover:text-[#e8eaed] transition-colors"
              aria-label="View Spark on GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-[#0a0a0a] py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block mb-4 px-3 py-1 rounded-full bg-[#1e2b1e] text-[#81c995] border border-[#2a3f2a] text-xs font-medium">
            One file · Open source
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#e8eaed] mb-6">
            The coding agent that{" "}
            <span className="text-[#81c995]">fits in one file</span>
          </h1>
          <p className="text-lg text-[#9aa0a6] mb-10 max-w-2xl mx-auto leading-relaxed">
            Spark is a single TypeScript file — 2 700 lines you can read, audit, and trust.
            Every tool an agent needs to get real coding work done is built in.
            No framework, no magic, no hidden runtime.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <Button
              asChild
              className="bg-[#81c995] hover:bg-[#6db882] text-[#0a0a0a] font-medium"
            >
              <a
                href="https://github.com/dzianisv/spark"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-[#3c4043] text-[#e8eaed] hover:bg-[#1a1a1a] hover:text-[#e8eaed]"
            >
              <a
                href="https://github.com/dzianisv/spark/blob/main/spark.ts"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <FileCode2 className="w-4 h-4" />
                Read the source
              </a>
            </Button>
          </div>
          <pre className="inline-block text-left bg-[#0d0d0d] border border-[#3c4043] text-[#81c995] rounded-lg px-6 py-3 font-mono text-sm">
            bun spark.ts --autopilot &quot;fix the login 500 and add a test&quot;
          </pre>
        </div>
      </section>

      {/* Value props */}
      <section className="bg-[#0d0d0d] py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-[#141414] border-[#3c4043]">
              <CardContent className="p-6">
                <div className="w-10 h-10 rounded-lg bg-[#81c995]/10 flex items-center justify-center mb-4">
                  <FileCode2 className="w-5 h-5 text-[#81c995]" />
                </div>
                <h3 className="font-semibold text-[#e8eaed] mb-2">One file. Easy to audit.</h3>
                <p className="text-[#9aa0a6] text-sm leading-relaxed">
                  The entire agent is <code className="text-[#81c995]">spark.ts</code>. No
                  installed packages, no separate runtime, no build step. Read it once — you
                  know everything the agent can do.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#141414] border-[#3c4043]">
              <CardContent className="p-6">
                <div className="w-10 h-10 rounded-lg bg-[#4fc3f7]/10 flex items-center justify-center mb-4">
                  <Zap className="w-5 h-5 text-[#4fc3f7]" />
                </div>
                <h3 className="font-semibold text-[#e8eaed] mb-2">All the tools to get shit done</h3>
                <p className="text-[#9aa0a6] text-sm leading-relaxed">
                  ReadFile, WriteFile, Bash, Eval, Glob, Grep, FindSymbol, Task — eight tools
                  that cover every real-world coding task. Nothing missing, nothing extra.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#141414] border-[#3c4043]">
              <CardContent className="p-6">
                <div className="w-10 h-10 rounded-lg bg-[#fdd663]/10 flex items-center justify-center mb-4">
                  <Cpu className="w-5 h-5 text-[#fdd663]" />
                </div>
                <h3 className="font-semibold text-[#e8eaed] mb-2">Local or remote LLM</h3>
                <p className="text-[#9aa0a6] text-sm leading-relaxed">
                  Auto-picks the best Ollama model on your machine. Or point{" "}
                  <code className="text-[#fdd663]">OPENAI_BASE_URL</code> at any
                  OpenAI-compatible API. Your keys, your hardware.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tools grid */}
      <section className="bg-[#0a0a0a] py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-[#e8eaed] mb-3 text-center">Built-in tools</h2>
          <p className="text-[#9aa0a6] text-center mb-10 max-w-xl mx-auto text-sm">
            Every tool the agent needs — all inside{" "}
            <code className="text-[#81c995]">spark.ts</code>. No plugins to install.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TOOLS.map(({ name, desc, color }) => (
              <Card key={name} className="bg-[#141414] border-[#3c4043]">
                <CardContent className="p-5">
                  <h3 className={`font-mono font-semibold text-sm mb-2 ${color}`}>{name}</h3>
                  <p className="text-[#9aa0a6] text-xs leading-relaxed">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How to run */}
      <section className="bg-[#0d0d0d] py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-[#e8eaed] mb-8 text-center">How to run it</h2>
          <div className="flex gap-2 mb-6 flex-wrap">
            {(["autopilot", "interactive", "sandbox", "skills"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-[#1e2b1e] text-[#81c995]"
                    : "bg-[#1a1a1a] text-[#9aa0a6] hover:bg-[#222222]"
                }`}
              >
                {tab === "autopilot"
                  ? "Autopilot"
                  : tab === "interactive"
                    ? "Interactive"
                    : tab === "sandbox"
                      ? "Docker Sandbox"
                      : "Skills"}
              </button>
            ))}
          </div>

          {activeTab === "autopilot" && (
            <div className="space-y-4">
              <p className="text-[#9aa0a6] text-sm">
                Pass a goal and walk away. Spark drives to completion — up to 50 reflection
                steps — and only exits when done.
              </p>
              <pre className="bg-[#0a0a0a] border border-[#3c4043] text-[#e8eaed] rounded-lg p-4 font-mono text-sm overflow-x-auto leading-relaxed">
                {AUTOPILOT_CODE}
              </pre>
            </div>
          )}
          {activeTab === "interactive" && (
            <div className="space-y-4">
              <p className="text-[#9aa0a6] text-sm">
                Drop into a REPL-style session. Type goals, review results, steer the agent
                one turn at a time.
              </p>
              <pre className="bg-[#0a0a0a] border border-[#3c4043] text-[#e8eaed] rounded-lg p-4 font-mono text-sm overflow-x-auto leading-relaxed">
                {INTERACTIVE_CODE}
              </pre>
            </div>
          )}
          {activeTab === "sandbox" && (
            <div className="space-y-4">
              <p className="text-[#9aa0a6] text-sm">
                Run inside an isolated Docker container — project mounted, Ollama accessible
                via host alias, no permanent side-effects outside the mount.
              </p>
              <pre className="bg-[#0a0a0a] border border-[#3c4043] text-[#e8eaed] rounded-lg p-4 font-mono text-sm overflow-x-auto leading-relaxed">
                {SANDBOX_CODE}
              </pre>
            </div>
          )}
          {activeTab === "skills" && (
            <div className="space-y-4">
              <p className="text-[#9aa0a6] text-sm">
                Drop a <code className="text-[#81c995]">SKILL.md</code> into{" "}
                <code className="text-[#81c995]">~/.agents/skills/&lt;name&gt;/</code>. The
                agent discovers and loads it via the{" "}
                <code className="text-[#81c995]">LoadSkill</code> tool — extend behavior
                without forking the source.
              </p>
              <pre className="bg-[#0a0a0a] border border-[#3c4043] text-[#e8eaed] rounded-lg p-4 font-mono text-sm overflow-x-auto leading-relaxed">
                {SKILL_CODE}
              </pre>
            </div>
          )}
        </div>
      </section>

      {/* Additional features */}
      <section className="bg-[#0a0a0a] py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-[#e8eaed] mb-10 text-center">
            Built for real engineering work
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-9 h-9 rounded-lg bg-[#81c995]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Layers className="w-4 h-4 text-[#81c995]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#e8eaed] mb-1">Parallel subagents</h3>
                  <p className="text-[#9aa0a6] text-sm leading-relaxed">
                    The <code className="text-[#81c995]">Task</code> tool spawns concurrent
                    sub-agents. Fan out work across multiple files or modules, then collect
                    results with <code className="text-[#81c995]">WaitTask</code>.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-9 h-9 rounded-lg bg-[#4fc3f7]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Search className="w-4 h-4 text-[#4fc3f7]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#e8eaed] mb-1">Context compaction</h3>
                  <p className="text-[#9aa0a6] text-sm leading-relaxed">
                    Long sessions automatically compact the context when it nears the model
                    limit. Runs stay coherent without manual intervention.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-9 h-9 rounded-lg bg-[#c58af9]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <GitBranch className="w-4 h-4 text-[#c58af9]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#e8eaed] mb-1">Git-aware context</h3>
                  <p className="text-[#9aa0a6] text-sm leading-relaxed">
                    Spark reads your git status and recent log at session start — the model
                    knows what branch you&apos;re on and what changed.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-9 h-9 rounded-lg bg-[#fdd663]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Code2 className="w-4 h-4 text-[#fdd663]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#e8eaed] mb-1">AGENTS.md instructions</h3>
                  <p className="text-[#9aa0a6] text-sm leading-relaxed">
                    Drop an <code className="text-[#fdd663]">AGENTS.md</code> in your repo
                    root. Spark loads it as system context — project conventions, forbidden
                    paths, custom tool hints.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-9 h-9 rounded-lg bg-[#81c995]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Terminal className="w-4 h-4 text-[#81c995]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#e8eaed] mb-1">Smart model selection</h3>
                  <p className="text-[#9aa0a6] text-sm leading-relaxed">
                    Auto-discovers Ollama models, scores them by capability and parameter
                    count, and picks the best one. Override with{" "}
                    <code className="text-[#81c995]">--model</code>.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-9 h-9 rounded-lg bg-[#4fc3f7]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-[#4fc3f7]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#e8eaed] mb-1">No install required</h3>
                  <p className="text-[#9aa0a6] text-sm leading-relaxed">
                    Clone the repo or copy the file. Run with{" "}
                    <code className="text-[#4fc3f7]">bun spark.ts</code>. Bun and an LLM
                    endpoint are the only dependencies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0d0d0d] py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#e8eaed] mb-4">
            An agent you can actually read
          </h2>
          <p className="text-[#9aa0a6] mb-10 max-w-xl mx-auto">
            One file. No magic. Every tool needed to ship real code — locally or against any
            OpenAI-compatible API.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto">
            <Card className="bg-[#141414] border-[#3c4043] hover:border-[#81c995]/40 transition-colors">
              <CardContent className="p-6 text-left">
                <div className="w-9 h-9 rounded-lg bg-[#81c995]/10 flex items-center justify-center mb-4">
                  <Terminal className="w-4 h-4 text-[#81c995]" />
                </div>
                <h3 className="font-semibold text-[#e8eaed] mb-1">Run now</h3>
                <p className="text-[#9aa0a6] text-xs mb-4">
                  Clone and run. Bun + Ollama is all you need.
                </p>
                <pre className="bg-[#0a0a0a] border border-[#3c4043] text-[#81c995] rounded p-3 font-mono text-xs whitespace-pre-wrap">
                  {`git clone github.com/dzianisv/spark
bun spark.ts`}
                </pre>
              </CardContent>
            </Card>

            <Card className="bg-[#141414] border-[#3c4043] hover:border-[#4fc3f7]/40 transition-colors">
              <CardContent className="p-6 text-left">
                <div className="w-9 h-9 rounded-lg bg-[#4fc3f7]/10 flex items-center justify-center mb-4">
                  <Github className="w-4 h-4 text-[#4fc3f7]" />
                </div>
                <h3 className="font-semibold text-[#e8eaed] mb-1">View on GitHub</h3>
                <p className="text-[#9aa0a6] text-xs mb-4">
                  Source, README, and the full spark.ts in one place.
                </p>
                <a
                  href="https://github.com/dzianisv/spark"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#4fc3f7] text-sm hover:underline"
                >
                  <Github className="w-4 h-4" />
                  dzianisv/spark
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#3c4043] bg-[#0a0a0a] py-8 px-4">
        <div className="max-w-5xl mx-auto text-center text-[#9aa0a6] text-sm">
          Built by{" "}
          <a
            href="https://agentlabs.cc"
            className="text-[#e8eaed] hover:text-[#81c995] transition-colors"
          >
            Vibe Technologies LLC
          </a>{" "}
          ·{" "}
          <a
            href="mailto:ai@agentlabs.cc"
            className="text-[#e8eaed] hover:text-[#81c995] transition-colors"
          >
            ai@agentlabs.cc
          </a>
        </div>
      </footer>
    </div>
  )
}
