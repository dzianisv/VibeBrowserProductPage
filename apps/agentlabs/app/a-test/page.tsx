"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Terminal, Code2, Zap, Github, Cpu, Monitor, Smartphone, CheckCircle2, Globe } from "lucide-react"

const ANDROID_CODE = `from a_test import TestCase, run_case

case = TestCase(
    name="basic_smoke",
    package="com.android.calculator2",
    instruction="Verify the Calculator keypad is visible, then compute 5 + 3 = and confirm the result is 8.",
    successCriteria=["Calculator is open with a numeric keypad", "Result 8 is displayed"],
    failureCriteria=["App crashes or shows error dialog"],
    maxSteps=15,
)

result = run_case(case, output_dir="./a-test-output")
print(result["verdict"], "--", result["reason"])
# pass -- YES. The calculator shows 8 after tapping 5 + 3 =.`

const BROWSER_CODE = `# examples/open-weather.yaml
target: browser
name: open_weather
instruction: "Navigate to openweathermap.org and confirm the homepage loads with a search box"
successCriteria:
  - "OpenWeatherMap homepage is visible"
  - "Search input is present"
maxSteps: 10`

const BROWSER_RUN = `a-test run --target browser --case examples/open-weather.yaml --output-dir ./output`

const CI_CODE = `- uses: dzianisv/a-test/.github/actions/a-test-android@main
  with:
    case: examples/android/basic_smoke.py
    api-level: '33'
    output-dir: ./cua-output
  env:
    AZURE_CUA_API_KEY: \${{ secrets.AZURE_CUA_API_KEY }}
    AZURE_CUA_BASE_URL: \${{ secrets.AZURE_CUA_BASE_URL }}
    AZURE_CUA_MODEL: gpt-5.4`

const RESULT_JSON = `{
  "verdict": "pass",
  "reason": "YES. The calculator shows 8 after tapping 5 + 3 =.",
  "steps": 7,
  "gif": "./a-test-output/demo.gif"
}`

type Tab = "android" | "browser" | "ci"

