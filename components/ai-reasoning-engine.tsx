"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Brain, 
  Lightbulb, 
  Target, 
  Eye, 
  RefreshCw, 
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Zap,
  Code,
  GitBranch,
  Activity,
  Layers,
  Cpu,
  Network,
  Sparkles
} from "lucide-react"

interface ReasoningStep {
  id: string
  type: 'plan' | 'execute' | 'reflect' | 'complete'
  title: string
  description: string
  status: 'pending' | 'active' | 'completed' | 'error'
  details?: string[]
}

export function AIReasoningEngine() {
  const [isRunning, setIsRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [reasoningSteps, setReasoningSteps] = useState<ReasoningStep[]>([
    {
      id: '1',
      type: 'plan',
      title: 'Planning Strategy',
      description: 'AI analyzes the task and creates an execution plan',
      status: 'pending',
      details: [
        'Understanding user intent',
        'Breaking down into subtasks',
        'Identifying required tools',
        'Estimating complexity'
      ]
    },
    {
      id: '2',
      type: 'execute',
      title: 'Executing Actions',
      description: 'Carrying out the plan using specialized tools',
      status: 'pending',
      details: [
        'Navigating to target pages',
        'Extracting relevant data',
        'Filling forms automatically',
        'Processing information'
      ]
    },
    {
      id: '3',
      type: 'reflect',
      title: 'Self-Reflection',
      description: 'Evaluating results and adjusting approach',
      status: 'pending',
      details: [
        'Checking task completion',
        'Identifying improvements',
        'Learning from errors',
        'Optimizing next steps'
      ]
    },
    {
      id: '4',
      type: 'complete',
      title: 'Task Complete',
      description: 'Final validation and result delivery',
      status: 'pending',
      details: [
        'Verifying all objectives met',
        'Summarizing actions taken',
        'Reporting to user',
        'Storing learnings'
      ]
    }
  ])

  const simulateReasoning = () => {
    setIsRunning(true)
    let step = 0
    
    const interval = setInterval(() => {
      if (step < reasoningSteps.length) {
        setReasoningSteps(prev => prev.map((s, i) => ({
          ...s,
          status: i < step ? 'completed' : i === step ? 'active' : 'pending'
        })))
        setCurrentStep(step)
        step++
      } else {
        setReasoningSteps(prev => prev.map(s => ({ ...s, status: 'completed' })))
        setIsRunning(false)
        clearInterval(interval)
      }
    }, 1500)
  }

  const resetSimulation = () => {
    setReasoningSteps(prev => prev.map(s => ({ ...s, status: 'pending' })))
    setCurrentStep(0)
    setIsRunning(false)
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">AI Reasoning Engine</h2>
        <p className="text-muted-foreground">
          LangGraph-based reflection pattern for intelligent, self-correcting task execution
        </p>
      </div>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-blue-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-6 h-6 text-purple-600" />
                Reasoning Pipeline
              </CardTitle>
              <CardDescription>
                Watch the AI think, plan, and execute tasks autonomously
              </CardDescription>
            </div>
            <div className="flex gap-2">
              {!isRunning ? (
                <Button onClick={simulateReasoning} className="bg-purple-600 hover:bg-purple-700">
                  <Zap className="w-4 h-4 mr-2" />
                  Start Reasoning
                </Button>
              ) : (
                <Button onClick={resetSimulation} variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative">
            {reasoningSteps.map((step, index) => (
              <div key={step.id} className="relative flex items-start gap-4 pb-8 last:pb-0">
                <div className="relative flex flex-col items-center">
                  <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500
                    ${step.status === 'completed' ? 'bg-green-500 scale-110' : 
                      step.status === 'active' ? 'bg-purple-600 scale-125 animate-pulse' : 
                      'bg-gray-200'}
                  `}>
                    {step.type === 'plan' && <Lightbulb className={`w-6 h-6 ${step.status !== 'pending' ? 'text-white' : 'text-gray-500'}`} />}
                    {step.type === 'execute' && <Target className={`w-6 h-6 ${step.status !== 'pending' ? 'text-white' : 'text-gray-500'}`} />}
                    {step.type === 'reflect' && <Eye className={`w-6 h-6 ${step.status !== 'pending' ? 'text-white' : 'text-gray-500'}`} />}
                    {step.type === 'complete' && <CheckCircle className={`w-6 h-6 ${step.status !== 'pending' ? 'text-white' : 'text-gray-500'}`} />}
                  </div>
                  {index < reasoningSteps.length - 1 && (
                    <div className={`
                      absolute top-12 w-0.5 h-16 transition-all duration-500
                      ${step.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'}
                    `} />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className={`font-semibold transition-colors duration-500 ${
                      step.status === 'active' ? 'text-purple-600' : 
                      step.status === 'completed' ? 'text-green-600' : 
                      'text-gray-600'
                    }`}>
                      {step.title}
                    </h3>
                    {step.status === 'active' && (
                      <Badge className="bg-purple-600 text-white animate-pulse">
                        Processing
                      </Badge>
                    )}
                    {step.status === 'completed' && (
                      <Badge className="bg-green-600 text-white">
                        Complete
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {step.description}
                  </p>
                  {step.details && step.status !== 'pending' && (
                    <div className="space-y-1">
                      {step.details.map((detail, i) => (
                        <div key={i} className={`
                          flex items-center gap-2 text-sm transition-all duration-300
                          ${step.status === 'active' ? 'opacity-100' : 'opacity-70'}
                        `}>
                          <div className={`
                            w-1.5 h-1.5 rounded-full
                            ${step.status === 'completed' ? 'bg-green-500' : 
                              step.status === 'active' ? 'bg-purple-600 animate-pulse' : 
                              'bg-gray-400'}
                          `} />
                          <span className="text-muted-foreground">{detail}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {isRunning && (
            <div className="bg-purple-100 rounded-lg p-4 border border-purple-200">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-purple-600 animate-pulse" />
                <div>
                  <p className="text-sm font-medium text-purple-900">AI is processing...</p>
                  <p className="text-xs text-purple-700">
                    The reasoning engine is analyzing and executing your request
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Layers className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold">Multi-Layer Processing</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Hierarchical reasoning with context awareness and memory persistence
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Context preservation</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Decision trees</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Parallel processing</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <GitBranch className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold">Adaptive Learning</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Self-improving algorithms that learn from each interaction
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Pattern recognition</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Error correction</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Performance optimization</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Network className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold">Tool Integration</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Seamless coordination of 28+ specialized tools for task completion
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>DOM manipulation</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Form automation</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Data extraction</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Cpu className="w-5 h-5 text-orange-600" />
              Technical Architecture
            </h3>
            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
              <Code className="w-3 h-3 mr-1" />
              LangGraph Framework
            </Badge>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Core Components</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ArrowRight className="w-3 h-3" />
                  <span>State machine for task orchestration</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ArrowRight className="w-3 h-3" />
                  <span>Reflection nodes for self-evaluation</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ArrowRight className="w-3 h-3" />
                  <span>Memory graph for context persistence</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ArrowRight className="w-3 h-3" />
                  <span>Tool executor with retry logic</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Advanced Features</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ArrowRight className="w-3 h-3" />
                  <span>Multi-agent collaboration support</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ArrowRight className="w-3 h-3" />
                  <span>Conditional branching logic</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ArrowRight className="w-3 h-3" />
                  <span>Rollback and recovery mechanisms</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ArrowRight className="w-3 h-3" />
                  <span>Performance monitoring dashboard</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}