"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Sparkles,
  ArrowRight,
  Plane,
  ShoppingCart,
  Calendar,
  Mail,
  FileText,
  Globe,
  Search,
  TrendingUp,
  Clock,
  Bookmark,
  Grid,
  MessageSquare,
  Zap,
  Brain,
  Command,
  Home,
  CreditCard,
  Users,
  Settings,
  Activity,
  BookOpen,
  Youtube,
  Linkedin,
  Twitter,
  Github,
  MapPin,
  Hotel,
  Car,
  Coffee,
  Music,
  Camera,
  Gamepad,
  Heart,
  Star
} from "lucide-react"

interface QuickAction {
  id: string
  icon: React.ElementType
  title: string
  description: string
  color: string
  gradient: string
}

interface RecentTask {
  id: string
  title: string
  time: string
  status: 'completed' | 'in-progress'
}

export function AIFirstHomepage() {
  const [command, setCommand] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [suggestions, setSuggestions] = useState([
    "Book a flight to Paris for next weekend",
    "Find the best Italian restaurant near me",
    "Schedule a meeting with the team tomorrow at 2 PM",
    "Order groceries for the week"
  ])

  const quickActions: QuickAction[] = [
    {
      id: '1',
      icon: Plane,
      title: 'Book Flight',
      description: 'Search and book flights',
      color: 'text-blue-600',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: '2',
      icon: Hotel,
      title: 'Find Hotels',
      description: 'Compare accommodations',
      color: 'text-purple-600',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      id: '3',
      icon: ShoppingCart,
      title: 'Shopping',
      description: 'Browse and buy products',
      color: 'text-green-600',
      gradient: 'from-green-500 to-green-600'
    },
    {
      id: '4',
      icon: Calendar,
      title: 'Schedule',
      description: 'Manage your calendar',
      color: 'text-orange-600',
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      id: '5',
      icon: Mail,
      title: 'Email',
      description: 'Compose and send emails',
      color: 'text-red-600',
      gradient: 'from-red-500 to-red-600'
    },
    {
      id: '6',
      icon: FileText,
      title: 'Documents',
      description: 'Create and edit docs',
      color: 'text-indigo-600',
      gradient: 'from-indigo-500 to-indigo-600'
    },
    {
      id: '7',
      icon: Linkedin,
      title: 'LinkedIn',
      description: 'Automate networking',
      color: 'text-blue-700',
      gradient: 'from-blue-600 to-blue-700'
    },
    {
      id: '8',
      icon: Youtube,
      title: 'YouTube',
      description: 'Search and analyze videos',
      color: 'text-red-600',
      gradient: 'from-red-500 to-red-600'
    }
  ]

  const recentTasks: RecentTask[] = [
    { id: '1', title: 'Booked flight to San Francisco', time: '2 hours ago', status: 'completed' },
    { id: '2', title: 'Responded to 15 LinkedIn messages', time: '4 hours ago', status: 'completed' },
    { id: '3', title: 'Filling tax forms...', time: 'Now', status: 'in-progress' },
    { id: '4', title: 'Ordered groceries from Amazon', time: 'Yesterday', status: 'completed' }
  ]

  const handleCommand = () => {
    if (!command.trim()) return
    setIsProcessing(true)
    
    setTimeout(() => {
      setIsProcessing(false)
      setCommand("")
    }, 2000)
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center mb-12 pt-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              What can I do for you today?
            </span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Just tell me what you need. I can browse, click, type, and complete any task on the web for you.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur">
            <CardContent className="p-6">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <Command className="w-5 h-5 text-purple-600" />
                  <span className="text-sm text-muted-foreground hidden sm:inline">AI Command</span>
                </div>
                
                <Input
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCommand()}
                  placeholder="Type anything... 'Book a flight to Tokyo' or 'Fill out this form'"
                  className="pl-32 pr-32 h-16 text-lg border-0 bg-transparent focus:ring-0"
                />
                
                <Button
                  onClick={handleCommand}
                  disabled={!command.trim() || isProcessing}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-12 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {isProcessing ? (
                    <>
                      <Activity className="w-4 h-4 mr-2 animate-pulse" />
                      Processing
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Execute
                    </>
                  )}
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {suggestions.map((suggestion, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => setCommand(suggestion)}
                  >
                    <ArrowRight className="w-3 h-3 mr-1" />
                    {suggestion}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-12">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Grid className="w-4 h-4 text-purple-600" />
                  Quick Actions
                </h3>
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {quickActions.slice(0, 6).map((action) => (
                  <Button
                    key={action.id}
                    variant="outline"
                    className="h-auto p-3 flex flex-col items-center gap-2 hover:border-purple-300 hover:bg-purple-50 transition-all"
                  >
                    <div className={`w-8 h-8 bg-gradient-to-br ${action.gradient} rounded-lg flex items-center justify-center`}>
                      <action.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs font-medium">{action.title}</span>
                  </Button>
                ))}
              </div>
              
              <Button variant="ghost" className="w-full mt-3" size="sm">
                View all actions
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  Recent Tasks
                </h3>
                <Badge variant="outline" className="text-xs">
                  <Activity className="w-3 h-3 mr-1" />
                  4 active
                </Badge>
              </div>
              
              <div className="space-y-3">
                {recentTasks.map((task) => (
                  <div key={task.id} className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${
                      task.status === 'completed' ? 'bg-green-500' : 'bg-orange-500 animate-pulse'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{task.title}</p>
                      <p className="text-xs text-muted-foreground">{task.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="ghost" className="w-full mt-3" size="sm">
                View history
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  AI Insights
                </h3>
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  Live
                </Badge>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Tasks completed today</span>
                    <span className="text-lg font-bold">47</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{width: '78%'}} />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Time saved</span>
                    <span className="text-lg font-bold">3.5h</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{width: '65%'}} />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Automation efficiency</span>
                    <span className="text-lg font-bold">94%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full" style={{width: '94%'}} />
                  </div>
                </div>
              </div>
              
              <Button variant="ghost" className="w-full mt-3" size="sm">
                View analytics
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Pro Tip</h3>
                <p className="text-white/90 mb-4 max-w-2xl">
                  You can use natural language for everything. Try "Book the cheapest flight to Paris next Friday, 
                  find a hotel near the Eiffel Tower under $200, and create a 3-day itinerary."
                </p>
                <div className="flex items-center gap-4">
                  <Badge className="bg-white/20 text-white border-white/30">
                    <Zap className="w-3 h-3 mr-1" />
                    Multi-step automation
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30">
                    <Brain className="w-3 h-3 mr-1" />
                    Context aware
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30">
                    <Globe className="w-3 h-3 mr-1" />
                    Works on any site
                  </Badge>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="w-24 h-24 bg-white/10 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-white/80" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-4 mt-8">
          <Card className="border-0 shadow-md bg-white/80 backdrop-blur hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Bookmark className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
              <p className="text-sm font-medium">Bookmarks</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md bg-white/80 backdrop-blur hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Users className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <p className="text-sm font-medium">Contacts</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md bg-white/80 backdrop-blur hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <CreditCard className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <p className="text-sm font-medium">Payments</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md bg-white/80 backdrop-blur hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <BookOpen className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <p className="text-sm font-medium">Help</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}