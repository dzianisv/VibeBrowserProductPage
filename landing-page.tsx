import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { WaitlistDialog, ComingSoonDialog } from "./components/waitlist-dialog"
import {
Chrome,
Zap,
MessageSquare,
Plane,
CreditCard,
FileText,
Youtube,
Sparkles,
Download,
CheckCircle,
Shield,
Lock,
Eye,
Play,
Clock,
ShoppingCart,
Calendar,
Search,
Globe,
Briefcase,
MapPin,
Coffee,
Camera,
Code,
MousePointer,
Edit,
Key,
Brain,
Database,
ListTodo,
Home,
Puzzle,
Store,
ArrowRight,
RefreshCw,
Target,
Lightbulb,
} from "lucide-react"
import Link from "next/link"

export default function Component() {
return (
<div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-white">
  {/* Header */}
  <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
    <div className="flex items-center justify-center">
      <div className="flex items-center gap-2">
        <div
          className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
          <Chrome className="h-5 w-5 text-white" />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Vibe Browser
        </span>
      </div>
    </div>
    <nav className="ml-auto flex gap-4 sm:gap-6">
      <Link href="#features" className="text-sm font-medium hover:text-purple-600 transition-colors">
      Features
      </Link>
      <Link href="#how-it-works" className="text-sm font-medium hover:text-purple-600 transition-colors">
      How It Works
      </Link>
      <Link href="#roadmap" className="text-sm font-medium hover:text-purple-600 transition-colors">
      Roadmap
      </Link>
      <Link href="#security" className="text-sm font-medium hover:text-purple-600 transition-colors">
      Security
      </Link>
      <Link href="#demo" className="text-sm font-medium hover:text-purple-600 transition-colors">
      Demo
      </Link>
      <Link href="#pricing" className="text-sm font-medium hover:text-purple-600 transition-colors">
      Download
      </Link>
    </nav>
  </header>

  <main className="flex-1">
    {/* Hero Section */}
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center gap-6 text-center max-w-5xl mx-auto">
          <Badge variant="secondary"
            className="px-4 py-2 text-sm font-medium bg-purple-100 text-purple-700 border-purple-200">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Native Browser • Built on Chromium
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Browse Smarter,
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent block">
              Not Harder
            </span>
          </h1>

          <p className="max-w-3xl text-lg text-muted-foreground md:text-xl leading-relaxed">
            Vibe Browser handles the tedious work while you focus on what matters. Say goodbye to repetitive tasks
            and hello to AI-powered browsing that understands natural language and automates complex web
            interactions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <WaitlistDialog>
              <Button size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg">
                <Download className="w-5 h-5 mr-2" />
                Join Waitlist
              </Button>
            </WaitlistDialog>
            <ComingSoonDialog>
              <Button variant="outline" size="lg"
                className="px-8 py-3 text-lg border-purple-200 hover:bg-purple-50 bg-transparent">
                <Play className="w-5 h-5 mr-2" />
                See It In Action
              </Button>
            </ComingSoonDialog>
          </div>

          {/* Interactive Demo */}

          {/* Browser Screenshot Demo */}
          <div className="mt-12 max-w-6xl w-full">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold mb-4">See Vibe Browser in Action</h3>
              <p className="text-muted-foreground text-lg">
                Real screenshots showing AI-powered browsing, intelligent automation, and seamless integration
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* AI Configuration Interface */}
              <div className="relative group lg:col-span-2">
                <div
                  className="relative overflow-hidden rounded-2xl shadow-2xl border border-slate-200 transition-transform group-hover:scale-[1.02]">
                  <img src="/images/vibe-ai-configuration.png"
                    alt="Vibe Browser AI Configuration showing multiple LLM providers including OpenAI, Anthropic Claude, and Google Gemini with API key management"
                    className="w-full h-auto" />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent rounded-2xl pointer-events-none" />
                </div>
                <div className="mt-4 text-center">
                  <h4 className="font-semibold text-lg mb-2">Multi-LLM Configuration</h4>
                  <p className="text-sm text-muted-foreground">
                    Configure multiple AI providers with secure API key management and model selection
                  </p>
                </div>
              </div>

              {/* ChatGPT-like Interface */}
              <div className="relative group">
                <div
                  className="relative overflow-hidden rounded-2xl shadow-2xl border border-slate-200 transition-transform group-hover:scale-[1.02]">
                  <img src="/images/vibe-chat-interface.png"
                    alt="Vibe Browser ChatGPT-like AI interface with clean chat design and 'What is on your mind?' prompt"
                    className="w-full h-auto" />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent rounded-2xl pointer-events-none" />
                </div>
                <div className="mt-4 text-center">
                  <h4 className="font-semibold text-lg mb-2">ChatGPT-like Interface</h4>
                  <p className="text-sm text-muted-foreground">
                    Modern conversational AI interface integrated directly into the browser
                  </p>
                </div>
              </div>

              {/* Intelligent Flight Booking */}
              <div className="relative group lg:col-span-2">
                <div
                  className="relative overflow-hidden rounded-2xl shadow-2xl border border-slate-200 transition-transform group-hover:scale-[1.02]">
                  <img src="/images/vibe-flight-booking-analysis.png"
                    alt="Vibe Browser AI Agent analyzing Google Flights page and providing intelligent recovery strategies for flight booking automation"
                    className="w-full h-auto" />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent rounded-2xl pointer-events-none" />
                </div>
                <div className="mt-4 text-center">
                  <h4 className="font-semibold text-lg mb-2">Intelligent Flight Booking</h4>
                  <p className="text-sm text-muted-foreground">
                    AI agent analyzes booking challenges and provides smart recovery strategies
                  </p>
                </div>
              </div>

              {/* Natural Language Flight Booking */}
              <div className="relative group">
                <div
                  className="relative overflow-hidden rounded-2xl shadow-2xl border border-slate-200 transition-transform group-hover:scale-[1.02]">
                  <img src="/images/vibe-natural-language-booking.png"
                    alt="Vibe Browser processing natural language flight booking command 'Book flight sfo jfk aug1' with real-time AI agent execution"
                    className="w-full h-auto" />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent rounded-2xl pointer-events-none" />
                </div>
                <div className="mt-4 text-center">
                  <h4 className="font-semibold text-lg mb-2">Natural Language Booking</h4>
                  <p className="text-sm text-muted-foreground">
                    Simply type "Book flight sfo jfk aug1" and watch AI handle the entire process
                  </p>
                </div>
              </div>
            </div>

            {/* LinkedIn Automation Showcase */}
            <div className="mt-16 max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold mb-4">LinkedIn Automation in Action</h3>
                <p className="text-muted-foreground text-lg">
                  Watch Vibe Browser automatically log in, navigate, and extract venture capitalist contacts from
                  your LinkedIn network
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {/* Step 1: Initial Command */}
                <div className="relative group">
                  <div
                    className="relative overflow-hidden rounded-2xl shadow-2xl border border-slate-200 transition-transform group-hover:scale-[1.02]">
                    <img src="/images/linkedin-automation-4.png"
                      alt="User requesting LinkedIn automation: 'go to linkedin, list all the vc in my network as csv' with AI agent beginning the multi-step process"
                      className="w-full h-auto" />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent rounded-2xl pointer-events-none" />
                    <div
                      className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Step 1
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-semibold text-lg mb-2">Natural Language Command</h4>
                    <p className="text-sm text-muted-foreground">
                      Simply tell Vibe: "Go to LinkedIn, list all the VCs in my network as CSV"
                    </p>
                  </div>
                </div>

                {/* Step 2: Auto Login */}
                <div className="relative group">
                  <div
                    className="relative overflow-hidden rounded-2xl shadow-2xl border border-slate-200 transition-transform group-hover:scale-[1.02]">
                    <img src="/images/linkedin-automation-2.png"
                      alt="Vibe Browser automatically filling LinkedIn login form with provided credentials and preparing to sign in"
                      className="w-full h-auto" />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent rounded-2xl pointer-events-none" />
                    <div
                      className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Step 2
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-semibold text-lg mb-2">Automatic Login</h4>
                    <p className="text-sm text-muted-foreground">
                      AI securely fills credentials and handles authentication automatically
                    </p>
                  </div>
                </div>

                {/* Step 3: Network Analysis */}
                <div className="relative group">
                  <div
                    className="relative overflow-hidden rounded-2xl shadow-2xl border border-slate-200 transition-transform group-hover:scale-[1.02]">
                    <img src="/images/linkedin-automation-1.png"
                      alt="AI agent analyzing LinkedIn feed and connections to identify venture capitalists, showing multi-step reasoning process"
                      className="w-full h-auto" />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent rounded-2xl pointer-events-none" />
                    <div
                      className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Step 3
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-semibold text-lg mb-2">Intelligent Filtering</h4>
                    <p className="text-sm text-muted-foreground">
                      AI analyzes your network to identify and filter venture capitalists
                    </p>
                  </div>
                </div>

                {/* Step 4: Data Processing */}
                <div className="relative group">
                  <div
                    className="relative overflow-hidden rounded-2xl shadow-2xl border border-slate-200 transition-transform group-hover:scale-[1.02]">
                    <img src="/images/linkedin-automation-3.png"
                      alt="AI agent processing LinkedIn data through multiple iterations, showing complex reasoning and data extraction in progress"
                      className="w-full h-auto" />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent rounded-2xl pointer-events-none" />
                    <div
                      className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Step 4
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-semibold text-lg mb-2">Data Extraction & CSV Export</h4>
                    <p className="text-sm text-muted-foreground">
                      AI processes connections and formats the data into a downloadable CSV file
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-8 mt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Multi-Step Reasoning</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Secure Credential Handling</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Intelligent Data Processing</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-8 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Real-time AI Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Multi-Provider Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Intelligent Automation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* How It Works - AI Agent Architecture */}
    <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-slate-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">How Our AI Agent Works</h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Built on cutting-edge research from Google, our AI agent uses the ReAct pattern for intelligent
            reasoning and action
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Research Foundation */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="px-4 py-2 text-sm font-medium mb-4">
              <Brain className="w-4 h-4 mr-2" />
              Research-Backed Architecture
            </Badge>
            <p className="text-muted-foreground">
              Based on{" "}
              <Link href="https://arxiv.org/abs/2210.03629" target="_blank"
                className="text-purple-600 hover:text-purple-700 underline">
              ReAct: Synergizing Reasoning and Acting in Language Models
              </Link>{" "}
              from Google Research and state-of-the-art AI agent architectures
            </p>
          </div>

          {/* Core Loop Visualization */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border mb-12">
            <h3 className="text-xl font-semibold text-center mb-8">The Think-Act-Observe Loop</h3>

            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Step 1: Think */}
              <div className="flex flex-col items-center text-center flex-1">
                <div
                  className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4">
                  <Lightbulb className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Think</h4>
                <p className="text-sm text-muted-foreground">
                  AI reasons about the task, analyzes the current state, and plans the next action
                </p>
              </div>

              <ArrowRight className="w-6 h-6 text-muted-foreground hidden md:block" />

              {/* Step 2: Act */}
              <div className="flex flex-col items-center text-center flex-1">
                <div
                  className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Act</h4>
                <p className="text-sm text-muted-foreground">
                  Executes actions using 28+ specialized tools for web interaction and automation
                </p>
              </div>

              <ArrowRight className="w-6 h-6 text-muted-foreground hidden md:block" />

              {/* Step 3: Observe */}
              <div className="flex flex-col items-center text-center flex-1">
                <div
                  className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Observe</h4>
                <p className="text-sm text-muted-foreground">
                  Analyzes results, learns from feedback, and adjusts strategy for the next iteration
                </p>
              </div>

              <div className="flex items-center justify-center md:hidden mt-4">
                <RefreshCw className="w-6 h-6 text-muted-foreground" />
              </div>
            </div>

            <div className="hidden md:flex items-center justify-center mt-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <RefreshCw className="w-4 h-4" />
                <span>Continuous loop until task completion</span>
              </div>
            </div>
          </div>

          {/* Key Capabilities */}

          {/* Research Validation */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">Research-Validated Design</h3>
              <p className="text-muted-foreground">
                Our implementation directly addresses key challenges identified in PhD-level AI agent research
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm">
                  <strong>ReAct Pattern:</strong> Thought-Action-Observation loop implementation
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm">
                  <strong>Self-Correction:</strong> Memory system enables plan adjustment
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm">
                  <strong>Interpretability:</strong> Clear reasoning traces for debugging
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm">
                  <strong>Robust Design:</strong> Elegant solution prevents failure modes
                </span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white/50 rounded-lg border border-purple-200">
              <p className="text-sm text-muted-foreground italic">
                "Successful goal execution by agents is contingent upon proper planning and self-correction. Without
                the ability to self-evaluate and create effective plans, single agents may get stuck in an endless
                execution loop."
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                — Research finding directly addressed by our architecture
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Development Roadmap */}
    <section id="roadmap" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">Development Roadmap</h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Track our progress as we build the future of AI-native browsing
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {/* Completed Features */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-green-600 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Completed Features
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Camera className="w-5 h-5 text-green-600" />
                      <div>
                        <h4 className="font-medium">Screenshot Capture</h4>
                        <p className="text-sm text-muted-foreground">Take and analyze webpage screenshots</p>
                      </div>
                      <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Code className="w-5 h-5 text-green-600" />
                      <div>
                        <h4 className="font-medium">DOM Manipulation</h4>
                        <p className="text-sm text-muted-foreground">Direct access to page structure</p>
                      </div>
                      <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-green-600" />
                      <div>
                        <h4 className="font-medium">Markdown Conversion</h4>
                        <p className="text-sm text-muted-foreground">Convert page content to markdown</p>
                      </div>
                      <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <MousePointer className="w-5 h-5 text-green-600" />
                      <div>
                        <h4 className="font-medium">Click Actions</h4>
                        <p className="text-sm text-muted-foreground">Automated clicking and navigation</p>
                      </div>
                      <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Edit className="w-5 h-5 text-green-600" />
                      <div>
                        <h4 className="font-medium">Form Filling</h4>
                        <p className="text-sm text-muted-foreground">Intelligent form field completion</p>
                      </div>
                      <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* In Development */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-blue-600 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                In Development
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Key className="w-5 h-5 text-blue-600" />
                      <div>
                        <h4 className="font-medium">Credential Management</h4>
                        <p className="text-sm text-muted-foreground">Secure password & payment storage</p>
                      </div>
                      <div className="w-4 h-4 border-2 border-blue-600 rounded ml-auto" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Brain className="w-5 h-5 text-blue-600" />
                      <div>
                        <h4 className="font-medium">AI Reasoning Engine</h4>
                        <p className="text-sm text-muted-foreground">Advanced decision-making capabilities</p>
                      </div>
                      <div className="w-4 h-4 border-2 border-blue-600 rounded ml-auto" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Database className="w-5 h-5 text-blue-600" />
                      <div>
                        <h4 className="font-medium">Memory System</h4>
                        <p className="text-sm text-muted-foreground">Persistent context and learning</p>
                      </div>
                      <div className="w-4 h-4 border-2 border-blue-600 rounded ml-auto" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <ListTodo className="w-5 h-5 text-blue-600" />
                      <div>
                        <h4 className="font-medium">Planning Tools</h4>
                        <p className="text-sm text-muted-foreground">Todo and task management</p>
                      </div>
                      <div className="w-4 h-4 border-2 border-blue-600 rounded ml-auto" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Planned Features */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-purple-600 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Planned Features
              </h3>

              <div className="grid gap-4 md:grid-cols-1">
                <Card className="border-purple-200 bg-purple-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Plane className="w-5 h-5 text-purple-600" />
                      <div>
                        <h4 className="font-medium">End-to-End Flight Booking</h4>
                        <p className="text-sm text-muted-foreground">
                          Complete flight search, comparison, and booking automation
                        </p>
                      </div>
                      <div className="w-4 h-4 border-2 border-purple-600 rounded ml-auto" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 bg-purple-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Home className="w-5 h-5 text-purple-600" />
                      <div>
                        <h4 className="font-medium">Airbnb Booking Agent</h4>
                        <p className="text-sm text-muted-foreground">Automated accommodation search and booking</p>
                      </div>
                      <div className="w-4 h-4 border-2 border-purple-600 rounded ml-auto" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 bg-purple-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-5 h-5 text-purple-600" />
                      <div>
                        <h4 className="font-medium">ChatGPT-like Interface</h4>
                        <p className="text-sm text-muted-foreground">Modern conversational UI/UX redesign</p>
                      </div>
                      <div className="w-4 h-4 border-2 border-purple-600 rounded ml-auto" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 bg-purple-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Chrome className="w-5 h-5 text-purple-600" />
                      <div>
                        <h4 className="font-medium">AI-First Homepage</h4>
                        <p className="text-sm text-muted-foreground">
                          Replace traditional homepage with AI agent interface
                        </p>
                      </div>
                      <div className="w-4 h-4 border-2 border-purple-600 rounded ml-auto" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 bg-purple-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Puzzle className="w-5 h-5 text-purple-600" />
                      <div>
                        <h4 className="font-medium">MCP Server Support</h4>
                        <p className="text-sm text-muted-foreground">Model Context Protocol integration</p>
                      </div>
                      <div className="w-4 h-4 border-2 border-purple-600 rounded ml-auto" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 bg-purple-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Store className="w-5 h-5 text-purple-600" />
                      <div>
                        <h4 className="font-medium">MCP Marketplace</h4>
                        <p className="text-sm text-muted-foreground">Extensible plugin ecosystem</p>
                      </div>
                      <div className="w-4 h-4 border-2 border-purple-600 rounded ml-auto" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Want to stay updated on our progress? Join our waitlist for development updates.
            </p>
            <WaitlistDialog>
              <Button
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                Get Development Updates
              </Button>
            </WaitlistDialog>
          </div>
        </div>
      </div>
    </section>

    {/* Use Cases by User Type */}
    <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Perfect for Every Professional
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Whether you're a busy executive, frequent traveler, or productivity enthusiast, Vibe adapts to your
            workflow
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <div
                className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-6">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Business Executives</h3>
              <p className="text-muted-foreground mb-4">
                Automate meeting scheduling, expense reporting, and travel bookings. Focus on strategy, not admin
                work.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 text-emerald-500" />
                  Schedule meetings across time zones
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CreditCard className="w-4 h-4 text-emerald-500" />
                  Automated expense tracking
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="w-4 h-4 text-emerald-500" />
                  Instant document summaries
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <div
                className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Frequent Travelers</h3>
              <p className="text-muted-foreground mb-4">
                Book flights, hotels, and rentals with a single command. Compare prices and manage itineraries
                effortlessly.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Plane className="w-4 h-4 text-purple-500" />
                  Multi-airline price comparison
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 text-purple-500" />
                  Real-time flight updates
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 text-purple-500" />
                  Secure payment processing
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <div
                className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-6">
                <Coffee className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Productivity Enthusiasts</h3>
              <p className="text-muted-foreground mb-4">
                Streamline research, automate routine purchases, and enhance your daily digital workflows.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Search className="w-4 h-4 text-orange-500" />
                  Intelligent research assistance
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ShoppingCart className="w-4 h-4 text-orange-500" />
                  Automated routine orders
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Zap className="w-4 h-4 text-orange-500" />
                  Custom workflow automation
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    {/* AI Features */}
    <section id="features" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">Built-in AI Assistant</h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Every page, video, and document becomes interactive with embedded AI capabilities
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow group">
            <CardContent className="p-6 text-center">
              <MessageSquare
                className="h-8 w-8 mx-auto mb-4 text-purple-600 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Ask Page</h3>
              <p className="text-sm text-muted-foreground">
                Get instant answers about any webpage content without reading everything
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow group">
            <CardContent className="p-6 text-center">
              <Youtube className="h-8 w-8 mx-auto mb-4 text-red-600 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Ask Video</h3>
              <p className="text-sm text-muted-foreground">
                Query YouTube videos and get timestamped answers without watching
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow group">
            <CardContent className="p-6 text-center">
              <FileText className="h-8 w-8 mx-auto mb-4 text-emerald-600 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Smart Summarize</h3>
              <p className="text-sm text-muted-foreground">
                Get concise summaries of articles, documents, and research papers
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow group">
            <CardContent className="p-6 text-center">
              <Globe className="h-8 w-8 mx-auto mb-4 text-orange-600 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Real-time Translation</h3>
              <p className="text-sm text-muted-foreground">
                Translate and explain complex content in any language instantly
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    {/* Security & Privacy */}


    {/* Team Section */}
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">Meet the Team</h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Experienced engineers and product leaders building the future of AI-native browsing
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-4 max-w-6xl mx-auto">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-24 h-24 mx-auto mb-6 overflow-hidden rounded-full">
                <img src="/images/dennis-vashchuk.jpg" alt="Dennis Vashchuk" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dzianis Vashchuk</h3>
              <p className="text-muted-foreground mb-4">Founder</p>
              <Link href="https://www.linkedin.com/in/dzianisv/" target="_blank"
                className="inline-flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn Profile
              </Link>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-24 h-24 mx-auto mb-6 overflow-hidden rounded-full">
                <img src="/images/dzmitry-dalenka.jpg" alt="Dzmitry Dalenka" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dzmitry Dalenka</h3>
              <p className="text-muted-foreground mb-4">ML Engineer</p>
              <Link href="https://www.linkedin.com/in/dzmitry-dalenka/" target="_blank"
                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn Profile
              </Link>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-24 h-24 mx-auto mb-6 overflow-hidden rounded-full">
                <img src="/images/dima-kostenich.jpg" alt="Dzmitry Kastsenich" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dzmitry Kastsenich</h3>
              <p className="text-muted-foreground mb-4 whitespace-nowrap">Chromium Consultant</p>
              <Link href="https://www.linkedin.com/in/dima-kostenich/" target="_blank"
                className="inline-flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn Profile
              </Link>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-24 h-24 mx-auto mb-6 overflow-hidden rounded-full">
                <img src="/images/alexander-dzerakh.jpg" alt="Alexander Dzerakh"
                  className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Alexander Dzerakh</h3>
              <p className="text-muted-foreground mb-4">Product Consultant</p>
              <Link href="https://www.linkedin.com/in/alexander-dzerakh" target="_blank"
                className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn Profile
              </Link>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-24 h-24 mx-auto mb-6 overflow-hidden rounded-full">
                <img src="/images/bender.jpg" alt="Bender"
                  className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Vibe Engineer</h3>
              <p className="text-muted-foreground mb-4">Software Engineer</p>
              <Link href="https://www.linkedin.com/in/dzianisv" target="_blank"
                className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn Profile
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    {/* FAQ Section */}
    <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Frequently Asked Questions
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Everything you need to know about Vibe Browser
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left">
                Why not OpenAI?
              </AccordionTrigger>
              <AccordionContent>
                <ul>
                  <li>
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm"> Runs locally — full access to your cookies, credentials, and
                      sessions.</span>
                  </li>
                  <li>
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm"> Supports Chrome extensions — even the ones cloud agents can’t run.</span>
                  </li>
                  <li>
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm"> Real-time translation — pages, videos, and audio.</span>
                  </li>
                  <li>
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm"> Smart context — ask, summarize, automate anything on any page.</span>
                  </li>
                  <li>
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm"> Automates real work — fills forms, replies in Slack, books
                      tickets.</span>
                  </li>
                  <li>
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm"> Works on mobile and desktop — your agent, always with you.</span>
                  </li>
                  <li><span>Unlike cloud agents, Vibe is your browser — fully private, fully capable.</span></li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left">
                Can I use Vibe Browser with my existing bookmarks and extensions?
              </AccordionTrigger>
              <AccordionContent>
                Yes! Since Vibe is built on Chromium, you can easily import your bookmarks, passwords, and most
                Chrome extensions. The transition is seamless and takes just a few minutes.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left">
                What happens if the AI makes a mistake during automation?
              </AccordionTrigger>
              <AccordionContent>
                Vibe always asks for confirmation before completing any purchase or important action. You can review
                all details before proceeding, and you can cancel or modify any automated task at any time. We also
                provide detailed logs of all actions taken.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left">
                What are the pricing plans for Vibe Browser?
              </AccordionTrigger>
              <AccordionContent>
                Vibe Browser offers a free tier with 30 AI queries per day and basic automation features. Our Pro
                plan ($20/month) includes unlimited AI queries, advanced automation, and priority support. We're
                currently in private beta - join our waitlist for early access and launch pricing.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left">
                How does AI processing work in Vibe Browser?
              </AccordionTrigger>
              <AccordionContent>
                Vibe Browser connects to leading LLM providers like OpenAI, Anthropic, and Google Gemini to deliver
                powerful AI capabilities. For users who prefer complete privacy, we also support locally-hosted LLM
                models that run entirely on your device without any external connections.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-600 to-pink-600">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center gap-6 text-center text-white">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Be Among the First to Browse Smarter
          </h2>
          <p className="max-w-2xl text-lg opacity-90">
            Vibe Browser is launching soon. Join our waitlist to get early access and exclusive launch pricing when
            we go live.
          </p>

          <div className="grid gap-6 md:grid-cols-2 max-w-2xl w-full mt-8">
            <Card className="bg-white/10 border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Free</h3>
                <p className="text-3xl font-bold mb-4">
                  $0<span className="text-lg font-normal">/month</span>
                </p>
                <ul className="space-y-2 text-sm mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    30 AI queries per day
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Basic automation features
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Community support
                  </li>
                </ul>
                <WaitlistDialog tier="free">
                  <Button variant="secondary" className="w-full bg-white text-purple-600 hover:bg-slate-100">
                    Join Free Waitlist
                  </Button>
                </WaitlistDialog>
              </CardContent>
            </Card>

            <Card className="bg-white text-purple-600 border-2 border-white">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold">Pro</h3>
                  <Badge className="bg-purple-600 text-white">Popular</Badge>
                </div>
                <p className="text-3xl font-bold mb-4">
                  $100<span className="text-lg font-normal">/month</span>
                </p>
                <ul className="space-y-2 text-sm mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Unlimited AI queries
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Advanced automation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Priority support
                  </li>
                </ul>
                <WaitlistDialog tier="pro">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Join Pro Waitlist</Button>
                </WaitlistDialog>
              </CardContent>
            </Card>
            
          </div>

          <p className="text-sm opacity-70 mt-4">
            Early access • Launch discount • Be first to experience AI browsing
          </p>
        </div>
      </div>
    </section>
  </main>

  {/* Footer */}
  <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white">
    <p className="text-xs text-muted-foreground">© 2025 Vibe Browser. All rights reserved.</p>
    <nav className="sm:ml-auto flex gap-4 sm:gap-6">
      <Link href="#" className="text-xs hover:underline underline-offset-4 text-muted-foreground">
      Privacy Policy
      </Link>
      <Link href="#" className="text-xs hover:underline underline-offset-4 text-muted-foreground">
      Terms of Service
      </Link>
      <Link href="#" className="text-xs hover:underline underline-offset-4 text-muted-foreground">
      Support
      </Link>
      <Link href="#" className="text-xs hover:underline underline-offset-4 text-muted-foreground">
      Blog
      </Link>
    </nav>
  </footer>
</div>
)
}
