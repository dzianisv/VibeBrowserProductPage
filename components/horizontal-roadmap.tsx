"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Clock, Calendar, Target, Zap } from "lucide-react"
import { useState } from "react"

interface Milestone {
  id: string
  title: string
  description: string
  date: string
  status: 'completed' | 'in-progress' | 'planned'
  category: string
  icon?: React.ReactNode
}

export function HorizontalRoadmap() {
  const [hoveredMilestone, setHoveredMilestone] = useState<string | null>(null)

  const milestones: Milestone[] = [
    // Completed milestones
    {
      id: "mvp-launch",
      title: "MVP Launch",
      description: "Core browser with basic AI capabilities",
      date: "Q4 2024",
      status: "completed",
      category: "Foundation",
      icon: <CheckCircle className="w-4 h-4" />
    },
    {
      id: "ai-reasoning",
      title: "AI Reasoning Engine",
      description: "LangGraph-based intelligent decision making",
      date: "Q4 2024",
      status: "completed",
      category: "AI Core",
      icon: <CheckCircle className="w-4 h-4" />
    },
    {
      id: "core-automation",
      title: "Core Automation",
      description: "Basic automation framework and tools",
      date: "Q1 2025",
      status: "completed",
      category: "Automation",
      icon: <CheckCircle className="w-4 h-4" />
    },
    {
      id: "ui-framework",
      title: "UI Framework",
      description: "Modern UI components and design system",
      date: "Q2 2025",
      status: "completed",
      category: "UI/UX",
      icon: <CheckCircle className="w-4 h-4" />
    },
    {
      id: "chat-interface",
      title: "ChatGPT Interface",
      description: "Modern conversational UI integrated into browser",
      date: "Q3 2025",
      status: "completed",
      category: "UI/UX",
      icon: <CheckCircle className="w-4 h-4" />
    },
    {
      id: "credential-mgmt",
      title: "Credential System",
      description: "Secure password and payment management",
      date: "Q3 2025",
      status: "completed",
      category: "Security",
      icon: <CheckCircle className="w-4 h-4" />
    },
    // In Progress milestones (Q4 2025 - current)
    {
      id: "flight-booking",
      title: "Flight Booking Agent",
      description: "End-to-end automated flight booking",
      date: "Q4 2025",
      status: "in-progress",
      category: "Automation",
      icon: <Clock className="w-4 h-4" />
    },
    {
      id: "linkedin-auto",
      title: "LinkedIn Automation",
      description: "Professional networking automation suite",
      date: "Q4 2025",
      status: "in-progress",
      category: "Automation",
      icon: <Clock className="w-4 h-4" />
    },
    {
      id: "extension",
      title: "Browser Extension",
      description: "Lightweight Chrome/Edge extension",
      date: "Q4 2025",
      status: "in-progress",
      category: "Deployment",
      icon: <Clock className="w-4 h-4" />
    },
    {
      id: "memory-system",
      title: "Memory System",
      description: "Persistent context and learning capabilities",
      date: "Q4 2025",
      status: "in-progress",
      category: "AI Core",
      icon: <Clock className="w-4 h-4" />
    },
    // Planned milestones
    {
      id: "cloud-agent",
      title: "VibeAgent Cloud",
      description: "Cloud-based agent for 24/7 automation",
      date: "Q1 2026",
      status: "planned",
      category: "Infrastructure",
      icon: <Calendar className="w-4 h-4" />
    },
    {
      id: "mcp-support",
      title: "MCP Integration",
      description: "Model Context Protocol for extensibility",
      date: "Q1 2026",
      status: "planned",
      category: "Platform",
      icon: <Calendar className="w-4 h-4" />
    },
    {
      id: "marketplace",
      title: "MCP Marketplace",
      description: "Plugin ecosystem for custom tools",
      date: "Q1 2026",
      status: "planned",
      category: "Platform",
      icon: <Calendar className="w-4 h-4" />
    },
    {
      id: "v2-release",
      title: "Version 2.0",
      description: "Major release with enterprise features",
      date: "Q1 2026",
      status: "planned",
      category: "Release",
      icon: <Calendar className="w-4 h-4" />
    },
    {
      id: "enterprise-sso",
      title: "Enterprise SSO",
      description: "Single sign-on for enterprise customers",
      date: "Q1 2026",
      status: "planned",
      category: "Security",
      icon: <Calendar className="w-4 h-4" />
    },
    {
      id: "mobile-app",
      title: "Mobile Apps",
      description: "iOS and Android companion apps",
      date: "Q2 2026",
      status: "planned",
      category: "Platform",
      icon: <Calendar className="w-4 h-4" />
    }
  ]

  const quarters = [
    { label: "Q4 2024", position: 0 },
    { label: "Q1 2025", position: 16.66 },
    { label: "Q2 2025", position: 33.33 },
    { label: "Q3 2025", position: 50 },
    { label: "Q4 2025", position: 66.66 },
    { label: "Q1 2026", position: 83.33 },
    { label: "Q2 2026", position: 100 }
  ]

  const getPositionForDate = (date: string): number => {
    const quarterMap: { [key: string]: number } = {
      "Q4 2024": 0,
      "Q1 2025": 16.66,
      "Q2 2025": 33.33,
      "Q3 2025": 50,
      "Q4 2025": 66.66,
      "Q1 2026": 83.33,
      "Q2 2026": 100
    }
    return quarterMap[date] || 0
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500'
      case 'in-progress':
        return 'bg-blue-500'
      case 'planned':
        return 'bg-purple-500'
      default:
        return 'bg-gray-400'
    }
  }

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-green-200'
      case 'in-progress':
        return 'bg-blue-50 border-blue-200'
      case 'planned':
        return 'bg-purple-50 border-purple-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Foundation': 'text-slate-600',
      'AI Core': 'text-purple-600',
      'UI/UX': 'text-pink-600',
      'Security': 'text-green-600',
      'Automation': 'text-blue-600',
      'Infrastructure': 'text-orange-600',
      'Deployment': 'text-cyan-600',
      'Platform': 'text-indigo-600',
      'Release': 'text-red-600'
    }
    return colors[category] || 'text-gray-600'
  }

  return (
    <div className="w-full">
      {/* Timeline Container */}
      <div className="relative bg-white rounded-2xl p-8 shadow-lg border overflow-x-auto max-w-full">
        {/* Quarter Labels */}
        <div className="relative h-12 mb-8 border-b-2 border-gray-200">
          {quarters.map((quarter) => (
            <div
              key={quarter.label}
              className="absolute transform -translate-x-1/2"
              style={{ left: `${quarter.position}%` }}
            >
              <div className="flex flex-col items-center">
                <div className="w-px h-4 bg-gray-400" />
                <span className="text-sm font-semibold text-gray-700 mt-1 whitespace-nowrap">
                  {quarter.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 rounded-full" />
          
          {/* Progress Indicator - Currently at Q4 2025 */}
          <div 
            className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full shadow-lg"
            style={{ width: '70%' }}
          />

          {/* Milestones */}
          <div className="relative pt-8">
            {milestones.map((milestone, index) => {
              const position = getPositionForDate(milestone.date)
              const isHovered = hoveredMilestone === milestone.id
              
              // Group milestones by date to calculate vertical positions
              const sameDateIndex = milestones
                .slice(0, index)
                .filter(m => m.date === milestone.date).length
              
              // Calculate vertical position to avoid overlaps
              const verticalOffset = sameDateIndex * 140
              
              return (
                <div
                  key={milestone.id}
                  className="absolute transform -translate-x-1/2 transition-all duration-300"
                  style={{ 
                    left: `${position}%`,
                    top: `${verticalOffset}px`,
                    zIndex: isHovered ? 50 : 10
                  }}
                  onMouseEnter={() => setHoveredMilestone(milestone.id)}
                  onMouseLeave={() => setHoveredMilestone(null)}
                >
                  {/* Connector Line */}
                  <div 
                    className={`absolute w-px bg-gray-300 ${isHovered ? 'bg-gray-500' : ''}`}
                    style={{
                      height: `${verticalOffset + 32}px`,
                      top: `-${verticalOffset + 32}px`,
                      left: '50%',
                      transform: 'translateX(-50%)'
                    }}
                  />
                  
                  {/* Milestone Dot */}
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                    <div className={`w-4 h-4 rounded-full ${getStatusColor(milestone.status)} ring-4 ring-white shadow-lg ${isHovered ? 'scale-150' : ''} transition-transform`} />
                  </div>

                  {/* Milestone Card */}
                  <Card className={`${getStatusBgColor(milestone.status)} hover:shadow-xl transition-all duration-300 ${isHovered ? 'scale-105' : ''} cursor-pointer`}>
                    <CardContent className="p-4 w-[220px]">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {milestone.icon}
                          <span className={`text-xs font-medium ${getCategoryColor(milestone.category)}`}>
                            {milestone.category}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">{milestone.date}</span>
                      </div>
                      <h4 className="font-semibold text-sm mb-1">{milestone.title}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {milestone.description}
                      </p>
                      <div className="mt-2">
                        {milestone.status === 'completed' && (
                          <span className="inline-flex items-center gap-1 text-xs text-green-600 font-medium">
                            <CheckCircle className="w-3 h-3" />
                            Completed
                          </span>
                        )}
                        {milestone.status === 'in-progress' && (
                          <span className="inline-flex items-center gap-1 text-xs text-blue-600 font-medium">
                            <Clock className="w-3 h-3" />
                            In Progress
                          </span>
                        )}
                        {milestone.status === 'planned' && (
                          <span className="inline-flex items-center gap-1 text-xs text-purple-600 font-medium">
                            <Calendar className="w-3 h-3" />
                            Planned
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>

          {/* Spacer for height - dynamically calculate based on max milestones at same date */}
          <div style={{ height: `${Math.max(...quarters.map(q => 
            milestones.filter(m => m.date === q.label).length
          )) * 140 + 100}px` }} />
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm text-gray-600">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-sm text-gray-600">In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500" />
            <span className="text-sm text-gray-600">Planned</span>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">6</div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">4</div>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">6</div>
            <p className="text-sm text-muted-foreground">Planned</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}