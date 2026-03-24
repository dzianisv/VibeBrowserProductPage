import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Ollama Integration | Vibe Browser',
  description: 'Learn how to use Ollama with Vibe Browser for 100% private, local AI browser automation. Run models like Qwen and Llama locally with zero data leaving your machine.',
}

export default function OllamaProviderPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-16 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <Link href="/providers" className="text-gray-400 hover:text-white transition-colors mb-6 inline-block">
            &larr; Back to Providers
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Ollama
          </h1>
          <p className="text-xl text-gray-300">
            Run Vibe Browser with 100% private, local models via Ollama. Zero data leaves your machine.
          </p>
        </div>

        {/* Quick Start Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 md:p-8 mb-12 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-white">Quick Start</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-2 text-white flex items-center">
                <span className="bg-blue-600/20 text-blue-400 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm border border-blue-500/30">1</span>
                Install Ollama
              </h3>
              <p className="text-gray-400 mb-3 ml-11">
                Download and install Ollama for your operating system from <a href="https://ollama.com/download" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline">ollama.com</a>.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2 text-white flex items-center">
                <span className="bg-blue-600/20 text-blue-400 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm border border-blue-500/30">2</span>
                Pull a Model
              </h3>
              <p className="text-gray-400 mb-3 ml-11">
                We recommend starting with Qwen 2.5 or Llama 3 for the best browser automation experience.
              </p>
              <div className="ml-11 bg-black rounded-lg p-4 font-mono text-sm border border-gray-800">
                <code className="text-gray-300">
                  <span className="text-gray-500"># Recommended for Vibe Browser</span><br/>
                  ollama pull qwen2.5:14b<br/>
                  <br/>
                  <span className="text-gray-500"># Alternative</span><br/>
                  ollama pull llama3.1
                </code>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2 text-white flex items-center">
                <span className="bg-blue-600/20 text-blue-400 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm border border-blue-500/30">3</span>
                Connect Vibe Browser
              </h3>
              <p className="text-gray-400 mb-3 ml-11">
                Open Vibe Browser Settings, select <strong>Ollama (Self-Hosted)</strong> as your provider, and it will automatically connect to <code>http://localhost:11434</code>.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="prose prose-invert prose-blue max-w-none prose-pre:bg-black prose-pre:border prose-pre:border-gray-800">
          <h2>Why use Ollama with Vibe Browser?</h2>
          
          <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
              <div className="text-2xl mb-3">🕵️‍♂️</div>
              <h3 className="text-lg font-semibold text-white mb-2">Absolute Privacy</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Your browsing history, DOM snapshots, and prompts never leave your local machine. No cloud telemetry, no data harvesting.
              </p>
            </div>
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
              <div className="text-2xl mb-3">🔌</div>
              <h3 className="text-lg font-semibold text-white mb-2">Offline Automation</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Automate intranet sites, local development servers, and offline documents without needing an active internet connection.
              </p>
            </div>
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
              <div className="text-2xl mb-3">💸</div>
              <h3 className="text-lg font-semibold text-white mb-2">Zero API Costs</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Run unlimited automation tasks and process millions of tokens without worrying about usage limits or API billing.
              </p>
            </div>
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
              <div className="text-2xl mb-3">⚡</div>
              <h3 className="text-lg font-semibold text-white mb-2">Native Integration</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Vibe Browser connects directly to Ollama's native API, fully supporting its tool-calling capabilities out of the box.
              </p>
            </div>
          </div>

          <h2>Model Discovery</h2>
          <p>
            Vibe Browser automatically discovers models from your local Ollama instance. When you open the model dropdown in settings, you'll see all installed models directly queried from the <code>/api/tags</code> endpoint.
          </p>
          <p>
            If you select a model from the recommended list that isn't installed yet, Vibe Browser will automatically trigger a background pull (<code>/api/pull</code>) to download it.
          </p>

          <div className="bg-blue-900/20 border-l-4 border-blue-500 p-4 my-6 rounded-r-lg">
            <h4 className="text-blue-400 font-semibold m-0 mb-2">Recommended Models</h4>
            <p className="text-gray-300 m-0 text-sm">
              Browser automation requires models with strong reasoning and tool-use capabilities. For Ollama, we highly recommend the <strong>Qwen 2.5</strong> family (14b or 32b) or <strong>Llama 3.1</strong>. Smaller models (under 7B parameters) may struggle with complex DOM structures.
            </p>
          </div>

          <h2>Troubleshooting</h2>
          
          <h3>Connection Refused</h3>
          <p>
            If Vibe Browser cannot connect to Ollama, ensure the Ollama service is running. 
            Open your terminal and run:
          </p>
          <pre><code>curl http://localhost:11434</code></pre>
          <p>You should see: <code>Ollama is running</code></p>

          <h3>CORS Issues</h3>
          <p>
            If you're running Ollama on a different machine in your network, you must configure CORS so the Vibe Browser extension can connect to it. Set the <code>OLLAMA_ORIGINS</code> environment variable before starting the server:
          </p>
          <pre><code>OLLAMA_ORIGINS="*" ollama serve</code></pre>
          <p>
            Then update the Base URL in Vibe Browser's settings to match your machine's IP (e.g., <code>http://192.168.1.100:11434</code>).
          </p>

          <hr className="border-gray-800 my-10" />

          <p className="text-gray-400 text-sm text-center">
            Have questions about running local models? Join our <a href="https://discord.gg/vibebrowser" className="text-blue-400 hover:underline">Discord community</a> for setup help and model recommendations.
          </p>
        </div>

      </div>
    </div>
  )
}
