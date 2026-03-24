"use client"

import Link from "next/link"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { trackCTAClick } from "@/components/google-analytics"
import {
  Shield,
  WifiOff,
  DollarSign,
  Zap,
  Chrome,
  ArrowLeft,
  ArrowRight,
  Server,
} from "lucide-react"

const CHROME_WEB_STORE_URL =
  "https://chromewebstore.google.com/detail/vibe-ai-browser-co-pilot/djodpgokbmobeclicaicnnidccoinado"

export default function OllamaProviderPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-[#e8eaed] overflow-x-hidden">
      {/* Header */}
      <header className="w-full px-4 lg:px-6 h-16 flex items-center justify-between border-b border-[#1e1e1e] bg-[#0a0a0a]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img
            src="/vibebrowser-logo.png"
            alt="Vibe Co-Pilot"
            className="w-9 h-9 object-contain"
          />
          <span className="text-lg font-medium text-[#e8eaed]">
            Ollama<span className="text-[#9aa0a6]"> · Private Local AI</span>
          </span>
        </div>
        <nav className="hidden md:flex gap-6 items-center text-sm">
          <a href="#quick-start" className="text-[#9aa0a6] hover:text-[#e8eaed] transition-colors">
            Quick Start
          </a>
          <a href="#why-ollama" className="text-[#9aa0a6] hover:text-[#e8eaed] transition-colors">
            Why Ollama
          </a>
          <a href="#troubleshooting" className="text-[#9aa0a6] hover:text-[#e8eaed] transition-colors">
            Troubleshooting
          </a>
        </nav>
        <div className="flex gap-3 items-center">
          <Link
            href="/"
            className="text-sm text-[#9aa0a6] hover:text-[#e8eaed] transition-colors hidden sm:block"
          >
            Vibe Co-Pilot
          </Link>
          <Link href={CHROME_WEB_STORE_URL} target="_blank" rel="noopener noreferrer">
            <Button
              size="sm"
              className="bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#0a0a0a] font-medium rounded-full"
              onClick={() => trackCTAClick("install_extension", "ollama_header")}
            >
              Install Extension
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="w-full py-16 md:py-24">
          <div className="container max-w-4xl px-4 md:px-6 mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-[#9aa0a6] hover:text-[#e8eaed] transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Vibe Co-Pilot
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <Server className="w-8 h-8 text-[#8ab4f8]" />
              <h1 className="text-4xl md:text-5xl font-bold text-[#e8eaed]">
                Ollama
              </h1>
            </div>
            <p className="text-xl text-[#9aa0a6] max-w-2xl">
              Run Vibe Browser with 100% private, local models via Ollama. Your
              browsing data, DOM snapshots, and prompts never leave your machine.
            </p>
          </div>
        </section>

        {/* Quick Start */}
        <section id="quick-start" className="w-full pb-16 scroll-mt-20">
          <div className="container max-w-4xl px-4 md:px-6 mx-auto">
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold mb-6 text-[#e8eaed]">Quick Start</h2>

              <div className="space-y-8">
                {/* Step 1 */}
                <div>
                  <h3 className="text-lg font-medium mb-2 text-[#e8eaed] flex items-center">
                    <span className="bg-[#8ab4f8]/15 text-[#8ab4f8] rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm border border-[#8ab4f8]/30">
                      1
                    </span>
                    Install Ollama
                  </h3>
                  <p className="text-[#9aa0a6] mb-3 ml-11">
                    Download and install from{" "}
                    <a
                      href="https://ollama.com/download"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8ab4f8] hover:underline"
                      onClick={() => trackCTAClick("ollama_download", "ollama_quick_start")}
                    >
                      ollama.com
                    </a>
                    . Single binary, no Docker or Python needed.
                  </p>
                </div>

                {/* Step 2 */}
                <div>
                  <h3 className="text-lg font-medium mb-2 text-[#e8eaed] flex items-center">
                    <span className="bg-[#8ab4f8]/15 text-[#8ab4f8] rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm border border-[#8ab4f8]/30">
                      2
                    </span>
                    Pull a Model
                  </h3>
                  <p className="text-[#9aa0a6] mb-3 ml-11">
                    Browser automation requires strong reasoning and tool-use. We
                    recommend <strong className="text-[#e8eaed]">Qwen 3.5</strong> for
                    the best experience.
                  </p>
                  <div className="ml-11 bg-black rounded-lg p-4 font-mono text-sm border border-[#2a2a2a]">
                    <code className="text-[#bdc1c6]">
                      <span className="text-[#5f6368]"># Recommended for Vibe Browser</span>
                      <br />
                      ollama pull qwen3.5
                      <br />
                      <br />
                      <span className="text-[#5f6368]"># Lighter alternative</span>
                      <br />
                      ollama pull llama3.1:8b
                      <br />
                      <br />
                      <span className="text-[#5f6368]"># Smallest, great for testing</span>
                      <br />
                      ollama pull smollm2:1.7b
                    </code>
                  </div>
                </div>

                {/* Step 3 */}
                <div>
                  <h3 className="text-lg font-medium mb-2 text-[#e8eaed] flex items-center">
                    <span className="bg-[#8ab4f8]/15 text-[#8ab4f8] rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm border border-[#8ab4f8]/30">
                      3
                    </span>
                    Connect Vibe Browser
                  </h3>
                  <p className="text-[#9aa0a6] ml-11">
                    Open Vibe Browser Settings, select{" "}
                    <strong className="text-[#e8eaed]">Ollama (Self-Hosted)</strong> as
                    your provider. It auto-connects to{" "}
                    <code className="text-[#8ab4f8] bg-[#8ab4f8]/10 px-1.5 py-0.5 rounded text-sm">
                      localhost:11434
                    </code>{" "}
                    and shows all your installed models.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Ollama */}
        <section id="why-ollama" className="w-full pb-16 scroll-mt-20">
          <div className="container max-w-4xl px-4 md:px-6 mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-[#e8eaed]">
              Why use Ollama with Vibe Browser?
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 rounded-xl">
                <Shield className="w-6 h-6 text-[#8ab4f8] mb-3" />
                <h3 className="text-lg font-semibold text-[#e8eaed] mb-2">
                  Absolute Privacy
                </h3>
                <p className="text-[#9aa0a6] text-sm leading-relaxed">
                  Your browsing history, DOM snapshots, and prompts never leave
                  your local machine. No cloud telemetry, no data harvesting.
                </p>
              </div>

              <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 rounded-xl">
                <WifiOff className="w-6 h-6 text-[#8ab4f8] mb-3" />
                <h3 className="text-lg font-semibold text-[#e8eaed] mb-2">
                  Offline Automation
                </h3>
                <p className="text-[#9aa0a6] text-sm leading-relaxed">
                  Automate intranet sites, local dev servers, and offline
                  documents without needing an active internet connection.
                </p>
              </div>

              <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 rounded-xl">
                <DollarSign className="w-6 h-6 text-[#8ab4f8] mb-3" />
                <h3 className="text-lg font-semibold text-[#e8eaed] mb-2">
                  Zero API Costs
                </h3>
                <p className="text-[#9aa0a6] text-sm leading-relaxed">
                  Run unlimited automation tasks and process millions of tokens
                  without worrying about usage limits or API billing.
                </p>
              </div>

              <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 rounded-xl">
                <Zap className="w-6 h-6 text-[#8ab4f8] mb-3" />
                <h3 className="text-lg font-semibold text-[#e8eaed] mb-2">
                  Native Integration
                </h3>
                <p className="text-[#9aa0a6] text-sm leading-relaxed">
                  Vibe Browser connects directly to Ollama&apos;s native API with
                  full support for tool-calling capabilities out of the box.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Model Discovery */}
        <section className="w-full pb-16">
          <div className="container max-w-4xl px-4 md:px-6 mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-[#e8eaed]">
              Model Discovery
            </h2>
            <p className="text-[#9aa0a6] mb-4">
              Vibe Browser automatically discovers models from your local Ollama
              instance. When you open the model dropdown in settings, you see all
              installed models directly queried from the{" "}
              <code className="text-[#8ab4f8] bg-[#8ab4f8]/10 px-1.5 py-0.5 rounded text-sm">
                /api/tags
              </code>{" "}
              endpoint.
            </p>
            <p className="text-[#9aa0a6] mb-6">
              If you select a model from the recommended list that isn&apos;t
              installed yet, Vibe Browser automatically triggers a background pull
              via{" "}
              <code className="text-[#8ab4f8] bg-[#8ab4f8]/10 px-1.5 py-0.5 rounded text-sm">
                /api/pull
              </code>{" "}
              to download it.
            </p>

            {/* Recommended Models callout */}
            <div className="bg-[#8ab4f8]/10 border-l-4 border-[#8ab4f8] p-4 rounded-r-lg">
              <h4 className="text-[#8ab4f8] font-semibold mb-2">
                Recommended Models
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-[#9aa0a6]">
                      <th className="pr-4 pb-2 font-medium">Model</th>
                      <th className="pb-2 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#bdc1c6]">
                    <tr className="border-t border-[#2a2a2a]">
                      <td className="pr-4 py-2 font-mono text-[#8ab4f8]">qwen3.5</td>
                      <td className="py-2">Default pick -- strong reasoning and tool use</td>
                    </tr>
                    <tr className="border-t border-[#2a2a2a]">
                      <td className="pr-4 py-2 font-mono text-[#8ab4f8]">llama3.1:8b</td>
                      <td className="py-2">Meta&apos;s general-purpose model</td>
                    </tr>
                    <tr className="border-t border-[#2a2a2a]">
                      <td className="pr-4 py-2 font-mono text-[#8ab4f8]">deepseek-r1:8b</td>
                      <td className="py-2">Strong reasoning and math</td>
                    </tr>
                    <tr className="border-t border-[#2a2a2a]">
                      <td className="pr-4 py-2 font-mono text-[#8ab4f8]">gemma3:4b</td>
                      <td className="py-2">Google&apos;s efficient model</td>
                    </tr>
                    <tr className="border-t border-[#2a2a2a]">
                      <td className="pr-4 py-2 font-mono text-[#8ab4f8]">smollm2:1.7b</td>
                      <td className="py-2">Smallest, runs on anything</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[#9aa0a6] text-xs mt-3">
                Model size and memory footprint vary by quantization and
                runtime settings. Browse all models at{" "}
                <a
                  href="https://ollama.com/library"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8ab4f8] hover:underline"
                >
                  ollama.com/library
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section id="troubleshooting" className="w-full pb-16 scroll-mt-20">
          <div className="container max-w-4xl px-4 md:px-6 mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-[#e8eaed]">
              Troubleshooting
            </h2>

            <div className="space-y-6">
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
                <h3 className="text-lg font-medium text-[#e8eaed] mb-2">
                  Connection Refused
                </h3>
                <p className="text-[#9aa0a6] text-sm mb-3">
                  If Vibe Browser cannot connect, ensure the Ollama service is
                  running:
                </p>
                <div className="bg-black rounded-lg p-3 font-mono text-sm border border-[#2a2a2a] mb-2">
                  <code className="text-[#bdc1c6]">
                    curl http://localhost:11434
                  </code>
                </div>
                <p className="text-[#9aa0a6] text-sm">
                  You should see:{" "}
                  <code className="text-[#8ab4f8]">Ollama is running</code>. If
                  not, run{" "}
                  <code className="text-[#8ab4f8]">ollama serve</code> to start it.
                </p>
              </div>

              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
                <h3 className="text-lg font-medium text-[#e8eaed] mb-2">
                  CORS Issues
                </h3>
                <p className="text-[#9aa0a6] text-sm mb-3">
                  If running Ollama on a different machine, set the{" "}
                  <code className="text-[#8ab4f8]">OLLAMA_ORIGINS</code>{" "}
                  environment variable:
                </p>
                <div className="bg-black rounded-lg p-3 font-mono text-sm border border-[#2a2a2a] mb-2">
                  <code className="text-[#bdc1c6]">
                    OLLAMA_ORIGINS=&quot;*&quot; ollama serve
                  </code>
                </div>
                <p className="text-[#9aa0a6] text-sm">
                  Then update the Base URL in Vibe Browser settings to match your
                  machine&apos;s IP (e.g.{" "}
                  <code className="text-[#8ab4f8]">
                    http://192.168.1.100:11434
                  </code>
                  ).
                </p>
              </div>

              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
                <h3 className="text-lg font-medium text-[#e8eaed] mb-2">
                  Model Runs Slowly
                </h3>
                <p className="text-[#9aa0a6] text-sm">
                  Memory requirements vary by model and quantization (for
                  example Q4 vs F16). Try a smaller model ({" "}
                  <code className="text-[#8ab4f8]">qwen3:4b</code> or{" "}
                  <code className="text-[#8ab4f8]">smollm2:1.7b</code>), close
                  other apps to free RAM, or use quantized (Q4) variants for
                  lower memory usage.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full pb-20">
          <div className="container max-w-4xl px-4 md:px-6 mx-auto">
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-semibold text-[#e8eaed] mb-3">
                Ready to run private AI in your browser?
              </h2>
              <p className="text-[#9aa0a6] mb-6 max-w-lg mx-auto">
                Install Vibe Browser, connect Ollama, and start automating --
                with zero data leaving your machine.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={CHROME_WEB_STORE_URL} target="_blank" rel="noopener noreferrer">
                  <Button
                    size="lg"
                    className="bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#0a0a0a] font-medium px-8 py-6 h-auto rounded-full"
                    onClick={() =>
                      trackCTAClick("install_extension", "ollama_cta")
                    }
                  >
                    <Chrome className="mr-2 h-5 w-5" />
                    Install Vibe Browser
                  </Button>
                </Link>
                <Link href="https://docs.vibebrowser.app/self-hosted-llm/ollama">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-[#3c4043] text-[#e8eaed] hover:bg-[#2a2a2a] px-8 py-6 h-auto rounded-full"
                  >
                    Full Ollama Docs
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