export default function ATestPage() {
  const [activeTab, setActiveTab] = useState<Tab>("android")

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-[#e8eaed]">
      {/* Header */}
      <header className="border-b border-[#3c4043] bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="font-semibold text-lg tracking-tight text-[#e8eaed]">a-test</span>
          <div className="flex items-center gap-3">
            <Button
              asChild
              className="bg-[#81c995] hover:bg-[#6db882] text-[#0a0a0a] text-sm font-medium"
              size="sm"
            >
              <a href="mailto:ai@agentlabs.cc">Request Demo</a>
            </Button>
            <a
              href="https://github.com/dzianisv/a-test"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9aa0a6] hover:text-[#e8eaed] transition-colors"
              aria-label="View a-test on GitHub"
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
            Open source on GitHub
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#e8eaed] mb-6">
            AI-driven UI testing for{" "}
            <span className="text-[#81c995]">Mobile Apps and Browser Apps</span>
          </h1>
          <p className="text-lg text-[#9aa0a6] mb-10 max-w-2xl mx-auto leading-relaxed">
            a-test uses a computer-use agent to drive your real UI, then judges the result
            against your success criteria using a vision-loop LLM call. No mocks. No record-and-replay.
            Just a GIF and a verdict.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              className="bg-[#81c995] hover:bg-[#6db882] text-[#0a0a0a] font-medium"
            >
              <a
                href="https://github.com/dzianisv/a-test#quickstart-android"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Started
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-[#3c4043] text-[#e8eaed] hover:bg-[#1a1a1a] hover:text-[#e8eaed]"
            >
              <a
                href="https://github.com/dzianisv/a-test"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                View on GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="bg-[#0d0d0d] py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-[#141414] border-[#3c4043]">
              <CardContent className="p-6">
                <div className="w-10 h-10 rounded-lg bg-[#81c995]/10 flex items-center justify-center mb-4">
                  <Smartphone className="w-5 h-5 text-[#81c995]" />
                </div>
                <h3 className="font-semibold text-[#e8eaed] mb-2">Real UI, Real Device</h3>
                <p className="text-[#9aa0a6] text-sm leading-relaxed">
                  Drives actual Android apps via adb or Chrome extensions via CDP. No mocks, no
                  record-and-replay. If the UI breaks, the agent finds it.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#141414] border-[#3c4043]">
              <CardContent className="p-6">
                <div className="w-10 h-10 rounded-lg bg-[#4fc3f7]/10 flex items-center justify-center mb-4">
                  <Cpu className="w-5 h-5 text-[#4fc3f7]" />
                </div>
                <h3 className="font-semibold text-[#e8eaed] mb-2">Vision-loop Verification</h3>
                <p className="text-[#9aa0a6] text-sm leading-relaxed">
                  A second LLM call judges the final screenshot against your success criteria.
                  Pass means confirmed on screen — not just that the agent finished.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#141414] border-[#3c4043]">
              <CardContent className="p-6">
                <div className="w-10 h-10 rounded-lg bg-[#fdd663]/10 flex items-center justify-center mb-4">
                  <Zap className="w-5 h-5 text-[#fdd663]" />
                </div>
                <h3 className="font-semibold text-[#e8eaed] mb-2">CI-ready in One Line</h3>
                <p className="text-[#9aa0a6] text-sm leading-relaxed">
                  GitHub Actions reusable workflow. Add one step, spin up an Android emulator
                  or Chrome, and get a GIF + result.json on every push.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works tabs */}
      <section className="bg-[#0a0a0a] py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-[#e8eaed] mb-8 text-center">How it works</h2>
          <div className="flex gap-2 mb-6 flex-wrap">
            {(["android", "browser", "ci"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-[#1e2b1e] text-[#81c995]"
                    : "bg-[#1a1a1a] text-[#9aa0a6] hover:bg-[#222222]"
                }`}
              >
                {tab === "android" ? "Android" : tab === "browser" ? "Browser" : "CI / GitHub Actions"}
              </button>
            ))}
          </div>

          {activeTab === "android" && (
            <pre className="bg-[#0d0d0d] border border-[#3c4043] text-[#e8eaed] rounded-lg p-4 font-mono text-sm overflow-x-auto leading-relaxed">
              {ANDROID_CODE}
            </pre>
          )}

          {activeTab === "browser" && (
            <div className="space-y-4">
              <pre className="bg-[#0d0d0d] border border-[#3c4043] text-[#e8eaed] rounded-lg p-4 font-mono text-sm overflow-x-auto leading-relaxed">
                {BROWSER_CODE}
              </pre>
              <p className="text-[#9aa0a6] text-sm">Then run:</p>
              <pre className="bg-[#0d0d0d] border border-[#3c4043] text-[#e8eaed] rounded-lg p-4 font-mono text-sm overflow-x-auto leading-relaxed">
                {BROWSER_RUN}
              </pre>
            </div>
          )}

          {activeTab === "ci" && (
            <pre className="bg-[#0d0d0d] border border-[#3c4043] text-[#e8eaed] rounded-lg p-4 font-mono text-sm overflow-x-auto leading-relaxed">
              {CI_CODE}
            </pre>
          )}
        </div>
      </section>

      {/* What it tests */}
      <section className="bg-[#0d0d0d] py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-[#e8eaed] mb-8 text-center">What it tests</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: Smartphone,
                color: "text-[#81c995]",
                bg: "bg-[#81c995]/10",
                title: "Android Apps",
                desc: "Any APK via adb — emulator or physical device. Full touch + swipe interaction.",
              },
              {
                icon: Code2,
                color: "text-[#4fc3f7]",
                bg: "bg-[#4fc3f7]/10",
                title: "Chrome Extensions",
                desc: "Load unpacked extensions in a real Chrome instance and test popup UIs, content scripts, and side panels.",
              },
              {
                icon: Monitor,
                color: "text-[#c58af9]",
                bg: "bg-[#c58af9]/10",
                title: "Web UIs",
                desc: "Navigate any website via CDP. Confirm flows, forms, and visual states without writing selectors.",
              },
              {
                icon: Globe,
                color: "text-[#fdd663]",
                bg: "bg-[#fdd663]/10",
                title: "Any Browser Target",
                desc: "YAML test cases for any URL target. Portable across CI environments and local dev.",
              },
            ].map(({ icon: Icon, color, bg, title, desc }) => (
              <Card key={title} className="bg-[#141414] border-[#3c4043]">
                <CardContent className="p-5">
                  <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center mb-3`}>
                    <Icon className={`w-4 h-4 ${color}`} />
                  </div>
                  <h3 className="font-semibold text-[#e8eaed] text-sm mb-1">{title}</h3>
                  <p className="text-[#9aa0a6] text-xs leading-relaxed">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Output section */}
      <section className="bg-[#111111] py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl font-bold text-[#e8eaed] mb-4">What you get</h2>
              <p className="text-[#9aa0a6] leading-relaxed mb-6">
                Every test run produces two artifacts dropped into your output directory.
              </p>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#81c995] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-[#e8eaed]">demo.gif</span>
                    <p className="text-[#9aa0a6] text-sm mt-0.5">
                      Frame-by-frame agent reasoning. Share it in your PR for instant visual
                      evidence that the UI works.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#81c995] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-[#e8eaed]">result.json</span>
                    <p className="text-[#9aa0a6] text-sm mt-0.5">
                      Machine-readable verdict with reason and step count. Parse it in CI to
                      fail the build or annotate the PR.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs text-[#9aa0a6] font-mono mb-2">result.json</p>
              <pre className="bg-[#0d0d0d] border border-[#3c4043] text-[#e8eaed] rounded-lg p-4 font-mono text-sm overflow-x-auto leading-relaxed">
                {RESULT_JSON}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-[#0a0a0a] py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#e8eaed] mb-4">
            Ready to test your UI with an agent?
          </h2>
          <p className="text-[#9aa0a6] mb-10">
            Open source and available on GitHub. Install from a pinned commit until the first PyPI release.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto">
            <Card className="bg-[#141414] border-[#3c4043] hover:border-[#81c995]/40 transition-colors">
              <CardContent className="p-6 text-left">
                <div className="w-9 h-9 rounded-lg bg-[#81c995]/10 flex items-center justify-center mb-4">
                  <Terminal className="w-4 h-4 text-[#81c995]" />
                </div>
                <h3 className="font-semibold text-[#e8eaed] mb-1">Install from source</h3>
                <p className="text-[#9aa0a6] text-xs mb-4">Pin installation to a Git commit for reproducible CI.</p>
                <pre className="overflow-x-auto bg-[#0d0d0d] border border-[#3c4043] text-[#81c995] rounded p-3 font-mono text-xs">
                  pip install &quot;git+https://github.com/dzianisv/a-test.git@&lt;commit-sha&gt;&quot;
                </pre>
              </CardContent>
            </Card>

            <Card className="bg-[#141414] border-[#3c4043] hover:border-[#4fc3f7]/40 transition-colors">
              <CardContent className="p-6 text-left">
                <div className="w-9 h-9 rounded-lg bg-[#4fc3f7]/10 flex items-center justify-center mb-4">
                  <Github className="w-4 h-4 text-[#4fc3f7]" />
                </div>
                <h3 className="font-semibold text-[#e8eaed] mb-1">View on GitHub</h3>
                <p className="text-[#9aa0a6] text-xs mb-4">Source, docs, and examples in one place.</p>
                <a
                  href="https://github.com/dzianisv/a-test"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#4fc3f7] text-sm hover:underline"
                >
                  <Github className="w-4 h-4" />
                  dzianisv/a-test
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
